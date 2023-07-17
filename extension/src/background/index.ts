import { storage } from "../storage";
import browser from "webextension-polyfill";
import merge from "ts-deepmerge";
import { policyValidator, type TPolicyAction, policyParser, type TPolicyMessage, type TPolicySummary } from "src/components/helpers/PolicyHelper";
import appConfig from "src/config/config";
import type { TMessageExchange } from "src/components/types/MessageExchangeType";
import type { TMessageCategory } from "src/components/types/MessageCategoryTypes";
import moment, { type Moment } from 'moment';
import { apiLogger } from "src/components/helpers/ApiLogger";

let configuration = new Map<string, Map<string,TPolicyMessage>>();

let resourceGroupMap = new Map<string, any>();

let messageStore = new Map<number, Array<TPolicyAction>>();

let stickyCancellationStore = new Map<string, Date>();


const cleanUpOnTabClose = ((tabId: number,): void => {
    messageStore.delete(tabId);
});

browser.tabs.onRemoved.addListener(cleanUpOnTabClose);

browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {

    let url:string;
    if(changeInfo.status && changeInfo.status==='loading' && changeInfo.url){
        url=changeInfo.url;
    }else{
        return;
    }

    let policyActions: Array<TPolicyAction> = policyValidator(url,configuration,stickyCancellationStore,resourceGroupMap);
    if(policyActions.length!=0){
        messageStore.set(tabId, policyActions);
    }else{
        policyActions=[];
        messageStore.set(tabId, policyActions);
    }
});

const processContentScriptsListener = ((request: any, sender, sendResponse): void => {

    if ((request as TMessageCategory).category) {
        let category = request as TMessageCategory;
        if (category.category === 'REQUEST_MESSAGE') {
            sendResponse({ response: messageStore.get(sender.tab.id) });
        }else if(category.category === 'STORE_STICKY_CANCELLATION') {
            const newTime=moment().add(category.data.duration,'seconds');
            let domain = (new URL(sender.url));
            stickyCancellationStore.set(domain.hostname,newTime.toDate());
        }else if(category.category === 'LOG_EVENT') {
             apiLogger(sender.url,category.data.event,category.data.content);
        }
    }
});

const addContentScriptsMessageListener = () => {
    browser.runtime.onMessage.addListener(processContentScriptsListener);
}

browser.runtime.onInstalled.addListener(() => {
    addContentScriptsMessageListener();
    loadOrUpdateConfiguration();
    browser.alarms.create('Fetch API', { periodInMinutes: appConfig.policyConfig.policyFetchInternalInSeconds });
});


browser.alarms.onAlarm.addListener((alarm) => {
    loadOrUpdateConfiguration();
});

async function fetchConfigurationFromAPI(url: string): Promise<JSON> {
    return fetch(url, {cache: "no-store"}).then((response) => {
        if (response.status == 200) {
            const responseJson = response.json();
            return Promise.resolve(responseJson);
        } else {
            return Promise.resolve({});
        }
    }).catch((reason) => {
        return Promise.resolve({});
    });
}

async function loadOrUpdateConfiguration() {
    const internalAPIJsonValue = await fetchConfigurationFromAPI(appConfig.policyConfig.internalUrl);
    let externalAPIJsonValue={};
    if(appConfig.policyConfig.internalUrl!==appConfig.policyConfig.externalUrl){
        externalAPIJsonValue = await fetchConfigurationFromAPI(appConfig.policyConfig.externalUrl);
    }
    const mergeResult = merge.withOptions(
        { mergeArrays: true },internalAPIJsonValue, externalAPIJsonValue);

    const tPolicySummary=policyParser(mergeResult);
    if (!isEmptyObject(tPolicySummary)) {
        saveConfigToStorage(tPolicySummary);
    } else {
        loadConfigFromStorage();
    }
}

async function loadConfigFromStorage(): Promise<void> {
    return browser.storage.local.get(["config"]).then((result) => {
        const policyConfig=result.key as TPolicySummary;
        configuration = policyConfig.policy;
        resourceGroupMap=policyConfig.resourceGroups;
        return Promise.resolve();
    });
}

async function saveConfigToStorage(value: TPolicySummary) {
    if (!isEmptyObject(value)) {
        browser.storage.local.set({ "config": value }).then(() => {
            configuration = value.policy;
            resourceGroupMap=value.resourceGroups;
        });
    }

}

function isEmptyObject(value: TPolicySummary): boolean {
    if (JSON.stringify(value) === '{}') return true;
    else return false;
}




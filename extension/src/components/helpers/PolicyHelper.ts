
export type TPolicyAction = {
    action: 'block_page' | 'block_paste' | 'disclaimer' | 'sticky' | 'none' | 'block_copy' | 'block_cut' | 'block_rightclick' | string
    message?: TPolicyMessage
}

export type TPolicySummary = {
    resourceGroups: any,
    policy: Map<string, Map<string, TPolicyMessage>>,
}

export type TPolicyMessage = {
    title?: string,
    description: string,
    durationInSeconds?: number
}

const ALL_URLS_VAL:string='<all_urls>';

export const policyValidator = (url: string, configurationMap: Map<string, Map<string, TPolicyMessage>>,
    stickyCancellationStore: Map<string, Date>, resourceGroupMap: Map<string, any>
): Array<TPolicyAction> => {
    let policyActions: Array<TPolicyAction> = [];

    for (const [key, value] of Object.entries(configurationMap) as Array<[string, Map<string, TPolicyMessage>]>) {
        const regex = new RegExp(key)
        if (regex.test(url) || key===ALL_URLS_VAL) {
            for (const [key, messageProps] of Object.entries(value)) {
                let domain = (new URL(url));

                if (key === 'sticky' && stickyCancellationStore.has(domain.hostname)) {
                    const storeDate = stickyCancellationStore.get(domain.hostname);
                    if (storeDate > new Date()) {
                        continue;
                    } else {
                        stickyCancellationStore.delete(domain.hostname)
                    }
                }
                let skipSinceExcludeGroup = false;
                if (messageProps.resources_exclude) {
                    const excludeList = messageProps.resources_exclude as Array<string>;
                    for (let groupName of excludeList) {
                        const resourceUrls = resourceGroupMap[groupName];
                        for (let urlObject of resourceUrls) {
                            let urlKey = urlObject["url"];
                            const regexExclude = new RegExp(urlKey);
                            if (regexExclude.test(url)) {
                                skipSinceExcludeGroup = true;
                                break;
                            }
                        }
                        if (skipSinceExcludeGroup) {
                            break;
                        }
                    }
                    if (skipSinceExcludeGroup) {
                        continue;
                    }
                }

                let policyAction: TPolicyAction = {
                    action: key
                }
                policyActions.push(policyAction);
            }
        }
    }
    if(policyActions.length!=0){
        let policyAction: TPolicyAction = {
            action: "sticky",
            message: configurationMap['message']
        }
        policyActions.push(policyAction);
    }


    return policyActions;
}

export const policyParser = (rawData: JSON): TPolicySummary => {
    let resourceGroupMap = {};
    for (let resourceIndex in rawData['resource_groups']) {
        for (let key in rawData['resource_groups'][resourceIndex]) {
            resourceGroupMap[key] = rawData['resource_groups'][resourceIndex][key];
        }
    }
    let finalURLExportMap = new Map<string, Map<string, TPolicyMessage>>();
    for (let condition of rawData['conditions']) {
        for (let resourceGroup of condition['resources_include']) {
            if(resourceGroup===ALL_URLS_VAL){
                finalURLExportMap[ALL_URLS_VAL] = new Map<string, TPolicyMessage>();
                finalURLExportMap[ALL_URLS_VAL][condition["action"]] = condition["props"];
                if (condition['resources_exclude']) {
                    finalURLExportMap[ALL_URLS_VAL][condition["action"]]['resources_exclude'] = condition['resources_exclude'];
                }
                continue;
            }

            for (let urlObject of resourceGroupMap[resourceGroup]) {
                let url = urlObject["url"];
                if (!finalURLExportMap[url]) {
                    finalURLExportMap[url] = new Map<string, TPolicyMessage>();
                }
                finalURLExportMap[url][condition["action"]] = condition["props"];
                if (condition['resources_exclude']) {
                    finalURLExportMap[url][condition["action"]]['resources_exclude'] = condition['resources_exclude'];
                }
            }
        }
    }
    if(rawData['message'] && rawData['message']['title']){
        finalURLExportMap["message"] = new Map<string, TPolicyMessage>();
        finalURLExportMap["message"]['action']=rawData['sticky'];
        finalURLExportMap["message"]['message']=rawData['message'];
    }
    let resourceGroups: TPolicySummary = {
        policy: finalURLExportMap,
        resourceGroups: resourceGroupMap
    }
    return resourceGroups;
}
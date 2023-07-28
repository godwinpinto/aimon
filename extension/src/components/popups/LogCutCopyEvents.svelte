<script lang="ts">
    import { onMount } from "svelte";
    import { Toast, Button } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import appConfig from "src/config/config";
    import jQuery from "jquery";
    import type { TAlertProps } from "../types/AlertPropsTypes";
    import AlertContent from "./AlertContent.svelte";
    import type { TPolicyMessage } from "../helpers/PolicyHelper";
    import browser from "webextension-polyfill";



    const logEvent = (event:string,content:string) => {
        let askMessage = {
            category: "LOG_EVENT",
            data: { 
                event:event,
                content: content,
            },
        };
        browser.runtime.sendMessage(askMessage);
    };

    jQuery(document).on("cut", function (e) {

        
        var text = window.getSelection().toString();
        console.log("Cut:",text);
        logEvent("X",text);

   //     let copiedText = e.originalEvent.clipboardData.getData("text/plain");
/*         navigator.clipboard.readText().then((text) => {
            console.log("Cut:",text);
        });
 */        return true;
    });

    jQuery(document).on("copy", function (e) {

/*         const text = (e.originalEvent || e).clipboardData.getData('text/plain');
        console.log("Copy:",text); */
        var text = window.getSelection().toString();
        console.log("Copy:",text);
        logEvent("C",text);


/*         navigator.clipboard.readText().then((text) => {
            console.log("Copy:",text);
        }); */
        return true;
    });
</script>


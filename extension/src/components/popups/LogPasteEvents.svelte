<script lang="ts">
    import { onMount } from "svelte";
    import { Toast, Button } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import appConfig from "../../config/config";
    import jQuery from "jquery";
    import type { TAlertProps } from "../types/AlertPropsTypes";
    import type { TPolicyMessage } from "../helpers/PolicyHelper";
    import browser from "webextension-polyfill";

    let isCopyTextEmitted: boolean = false;


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


    // Define an empty object to suppress navigator.clipboard
const emptyClipboard = {
  writeText: async () => {},
  readText: async () => {},
  // Add other methods you want to suppress (e.g., write, read, etc.)
   write: async () => {},
   read: async () => {},
  // ...
};

// Suppress navigator.clipboard by redefining it as an empty object
Object.defineProperty(navigator, 'clipboard', {
  value: emptyClipboard,
});

    jQuery("body").on("click", function (event) {
        if (jQuery(event.target).is("button")) {
            let buttonText = jQuery(event.target).text();
            console.log("buttonText", buttonText);
            setTimeout(function () {
            if (buttonText.toLowerCase().includes("copy")) {
                isCopyTextEmitted = true;
                console.log("Clicked button text:", buttonText);
                let hiddenInput = jQuery("<input>")
                    .attr("type", "text")
                    .attr("id", "hidden-input");
                jQuery("body").append(hiddenInput);
                jQuery("#hidden-input").trigger("focus");
                document.execCommand("paste");
                let clipboardData = jQuery("#hidden-input").val();
                console.log("Clipboard data:", clipboardData);
                logEvent("C",""+clipboardData);

                hiddenInput.remove();
            }
        }, 1000);
        }
    });

    jQuery(document).on("paste", function (e) {
        if (!isCopyTextEmitted) {
            console.log(
                "paste function",
                e.originalEvent.clipboardData.getData("text")
            );
            logEvent("P",""+e.originalEvent.clipboardData.getData("text"));
        } else {
            isCopyTextEmitted = false;
        }
        return true;
    });

    jQuery("div").on("paste", function (e) {
        return true;
    });

    jQuery(document.body).on("dragover", function (e) {
        return true;
    });

    jQuery(document.body).on("drop", function (e) {
        return true;
    });
</script>

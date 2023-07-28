<script lang="ts">
    import type { TPolicyMessage } from "../helpers/PolicyHelper";
    import type { TAlertProps } from "../types/AlertPropsTypes";
    import AlertContent from "./AlertContent.svelte";
    import browser from "webextension-polyfill";

    export let props: TPolicyMessage;

    let position = "bottom";
    const diclaimerClosed = (durationInSeconds) => {
        let askMessage = {
            category: "STORE_STICKY_CANCELLATION",
            data: {
                duration: durationInSeconds,
            },
        };
        browser.runtime.sendMessage(askMessage);
    };

    const closeAlertContent = (duration) => {
        document.getElementById("sticky-banner").style.display = "none";
        if (duration == 0) {
            diclaimerClosed(duration);
        }
    };
</script>

<div
    id="sticky-banner"
    tabindex="-1"
    class="fixed {position}-0 left-0 z-[1000] flex justify-between w-full p-0 shadow-md"
    style="display:block !important;"
>
    <AlertContent {props}>
        {#if props.durationInSeconds > 0}
            <div
                class="absolute top-0 bottom-0 right-0 px-4 py-3"
                on:click={() => closeAlertContent(props.durationInSeconds)}
                on:keydown={() => closeAlertContent(props.durationInSeconds)}
            >
                <svg
                    class="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    ><title>Close</title><path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                    /></svg
                >
            </div>
        {/if}
    </AlertContent>
</div>

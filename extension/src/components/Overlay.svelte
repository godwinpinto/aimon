<script lang="ts">
    import { onMount } from "svelte";
    import browser from "webextension-polyfill";
    import type { TMessageCategory } from "src/components/types/MessageCategoryTypes";
    import type { TPolicyAction, TPolicyMessage } from "./helpers/PolicyHelper";
    import StickyNotice from "./popups/StickyNotice.svelte";
    import LogPasteEvents from "./popups/LogPasteEvents.svelte";
    import LogCutCopyEvents from "./popups/LogCutCopyEvents.svelte";
    import type { TAlertProps } from "./types/AlertPropsTypes";

    // Some global styles on the page
    import "../content/styles.css";

    const defaultMessage: TPolicyMessage = {
        title: "",
        description: "",
        durationInSeconds:0
    };

    let actor: TPolicyAction = { action: "none", message: defaultMessage };

    let count = 0;
    let htmlContent: string;

    let actors: Array<TPolicyAction> = [];

    let isCopyTextEmitted:boolean =false;


    onMount(() => {
        function handleResponse(message) {
            if (!message.response) {
                return;
            }
            console.log("success")
            console.log(message.response);
            actors = message.response;
        }

        let askMessage: TMessageCategory = {
            category: "REQUEST_RULES",
        };

        function handleError(error) {
            console.log("error",error)

        }

        function getMessageDetails() {
            console.log("start transaction")
            const sending = browser.runtime.sendMessage(askMessage);
            sending.then(handleResponse, handleError);
        }

        getMessageDetails();
    });
</script>

{#each actors as actor}
    {#if actor.action == "sticky"}
        <StickyNotice props={actor.message} />
    {/if}
    {#if actor.action == "log_cut_copy"}
        <LogCutCopyEvents/>
    {/if}
    {#if actor.action == "log_paste"}
        <LogPasteEvents/>
    {/if}
{/each}

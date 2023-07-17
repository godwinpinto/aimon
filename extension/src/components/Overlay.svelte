<script lang="ts">
    import { onMount } from "svelte";
    import browser from "webextension-polyfill";
    import type { TMessageCategory } from "src/components/types/MessageCategoryTypes";
    import type { TPolicyAction, TPolicyMessage } from "./helpers/PolicyHelper";
    import Disclaimer from "./popups/Disclaimer.svelte";
    import StickyNotice from "./popups/StickyNotice.svelte";
    import BlockPaste from "./popups/BlockPaste.svelte";
    import BlockCopy from "./popups/LogCopy.svelte";
    import BlockRightClick from "./popups/BlockRightClick.svelte";
    import BlockCut from "./popups/LogCut.svelte";
    import type { TAlertProps } from "./types/AlertPropsTypes";
    const defaultMessage: TPolicyMessage = {
        title: "",
        description: "",
        location: "",
        alertType: "none",
        durationInSeconds:1
    };

    let actor: TPolicyAction = { action: "none", message: defaultMessage };

    let count = 0;
    let htmlContent: string;

    let actors: Array<TPolicyAction> = [];

    onMount(() => {
        function handleResponse(message) {
            if (!message.response) {
                return;
            }
            actors = message.response;
        }

        let askMessage: TMessageCategory = {
            category: "REQUEST_MESSAGE",
        };

        function handleError(error) {
        }

        function getMessageDetails() {
            const sending = browser.runtime.sendMessage(askMessage);
            sending.then(handleResponse, handleError);
        }

        getMessageDetails();
    });
</script>

{#each actors as actor}
    {#if actor.action == "disclaimer"}
        <Disclaimer props={actor.message} />
    {/if}
    {#if actor.action == "sticky"}
        <StickyNotice props={actor.message} />
    {/if}
    {#if actor.action == "block_paste"}
        <BlockPaste props={actor.message} />
    {/if}
    {#if actor.action == "block_copy"}
        <BlockCopy props={actor.message} />
    {/if}
    {#if actor.action == "block_cut"}
        <BlockCut props={actor.message} />
    {/if}
    {#if actor.action == "block_rightclick"}
        <BlockRightClick props={actor.message} />
    {/if}
{/each}

<script lang="ts">
    import { onMount } from "svelte";
    import { Toast, Button } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import appConfig from "src/config/config";
    import jQuery from "jquery";
    import type { TAlertProps } from "../types/AlertPropsTypes";
    import AlertContent from "./AlertContent.svelte";
    import type { TPolicyMessage } from "../helpers/PolicyHelper";

    export let props: TPolicyMessage;

    let toastStatus = false;

    let timeoutVariable: any;

    const changeStatus = () => {
        toastStatus = true;
    };

    jQuery(document).on("copy", function (e) {
        changeStatus();
        navigator.clipboard.writeText(appConfig.copyBlockedClipboardContent);
        timeoutVariable = setTimeout(() => {
            toastStatus = false;
        }, appConfig.toastTimeoutInSeconds * 1000);
        e.preventDefault();
        return false;
    });
</script>


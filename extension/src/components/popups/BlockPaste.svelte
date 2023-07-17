<script lang="ts">
    import { onMount } from "svelte";
    import { Toast, Button } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import appConfig from "src/config/config";
    import jQuery from "jquery";
    import AlertContent from "./AlertContent.svelte";
    import type { TAlertProps } from "../types/AlertPropsTypes";
    import type { TPolicyMessage } from "../helpers/PolicyHelper";

    export let props: TPolicyMessage;

    let toastStatus = false;

    let timeoutVariable;

    const reactOnPaste = () => {
        toastStatus = true;
        timeoutVariable = setTimeout(() => {
            toastStatus = false;
        }, appConfig.toastTimeoutInSeconds * 1000);
    };

    jQuery(document).on("paste", function (e) {
        e.preventDefault();
        reactOnPaste();
        jQuery("div[contenteditable='true']").each(function () {
            jQuery(this).html("");
        });
        let $target = jQuery(e.target);
        setTimeout(function () {
            $target.html("");
            $target.val("");
        }, 0);
        return false;
    });

    jQuery("div").on("paste", function (e) {
        e.preventDefault();
        reactOnPaste();
        let $target = jQuery(e.target);
        jQuery("div[contenteditable='true']").each(function () {
            jQuery(this).html(appConfig.pasteBlockedContent);
        });
        setTimeout(function () {
            $target.html("");
            $target.val("");
        }, 0);
        return false;
    });

    jQuery(document.body).on("dragover", function (e) {
        e.preventDefault();
        reactOnPaste();
        //        e.stopPropagation();
        let $target = jQuery(e.target);
        setTimeout(function () {
            $target.html("");
            $target.val("");
        }, 0);
        return false;
    });

    jQuery(document.body).on("drop", function (e) {
        e.preventDefault();
        reactOnPaste();
        //        e.stopPropagation();
        let $target = jQuery(e.target);
        setTimeout(function () {
            $target.html("");
            $target.val("");
        }, 0);
        return false;
    });

    let position: string;
    if (props.location === "top") {
        position = "top";
    } else {
        position = "bottom";
    }
</script>

<div
    id="toast-top-left"
    class="fixed z-[1000] flex items-start w-full max-w-xl p-0 shadow-md {position}-5 right-5"
    style={toastStatus
        ? "display: block !important"
        : "display: none !important"}
    role="alert"
>
    <AlertContent {props} />
</div>

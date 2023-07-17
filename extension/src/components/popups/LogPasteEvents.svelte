<script lang="ts">
    import { onMount } from "svelte";
    import { Toast, Button } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import appConfig from "src/config/config";
    import jQuery from "jquery";
    import type { TAlertProps } from "../types/AlertPropsTypes";
    import type { TPolicyMessage } from "../helpers/PolicyHelper";

    jQuery(document).on("paste", function (e) {
        navigator.clipboard.readText().then((text) => {
            console.log("Document:",text);
        });
        return true;
    });

    jQuery("div").on("paste", function (e) {
        navigator.clipboard.readText().then((text) => {
            console.log("Div:",text);
        });
        return true;
    });

    jQuery(document.body).on("dragover", function (e) {
        navigator.clipboard.readText().then((text) => {
            console.log("DragOver:",text);
        });
        return true;
    });

    jQuery(document.body).on("drop", function (e) {
        navigator.clipboard.readText().then((text) => {
            console.log("Drop:",text);
        });
        return true;
    });
</script>


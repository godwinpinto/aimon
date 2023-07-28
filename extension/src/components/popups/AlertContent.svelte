<script lang="ts">
    import { Alert, Banner } from "flowbite-svelte";
    import type { TAlertProps } from "../types/AlertPropsTypes";
    import xss from "xss";
    import Showdown from "showdown";
    import type { TPolicyMessage } from "../helpers/PolicyHelper";

    export let props: TPolicyMessage;

    let alertColor="red";
    let alertType="danger";

    const mdConvertor = new Showdown.Converter();

    let htmlContent = filterXSS(mdConvertor.makeHtml(props.description));
    setTimeout(() => {
        if (!document.getElementById("alertExtension")) {
            return;
        }

        let anchors = document
            .getElementById("alertExtension")
            .getElementsByTagName("a");
        if (!anchors) {
            return;
        }

        for (var i = 0; i < anchors.length; i++) {
            anchors[i].setAttribute("target", "_blank");
        }
    }, 2000);

</script>

<div
    id="alertExtension"
    class="bg-{alertColor}-100 border-t-4 border-{alertColor}-500 rounded-b text-{alertColor}-900 px-4 py-3 w-full"
    style="color: #ef4444"
    role="alert"
>
    <div class="flex">
        <div class="py-1 pr-2">
            <!-- danger -->
            {#if alertType == "danger"}
                <svg
                    class="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                </svg>
            {:else if alertType == "warning"}
                <!-- warning -->
                <svg
                    class="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                </svg>
            {:else if alertType == "info"}
                <!-- info -->
                <svg
                    class="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                </svg>
            {:else if alertType == "success"}
                <!-- success -->
                <svg
                    class="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            {/if}
        </div>
        <div>
            <div class="font-bold m-0">{@html props.title}</div>
            <div class="text-sm m-0">
                {@html htmlContent}
            </div>
        </div>
        <slot></slot>
    </div>
</div>

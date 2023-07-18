<script lang="ts">
    import { onMount } from "svelte";
    import { Toast, Button } from "flowbite-svelte";
    import { fly } from "svelte/transition";
    import appConfig from "../../config/config";
    import jQuery from "jquery";
    import type { TAlertProps } from "../types/AlertPropsTypes";
    import type { TPolicyMessage } from "../helpers/PolicyHelper";


    let isCopyTextEmitted:boolean=false;


    jQuery("body").on("click", function(event) {
      if (jQuery(event.target).is("button")) {
        var buttonText = jQuery(event.target).text();
        if(buttonText.toLowerCase().includes("copy")){
            isCopyTextEmitted=true;
            console.log('Clicked button text:', buttonText);
            let hiddenInput = jQuery('<input>').attr('type', 'text').attr('id', 'hidden-input');
            jQuery('body').append(hiddenInput);
            jQuery('#hidden-input').trigger("focus");
            document.execCommand('paste');
            let clipboardData = jQuery('#hidden-input').val();
            console.log('Clipboard data:', clipboardData);
            hiddenInput.remove();
        }
      }
    });



    jQuery(document).on("paste", function (e) {
        if(!isCopyTextEmitted){
            console.log("paste function",e.originalEvent.clipboardData.getData("text"));
        }else{
            isCopyTextEmitted=false;
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


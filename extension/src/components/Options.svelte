<!-- Options.svelte -->
<script lang="ts">
    import "../content/styles.css";
    import browser from "webextension-polyfill";
    import { Button } from "flowbite-svelte";
    import { Input, Label } from "flowbite-svelte";
    import { onMount } from 'svelte';
    import type { TMessageCategory } from "src/components/types/MessageCategoryTypes";


    let username = localStorage.getItem("user_id") || "";
    let showInput = username === "";

    function saveUsername() {
        localStorage.setItem("user_id", username);
        let askMessage: TMessageCategory = {
            category: "SAVE_USERNAME",
            data:username
        };

        const sending = browser.runtime.sendMessage(askMessage);
        showInput = false;
        alert("Username saved!");
    }
    // Update the value in localStorage whenever `username` changes
  $: {
    localStorage.setItem('user_id', username);
  }

  // Update `showInput` when component mounts and the username is not found in localStorage
  onMount(() => {
    showInput = username === '';
  });
</script>

<div class="container p-5 bg-white rounded shadow-md">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="mb-6">
            Plugin is active
</div>
            {#if showInput}
    <div class="mb-6">
            <Label for="username" class="mb-2">Enter Username</Label>
            <Input
                type="text"
                id="username"
                placeholder="godwin.pinto"
                bind:value={username}
                required
            />
        </div>
        <div class="mb-6">
            <Button on:click={saveUsername}>Save</Button>
        </div>
    {:else}
        <p class="text-lg mt-3">Welcome, {username}!</p>
    {/if}
</div>
</div>
<style>
    .container {
        min-width: 250px;
    }
</style>

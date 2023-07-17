import Options from "src/components/Options.svelte";
import { storage } from "src/storage";
import browser from "webextension-polyfill";

const target = document.getElementById("app");

function render() {
    storage.get().then(({ count }) => {
        new Options({ target, props: { count } });
    });
}

function change() {
    //browser.storage.local.set({ background: image });
    browser.storage.local.set({ background: "image" });
  }

document.addEventListener("DOMContentLoaded", render);

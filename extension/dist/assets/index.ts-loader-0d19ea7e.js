(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/index.ts-5e64b6c1.js")
    );
  })().catch(console.error);

})();

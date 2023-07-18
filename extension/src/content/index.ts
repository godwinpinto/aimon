import Overlay from "../components/Overlay.svelte";

// Some global styles on the page
import "./styles.css";



/*const shadowRoot = document.body.attachShadow({ mode: "open" });
new Overlay({
  target: shadowRoot,
});*/
// Some svelte component on the page
new Overlay({ target: document.body });


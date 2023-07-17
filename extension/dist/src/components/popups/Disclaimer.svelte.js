import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/popups/Disclaimer.svelte.js");/* src/components/popups/Disclaimer.svelte generated by Svelte v3.59.2 */
import {
	SvelteComponentDev,
	add_location,
	append_dev,
	attr_dev,
	detach_dev,
	dispatch_dev,
	element,
	init,
	insert_dev,
	listen_dev,
	noop,
	safe_not_equal,
	set_style,
	space,
	svg_element,
	validate_slots
} from "/vendor/.vite-deps-svelte_internal.js__v--686dd903.js";

import { Button, Modal } from "/vendor/.vite-deps-flowbite-svelte.js__v--f1815d76.js";
import __vite__cjsImport2_showdown from "/vendor/.vite-deps-showdown.js__v--65ac0898.js"; const Showdown = __vite__cjsImport2_showdown.__esModule ? __vite__cjsImport2_showdown.default : __vite__cjsImport2_showdown;
import __vite__cjsImport3_webextensionPolyfill from "/vendor/.vite-deps-webextension-polyfill.js__v--d5bbb659.js"; const browser = __vite__cjsImport3_webextensionPolyfill.__esModule ? __vite__cjsImport3_webextensionPolyfill.default : __vite__cjsImport3_webextensionPolyfill;
const file = "src/components/popups/Disclaimer.svelte";

// (132:59) 
function create_if_block_3(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "stroke-linecap", "round");
			attr_dev(path, "stroke-linejoin", "round");
			attr_dev(path, "d", "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z");
			attr_dev(path, "class", "s-Ml69zaU6BbW5");
			add_location(path, file, 142, 28, 5783);
			attr_dev(svg, "class", "h-10 w-10 s-Ml69zaU6BbW5");
			attr_dev(svg, "fill", "none");
			attr_dev(svg, "stroke", /*alertColor*/ ctx[1]);
			attr_dev(svg, "stroke-width", "1.5");
			attr_dev(svg, "viewBox", "0 0 24 24");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "aria-hidden", "true");
			add_location(svg, file, 133, 24, 5385);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*alertColor*/ 2) {
				attr_dev(svg, "stroke", /*alertColor*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(132:59) ",
		ctx
	});

	return block;
}

// (115:56) 
function create_if_block_2(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "stroke-linecap", "round");
			attr_dev(path, "stroke-linejoin", "round");
			attr_dev(path, "d", "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z");
			attr_dev(path, "class", "s-Ml69zaU6BbW5");
			add_location(path, file, 125, 28, 4898);
			attr_dev(svg, "class", "h-10 w-10 s-Ml69zaU6BbW5");
			attr_dev(svg, "fill", "none");
			attr_dev(svg, "stroke", /*alertColor*/ ctx[1]);
			attr_dev(svg, "stroke-width", "1.5");
			attr_dev(svg, "viewBox", "0 0 24 24");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "aria-hidden", "true");
			add_location(svg, file, 116, 24, 4500);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*alertColor*/ 2) {
				attr_dev(svg, "stroke", /*alertColor*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(115:56) ",
		ctx
	});

	return block;
}

// (98:59) 
function create_if_block_1(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "stroke-linecap", "round");
			attr_dev(path, "stroke-linejoin", "round");
			attr_dev(path, "d", "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z");
			attr_dev(path, "class", "s-Ml69zaU6BbW5");
			add_location(path, file, 108, 28, 4093);
			attr_dev(svg, "class", "h-10 w-10 s-Ml69zaU6BbW5");
			attr_dev(svg, "fill", "none");
			attr_dev(svg, "stroke", /*alertColor*/ ctx[1]);
			attr_dev(svg, "stroke-width", "1.5");
			attr_dev(svg, "viewBox", "0 0 24 24");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "aria-hidden", "true");
			add_location(svg, file, 99, 24, 3695);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*alertColor*/ 2) {
				attr_dev(svg, "stroke", /*alertColor*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(98:59) ",
		ctx
	});

	return block;
}

// (82:20) {#if props.alertType == "danger"}
function create_if_block(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "stroke-linecap", "round");
			attr_dev(path, "stroke-linejoin", "round");
			attr_dev(path, "d", "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z");
			attr_dev(path, "class", "s-Ml69zaU6BbW5");
			add_location(path, file, 91, 28, 3178);
			attr_dev(svg, "class", "h-10 w-10 s-Ml69zaU6BbW5");
			attr_dev(svg, "fill", "none");
			attr_dev(svg, "stroke", /*alertColor*/ ctx[1]);
			attr_dev(svg, "stroke-width", "1.5");
			attr_dev(svg, "viewBox", "0 0 24 24");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "aria-hidden", "true");
			add_location(svg, file, 82, 24, 2780);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*alertColor*/ 2) {
				attr_dev(svg, "stroke", /*alertColor*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(82:20) {#if props.alertType == \\\"danger\\\"}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div0;
	let t0;
	let div7;
	let div6;
	let div5;
	let div2;
	let div1;
	let t1;
	let h3;
	let raw0_value = /*props*/ ctx[0].title + "";
	let t2;
	let div3;
	let t3;
	let div4;
	let button;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*props*/ ctx[0].alertType == "danger") return create_if_block;
		if (/*props*/ ctx[0].alertType == "warning") return create_if_block_1;
		if (/*props*/ ctx[0].alertType == "info") return create_if_block_2;
		if (/*props*/ ctx[0].alertType == "success") return create_if_block_3;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block = current_block_type && current_block_type(ctx);

	const block = {
		c: function create() {
			div0 = element("div");
			t0 = space();
			div7 = element("div");
			div6 = element("div");
			div5 = element("div");
			div2 = element("div");
			div1 = element("div");
			if (if_block) if_block.c();
			t1 = space();
			h3 = element("h3");
			t2 = space();
			div3 = element("div");
			t3 = space();
			div4 = element("div");
			button = element("button");
			button.textContent = "Acknowledge & Continue";
			attr_dev(div0, "id", "overlayCustom");
			set_style(div0, "position", "fixed");
			set_style(div0, "display", "block");
			set_style(div0, "visibility", "visible");
			set_style(div0, "width", "100%");
			set_style(div0, "height", "100%");
			set_style(div0, "top", "0");
			set_style(div0, "left", "0");
			set_style(div0, "right", "0");
			set_style(div0, "bottom", "0");
			set_style(div0, "background-color", "rgba(0,0,0,0.5)");
			set_style(div0, "z-index", "1000");
			set_style(div0, "cursor", "pointer");
			attr_dev(div0, "class", "s-Ml69zaU6BbW5");
			add_location(div0, file, 56, 0, 1631);
			attr_dev(div1, "class", "py-1 pr-2 s-Ml69zaU6BbW5");
			add_location(div1, file, 79, 16, 2642);
			attr_dev(h3, "class", "text-xl font-semibold text-gray-900 dark:text-white s-Ml69zaU6BbW5");
			add_location(h3, file, 151, 16, 6124);
			attr_dev(div2, "class", "flex items-center justify-start p-4 border-b rounded-t dark:border-gray-600 s-Ml69zaU6BbW5");
			add_location(div2, file, 76, 12, 2507);
			attr_dev(div3, "class", "p-6 space-y-6 s-Ml69zaU6BbW5");
			add_location(div3, file, 156, 12, 6314);
			attr_dev(button, "data-modal-hide", "staticModal");
			attr_dev(button, "type", "button");
			attr_dev(button, "class", "text-white bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center s-Ml69zaU6BbW5");
			add_location(button, file, 163, 16, 6605);
			attr_dev(div4, "class", "flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 s-Ml69zaU6BbW5");
			add_location(div4, file, 160, 12, 6443);
			attr_dev(div5, "class", "relative bg-white rounded-lg shadow dark:bg-gray-700 s-Ml69zaU6BbW5");
			add_location(div5, file, 74, 8, 2394);
			attr_dev(div6, "class", "relative w-full max-w-2xl max-h-full s-Ml69zaU6BbW5");
			set_style(div6, "position", "fixed");
			set_style(div6, "top", "50%");
			set_style(div6, "left", "50%");
			set_style(div6, "transform", "translate(-50%, -50%)");
			add_location(div6, file, 69, 4, 2203);
			attr_dev(div7, "id", "staticModal");
			attr_dev(div7, "data-modal-backdrop", "static");
			attr_dev(div7, "tabindex", "-1");
			attr_dev(div7, "aria-hidden", "true");
			attr_dev(div7, "class", "fixed top-0 left-0 right-0 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full s-Ml69zaU6BbW5");
			set_style(div7, "display", "block", 1);
			set_style(div7, "visibility", "visible", 1);
			set_style(div7, "z-index", "1001");
			add_location(div7, file, 61, 0, 1880);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, div7, anchor);
			append_dev(div7, div6);
			append_dev(div6, div5);
			append_dev(div5, div2);
			append_dev(div2, div1);
			if (if_block) if_block.m(div1, null);
			append_dev(div2, t1);
			append_dev(div2, h3);
			h3.innerHTML = raw0_value;
			append_dev(div5, t2);
			append_dev(div5, div3);
			div3.innerHTML = /*htmlContent*/ ctx[2];
			append_dev(div5, t3);
			append_dev(div5, div4);
			append_dev(div4, button);

			if (!mounted) {
				dispose = listen_dev(button, "click", /*click_handler*/ ctx[4], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if (if_block) if_block.d(1);
				if_block = current_block_type && current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div1, null);
				}
			}

			if (dirty & /*props*/ 1 && raw0_value !== (raw0_value = /*props*/ ctx[0].title + "")) h3.innerHTML = raw0_value;;
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div7);

			if (if_block) {
				if_block.d();
			}

			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Disclaimer', slots, []);
	let defaultModal = true;
	let { props } = $$props;
	let alertColor;

	if (props.alertType == "danger") {
		alertColor = "red";
	} else if (props.alertType == "warning") {
		alertColor = "orange";
	} else if (props.alertType == "info") {
		alertColor = "blue";
	} else if (props.alertType == "success") {
		alertColor = "green";
	}

	const diclaimerAccepted = durationInSeconds => {
		let askMessage = {
			category: "STORE_DISCLAIMER_ACCEPTANCE",
			data: { duration: durationInSeconds }
		};

		browser.runtime.sendMessage(askMessage);
	};

	const mdConvertor = new Showdown.Converter();
	let htmlContent = filterXSS(mdConvertor.makeHtml(props.description));

	setTimeout(
		() => {
			if (!document.getElementById("staticModal")) {
				return;
			}

			let anchors = document.getElementById("staticModal").getElementsByTagName("a");

			if (!anchors) {
				return;
			}

			for (var i = 0; i < anchors.length; i++) {
				anchors[i].setAttribute("target", "_blank");
			}
		},
		2000
	);

	const closeModal = durationInSeconds => {
		document.getElementById("overlayCustom").style.display = "none";
		document.getElementById("staticModal").style.display = "none";
		document.getElementById("staticModal").style.visibility = "hidden";
		document.getElementById("overlayCustom").style.visibility = "hidden";

		if (durationInSeconds > 0) {
			diclaimerAccepted(durationInSeconds);
		}
	};

	$$self.$$.on_mount.push(function () {
		if (props === undefined && !('props' in $$props || $$self.$$.bound[$$self.$$.props['props']])) {
			console.warn("<Disclaimer> was created without expected prop 'props'");
		}
	});

	const writable_props = ['props'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Disclaimer> was created with unknown prop '${key}'`);
	});

	const click_handler = () => closeModal(props.durationInSeconds);

	$$self.$$set = $$props => {
		if ('props' in $$props) $$invalidate(0, props = $$props.props);
	};

	$$self.$capture_state = () => ({
		Button,
		Modal,
		Showdown,
		browser,
		defaultModal,
		props,
		alertColor,
		diclaimerAccepted,
		mdConvertor,
		htmlContent,
		closeModal
	});

	$$self.$inject_state = $$props => {
		if ('defaultModal' in $$props) defaultModal = $$props.defaultModal;
		if ('props' in $$props) $$invalidate(0, props = $$props.props);
		if ('alertColor' in $$props) $$invalidate(1, alertColor = $$props.alertColor);
		if ('htmlContent' in $$props) $$invalidate(2, htmlContent = $$props.htmlContent);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [props, alertColor, htmlContent, closeModal, click_handler];
}

class Disclaimer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { props: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Disclaimer",
			options,
			id: create_fragment.name
		});
	}

	get props() {
		throw new Error("<Disclaimer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set props(value) {
		throw new Error("<Disclaimer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

import * as ___SVELTE_HMR_HOT_API from "/vendor/svelte-hmr-runtime-hot-api-esm.js__v--cfdbb230.js";import { adapter as ___SVELTE_HMR_HOT_API_PROXY_ADAPTER } from "/vendor/svelte-hmr-runtime-proxy-adapter-dom.js__v--cfdbb230.js";if (import.meta && import.meta.hot) { if (false) import.meta.hot.acceptExports(['default']);; Disclaimer = ___SVELTE_HMR_HOT_API.applyHmr({ m: import.meta, id: "/home/godwin/Desktop/Personal/Github/Hackathon/TiDBFutureApp/aimon/extension/src/components/popups/Disclaimer.svelte", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":true,"allowLiveBinding":false,"partialAccept":true}, Component: Disclaimer, ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER, acceptable: true, preserveLocalState: false, emitCss: true, }); }
export default Disclaimer;


import "/src/components/popups/Disclaimer.svelte__svelte_type--style_lang.css.js";
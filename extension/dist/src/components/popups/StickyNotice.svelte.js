import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/popups/StickyNotice.svelte.js");/* src/components/popups/StickyNotice.svelte generated by Svelte v3.59.2 */
import {
	SvelteComponentDev,
	add_location,
	append_dev,
	attr_dev,
	create_component,
	destroy_component,
	detach_dev,
	dispatch_dev,
	element,
	empty,
	init,
	insert_dev,
	listen_dev,
	mount_component,
	noop,
	run_all,
	safe_not_equal,
	set_style,
	svg_element,
	text,
	transition_in,
	transition_out,
	validate_slots
} from "/vendor/.vite-deps-svelte_internal.js__v--686dd903.js";

import { duration } from "/vendor/.vite-deps-moment.js__v--ec7ac54c.js";
import AlertContent from "/src/components/popups/AlertContent.svelte.js";
import __vite__cjsImport3_webextensionPolyfill from "/vendor/.vite-deps-webextension-polyfill.js__v--d5bbb659.js"; const browser = __vite__cjsImport3_webextensionPolyfill.__esModule ? __vite__cjsImport3_webextensionPolyfill.default : __vite__cjsImport3_webextensionPolyfill;
const file = "src/components/popups/StickyNotice.svelte";

// (36:8) {#if props.durationInSeconds > 0}
function create_if_block(ctx) {
	let div;
	let svg;
	let title;
	let t;
	let path;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			svg = svg_element("svg");
			title = svg_element("title");
			t = text("Close");
			path = svg_element("path");
			add_location(title, file, 46, 21, 1431);
			attr_dev(path, "d", "M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z");
			add_location(path, file, 46, 41, 1451);
			attr_dev(svg, "class", "fill-current h-6 w-6 text-red-500");
			attr_dev(svg, "role", "button");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr_dev(svg, "viewBox", "0 0 20 20");
			add_location(svg, file, 41, 16, 1214);
			attr_dev(div, "class", "absolute top-0 bottom-0 right-0 px-4 py-3");
			add_location(div, file, 36, 12, 959);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, svg);
			append_dev(svg, title);
			append_dev(title, t);
			append_dev(svg, path);

			if (!mounted) {
				dispose = [
					listen_dev(div, "click", /*click_handler*/ ctx[3], false, false, false, false),
					listen_dev(div, "keydown", /*keydown_handler*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(36:8) {#if props.durationInSeconds > 0}",
		ctx
	});

	return block;
}

// (35:4) <AlertContent {props}>
function create_default_slot(ctx) {
	let if_block_anchor;
	let if_block = /*props*/ ctx[0].durationInSeconds > 0 && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (/*props*/ ctx[0].durationInSeconds > 0) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(35:4) <AlertContent {props}>",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let alertcontent;
	let div_class_value;
	let current;

	alertcontent = new AlertContent({
			props: {
				props: /*props*/ ctx[0],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(alertcontent.$$.fragment);
			attr_dev(div, "id", "sticky-banner");
			attr_dev(div, "tabindex", "-1");
			attr_dev(div, "class", div_class_value = "fixed " + /*position*/ ctx[1] + "-0 left-0 z-[1000] flex justify-between w-full p-0 shadow-md");
			set_style(div, "display", "block", 1);
			add_location(div, file, 28, 0, 703);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(alertcontent, div, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const alertcontent_changes = {};
			if (dirty & /*props*/ 1) alertcontent_changes.props = /*props*/ ctx[0];

			if (dirty & /*$$scope, props*/ 65) {
				alertcontent_changes.$$scope = { dirty, ctx };
			}

			alertcontent.$set(alertcontent_changes);

			if (!current || dirty & /*position*/ 2 && div_class_value !== (div_class_value = "fixed " + /*position*/ ctx[1] + "-0 left-0 z-[1000] flex justify-between w-full p-0 shadow-md")) {
				attr_dev(div, "class", div_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(alertcontent.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(alertcontent.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(alertcontent);
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
	validate_slots('StickyNotice', slots, []);
	let { props } = $$props;
	let position;

	if (props.location === "top") {
		position = "top";
	} else {
		position = "bottom";
	}

	const diclaimerClosed = durationInSeconds => {
		let askMessage = {
			category: "STORE_STICKY_CANCELLATION",
			data: { duration: durationInSeconds }
		};

		browser.runtime.sendMessage(askMessage);
	};

	const closeAlertContent = duration => {
		document.getElementById("sticky-banner").style.display = "none";

		if (duration == 0) {
			diclaimerClosed(duration);
		}
	};

	$$self.$$.on_mount.push(function () {
		if (props === undefined && !('props' in $$props || $$self.$$.bound[$$self.$$.props['props']])) {
			console.warn("<StickyNotice> was created without expected prop 'props'");
		}
	});

	const writable_props = ['props'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StickyNotice> was created with unknown prop '${key}'`);
	});

	const click_handler = () => closeAlertContent(props.durationInSeconds);
	const keydown_handler = () => closeAlertContent(props.durationInSeconds);

	$$self.$$set = $$props => {
		if ('props' in $$props) $$invalidate(0, props = $$props.props);
	};

	$$self.$capture_state = () => ({
		duration,
		AlertContent,
		browser,
		props,
		position,
		diclaimerClosed,
		closeAlertContent
	});

	$$self.$inject_state = $$props => {
		if ('props' in $$props) $$invalidate(0, props = $$props.props);
		if ('position' in $$props) $$invalidate(1, position = $$props.position);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [props, position, closeAlertContent, click_handler, keydown_handler];
}

class StickyNotice extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { props: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "StickyNotice",
			options,
			id: create_fragment.name
		});
	}

	get props() {
		throw new Error("<StickyNotice>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set props(value) {
		throw new Error("<StickyNotice>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

import * as ___SVELTE_HMR_HOT_API from "/vendor/svelte-hmr-runtime-hot-api-esm.js__v--cfdbb230.js";import { adapter as ___SVELTE_HMR_HOT_API_PROXY_ADAPTER } from "/vendor/svelte-hmr-runtime-proxy-adapter-dom.js__v--cfdbb230.js";if (import.meta && import.meta.hot) { if (false) import.meta.hot.acceptExports(['default']);; StickyNotice = ___SVELTE_HMR_HOT_API.applyHmr({ m: import.meta, id: "/home/godwin/Desktop/Personal/Github/Hackathon/TiDBFutureApp/aimon/extension/src/components/popups/StickyNotice.svelte", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":true,"allowLiveBinding":false,"partialAccept":true}, Component: StickyNotice, ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER, acceptable: true, preserveLocalState: false, emitCss: true, }); }
export default StickyNotice;


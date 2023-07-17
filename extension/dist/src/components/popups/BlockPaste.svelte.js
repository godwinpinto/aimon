import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/popups/BlockPaste.svelte.js");/* src/components/popups/BlockPaste.svelte generated by Svelte v3.59.2 */
import {
	SvelteComponentDev,
	add_location,
	attr_dev,
	create_component,
	destroy_component,
	detach_dev,
	dispatch_dev,
	element,
	init,
	insert_dev,
	mount_component,
	safe_not_equal,
	transition_in,
	transition_out,
	validate_slots
} from "/vendor/.vite-deps-svelte_internal.js__v--686dd903.js";

import { onMount } from "/vendor/.vite-deps-svelte.js__v--686dd903.js";
import { Toast, Button } from "/vendor/.vite-deps-flowbite-svelte.js__v--f1815d76.js";
import { fly } from "/vendor/.vite-deps-svelte_transition.js__v--686dd903.js";
import appConfig from "/src/config/config.ts.js";
import __vite__cjsImport5_jquery from "/vendor/.vite-deps-jquery.js__v--a4b2e1b0.js"; const jQuery = __vite__cjsImport5_jquery.__esModule ? __vite__cjsImport5_jquery.default : __vite__cjsImport5_jquery;
import AlertContent from "/src/components/popups/AlertContent.svelte.js";
const file = "src/components/popups/BlockPaste.svelte";

function create_fragment(ctx) {
	let div;
	let alertcontent;
	let div_class_value;
	let div_style_value;
	let current;

	alertcontent = new AlertContent({
			props: { props: /*props*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(alertcontent.$$.fragment);
			attr_dev(div, "id", "toast-top-left");
			attr_dev(div, "class", div_class_value = "fixed z-[1000] flex items-start w-full max-w-xl p-0 shadow-md " + /*position*/ ctx[2] + "-5 right-5");

			attr_dev(div, "style", div_style_value = /*toastStatus*/ ctx[1]
			? "display: block !important"
			: "display: none !important");

			attr_dev(div, "role", "alert");
			add_location(div, file, 72, 0, 1871);
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
			alertcontent.$set(alertcontent_changes);

			if (!current || dirty & /*position*/ 4 && div_class_value !== (div_class_value = "fixed z-[1000] flex items-start w-full max-w-xl p-0 shadow-md " + /*position*/ ctx[2] + "-5 right-5")) {
				attr_dev(div, "class", div_class_value);
			}

			if (!current || dirty & /*toastStatus*/ 2 && div_style_value !== (div_style_value = /*toastStatus*/ ctx[1]
			? "display: block !important"
			: "display: none !important")) {
				attr_dev(div, "style", div_style_value);
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
	validate_slots('BlockPaste', slots, []);
	let { props } = $$props;
	let toastStatus = false;
	let timeoutVariable;

	const reactOnPaste = () => {
		$$invalidate(1, toastStatus = true);

		timeoutVariable = setTimeout(
			() => {
				$$invalidate(1, toastStatus = false);
			},
			appConfig.toastTimeoutInSeconds * 1000
		);
	};

	jQuery(document).on("paste", function (e) {
		e.preventDefault();
		reactOnPaste();

		jQuery("div[contenteditable='true']").each(function () {
			jQuery(this).html("");
		});

		let $target = jQuery(e.target);

		setTimeout(
			function () {
				$target.html("");
				$target.val("");
			},
			0
		);

		return false;
	});

	jQuery("div").on("paste", function (e) {
		e.preventDefault();
		reactOnPaste();
		let $target = jQuery(e.target);

		jQuery("div[contenteditable='true']").each(function () {
			jQuery(this).html(appConfig.pasteBlockedContent);
		});

		setTimeout(
			function () {
				$target.html("");
				$target.val("");
			},
			0
		);

		return false;
	});

	jQuery(document.body).on("dragover", function (e) {
		e.preventDefault();
		reactOnPaste();

		//        e.stopPropagation();
		let $target = jQuery(e.target);

		setTimeout(
			function () {
				$target.html("");
				$target.val("");
			},
			0
		);

		return false;
	});

	jQuery(document.body).on("drop", function (e) {
		e.preventDefault();
		reactOnPaste();

		//        e.stopPropagation();
		let $target = jQuery(e.target);

		setTimeout(
			function () {
				$target.html("");
				$target.val("");
			},
			0
		);

		return false;
	});

	let position;

	if (props.location === "top") {
		position = "top";
	} else {
		position = "bottom";
	}

	$$self.$$.on_mount.push(function () {
		if (props === undefined && !('props' in $$props || $$self.$$.bound[$$self.$$.props['props']])) {
			console.warn("<BlockPaste> was created without expected prop 'props'");
		}
	});

	const writable_props = ['props'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BlockPaste> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('props' in $$props) $$invalidate(0, props = $$props.props);
	};

	$$self.$capture_state = () => ({
		onMount,
		Toast,
		Button,
		fly,
		appConfig,
		jQuery,
		AlertContent,
		props,
		toastStatus,
		timeoutVariable,
		reactOnPaste,
		position
	});

	$$self.$inject_state = $$props => {
		if ('props' in $$props) $$invalidate(0, props = $$props.props);
		if ('toastStatus' in $$props) $$invalidate(1, toastStatus = $$props.toastStatus);
		if ('timeoutVariable' in $$props) timeoutVariable = $$props.timeoutVariable;
		if ('position' in $$props) $$invalidate(2, position = $$props.position);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [props, toastStatus, position];
}

class BlockPaste extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { props: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BlockPaste",
			options,
			id: create_fragment.name
		});
	}

	get props() {
		throw new Error("<BlockPaste>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set props(value) {
		throw new Error("<BlockPaste>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

import * as ___SVELTE_HMR_HOT_API from "/vendor/svelte-hmr-runtime-hot-api-esm.js__v--cfdbb230.js";import { adapter as ___SVELTE_HMR_HOT_API_PROXY_ADAPTER } from "/vendor/svelte-hmr-runtime-proxy-adapter-dom.js__v--cfdbb230.js";if (import.meta && import.meta.hot) { if (false) import.meta.hot.acceptExports(['default']);; BlockPaste = ___SVELTE_HMR_HOT_API.applyHmr({ m: import.meta, id: "/home/godwin/Desktop/Personal/Github/Hackathon/TiDBFutureApp/aimon/extension/src/components/popups/BlockPaste.svelte", hotOptions: {"preserveLocalState":false,"noPreserveStateKey":["@hmr:reset","@!hmr"],"preserveAllLocalStateKey":"@hmr:keep-all","preserveLocalStateKey":"@hmr:keep","noReload":false,"optimistic":false,"acceptNamedExports":true,"acceptAccessors":true,"injectCss":false,"cssEjectDelay":100,"native":false,"importAdapterName":"___SVELTE_HMR_HOT_API_PROXY_ADAPTER","noOverlay":true,"allowLiveBinding":false,"partialAccept":true}, Component: BlockPaste, ProxyAdapter: ___SVELTE_HMR_HOT_API_PROXY_ADAPTER, acceptable: true, preserveLocalState: false, emitCss: true, }); }
export default BlockPaste;


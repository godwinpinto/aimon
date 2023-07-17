import { makeApplyHmr } from "/vendor/svelte-hmr-runtime-index.js__v--cfdbb230.js"

export const applyHmr = makeApplyHmr(args =>
  Object.assign({}, args, {
    hot: args.m.hot,
  })
)

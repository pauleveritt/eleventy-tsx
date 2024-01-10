# Eleventy, ESM, and TS/TSX

Eleventy (11ty) 3.0 [supports ESM](https://www.11ty.dev/blog/canary-eleventy-v3/). Yay! Along the way, Zach is
unbundling some template languages, which is a good thing.

In this repo, we'll set up 11ty to use: ESM (duh), TypeScript (wuh?), and TSX (WAT?). For full tooling pleasure, we'll
throw in Vitest. Impatient for the "how"? We're using the [tsx](https://github.com/privatenumber/tsx) package, which
uses `esbuild`. (We're not using Vite.)

## Why TS? Why TSX?

11ty prides itself on being a simple, powerful SSG for JavaScript. No build tooling, no magic. At first glance,
TypeScript and JSX/TSX seem to be a bad fit. If you're from that world, there are lots of galactic-framework-VC-backed
choices that will delight your inner architecture astronaut.

That's not you. But while you might not want the full footgun experience, perhaps using TypeScript is your jam. When
paired with a good IDE, it makes for a good DX, for those that like tooling.

Same for JSX/TSX. _Especially_ for TSX. Having a template language with good squigglies, autocomplete, and debugging
is...chef's kiss.

Again -- we know this isn't the 11ty way. But it shows that 11ty's goodness can extend into a next level of tooling.

## 1. Get 11ty 3.0 and ESM

In a mostly-empty `package.json`, we'll add the 11ty dependency and -- crucially -- indicate that this is an ESM
project. As [Zach explains](https://www.11ty.dev/blog/canary-eleventy-v3/#new-features-and-a-short-upgrade-guide), this
flips the switch:

```
  "scripts": {
    "build": "npx @11ty/eleventy"
  },
  "type": "module",
  "dependencies": {
    "@11ty/eleventy": "3.0.0-alpha.4"
  },
```

We add a minimal `eleventy.config.js` file at that top. See: this is already ESM, no more `module.exports`!

```javascript
export default function (eleventyConfig) {
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
```

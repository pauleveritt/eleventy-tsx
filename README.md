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

We add a minimal `eleventy.config.ts` file at that top. See: this is already ESM, no more `module.exports`!

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

## 2. Switch to TypeScript

We have two `.js` files. Maybe you like TypeScript? Let's switch this project to `.ts`. _We'll leave TSX for the next
step._

First, of course, add the magical bag of mystery known as the `tsconfig.json` file. I hope this is right. I always just
cut, paste, and pray.

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ESNext",
    "moduleResolution": "Node",
    "outDir": "dist",
    "rootDir": ".",
    "strict": false,
    "jsx": "react-jsx",
    "jsxImportSource": "jsx-async-runtime"
  },
  "exclude": ["node_modules", "dist"]
}
```

Next, let's install the [tsx](https://github.com/privatenumber/tsx) package which makes a nice wrapper
around [esbuild TypeScript](https://esbuild.github.io/content-types/#typescript), the real star of the show.

We'll also change our `build` script to use `tsx`"

```
  "scripts": {
    "build": "tsx node_modules/@11ty/eleventy/cmd.cjs --config=eleventy.config.ts"
  },
  "devDependencies": {
    "tsx": "^4.7.0"
  }
```

Yes, your eyes didn't deceive you -- let's rename our config file to `eleventy.config.ts` and sprinkle in some
TypeScript syntax. 4 characters of syntax (`: any`) to be precise.

```typescript
export default function (eleventyConfig: any) {
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
```

We also rename our template to `src/index.11ty.ts` and a return type:

```typescript
export function render(): string {
  return "<h1>Hello ESM</h1>";
}
```

We run our build and...wump wump:

```
[11ty] Wrote 0 files in 0.01 seconds (v3.0.0-alpha.4)
```

We need to return to `eleventy.config.ts` and teach it about `.ts` files. We'll go ahead and teach about `.tsx` as well.

```typescript
export default function (eleventyConfig: any) {
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
```

This time when we build -- success!

```
[11ty] Writing dist/index.html from ./src/index.11ty.ts
[11ty] Wrote 1 file in 0.02 seconds (v3.0.0-alpha.4)
```

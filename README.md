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

We also rename our template to `src/index.11ty.tsx` and a return type:

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
[11ty] Writing dist/index.html from ./src/index.11ty.tsx
[11ty] Wrote 1 file in 0.02 seconds (v3.0.0-alpha.4)
```

## Step 3: TSX

You know, JSX takes a lot of grief. I get it. But you can't beat the tooling support. Using TSX as a template language
for 11ty is really sweet.

The first thing to understand: `esbuild` has JSX support. But it doesn't actually do JSX processing. It expects to be
pointed at a JSX renderer. Most people associate that with React, Preact, or other build-tool-colossus (negative)
experiences.

But there are actually _standalone_ JSX processors that can run in Node during build. (Or even in the browser,
post-load.) We're going to use [jsx-async-runtime](https://github.com/jeasx/jsx-async-runtime). (We previously used
vhtml.)

- Support TS typing
- Supported, active
- Lets us eliminate `import h` via tsconfig `jsImportSource`
- It's async (unlike Preact's renderer) to allow 11ty Image

First, we install the package as a dependency:

```
  "dependencies": {
    "@11ty/eleventy": "3.0.0-alpha.4",
    "jsx-async-runtime": "^0.1.3"
  },
```

We now need to tell our `tsx` package (really: `esbuild`) how to handle TSX. You can pass command line arguments. Or,
you can infer from `tsconfig.json`, which we'll do:

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

These two new compiler options are important:

- `"jsx": "react-jsx"` enables the `esbuild` ["automatic" mode](https://github.com/evanw/esbuild/releases/tag/v0.14.51).
  It actually has nothing to do with React.
- `"jsxImportSource": "jsx-async-runtime"` lets
  you [avoid importing an `h` function](https://esbuild.github.io/content-types/#auto-import-for-jsx) at the top of all
  your files.

These are confusing and brittle, especially the second part.

Let's rename our file to `src/index.11ty.tsx` and return TSX instead of a string:

```typescript jsx
export function render(): JSX.Element {
    return <h1>Hello TSX</h1>;
}
```

Several interesting points. Obviously, the `return` hands back `JSX`, which indicate in the `JSX.Element` return type.

But notice what's missing. In our `vhtml` setup, we had to preface each line with this:

```typescript
import h, { JSX } from "vhtml";
```

This was annoying. Not the least of which: `h` wasn't even used in the file and showed up as an unused import.

If we try to build now, it will...fail. 11ty templates are supposed to return a string, not a JSX element. Let's fix
that in `elevent.config.ts`:

```typescript
import { renderToString } from "jsx-async-runtime";

export default function (eleventyConfig: any) {
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

  eleventyConfig.addTransform("tsx", async (content: any) => {
    const result = await renderToString(content);
    return `<!doctype html>\n${result}`;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
```

Now when you build, you'll get this in `dist/index.html`:

```html
<!doctype html>
<h1>Hello TSX</h1>
```

To recap what we did here:

- Add JSX handling to tsconfig.json
- Changed our one page/template to TSX
- Taught 11ty to render `.tsx` templates from `JSX.Element` to a string

## Step 4: Testing with Vitest

We now have TypeScript for Eleventy with TSX as a template language. This lets us use component-driven development in
11ty.

For example, we can work on small chunks -- in isolation -- and work happily in tests, using Vitest. We'll start by
adding a dependency and a script:

```
  "scripts": {
    "test": "vitest run"
  },
  "devDependencies": {
    "vitest": "^1.1.3",
  }
```

We need to wire up Vitest in a `vitest.config.js` file at the root:

```javascript
import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxInject: "import { jsx } from 'jsx-async-runtime/jsx-runtime'",
    jsxFactory: "jsx",
    jsxImportSource: "jsx-async-runtime",
  },
  test: {
    include: ["./src/**/*.test.tsx"],
  },
});
```

This overrides the same settings used by `tsx` for running Eleventy builds. Vitest uses `esbuild` (as does `tsx`) but
for whatever reason, didn't respect the `tsconfig.json` settings without help. Big shoutout
to [Joaquín Sánchez](https://github.com/userquin) from Vite/Vitest fame
for [figuring this out for me](https://github.com/privatenumber/tsx/discussions/453#discussioncomment-8194275).

Next, let's rewrite `index.11ty.tsx` to have a named-export component, which we then re-export for Eleventy's `render`
protocol for templates. This is for convenience, so you don't have all of your components named `render`:

```typescript jsx
export function Index(): JSX.Element {
    return <h1>Hello TSX</h1>;
}

export const render = Index;
```

Now we can write a test of the `Index` component, using Vitest:

```typescript jsx
import {expect, test} from "vitest";
import {renderToString} from "jsx-async-runtime";
import {Index} from "./index.11ty";

test("render index", async () => {
    const result = <Index/>;
    const rendered = await renderToString(result);
    expect(rendered).toEqual("<h1>Hello TSX</h1>");
});
```

This test passes when we run `npm test`.

## Step 5: DOM Testing with `Happy DOM` and `Testing Library`

We're in great shape. We now 11ty development using tooling-friendly TS and TSX, for those that prefer such things. We
also have testing with the super-cool Vitest.

Our test right now asserts a string. We're going to want richer testing. Let's hook
up [Happy DOM](https://github.com/capricorn86/happy-dom) as a fake web browser
and [Testing Library](https://testing-library.com) for role-based assertions.

First, over to `package.json` to add some dependencies:

```
"devDependencies": {
  "happy-dom": "^13.0.0",
  "@testing-library/dom": "^9.3.4",
},
```

Our `vitest.config.js` file needs to be told to use Happy DOM as the global `document`:

```javascript
export default defineConfig({
  test: {
    environment: "happy-dom",
  },
});
```

Our `index.test.tsx` file can now do a real DOM with the Testing Library approach to assertions:

```typescript jsx
import { expect, test } from "vitest";
import { renderToString } from "jsx-async-runtime";
import { Index } from "./index.11ty";
import { screen } from "@testing-library/dom";

test("render index", async () => {
  const result = <Index />;
  document.body.innerHTML = await renderToString(result);
  expect(screen.getByText("Hello TSX")).to.exist;
});
```

## Step 999: Async Components

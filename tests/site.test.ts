import { expect, test } from "vitest";
import Eleventy from "@11ty/eleventy";
import { renderToString } from "jsx-async-runtime";

// test("should load another Eleventy site", async () => {
//   const elev = new Eleventy("./", "./_site", {
//     config: (eleventyConfig) => {
//       // 3.0.0-alpha.6+
//       eleventyConfig.setLayoutsDirectory("my_layouts");
//       eleventyConfig.setIncludesDirectory("my_includes");
//       eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
//         key: "11ty.js",
//       });
//
//       eleventyConfig.addTransform("tsx", async (content: any) => {
//         const result = await renderToString(content);
//         return `<!doctype html>\n${result}`;
//       });
//     },
//   });
//   await elev.init();
//
//   expect(elev.directories.layouts).toEqual("my_includes");
// });

test("should load an Eleventy site", async () => {
  const elev = new Eleventy("./site", "./dist", {
    config: (eleventyConfig) => {
      eleventyConfig.setLayoutsDirectory("../_layouts");
      eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
        key: "11ty.js",
      });
      eleventyConfig.addTransform("tsx", async (content: any) => {
        const result = await renderToString(content);
        return `<!doctype html>\n${result}`;
      });
    },
  });

  const results = await elev.toJSON();
  expect(results[0].content).toContain("Hello JS");
});

import "tsx/esm";
import { jsxToString } from "jsx-async-runtime";

export async function eleventySetup(eleventyConfig) {
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: function () {
      return async function (data) {
        const content = await this.defaultRenderer(data);
        const result = await jsxToString(content);
        return `<!doctype html>\n${result}`;
      };
    },
  });

  eleventyConfig.addTemplateFormats("11ty.ts,11ty.tsx");
  eleventyConfig.addWatchTarget("./components/");

  return {
    dir: {
      input: "site",
      layouts: "../_layouts",
    },
  };
}

export default eleventySetup;

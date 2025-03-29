import "tsx/esm";
import { jsxToString } from "jsx-async-runtime";

export default async function (eleventyConfig) {
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: function () {
      return async function (data) {
        const content = await this.defaultRenderer(data);
        return await jsxToString(content);
      };
    },
  });

  eleventyConfig.addTemplateFormats("11ty.ts,11ty.tsx");

  return {
    dir: {
      input: "tests/stubs/general/",
      layouts: "../../../_layouts/",
      output: "tests/stubs/general/_site",
    },
  };
}

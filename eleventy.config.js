import { jsxToString } from "jsx-async-runtime";

export function eleventySetup(eleventyConfig) {
  // Set up JSX/TSX as a template language
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

  return {
    dir: {
      input: "site",
      layouts: "../_layouts",
    },
  };
}

export default eleventySetup;

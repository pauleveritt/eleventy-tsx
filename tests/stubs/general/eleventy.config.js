import "tsx/esm";
import eleventySetup from "../../../eleventy.config.js";

export default async function (eleventyConfig) {
  await eleventySetup(eleventyConfig);
  return {
    dir: {
      input: "tests/stubs/general/",
      layouts: "../../../_layouts/",
      output: "tests/stubs/general/_site",
    },
  };
}

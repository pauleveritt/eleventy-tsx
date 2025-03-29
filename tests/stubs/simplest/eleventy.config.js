import "tsx/esm";
import eleventySetup from "../../../eleventy.config.js";

export default async function (eleventyConfig) {
  await eleventySetup(eleventyConfig);
  return {
    dir: {
      input: "tests/stubs/simplest/",
      layouts: "../../../_layouts/",
      output: "tests/stubs/simplest/_site",
    },
  };
}

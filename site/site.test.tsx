import { test } from "vitest";

import { Eleventy } from "@11ty/eleventy";

test("Load the site via Eleventy", async () => {
  const elev = new Eleventy("site", "dist", {
    configPath: "./elev.config.js",
  });

  elev.setIsVerbose(false);
  await elev.init();
  let result = await elev.toJSON();
});

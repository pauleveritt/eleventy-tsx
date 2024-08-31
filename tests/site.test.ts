import { expect, test } from "vitest";
import Eleventy from "@11ty/eleventy";
import { renderToString } from "jsx-async-runtime";

test("should load an Eleventy site", async () => {
  const elev = new Eleventy(null, null, {
    configPath: "./eleventy.config.js",
  });

  const results = await elev.toJSON();
  expect(results[0].content).toContain("Hello My Site");
});

import { beforeAll, test } from "vitest";
// @ts-ignore
import Eleventy from "@11ty/eleventy";

// test("Generate a site from JS config", async () => {
//   const elev = new Eleventy(null, null, {
//     configPath: "tests/stubs/general/eleventy.config.js",
//   });
//   const results = await elev.toJSON();
//   expect(results).toHaveLength(1);
// });

// --------

type MappingValue = {
  url: string;
  content: string;
};
type Mapping = {
  [index: string]: string;
};

type GetPath = {
  (path: string): HTMLElement;
};
let results: Mapping = {};
let getBody: GetPath, getHead: GetPath;

beforeAll(async () => {
  // Make a re-usable DOM Parser.
  const domParser = new window.DOMParser();

  // Build the stub 11ty site
  const elev = new Eleventy(null, null, {
    configPath: "tests/stubs/general/eleventy.config.js",
  });

  // Make a mapping of path to HTML result
  const items = await elev.toJSON();
  items.forEach(
    (value: MappingValue, index: string) =>
      (results[value.url] = value.content),
  );

  // Use the closure to provide functions that can make a document
  // from a result path
  getBody = (path: string): HTMLElement => {
    const content = results[path];
    const doc = domParser.parseFromString(content, "text/html");
    return doc.body;
  };
  getHead = (path: string): HTMLElement => {
    const content = results[path];
    const doc = domParser.parseFromString(content, "text/html");
    return doc.head;
  };
});

// test("Has more than one result", async () => {
//   const head = getHead("/");
//   expect(getByText(head, "The Index Page")).toBeDefined;
// });
//
test("New Happy-DOM and parsing", () => {
  const result =
    "<html lang='en'><head><title>Hi</title></head><body>Hello World</body></html>";
  document.write(result);
  const root = document.getRootNode();
});

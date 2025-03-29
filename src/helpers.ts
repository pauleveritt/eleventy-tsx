import Eleventy from "@11ty/eleventy";
import { jsxToString } from "jsx-async-runtime";
import { beforeAll } from "vitest";

type MappingValue = {
  url: string;
  content: string;
};
type Mapping = {
  [index: string]: string;
};

export type GetPath = {
  (path: string): HTMLElement;
};

export async function getPages(configPath: string): Promise<{
  getBody: GetPath;
  getHead: GetPath;
}> {
  // Make a re-usable DOM Parser.
  const domParser = new window.DOMParser();

  // Given a path to a stub 11ty config file, run
  // 11ty and convert the JSON results to a mapping where
  // each key extracts the HTML string.
  const pages: Mapping = {};
  const elev = new Eleventy(null, null, {
    configPath,
  });

  // Make a mapping of path to HTML result
  const items = await elev.toJSON();
  items.forEach((value: MappingValue) => (pages[value.url] = value.content));

  // Use the closure to provide functions that can make a document
  // from a result path
  const getBody = (path: string): HTMLElement => {
    const content = pages[path];
    const doc = domParser.parseFromString(content, "text/html");
    return doc.body;
  };
  const getHead = (path: string): HTMLElement => {
    const content = pages[path];
    const doc = domParser.parseFromString(content, "text/html");
    return doc.head;
  };
  return { getBody, getHead };
}

export async function getBody(jsx: JSX.Element): Promise<HTMLElement> {
  // Make a re-usable DOM Parser.
  const domParser = new window.DOMParser();
  const html = await jsxToString(jsx);
  const doc = domParser.parseFromString(html, "text/html");
  return doc.body;
}

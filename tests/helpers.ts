import Eleventy from "@11ty/eleventy";

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
    document.write(pages[path]);
    return document.body;
  };
  const getHead = (path: string): HTMLElement => {
    document.write(pages[path]);
    return document.head;
  };
  return { getBody, getHead };
}

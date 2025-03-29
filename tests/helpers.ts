import Eleventy from "@11ty/eleventy";

type MappingValue = {
  url: string;
  content: string;
};
type Mapping = {
  [index: string]: string;
};

export type SetDocument = (path: string) => void;

export async function getPages(stubConfig: string) {
  // Given a path to a stub 11ty config file, run
  // 11ty and convert the JSON results to a mapping where
  // each key extracts the HTML string.
  const pages: Mapping = {};
  const elev = new Eleventy(null, null, {
    configPath: "tests/stubs/general/eleventy.config.js",
  });

  // Make a mapping of path to HTML result
  const items = await elev.toJSON();
  items.forEach((value: MappingValue) => (pages[value.url] = value.content));
  return (path: string) => {
    // Change the document content to the HTML string from
    // the results at the path
    document.write(pages["/"]);
  };
}

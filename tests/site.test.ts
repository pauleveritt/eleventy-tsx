import { beforeAll, expect, test } from "vitest";
import { getByText } from "@testing-library/dom";
import { getPages, SetDocument } from "./helpers";

let setDocument: SetDocument;

beforeAll(async () => {
  setDocument = await getPages("tests/stubs/general/eleventy.config.js");
});

test("New Happy-DOM and parsing", () => {
  setDocument("/");
  expect(getByText(document.body, "The home page.")).toBeDefined;
});

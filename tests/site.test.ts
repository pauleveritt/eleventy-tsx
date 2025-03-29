import { beforeAll, expect, test } from "vitest";
import { getByRole, getByText } from "@testing-library/dom";
import { getPages, GetPath } from "./helpers";

let getBody: GetPath;

beforeAll(async () => {
  const results = await getPages("tests/stubs/general/eleventy.config.js");
  getBody = results.getBody;
});

test("New Happy-DOM and parsing", () => {
  const body = getBody("/");
  expect(getByRole(body, "heading").textContent).toEqual(
    "Hello The Index Page",
  );
  expect(getByText(body, "The home page.")).toBeDefined;
});

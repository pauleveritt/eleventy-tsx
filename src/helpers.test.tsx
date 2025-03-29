import { expect, test } from "vitest";
import { getBody, getPages } from "./helpers";
import { getByRole, getByText } from "@testing-library/dom";

test("HTML string and get the body", async () => {
  const body = await getBody(<h1>Hello</h1>);
  expect(getByRole(body, "heading").textContent).toEqual("Hello");
});

test("Run 11ty and test the body of index page", async () => {
  const results = await getPages("tests/stubs/simplest/eleventy.config.js");
  const getBody = results.getBody;
  const body = getBody("/");
  expect(getByText(body, "The home page.")).toBeDefined;
});

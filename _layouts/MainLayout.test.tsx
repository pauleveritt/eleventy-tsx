import { expect, test } from "vitest";
import { jsxToString } from "jsx-async-runtime";
import { MainLayout } from "./MainLayout.11ty";
import { getByText } from "@testing-library/dom";
import { ViewProps } from "../src/eleventy";

test("render MainLayout", async () => {
  const viewProps: ViewProps = {
    content: "<p>This is <em>the body</em></p>",
    title: "My Site",
  };
  const result = MainLayout(viewProps);
  document.body.innerHTML = await jsxToString(result);
  expect(getByText(document.body, `Hello My Site`)).to.exist;
  expect(getByText(document.body, `the body`)).to.exist;
});

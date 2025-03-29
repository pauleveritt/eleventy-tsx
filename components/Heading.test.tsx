import { expect, test } from "vitest";
import { jsxToString } from "jsx-async-runtime";
import { getByText } from "@testing-library/dom";
import { Heading } from "@components/Heading";

test("render heading with default name", async () => {
  const result = <Heading />;
  const html = await jsxToString(result);
  document.body.innerHTML = await jsxToString(result);
  expect(getByText(document.body, "Hello TSX")).to.exist;
});

test("render heading with custom name", async () => {
  const result = <Heading name={`World`} />;
  document.body.innerHTML = await jsxToString(result);
  expect(getByText(document.body, "Hello World")).to.exist;
});

import { expect, test } from "vitest";
import { getByRole, getByText } from "@testing-library/dom";
import { Heading } from "./Heading";
import { getBody } from "../tests/helpers";

test("render heading with default name", async () => {
  const body = await getBody(<Heading />);
  expect(getByText(body, "Hello TSX")).toBeDefined;
});

test("render heading with custom name", async () => {
  const body = await getBody(<Heading name={`World`} />);
  expect(getByText(body, "Hello World")).toBeDefined;
});

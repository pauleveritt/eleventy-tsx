export type HeadingProps = {
  name?: string;
};

export function Heading({ name = "TSX" }: HeadingProps) {
  console.log("Re-rendering");
  return <h1>Hello {name}</h1>;
}

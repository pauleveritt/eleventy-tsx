export type HeadingProps = {
  name?: string;
};

export function Heading({ name = "TSX" }: HeadingProps) {
  return <h1>Hello {name}</h1>;
}

import { Heading } from "../components/Heading";
import { ViewProps } from "../eleventy";

export function render({ content, title }: ViewProps): JSX.Element {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body>
        <Heading name={title} />
        {content}
      </body>
    </html>
  );
}

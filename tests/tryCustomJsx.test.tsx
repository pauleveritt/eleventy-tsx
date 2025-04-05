import { expect, test } from "vitest";
import { jsxToString } from "jsx-async-runtime";

function Header() {
  return <h1>Hello ${this.flag}</h1>;
}
function App() {
  // this.jsxToString = () => <p>nope</p>;
  return (
    <main>
      <Header />
    </main>
  );
}
test("See if this.jsxToString is actually passed down", async () => {
  const $jsxToString = jsxToString;
  const context = {
    flag: 99,
    $jsxToString,
    jsxToString: $jsxToString,
  };
  const jsx = <App />;
  const html = await jsxToString.call(context, jsx);
  document.body.innerHTML = html;
  const newHtml = document.body.innerHTML;
  expect(newHtml).toEqual("<h1>Hello</h1>");
});

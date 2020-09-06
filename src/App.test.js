import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// test takes in two args. The descrip of the test is runs and an anonymous func
test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

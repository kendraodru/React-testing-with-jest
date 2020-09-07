import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// test takes in two args. The descrip of the test is runs and an anonymous func
describe("App", () => {
  test("renders testing first lesson", () => {
    render(<App />);

    // screen.debug(); renders the html in our terminal

    // a string argument is used for the exact match,
    // a regular expression can be used for a partial match which
    // is often more convenient:
    // fails
    // expect(screen.getByText("Search")).toBeInTheDocument();

    // succeeds - looks for exact match
    expect(screen.getByText("Search:")).toBeInTheDocument();

    // succeeds -
    expect(screen.getByText(/Search:/)).toBeInTheDocument();
  });
  test("react testing second lesson", () => {
    render(<App />);

    // screen.getByRole(""); react provides you avail roles, when there's no input

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  test("react testing third lesson", () => {
    render(<App />);
    // screen.debug();

    // fails
    // expect(screen.getByText(/Searches for JavaScript/)).toBeNull();
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  });
  test("react testing fourth lesson, using findByText", async () => {
    render(<App />);
    // null at first render
    // screen.debug();
    expect(screen.queryByText(/Signed in as/)).toBeNull();
    // Signed in as after fetching user
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
    // screen.debug();
  });
  test("react testing interaction", () => {
    render(<App />);

    screen.debug();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    screen.debug();
  });
});

// What's the difference between getBy vs queryBy?
// getBy returns an element or an error. It's a convenient side-effect of
// getBy that it returns an error,
// However, this makes it difficult to check for elements which shouldn't
// be there:
// queryBy:
//  In order to assert elements which aren't there, we can exchange
// getBy with queryBy:
// FindBy:
// The findBy search variant is used for asynchronous elements which will be
// there eventually. For a suitable scenario

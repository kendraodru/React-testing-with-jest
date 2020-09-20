import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import App from "./App";
import { Search } from "./App";

jest.mock("axios");

describe("App", () => {
  test("react testing interaction", async () => {
    render(<App />);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    act(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "JavaScript" },
      });
    });

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
    screen.debug();
  });
  test("react testing with userEvent", async () => {
    render(<App />);

    await screen.findByText(/Signed in as/);
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    await userEvent.type(screen.getByRole("textbox"), "JavaScript");
    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});

describe("Search", () => {
  test("calls the onChange callback handler", () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
  test("calls the onChange callback handler with userEvent", async () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    await userEvent.type(screen.getByRole("textbox"), "JavaScript");

    expect(onChange).toHaveBeenCalledTimes(10);
  });
});

describe("App with Axios", () => {
  test("fetches stories from an API and displays them", async () => {
    const stories = [
      { objectID: "1", title: "Hello" },
      { objectID: "2", title: "React" },
    ];

    const promise = Promise.resolve({ data: { hits: stories } });

    axios.get.mockImplementationOnce(() => promise);
    render(<App />);

    await userEvent.click(screen.getByRole("button"));
    await act(() => promise);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("fetches stories from an API and fails", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<App />);

    await userEvent.click(screen.getByRole("button"));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
});

// Notes:
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

// fireEvent:
// The fireEvent function takes an element (here the input field by textbox role)
// and an event (here an event which has the value "JavaScript")

// userEvent:
// userEvent API mimics the actual browser behavior more closely than the
// fireEvent API. For example, a fireEvent.change() triggers only a change event
// whereas userEvent.type triggers a change event, but also keyDown, keyPress,
// and keyUp events.Whenever possible, use userEvent over fireEvent when using
// React Testing Library.

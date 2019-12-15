import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("Application", () => {
  test("renders header", () => {
    const { getByText } = render(<App />);
    const header = getByText(/React Dark Mode/i);
    expect(header).toBeInTheDocument();
  });

  test("renders dark mode text", () => {
    const { getByText } = render(<App />);
    const text = getByText(
      /The app uses your browser preference to display a light or dark mode. You can overide this using the toggle switch below./i
    );
    expect(text).toBeInTheDocument();
  });
});

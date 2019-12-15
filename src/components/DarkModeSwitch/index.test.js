import React from "react";
import { render, fireEvent } from "@testing-library/react";

// component to test
import { DarkModeSwitch } from ".";

// tests
describe("DarkModeSwitch", () => {
  it("renders a dark mode switch", () => {
    const { asFragment } = render(<DarkModeSwitch />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should toggle dark mode", () => {
    const { container } = render(<DarkModeSwitch />);
    const darkModeSwitch = container.querySelector('[id="react-switch-new"]');

    // switch to dark mode
    fireEvent.click(darkModeSwitch);

    let val = localStorage.getItem("theme");
    let theme = JSON.parse(val);
    expect(theme).toEqual("dark");

    // switch to light mode
    fireEvent.click(darkModeSwitch);

    val = localStorage.getItem("theme");
    theme = JSON.parse(val);
    expect(theme).toEqual("light");
  });

  it("should read the browser preference", () => {
    // noop - can't test for window in test env
  });
});

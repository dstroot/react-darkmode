import React from "react";
import { render } from "@testing-library/react";

// component to test
import Toggle from ".";

// mock toggle function
const toggle = jest.fn();

describe("Toggle", () => {
  it("renders a toggle switch - OFF", () => {
    const { asFragment } = render(
      <Toggle isOn={false} handleToggle={toggle} onColor="blue" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a toggle switch - ON", () => {
    const { asFragment } = render(
      <Toggle isOn={true} handleToggle={toggle} onColor="blue" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

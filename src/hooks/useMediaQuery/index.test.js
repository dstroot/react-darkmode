import React from "react";
import { render } from "@testing-library/react";

// import component to test
import useMediaQuery from "../useMediaQuery";
import mediaQuery from "css-mediaquery";

// simulate window resize
const fireResize = width => {
  window.innerWidth = width;
  window.dispatchEvent(new Event("resize"));
};

// mock matchMedia
const createMatchMedia = width => {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {}
  });
};

// Test component that uses the Hook
const EffecfulComponent = () => {
  const result = useMediaQuery(`(max-width: 400px)`);
  return <span>{result}</span>;
};

describe("useMediaQuery", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  it("renders", () => {
    const { asFragment } = render(<EffecfulComponent />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("it should change when window width changes", () => {
    fireResize(320);

    const { asFragment } = render(<EffecfulComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});

// https://medium.com/@dawchihliou/testing-react-hooks-6d3ae95cd838
// https://material-ui.com/components/use-media-query/

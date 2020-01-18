import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";

// import { render, cleanup as cleanupReact } from '@testing-library/react';
// import { cleanup as cleanupHooks, renderHook } from '@testing-library/react-hooks';

// component to test
import useBoolean from ".";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const Test = () => {
  const [value, setTrue, setFalse] = useBoolean(false);

  return (
    <>
      <div>{value.toString()}</div>
      <button onClick={setTrue}>Make True</button>
      <button onClick={setFalse}>Make False</button>
    </>
  );
};

describe("useBoolean", () => {
  it("should be an arrow function", () => {
    // expect(useBoolean).to.be.a("function");
    expect(useBoolean.prototype).toBe.empty;
  });

  // it('should return a single function', () => {
  //   const { result } = renderHook(() => useBoolean());
  //   expect(result.current).to.be.a('function');
  // });

  it("should return false as the initial state", () => {
    const { container } = render(<Test />);

    expect(container.firstChild.textContent).toBe("false");
  });

  it("should update the state to true", () => {
    const { container, getByText } = render(<Test />);
    const button = getByText("Make True");

    fireEvent.click(button);
    expect(container.firstChild.textContent).toBe("true");

    // if we press the button twice the state should not change
    fireEvent.click(button);
    expect(container.firstChild.textContent).toBe("true");
  });

  it("should update the state to false", () => {
    const { container, getByText } = render(<Test />);
    const button = getByText("Make False");

    fireEvent.click(button);
    expect(container.firstChild.textContent).toBe("false");

    // if we press the button twice the state should not change
    fireEvent.click(button);
    expect(container.firstChild.textContent).toBe("false");
  });
});

import { useState } from 'react';

function useBoolean(initialValue) {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, setTrue, setFalse];
}

export default useBoolean;

// Again it’s all about making the intent clear, and tidying up the code a bit.
// All we’ve done is move the state and the helper callbacks into a new function,
// and now we can use it in a component like this:

// const [isVisible, showModal, hideModal] = useBoolean(initialValue);

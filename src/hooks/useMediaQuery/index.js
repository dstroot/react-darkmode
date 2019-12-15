import { useState, useEffect } from "react";

const useMediaQuery = query => {
  const [state, setState] = useState(false);
  const supportMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

  useEffect(() => {
    let mounted = true;

    // This defensive check is here for simplicity.
    if (!supportMatchMedia) {
      return undefined;
    }

    // Returns a MediaQueryList object
    const mql = window.matchMedia(query);

    const onChange = () => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    mql.addListener(onChange); // addListener deprecated on most
    // mql.addEventListener("change", onChange); // not supported by safari
    setState(mql.matches);

    // clean up
    return () => {
      mounted = false;
      mql.removeListener(onChange); // addListener deprecated on most
      // mql.removeEventListener("change", onChange); // not supported by safari
    };
  }, [query, supportMatchMedia]);

  return state;
};

export default useMediaQuery;

// https://material-ui.com/components/use-media-query/

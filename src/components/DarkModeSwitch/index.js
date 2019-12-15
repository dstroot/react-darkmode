import React, { useState, useEffect } from "react";

// components
import Toggle from "components/Toggle";
import useBoolean from "hooks/useBoolean";

const themeType = {
  dark: "dark",
  light: "light"
};

export const DarkModeSwitch = () => {
  const [isOn, setTrue, setFalse] = useBoolean(false);
  const [mode, setMode] = useState(() => {
    // defaults
    let theme = themeType.light;
    setFalse();

    // if we are in a browser
    if (typeof window !== "undefined") {
      // is theme set in local storage already?
      const val = localStorage.getItem("theme");
      if (val) {
        theme = JSON.parse(val);
        if (theme === themeType.dark) {
          setTrue();
        }
        return theme;
      }

      // determine browser setting
      if (window.matchMedia("(prefers-color-scheme)").matches) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          theme = themeType.dark;
          setTrue();
        }
        return theme;
      }

      return theme;
    }

    return theme;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.className = mode;
    }
  }, [mode]);

  // if we set local storage inside the toggle function it is
  // only set if the user uses the toggle switch.  Otherwise
  // it is just set by the browser settings.
  const toggleTheme = () => {
    if (mode === themeType.light) {
      setMode(themeType.dark);
      localStorage.setItem("theme", JSON.stringify(themeType.dark));
      setTrue();
    }
    if (mode === themeType.dark) {
      setMode(themeType.light);
      localStorage.setItem("theme", JSON.stringify(themeType.light));
      setFalse();
    }
  };

  return <Toggle isOn={isOn} handleToggle={toggleTheme} />;
};

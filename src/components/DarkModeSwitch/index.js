import React, { useState, useEffect } from "react";

// components
import Toggle from "components/Toggle";
import useBoolean from "hooks/useBoolean";
import useMediaQuery from "hooks/useMediaQuery";

const themeType = {
  dark: "dark",
  light: "light"
};

export const DarkModeSwitch = () => {
  const scheme = useMediaQuery(`screen and (prefers-color-scheme)`);
  const dark = useMediaQuery(`screen and (prefers-color-scheme: dark)`);
  const light = useMediaQuery(`screen and (prefers-color-scheme: light)`);
  const [isOn, setIsOnTrue, setIsOnFalse] = useBoolean(false);
  const [mode, setMode] = useState(() => {
    let theme = themeType.light;
    // if we are in a browser
    if (typeof window !== "undefined") {
      // return theme from local storage
      const val = localStorage.getItem("theme");
      if (val) {
        theme = JSON.parse(val);
        return theme;
      }
      // return default (light)
      return theme;
    }
    // return default (light)
    return theme;
  });

  // update body with class if mode changes and
  // set toggle switch to match mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.className = mode;

      if (mode === themeType.dark) {
        setIsOnTrue();
      }
      if (mode === themeType.light) {
        setIsOnFalse();
      }
    }
  }, [mode, setIsOnFalse, setIsOnTrue]);

  // change mode if browser settings change as long
  // theme is not set in local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const val = localStorage.getItem("theme");
      if (!val) {
        if (scheme) {
          if (dark) {
            setMode(themeType.dark);
          }
          if (light) {
            setMode(themeType.light);
          }
        }
      }
    }
  }, [scheme, dark, light]);

  // if the user uses the toggle switch save the setting in local
  // storage to retain it.  Otherwise just use the browser settings.
  const toggleTheme = () => {
    if (mode === themeType.light) {
      setMode(themeType.dark);
      localStorage.setItem("theme", JSON.stringify(themeType.dark));
    }
    if (mode === themeType.dark) {
      setMode(themeType.light);
      localStorage.setItem("theme", JSON.stringify(themeType.light));
    }
  };

  return <Toggle isOn={isOn} handleToggle={toggleTheme} />;
};

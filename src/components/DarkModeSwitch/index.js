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
  const [isOn, setIsOnTrue, setIsOnFalse] = useBoolean(false);
  const scheme = useMediaQuery(`screen and (prefers-color-scheme)`);
  const dark = useMediaQuery(`screen and (prefers-color-scheme: dark)`);
  const light = useMediaQuery(`screen and (prefers-color-scheme: light)`);
  const [mode, setMode] = useState(() => {
    // defaults
    let theme = themeType.light;
    setIsOnFalse();

    // if we are in a browser
    if (typeof window !== "undefined") {
      // is theme set in local storage already?
      const val = localStorage.getItem("theme");
      if (val) {
        theme = JSON.parse(val);
        if (theme === themeType.dark) {
          setIsOnTrue();
        }

        // set to light, so return default (light)
        return theme;
      }

      // return default (light)
      return theme;
    }

    // return default (light)
    return theme;
  });

  // update body with class if mode changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.className = mode;
    }
  }, [mode]);

  // change mode if browser settings change
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (scheme) {
        if (dark) {
          setMode(themeType.dark);
          setIsOnTrue();
        }
        if (light) {
          setMode(themeType.light);
          setIsOnFalse();
        }
      }
    }
  }, [scheme, dark, light, setIsOnTrue, setIsOnFalse]);

  // if the user uses the toggle switch we save the setting
  // in local storage to retain it.  Otherwise it is just set
  // by the browser settings.
  const toggleTheme = () => {
    if (mode === themeType.light) {
      setMode(themeType.dark);
      localStorage.setItem("theme", JSON.stringify(themeType.dark));
      setIsOnTrue();
    }
    if (mode === themeType.dark) {
      setMode(themeType.light);
      localStorage.setItem("theme", JSON.stringify(themeType.light));
      setIsOnFalse();
    }
  };

  return <Toggle isOn={isOn} handleToggle={toggleTheme} />;
};

import React from "react";
import logo from "./logo.svg";
import "./App.scss";

// components
import { DarkModeSwitch } from "components/DarkModeSwitch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>React Dark Mode</h3>
        <p>
          The app uses your browser preference to display a light or dark mode.
          You can overide this using the toggle switch below.
        </p>
        <div className="center">
          <DarkModeSwitch />
        </div>
      </header>
    </div>
  );
}

export default App;

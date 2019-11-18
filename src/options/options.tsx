import "./options.css";

import React from "react";
import ReactDOM from "react-dom";

import Preferences from "../components/Preferences";

const saveOption = (key: string, value: string) => {
  return browser.storage.sync.set({[key]: value});
};

const restoreOption = async (key: string) => {
  const options = await browser.storage.sync.get(key);
  const option = options[key];
  if (option) return option.toString();
  return null;
};

const App = () => {
  return (
    <div>
      <Preferences save={saveOption} restore={restoreOption} />
    </div>
  );
};

const domContainer = document.querySelector("#app");
ReactDOM.render(<App />, domContainer);

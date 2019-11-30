import "./popup.css";

import React from "react";
import ReactDOM from "react-dom";

import Popup from "../components/Popup";
import {currentUrl} from "../utils";

(async () => {
  const domContainer = document.querySelector("#app");
  const url = await currentUrl();
  ReactDOM.render(<Popup url={url} />, domContainer);
})();

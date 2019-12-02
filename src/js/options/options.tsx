import "./options.css";

import React from "react";
import ReactDOM from "react-dom";

import ProjectPreferences from "../components/ProjectPreferences";

const domContainer = document.querySelector("#options");
ReactDOM.render(<ProjectPreferences />, domContainer);

import "./options.css";

import React from "react";
import ReactDOM from "react-dom";
import {Container} from "semantic-ui-react";

import ProjectPreferences from "../components/ProjectPreferences";

const domContainer = document.querySelector("#options");
ReactDOM.render(
  <Container>
    <ProjectPreferences />
  </Container>,
  domContainer,
);

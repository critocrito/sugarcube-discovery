import React, {useState} from "react";

import {concat, empty} from "../projects";
import {Project} from "../types";
import Button from "./Button";
import ProjectCreate from "./ProjectCreate";
import ProjectList from "./ProjectList";

const ProjectPreferences = () => {
  const [mode, setMode] = useState("list");

  const createHandler = async (project: Project) => {
    const id = project.name;
    await concat({id, ...project});
    setMode("list");
  };

  let component;

  if (mode === "list") {
    component = (
      <section className="pa2 flex flex-column">
        <div className="cf">
          <Button
            className="fr"
            onClick={() => setMode("create")}
            type="primary"
            size="large"
          >
            Add new Project
          </Button>
        </div>
        <ProjectList />
      </section>
    );
  } else {
    component = (
      <ProjectCreate
        project={empty()}
        submitHandler={createHandler}
        cancelHandler={() => setMode("list")}
      />
    );
  }

  return component;
};

export default ProjectPreferences;

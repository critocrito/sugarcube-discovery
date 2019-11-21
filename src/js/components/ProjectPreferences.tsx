import React, {useState} from "react";
import {Button, Grid} from "semantic-ui-react";

import {concat, empty} from "../projects";
import {Project} from "../types";
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
      <>
        <Grid.Column floated="right" width={5} textAlign="right">
          <Button onClick={() => setMode("create")} color="green">
            Add new Project
          </Button>
        </Grid.Column>
        <Grid.Column>
          <ProjectList />
        </Grid.Column>
      </>
    );
  } else {
    component = (
      <>
        <Grid.Column>
          <ProjectCreate
            project={empty()}
            submitHandler={createHandler}
            cancelHandler={() => setMode("list")}
          />
        </Grid.Column>
      </>
    );
  }

  return <Grid columns={1}>{component}</Grid>;
};

export default ProjectPreferences;

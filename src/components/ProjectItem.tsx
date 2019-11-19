import React, {useState} from "react";
import {Button, Card} from "semantic-ui-react";

import {Project} from "../types";
import ProjectCreate from "./ProjectCreate";

interface ProjectItemProps {
  project: Project;
  deleteHandler: (id: string) => Promise<void>;
  editHandler: (p: Project) => Promise<void>;
}

const ProjectItem = ({
  project,
  deleteHandler,
  editHandler,
}: ProjectItemProps) => {
  const [mode, setMode] = useState("item");

  let component;

  if (mode === "item") {
    component = (
      <Card fluid>
        <Card.Content>
          <Card.Header>{project.name}</Card.Header>
          <Card.Description>{project.endpoint}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="red" onClick={() => deleteHandler(project.id)}>
              Delete
            </Button>
            <Button basic color="yellow" onClick={() => setMode("edit")}>
              Edit
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  } else {
    component = (
      <ProjectCreate
        project={project}
        submitHandler={async (p: Project) => {
          await editHandler(p);
          setMode("item");
        }}
        cancelHandler={() => setMode("item")}
      />
    );
  }

  return <>{component}</>;
};

export default ProjectItem;

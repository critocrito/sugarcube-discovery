import React from "react";
import {Button, Card} from "semantic-ui-react";

import {Project} from "../types";

interface ProjectShowProps {
  project: Project;
  deleteHandler: () => Promise<void>;
  editHandler: () => Promise<void>;
}

const ProjectShow = ({
  project,
  deleteHandler,
  editHandler,
}: ProjectShowProps) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{project.name}</Card.Header>
        <Card.Description>{project.endpoint}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="red"
            onClick={deleteHandler}
            data-testid="delete-button"
          >
            Delete
          </Button>
          <Button
            basic
            color="yellow"
            onClick={editHandler}
            data-testid="edit-button"
          >
            Edit
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProjectShow;

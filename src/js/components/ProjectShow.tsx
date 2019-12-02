import React from "react";

import {Project} from "../types";
import Button from "./Button";

interface ProjectShowProps {
  project: Project;
  deleteHandler: () => Promise<void>;
  editHandler: () => Promise<void>;
}

const ProjectShow = ({
  project: {name, endpoint},
  deleteHandler,
  editHandler,
}: ProjectShowProps) => {
  return (
    <section className="flex items-center mt5 mb5 w-100">
      <div className="flex flex-column w-50">
        <h2 className="f3 ttu tracked mt0 mb0 pl2">{name}</h2>
        <span className="mt1 f5 i pl2">{endpoint}</span>
      </div>
      <div>
        <Button
          type="cancel"
          onClick={deleteHandler}
          data-testid="delete-button"
        >
          Delete
        </Button>
        <Button type="primary" onClick={editHandler} data-testid="edit-button">
          Edit
        </Button>
      </div>
    </section>
  );
};

export default ProjectShow;

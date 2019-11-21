import React, {useState} from "react";

import {Project} from "../types";
import ProjectCreate from "./ProjectCreate";
import ProjectShow from "./ProjectShow";

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
      <ProjectShow
        project={project}
        deleteHandler={() => deleteHandler(project.id)}
        editHandler={async () => setMode("edit")}
      />
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

import React, {useEffect, useState} from "react";
import {Card} from "semantic-ui-react";

import {list, remove, update} from "../projects";
import {Project} from "../types";
import ProjectItem from "./ProjectItem";

interface ProjectListProps {
  projects: Project[];
  deleteHandler: (id: string) => void;
  updateHandler: (id: string, p: Project) => void;
}

const ProjectList = () => {
  const [projects, setProjects] = useState([] as Project[]);

  const reloadProjects = async () => {
    setProjects(await list());
  };

  useEffect(() => {
    reloadProjects();
  }, []);

  const deleteHandler = async (id: string) => {
    await remove(id);
    await reloadProjects();
  };

  const updateHandler = async ({id, ...project}: Project) => {
    await update(id, {id, ...project});
    await reloadProjects();
  };

  return (
    <Card.Group>
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          deleteHandler={deleteHandler}
          editHandler={updateHandler}
        />
      ))}
    </Card.Group>
  );
};

export default ProjectList;

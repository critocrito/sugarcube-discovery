import c from "classnames";
import React from "react";

import {Project} from "../../types";

interface SelectProjectsProps {
  projects: Project[];
  activeProject?: Project;
  handleSelect: (id: string) => void;
}

const SelectProjects = ({
  projects,
  activeProject,
  handleSelect,
}: SelectProjectsProps) => {
  return (
    <>
      <h3 className="f4 ttu mt0 mb1">Choose your Project</h3>
      <div className="h4 overflow-y-auto">
        <ul className="list pl0">
          {projects.map(({id, name, endpoint}) => {
            return (
              <li
                key={id}
                className={c(
                  "pa2 pointer dim",
                  id === activeProject?.id ? "inverted" : "",
                )}
                onClick={() => handleSelect(id)}
                onKeyPress={() => handleSelect(id)}
                role="presentation"
              >
                <h3 className="f4 ttu tracked mt0 mb0">{name}</h3>
                <span className="mt1 f7 i">{endpoint}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SelectProjects;

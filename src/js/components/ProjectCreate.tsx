import React, {useState} from "react";
import slugify from "slugify";

import {Project} from "../types";
import Button from "./Button";

interface ProjectCreateProps {
  project: Project;
  submitHandler: (p: Project) => void;
  cancelHandler: () => void;
}

const ProjectCreate = ({
  project: emptyProject,
  cancelHandler,
  submitHandler,
}: ProjectCreateProps) => {
  const [project, setProject] = useState(emptyProject);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProject({...project, [name]: value});
  };

  const title =
    project.id === "" ? "Create a new project:" : `Edit ${project.name}:`;

  return (
    <section className="pa2 flex flex-column">
      <h2>{title}</h2>
      <form>
        <div className="cf">
          <div className="flex items-center">
            <label className="w-100 pa2 b" htmlFor="inputName">
              Name:
              <input
                className="input-reset v-mid ba b--black-20 pa2 db w-50"
                type="text"
                name="name"
                id="inputName"
                placeholder="Name"
                value={project.name}
                onChange={handleChange}
                data-testid="input-name"
              />
            </label>
          </div>
        </div>

        <div className="cf mt2">
          <div className="flex items-center">
            <label className="w-100 pa2 b" htmlFor="inputEndpoint">
              Endpoint:
              <input
                className="input-reset v-mid ba b--black-20 pa2 db w-50"
                type="text"
                name="endpoint"
                id="inputEndpoint"
                placeholder="https://example.org/project"
                value={project.endpoint}
                onChange={handleChange}
                data-testid="input-endpoint"
              />
            </label>
          </div>
        </div>

        <div className="cf mt2">
          <div className="flex items-center">
            <label className="w-100 pa2 b" htmlFor="inputApiKey">
              API Key:
              <input
                className="input-reset v-mid ba b--black-20 pa2 db w-50"
                type="text"
                name="apiKey"
                id="inputApiKey"
                placeholder="API Key"
                value={project.apiKey}
                onChange={handleChange}
                data-testid="input-api-key"
              />
            </label>
          </div>
        </div>
      </form>

      <div className="mt2">
        <Button type="cancel" onClick={cancelHandler}>
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={() => {
            const id =
              project.id === ""
                ? slugify(project.name, {lower: true})
                : project.id;
            submitHandler({...project, id});
          }}
        >
          Save
        </Button>
      </div>
    </section>
  );
};

export default ProjectCreate;

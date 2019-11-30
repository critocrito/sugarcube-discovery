import React, {useState} from "react";
import {Button, Card, Form, InputOnChangeData} from "semantic-ui-react";
import slugify from "slugify";

import {Project} from "../types";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    {name, value}: InputOnChangeData,
  ) => {
    setProject({...project, [name]: value});
  };

  const title =
    project.id === "" ? "Configure a new project:" : "Edit a project:";

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>
          <Form>
            <Form.Input
              name="name"
              placeholder="Name"
              value={project.name}
              onChange={handleChange}
              label="Name"
              type="text"
              data-testid="input-name"
            />
            <Form.Input
              name="endpoint"
              placeholder="The URL of the API endpoint,"
              value={project.endpoint}
              onChange={handleChange}
              label="HTTP Endpoint"
              type="text"
              data-testid="input-endpoint"
            />
            <Form.Input
              name="apiKey"
              placeholder="Your secret API key."
              value={project.apiKey}
              onChange={handleChange}
              label="API Key"
              type="text"
              data-testid="input-api-key"
            />
          </Form>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="yellow" onClick={cancelHandler}>
            Cancel
          </Button>
          <Button
            basic
            color="green"
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
      </Card.Content>
    </Card>
  );
};

export default ProjectCreate;

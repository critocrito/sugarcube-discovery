import {useMachine} from "@xstate/react";
import React, {useState} from "react";

import {preservationMachine} from "../machines";
import {Project} from "../types";
import Button from "./Button";
import SelectProjects from "./preservation/SelectProjects";

interface PreservationProcessProps {
  type: string;
  term: string;
  projects: Project[];
}

const PreservationProcess = ({
  type,
  term,
  projects,
}: PreservationProcessProps) => {
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [current, send] = useMachine(preservationMachine, {
    services: {
      fetchData: async () => {
        if (selectedProject == null)
          throw new Error("No project backend selected.");
        const resp = await fetch(selectedProject.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({type, term}),
        });
        if (resp.status === 409) {
          return {message: "... but this query already existed."};
        }
        if (resp.status >= 400) {
          const msg = await resp.text();
          throw new Error(msg);
        }
        return {
          message: `Queued ${type}/${term} for preservation for project ${selectedProject.name}.`,
        };
      },
    },
  });

  const handleProjectSelect = (id: string) => {
    const project = projects.find(({id: idOther}) => id === idOther);
    setSelectedProject(project);
  };

  switch (current.value) {
    case "idle":
      return (
        <Button
          size="large"
          type="primary"
          onClick={() => send("PRESERVE", {query: "something"})}
        >
          Preserve
        </Button>
      );
    case "select":
      return (
        <div>
          <SelectProjects
            projects={projects}
            activeProject={selectedProject}
            handleSelect={handleProjectSelect}
          />
          <Button
            type="cancel"
            onClick={() => send("CANCEL", {query: "something"})}
          >
            Back
          </Button>
          <Button
            type="primary"
            disabled={selectedProject == null}
            onClick={() => send("SEND", {query: "something"})}
          >
            Next
          </Button>
        </div>
      );
    case "loading":
      return <div>Searching...</div>;
    case "success": {
      setTimeout(() => window.close(), 3 * 1000);
      return (
        <div>
          <h3 className="f4 ttu mt0 mb1">Success!</h3>
          <p>{current?.context?.success?.message}</p>
        </div>
      );
    }
    case "failure":
      return (
        <div>
          <p>{current?.context?.error?.message}</p>
          <Button type="cancel" onClick={() => send("CANCEL")}>
            Back
          </Button>
          <Button type="primary" onClick={() => send("RETRY")}>
            Retry
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export default PreservationProcess;

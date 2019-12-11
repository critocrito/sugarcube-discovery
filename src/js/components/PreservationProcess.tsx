import {useMachine} from "@xstate/react";
import React from "react";

import {preservationMachine} from "../machines";
import {Project} from "../types";
import Button from "./Button";

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
  const [current, send] = useMachine(preservationMachine, {
    actions: {
      notifySuccess: (ctx) => console.log(ctx.data),
    },

    services: {
      fetchData: async () => {
        const resp = await fetch("http://127.0.0.1:8000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({type, term}),
        });
        if (resp.status === 400) {
          throw new Error("Query Exists!");
        }
        if (resp.status >= 401) {
          throw new Error("Boom!");
        }
      },
    },
  });

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
          <ul>
            {projects.map(({id, name, endpoint}) => {
              return (
                <li key={id}>
                  <h3>{name}</h3>
                  <p>{endpoint}</p>
                </li>
              );
            })}
          </ul>
          <button
            type="submit"
            onClick={() => send("SEND", {query: "something"})}
          >
            Sending for something
          </button>
          <button onClick={() => send("CANCEL", {query: "something"})}>
            Canceling for something
          </button>
        </div>
      );
    case "loading":
      return <div>Searching...</div>;
    case "success":
      return <div>Success! Data</div>;
    case "failure":
      return (
        <>
          <p>{current.context.error.message}</p>
          <button onClick={() => send("RETRY")}>Retry</button>
          <button onClick={() => send("CANCEL")}>Cancel</button>
        </>
      );
    default:
      return null;
  }
};

export default PreservationProcess;

import {cleanup, fireEvent, render} from "@testing-library/react";
import test from "ava";
import React from "react";
import sinon from "sinon";

import ProjectItem from "../src/components/ProjectItem";

const project = {
  id: "haha",
  name: "haha",
  endpoint: "https://endpoint.net",
  apiKey: "my secret key",
};

test.afterEach(cleanup);

test("editing a project prefills the current values", async (t) => {
  const {unmount, getByTestId, queryByTestId} = render(
    <ProjectItem
      project={project}
      editHandler={sinon.stub()}
      deleteHandler={sinon.stub()}
    />,
  );

  t.is(null, queryByTestId("input-name"));
  t.is(null, queryByTestId("input-endpoint"));
  t.is(null, queryByTestId("input-api-key"));

  fireEvent.click(getByTestId("edit-button"));

  const nameInput = queryByTestId("input-name")?.children[0];
  const endpointInput = queryByTestId("input-endpoint")?.children[0];
  const apiKeyInput = queryByTestId("input-api-key")?.children[0];

  t.is(project.name, (nameInput as HTMLInputElement)?.value);
  t.is(project.endpoint, (endpointInput as HTMLInputElement)?.value);
  t.is(project.apiKey, (apiKeyInput as HTMLInputElement)?.value);

  unmount();
});

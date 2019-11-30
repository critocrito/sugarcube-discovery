import {cleanup, fireEvent, render} from "@testing-library/react";
import test from "ava";
import React from "react";
import sinon from "sinon";

import ProjectShow from "../src/components/ProjectShow";

const project = {
  id: "haha",
  name: "haha",
  endpoint: "https://endpoint.net",
  apiKey: "my secret key",
};

test.afterEach(cleanup);

test("showing a project allows to delete the project", (t) => {
  const stub = sinon.stub();

  const {unmount, getByTestId} = render(
    <ProjectShow
      project={project}
      editHandler={sinon.stub()}
      deleteHandler={stub}
    />,
  );

  fireEvent.click(getByTestId("delete-button"));

  t.true(stub.called);

  unmount();
});

test("showing a project allows to edit the project", (t) => {
  const stub = sinon.stub();

  const {unmount, getByTestId} = render(
    <ProjectShow
      project={project}
      editHandler={stub}
      deleteHandler={sinon.stub()}
    />,
  );

  fireEvent.click(getByTestId("edit-button"));

  t.true(stub.called);

  unmount();
});

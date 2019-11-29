import React from "react";

import ProjectItem from "../../src/components/ProjectItem";

const project = {
  id: "haha",
  name: "haha",
  endpoint: "https://endpoint.net",
  apiKey: "my secret key",
};

export default (
  <ProjectItem
    project={project}
    deleteHandler={async (_) => undefined}
    editHandler={async (_) => undefined}
  />
);

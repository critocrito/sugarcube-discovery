import React from "react";

import ProjectItem from "../../src/components/ProjectItem";

const project = {
  name: "haha",
  endpoint: "https://endpoint.net",
  apiKey: "my secret key",
};

export default (
  <ProjectItem
    project={project}
    deleteHandler={async (_) => null}
    editHandler={async (_) => null}
  />
);

import React from "react";

import ProjectShow from "../../src/components/ProjectShow";

const project = {
  name: "haha",
  endpoint: "https://endpoint.net",
  apiKey: "my secret key",
};

export default (
  <ProjectShow
    project={project}
    deleteHandler={async () => null}
    editHandler={async () => null}
  />
);

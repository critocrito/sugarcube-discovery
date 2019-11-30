import React from "react";

import ProjectShow from "../../src/js/components/ProjectShow";

const project = {
  id: "haha",
  name: "haha",
  endpoint: "https://endpoint.net",
  apiKey: "my secret key",
};

export default (
  <ProjectShow
    project={project}
    deleteHandler={async () => undefined}
    editHandler={async () => undefined}
  />
);

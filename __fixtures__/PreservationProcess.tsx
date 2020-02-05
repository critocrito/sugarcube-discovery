import React from "react";

import PreservationProcess from "../src/js/components/PreservationProcess";

const projects = [
  {
    id: "haha",
    name: "haha",
    endpoint: "https://endpoint.net",
    apiKey: "my secret key",
  },
  {
    id: "bahah",
    name: "baha",
    endpoint: "https://endpoint.com",
    apiKey: "my other secret key",
  },
];

export default (
  <PreservationProcess
    type="youtube_video"
    term="https://www.youtube.com/watch?v=tcCBtSjKEzI"
    projects={projects}
  />
);

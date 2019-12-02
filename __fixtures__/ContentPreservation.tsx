import React from "react";

import ContentPreservation from "../src/js/components/ContentPreservation";

const videoUrl = "https://www.youtube.com/watch?v=tcCBtSjKEzI";
const channelUrl = "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A";
const tweetUrl = "https://twitter.com/Ibrahim_waza/status/1073152537400934400";
const feedUrl = "https://twitter.com/WADHOSHA";
const postUrl = "https://facebook.com";
const websiteUrl = "https://mwatana.org/en/airstrike-on-detention-center/";

export default {
  "Youtube Video": <ContentPreservation url={videoUrl} />,
  "Youtube Channel": <ContentPreservation url={channelUrl} />,
  "Twitter Tweet": <ContentPreservation url={tweetUrl} />,
  "Twitter Feed": <ContentPreservation url={feedUrl} />,
  "Facebook Post": <ContentPreservation url={postUrl} />,
  "Website Archival": <ContentPreservation url={websiteUrl} />,
};

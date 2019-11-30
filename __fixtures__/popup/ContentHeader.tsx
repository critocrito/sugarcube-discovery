import React from "react";

import ContentHeader from "../../src/js/components/ContentHeader";

const videoUrl = "https://www.youtube.com/watch?v=tcCBtSjKEzI";
const channelUrl = "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A";
const tweetUrl = "https://twitter.com/Ibrahim_waza/status/1073152537400934400";
const feedUrl = "https://twitter.com/WADHOSHA";
const postUrl = "https://facebook.com";
const websiteUrl = "https://mwatana.org/en/airstrike-on-detention-center/";

export default {
  "Youtube Video": <ContentHeader url={videoUrl} />,
  "Youtube Channel": <ContentHeader url={channelUrl} />,
  "Twitter Tweet": <ContentHeader url={tweetUrl} />,
  "Twitter Feed": <ContentHeader url={feedUrl} />,
  "Facebook Post": <ContentHeader url={postUrl} />,
  "Website Archival": <ContentHeader url={websiteUrl} />,
};

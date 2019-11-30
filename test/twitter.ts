import test from "ava";

import {isTwitterFeed, isTwitterTweet} from "../src/js/twitter";

const tweetUrls = [
  "https://twitter.com/Ibrahim_waza/status/1073152537400934400",
  "https://twitter.com/LorianSynaro/status/1101881275558825985/photo/1",
  "https://mobile.twitter.com/kamalrahmtalla1/status/1150487367037440000?fbclid=IwAR2429sTkE",
  "https://twitter.com/i/status/1101499653441372160",
];

const notTweetUrls = [
  "https://tweetdeck.twitter.com/",
  "https://twitter.com/search?q=%23موكب14مارس&src=hash",
];

const feedUrls = ["https://twitter.com/WADHOSHA"];

test("detect valid Twitter tweet url", (t) => {
  tweetUrls.forEach((url) => {
    t.true(isTwitterTweet(url));
  });
});

test("detect invalid Twitter tweet url", (t) => {
  notTweetUrls.concat(feedUrls).forEach((url) => {
    t.false(isTwitterTweet(url));
  });
});

test("detect valid Twitter feed url", (t) => {
  feedUrls.forEach((url) => {
    t.true(isTwitterFeed(url));
  });
});

test("detect invalid Twitter feed url", (t) => {
  tweetUrls.concat(notTweetUrls).forEach((url) => {
    t.false(isTwitterFeed(url));
  });
});

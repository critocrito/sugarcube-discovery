import test from "ava";

import {isYoutubeChannel, isYoutubeVideo} from "../src/js/youtube";

const videoUrls = [
  "https://www.youtube.com/watch?v=tcCBtSjKEzI",
  "http://youtu.be/o0tjic523cg",
  "https://www.youtube.com/embed/iq_XLq5ONtE?version",
];

const notVideoUrls = [
  "https://www.youtube.com/results?search_query=sudan%27s+livestream+Massacre",
];

const channelUrls = [
  "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A",
];

test("detect valid Youtube video url", (t) => {
  videoUrls.forEach((url) => {
    t.true(isYoutubeVideo(url));
  });
});

test("detect invalid Youtube video url", (t) => {
  notVideoUrls.concat(channelUrls).forEach((url) => {
    t.false(isYoutubeVideo(url));
  });
});

test("detect valid Youtube channel url", (t) => {
  channelUrls.forEach((url) => {
    t.true(isYoutubeChannel(url));
  });
});

test("detect invalid Youtube channel url", (t) => {
  videoUrls.concat(notVideoUrls).forEach((url) => {
    t.false(isYoutubeChannel(url));
  });
});

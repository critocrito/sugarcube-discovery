import {cleanup, render} from "@testing-library/react";
import test from "ava";
import React from "react";

import ContentPreservation from "../src/js/components/ContentPreservation";

const videoUrl = "https://www.youtube.com/watch?v=tcCBtSjKEzI";
const channelUrl = "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A";
const tweetUrl = "https://twitter.com/Ibrahim_waza/status/1073152537400934400";
const feedUrl = "https://twitter.com/WADHOSHA";
const postUrl = "https://facebook.com";
const websiteUrl = "https://mwatana.org/en/airstrike-on-detention-center/";

test.afterEach(cleanup);

test("show human description and color coding for youtube video", (t) => {
  const {unmount, getByTestId, queryByText} = render(
    <ContentPreservation url={videoUrl} />,
  );

  t.true(
    Array.from(getByTestId("color-coding").classList).includes("bg-youtube"),
  );
  t.true(queryByText(/youtube video/i) !== null);

  unmount();
});

test("show human description and color coding for youtube channel", (t) => {
  const {unmount, getByTestId, queryByText} = render(
    <ContentPreservation url={channelUrl} />,
  );

  t.true(
    Array.from(getByTestId("color-coding").classList).includes("bg-youtube"),
  );
  t.true(queryByText(/youtube channel/i) !== null);

  unmount();
});

test("show human description and color coding for twitter tweet", (t) => {
  const {unmount, getByTestId, queryByText} = render(
    <ContentPreservation url={tweetUrl} />,
  );

  t.true(
    Array.from(getByTestId("color-coding").classList).includes("bg-twitter"),
  );
  t.true(queryByText(/twitter tweet/i) !== null);

  unmount();
});

test("show human description and color coding for twitter feed", (t) => {
  const {unmount, getByTestId, queryByText} = render(
    <ContentPreservation url={feedUrl} />,
  );

  t.true(
    Array.from(getByTestId("color-coding").classList).includes("bg-twitter"),
  );
  t.true(queryByText(/twitter feed/i) !== null);

  unmount();
});

test("show human description and color coding for facebook post", (t) => {
  const {unmount, getByTestId, queryByText} = render(
    <ContentPreservation url={postUrl} />,
  );

  t.true(
    Array.from(getByTestId("color-coding").classList).includes("bg-facebook"),
  );
  t.true(queryByText(/facebook post/i) !== null);

  unmount();
});

test("show human description and color coding for website archival", (t) => {
  const {unmount, getByTestId, queryByText} = render(
    <ContentPreservation url={websiteUrl} />,
  );

  t.true(Array.from(getByTestId("color-coding").classList).includes("bg-http"));
  t.true(queryByText(/website archival/i) !== null);

  unmount();
});

import test from "ava";

import {isFacebookPost} from "../src/js/facebook";

// FIXME: Add real URLs.
const postUrls = ["https://facebook.com"];

test("detect valid Facebook post url", (t) => {
  postUrls.forEach((url) => {
    t.true(isFacebookPost(url));
  });
});

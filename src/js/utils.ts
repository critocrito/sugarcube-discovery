import {isFacebookPost} from "./facebook";
import {isTwitterFeed, isTwitterTweet} from "./twitter";
import {isYoutubeChannel, isYoutubeVideo} from "./youtube";

export const currentUrl = async () => {
  const tabs = await browser.tabs.query({currentWindow: true, active: true});
  if (tabs.length === 0) {
    throw new Error("Couldn't query current tab.");
  }
  if (tabs[0].url == null) {
    throw new Error("Couldn't query current URL.");
  }
  return tabs[0].url;
};

export const detectContent = (
  url: string,
): {type: string; platform: string} => {
  if (isYoutubeVideo(url))
    return {
      platform: "youtube",
      type: "youtube_video",
    };

  if (isYoutubeChannel(url))
    return {
      platform: "youtube",
      type: "youtube_channel",
    };
  if (isTwitterFeed(url))
    return {
      platform: "twitter",
      type: "twitter_user",
    };
  if (isTwitterTweet(url))
    return {
      platform: "twitter",
      type: "twitter_tweet",
    };
  if (isFacebookPost(url))
    return {
      platform: "facebook",
      type: "facebook_post",
    };

  return {type: "http_url", platform: "http"};
};

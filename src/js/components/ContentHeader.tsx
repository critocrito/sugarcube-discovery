import c from "classnames";
import React from "react";
import {Code, Facebook, Twitter, Youtube} from "react-feather";

import {detectContent} from "../utils";

interface ContentHeaderProps {
  url: string;
}

const ContentHeader = ({url}: ContentHeaderProps) => {
  const {type, platform} = detectContent(url);

  const iconSize = 28;

  let desc;
  let icon;
  switch (type) {
    case "youtube_video": {
      desc = "Youtube Video";
      icon = <Youtube size={iconSize} />;
      break;
    }
    case "youtube_channel": {
      desc = "Youtube Channel";
      icon = <Youtube size={iconSize} />;
      break;
    }
    case "twitter_tweet": {
      desc = "Twitter Tweet";
      icon = <Twitter size={iconSize} />;
      break;
    }
    case "twitter_user": {
      desc = "Twitter Feed";
      icon = <Twitter size={iconSize} />;
      break;
    }
    case "facebook_post": {
      desc = "Facebook Post";
      icon = <Facebook size={iconSize} />;
      break;
    }
    default:
      desc = "Website Archival";
      icon = <Code size={iconSize} />;
  }

  return (
    <div
      data-testid="color-coding"
      className={c("flex flex-column w-100 white pa3", `bg-${platform}`)}
    >
      <div className="w-100 mt1 flex items-start">
        <span>{icon}</span>
        <h2 className="f3 lh-title ttu tracked ml3 mt0 mb0 flex items-center">
          {desc}
        </h2>
      </div>
      <span className="f6 lh-copy i">{url}</span>
    </div>
  );
};

export default ContentHeader;

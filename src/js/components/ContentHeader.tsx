import c from "classnames";
import React from "react";
import {Code, Facebook, Twitter, Youtube} from "react-feather";

import {detectContent} from "../utils";

interface ContentHeaderProps {
  url: string;
}

const ContentHeader = ({url}: ContentHeaderProps) => {
  const {type, platform} = detectContent(url);

  let desc;
  let icon;
  switch (type) {
    case "youtube_video": {
      desc = "Youtube Video";
      icon = <Youtube size={34} />;
      break;
    }
    case "youtube_channel": {
      desc = "Youtube Channel";
      icon = <Youtube size={34} />;
      break;
    }
    case "twitter_tweet": {
      desc = "Twitter Tweet";
      icon = <Twitter size={34} />;
      break;
    }
    case "twitter_user": {
      desc = "Twitter Feed";
      icon = <Twitter size={34} />;
      break;
    }
    case "facebook_post": {
      desc = "Facebook Post";
      icon = <Facebook size={34} />;
      break;
    }
    default:
      desc = "Website Archival";
      icon = <Code size={34} />;
  }

  return (
    <div className="flex flex-column w-100">
      <div
        data-testid="color-coding"
        className={c("h2 w-100", `bg-${platform}`)}
      >
        &nbsp;
      </div>
      <div className="w-100 pl3 pr3 mt1 flex items-center">
        <span>{icon}</span>
        <h2 className="f3 lh-title ttu tracked ml3 mt0 mb0 flex items-center">
          {desc}
        </h2>
      </div>
      <span className="f6 lh-copy i pl3 pr3">{url}</span>
    </div>
  );
};

export default ContentHeader;

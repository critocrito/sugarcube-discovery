import c from "classnames";
import React from "react";
import {Code, Facebook, Twitter, Youtube} from "react-feather";

import {detectContent} from "../utils";
import Button from "./Button";

interface ContentPreservationProps {
  url: string;
}

const ContentPreservation = ({url}: ContentPreservationProps) => {
  const preserveQuery = async (type: string, term: string): Promise<void> => {
    const resp = await fetch("http://127.0.0.1:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({type, term}),
    });
  };

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
    <>
      <div className="flex flex-column w-100">
        <div data-testid="color-coding" className={c("h1", `bg-${platform}`)}>
          &nbsp;
        </div>
        <div className="w-100 mt2 lh-solid flex items-center pl2 color-main">
          {icon}
          <h2 className="f3 ttu tracked ml3 mt0 mb0">{desc}</h2>
        </div>
        <span className="mt1 f7 i pl2">{url}</span>
        <div className="mt5 mb3 tc">
          <Button
            size="large"
            type="primary"
            onClick={() => preserveQuery(type, url)}
          >
            Preserve
          </Button>
        </div>
      </div>
    </>
  );
};

export default ContentPreservation;

import c from "classnames";
import React, {useEffect, useState} from "react";
import {Code, Facebook, Twitter, Youtube} from "react-feather";

import {list} from "../projects";
import {Project} from "../types";
import {detectContent} from "../utils";
import PreservationProcess from "./PreservationProcess";

interface ContentPreservationProps {
  url: string;
}

const ContentPreservation = ({url}: ContentPreservationProps) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const f = async () => {
      setProjects(await list());
    };
    f();
  }, []);

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
        <div className="mt2 mb3 pa2 tc">
          {projects.length === 0 ? (
            <span>
              You must configure at least one project to use this plugin. Head
              over to the preferences to do so.
            </span>
          ) : (
            <PreservationProcess type={type} term={url} projects={projects} />
          )}
        </div>
      </div>
    </>
  );
};

export default ContentPreservation;

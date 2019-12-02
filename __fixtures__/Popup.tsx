import React from "react";

import Popup from "../src/js/components/Popup";

const urls = [
  {type: "Youtube Video", url: "https://www.youtube.com/watch?v=tcCBtSjKEzI"},
  {
    type: "Youtube Channel",
    url: "https://www.youtube.com/channel/UCegnDJbvrOhvbLU3IzeIV8A",
  },
  {
    type: "Twitter Tweet",
    url: "https://twitter.com/Ibrahim_waza/status/1073152537400934400",
  },
  {type: "Twitter Feed", url: "https://twitter.com/WADHOSHA"},
  {type: "Facebook Post", url: "https://facebook.com"},
  {
    type: "Website Archival",
    url: "https://mwatana.org/en/airstrike-on-detention-center/",
  },
];

interface WrapperProps {
  url: string;
}

const Wrapper = ({url}: WrapperProps) => {
  return (
    <div className="avenir flex justify-center mt4 mb4">
      <div className="br2 ba bw1 b--silver bg-main">
        <Popup url={url} />
      </div>
    </div>
  );
};

export default urls.reduce(
  (memo, {type, url}) => ({[type]: <Wrapper url={url} />, ...memo}),
  {},
);

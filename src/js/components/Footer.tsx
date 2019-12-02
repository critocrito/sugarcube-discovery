import React from "react";

import {version} from "../../../package.json";

const Footer = () => {
  return (
    <div className="h2 bt bw1 b--main flex justify-between items-center f7 lh-copy i pa2">
      <span>v{version}</span>
      <span>Copyright critocrito</span>
    </div>
  );
};

export default Footer;

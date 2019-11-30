import React from "react";

import ContentHeader from "./ContentHeader";

interface PopupProps {
  url: string;
}

const Popup = ({url}: PopupProps) => {
  return (
    <div className="pb3">
      <ContentHeader url={url} />
    </div>
  );
};

export default Popup;

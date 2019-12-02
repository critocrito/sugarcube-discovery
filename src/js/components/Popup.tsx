import React from "react";

import ContentPreservation from "./ContentPreservation";
import Footer from "./Footer";
import Header from "./Header";

interface PopupProps {
  url: string;
}

const Popup = ({url}: PopupProps) => {
  return (
    <div>
      <Header />
      <ContentPreservation url={url} />
      <Footer />
    </div>
  );
};

export default Popup;

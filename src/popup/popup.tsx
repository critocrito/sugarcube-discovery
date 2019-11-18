import "./popup.css";

import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

import HelloWorld from "../components/HelloWorld";
import {currentUrl} from "../utils";

const App = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const f = async () => {
      const u = await currentUrl();
      setUrl(u);
    };
    f();
  }, []);

  return (
    <div>
      <p>Wuahahaaha</p>
      <HelloWorld url={url} />
    </div>
  );
};

const domContainer = document.querySelector("#app");
ReactDOM.render(<App />, domContainer);

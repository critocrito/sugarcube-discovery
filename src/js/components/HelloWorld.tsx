import React from "react";

interface HelloWorldProps {
  url: string;
}

const HelloWorld = ({url}: HelloWorldProps) => {
  return <p>{url}</p>;
};

export default HelloWorld;

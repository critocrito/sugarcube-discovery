import React from "react";
import {X} from "react-feather";

import Button from "../src/js/components/Button";

type Size = "tiny" | "normal" | "large";
type Style = "basic" | "primary" | "ok" | "cancel";

const sizes: Size[] = ["tiny", "normal", "large"];
const styles: Style[] = ["basic", "primary", "ok", "cancel"];

const buttons: React.ReactElement[] = [];

styles.forEach((style) => {
  sizes.forEach((size) => {
    buttons.push(
      <Button key={`${style}-${size}`} type={style} size={size}>
        {style} {size}
      </Button>,
    );
  });
});

export default {
  all: <div className="flex flex-column">{buttons}</div>,
  cancel: (
    <div className="flex flex-column">
      <Button size="tiny" type="cancel">
        <X size="20" />
      </Button>
    </div>
  ),
};

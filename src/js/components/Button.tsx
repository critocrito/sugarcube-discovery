import c from "classnames";
import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  type: "basic" | "primary" | "ok" | "cancel";
  size: "tiny" | "normal" | "large";
}

const styles = {
  basic: "b--main color-main bg-transparent",
  primary: "bg-inverted color-inverted b--main",
  ok: "bg-green b--green",
  cancel: "bg-red b--red",
};

const sizes = {
  tiny: "w3 f7 lh-copy",
  normal: "w4 f6 lh-copy",
  large: "w5 f5 lh-copy",
};

const Button = ({
  type = "basic",
  size = "normal",
  children,
  className,
}: ButtonProps) => {
  const classes = c(
    "avenir pt2 pb2 tc v-mid ma2 br2 pointer dim outline-0 nowrap",
    styles[type] != null ? styles[type] : null,
    sizes[size] != null ? sizes[size] : null,
    className,
  );

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
};

export default Button;

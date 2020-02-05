import c from "classnames";
import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "basic" | "primary" | "ok" | "cancel";
  size?: "tiny" | "normal" | "large";
  disabled?: boolean;
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
  onClick = () => null,
  disabled = false,
  children,
  className,
}: ButtonProps) => {
  const classes = c(
    "avenir pt2 pb2 tc v-mid ma2 br2 outline-0 nowrap",
    styles[type] != null ? styles[type] : null,
    sizes[size] != null ? sizes[size] : null,
    disabled ? "o-70" : "dim pointer",
    className,
  );

  return (
    <button
      type="button"
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

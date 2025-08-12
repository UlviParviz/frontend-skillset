import classNames from "classnames";
import "./index.scss";
import type { TextProps } from "./types";

const Text: React.FC<TextProps> = ({
  children,
  weight = "normal",
  size = "medium",
  color = "default",
  className,
}) => {
  const classes = classNames(
    "text",
    {
      [`weight-${weight}`]: weight,
      [`size-${size}`]: size,
      [`color-${color}`]: color,
    },
    className
  );

  return <div className={classes}>{children}</div>;
};

export default Text;

import classNames from "classnames";
import "./index.scss";
import type { StackProps } from "./types";

const Stack: React.FC<StackProps> = ({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  gap,
  wrap = false,
  display = "block",
  className,
  style,
  width,
  height,
}) => {
  const stackClass = classNames(
    "stack",
    `stack--display-${display}`,
    `stack--direction-${direction}`,
    `stack--align-${align}`,
    `stack--justify-${justify}`,
    {
      "stack--wrap": wrap,
    },
    className
  );
  const customStyle = {
    ...(gap ? { gap: typeof gap === "number" ? `${gap}px` : gap } : {}),
    ...(width
      ? { width: typeof width === "number" ? `${width}px` : width }
      : {}),
    ...(height
      ? { height: typeof height === "number" ? `${height}px` : height }
      : {}),
    ...style,
  };

  return (
    <div className={stackClass} style={customStyle}>
      {children}
    </div>
  );
};

export default Stack;

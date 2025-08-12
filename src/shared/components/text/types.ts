export type Weight = "normal" | "bold" | "light";
export type Size = "small" | "medium" | "large";
export type Color = "primary" | "secondary" | "danger" | "default";

export type TextProps = {
  children: React.ReactNode;
  weight?: Weight;
  size?: Size;
  color?: Color;
  className?: string;
};
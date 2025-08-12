export type Display =
  | "flex"
  | "inline-flex"
  | "block"
  | "inline-block"
  | "grid";

export interface StackProps {
  children: React.ReactNode;
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: number | string;
  wrap?: boolean;
  display?: "block" | "flex" | "inline-flex" | "inline-block";
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
}
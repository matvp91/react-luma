import type { ReactNode } from "react";

export type ReactLumaElementStyle = {
  flexDirection?: "row" | "column";
  left?: number;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  margin?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  width?: number;
  height?: number;
};

export type ReactLumaViewProps = {
  style?: ReactLumaElementStyle;
  children?: ReactNode;
};

export type ReactLumaTextProps = {
  style?: ReactLumaElementStyle;
  color?: string;
  text: string;
};

export type ReactLumaImageProps = {
  style?: ReactLumaElementStyle;
  tint?: string;
  src: string;
};

export type ReactLumaElementProps =
  | ReactLumaViewProps
  | ReactLumaTextProps
  | ReactLumaImageProps;

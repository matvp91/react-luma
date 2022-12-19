import type { ReactNode } from "react";

export type ElementStyle = {
  flexDirection?: "row" | "column";
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

export type ViewProps = {
  style?: ElementStyle;
  children?: ReactNode;
};

export type TextProps = {
  style?: ElementStyle;
  color?: string;
  text: string;
};

export type ImageProps = {
  style?: ElementStyle;
  tint?: string;
  src: string;
};

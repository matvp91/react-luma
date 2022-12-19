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
  text: string;
};

export type SpriteProps = {
  style?: ElementStyle;
  color?: string;
};

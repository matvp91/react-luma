import * as PIXI from "pixi.js";
import type { ReactNode } from "react";

export type ReactLumaElementStyle = {
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

export type ReactLumaElementProps = {
  style?: ReactLumaElementStyle;
  children?: ReactNode;
};

export type ReactLumaTextElementProps = {
  style?: ReactLumaElementStyle;
  text: string;
};

export type ReactLumaSpriteElementProps = {
  style?: ReactLumaElementStyle;
  children?: ReactNode;
  fill?: string;
  texture?: PIXI.Texture;
  tint?: number;
};

export type ReactLumaImageElementProps = {
  style?: ReactLumaElementStyle;
  src: string;
};

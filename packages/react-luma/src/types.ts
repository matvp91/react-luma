import * as PIXI from "pixi.js";
import type { ReactNode, MutableRefObject, ForwardedRef } from "react";
import type { ReactLumaElement } from "./ReactLumaElement";
import type { PickCommon } from "./typed-utils";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      View: ReactLumaElementViewProps;
      Sprite: ReactLumaElementSpriteProps;
      Text: ReactLumaElementTextProps;
    }
  }
}

export type ReactLumaElementCommonProps = PickCommon<
  PickCommon<ReactLumaElementViewProps, ReactLumaElementSpriteProps>,
  ReactLumaElementTextProps
>;

export type ReactLumaElementStyle = {
  flexDirection?: "row" | "column";
  alignItems?: "center";
  justifyContent?: "center";
  padding?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  margin?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  width?: number | string;
  height?: number | string;
};

export type ReactLumaElementTransform = {
  x?: number;
  y?: number;
};

export type ReactLumaElementRef =
  | MutableRefObject<ReactLumaElement | undefined>
  | ForwardedRef<ReactLumaElement>;

export type ReactLumaElementViewProps = {
  style?: ReactLumaElementStyle;
  transform?: ReactLumaElementTransform;
  children?: ReactNode;
  ref?: ReactLumaElementRef;
};

export type ReactLumaElementSpriteProps = {
  style?: ReactLumaElementStyle;
  transform?: ReactLumaElementTransform;
  children?: ReactNode;
  ref?: ReactLumaElementRef;
  texture?: PIXI.Texture;
  tint?: string;
};

export type ReactLumaElementTextProps = {
  style?: ReactLumaElementStyle;
  transform?: ReactLumaElementTransform;
  ref?: ReactLumaElementRef;
  text: string;
  fill?: string;
};

export type ReactLumaOpaqueValue = any;

import * as PIXI from "pixi.js";
import type { ReactNode, Ref } from "react";
import type { ReactLumaElement } from "./ReactLumaElement";

type PickCommon<A, B> = Pick<
  A,
  {
    [K in keyof A & keyof B]: A[K] extends B[K]
      ? B[K] extends A[K]
        ? K
        : never
      : never;
  }[keyof A & keyof B]
>;

export type ReactLumaElementCommonProps = PickCommon<
  PickCommon<ReactLumaElementViewProps, ReactLumaElementSpriteProps>,
  ReactLumaElementTextProps
>;

export type ReactLumaElementStyle = {
  flexDirection?: "row" | "column";
  alignItems?: "center";
  justifyContent?: "center";
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

export type ReactLumaElementTransform = {
  left?: number;
  top?: number;
};

export type ReactLumaElementViewProps = {
  style?: ReactLumaElementStyle;
  transform?: ReactLumaElementTransform;
  children?: ReactNode;
  ref?: Ref<ReactLumaElement>;
};

export type ReactLumaElementSpriteProps = {
  style?: ReactLumaElementStyle;
  transform?: ReactLumaElementTransform;
  children?: ReactNode;
  ref?: Ref<ReactLumaElement>;
  texture?: PIXI.Texture;
  tint?: string;
};

export type ReactLumaElementTextProps = {
  style?: ReactLumaElementStyle;
  transform?: ReactLumaElementTransform;
  ref?: Ref<ReactLumaElement>;
  text: string;
  fill?: string;
};

export type ReactLumaOpaqueValue = any;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      View: ReactLumaElementViewProps;
      Sprite: ReactLumaElementSpriteProps;
      Text: ReactLumaElementTextProps;
    }
  }
}

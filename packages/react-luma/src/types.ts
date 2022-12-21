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

export type ReactLumaElementViewProps = {
  style?: ReactLumaElementStyle;
  children?: ReactNode;
  ref?: Ref<ReactLumaElement>;
};

export type ReactLumaElementSpriteProps = {
  style?: ReactLumaElementStyle;
  children?: ReactNode;
  ref?: Ref<ReactLumaElement>;
  texture?: PIXI.Texture;
  tint?: string;
};

export type ReactLumaElementTextProps = {
  style?: ReactLumaElementStyle;
  ref?: Ref<ReactLumaElement>;
  text: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      View: ReactLumaElementViewProps;
      Sprite: ReactLumaElementSpriteProps;
      Text: ReactLumaElementTextProps;
    }
  }
}

import React from "react";
import { SpriteTag } from "./constants";
import type { IStyle } from "../layout/types";

export type SpriteProps = {
  style?: IStyle;
  tint: number;
};

export function Sprite(props: SpriteProps) {
  return (
    // @ts-ignore
    <SpriteTag style={props.style} tint={props.tint} />
  );
}

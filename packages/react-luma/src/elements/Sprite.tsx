import React from "react";
import { SpriteTag } from "./constants";
import type { IStyle } from "../layout/types";

export type SpriteProps = {
  style?: IStyle;
  color?: string;
};

function colorToHex(color?: string) {
  if (!color) {
    return undefined;
  }
  return parseInt(
    color.substring(4, 2) + color.substring(2, 2) + color.substring(0, 2),
    16
  );
}

export function Sprite(props: SpriteProps) {
  return (
    // @ts-ignore
    <SpriteTag style={props.style} tint={colorToHex(props.color)} />
  );
}

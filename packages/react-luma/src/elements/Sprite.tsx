import React from "react";
import { utils } from "pixi.js";
import { SpriteTag } from "./constants";
import type { IStyle } from "../layout/types";

export type SpriteProps = {
  style?: IStyle;
  color?: string;
};

export function Sprite(props: SpriteProps) {
  return (
    // @ts-ignore
    <SpriteTag style={props.style} tint={utils.string2hex(props.color)} />
  );
}

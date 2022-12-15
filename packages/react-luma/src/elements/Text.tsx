import React from "react";
import { TextTag } from "./constants";
import type { IStyle } from "../layout/types";

export type TextProps = {
  style?: IStyle;
  text: string;
};

export function Text(props: TextProps) {
  // @ts-ignore
  return <TextTag style={props.style} text={props.text} />;
}

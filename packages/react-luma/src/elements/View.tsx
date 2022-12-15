import React from "react";
import { ViewTag } from "./constants";
import type { IStyle } from "../layout/types";

export type ViewProps = {
  style?: IStyle;
  children?: JSX.Element | JSX.Element[];
};

export function View(props: ViewProps) {
  // @ts-ignore
  return <ViewTag style={props.style}>{props.children}</ViewTag>;
}

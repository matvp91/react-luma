import React, { forwardRef } from "react";
import { ViewTag } from "./constants";
import type { IStyle } from "../layout/types";

export type ViewProps = {
  style?: IStyle;
  children?: React.ReactNode;
};

export const View = forwardRef((props: ViewProps, ref) => {
  return (
    // @ts-ignore
    <ViewTag ref={ref} style={props.style}>
      {props.children}
    </ViewTag>
  );
});

import React, { forwardRef } from "react";
import type { ViewProps, TextProps, ImageProps } from "./types";

export const View = forwardRef((props: ViewProps, ref) => {
  return React.createElement("View", {
    ...props,
    ref,
  });
});

export const Text = (props: TextProps) => React.createElement("Text", props);

export const Image = (props: ImageProps) => React.createElement("Image", props);

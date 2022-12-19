import React, { forwardRef } from "react";
import type { ViewProps, TextProps, SpriteProps } from "./types";

export const View = forwardRef((props: ViewProps, ref) => {
  return React.createElement("View", {
    ...props,
    ref,
  });
});

export const Text = (props: TextProps) => React.createElement("Text", props);

export const Sprite = (props: SpriteProps) =>
  React.createElement("Sprite", props);

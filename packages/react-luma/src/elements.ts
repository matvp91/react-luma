import React, { forwardRef } from "react";
import type {
  ReactLumaViewProps,
  ReactLumaTextProps,
  ReactLumaImageProps,
} from "./types";

const VIEW = "View";
const TEXT = "Text";
const IMAGE = "Image";

export const ReactLumaView = forwardRef((props: ReactLumaViewProps, ref) => {
  return React.createElement(VIEW, {
    ...props,
    ref,
  });
});

export const ReactLumaText = (props: ReactLumaTextProps) =>
  React.createElement(TEXT, props);

export const ReactLumaImage = (props: ReactLumaImageProps) =>
  React.createElement(IMAGE, props);

import React, { forwardRef } from "react";
import {
  ReactLumaViewProps,
  ReactLumaTextProps,
  ReactLumaImageProps,
  ReactLumaElementType,
} from "./types";

export const ReactLumaView = forwardRef((props: ReactLumaViewProps, ref) => {
  return React.createElement(ReactLumaElementType.View, {
    ...props,
    ref,
  });
});

export const ReactLumaText = (props: ReactLumaTextProps) =>
  React.createElement(ReactLumaElementType.Text, props);

export const ReactLumaImage = (props: ReactLumaImageProps) =>
  React.createElement(ReactLumaElementType.Image, props);

import * as PIXI from "pixi.js";
import React, { forwardRef, useState, useEffect, useMemo } from "react";
import type { ReactLumaElementType } from "./ReactLumaElement";
import type {
  ReactLumaElementProps,
  ReactLumaTextElementProps,
  ReactLumaSpriteElementProps,
  ReactLumaImageElementProps,
} from "./types";

function createElementWrapper<T>(type: ReactLumaElementType) {
  return forwardRef((props: T, ref) => {
    return React.createElement(type, {
      ...props,
      ref,
    });
  });
}

export const ReactLumaView =
  createElementWrapper<ReactLumaElementProps>("View");

export const ReactLumaText =
  createElementWrapper<ReactLumaTextElementProps>("Text");

export const ReactLumaSprite = forwardRef(
  (props: ReactLumaSpriteElementProps, ref) => {
    const tint = useMemo(() => {
      return PIXI.utils.string2hex(props.tint);
    }, [props.tint]);

    return React.createElement("Sprite", {
      ...props,
      tint,
      ref,
    });
  }
);

export const ReactLumaImage = forwardRef(
  (props: ReactLumaImageElementProps, ref) => {
    const [texture, setTexture] = useState<PIXI.Texture | null>(null);

    useEffect(() => {
      PIXI.Texture.fromURL(props.src).then(setTexture);
    }, [props.src]);

    return React.createElement("Sprite", {
      ...props,
      texture,
      ref,
    });
  }
);

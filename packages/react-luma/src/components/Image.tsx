import * as PIXI from "pixi.js";
import { forwardRef, useState, useEffect } from "react";
import { Sprite } from "../";
import type { ReactLumaElement } from "../ReactLumaElement";
import type { ReactLumaElementSpriteProps } from "../types";

type ImageProps = ReactLumaElementSpriteProps & {
  src: string;
};

export default forwardRef<ReactLumaElement, ImageProps>((props, ref) => {
  const [texture, setTexture] = useState<PIXI.Texture | undefined>();

  useEffect(() => {
    PIXI.Texture.fromURL(props.src).then(setTexture);
  }, [props.src]);

  return <Sprite {...props} texture={texture} ref={ref} />;
});

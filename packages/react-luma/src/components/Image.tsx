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

  return (
    <Sprite
      {...props}
      texture={PIXI.Texture.from(props.src)}
      tint="#fff000"
      ref={ref}
    />
  );
});

import { useState, useEffect, useRef } from "react";
import TWEEN from "@tweenjs/tween.js";
import * as PIXI from "pixi.js";

export default function useAnimation(x: number, change: any) {
  //const [animatedX, setAnimatedX] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    PIXI.Ticker.shared.add(() => {
      TWEEN.update(PIXI.Ticker.shared.lastTime);
    });
  }, []);

  useEffect(() => {
    const coords = { x: ref.current };
    const tween = new TWEEN.Tween(coords)
      .to({ x }, 250)
      .onUpdate(() => {
        change(coords.x);
      })
      .start();

    ref.current = x;

    return () => {
      tween.stop();
    };
  }, [x]);

  // return animatedX;
}

import * as PIXI from "pixi.js";
import { NOOP } from "./utils/compact";
import { ReactLumaReconciler } from "./reconciler";
import { Element } from "./element";

export { View } from "./elements/View";
export { Text } from "./elements/Text";
export { Sprite } from "./elements/Sprite";

export type { Element } from "./element";

function createApp(view: HTMLCanvasElement) {
  const width = 1080;
  const height = width * (9 / 16);

  return new PIXI.Application({
    width,
    height,
    backgroundColor: 0x10bb99,
    resolution: window.devicePixelRatio,
    view,
  });
}

export function render(
  reactElement: JSX.Element,
  canvasElement: HTMLCanvasElement
) {
  const app = createApp(canvasElement);

  const node = new Element("View");
  app.stage.addChild(node.displayObject);

  const container = ReactLumaReconciler.createContainer(node, false, false);

  return ReactLumaReconciler.updateContainer(
    reactElement,
    container,
    null,
    NOOP
  );
}

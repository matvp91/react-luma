import * as PIXI from "pixi.js";
import { createElement } from "./ReactLumaElement";
import { ReactLumaReconciler } from "./ReactLumaReconciler";
import { noop } from "./utils/compact";
import type { ReactNode } from "react";

export function render(element: ReactNode, hostContainer: HTMLCanvasElement) {
  const width = 1080;
  const height = width * (9 / 16);

  const app = new PIXI.Application({
    width,
    height,
    backgroundColor: 0x10bb99,
    resolution: window.devicePixelRatio,
    view: hostContainer,
  });

  const rootElement = createElement("View");
  app.stage.addChild(rootElement.displayElement);

  const container = ReactLumaReconciler.createContainer(
    rootElement,
    false,
    false
  );

  return ReactLumaReconciler.updateContainer(element, container, null, noop);
}

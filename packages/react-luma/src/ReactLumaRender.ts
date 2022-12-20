import * as PIXI from "pixi.js";
import { createElement } from "./ReactLumaElement";
import { ReactLumaReconciler } from "./ReactLumaReconciler";
import type { ReactNode } from "react";

function noop() {}

export function render(element: ReactNode, hostContainer: HTMLCanvasElement) {
  const width = 1080;
  const height = width * (9 / 16);
  console.log("viewport", width, height);

  const app = new PIXI.Application({
    width,
    height,
    backgroundColor: PIXI.utils.string2hex("#ffffff"),
    resolution: window.devicePixelRatio,
    view: hostContainer,
  });

  const rootElement = createElement("View", /* isRootElement= */ true);
  app.stage.addChild(rootElement.displayObject);

  const container = ReactLumaReconciler.createContainer(
    rootElement,
    false,
    false
  );

  return ReactLumaReconciler.updateContainer(element, container, null, noop);
}

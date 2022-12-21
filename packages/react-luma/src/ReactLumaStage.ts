import * as PIXI from "pixi.js";
import { createElement } from "./ReactLumaElement";
import { ReactLumaReconciler } from "./ReactLumaReconciler";
import type { ReactNode } from "react";
import type { OpaqueRoot } from "react-reconciler";

const ReactLumaStageContext: {
  app: PIXI.Application<PIXI.ICanvas> | null;
} = {
  app: null,
};

function noop() {}

export type CreateContainerOptions = {
  width: number;
  backgroundColor: string;
};

export function createContainer(
  canvasElement: HTMLCanvasElement,
  options: CreateContainerOptions
) {
  const height = options.width * (9 / 16);

  const app = new PIXI.Application({
    width: options.width,
    height,
    backgroundColor: PIXI.utils.string2hex(options.backgroundColor),
    resolution: window.devicePixelRatio,
    view: canvasElement,
  });
  ReactLumaStageContext.app = app;

  const rootElement = createElement("View");
  app.stage.addChild(rootElement.displayObject);

  return ReactLumaReconciler.createContainer(
    rootElement,
    0,
    null,
    false,
    null,
    "ReactLuma",
    noop,
    null
  );
}

export function updateContainer(element: ReactNode, container: OpaqueRoot) {
  ReactLumaReconciler.updateContainer(element, container, null, noop);
}

export function getStageContext() {
  return ReactLumaStageContext.app;
}

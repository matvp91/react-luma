import * as PIXI from "pixi.js";
import { createElement } from "./ReactLumaElement";
import { setElementStyle } from "./ReactLumaLayout";
import { ReactLumaReconciler } from "./ReactLumaReconciler";
import type { ReactNode } from "react";
import type { OpaqueRoot } from "react-reconciler";

function noop() {}

// TODO: This will not work if we have multiple renderers,
// such as in docs.
export const ReactLumaCurrentApp: {
  current: PIXI.Application<PIXI.ICanvas> | null;
} = {
  current: null,
};

export type CreateContainerOptions = {
  width?: number;
};

export function createContainer(
  canvasElement: HTMLCanvasElement,
  containerOptions: CreateContainerOptions
) {
  const options = {
    width: 1080,
    ...containerOptions,
  };

  const height = options.width * (9 / 16);

  const app = new PIXI.Application({
    width: options.width,
    height,
    //resolution: window.devicePixelRatio,
    view: canvasElement,
    // The canvas always has a transparent background, we can then
    // rely on DOM elements such as video, to render underneath and have
    // player controls built by Luma.
    backgroundAlpha: 0,
    hello: true,
    //forceCanvas: true,
  });
  ReactLumaCurrentApp.current = app;

  // const text = new PIXI.Text("FPS");
  // app.stage.addChild(text);
  // PIXI.Ticker.shared.add(() => {
  //   text.text = PIXI.Ticker.shared.FPS;
  // });

  const rootElement = createElement("View");
  setElementStyle(rootElement, {
    width: "100%",
    height: "100%",
  });
  app.stage.addChild(rootElement.unstable_getDisplayObject());

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

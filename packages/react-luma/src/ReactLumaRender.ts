import { createContainer, updateContainer } from "./ReactLumaStage";
import type { ReactNode } from "react";
import type { CreateContainerOptions } from "./ReactLumaStage";

export const ReactLumaRootContainers = new Map();

export function render(
  element: ReactNode,
  canvasElement: HTMLCanvasElement,
  options: CreateContainerOptions
) {
  let root = ReactLumaRootContainers.get(canvasElement);

  if (!root) {
    root = createContainer(canvasElement, options);
    ReactLumaRootContainers.set(canvasElement, root);
  }

  updateContainer(element, root);
}

export function unmountComponentAtNode(canvasElement: HTMLCanvasElement) {
  if (ReactLumaRootContainers.has(canvasElement)) {
    const root = ReactLumaRootContainers.get(canvasElement);
    ReactLumaRootContainers.delete(root);
    updateContainer(null, root);
  }
}

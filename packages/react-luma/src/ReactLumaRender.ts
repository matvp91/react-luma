import {
  createContainer,
  updateContainer,
  getStageContext,
} from "./ReactLumaStage";
import type { ReactNode } from "react";
import type { CreateContainerOptions } from "./ReactLumaStage";

export function render(
  element: ReactNode,
  canvasElement: HTMLCanvasElement,
  options: CreateContainerOptions
) {
  if (getStageContext()) {
    throw new Error("Dispatcher is already active.");
  }

  const container = createContainer(canvasElement, options);

  updateContainer(element, container);
}

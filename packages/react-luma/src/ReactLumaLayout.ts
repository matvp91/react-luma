import yoga from "@react-pdf/yoga";
import * as PIXI from "pixi.js";
import type { ReactLumaElement } from "./ReactLumaElement";

export function shortToPosition(style: any, name: string) {
  return {
    left: style[`${name}Left`] || style[name] || 0,
    right: style[`${name}Right`] || style[name] || 0,
    top: style[`${name}Top`] || style[name] || 0,
    bottom: style[`${name}Bottom`] || style[name] || 0,
  };
}

function appendStyle(
  displayElement: ReactLumaElement["displayElement"],
  layoutNode: ReactLumaElement["layoutNode"]
) {
  const layout = layoutNode.getComputedLayout();

  displayElement.position.x = layout.left;
  displayElement.position.y = layout.top;

  if (displayElement instanceof PIXI.Sprite) {
    displayElement.width = layout.width;
    displayElement.height = layout.height;
  }

  for (let i = 0; i < displayElement.children.length; i++) {
    const childDisplayElement = displayElement.children[i];
    const childLayoutNode = layoutNode.getChild(i);
    appendStyle(childDisplayElement as PIXI.Container, childLayoutNode);
  }
}

export function calculateLayout(element: ReactLumaElement) {
  element.layoutNode.calculateLayout();

  appendStyle(element.displayElement, element.layoutNode);
}

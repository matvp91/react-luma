import yoga from "@react-pdf/yoga";
import * as PIXI from "pixi.js";
import type { DisplayObject } from "../element";
import type { ILayout } from "./types";

export function createYogaNodes(layout: ILayout): yoga.YogaNode {
  const root = yoga.Node.create();

  root.setDisplay(yoga.DISPLAY_FLEX);

  if (layout.width) {
    root.setWidth(layout.width);
  }
  if (layout.height) {
    root.setHeight(layout.height);
  }
  if (layout.flexDirection) {
    root.setFlexDirection(layout.flexDirection);
  }
  if (layout.padding) {
    if (layout.padding.left) {
      root.setPadding(yoga.EDGE_LEFT, layout.padding.left);
    }
    if (layout.padding.right) {
      root.setPadding(yoga.EDGE_RIGHT, layout.padding.right);
    }
    if (layout.padding.top) {
      root.setPadding(yoga.EDGE_TOP, layout.padding.top);
    }
    if (layout.padding.bottom) {
      root.setPadding(yoga.EDGE_BOTTOM, layout.padding.bottom);
    }
  }
  if (layout.margin) {
    if (layout.margin.left) {
      root.setMargin(yoga.EDGE_LEFT, layout.margin.left);
    }
    if (layout.margin.right) {
      root.setMargin(yoga.EDGE_RIGHT, layout.margin.right);
    }
    if (layout.margin.top) {
      root.setMargin(yoga.EDGE_TOP, layout.margin.top);
    }
    if (layout.margin.bottom) {
      root.setMargin(yoga.EDGE_BOTTOM, layout.margin.bottom);
    }
  }
  if (layout.width) {
    root.setWidth(layout.width);
  }
  if (layout.height) {
    root.setHeight(layout.height);
  }

  if (layout.children) {
    layout.children.map(createYogaNodes).forEach((node, i) => {
      root.insertChild(node, i);
    });
  }

  return root;
}

function applyNode(
  displayObject: DisplayObject,
  layout: ReturnType<yoga.YogaNode["getComputedLayout"]>
) {
  Object.keys(layout).forEach((key) => {
    if (
      (key === "height" && !layout[key]) ||
      key === "bottom" ||
      key === "right"
    ) {
      return;
    }

    // @ts-ignore
    const value = Number.isNaN(layout[key]) ? 0 : layout[key];

    if (key === "left") {
      displayObject.position.x = value;
    }
    if (key === "top") {
      displayObject.position.y = value;
    }
    // TODO: Check if we can have NaN, condition above is probably wrong.
    //       For now, hot fix it.
    if (displayObject instanceof PIXI.Sprite) {
      if (key === "width") {
        displayObject.width = value;
      }
      if (key === "height") {
        displayObject.height = value;
      }
    }
  });
}

function applyNodeToChildren(
  displayObject: DisplayObject,
  node: yoga.YogaNode
) {
  for (let i = 0; i < displayObject.children.length; i++) {
    const child = node.getChild(i);
    if (!child) {
      continue;
    }
    const layout = child.getComputedLayout();
    const element = displayObject.children[i];

    applyNode(element, layout);
    applyNodeToChildren(element, child);
  }
}

export function applyNodeOnDisplayObject(
  displayObject: DisplayObject,
  node: yoga.YogaNode
) {
  applyNode(displayObject, node.getComputedLayout());
  applyNodeToChildren(displayObject, node);
}

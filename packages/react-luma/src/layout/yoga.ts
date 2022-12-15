import yoga from "@react-pdf/yoga";
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

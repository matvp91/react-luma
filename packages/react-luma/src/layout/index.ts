import yoga from "@react-pdf/yoga";
import { Element } from "../element";
import { compact } from "../utils/compact";
import { InvalidStyleConvertError } from "../utils/errors";
import { createYogaNodes, applyNodeOnDisplayObject } from "./yoga";
import type { DisplayObject } from "../element";
import type { IStyle, ILayout } from "./types";

function convertFlexDirection(style: IStyle) {
  switch (style.flexDirection) {
    case undefined:
    case "column":
      return yoga.FLEX_DIRECTION_COLUMN;
    case "row":
      return yoga.FLEX_DIRECTION_ROW;
    default:
      throw new InvalidStyleConvertError(style.flexDirection);
  }
}

function createLayout(style: IStyle): ILayout {
  return {
    flexDirection: convertFlexDirection(style),
  };
}

function layoutDisplayObject(displayObject: DisplayObject) {
  const { style } = displayObject.__luma;
  const layout = createLayout(style || {});

  if (displayObject.__luma.hasBounds) {
    const { width, height } = displayObject.getBounds();
    layout.width = width;
    layout.height = height;
  }

  if (displayObject.children.length) {
    layout.children = compact(layoutChildren(displayObject));
  }

  return layout;
}

function layoutChildren(displayObject: DisplayObject) {
  return displayObject.children.map((child) => layoutDisplayObject(child));
}

export function layoutElement(rootElement: Element) {
  const children = layoutChildren(rootElement.displayObject);

  const layout = layoutDisplayObject(rootElement.displayObject);
  layout.children = children;

  const node = createYogaNodes(layout);
  node.calculateLayout();

  applyNodeOnDisplayObject(rootElement.displayObject, node);
}

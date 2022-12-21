import * as PIXI from "pixi.js";
import yoga from "@react-pdf/yoga";
import { getElement } from "./ReactLumaElement";
import * as t from "typed-assert";
import type { ReactLumaElement } from "./ReactLumaElement";
import type { ReactLumaElementStyle, ReactLumaElementTransform } from "./types";

function extractShortHandToPosition(style: any, name: string) {
  return {
    left: style[`${name}Left`] || style[name] || 0,
    right: style[`${name}Right`] || style[name] || 0,
    top: style[`${name}Top`] || style[name] || 0,
    bottom: style[`${name}Bottom`] || style[name] || 0,
  };
}

function appendStyle(element: ReactLumaElement, depth: number) {
  const layout = element.yogaNode.getComputedLayout();

  element.displayObject.position.x = layout.left;
  element.displayObject.position.y = layout.top;

  if (element.type == "Sprite") {
    element.displayObject.width = layout.width;
    element.displayObject.height = layout.height;
  }

  const childrenCount = element.displayObject.children.length;

  for (let i = 0; i < childrenCount; i++) {
    const child = getElement(element.displayObject.children[i]);
    appendStyle(child, depth + 1);
  }
}

export function calculateLayout(element: ReactLumaElement) {
  if ((window as any).DISABLE) {
    return;
  }
  element.yogaNode.calculateLayout();
  appendStyle(element, 0);
}

export function setElementStyle(
  element: ReactLumaElement,
  style: ReactLumaElementStyle
) {
  element.yogaNode.setDisplay(yoga.DISPLAY_FLEX);

  if (style.flexDirection === "row") {
    element.yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  } else if (style.flexDirection === "column") {
    element.yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);
  }

  if (style.alignItems === "center") {
    element.yogaNode.setAlignItems(yoga.ALIGN_CENTER);
  }
  if (style.justifyContent === "center") {
    element.yogaNode.setJustifyContent(yoga.JUSTIFY_CENTER);
  }

  if (style.width) {
    element.yogaNode.setWidth(style.width);
  }
  if (style.height) {
    element.yogaNode.setHeight(style.height);
  }

  const padding = extractShortHandToPosition(style, "padding");
  if (padding.left) {
    element.yogaNode.setPadding(yoga.EDGE_LEFT, padding.left);
  }
  if (padding.right) {
    element.yogaNode.setPadding(yoga.EDGE_RIGHT, padding.right);
  }
  if (padding.top) {
    element.yogaNode.setPadding(yoga.EDGE_TOP, padding.top);
  }
  if (padding.bottom) {
    element.yogaNode.setPadding(yoga.EDGE_BOTTOM, padding.bottom);
  }

  const margin = extractShortHandToPosition(style, "margin");
  if (margin.left) {
    element.yogaNode.setMargin(yoga.EDGE_LEFT, margin.left);
  }
  if (margin.right) {
    element.yogaNode.setMargin(yoga.EDGE_RIGHT, margin.right);
  }
  if (margin.top) {
    element.yogaNode.setMargin(yoga.EDGE_TOP, margin.top);
  }
  if (margin.bottom) {
    element.yogaNode.setMargin(yoga.EDGE_BOTTOM, margin.bottom);
  }
}

export function setElementTransform(
  element: ReactLumaElement,
  transform: ReactLumaElementTransform
) {
  if (!transform) {
    return;
  }

  if (transform.left !== undefined) {
    element.displayObject.position.x = transform.left;
  }

  if (transform.top !== undefined) {
    element.displayObject.position.y = transform.top;
  }
}

export function setElementAttribute(
  element: ReactLumaElement,
  key: string,
  value: unknown
) {
  if (element.type === "Text") {
    if (key === "text" && value !== undefined) {
      t.isString(value, `Text ${key}=${value} is not a string.`);
      element.displayObject.text = value;

      const localBounds = element.displayObject.getLocalBounds();
      element.yogaNode.setWidth(localBounds.width);
      element.yogaNode.setHeight(localBounds.height);
    }
    if (key === "fill" && value !== undefined) {
      t.isString(value, `Text ${key}=${value} is not a string.`);
      element.displayObject.style.fill = PIXI.utils.string2hex(value);
    }
  }

  if (element.type === "Sprite") {
    if (key === "texture" && value !== undefined) {
      t.isInstanceOf(value, PIXI.Texture, `Sprite ${key} is not a texture.`);

      element.displayObject.texture = value;

      const layout = ensureYogaNodeLayout(element.yogaNode);
      element.displayObject.width = layout.width;
      element.displayObject.height = layout.height;
    }

    if (key === "tint" && value !== undefined) {
      t.isString(value, `Sprite ${key}=${value} is not a string.`);
      element.displayObject.tint = PIXI.utils.string2hex(value);
    }
  }
}

function ensureYogaNodeLayout(yogaNode: yoga.YogaNode) {
  if (yogaNode.isDirty()) {
    yogaNode.calculateLayout();
  }
  return yogaNode.getComputedLayout();
}

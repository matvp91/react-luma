import * as PIXI from "pixi.js";
import yoga from "@react-pdf/yoga";
import * as t from "typed-assert";
import { ReactLumaCurrentApp } from "./ReactLumaStage";
import { isElementOfType } from "./ReactLumaElement";
import type { ReactLumaElement } from "./ReactLumaElement";
import type { ReactLumaElementStyle, ReactLumaElementTransform } from "./types";

function extractShortHandToPosition(
  style: {
    [key: string]: string | number;
  },
  name: string
) {
  return {
    left: style[`${name}Left`] || style[name] || 0,
    right: style[`${name}Right`] || style[name] || 0,
    top: style[`${name}Top`] || style[name] || 0,
    bottom: style[`${name}Bottom`] || style[name] || 0,
  };
}

function appendStyle(element: ReactLumaElement) {
  const layout = element.yogaNode.getComputedLayout();

  element.x = layout.left;
  element.y = layout.top;

  if (element.type == "Sprite") {
    element.width = layout.width;
    element.height = layout.height;
  }

  // Traverse the tree and append style for each child.
  element.getChildren().forEach(appendStyle);
}

export function calculateLayout(element: ReactLumaElement) {
  if (!ReactLumaCurrentApp.current) {
    throw new Error(
      "Cannot calculate layout, ReactLumaCurrentApp is undefined"
    );
  }

  const { screen } = ReactLumaCurrentApp.current;

  element.yogaNode.calculateLayout(screen.width, screen.height);
  appendStyle(element);
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

  if (style.width !== undefined) {
    element.yogaNode.setWidth(style.width);
  }
  if (style.height !== undefined) {
    element.yogaNode.setHeight(style.height);
  }

  const padding = extractShortHandToPosition(style, "padding");
  if (padding.left !== undefined) {
    element.yogaNode.setPadding(yoga.EDGE_LEFT, padding.left);
  }
  if (padding.right !== undefined) {
    element.yogaNode.setPadding(yoga.EDGE_RIGHT, padding.right);
  }
  if (padding.top !== undefined) {
    element.yogaNode.setPadding(yoga.EDGE_TOP, padding.top);
  }
  if (padding.bottom !== undefined) {
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
    element.x = transform.left;
  }

  if (transform.top !== undefined) {
    element.y = transform.top;
  }
}

export function setElementAttribute(
  element: ReactLumaElement,
  key: string,
  value: unknown
) {
  if (isElementOfType(element, "Text")) {
    if (key === "text" && value !== undefined) {
      t.isString(value, `Text ${key}=${value} is not a string.`);

      element.text = value;

      const localBounds = element.getLocalBounds();
      element.yogaNode.setWidth(localBounds.width);
      element.yogaNode.setHeight(localBounds.height);
    }
    if (key === "fill" && value !== undefined) {
      t.isString(value, `Text ${key}=${value} is not a string.`);

      element.fill = value;
    }
  }

  if (isElementOfType(element, "Sprite")) {
    if (key === "texture" && value !== undefined) {
      t.isInstanceOf(value, PIXI.Texture, `Sprite ${key} is not a texture.`);

      element.texture = value;

      const layout = ensureYogaNodeLayout(element.yogaNode);
      element.width = layout.width;
      element.height = layout.height;
    }

    if (key === "tint" && value !== undefined) {
      t.isString(value, `Sprite ${key}=${value} is not a string.`);

      element.tint = value;
    }
  }
}

function ensureYogaNodeLayout(yogaNode: yoga.YogaNode) {
  if (yogaNode.isDirty()) {
    yogaNode.calculateLayout();
  }
  return yogaNode.getComputedLayout();
}

import * as PIXI from "pixi.js";
import yoga from "@react-pdf/yoga";
import { getElement } from "./ReactLumaElement";
import type { ReactLumaElement } from "./ReactLumaElement";
import type {
  ReactLumaElementCommonProps,
  ReactLumaElementSpriteProps,
  ReactLumaElementTextProps,
} from "./types";

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
  element.yogaNode.calculateLayout();
  appendStyle(element, 0);
}

function setTextProps(
  element: Extract<ReactLumaElement, { type: "Text" }>,
  props: ReactLumaElementTextProps
) {
  element.displayObject.text = props.text;

  const localBounds = element.displayObject.getLocalBounds();
  element.yogaNode.setWidth(localBounds.width);
  element.yogaNode.setHeight(localBounds.height);
}

function setSpriteProps(
  element: Extract<ReactLumaElement, { type: "Sprite" }>,
  props: ReactLumaElementSpriteProps
) {
  if (props.texture) {
    element.displayObject.texture = props.texture;
  }
  if (props.tint) {
    element.displayObject.tint = PIXI.utils.string2hex(props.tint);
  }
}

export function setElementProps(
  element: ReactLumaElement,
  props: ReactLumaElementCommonProps
) {
  if (element.type === "Text") {
    setTextProps(element, props as ReactLumaElementTextProps);
  }

  if (element.type === "Sprite") {
    setSpriteProps(element, props as ReactLumaElementSpriteProps);
  }

  if (props.style) {
    element.yogaNode.setDisplay(yoga.DISPLAY_FLEX);

    if (props.style.flexDirection === "row") {
      element.yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    } else if (props.style.flexDirection === "column") {
      element.yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);
    }

    if (props.style.width) {
      element.yogaNode.setWidth(props.style.width);
    }
    if (props.style.height) {
      element.yogaNode.setHeight(props.style.height);
    }

    const padding = extractShortHandToPosition(props.style, "padding");
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

    const margin = extractShortHandToPosition(props.style, "margin");
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
}

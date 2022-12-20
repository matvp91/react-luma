import * as PIXI from "pixi.js";
import yoga from "@react-pdf/yoga";
import type { ReactLumaElement } from "./ReactLumaElement";
import type {
  ReactLumaTextProps,
  ReactLumaImageProps,
  ReactLumaElementStyle,
  ReactLumaElementProps,
} from "./types";

type ReactLumaLayoutPosition = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export function shortToPosition(
  style: any,
  name: string
): ReactLumaLayoutPosition {
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

  // TODO: This is a very messy check. Make it explicit.
  if (
    displayElement instanceof PIXI.Sprite &&
    !(displayElement instanceof PIXI.Text)
  ) {
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

function setStyleToLayoutNode(
  layoutNode: yoga.YogaNode,
  style: ReactLumaElementStyle
) {
  layoutNode.setDisplay(yoga.DISPLAY_FLEX);

  if (style.flexDirection === "row") {
    layoutNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
  } else if (style.flexDirection === "column") {
    layoutNode.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);
  }

  if (style.left) {
    layoutNode.setPosition(yoga.EDGE_LEFT, style.left);
  }

  if (style.width) {
    layoutNode.setWidth(style.width);
  }
  if (style.height) {
    layoutNode.setHeight(style.height);
  }

  const padding = shortToPosition(style, "padding");
  if (padding.left) {
    layoutNode.setPadding(yoga.EDGE_LEFT, padding.left);
  }
  if (padding.right) {
    layoutNode.setPadding(yoga.EDGE_RIGHT, padding.right);
  }
  if (padding.top) {
    layoutNode.setPadding(yoga.EDGE_TOP, padding.top);
  }
  if (padding.bottom) {
    layoutNode.setPadding(yoga.EDGE_BOTTOM, padding.bottom);
  }

  const margin = shortToPosition(style, "margin");
  if (margin.left) {
    layoutNode.setMargin(yoga.EDGE_LEFT, margin.left);
  }
  if (margin.right) {
    layoutNode.setMargin(yoga.EDGE_RIGHT, margin.right);
  }
  if (margin.top) {
    layoutNode.setMargin(yoga.EDGE_TOP, margin.top);
  }
  if (margin.bottom) {
    layoutNode.setMargin(yoga.EDGE_BOTTOM, margin.bottom);
  }
}

function setTextProps(
  displayElement: PIXI.Text,
  layoutNode: yoga.YogaNode,
  props: ReactLumaTextProps
) {
  displayElement.text = props.text ?? "";

  if (props.color) {
    displayElement.style.fill = PIXI.utils.string2hex(props.color);
  }

  const bounds = displayElement.getBounds();
  layoutNode.setWidth(bounds.width);
  layoutNode.setHeight(bounds.height);
}

function setImageProps(
  displayElement: PIXI.Sprite,
  props: ReactLumaImageProps
) {
  if (props.tint) {
    displayElement.tint = PIXI.utils.string2hex(props.tint);
  }

  if (props.src) {
    PIXI.Texture.fromURL(props.src).then((texture) => {
      displayElement.texture = texture;
    });
  }
}

export function setProps(
  element: ReactLumaElement,
  props: ReactLumaElementProps
) {
  if (props.style) {
    setStyleToLayoutNode(element.layoutNode, props.style);
  }

  if (element.type === "Text") {
    setTextProps(
      element.displayElement as PIXI.Text,
      element.layoutNode,
      props as ReactLumaTextProps
    );
  }

  if (element.type === "Image") {
    setImageProps(
      element.displayElement as PIXI.Sprite,
      props as ReactLumaImageProps
    );
  }
}

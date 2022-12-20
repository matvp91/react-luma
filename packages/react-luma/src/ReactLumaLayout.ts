import yoga from "@react-pdf/yoga";
import { getElement } from "./ReactLumaElement";
import type { ReactLumaElement } from "./ReactLumaElement";
import type {
  ReactLumaElementProps,
  ReactLumaSpriteElementProps,
  ReactLumaTextElementProps,
} from "./types";

function appendStyle(element: ReactLumaElement) {
  const layout = element.yogaNode.getComputedLayout();

  element.displayObject.position.x = layout.left;
  element.displayObject.position.y = layout.top;

  if (element.type === "Sprite") {
    element.displayObject.width = layout.width;
    element.displayObject.height = layout.height;
  }

  const childrenCount = element.displayObject.children.length;

  for (let i = 0; i < childrenCount; i++) {
    const child = getElement(element.displayObject.children[i]);
    appendStyle(child);
  }
}

export function calculateLayout(element: ReactLumaElement) {
  element.yogaNode.calculateLayout();
  appendStyle(element);
}

function setTextProps(
  element: Extract<ReactLumaElement, { type: "Text" }>,
  props: ReactLumaTextElementProps
) {
  element.displayObject.text = props.text;

  const localBounds = element.displayObject.getLocalBounds();
  element.yogaNode.setWidth(localBounds.width);
  element.yogaNode.setHeight(localBounds.height);
}

function setSpriteProps(
  element: Extract<ReactLumaElement, { type: "Sprite" }>,
  props: ReactLumaSpriteElementProps
) {
  if (props.texture) {
    element.displayObject.texture = props.texture;
  }
  if (props.tint) {
    element.displayObject.tint = props.tint;
  }
}

export function setElementProps(
  element: ReactLumaElement,
  props: ReactLumaElementProps
) {
  if (element.type === "Text") {
    setTextProps(element, props as ReactLumaTextElementProps);
  }

  if (element.type === "Sprite") {
    setSpriteProps(element, props as ReactLumaSpriteElementProps);
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
  }
}

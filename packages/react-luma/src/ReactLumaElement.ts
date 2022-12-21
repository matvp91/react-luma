import * as PIXI from "pixi.js";
import yoga from "@react-pdf/yoga";
import { patchLayoutTransform } from "./utils/pixi";
import { ReactLumaElementNonExistent } from "./errors";
import type { ReactLumaOpaqueValue } from "./types";

// Key used to store a pointer to the current ReactLumaElement,
// not meant to be used directly but rather use getElement(<any object>)
// which will throw an error if you request the element on an
// object where it does not exist.
const LumaElementInternalKey = "__lumaElement";

export type ReactLumaElement = {
  yogaNode: yoga.YogaNode;
  calculateLayout: boolean;
} & (
  | {
      type: "View";
      displayObject: PIXI.Container;
    }
  | {
      type: "Text";
      displayObject: PIXI.Text;
    }
  | {
      type: "Sprite";
      displayObject: PIXI.Sprite;
    }
);

export type ReactLumaElementType = ReactLumaElement["type"];

export function getElement(obj: ReactLumaOpaqueValue): ReactLumaElement {
  if (!obj[LumaElementInternalKey]) {
    throw new ReactLumaElementNonExistent(obj);
  }
  return obj[LumaElementInternalKey];
}

export function createElement(type: ReactLumaElementType): ReactLumaElement {
  let displayObject: any;
  if (type === "Text") {
    displayObject = new PIXI.Text();
  } else if (type === "Sprite") {
    displayObject = new PIXI.Sprite();
  } else {
    displayObject = new PIXI.Container();
  }

  patchLayoutTransform(displayObject);

  const lumaElement = {
    type,
    displayObject,
    yogaNode: yoga.Node.create(),
    calculateLayout: false,
  };

  displayObject[LumaElementInternalKey] = lumaElement;

  return lumaElement;
}

export function appendChild(
  element: ReactLumaElement,
  child: ReactLumaElement
) {
  element.displayObject.addChild(child.displayObject);

  const index = element.displayObject.getChildIndex(child.displayObject);
  element.yogaNode.insertChild(child.yogaNode, index);
}

export function insertBefore(
  element: ReactLumaElement,
  child: ReactLumaElement,
  beforeChild: ReactLumaElement
) {
  const index = element.displayObject.getChildIndex(beforeChild.displayObject);

  element.displayObject.addChildAt(child.displayObject, index);
  element.yogaNode.insertChild(child.yogaNode, index);
}

export function removeChild(
  element: ReactLumaElement,
  child: ReactLumaElement
) {
  element.displayObject.removeChild(child.displayObject);
  element.yogaNode.removeChild(child.yogaNode);
}

import * as PIXI from "pixi.js";
import yoga from "@react-pdf/yoga";
import { patchLayoutTransform } from "./utils/pixi";

const LUMA_ELEMENT_SYMBOL = Symbol("lumaElementSymbol");

export type ReactLumaElement = {
  yogaNode: yoga.YogaNode;
  isRootElement: boolean;
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

export function getElement(obj: any): ReactLumaElement {
  if (!obj[LUMA_ELEMENT_SYMBOL]) {
    throw new Error("Could not get luma element from unknown object.");
  }
  return obj[LUMA_ELEMENT_SYMBOL];
}

export function createElement(
  type: ReactLumaElementType,
  isRootElement: boolean = false
): ReactLumaElement {
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
    isRootElement,
  };

  displayObject[LUMA_ELEMENT_SYMBOL] = lumaElement;

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

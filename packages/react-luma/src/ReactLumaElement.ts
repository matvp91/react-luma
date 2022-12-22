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

const LumaElementInitMethod = Symbol("LumaElementInitMethod");

export function unstable_getElement(
  obj: ReactLumaOpaqueValue
): ReactLumaElement {
  const value = obj[LumaElementInternalKey];
  if (value && value instanceof ReactLumaElement) {
    return value;
  }
  throw new ReactLumaElementNonExistent(obj);
}

export type ReactLumaElementType = "View" | "Text" | "Sprite";

export function isElementOfType<T extends ReactLumaElementType>(
  element: ReactLumaElement,
  type: T
): element is T extends "View"
  ? ReactLumaElementView
  : T extends "Text"
  ? ReactLumaElementText
  : T extends "Sprite"
  ? ReactLumaElementSprite
  : ReactLumaElement {
  return element.type === type;
}

abstract class ReactLumaElement {
  readonly type: ReactLumaElementType;

  readonly yogaNode = yoga.Node.create();

  protected abstract displayObject: PIXI.Container;

  rootRecalcLayout = false;

  constructor(type: ReactLumaElementType) {
    this.type = type;
  }

  [LumaElementInitMethod]() {
    patchLayoutTransform(this.displayObject);

    (this.displayObject as ReactLumaOpaqueValue)[LumaElementInternalKey] = this;
  }

  appendChild(child: ReactLumaElement) {
    this.displayObject.addChild(child.displayObject);

    const index = this.displayObject.getChildIndex(child.displayObject);
    this.yogaNode.insertChild(child.yogaNode, index);
  }

  insertBefore(child: ReactLumaElement, beforeChild: ReactLumaElement) {
    const index = this.displayObject.getChildIndex(beforeChild.displayObject);

    this.displayObject.addChildAt(child.displayObject, index);
    this.yogaNode.insertChild(child.yogaNode, index);
  }

  removeChild(child: ReactLumaElement) {
    this.displayObject.removeChild(child.displayObject);
    this.yogaNode.removeChild(child.yogaNode);
  }

  getChildren() {
    return this.displayObject.children.map(unstable_getElement);
  }

  getLocalBounds() {
    return this.displayObject.getLocalBounds();
  }

  set x(value: number) {
    this.displayObject.position.x = value;
  }

  set y(value: number) {
    this.displayObject.position.y = value;
  }

  set width(value: number) {
    this.displayObject.width = value;
  }

  set height(value: number) {
    this.displayObject.height = value;
  }

  unstable_getDisplayObject() {
    return this.displayObject;
  }
}

export type { ReactLumaElement };

class ReactLumaElementView extends ReactLumaElement {
  protected displayObject = new PIXI.Container();
}

class ReactLumaElementText extends ReactLumaElement {
  protected displayObject = new PIXI.Text();

  set text(value: string) {
    this.displayObject.text = value;
  }

  set fill(value: string) {
    this.displayObject.style.fill = PIXI.utils.string2hex(value);
  }
}

class ReactLumaElementSprite extends ReactLumaElement {
  protected displayObject = new PIXI.Sprite();

  set texture(value: PIXI.Texture) {
    this.displayObject.texture = value;
  }

  set tint(value: string) {
    this.displayObject.tint = PIXI.utils.string2hex(value);
  }
}

export function createElement(type: ReactLumaElementType) {
  let element: ReactLumaElement | null = null;

  if (type === "Sprite") {
    element = new ReactLumaElementSprite(type);
  }
  if (type === "Text") {
    element = new ReactLumaElementText(type);
  }
  if (type === "View") {
    element = new ReactLumaElementView(type);
  }

  // TODO: Add custom error.
  if (!element) {
    throw new Error("Failed");
  }

  element[LumaElementInitMethod]();

  return element;
}

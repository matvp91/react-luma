import * as PIXI from "pixi.js";
import yoga from "@react-pdf/yoga";
import { setProps } from "./ReactLumaLayout";
import type { ReactLumaElementProps } from "./types";

export type ReactLumaElementType = "View" | "Text" | "Image";

export class ReactLumaElement {
  readonly type: ReactLumaElementType;

  readonly displayElement: PIXI.Container;

  readonly layoutNode: yoga.YogaNode;

  constructor(type: ReactLumaElementType) {
    this.type = type;

    this.layoutNode = yoga.Node.create();

    if (type === "Text") {
      this.displayElement = new PIXI.Text();
    } else if (type === "Image") {
      this.displayElement = new PIXI.Sprite();
    } else if (type === "View") {
      this.displayElement = new PIXI.Container();
    } else {
      throw new Error(`ReactLumaElement: invalid type "${type}"`);
    }
  }

  appendChild(child: ReactLumaElement) {
    appendChildToElement(this, child);
  }

  insertBefore(child: ReactLumaElement, beforeChild: ReactLumaElement) {
    insertBeforeInElement(this, child, beforeChild);
  }

  removeChild(child: ReactLumaElement) {
    removeChildFromElement(this, child);
  }

  setProps(props: ReactLumaElementProps) {
    setProps(this, props);
  }

  getBounds() {
    const bounds = this.displayElement.getBounds();
    return {
      left: bounds.left,
      right: bounds.right,
      top: bounds.top,
      bottom: bounds.bottom,
      width: bounds.width,
      height: bounds.height,
    };
  }
}

export function createElement(type: ReactLumaElementType) {
  return new ReactLumaElement(type);
}

function appendChildToElement(
  element: ReactLumaElement,
  child: ReactLumaElement
) {
  element.displayElement.addChild(child.displayElement);

  const index = element.displayElement.getChildIndex(child.displayElement);
  element.layoutNode.insertChild(child.layoutNode, index);
}

function removeChildFromElement(
  element: ReactLumaElement,
  child: ReactLumaElement
) {
  element.displayElement.removeChild(child.displayElement);
  element.layoutNode.removeChild(child.layoutNode);
}

function insertBeforeInElement(
  element: ReactLumaElement,
  child: ReactLumaElement,
  beforeChild: ReactLumaElement
) {
  const index = element.displayElement.getChildIndex(
    beforeChild.displayElement
  );
  element.displayElement.addChildAt(child.displayElement, index);
  element.layoutNode.insertChild(element.layoutNode, index);
}

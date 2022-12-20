import * as PIXI from "pixi.js";
import yoga from "@react-pdf/yoga";
import { setProps } from "./ReactLumaLayout";
import { ReactLumaElementType } from "./types";
import type { ReactLumaElementProps } from "./types";

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
    this.displayElement.addChild(child.displayElement);

    const index = this.displayElement.getChildIndex(child.displayElement);
    this.layoutNode.insertChild(child.layoutNode, index);
  }

  insertBefore(child: ReactLumaElement, beforeChild: ReactLumaElement) {
    const index = this.displayElement.getChildIndex(beforeChild.displayElement);
    this.displayElement.addChildAt(child.displayElement, index);
    this.layoutNode.insertChild(this.layoutNode, index);
  }

  removeChild(child: ReactLumaElement) {
    this.displayElement.removeChild(child.displayElement);
    this.layoutNode.removeChild(child.layoutNode);
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

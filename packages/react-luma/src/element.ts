import * as PIXI from "pixi.js";
import { IStyle } from "./layout/types";

export type DisplayObject = PIXI.Container & {
  children: DisplayObject[];
  __luma: {
    hasBounds: boolean;
    style?: IStyle;
  };
};

export type ElementType = "View" | "Text";

export class Element {
  displayObject: DisplayObject;

  type: ElementType;

  constructor(type: ElementType) {
    switch (type) {
      case "Text":
        // @ts-ignore
        this.displayObject = new PIXI.Text();
        this.displayObject.__luma = {
          hasBounds: true,
        };
        break;
      default:
        // @ts-ignore
        this.displayObject = new PIXI.Container();
        this.displayObject.__luma = {
          hasBounds: false,
        };
        break;
    }

    this.type = type;
  }

  setStyle(style: any) {
    this.displayObject.__luma.style = style;
  }

  appendChild(child: Element) {
    this.displayObject.addChild(child.displayObject);
  }

  insertBefore(child: Element, beforeChild: Element) {
    const index = this.displayObject.getChildIndex(beforeChild.displayObject);
    this.displayObject.addChildAt(child.displayObject, index);
  }

  removeChild(child: Element) {
    this.displayObject.removeChild(child.displayObject);
  }
}

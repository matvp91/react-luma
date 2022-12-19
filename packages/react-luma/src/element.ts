import * as PIXI from "pixi.js";
import type { IStyle } from "./layout/types";

export type DisplayObject = PIXI.Container & {
  children: DisplayObject[];
  __luma: {
    hasBounds: boolean;
    style?: IStyle;
  };
};

export type ElementType = "View" | "Text" | "Sprite";

export type ElementBounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

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
      case "Sprite":
        // @ts-ignore
        this.displayObject = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.displayObject.__luma = {
          // No bounds because we explicitly have to set them, as
          // size of the sprite.
          hasBounds: false,
        };
        break;
      default:
        // @ts-ignore
        this.displayObject = new PIXI.Container();
        this.displayObject.__luma = {
          // No bounds because it's relative to the children
          // of the container.
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

  getBounds(): ElementBounds {
    const bounds = this.displayObject.getBounds();
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

import * as PIXI from "pixi.js";
import yoga from "@react-pdf/yoga";
import { shortToPosition } from "./ReactLumaLayout";

type ReactLumaElementType = "View" | "Text" | "Image";

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

export class ReactLumaElement {
  readonly displayElement: PIXI.Container;

  readonly layoutNode: yoga.YogaNode;

  constructor(type: ReactLumaElementType) {
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

  setProps(props: any) {
    if (props.style) {
      this.layoutNode.setDisplay(yoga.DISPLAY_FLEX);

      if (props.style.flexDirection === "row") {
        this.layoutNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
      } else if (props.style.flexDirection === "column") {
        this.layoutNode.setFlexDirection(yoga.FLEX_DIRECTION_COLUMN);
      }

      if (props.style.width) {
        this.layoutNode.setWidth(props.style.width);
      }

      if (props.style.height) {
        this.layoutNode.setHeight(props.style.height);
      }

      const padding = shortToPosition(props.style, "padding");
      if (padding.left) {
        this.layoutNode.setPadding(yoga.EDGE_LEFT, padding.left);
      }
      if (padding.right) {
        this.layoutNode.setPadding(yoga.EDGE_RIGHT, padding.right);
      }
      if (padding.top) {
        this.layoutNode.setPadding(yoga.EDGE_TOP, padding.top);
      }
      if (padding.bottom) {
        this.layoutNode.setPadding(yoga.EDGE_BOTTOM, padding.bottom);
      }

      const margin = shortToPosition(props.style, "margin");
      if (margin.left) {
        this.layoutNode.setMargin(yoga.EDGE_LEFT, margin.left);
      }
      if (margin.right) {
        this.layoutNode.setMargin(yoga.EDGE_RIGHT, margin.right);
      }
      if (margin.top) {
        this.layoutNode.setMargin(yoga.EDGE_TOP, margin.top);
      }
      if (margin.bottom) {
        this.layoutNode.setMargin(yoga.EDGE_BOTTOM, margin.bottom);
      }
    }

    if (this.displayElement instanceof PIXI.Text) {
      if (props.text) {
        this.displayElement.text = props.text;
      }

      if (props.color) {
        this.displayElement.style.fill = PIXI.utils.string2hex(props.color);
      }

      const bounds = this.displayElement.getBounds();
      this.layoutNode.setWidth(bounds.width);
      this.layoutNode.setHeight(bounds.height);
    }

    if (this.displayElement instanceof PIXI.Sprite) {
      if (props.tint) {
        this.displayElement.tint = PIXI.utils.string2hex(props.tint);
      }

      if (props.src) {
        // TODO: This is wrong, a text element is a sprite aswell.
        PIXI.Texture.fromURL(props.src).then((texture) => {
          (this.displayElement as PIXI.Sprite).texture = texture;
        });
      }
    }
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

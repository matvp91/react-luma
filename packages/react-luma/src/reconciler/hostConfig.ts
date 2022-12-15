import performanceNow from "performance-now";
import invariant from "../utils/invariant";
import { Element } from "../element";
import { layoutElement } from "../layout";
import * as PIXI from "pixi.js";

function setProps(element: Element, props: any) {
  Object.keys(props).forEach((name) => {
    const value = props[name];

    if (name === "style") {
      value && element.setStyle(value);
      return;
    }

    if (element.type === "Text") {
      if (props.text && element.displayObject instanceof PIXI.Text) {
        element.displayObject.text = props.text;
      }
    }

    if (element.type === "Sprite") {
      if (props.tint && element.displayObject instanceof PIXI.Sprite) {
        element.displayObject.tint = props.tint;
      }
    }
  });
}

const NO_CONTEXT = {};

const hostConfig = {
  now: performanceNow,

  getRootHostContext() {
    return NO_CONTEXT;
  },

  getChildHostContext() {
    return NO_CONTEXT;
  },

  getChildHostContextForEventComponent(parentHostContext) {
    return parentHostContext;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit(parent) {
    layoutElement(parent);
  },

  shouldSetTextContent() {
    return false;
  },

  createTextInstance(text) {
    invariant(
      false,
      'react-luma: Error trying to add text node "' + text + '"',
      "If you wish to display some text, use &lt;Text text={string} /&gt; instead."
    );
  },

  createInstance(type, newProps) {
    const instance = new Element(type);
    setProps(instance, newProps);
    return instance;
  },

  appendInitialChild(parent, child) {
    parent.appendChild(child);
  },

  finalizeInitialChildren() {
    return false;
  },

  commitMount() {
    // noop
  },

  appendChildToContainer(parent, child) {
    parent.appendChild(child);
    layoutElement(parent);
  },

  supportsMutation: true,

  prepareUpdate() {
    // TODO: Diff properties.
    return true;
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    setProps(instance, newProps);
  },

  commitTextUpdate() {
    // noop
  },

  appendChild(parent, child) {
    parent.appendChild(child);
  },

  insertBefore(instance, child, beforeChild) {
    instance.insertBefore(child, beforeChild);
  },

  removeChild(instance, child) {
    instance.removeChild(child);
  },

  insertInContainerBefore(container, child, beforeChild) {
    container.insertBefore(child, beforeChild);
  },

  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },

  resetTextContent() {
    // noop
  },

  shouldDeprioritizeSubtree() {
    return false;
  },
};

export default hostConfig;

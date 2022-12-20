import createReconciler from "react-reconciler";
import performanceNow from "performance-now";
import invariant from "./utils/invariant";
import { AbortableSymbol } from "./utils/compact";
import { createElement, ReactLumaElement } from "./ReactLumaElement";
import { calculateLayout } from "./ReactLumaLayout";
import { ReactLumaElementProps, ReactLumaElementType } from "./types";

const NO_CONTEXT = {};

export const ReactLumaReconciler = createReconciler<
  ReactLumaElementType,
  ReactLumaElementProps,
  ReactLumaElement,
  ReactLumaElement,
  ReactLumaElement,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown
>({
  now: performanceNow,

  getRootHostContext() {
    return NO_CONTEXT;
  },

  getChildHostContext() {
    return NO_CONTEXT;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit(parent) {
    calculateLayout(parent);
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
    throw AbortableSymbol;
  },

  createInstance(type, newProps) {
    const element = createElement(type);
    element.setProps(newProps);
    return element;
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
    calculateLayout(parent);
  },

  supportsMutation: true,

  prepareUpdate() {
    return true;
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.setProps(newProps);
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

  scheduleDeferredCallback() {},

  cancelDeferredCallback() {},

  setTimeout() {},

  clearTimeout() {},

  noTimeout: undefined,

  isPrimaryRenderer: true,

  supportsPersistence: false,

  supportsHydration: false,
});

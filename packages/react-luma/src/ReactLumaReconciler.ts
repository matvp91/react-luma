import createReconciler from "react-reconciler";
import performanceNow from "performance-now";
import {
  createElement,
  appendChild,
  insertBefore,
  removeChild,
} from "./ReactLumaElement";
import { setElementProps, calculateLayout } from "./ReactLumaLayout";

const NO_CONTEXT = {};

export const ReactLumaReconciler = createReconciler({
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
    throw new Error("createTextInstance is unsupported.");
  },

  createInstance(type, newProps) {
    const element = createElement(type);
    setElementProps(element, newProps);
    return element;
  },

  appendInitialChild(parent, child) {
    appendChild(parent, child);
  },

  finalizeInitialChildren() {
    return false;
  },

  commitMount() {
    // noop
  },

  appendChildToContainer(parent, child) {
    appendChild(parent, child);
    calculateLayout(parent);
  },

  supportsMutation: true,

  prepareUpdate() {
    return true;
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    setElementProps(instance, newProps);
  },

  commitTextUpdate() {
    // noop
  },

  appendChild(parent, child) {
    appendChild(parent, child);
  },

  insertBefore(instance, child, beforeChild) {
    insertBefore(instance, child, beforeChild);
  },

  removeChild(instance, child) {
    removeChild(instance, child);
  },

  insertInContainerBefore(container, child, beforeChild) {
    insertBefore(container, child, beforeChild);
  },

  removeChildFromContainer(container, child) {
    removeChild(container, child);
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

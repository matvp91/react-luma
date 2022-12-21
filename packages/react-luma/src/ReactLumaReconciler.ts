import createReconciler from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants";
import {
  createElement,
  appendChild,
  insertBefore,
  removeChild,
  ReactLumaElement,
  ReactLumaElementType,
} from "./ReactLumaElement";
import { setElementProps, calculateLayout } from "./ReactLumaLayout";

interface ReactLumaGenericProps {
  [key: string]: unknown;
}

interface ReactLumaHostContext {}

const NO_CONTEXT: ReactLumaHostContext = {};

export const ReactLumaReconciler = createReconciler<
  ReactLumaElementType,
  ReactLumaGenericProps,
  ReactLumaElement,
  ReactLumaElement,
  ReactLumaElement,
  ReactLumaElement,
  unknown,
  unknown,
  ReactLumaHostContext,
  ReactLumaGenericProps,
  unknown,
  unknown,
  unknown
>({
  isPrimaryRenderer: true,
  supportsMutation: true,
  supportsPersistence: false,

  createInstance(type, props, rootContainer, hostContext, internalHandle) {
    const element = createElement(type);
    setElementProps(element, props);
    return element;
  },

  createTextInstance(text, rootContainer, hostContext, internalHandle) {
    throw new Error("createTextInstance is unsupported.");
  },

  appendInitialChild(parentInstance, child) {
    appendChild(parentInstance, child);
  },

  appendChild(parentInstance, child) {
    appendChild(parentInstance, child);
  },

  removeChild(parentInstance, child) {
    removeChild(parentInstance, child);
  },

  finalizeInitialChildren(instance, type, props, rootContainer, hostContext) {
    return false;
  },

  appendChildToContainer(container, child) {
    appendChild(container, child);
    calculateLayout(container);
  },

  insertInContainerBefore(container, child, beforeChild) {
    insertBefore(container, child, beforeChild);
  },

  removeChildFromContainer(container, child) {
    removeChild(container, child);
  },

  clearContainer(container) {
    return false;
  },

  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainer,
    hostContext
  ) {
    return {};
  },

  commitUpdate(
    instance,
    updatePayload,
    type,
    prevProps,
    nextProps,
    internalHandle
  ) {
    setElementProps(instance, nextProps);
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  getRootHostContext(rootContainer) {
    return NO_CONTEXT;
  },

  getChildHostContext(parentHostContext, type, rootContainer) {
    return NO_CONTEXT;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit(containerInfo) {
    return null;
  },

  resetAfterCommit(containerInfo) {
    calculateLayout(containerInfo);
  },

  preparePortalMount(containerInfo) {
    return null;
  },

  scheduleTimeout: setTimeout,

  cancelTimeout: clearTimeout,

  noTimeout: -1,

  getCurrentEventPriority() {
    return DefaultEventPriority;
  },

  getInstanceFromNode(node) {
    return node;
  },

  beforeActiveInstanceBlur() {},

  afterActiveInstanceBlur() {},

  prepareScopeUpdate() {},

  getInstanceFromScope() {
    return null;
  },

  detachDeletedInstance() {},

  supportsHydration: false,
});

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
import {
  setElementAttribute,
  setElementStyle,
  setElementTransform,
  calculateLayout,
} from "./ReactLumaLayout";

interface ReactLumaGenericProps {
  [key: string]: unknown;
}

interface ReactLumaHostContext {}

const NO_CONTEXT: ReactLumaHostContext = {};

let recalcLayout = false;

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

    for (const [key, value] of Object.entries(props)) {
      if (key === "children") {
        continue;
      } else if (key === "style") {
        setElementStyle(element, value);
      } else if (key === "transform") {
        setElementTransform(element, value);
      } else {
        setElementAttribute(element, key, value);
      }
    }

    return element;
  },

  createTextInstance(text, rootContainer, hostContext, internalHandle) {
    throw new Error("createTextInstance is unsupported.");
  },

  appendInitialChild(parentInstance, child) {
    recalcLayout = true;
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
    return diffProperties(oldProps, newProps);
  },

  commitUpdate(
    instance,
    updatePayload,
    type,
    prevProps,
    nextProps,
    internalHandle
  ) {
    for (const [key, value] of Object.entries(updatePayload)) {
      if (key === "children") {
        continue;
      } else if (key === "style") {
        recalcLayout = true;
        setElementStyle(instance, value);
      } else if (key === "transform") {
        setElementTransform(instance, value);
      } else {
        setElementAttribute(instance, key, value);
      }
    }
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
    if (recalcLayout) {
      console.log("calculate");
      recalcLayout = false;
      calculateLayout(containerInfo);
    }
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

function diffProperties(lastProps: any, nextProps: any) {
  let updatePayload = null;

  for (let propKey in lastProps) {
    if (
      nextProps.hasOwnProperty(propKey) ||
      !lastProps.hasOwnProperty(propKey) ||
      lastProps[propKey] == null
    ) {
      continue;
    }

    if (propKey === "children") {
      continue;
    }

    if (propKey === "style" || propKey === "transform") {
      if (!diffProperties(lastProps[propKey], nextProps[propKey])) {
        continue;
      }
    }

    if (!updatePayload) {
      updatePayload = {};
    }
    updatePayload[propKey] = null;
  }

  for (let propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;

    if (
      !nextProps.hasOwnProperty(propKey) ||
      nextProp === lastProp ||
      (nextProp == null && lastProp == null)
    ) {
      continue;
    }

    if (propKey === "children") {
      continue;
    }

    if (propKey === "style" || propKey === "transform") {
      if (!diffProperties(lastProps[propKey], nextProps[propKey])) {
        continue;
      }
    }

    if (!updatePayload) {
      updatePayload = {};
    }
    updatePayload[propKey] = nextProp;
  }

  return updatePayload;
}

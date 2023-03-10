import React from "react";
import createReconciler from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants";
import {
  createElement,
  ReactLumaElement,
  ReactLumaElementType,
} from "./ReactLumaElement";
import {
  setElementAttribute,
  setElementStyle,
  setElementTransform,
  calculateLayout,
} from "./ReactLumaLayout";
import type {
  ReactLumaElementStyle,
  ReactLumaElementTransform,
  ReactLumaOpaqueValue,
} from "./types";

interface ReactLumaGenericProps {
  [key: string]: unknown;
}

interface ReactLumaHostContext {}

const NO_CONTEXT: ReactLumaHostContext = {};

const STYLE = "style";
const CHILDREN = "children";
const TRANSFORM = "transform";

function setProps(element: ReactLumaElement, props: ReactLumaGenericProps) {
  for (const [key, value] of Object.entries(props)) {
    if (key === "children") {
      continue;
    } else if (key === "style") {
      if (value) {
        setElementStyle(element, value as ReactLumaElementStyle);
      }
    } else if (key === "transform") {
      if (value) {
        setElementTransform(element, value as ReactLumaElementTransform);
      }
    } else {
      setElementAttribute(element, key, value);
    }
  }
}

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

  createInstance(type, props, rootContainer) {
    if (props.hasOwnProperty(STYLE)) {
      rootContainer.rootRecalcLayout = true;
    }

    const element = createElement(type);
    setProps(element, props);
    return element;
  },

  createTextInstance() {
    throw new Error("createTextInstance is unsupported.");
  },

  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  finalizeInitialChildren() {
    return false;
  },

  appendChildToContainer(container, child) {
    container.appendChild(child);
  },

  insertInContainerBefore(container, child, beforeChild) {
    container.insertBefore(child, beforeChild);
  },

  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },

  clearContainer() {
    return false;
  },

  prepareUpdate(instance, type, oldProps, newProps, rootContainer) {
    const updatePayload = diffProperties(oldProps, newProps);

    if (updatePayload && updatePayload.hasOwnProperty(STYLE)) {
      rootContainer.rootRecalcLayout = true;
    }

    return updatePayload;
  },

  commitUpdate(instance, updatePayload) {
    setProps(instance, updatePayload);
  },

  shouldSetTextContent() {
    return false;
  },

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
    return null;
  },

  resetAfterCommit(containerInfo) {
    if (containerInfo.rootRecalcLayout) {
      containerInfo.rootRecalcLayout = false;
      calculateLayout(containerInfo);
    }
  },

  preparePortalMount() {
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

function diffProperties(
  lastProps: ReactLumaOpaqueValue,
  nextProps: ReactLumaOpaqueValue
) {
  let updatePayload: ReactLumaGenericProps | null = null;

  for (let propKey in lastProps) {
    if (
      nextProps.hasOwnProperty(propKey) ||
      !lastProps.hasOwnProperty(propKey) ||
      lastProps[propKey] == null
    ) {
      continue;
    }

    if (propKey === CHILDREN) {
      continue;
    }

    if (propKey === STYLE || propKey === TRANSFORM) {
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

    if (propKey === CHILDREN) {
      continue;
    }

    if (propKey === STYLE || propKey === TRANSFORM) {
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

ReactLumaReconciler.injectIntoDevTools({
  bundleType: 1,
  version: React.version,
  rendererPackageName: "react-luma",
});

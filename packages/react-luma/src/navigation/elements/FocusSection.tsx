import React, { createContext, useContext } from "react";
import { NavProviderContext } from "./NavProvider";
import type { ReactNode } from "react";

type FocusSectionRenderProps = (hasFocus: boolean) => ReactNode;

type FocusSectionProps = {
  id: string;
  children: ReactNode | FocusSectionRenderProps;
};

export const FocusSectionContext = createContext<string>("default");

export function FocusSection(props: FocusSectionProps) {
  const { manager, focusedElement } = useContext(NavProviderContext);

  let children = props.children;
  if (typeof children === "function") {
    // TODO: Using getSectionId might be unnecessary here, we could explicitly set
    // the section id in the provider instead and save us some iterations per render.
    const hasFocus = focusedElement
      ? manager.getSectionId(focusedElement) === props.id
      : false;
    children = children(hasFocus);
  }

  return (
    <FocusSectionContext.Provider value={props.id}>
      {children}
    </FocusSectionContext.Provider>
  );
}

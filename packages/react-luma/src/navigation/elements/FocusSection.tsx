import { createContext, useContext } from "react";
import { NavProviderContext } from "./NavProvider";
import type { ReactNode } from "react";

type FocusSectionRenderProps = (hasFocus: boolean) => ReactNode;

type FocusSectionProps = {
  id: string;
  children: ReactNode | FocusSectionRenderProps;
};

export const FocusSectionContext = createContext<string>("default");

export function FocusSection(props: FocusSectionProps) {
  const { focused } = useContext(NavProviderContext);

  let children = props.children;
  if (typeof children === "function") {
    const hasFocus = !!focused && focused.sectionId === props.id;
    children = children(hasFocus);
  }

  return (
    <FocusSectionContext.Provider value={props.id}>
      {children}
    </FocusSectionContext.Provider>
  );
}

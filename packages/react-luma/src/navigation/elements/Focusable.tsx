import React, { useContext, useRef, useLayoutEffect } from "react";
import { View } from "../../elements";
import { FocusSectionContext } from "./FocusSection";
import { NavProviderContext } from "./NavProvider";
import type { ReactNode } from "react";
import type { ReactLumaElement } from "../../ReactLumaElement";

type FocusableRenderProp = (hasFocus: boolean) => ReactNode;

type FocusableProps = {
  children: FocusableRenderProp;
};

export function Focusable(props: FocusableProps) {
  const ref = useRef<ReactLumaElement>(null);
  const sectionId = useContext(FocusSectionContext);
  const { manager, focusedElement } = useContext(NavProviderContext);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    manager.addElement(sectionId, element);
    return () => {
      manager.removeElement(element);
    };
  }, [sectionId, manager]);

  const hasFocus = focusedElement ? ref.current === focusedElement : false;

  return <View ref={ref}>{props.children(hasFocus)}</View>;
}

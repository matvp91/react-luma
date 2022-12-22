import { useContext, useRef, useEffect } from "react";
import { View } from "../../";
import { FocusSectionContext } from "./FocusSection";
import { NavProviderContext } from "./NavProvider";
import type { ReactNode } from "react";
import type { ReactLumaElement } from "../../ReactLumaElement";

type FocusableRenderProp = (hasFocus: boolean) => ReactNode;

type FocusableProps = {
  children: FocusableRenderProp;
  unstable_focusOnMount?: boolean;
};

export function Focusable(props: FocusableProps) {
  const ref = useRef<ReactLumaElement>(null);
  const sectionId = useContext(FocusSectionContext);
  const { _manager, _setFocused, focused } = useContext(NavProviderContext);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    _manager.addElement(sectionId, element);
    return () => {
      _manager.removeElement(element);
    };
  }, [sectionId, _manager]);

  useEffect(() => {
    if (props.unstable_focusOnMount) {
      const nextElement = ref.current!;
      _setFocused({
        element: nextElement,
        sectionId: _manager.getSectionId(nextElement),
      });
    }
  }, []);

  const hasFocus = !!focused && ref.current === focused.element;

  return <View ref={ref}>{props.children(hasFocus)}</View>;
}

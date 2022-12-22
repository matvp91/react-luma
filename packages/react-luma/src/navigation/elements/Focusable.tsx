import { useContext, useEffect, useRef, forwardRef } from "react";
import { View } from "../../";
import { FocusableSectionContext } from "./focusableSection";
import { NavigationContext } from "./NavigationProvider";
import type { ComponentType, ForwardedRef } from "react";
import type { ReactLumaElement } from "../../";

type FocusableProps = {
  isFocus: boolean;
  isSectionFocus: boolean;
  forwardedRef: ForwardedRef<ReactLumaElement>;
};

export default function focusable<P>(
  WrappedComponent: ComponentType<P & FocusableProps>
) {
  const FocusableComponent = forwardRef<ReactLumaElement, P>(
    (props, forwardedRef) => {
      const ref = useRef<ReactLumaElement>();
      const navigation = useContext(NavigationContext);
      const sectionId = useContext(FocusableSectionContext);

      useEffect(() => {
        const element = ref.current;
        if (!element) {
          return;
        }
        navigation.manager.addElement(sectionId, element);
        return () => {
          navigation.manager.removeElement(element);
        };
      }, [sectionId]);

      const isFocus = navigation.focusedElement === ref.current;

      const isSectionFocus =
        // We have a focused element
        !!navigation.focusedElement &&
        // And the section this element belongs to is the same as the one we initialized
        // the focusable element with.
        navigation.manager.getSectionId(navigation.focusedElement) ===
          sectionId;

      return (
        <View ref={ref}>
          <WrappedComponent
            {...props}
            isFocus={isFocus}
            isSectionFocus={isSectionFocus}
            forwardedRef={forwardedRef}
          />
        </View>
      );
    }
  );
  return FocusableComponent;
}

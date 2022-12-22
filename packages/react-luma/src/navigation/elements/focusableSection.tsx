import { createContext, useContext, forwardRef } from "react";
import { NavigationContext } from "./NavigationProvider";
import type { ReactNode, ComponentType, ForwardedRef } from "react";
import type { ReactLumaElement } from "../../";

type FocusableSectionComponentProps = {
  children?: ReactNode;
  sectionId: string;
};

export const FocusableSectionContext = createContext<string>("default");

export default function focusableSection<P, R = unknown>(
  WrappedComponent: ComponentType<
    P & {
      isFocus: boolean;
      children?: ReactNode;
      forwardedRef: ForwardedRef<R>;
    }
  >
) {
  const Section = forwardRef<R, P & FocusableSectionComponentProps>(
    (props, forwardRef) => {
      const navigation = useContext(NavigationContext);

      const isFocus =
        // If we have an element focused
        !!navigation.focusedElement &&
        // And the focused element belongs to this section
        navigation.manager.getSectionId(navigation.focusedElement) ===
          props.sectionId;

      return (
        <FocusableSectionContext.Provider value={props.sectionId}>
          <WrappedComponent
            {...props}
            isFocus={isFocus}
            forwardedRef={forwardRef}
          />
        </FocusableSectionContext.Provider>
      );
    }
  );

  return Section;
}

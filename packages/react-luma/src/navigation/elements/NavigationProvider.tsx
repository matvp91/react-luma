import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createManager } from "../ReactLumaNavigation";
import { useRefValue } from "../../hooks";
import type { ReactNode } from "react";
import type { Manager, Direction } from "../ReactLumaNavigation";
import type { ReactLumaElement } from "../../";

type NavigationContext = {
  manager: Manager;
  focusedElement: ReactLumaElement | null;
};

export const NavigationContext = createContext<NavigationContext>(
  {} as NavigationContext
);

type NavigationProviderProps = {
  children: ReactNode;
};

export default function NavigationProvider(props: NavigationProviderProps) {
  const manager = useRefValue(createManager);
  const [focusedElement, setFocusedElement] = useState<ReactLumaElement | null>(
    null
  );

  // TODO: Debug, remove this
  (window as any).initFocus = () => {
    const element = manager.getNextInSection("mainMenu");
    setFocusedElement(element);
  };

  useEffect(() => {
    if (!focusedElement) {
      return;
    }

    const keyDown = (event: KeyboardEvent) => {
      const direction = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      }[event.key] as Direction;

      if (!direction) {
        return null;
      }

      const nextElement = manager.getNext(direction, focusedElement);
      if (nextElement) {
        setFocusedElement(nextElement);
      }
    };

    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [focusedElement]);

  const value = useMemo(() => {
    return {
      manager,
      focusedElement,
    };
  }, [focusedElement]);

  return (
    <NavigationContext.Provider value={value}>
      {props.children}
    </NavigationContext.Provider>
  );
}

export function useFocusedElement(): [ReactLumaElement | null, string | null] {
  const navigation = useContext(NavigationContext);

  return [
    navigation.focusedElement,
    navigation.focusedElement
      ? navigation.manager.getSectionId(navigation.focusedElement)
      : null,
  ];
}

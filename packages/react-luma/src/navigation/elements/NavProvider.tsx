import { createContext, useState, useEffect } from "react";
import { createManager } from "../ReactLumaNavigation";
import { useRefValue } from "../../hooks";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { ReactLumaElement } from "../../ReactLumaElement";
import type { Direction } from "../ReactLumaNavigation";

type NavProviderProps = {
  children: ReactNode;
  defaultSectionId: string;
};

type NavProviderContext = {
  manager: ReturnType<typeof createManager>;
  setFocusedElement: Dispatch<SetStateAction<ReactLumaElement | null>>;
  focusedElement: ReactLumaElement | null;
};

export const NavProviderContext = createContext<NavProviderContext>(
  {} as NavProviderContext
);

export function NavProvider(props: NavProviderProps) {
  const [focusedElement, setFocusedElement] =
    useState<NavProviderContext["focusedElement"]>(null);
  const manager = useRefValue<NavProviderContext["manager"]>(createManager);

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      if (!focusedElement) {
        return null;
      }

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
  }, [manager, focusedElement]);

  useEffect(() => {
    const nextElement = manager.getNextInSection(props.defaultSectionId);
    if (nextElement) {
      setFocusedElement(nextElement);
    }
  }, [manager, props.defaultSectionId]);

  return (
    <NavProviderContext.Provider
      value={{
        manager,
        setFocusedElement,
        focusedElement,
      }}
    >
      {props.children}
    </NavProviderContext.Provider>
  );
}

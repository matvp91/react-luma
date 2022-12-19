import React, { createContext, useState, useEffect } from "react";
import { createManager } from "../manager";
import { useRefValue } from "../../utils/hooks";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { Element } from "../../element";
import type { Direction } from "../manager";

type NavProviderProps = {
  children: ReactNode;
  defaultSectionId: string;
};

type NavProviderContext = {
  manager: ReturnType<typeof createManager>;
  setFocusedElement: Dispatch<SetStateAction<Element | null>>;
  focusedElement: Element | null;
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
    const nextElement = manager.getNextInSession(props.defaultSectionId);
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

import { createContext, useState, useEffect, useContext } from "react";
import { createManager } from "../ReactLumaNavigation";
import { useRefValue } from "../../hooks";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { ReactLumaElement } from "../../ReactLumaElement";
import type { Direction } from "../ReactLumaNavigation";

type NavProviderProps = {
  children: ReactNode;
};

type NavProviderContext = {
  focused: NavFocused | null;
  _setFocused: Dispatch<SetStateAction<NavFocused | null>>;
  _manager: ReturnType<typeof createManager>;
};

type NavFocused = {
  element: ReactLumaElement;
  sectionId: string;
};

export const NavProviderContext = createContext<NavProviderContext>(
  {} as NavProviderContext
);

export function NavProvider(props: NavProviderProps) {
  const [focused, setFocused] = useState<NavFocused | null>(null);
  const manager = useRefValue(createManager);

  useEffect(() => {
    if (!focused) {
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

      const nextElement = manager.getNext(direction, focused.element);
      if (nextElement) {
        setFocused({
          element: nextElement,
          sectionId: manager.getSectionId(nextElement),
        });
      }
    };

    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [manager, focused]);

  return (
    <NavProviderContext.Provider
      value={{
        focused,
        _setFocused: setFocused,
        _manager: manager,
      }}
    >
      {props.children}
    </NavProviderContext.Provider>
  );
}

export function useNav() {
  return useContext(NavProviderContext);
}

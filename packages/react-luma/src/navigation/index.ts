export { NavProvider } from "./elements/NavProvider";
export { FocusSection } from "./elements/FocusSection";
export { Focusable } from "./elements/Focusable";

// TODO: Do not export this here.
import { NavProviderContext } from "./elements/NavProvider";
import { useContext } from "react";

export const useNavigation = () => useContext(NavProviderContext);

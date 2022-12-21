export { render } from "./ReactLumaRender";

export {
  ReactLumaView as View,
  ReactLumaText as Text,
  ReactLumaSprite as Sprite,
  ReactLumaImage as Image,
} from "./elements";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      View: {
        test: string;
      };
    }
  }
}

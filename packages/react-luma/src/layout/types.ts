import yoga from "@react-pdf/yoga";

export type FlexDirection = "row" | "column";

export type LayoutValue = number | string;

export interface ILayout {
  children?: Array<ILayout>;
  width?: LayoutValue;
  height?: LayoutValue;
  flexDirection?: yoga.YogaFlexDirection;
}

export interface IStyle {
  flex?: number;
  flexDirection?: FlexDirection;
}

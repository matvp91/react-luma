import yoga from "@react-pdf/yoga";

export type FlexDirection = "row" | "column";

export type LayoutPosition = {
  left: number | string;
  right: number | string;
  top: number | string;
  bottom: number | string;
};

export type LayoutValue = string | number;

export interface ILayout {
  children?: Array<ILayout>;
  width?: LayoutValue;
  height?: LayoutValue;
  flexDirection?: yoga.YogaFlexDirection;
  padding?: LayoutPosition;
  margin?: LayoutPosition;
}

export interface IStyle {
  flex?: number;
  flexDirection?: FlexDirection;
  padding?: LayoutValue;
  paddingLeft?: LayoutValue;
  paddingRight?: LayoutValue;
  paddingTop?: LayoutValue;
  paddingBottom?: LayoutValue;
  margin?: LayoutValue;
  marginLeft?: LayoutValue;
  marginRight?: LayoutValue;
  marginTop?: LayoutValue;
  marginBottom?: LayoutValue;
  width?: LayoutValue;
  height?: LayoutValue;
}

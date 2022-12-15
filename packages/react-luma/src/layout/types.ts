import yoga from "@react-pdf/yoga";

export type FlexDirection = "row" | "column";

export type LayoutPosition = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export interface ILayout {
  children?: Array<ILayout>;
  width?: number;
  height?: number;
  flexDirection?: yoga.YogaFlexDirection;
  padding?: LayoutPosition;
  margin?: LayoutPosition;
}

export interface IStyle {
  flex?: number;
  flexDirection?: FlexDirection;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  margin?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}

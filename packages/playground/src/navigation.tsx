import React from "react";
import { View, Sprite, Text } from "react-luma";
import { NavProvider, FocusSection, Focusable } from "react-luma/navigation";

function createSprite(size = 100) {
  return (
    <Focusable>
      {(hasFocus) => (
        <Sprite
          style={{
            width: size,
            height: size,
          }}
          color={hasFocus ? "#ff0000" : "#ffffff"}
        />
      )}
    </Focusable>
  );
}

type SwimlaneProps = {
  id: string;
  title: string;
};

function Swimlane(props: SwimlaneProps) {
  const items = [...Array(6)].map((index) => (
    <View
      key={index}
      style={{
        marginRight: 12,
      }}
    >
      {createSprite()}
    </View>
  ));
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 6 }} text={props.title} />
      <FocusSection id={props.id}>
        <View style={{ flex: 1, flexDirection: "row" }}>{items}</View>
      </FocusSection>
    </View>
  );
}

export default function App() {
  return (
    <NavProvider defaultSectionId="one">
      <View style={{ flex: 1, flexDirection: "row", padding: 12 }}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <FocusSection id="menu">
            {(hasFocus) => (
              <View>
                <View
                  style={{ flex: 1, flexDirection: "row", marginBottom: 12 }}
                >
                  {createSprite(30)}
                  {hasFocus && <Text text="One" />}
                </View>
                <View
                  style={{ flex: 1, flexDirection: "row", marginBottom: 12 }}
                >
                  {createSprite(30)}
                  {hasFocus && <Text text="Two" />}
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  {createSprite(30)}
                  {hasFocus && <Text text="Three" />}
                </View>
              </View>
            )}
          </FocusSection>
        </View>
        <View style={{ marginLeft: 12 }}>
          <Swimlane id="one" title="One" />
          <Swimlane id="two" title="Two" />
          <Swimlane id="three" title="Three" />
        </View>
      </View>
    </NavProvider>
  );
}

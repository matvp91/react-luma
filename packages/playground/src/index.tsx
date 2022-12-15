import React from "react";
import { render, View, Text } from "react-luma";

function App() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Text style={{ flex: 1 }} text="Hello" />
      <Text style={{ flex: 1 }} text="To You" />
    </View>
  );
}

const container = document.getElementById("root");
if (container instanceof HTMLCanvasElement) {
  render(<App />, container);
}

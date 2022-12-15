import React from "react";
import { render, View, Text, Sprite } from "react-luma";

function App() {
  const [visible, setVisible] = React.useState(true);

  (window as any).setVisible = setVisible;

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {visible && <Text style={{ flex: 1, marginLeft: 100 }} text="Hello" />}
      <Text style={{ flex: 1, margin: 200 }} text="To You" />
      <Sprite
        style={{
          width: 100,
          height: 100,
        }}
        color="#ff0000"
      />
    </View>
  );
}

const container = document.getElementById("root");
if (container instanceof HTMLCanvasElement) {
  render(<App />, container);
}

import React from "react";
import { render, View, Text } from "react-luma";

function App() {
  const [visible, setVisible] = React.useState(true);

  (window as any).setVisible = setVisible;

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {visible && <Text style={{ flex: 1, marginLeft: 100 }} text="Hello" />}
      <Text style={{ flex: 1, margin: 200 }} text="To You" />
    </View>
  );
}

const container = document.getElementById("root");
if (container instanceof HTMLCanvasElement) {
  render(<App />, container);
}

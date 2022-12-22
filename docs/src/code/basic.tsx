// @ts-nocheck
import { render, View, Text, Sprite, TEXTURE_WHITE } from "react-luma";

function App() {
  return (
    <View style={{ padding: 12 }}>
      <Text text="Hello world!" />
      <Sprite
        style={{ width: 100, height: 100, marginTop: 12 }}
        texture={TEXTURE_WHITE}
        tint="#3f37c9"
      />
    </View>
  );
}

render(<App />, canvasElement, { width: 420 });

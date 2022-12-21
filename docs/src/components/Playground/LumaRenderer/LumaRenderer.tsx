import React, { useRef, useEffect } from "react";
import {
  render,
  View,
  Sprite,
  Text,
  unmountComponentAtNode,
  TEXTURE_WHITE,
} from "react-luma";
import styles from "./LumaRenderer.module.css";

function App() {
  return (
    <View style={{ padding: 12 }}>
      <Text style={{ marginBottom: 12 }} text="Hello from WebGL" />
      <Sprite
        style={{ width: 50, height: 50 }}
        texture={TEXTURE_WHITE}
        tint="#ff0000"
      />
    </View>
  );
}

export default function LumaRenderer() {
  const ref = useRef<HTMLCanvasElement>();

  useEffect(() => {
    render(<App />, ref.current, {
      width: 1080,
    });
    return () => {
      unmountComponentAtNode(ref.current);
    };
  }, []);

  return <canvas className={styles.root} ref={ref} />;
}

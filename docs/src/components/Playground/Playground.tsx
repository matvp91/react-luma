import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import styles from "./Playground.module.css";

export default function Playground() {
  return (
    <BrowserOnly>
      {() => {
        const LumaRenderer = require("./LumaRenderer").default;
        return (
          <div className={styles.root}>
            <LumaRenderer />
          </div>
        );
      }}
    </BrowserOnly>
  );
}

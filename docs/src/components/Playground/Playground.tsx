import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

type PlaygroundProps = {
  code: string;
};

export default function Playground(props: PlaygroundProps) {
  return (
    <BrowserOnly>
      {() => {
        const PlaygroundClient = require("./PlaygroundClient").default;
        return <PlaygroundClient code={props.code} />;
      }}
    </BrowserOnly>
  );
}

import * as ReactLuma from "react-luma";
import React from "react";
import { transform } from "sucrase";
import prettier from "prettier/standalone";
import parserTypescript from "prettier/parser-typescript";

export function execCode(code: string, canvasElement: HTMLCanvasElement) {
  const requireMock = (name: string) => {
    if (name === "react-luma") {
      return ReactLuma;
    }
    throw new Error(`import "${name}" not available.`);
  };
  return new Function("require", "canvasElement", "React", code)(
    requireMock,
    canvasElement,
    React
  );
}

export function compileCode(code: string) {
  return transform(code, {
    transforms: ["jsx", "imports"],
  }).code;
}

export function formatCode(code: string) {
  if (code.startsWith("// @ts-nocheck")) {
    code = code.substring(code.indexOf("\n") + 1);
  }
  return prettier
    .format(code, {
      parser: "typescript",
      plugins: [parserTypescript],
    })
    .replace(/[\r\n]+$/, "");
}

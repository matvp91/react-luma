import React, { useState, useCallback, useEffect, useRef } from "react";
import cx from "classnames";
import * as ReactLuma from "react-luma";
import { transform } from "sucrase";
import prettier from "prettier/standalone";
import parserTypescript from "prettier/parser-typescript";
import Code from "./Code";
import type { CodeOnChangeHandler } from "./Code";
import styles from "./LumaCodeEditor.module.css";

function evalCode(code: string, canvasElement: HTMLCanvasElement) {
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

function compileCode(code: string) {
  return transform(code, {
    transforms: ["jsx", "imports"],
  }).code;
}

function formatCode(code: string) {
  return prettier
    .format(code, {
      parser: "typescript",
      plugins: [parserTypescript],
    })
    .replace(/[\r\n]+$/, "");
}

type LumaCodeEditorProps = {
  code: string;
};

export default function LumaCodeEditor(props: LumaCodeEditorProps) {
  const canvasRef = useRef();

  const [code, setCode] = useState<string>(formatCode(props.code));
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback<CodeOnChangeHandler>(
    (newCode) => {
      setCode(newCode.slice(0, -1));
    },
    [setCode]
  );

  useEffect(() => {
    setError(null);
    try {
      const compiledCode = compileCode(code);
      evalCode(compiledCode, canvasRef.current);
    } catch (error) {
      setError(error.toString());
    }
  }, [code]);

  return (
    <div className={cx("code-editor", styles.root)}>
      <div className={styles.editorContainer}>
        <div className={styles.editorTitle}>Live editor</div>
        <Code code={code} onChange={onChange} />
      </div>
      <div
        className={cx(styles.canvasContainer, {
          [styles.error]: !!error,
        })}
      >
        <div className={styles.canvasTitle}>
          {!!error ? "Compilation error" : "Result"}
        </div>
        <div className={styles.canvasContent}>
          <canvas ref={canvasRef} />
          {!!error && <div className={styles.errorMessage}>{error}</div>}
        </div>
      </div>
    </div>
  );
}

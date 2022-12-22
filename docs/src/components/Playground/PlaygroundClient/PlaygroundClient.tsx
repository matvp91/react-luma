import React, { useState, useCallback, useEffect, useRef } from "react";
import cx from "classnames";
import CodeEditor, { CodeEditorOnChangeHandler } from "../CodeEditor";
import { formatCode, compileCode, execCode } from "../helpers";
import styles from "./PlaygroundClient.module.css";

type PlaygroundClientProps = {
  code: string;
};

export default function PlaygroundClient(props: PlaygroundClientProps) {
  const canvasRef = useRef();

  const [code, setCode] = useState<string>(formatCode(props.code));
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback<CodeEditorOnChangeHandler>(
    (newCode) => {
      setCode(newCode.slice(0, -1));
    },
    [setCode]
  );

  useEffect(() => {
    setError(null);
    try {
      const compiledCode = compileCode(code);
      execCode(compiledCode, canvasRef.current);
    } catch (error) {
      setError(error.toString());
    }
  }, [code]);

  return (
    <div className="card">
      <div className="card__body padding--none">
        <div className="row row--no-gutters">
          <div className="col">
            <div className={styles.titleEditor}>Live editor</div>
            <div className={styles.containerEditor}>
              <CodeEditor code={code} onChange={onChange} />
            </div>
          </div>
          <div className={cx("col", styles.colPreview)}>
            <div className={cx(styles.titlePreview, !!error && styles.error)}>
              {!!error ? "Compilation error" : "Result"}
            </div>
            <div className={styles.containerPreview}>
              <canvas ref={canvasRef} />
              {!!error && <div className={styles.previewError}>{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useRef } from "react";
import { useEditable } from "use-editable";
import Highlight, { Prism } from "prism-react-renderer";
import "./Code.css";

export type CodeOnChangeHandler = (code: string) => void;

type CodeProps = {
  code: string;
  onChange: CodeOnChangeHandler;
};

export default function Code(props: CodeProps) {
  const ref = useRef();

  useEditable(ref, props.onChange, {
    indentation: 2,
  });

  return (
    <Highlight Prism={Prism} code={props.code} language="jsx">
      {({ className, tokens, getTokenProps, style }) => (
        <pre className={className} style={style} ref={ref} spellCheck={false}>
          {tokens.map((line, i) => (
            <React.Fragment key={i}>
              {line
                .filter((token) => !token.empty)
                .map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              {"\n"}
            </React.Fragment>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

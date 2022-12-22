import React, { useRef } from "react";
import { useEditable } from "use-editable";
import Highlight, { Prism } from "prism-react-renderer";
import prismaTheme from "prism-react-renderer/themes/dracula";

export type CodeEditorOnChangeHandler = (code: string) => void;

type CodeEditorProps = {
  code: string;
  onChange: CodeEditorOnChangeHandler;
};

export default function CodeEditor(props: CodeEditorProps) {
  const ref = useRef<HTMLPreElement>();

  useEditable(ref, props.onChange, {
    indentation: 2,
  });

  return (
    <Highlight
      Prism={Prism}
      code={props.code}
      language="jsx"
      theme={{
        ...prismaTheme,
        plain: {
          ...prismaTheme.plain,
          margin: 0,
          backgroundColor: "transparent",
          borderRadius: 0,
          padding: "1rem",
        },
      }}
    >
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

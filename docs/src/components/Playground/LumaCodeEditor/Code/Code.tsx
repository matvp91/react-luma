import React, { useRef } from "react";
import { useEditable } from "use-editable";
import Highlight, { Prism } from "prism-react-renderer";
import prismaTheme from "prism-react-renderer/themes/dracula";

export type CodeOnChangeHandler = (code: string) => void;

type CodeProps = {
  code: string;
  onChange: CodeOnChangeHandler;
};

export default function Code(props: CodeProps) {
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
          backgroundColor: "#282d34",
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

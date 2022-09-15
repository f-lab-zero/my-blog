import { Editor, EditorProps } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import React, { forwardRef } from "react";

interface EditorWithForwardProps extends EditorProps {
  theme: string;
  height: string;
  onChange: (x: string) => void;
  editorRef: React.MutableRefObject<null>;
}

const EditorUi = forwardRef(
  ({ height, theme, editorRef, onChange }: EditorWithForwardProps) => (
    <Editor
      height={height}
      theme={theme}
      plugins={[colorSyntax]}
      ref={editorRef}
      onChange={onChange}
    />
  ),
);

export default EditorUi;

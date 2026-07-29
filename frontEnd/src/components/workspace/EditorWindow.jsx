import React from 'react';
import Editor from '@monaco-editor/react';

export default function EditorWindow({
  language,
  value,
  onChange,
  theme = 'vs-dark'
}) {
  const handleEditorChange = (val) => {
    if (onChange) {
      onChange(val || '');
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Editor
        height="100%"
        language={language}
        value={value}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          fontFamily: "'Fira Code', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 12, bottom: 12 },
          lineNumbersMinChars: 3,
          cursorBlinking: 'smooth',
          smoothScrolling: true,
        }}
      />
    </div>
  );
}

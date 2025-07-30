// src/components/study/CodeBlock.tsx
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  code: string;
}

export default function CodeBlock({ code }: Props) {
  return (
    <SyntaxHighlighter
      language="python"
      style={vscDarkPlus}
      className="rounded-lg !bg-gray-900 !text-gray-100"
    >
      {code}
    </SyntaxHighlighter>
  );
}
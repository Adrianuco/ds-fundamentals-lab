import React, { useMemo } from "react";
import { marked } from "marked";

interface MarkdownViewProps {
  content: string;
  className?: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content, className = "" }) => {
  const html = useMemo(() => {
    if (!content) return "";
    try {
      return marked.parse(content, {
        gfm: true,
        breaks: true
      }) as string;
    } catch {
      return content;
    }
  }, [content]);

  return (
    <div
      className={`markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

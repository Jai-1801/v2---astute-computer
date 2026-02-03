import type { JSONContent } from '@tiptap/react';
import React, { useMemo } from 'react';
import { processTipTapMarkdown } from '@/lib/tiptap-markdown-processor';

interface ContentRendererProps {
  content: JSONContent;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  // Process the content to convert any markdown syntax to proper TipTap structure
  const processedContent = useMemo(() => {
    if (!content) return null;
    return processTipTapMarkdown(content);
  }, [content]);

  if (!processedContent || !processedContent.content) {
    return null;
  }

  const getTextAlign = (node: JSONContent): React.CSSProperties => {
    const align = node.attrs?.textAlign;
    if (align && align !== 'left') {
      return { textAlign: align };
    }
    return {};
  };

  const renderContent = (nodeContent: JSONContent[] | undefined): React.ReactNode => {
    if (!nodeContent) return null;

    return nodeContent.map((node, index) => {
      if (node.type === 'text') {
        let text: React.ReactNode = node.text;

        if (node.marks) {
          node.marks.forEach((mark) => {
            switch (mark.type) {
              case 'bold':
                text = <strong key={`bold-${index}`}>{text}</strong>;
                break;
              case 'italic':
                text = <em key={`italic-${index}`}>{text}</em>;
                break;
              case 'underline':
                text = <u key={`underline-${index}`}>{text}</u>;
                break;
              case 'strike':
                text = <s key={`strike-${index}`}>{text}</s>;
                break;
              case 'code':
                text = <code key={`code-${index}`}>{text}</code>;
                break;
              case 'link':
                text = (
                  <a
                    key={`link-${index}`}
                    href={mark.attrs?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    {text}
                  </a>
                );
                break;
            }
          });
        }

        return <span key={`text-${index}`}>{text}</span>;
      }

      return renderNode(node, index);
    });
  };

  const renderNode = (node: JSONContent, index: number): React.ReactNode => {
    const key = `${node.type}-${index}`;

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={key} style={getTextAlign(node)}>
            {renderContent(node.content)}
          </p>
        );

      case 'heading': {
        const level = node.attrs?.level || 2;
        const headingStyle = getTextAlign(node);
        const headingContent = renderContent(node.content);
        
        if (level === 2) {
          return <h2 key={key} style={headingStyle}>{headingContent}</h2>;
        }
        if (level === 3) {
          return <h3 key={key} style={headingStyle}>{headingContent}</h3>;
        }
        return <h4 key={key} style={headingStyle}>{headingContent}</h4>;
      }

      case 'bulletList':
        return (
          <ul key={key}>
            {node.content?.map((item, i) => renderNode(item, i))}
          </ul>
        );

      case 'orderedList':
        return (
          <ol key={key}>
            {node.content?.map((item, i) => renderNode(item, i))}
          </ol>
        );

      case 'listItem':
        return (
          <li key={key}>
            {node.content?.map((item, i) => renderNode(item, i))}
          </li>
        );

      case 'blockquote':
        return (
          <blockquote key={key}>
            {node.content?.map((item, i) => renderNode(item, i))}
          </blockquote>
        );

      case 'codeBlock':
        return (
          <pre key={key}>
            <code>{renderContent(node.content)}</code>
          </pre>
        );

      case 'horizontalRule':
        return <hr key={key} />;

      case 'image':
        return (
          <figure key={key} className="my-8">
            <img
              src={node.attrs?.src}
              alt={node.attrs?.alt || ''}
              className="rounded-lg w-full"
            />
            {node.attrs?.title && (
              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                {node.attrs.title}
              </figcaption>
            )}
          </figure>
        );

      default:
        return null;
    }
  };

  return (
    <div className="content-renderer">
      {processedContent.content.map((node, index) => renderNode(node, index))}
    </div>
  );
}

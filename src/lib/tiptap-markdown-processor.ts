import type { JSONContent } from '@tiptap/react';

/**
 * Parse inline markdown marks from text content
 */
function parseInlineMarks(text: string): JSONContent[] {
  if (!text) return [];
  
  const nodes: JSONContent[] = [];
  
  // Regex patterns for inline marks - order matters (longer patterns first)
  const patterns = [
    { regex: /\*\*\*(.+?)\*\*\*/g, marks: ['bold', 'italic'] },
    { regex: /\*\*(.+?)\*\*/g, marks: ['bold'] },
    { regex: /\*(.+?)\*/g, marks: ['italic'] },
    { regex: /~~(.+?)~~/g, marks: ['strike'] },
    { regex: /`(.+?)`/g, marks: ['code'] },
    { regex: /\[(.+?)\]\((.+?)\)/g, marks: ['link'], isLink: true },
  ];
  
  interface Match {
    start: number;
    end: number;
    content: string;
    marks: { type: string; attrs?: Record<string, string> }[];
  }
  
  const matches: Match[] = [];
  
  for (const pattern of patterns) {
    pattern.regex.lastIndex = 0;
    let match;
    while ((match = pattern.regex.exec(text)) !== null) {
      const start = match.index;
      const end = match.index + match[0].length;
      const isOverlapping = matches.some(m => 
        (start >= m.start && start < m.end) || (end > m.start && end <= m.end)
      );
      
      if (!isOverlapping) {
        const markObjects = pattern.marks.map(m => ({ type: m }));
        
        if ((pattern as { isLink?: boolean }).isLink) {
          matches.push({
            start,
            end,
            content: match[1],
            marks: [{ type: 'link', attrs: { href: match[2] } }]
          });
        } else {
          matches.push({
            start,
            end,
            content: match[1],
            marks: markObjects
          });
        }
      }
    }
  }
  
  matches.sort((a, b) => a.start - b.start);
  
  let currentPos = 0;
  for (const match of matches) {
    if (match.start > currentPos) {
      const plainText = text.slice(currentPos, match.start);
      if (plainText) {
        nodes.push({ type: 'text', text: plainText });
      }
    }
    
    nodes.push({
      type: 'text',
      text: match.content,
      marks: match.marks
    });
    
    currentPos = match.end;
  }
  
  if (currentPos < text.length) {
    const plainText = text.slice(currentPos);
    if (plainText) {
      nodes.push({ type: 'text', text: plainText });
    }
  }
  
  if (nodes.length === 0 && text) {
    nodes.push({ type: 'text', text });
  }
  
  return nodes;
}

/**
 * Check if text contains markdown that should be converted to block elements
 */
function textContainsBlockMarkdown(text: string): boolean {
  const lines = text.split('\n');
  return lines.some(line => {
    const trimmed = line.trim();
    return (
      trimmed.match(/^#{1,6}\s/) ||       // Headings
      trimmed.match(/^[-*]\s+/) ||         // Bullet lists  
      trimmed.match(/^\d+\.\s+/) ||        // Ordered lists
      trimmed.startsWith('> ')             // Blockquotes
    );
  });
}

/**
 * Convert a text string with markdown into proper TipTap nodes
 */
function markdownTextToNodes(text: string): JSONContent[] {
  const lines = text.split('\n');
  const nodes: JSONContent[] = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed === '') {
      i++;
      continue;
    }
    
    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      nodes.push({
        type: 'heading',
        attrs: { level: headingMatch[1].length },
        content: parseInlineMarks(headingMatch[2])
      });
      i++;
      continue;
    }
    
    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      nodes.push({
        type: 'blockquote',
        content: [{
          type: 'paragraph',
          content: parseInlineMarks(quoteLines.join(' '))
        }]
      });
      continue;
    }
    
    // Bullet list
    if (trimmed.match(/^[-*]\s+/)) {
      const listItems: JSONContent[] = [];
      while (i < lines.length && lines[i].trim().match(/^[-*]\s+/)) {
        const itemText = lines[i].trim().replace(/^[-*]\s+/, '');
        listItems.push({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: parseInlineMarks(itemText)
          }]
        });
        i++;
      }
      nodes.push({
        type: 'bulletList',
        content: listItems
      });
      continue;
    }
    
    // Ordered list
    if (trimmed.match(/^\d+\.\s+/)) {
      const listItems: JSONContent[] = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s+/)) {
        const itemText = lines[i].trim().replace(/^\d+\.\s+/, '');
        listItems.push({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: parseInlineMarks(itemText)
          }]
        });
        i++;
      }
      nodes.push({
        type: 'orderedList',
        content: listItems
      });
      continue;
    }
    
    // Regular paragraph
    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const currentLine = lines[i].trim();
      if (currentLine === '' || 
          currentLine.match(/^#{1,6}\s/) ||
          currentLine.match(/^[-*]\s+/) ||
          currentLine.match(/^\d+\.\s+/) ||
          currentLine.startsWith('> ')) {
        break;
      }
      paragraphLines.push(currentLine);
      i++;
    }
    
    if (paragraphLines.length > 0) {
      nodes.push({
        type: 'paragraph',
        content: parseInlineMarks(paragraphLines.join(' '))
      });
    }
  }
  
  return nodes;
}

/**
 * Process TipTap content and convert any markdown syntax within text nodes
 * into proper TipTap structure (marks and nodes)
 */
export function processTipTapMarkdown(content: JSONContent): JSONContent {
  if (!content) return content;
  
  // If it's a doc, process its content
  if (content.type === 'doc' && content.content) {
    const processedContent: JSONContent[] = [];
    
    for (const node of content.content) {
      const processed = processNode(node);
      if (Array.isArray(processed)) {
        processedContent.push(...processed);
      } else {
        processedContent.push(processed);
      }
    }
    
    return {
      ...content,
      content: processedContent
    };
  }
  
  return content;
}

/**
 * Process a single node, potentially expanding it into multiple nodes
 */
function processNode(node: JSONContent): JSONContent | JSONContent[] {
  if (!node) return node;
  
  // For paragraphs, check if the text content contains block-level markdown
  if (node.type === 'paragraph' && node.content) {
    const fullText = extractTextFromContent(node.content);
    
    // Check if this paragraph contains block-level markdown (headings, lists)
    if (textContainsBlockMarkdown(fullText)) {
      // Convert the text to proper nodes
      return markdownTextToNodes(fullText);
    }
    
    // Otherwise just process inline marks
    return {
      ...node,
      content: processInlineContent(node.content)
    };
  }
  
  // For other node types with content, recurse
  if (node.content && Array.isArray(node.content)) {
    const processedContent: JSONContent[] = [];
    
    for (const child of node.content) {
      const processed = processNode(child);
      if (Array.isArray(processed)) {
        processedContent.push(...processed);
      } else {
        processedContent.push(processed);
      }
    }
    
    return {
      ...node,
      content: processedContent
    };
  }
  
  return node;
}

/**
 * Extract plain text from content array
 */
function extractTextFromContent(content: JSONContent[]): string {
  return content.map(node => {
    if (node.type === 'text') {
      return node.text || '';
    }
    if (node.content) {
      return extractTextFromContent(node.content);
    }
    return '';
  }).join('');
}

/**
 * Process inline content to parse markdown marks
 */
function processInlineContent(content: JSONContent[]): JSONContent[] {
  const result: JSONContent[] = [];
  
  for (const node of content) {
    if (node.type === 'text' && node.text) {
      // Check if text contains markdown marks
      const hasMarkdown = /\*\*.*?\*\*|\*.*?\*|~~.*?~~|`.*?`|\[.*?\]\(.*?\)/.test(node.text);
      
      if (hasMarkdown && !node.marks?.length) {
        // Parse inline marks
        const parsed = parseInlineMarks(node.text);
        result.push(...parsed);
      } else {
        result.push(node);
      }
    } else {
      result.push(node);
    }
  }
  
  return result;
}

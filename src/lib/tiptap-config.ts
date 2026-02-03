import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

export const createEditorExtensions = (placeholder?: string) => [
  StarterKit.configure({
    heading: {
      levels: [2, 3, 4],
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'max-w-full rounded-lg',
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-primary underline',
    },
  }),
  Placeholder.configure({
    placeholder: placeholder || 'Start writing your case study content...',
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Underline,
];

export const editorStyles = `
  .ProseMirror {
    min-height: 300px;
    outline: none;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    color: hsl(var(--muted-foreground));
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  .ProseMirror h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .ProseMirror h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .ProseMirror h4 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .ProseMirror p {
    margin-bottom: 0.75rem;
  }

  .ProseMirror ul,
  .ProseMirror ol {
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .ProseMirror ul {
    list-style-type: disc;
  }

  .ProseMirror ol {
    list-style-type: decimal;
  }

  .ProseMirror blockquote {
    border-left: 3px solid hsl(var(--border));
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: hsl(var(--muted-foreground));
  }

  .ProseMirror pre {
    background: hsl(var(--muted));
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
    font-family: monospace;
  }

  .ProseMirror code {
    background: hsl(var(--muted));
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: monospace;
  }

  .ProseMirror img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }

  .ProseMirror hr {
    border: none;
    border-top: 1px solid hsl(var(--border));
    margin: 1.5rem 0;
  }

  .ProseMirror a {
    color: hsl(var(--primary));
    text-decoration: underline;
    cursor: pointer;
  }
`;

import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Typography from '@tiptap/extension-typography'
import { FontFamily } from '@tiptap/extension-font-family'
import { TextStyle } from '@tiptap/extension-text-style'
import { JSONContent } from '@tiptap/react'

import { Extension } from '@tiptap/core';

export const Color = Extension.create({
  name: 'color',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: element => element.style.color.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.color) return {};
              return { style: `color: ${attributes.color}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setColor: (color: string) => ({ chain }: { chain: () => unknown }) => {
        return (chain() as unknown as { setMark: (n: string, a: unknown) => { run: () => boolean } }).setMark('textStyle', { color }).run();
      },
      unsetColor: () => ({ chain }: { chain: () => unknown }) => {
        return (chain() as unknown as { setMark: (n: string, a: unknown) => { removeEmptyTextStyle: () => { run: () => boolean } } }).setMark('textStyle', { color: null }).removeEmptyTextStyle().run();
      },
    };
  },
});

export const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }: { chain: () => unknown }) => {
        return (chain() as unknown as { setMark: (n: string, a: unknown) => { run: () => boolean } }).setMark('textStyle', { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }: { chain: () => unknown }) => {
        return (chain() as unknown as { setMark: (n: string, a: unknown) => { removeEmptyTextStyle: () => { run: () => boolean } } }).setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      },
    };
  },
});

export const TIPTAP_EXTENSIONS = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
  }),
  Image,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      rel: 'noopener noreferrer',
      target: '_blank',
      class: 'text-[#C2A46D] underline decoration-1 underline-offset-4 font-bold'
    }
  }),
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Typography,
  TextStyle,
  FontFamily,
  FontSize,
  Color,
];

/**
 * Centralized content renderer ensuring consistency between Draft Studio and Website.
 */
export function renderContent(json: JSONContent | string | null | Record<string, unknown>): string {
  if (!json) return '';
  
  let content: JSONContent;
  if (typeof json === 'string') {
    try {
      content = JSON.parse(json) as JSONContent;
    } catch (error) {
      return `<p>${json}</p>`; // Wrap raw strings in paragraphs for consistent layout
    }
  } else {
    content = json as JSONContent;
  }
  
  // High-Fidelity Guard: generateHTML throws if node type is missing or invalid.
  // An empty object {} or an object without 'type' is not a valid Tiptap node.
  if (typeof content === 'object' && content !== null && !content.type) {
    return '';
  }
  
  try {
    // Explicitly pass all extensions to generateHTML for parity
    return generateHTML(content, TIPTAP_EXTENSIONS) || '';
  } catch (e) {
    console.error("Content Rendering Failure:", e);
    // Fallback for fragmented content or unknown nodes
    return '';
  }
}

/**
 * Utility to extract clean plain text for SEO and thumbnails.
 */
export function renderPlainText(json: JSONContent | string | null): string {
  if (!json) return '';
  
  let content: JSONContent;
  if (typeof json === 'string') {
    try {
      content = JSON.parse(json) as JSONContent;
    } catch (error) {
      return json || '';
    }
  } else {
    content = json as JSONContent;
  }

  const extractText = (node: JSONContent): string => {
    if (node.type === 'text') return node.text || '';
    if (node.content) {
      return node.content.map(extractText).join(' ');
    }
    return '';
  };

  try {
    return extractText(content).trim();
  } catch (e) {
    return '';
  }
}

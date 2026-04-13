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

/**
 * Standardized Tiptap extensions for both editor and rendering.
 * Using verified named and default imports to satisfy strict module resolution.
 */
export const TIPTAP_EXTENSIONS = [
  StarterKit,
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
];

/**
 * Centralized content renderer ensuring consistency between Draft Studio and Website.
 */
export function renderContent(json: JSONContent | string | null): string {
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
  
  try {
    return generateHTML(content, TIPTAP_EXTENSIONS) || '';
  } catch (e) {
    return typeof json === 'string' ? json : '';
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

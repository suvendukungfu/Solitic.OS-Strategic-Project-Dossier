import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Typography from '@tiptap/extension-typography'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderContent(json: any) {
  if (!json) return '';
  
  // Ensure we are working with a valid TipTap JSON object
  const content = typeof json === 'string' ? JSON.parse(json) : json;
  
  return generateHTML(content, [
    StarterKit,
    Image,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
        class: 'text-gold underline decoration-1 underline-offset-4 font-bold'
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
    Typography, // Smart quotes, em dashes, etc.
  ])
}

import { FileFormat } from "converter_wasm";

export const FILE_FORMAT = {
    "text/html": FileFormat.Html,
    "text/markdown": FileFormat.Markdown,
    "application/docx": FileFormat.Docx,
    "wordprocessingml.document": FileFormat.Docx,
    "application/json": FileFormat.Json,
    "text/csv": FileFormat.Csv,
    // "application/docx": FileFormat.Text,
    "text/xml": FileFormat.Xml,
  } as const;
  
export const ALLOWED_FILES = Object.keys(FILE_FORMAT);
  
export const FILE_OUTPUT_FORMAT = {
  [FileFormat.Html]: 'html',
  [FileFormat.Markdown]: 'md',
  [FileFormat.Docx]: 'docx',
  [FileFormat.Json]: 'json',
  [FileFormat.Csv]: 'csv',
  [FileFormat.Xml]: 'xml',
  [FileFormat.Text]: 'txt',
} as const

export type FileResult = {
  name: string;
  file: Blob;
}

export function ensureInputFile(
  typeFormat: string
): typeFormat is keyof typeof FILE_FORMAT {
  return typeFormat in FILE_FORMAT;
}


export const getFile = (file: Uint8Array, fileOtputFormat: FileFormat, inputFileFormat: string): FileResult  => {
  const name = FILE_OUTPUT_FORMAT[fileOtputFormat];
  const blob = new Blob([file.buffer], { type: inputFileFormat });
  
  return {
    name,
    file: blob,
  }
}
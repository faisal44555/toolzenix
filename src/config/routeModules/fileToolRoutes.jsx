import { lazy } from 'react';

const FileTools = lazy(() => import('@/pages/FileTools'));
const FileCompressor = lazy(() => import('@/pages/FileCompressor'));
const FileMerger = lazy(() => import('@/pages/FileMerger'));
const FileSplitter = lazy(() => import('@/pages/FileSplitter'));
const RenameMultipleFiles = lazy(() => import('@/pages/RenameMultipleFiles'));
const TxtCsvConverter = lazy(() => import('@/pages/TxtCsvConverter'));
const EncryptDecryptFile = lazy(() => import('@/pages/EncryptDecryptFile'));
const TextFileViewer = lazy(() => import('@/pages/TextFileViewer'));
const FileSizeCalculator = lazy(() => import('@/pages/FileSizeCalculator'));

export const fileToolRoutes = [
  { path: '/file-tools', component: FileTools, isToolPage: false, title: "File Tools" },
  { path: '/file-compressor', component: FileCompressor, isToolPage: true, title: "File Compressor (ZIP)" },
  { path: '/file-merger', component: FileMerger, isToolPage: true, title: "File Merger (Text/PDF)" },
  { path: '/file-splitter', component: FileSplitter, isToolPage: true, title: "File Splitter (Text)" },
  { path: '/rename-multiple-files', component: RenameMultipleFiles, isToolPage: true, title: "Batch File Renamer" },
  { path: '/txt-csv-converter', component: TxtCsvConverter, isToolPage: true, title: "TXT to CSV Converter" },
  { path: '/encrypt-decrypt-file', component: EncryptDecryptFile, isToolPage: true, title: "File Encrypt/Decrypt Tool" },
  { path: '/text-file-viewer', component: TextFileViewer, isToolPage: true, title: "Text File Viewer" },
  { path: '/file-size-calculator', component: FileSizeCalculator, isToolPage: true, title: "File Size Calculator" },
];
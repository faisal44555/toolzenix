import { lazy } from 'react';

const DocumentConverters = lazy(() => import('@/pages/DocumentConverters'));
const WordToPdf = lazy(() => import('@/pages/WordToPdf'));
const PdfToWord = lazy(() => import('@/pages/PdfToWord'));
const PdfToImage = lazy(() => import('@/pages/PdfToImage'));
const ImageToPdf = lazy(() => import('@/pages/ImageToPdf'));
const ExcelToPdf = lazy(() => import('@/pages/ExcelToPdf'));
const PowerpointToPdf = lazy(() => import('@/pages/PowerpointToPdf'));
const TextToPdf = lazy(() => import('@/pages/TextToPdf'));
const PdfToText = lazy(() => import('@/pages/PdfToText'));
const MergePdfs = lazy(() => import('@/pages/MergePdfs'));
const SplitPdf = lazy(() => import('@/pages/SplitPdf'));
const ProtectPdf = lazy(() => import('@/pages/ProtectPdf'));
const UnlockPdf = lazy(() => import('@/pages/UnlockPdf'));
const HtmlToPdf = lazy(() => import('@/pages/HtmlToPdf'));
const PdfPageEditor = lazy(() => import('@/pages/PdfPageEditor'));
const RotatePdfPages = lazy(() => import('@/pages/RotatePdfPages'));


export const documentToolRoutes = [
  { path: '/document-tools', component: DocumentConverters, isToolPage: false, title: "Document Tools", description: "Convert, merge, split, protect, and manage various document formats like PDF, Word, Excel, and PowerPoint." },
  { path: '/word-to-pdf', component: WordToPdf, isToolPage: true, title: "Word to PDF Converter", description: "Easily convert Microsoft Word documents (.doc, .docx) to PDF format online." },
  { path: '/pdf-to-word', component: PdfToWord, isToolPage: true, title: "PDF to Word Converter", description: "Convert PDF files back to editable Microsoft Word documents (.docx)." },
  { path: '/pdf-to-image', component: PdfToImage, isToolPage: true, title: "PDF to Image Converter", description: "Transform PDF pages into high-quality images (JPG, PNG)." },
  { path: '/image-to-pdf', component: ImageToPdf, isToolPage: true, title: "Image to PDF Converter", description: "Combine multiple images (JPG, PNG, etc.) into a single PDF file." },
  { path: '/excel-to-pdf', component: ExcelToPdf, isToolPage: true, title: "Excel to PDF Converter", description: "Convert Microsoft Excel spreadsheets (.xls, .xlsx) to PDF documents." },
  { path: '/powerpoint-to-pdf', component: PowerpointToPdf, isToolPage: true, title: "PowerPoint to PDF Converter", description: "Convert Microsoft PowerPoint presentations (.ppt, .pptx) to PDF format." },
  { path: '/text-to-pdf', component: TextToPdf, isToolPage: true, title: "Text to PDF Converter", description: "Convert plain text files (.txt) or pasted text into PDF documents." },
  { path: '/pdf-to-text', component: PdfToText, isToolPage: true, title: "PDF to Text Extractor", description: "Extract text content from PDF files, making it editable." },
  { path: '/merge-pdfs', component: MergePdfs, isToolPage: true, title: "Merge PDFs Tool", description: "Combine multiple PDF files into a single, organized PDF document." },
  { path: '/split-pdf', component: SplitPdf, isToolPage: true, title: "Split PDF Tool", description: "Divide a PDF file into multiple smaller PDFs or extract specific pages." },
  { path: '/protect-pdf', component: ProtectPdf, isToolPage: true, title: "Protect PDF with Password", description: "Add password protection to your PDF files to secure sensitive information." },
  { path: '/unlock-pdf', component: UnlockPdf, isToolPage: true, title: "Unlock PDF", description: "Remove password protection from PDF files (if you know the password)." },
  { path: '/html-to-pdf', component: HtmlToPdf, isToolPage: true, title: "HTML to PDF Converter", description: "Convert HTML files or web pages (by pasting HTML code) to PDF documents." },
  { path: '/pdf-editor', component: PdfPageEditor, isToolPage: true, title: "PDF Page Editor", description: "Reorder or delete pages from your PDF documents." },
  { path: '/rotate-pdf', component: RotatePdfPages, isToolPage: true, title: "Rotate PDF Pages", description: "Rotate selected pages within a PDF document." },
];
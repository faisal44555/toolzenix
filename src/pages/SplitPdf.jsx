import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, Scissors, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Helmet } from "react-helmet-async";

const SplitPdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [ranges, setRanges] = useState(""); // e.g., "1-3,5,7-9"
  const { toast } = useToast();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setFileName(selectedFile.name.replace(/\.pdf$/, ''));
        setRanges("");
        try {
          const arrayBuffer = await selectedFile.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          setTotalPages(pdfDoc.getPageCount());
        } catch (e) {
          toast({ title: "Error reading PDF", description: "Could not read page count. The PDF might be corrupted or password-protected.", variant: "destructive" });
          setTotalPages(0);
        }
      } else {
        toast({ title: "Invalid file type", description: "Please select a .pdf file.", variant: "destructive" });
        setFile(null); setFileName(""); setTotalPages(0); setRanges("");
      }
    }
  };

  const parseRanges = (inputRanges, maxPages) => {
    const pageNumbers = new Set();
    if (!inputRanges.trim()) { // If empty, select all pages
      for (let i = 1; i <= maxPages; i++) pageNumbers.add(i);
      return Array.from(pageNumbers).sort((a, b) => a - b);
    }

    const parts = inputRanges.split(',');
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end) && start <= end && start >= 1 && end <= maxPages) {
          for (let i = start; i <= end; i++) {
            pageNumbers.add(i);
          }
        } else { throw new Error(`Invalid range: ${part}. Max pages: ${maxPages}`); }
      } else {
        const pageNum = Number(part);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
          pageNumbers.add(pageNum);
        } else { throw new Error(`Invalid page number: ${part}. Max pages: ${maxPages}`); }
      }
    }
    if (pageNumbers.size === 0) throw new Error("No valid pages selected.");
    return Array.from(pageNumbers).sort((a, b) => a - b);
  };

  const splitPdf = async () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please select a PDF file.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const selectedPageNumbers = parseRanges(ranges, totalPages);
      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const pageIndicesToCopy = selectedPageNumbers.map(num => num - 1); // 0-indexed
      const copiedPages = await newPdf.copyPages(originalPdf, pageIndicesToCopy);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `${fileName}_split_pages_${selectedPageNumbers.join('-')}.pdf`);
      toast({ title: "Split Successful!", description: `Selected pages extracted and downloaded.` });
    } catch (error) {
      console.error("PDF Split error:", error);
      toast({ title: "Split Error", description: error.message || "Could not split PDF. Ensure page ranges are valid.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Split PDF - Extract Pages from PDF | Toolzenix</title>
        <meta name="description" content="Break large PDFs into smaller parts or extract specific pages. Free, fast, and secure online PDF splitter." />
      </Helmet>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">✂️📄 Split PDF</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Break large PDFs into smaller parts or extract specific pages.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <label htmlFor="pdf-upload" className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-fuchsia-500 dark:hover:border-fuchsia-400 transition-colors">
              <input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="sr-only" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {file ? (
                  <>
                    <FileText className="w-12 h-12 text-fuchsia-500 dark:text-fuchsia-400 mb-4" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center">{file.name} ({totalPages} pages)</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Click to change file</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Drag & drop PDF or click to select</p>
                  </>
                )}
              </div>
            </label>
          </div>

          {file && (
            <div className="mt-8 w-full max-w-md">
              <label htmlFor="ranges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pages to extract (e.g., 1-3,5,7-9). Leave blank for all pages.
              </label>
              <Input
                id="ranges"
                type="text"
                value={ranges}
                onChange={(e) => setRanges(e.target.value)}
                placeholder={`e.g., 1-3, 5, 7-${totalPages} (Total: ${totalPages})`}
                className="mb-4 dark:bg-gray-700 dark:text-white"
              />
              <div className="flex justify-center">
                <Button onClick={splitPdf} disabled={loading} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-3 text-base px-6">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Splitting...
                    </>
                  ) : (
                  <>
                    <Scissors className="w-5 h-5 mr-2" />Split & Download PDF
                  </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload your PDF file.</li>
          <li>Enter the page numbers or ranges you want to extract (e.g., "1-3", "5", "7-10"). Separate multiple pages/ranges with commas.</li>
          <li>If you leave the field blank, all pages will be selected (effectively copying the PDF).</li>
          <li>Click "Split & Download PDF". A new PDF containing only your selected pages will be downloaded.</li>
        </ul>
      </div>
    </div>
  );
};

export default SplitPdf;
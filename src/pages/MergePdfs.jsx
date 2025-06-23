import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Combine, X, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PDFDocument } from 'pdf-lib';
import { Helmet } from "react-helmet-async";

const MergePdfs = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const pdfFiles = selectedFiles.filter(file => file.type === "application/pdf");
    
    if (pdfFiles.length !== selectedFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Some non-PDF files were ignored.",
        variant: "destructive",
      });
    }
    setFiles(prevFiles => [...prevFiles, ...pdfFiles].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      toast({
        title: "Not enough files",
        description: "Please select at least two PDF files to merge.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'merged_document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      toast({
        title: "Merge Successful!",
        description: `${files.length} PDFs merged and downloaded.`,
      });
      setFiles([]);

    } catch (error) {
      console.error("PDF Merge error:", error);
      toast({
        title: "Merge Error",
        description: "Could not merge PDFs. Ensure files are valid and not corrupted.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Merge PDFs - Combine Multiple PDF Files | Toolzenix</title>
        <meta name="description" content="Combine multiple PDF files into one organized document. Free, fast, and secure online PDF merger." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          📄➕📄 Merge PDFs
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Combine multiple PDF files into one organized document — quick and safe.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <label
              htmlFor="pdf-upload"
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
            >
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFileChange}
                className="sr-only"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Drag and drop your PDF files here, or click to select (min. 2)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Files will be merged in alphabetical order of their names.
                </p>
              </div>
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-8 w-full">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Selected PDFs ({files.length}):</h3>
              <ul className="space-y-2 mb-4 max-h-60 overflow-y-auto p-2 border rounded-md dark:border-gray-700">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                    <span className="text-sm text-gray-800 dark:text-gray-200 truncate" title={file.name}>{file.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700 p-1 h-auto">
                      <X className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                <Button
                  onClick={mergePdfs}
                  disabled={loading || files.length < 2}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 text-base px-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Merging...
                    </>
                  ) : (
                    <>
                      <Combine className="w-5 h-5 mr-2" />
                      Merge & Download PDF
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
          <li>Upload two or more PDF files.</li>
          <li>The files will be listed in alphabetical order, which is the order they will be merged.</li>
          <li>Click the "Merge & Download PDF" button.</li>
          <li>Your combined PDF will be processed in your browser and downloaded automatically.</li>
        </ul>
      </div>
    </div>
  );
};

export default MergePdfs;
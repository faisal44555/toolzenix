import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextSelect, Upload, Download, FileText as FileTextIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import * as pdfjsLib from "pdfjs-dist";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToText = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [fileName, setFileName] = useState("extracted-text");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileName(selectedFile.name.replace(/\.pdf$/, ''));
      setExtractedText(""); 
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF file.",
        variant: "destructive",
      });
      setFile(null);
      setFileName("extracted-text");
    }
  };

  const convertPdfToText = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to convert.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setExtractedText("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += pageText + "\n\n"; // Add newlines between pages
      }
      
      setExtractedText(fullText.trim());
      toast({
        title: "Conversion Successful!",
        description: `Text extracted from ${file.name}. You can now copy or download it.`,
      });
    } catch (error) {
      console.error("PDF to Text conversion error:", error);
      toast({
        title: "Conversion Error",
        description: "Could not extract text from the PDF. The PDF might be image-based or corrupted.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadText = () => {
    if (!extractedText) {
      toast({ title: "No text to download", description: "Please convert a PDF first.", variant: "destructive"});
      return;
    }
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Text Downloaded", description: `Content saved as ${fileName}.txt`});
  };

  const handleCopyToClipboard = () => {
    if (!extractedText) {
        toast({ title: "No text to copy", description: "Please convert a PDF first.", variant: "destructive"});
        return;
    }
    navigator.clipboard.writeText(extractedText)
      .then(() => toast({ title: "Copied to Clipboard!", description: "Extracted text copied."}))
      .catch(err => toast({ title: "Copy Failed", description: "Could not copy text.", variant: "destructive"}));
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>PDF to Text Converter - Extract Text from PDFs Online | Toolzenix</title>
        <meta name="description" content="Easily extract text from your PDF files with our free online PDF to Text converter. Fast, accurate, and secure. No registration needed. Ideal for searchable PDFs, not scanned/image-based ones." />
        <link rel="canonical" href="https://toolzenix.com/pdf-to-text" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          📄➡️✍️ PDF to Text Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Extract editable text from your PDF documents. Perfect for reusing content from text-based PDFs. This tool works best with PDFs that contain selectable text, not scanned images.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md mb-6">
            <label
              htmlFor="pdf-upload"
              className="relative block w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="sr-only"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {file ? (
                  <>
                    <FileTextIcon className="w-10 h-10 text-indigo-500 dark:text-indigo-400 mb-2" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                      {file.name}
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Click to upload PDF or drag & drop
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>
          
          <Button
              onClick={convertPdfToText}
              disabled={!file || loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-base px-6 mb-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Extracting Text...
                </>
              ) : (
                <>
                  <TextSelect className="w-5 h-5 mr-2" />
                  Extract Text from PDF
                </>
              )}
            </Button>

          {extractedText && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="w-full mt-4"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Extracted Text:</h3>
              <textarea
                value={extractedText}
                readOnly
                className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                aria-label="Extracted text from PDF"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" onClick={handleCopyToClipboard} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Copy Text</Button>
                <Button variant="outline" onClick={handleDownloadText} className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Download .txt</Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">About Our PDF to Text Converter</h2>
        <p>Our PDF to Text Converter allows you to extract plain text content from PDF documents. This is extremely useful when you need to reuse or edit information locked within a PDF file without manually retyping it. The tool works best with PDFs that are originally text-based (i.e., created from a word processor or other software, not scanned images). For scanned or image-based PDFs, OCR (Optical Character Recognition) capabilities would be required, which this tool does not currently provide.</p>
        <p>The conversion process is done entirely in your browser, ensuring your files and their content remain private. Once the text is extracted, you can easily copy it to your clipboard or download it as a .txt file. If you need to convert text into a PDF, try our <Link to="/text-to-pdf">Text to PDF Converter</Link>. For other PDF operations, check out our full suite of <Link to="/document-converters">Document Tools</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Upload a PDF file by clicking the upload area or dragging and dropping your file.</li>
          <li>Once a PDF file is selected, click the "Extract Text from PDF" button.</li>
          <li>The tool will process the PDF and extract the text content. This may take a few moments for larger files or multi-page documents.</li>
          <li>The extracted text will be displayed in a text area below.</li>
          <li>You can then click "Copy Text" to copy the entire content to your clipboard or "Download .txt" to save it as a plain text file.</li>
        </ol>
        <p className="mt-4">This tool is ideal for students, researchers, writers, and anyone who needs to quickly get text out of PDF files. Remember, the accuracy of text extraction depends on the quality and type of the source PDF. Explore more utilities on our <Link to="/tools">All Tools</Link> page.</p>
      </div>
    </div>
  );
};

export default PdfToText;
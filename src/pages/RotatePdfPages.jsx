import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, RotateCcw, FileText, Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PDFDocument, RotationTypes } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const RotatePdfPages = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pagesToRotate, setPagesToRotate] = useState("");
  const [rotationAngle, setRotationAngle] = useState("90");
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setLoading(true);
        setFile(selectedFile);
        setFileName(selectedFile.name.replace(/\.pdf$/, ''));
        setPagesToRotate(""); 
        try {
          const arrayBuffer = await selectedFile.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          setTotalPages(pdfDoc.getPageCount());
          if (pdfDoc.getPageCount() > 0) {
             toast({ title: "PDF Loaded", description: `${selectedFile.name} (${pdfDoc.getPageCount()} pages) ready for rotation.`});
          } else {
             toast({ title: "Empty PDF", description: "The selected PDF has no pages.", variant: "destructive" });
             resetState();
          }
        } catch (e) {
          toast({ title: "Error reading PDF", description: e.message || "Could not read PDF. It might be corrupted or password protected.", variant: "destructive" });
          resetState();
        } finally {
          setLoading(false);
        }
      } else {
        toast({ title: "Invalid file type", description: "Please select a .pdf file.", variant: "destructive" });
        resetState();
      }
    }
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
    }
  };
  
  const resetState = () => {
    setFile(null); 
    setFileName(""); 
    setTotalPages(0); 
    setPagesToRotate("");
    setLoading(false);
    setProcessing(false);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const parsePagesToRotate = (input, maxPages) => {
    if (!input || input.toLowerCase().trim() === "all" || input.trim() === "") {
      if (maxPages === 0) throw new Error("Cannot select 'all' for an empty PDF.");
      return Array.from({ length: maxPages }, (_, i) => i + 1);
    }
    const pageNumbers = new Set();
    const parts = input.split(',');
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart.includes('-')) {
        const [startStr, endStr] = trimmedPart.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end) && start <= end && start >= 1 && end <= maxPages) {
          for (let i = start; i <= end; i++) pageNumbers.add(i);
        } else { throw new Error(`Invalid range: "${trimmedPart}". Page numbers must be between 1 and ${maxPages}.`); }
      } else {
        const pageNum = parseInt(trimmedPart, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
          pageNumbers.add(pageNum);
        } else { throw new Error(`Invalid page number: "${trimmedPart}". Page numbers must be between 1 and ${maxPages}.`); }
      }
    }
    if (pageNumbers.size === 0) throw new Error("No valid pages selected. Please enter page numbers like '1,3-5' or 'all'.");
    return Array.from(pageNumbers).sort((a, b) => a - b);
  };

  const rotatePdf = async () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please select a PDF file first.", variant: "destructive" });
      return;
    }
    if (totalPages === 0) {
      toast({ title: "Cannot Rotate", description: "The PDF has no pages or could not be read.", variant: "destructive" });
      return;
    }

    setProcessing(true);
    try {
      const selectedPageNumbers = parsePagesToRotate(pagesToRotate, totalPages);
      if (selectedPageNumbers.length === 0) {
        toast({ title: "No Pages Specified", description: "Please specify which pages to rotate (e.g., 1,3-5, or 'all').", variant: "destructive" });
        setProcessing(false);
        return;
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      let angleEnum;
      const angleValue = parseInt(rotationAngle);
      switch (angleValue) {
        case 90: angleEnum = RotationTypes.Degrees90; break;
        case 180: angleEnum = RotationTypes.Degrees180; break;
        case 270: angleEnum = RotationTypes.Degrees270; break;
        default: throw new Error("Invalid rotation angle selected.");
      }

      selectedPageNumbers.forEach(pageNum => {
        if (pageNum > 0 && pageNum <= pdfDoc.getPageCount()) {
          const page = pdfDoc.getPage(pageNum - 1); 
          page.setRotation(angleEnum);
        }
      });

      const pdfBytes = await pdfDoc.save();
      const friendlyPageRange = pagesToRotate.trim().toLowerCase() === "all" || pagesToRotate.trim() === "" ? "all" : selectedPageNumbers.join('-');
      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `${fileName}_rotated_${angleValue}deg_pages_${friendlyPageRange}.pdf`);
      toast({ title: "Rotation Successful!", description: `Selected pages rotated by ${angleValue}° and PDF downloaded.` });
    } catch (error) {
      console.error("PDF Rotation error:", error);
      toast({ title: "Rotation Error", description: error.message || "Could not rotate PDF pages. Ensure page ranges are valid.", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      pageTitle="Rotate PDF Pages - Adjust PDF Orientation"
      pageDescription="Rotate selected pages within a PDF document (90, 180, or 270 degrees). Free, secure, and client-side PDF rotation."
      canonicalPath="/rotate-pdf"
    >
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white flex items-center justify-center">
            <RotateCcw className="w-8 h-8 mr-3 text-pink-500" />
            Rotate PDF Pages
        </h1>
        <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">Easily adjust the orientation of pages in your PDF documents.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }} 
        className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md mb-8">
            <label htmlFor="pdf-upload" className="relative block w-full h-60 sm:h-72 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-pink-500 dark:hover:border-pink-400 transition-colors duration-300 ease-in-out group">
              <input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} ref={fileInputRef} className="sr-only" disabled={loading || processing} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                {loading && !file && <Loader2 className="w-10 h-10 text-pink-500 animate-spin mb-3" />}
                {!loading && file && (
                  <>
                    <FileText className="w-12 h-12 sm:w-14 sm:h-14 text-pink-500 dark:text-pink-400 mb-3" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-full px-2">{file.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{totalPages > 0 ? `${totalPages} pages` : 'Reading pages...'}</p>
                    <p className="text-xs text-pink-600 dark:text-pink-400 mt-2 group-hover:underline">Click to change file</p>
                  </>
                )}
                {!loading && !file && (
                  <>
                    <Upload className="w-12 h-12 sm:w-14 sm:h-14 text-slate-400 dark:text-slate-500 mb-4 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors" />
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                      Drag & drop PDF file here
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">or click to select file</p>
                    <p className="text-xs text-slate-400 dark:text-slate-600 mt-3">Max file size: 50MB.</p>
                  </>
                )}
              </div>
            </label>
          </div>

          {file && totalPages > 0 && (
            <motion.div 
              initial={{ opacity: 0, y:10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 w-full max-w-md space-y-5"
            >
              <div>
                <label htmlFor="pagesToRotate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Pages to Rotate
                </label>
                <Input 
                  id="pagesToRotate" 
                  type="text" 
                  value={pagesToRotate} 
                  onChange={(e) => setPagesToRotate(e.target.value)} 
                  placeholder={`e.g., 1,3-5 or 'all' (Total: ${totalPages})`} 
                  className="dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-pink-500 focus:border-pink-500" 
                  disabled={processing}
                />
                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Leave blank or type 'all' to rotate all pages.</p>
              </div>
              <div>
                <label htmlFor="rotationAngle" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Rotation Angle
                </label>
                <Select value={rotationAngle} onValueChange={setRotationAngle} disabled={processing}>
                  <SelectTrigger id="rotationAngle" className="w-full dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-pink-500 focus:border-pink-500">
                    <SelectValue placeholder="Select angle" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:text-white">
                    <SelectItem value="90">90° Clockwise</SelectItem>
                    <SelectItem value="180">180°</SelectItem>
                    <SelectItem value="270">270° Clockwise (90° Anti-Clockwise)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <Button onClick={rotatePdf} disabled={processing || loading || !file} className="bg-pink-600 hover:bg-pink-700 text-white py-3 text-base px-6 w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow duration-300">
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Rotating...
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-5 h-5 mr-2" />Rotate & Download
                    </>
                  )}
                </Button>
                 <Button variant="outline" onClick={resetState} disabled={processing || loading} className="w-full sm:w-auto">
                     Clear Selection
                 </Button>
              </div>
            </motion.div>
          )}
           {file && totalPages === 0 && !loading && (
             <div className="mt-6 w-full max-w-md text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-600 rounded-md">
                <AlertTriangle className="w-8 h-8 text-yellow-500 dark:text-yellow-400 mx-auto mb-2" />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">Could not determine page count. The PDF might be empty, corrupted or password protected.</p>
             </div>
           )}
        </div>
      </motion.div>
      <motion.section 
        initial={{ opacity: 0, y:20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 prose prose-slate dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg shadow"
      >
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 !mb-4">How to Rotate PDF Pages</h2>
            <ol className="!pl-5">
                <li><strong>Upload PDF:</strong> Click the upload area or drag & drop your PDF file.</li>
                <li><strong>Specify Pages:</strong> Enter the page numbers you want to rotate (e.g., "1", "1,3,5", "2-4"). To rotate all pages, type "all" or leave blank.</li>
                <li><strong>Select Angle:</strong> Choose the rotation angle: 90° clockwise, 180°, or 270° clockwise (which is equivalent to 90° anti-clockwise).</li>
                <li><strong>Rotate & Download:</strong> Click the "Rotate & Download" button. Your PDF with rotated pages will be processed and downloaded.</li>
            </ol>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 !mt-6 !mb-3">Tips:</h3>
            <ul className="!pl-5">
                <li>This tool is useful for correcting scanned documents or pages that are in the wrong orientation.</li>
                <li>All operations are performed securely in your browser. Your files are not sent to any server.</li>
                <li>Ensure your PDF is not password-protected for the tool to work correctly.</li>
            </ul>
      </motion.section>
    </div>
    </ToolPageLayout>
  );
};

export default RotatePdfPages;
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Puzzle, Trash2, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import ToolPageLayout from "@/components/layout/ToolPageLayout";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.js', import.meta.url).toString();

const PdfPageEditor = () => {
  const [file, setFile] = useState(null);
  const [pdfDocInstance, setPdfDocInstance] = useState(null); 
  const [pagePreviews, setPagePreviews] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [processingSave, setProcessingSave] = useState(false);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generatePagePreviews = useCallback(async (loadedPdfDoc) => {
    setLoading(true);
    const previews = [];
    const numPages = loadedPdfDoc.getPageCount();

    if (numPages === 0) {
      toast({ title: "Empty PDF", description: "The selected PDF has no pages.", variant: "destructive" });
      setLoading(false);
      setFile(null);
      setFileName("");
      setPdfDocInstance(null);
      return;
    }
    
    const arrayBuffer = await loadedPdfDoc.save(); 
    const pdfjsDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    for (let i = 0; i < numPages; i++) {
      try {
        const page = await pdfjsDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale: 0.3 }); 
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport }).promise;
        previews.push({ id: Date.now() + i, dataUrl: canvas.toDataURL('image/jpeg', 0.7), originalIndex: i });
      } catch (previewError) {
        console.error(`Error generating preview for page ${i + 1}:`, previewError);
        previews.push({ id: Date.now() + i, dataUrl: "error", originalIndex: i, error: true });
        toast({ title: `Preview Error page ${i+1}`, description: "Could not render page preview.", variant: "destructive" });
      }
    }
    setPagePreviews(previews);
    setLoading(false);
  }, [toast]);
  
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileName(selectedFile.name.replace(/\.pdf$/, ''));
      setLoading(true);
      setPagePreviews([]);
      setPdfDocInstance(null); 
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const loadedPdfDoc = await PDFDocument.load(arrayBuffer);
        setPdfDocInstance(loadedPdfDoc); 
        await generatePagePreviews(loadedPdfDoc);
      } catch (e) {
        toast({ title: "Error loading PDF", description: e.message || "Failed to load PDF. It might be corrupted or password protected.", variant: "destructive" });
        setLoading(false);
        setFile(null);
        setFileName("");
      }
    } else if (selectedFile) {
      toast({ title: "Invalid file type", description: "Please select a .pdf file.", variant: "destructive" });
      setFile(null);
      setFileName("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  const deletePage = (indexToDelete) => {
    const newPreviews = pagePreviews.filter((_, i) => i !== indexToDelete);
    setPagePreviews(newPreviews);
    toast({ title: "Page Marked for Deletion", description: `Page will be removed on save.` });
  };

  const movePage = (index, direction) => { 
    const newPreviews = [...pagePreviews];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newPreviews.length) return;
    [newPreviews[index], newPreviews[targetIndex]] = [newPreviews[targetIndex], newPreviews[index]];
    setPagePreviews(newPreviews);
    toast({ title: "Page Reordered", description: `Page order updated.` });
  };
  
  const saveEditedPdf = async () => {
    if (!file || !pdfDocInstance || pagePreviews.length === 0) {
      toast({ title: "Nothing to Save", description: "Please load a PDF and ensure pages are present.", variant: "destructive" });
      return;
    }
    setProcessingSave(true);
    try {
      const newPdfDoc = await PDFDocument.create();
      const originalIndicesToCopy = pagePreviews.map(p => p.originalIndex);
      
      const sourcePdfForCopy = await PDFDocument.load(await file.arrayBuffer());

      const copiedPages = await newPdfDoc.copyPages(sourcePdfForCopy, originalIndicesToCopy);
      copiedPages.forEach(page => newPdfDoc.addPage(page));
      
      const pdfBytes = await newPdfDoc.save();
      saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `${fileName}_edited.pdf`);
      toast({ title: "Save Successful!", description: "Edited PDF downloaded." });
    } catch (error) {
      console.error("Save Error:", error);
      toast({ title: "Save Error", description: error.message || "An unexpected error occurred while saving.", variant: "destructive" });
    } finally {
      setProcessingSave(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setFileName('');
    setPagePreviews([]);
    setPdfDocInstance(null);
    setLoading(false);
    setProcessingSave(false);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <ToolPageLayout
      pageTitle="PDF Page Editor - Reorder & Delete Pages"
      pageDescription="Easily reorder or delete pages from your PDF documents. Free and secure online PDF page editor, works entirely in your browser."
      canonicalPath="/pdf-editor"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white flex items-center justify-center">
            <Puzzle className="w-8 h-8 mr-3 text-orange-500" />
            PDF Page Editor
          </h1>
          <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">Reorder, delete pages from your PDF documents with ease.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }} 
          className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700"
        >
          {!file ? (
            <div className="flex flex-col items-center justify-center py-10">
              <label htmlFor="pdf-upload" className="relative block w-full max-w-lg h-60 sm:h-72 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors duration-300 ease-in-out group">
                <input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} ref={fileInputRef} className="sr-only" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <Upload className="w-12 h-12 sm:w-14 sm:h-14 text-slate-400 dark:text-slate-500 mb-4 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors" />
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
                    Drag & drop PDF file here
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">or click to select file</p>
                  <p className="text-xs text-slate-400 dark:text-slate-600 mt-3">Max file size: 50MB. PDF only.</p>
                </div>
              </label>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white truncate flex-1" title={`${fileName}.pdf`}>
                  Editing: <span className="font-mono text-orange-600 dark:text-orange-400">{fileName}.pdf</span>
                </h2>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={resetState} 
                    disabled={loading || processingSave}
                    className="w-full sm:w-auto"
                    >
                      <Upload className="w-4 h-4 mr-2" /> Upload New
                  </Button>
                  <Button 
                    onClick={saveEditedPdf} 
                    disabled={loading || processingSave || pagePreviews.length === 0} 
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-auto"
                  >
                    {(loading || processingSave) ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Download className="w-5 h-5 mr-2" />}
                    Save PDF
                  </Button>
                </div>
              </div>
              {loading && pagePreviews.length === 0 && 
                <div className="flex flex-col justify-center items-center h-40 my-5 p-5 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                  <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-3"/> 
                  <p className="text-slate-600 dark:text-slate-300 text-lg">Loading previews, please wait...</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">This might take a moment for larger PDFs.</p>
                </div>
              }
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {pagePreviews.map((page, index) => (
                  <motion.div 
                    key={page.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative group border border-slate-300 dark:border-slate-600 p-2 rounded-lg dark:bg-slate-700/60 bg-slate-50 flex flex-col items-center shadow-sm hover:shadow-lg transition-all duration-200"
                  >
                    {page.error ? (
                       <div className="w-full aspect-[2/3] bg-red-100 dark:bg-red-900/50 flex flex-col items-center justify-center rounded-sm mb-2 p-2">
                          <Puzzle className="w-8 h-8 text-red-500 mb-1" />
                          <p className="text-xs text-red-600 dark:text-red-400 text-center">Preview Error</p>
                       </div>
                    ) : (
                       <img src={page.dataUrl} alt={`PDF Page ${page.originalIndex + 1} Preview`} className="w-full h-auto rounded-sm mb-2 shadow-inner aspect-[2/3] object-contain bg-white" />
                    )}
                    <p className="text-xs text-center text-slate-600 dark:text-slate-300 mb-2">
                      Page {index + 1} <span className="text-slate-500 dark:text-slate-400 text-[10px]">(Orig: {page.originalIndex + 1})</span>
                    </p>
                    <div className="flex justify-around w-full mt-auto bg-slate-100 dark:bg-slate-700 py-1 rounded-md">
                      <Button variant="ghost" size="icon" onClick={() => movePage(index, -1)} disabled={index === 0 || loading || processingSave} title="Move Left" className="h-7 w-7 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full"><ArrowLeft className="h-4 w-4"/></Button>
                      <Button variant="ghost" size="icon" onClick={() => deletePage(index)} disabled={loading || processingSave} title="Delete Page" className="h-7 w-7 text-red-500 hover:bg-red-100 dark:hover:bg-red-700/30 rounded-full"><Trash2 className="h-4 w-4"/></Button>
                      <Button variant="ghost" size="icon" onClick={() => movePage(index, 1)} disabled={index === pagePreviews.length - 1 || loading || processingSave} title="Move Right" className="h-7 w-7 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full"><ArrowRight className="h-4 w-4"/></Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              {pagePreviews.length === 0 && !loading && file && 
                <div className="text-center py-10 my-5 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                  <Puzzle className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-300 text-lg">No pages to display.</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">The PDF might be empty, corrupted, or all pages were deleted.</p>
                </div>
              }
            </div>
          )}
        </motion.div>

        <motion.section 
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 prose prose-slate dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg shadow"
        >
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 !mb-4">How to Use PDF Page Editor</h2>
            <ol className="!pl-5">
                <li><strong>Upload PDF:</strong> Click the upload area or drag and drop your PDF file.</li>
                <li><strong>Wait for Previews:</strong> Page thumbnails will be generated. This might take a moment for larger PDFs.</li>
                <li><strong>Reorder Pages:</strong> Use the <ArrowLeft size={16} className="inline"/> and <ArrowRight size={16} className="inline"/> buttons below each page preview to change its position.</li>
                <li><strong>Delete Pages:</strong> Click the <Trash2 size={16} className="inline text-red-500"/> button to mark a page for deletion. Deleted pages will not be included in the final PDF.</li>
                <li><strong>Save Changes:</strong> Once satisfied, click the "Save PDF" button. Your modified PDF will be processed and downloaded.</li>
                <li><strong>Upload New:</strong> If you want to edit another PDF, click "Upload New" to clear the current state and start fresh.</li>
            </ol>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 !mt-6 !mb-3">Important Notes:</h3>
            <ul className="!pl-5">
                <li>All processing is done in your browser. Your files are not uploaded to any server, ensuring privacy.</li>
                <li>For very large PDF files, preview generation and saving might take some time. Please be patient.</li>
                <li>If you encounter errors, ensure your PDF is not password-protected or corrupted.</li>
            </ul>
        </motion.section>
      </div>
    </ToolPageLayout>
  );
};

export default PdfPageEditor;
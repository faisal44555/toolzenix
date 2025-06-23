import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { FileCog, UploadCloud, AlertCircle, Download, Trash2, CheckCircle, FileText, FileArchive } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const FileMerger = () => {
  const [files, setFiles] = useState([]);
  const [mergeType, setMergeType] = useState('text');
  const [outputFileName, setOutputFileName] = useState('merged_file');
  const [isMerging, setIsMerging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (mergeType === 'pdf' && !selectedFiles.every(file => file.type === 'application/pdf')) {
      toast({ title: 'Invalid File Type', description: 'Please select only PDF files for PDF merging.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }
    if (mergeType === 'text' && !selectedFiles.every(file => file.type.startsWith('text/'))) {
       toast({ title: 'Invalid File Type', description: 'Please select only text files (e.g., .txt, .csv, .md) for text merging.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }
    setFiles(prevFiles => [...prevFiles, ...selectedFiles].sort((a, b) => a.name.localeCompare(b.name)));
    event.target.value = null;
  };

  const removeFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const mergeFiles = useCallback(async () => {
    if (files.length < 2) {
      toast({ title: 'Not Enough Files', description: 'Please select at least two files to merge.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    setIsMerging(true);

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    try {
      if (mergeType === 'text') {
        let mergedContent = '';
        for (const file of files) {
          const text = await file.text();
          mergedContent += text + '\n\n';
        }
        const blob = new Blob([mergedContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, `${outputFileName || 'merged_text_file'}.txt`);
      } else if (mergeType === 'pdf') {
        const mergedPdf = await PDFDocument.create();
        for (const file of files) {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach(page => mergedPdf.addPage(page));
        }
        const pdfBytes = await mergedPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, `${outputFileName || 'merged_pdf_file'}.pdf`);
      }
      toast({ title: 'Merge Successful!', description: `Files merged into ${outputFileName}.${mergeType === 'text' ? 'txt' : 'pdf'}`, action: <CheckCircle className="text-green-500" /> });
      setFiles([]);
    } catch (error) {
      console.error("Merging error:", error);
      toast({ title: 'Merge Failed', description: `An error occurred: ${error.message}`, variant: 'destructive', action: <AlertCircle/> });
    } finally {
      setIsMerging(false);
    }
  }, [files, mergeType, outputFileName, toast]);

  const handleMergeTypeChange = (type) => {
    setMergeType(type);
    setFiles([]);
    setOutputFileName(type === 'text' ? 'merged_text_file' : 'merged_pdf_file');
  }

  return (
    <>
      <Helmet>
        <title>File Merger - Merge Text & PDF Files | Toolzenix</title>
        <meta name="description" content="Merge multiple text files or PDF documents into a single file directly in your browser. Secure and client-side processing." />
        <link rel="canonical" href="https://toolzenix.com/file-merger" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <FileCog className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">File Merger (Text/PDF)</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Combine multiple text or PDF files into one, all within your browser.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Select Merge Type:</Label>
            <RadioGroup value={mergeType} onValueChange={handleMergeTypeChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="type-text" className="text-green-600 border-green-300 dark:text-green-400 dark:border-green-500"/>
                <Label htmlFor="type-text" className="text-gray-700 dark:text-gray-300">Text Files (.txt, .csv, etc.)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="type-pdf" className="text-red-600 border-red-300 dark:text-red-400 dark:border-red-500"/>
                <Label htmlFor="type-pdf" className="text-gray-700 dark:text-gray-300">PDF Files (.pdf)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="file-upload-merger" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Files to Merge (Sorted by name):
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <Label
                    htmlFor="file-upload-merger"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-green-600 dark:text-green-400 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                  >
                    <span>Upload files</span>
                    <Input 
                      id="file-upload-merger" 
                      name="file-upload-merger" 
                      type="file" 
                      className="sr-only" 
                      multiple 
                      onChange={handleFileChange} 
                      accept={mergeType === 'text' ? 'text/*' : 'application/pdf'}
                    />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">{mergeType === 'text' ? 'Text files only' : 'PDF files only'}</p>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Selected Files (Order of Merge):</h3>
              <ul className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      {mergeType === 'text' ? <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" /> : <FileArchive className="flex-shrink-0 h-5 w-5 text-gray-400" />}
                      <span className="ml-2 flex-1 w-0 truncate text-gray-700 dark:text-gray-300">{file.name}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.name)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <Label htmlFor="output-name" className="text-gray-700 dark:text-gray-300">Output File Name (without extension)</Label>
            <Input 
              id="output-name" 
              type="text" 
              value={outputFileName}
              onChange={(e) => setOutputFileName(e.target.value)}
              placeholder={mergeType === 'text' ? 'merged_text_file' : 'merged_pdf_file'}
              className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" 
            />
          </div>

          <Button 
            onClick={mergeFiles} 
            disabled={isMerging || files.length < 2}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
          >
            {isMerging ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                ></motion.div>
                Merging...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" /> Merge & Download
              </>
            )}
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How to Merge Files</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Select whether you want to merge Text files or PDF files.</li>
            <li>Upload two or more files. Files will be merged in alphabetical order of their names.</li>
            <li>Optionally, set a custom name for the merged output file.</li>
            <li>Click "Merge & Download". The combined file will be downloaded to your device.</li>
          </ol>
          <h3 className="text-xl font-semibold">Important Notes:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>For <strong>Text Files</strong>: Contents are simply concatenated, with two newlines added between each original file's content.</li>
            <li>For <strong>PDF Files</strong>: Pages from each PDF are appended in order. Complex PDFs with forms or interactive elements might not merge perfectly.</li>
            <li>All processing is done in your browser. Your files are not uploaded.</li>
          </ul>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>Ensure you select the correct file type for merging. Large files may take time to process.</p>
        </motion.div>
      </div>
    </>
  );
};

export default FileMerger;
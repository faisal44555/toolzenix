import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileCog, UploadCloud, AlertCircle, Download, Trash2, Edit3, CheckCircle, Package } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const RenameMultipleFiles = () => {
  const [files, setFiles] = useState([]);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [startNumber, setStartNumber] = useState(1);
  const [includeOriginalName, setIncludeOriginalName] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
    event.target.value = null; 
  };

  const removeFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const generateNewName = (originalName, index) => {
    const nameWithoutExtension = originalName.substring(0, originalName.lastIndexOf('.'));
    const extension = originalName.substring(originalName.lastIndexOf('.'));
    let newName = '';
    if (prefix) newName += prefix;
    newName += String(startNumber + index).padStart(3, '0');
    if (suffix) newName += suffix;
    if (includeOriginalName) newName += `_${nameWithoutExtension}`;
    return newName + extension;
  };

  const renameAndDownload = useCallback(async () => {
    if (files.length === 0) {
      toast({ title: 'No Files Selected', description: 'Please select files to rename.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    setIsProcessing(true);

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    const zip = new JSZip();

    files.forEach((file, index) => {
      const newName = generateNewName(file.name, index);
      zip.file(newName, file);
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'renamed_files.zip');
      toast({ title: 'Files Renamed & Zipped!', description: 'Your renamed files are being downloaded in a ZIP archive.', action: <CheckCircle className="text-green-500" /> });
      setFiles([]);
      setPrefix('');
      setSuffix('');
      setStartNumber(1);
      setIncludeOriginalName(false);
    } catch (error) {
      console.error("Renaming/Zipping error:", error);
      toast({ title: 'Operation Failed', description: 'An error occurred. Please try again.', variant: 'destructive', action: <AlertCircle/> });
    } finally {
      setIsProcessing(false);
    }
  }, [files, prefix, suffix, startNumber, includeOriginalName, toast, generateNewName]);

  return (
    <>
      <Helmet>
        <title>Batch Rename Files Tool | Toolzenix</title>
        <meta name="description" content="Rename multiple files in batch using patterns (prefix, suffix, numbering). Files are processed client-side and downloaded as a ZIP." />
        <link rel="canonical" href="https://toolzenix.com/rename-multiple-files" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Edit3 className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Batch Rename Files Tool</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Easily rename multiple files with custom patterns. Renamed files are downloaded in a ZIP archive.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label htmlFor="file-upload-rename" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Files to Rename:
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <Label
                    htmlFor="file-upload-rename"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                  >
                    <span>Upload files</span>
                    <Input id="file-upload-rename" name="file-upload-rename" type="file" className="sr-only" multiple onChange={handleFileChange} />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Selected Files ({files.length}):</h3>
              <ul className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700 max-h-48 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <Package className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-2 flex-1 w-0 truncate text-gray-700 dark:text-gray-300">{file.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap text-xs hidden sm:inline">-&gt; {generateNewName(file.name, index)}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.name)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
               <p className="text-xs text-gray-500 dark:text-gray-400">Preview of new names above. Actual order may vary slightly based on system sort.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="prefix" className="text-gray-700 dark:text-gray-300">Prefix (Optional)</Label>
              <Input id="prefix" type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="e.g., Image_" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <Label htmlFor="suffix" className="text-gray-700 dark:text-gray-300">Suffix (Optional)</Label>
              <Input id="suffix" type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)} placeholder="e.g., _final" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
          </div>
          <div>
            <Label htmlFor="start-number" className="text-gray-700 dark:text-gray-300">Sequential Numbering Starts At:</Label>
            <Input id="start-number" type="number" value={startNumber} onChange={(e) => setStartNumber(Math.max(0, parseInt(e.target.value) || 0))} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" min="0" />
          </div>
          <div className="flex items-center space-x-2">
             <input type="checkbox" id="includeOriginalName" checked={includeOriginalName} onChange={(e) => setIncludeOriginalName(e.target.checked)} className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
             <Label htmlFor="includeOriginalName" className="text-gray-700 dark:text-gray-300">Include Original Name (before extension)</Label>
          </div>
          

          <Button 
            onClick={renameAndDownload} 
            disabled={isProcessing || files.length === 0}
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                ></motion.div>
                Processing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" /> Rename & Download ZIP
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
          <h2 className="text-2xl font-semibold">How to Batch Rename Files</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Upload the files you want to rename.</li>
            <li>Define your renaming pattern:
              <ul className="list-disc list-inside ml-4">
                <li><strong>Prefix:</strong> Text added to the beginning of each new filename.</li>
                <li><strong>Suffix:</strong> Text added to the end of each new filename (before extension).</li>
                <li><strong>Sequential Numbering:</strong> Files will be numbered starting from the value you set (e.g., 001, 002...).</li>
                <li><strong>Include Original Name:</strong> Optionally, append the original filename (without extension) to the new name.</li>
              </ul>
            </li>
            <li>A preview of the new filenames will be shown.</li>
            <li>Click "Rename & Download ZIP". The files will be renamed according to your pattern and downloaded as a ZIP archive.</li>
          </ol>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>This tool renames files by creating new copies within a ZIP archive; it does not modify your original local files. All operations are performed client-side.</p>
        </motion.div>
      </div>
    </>
  );
};

export default RenameMultipleFiles;
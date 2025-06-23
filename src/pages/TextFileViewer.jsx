import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { FileInput, UploadCloud, AlertCircle, Eye } from 'lucide-react';

const TextFileViewer = () => {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('text/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFileContent(e.target.result);
          setFileName(file.name);
          toast({ title: 'File Loaded', description: `${file.name} is ready to view.` });
        };
        reader.onerror = () => {
          toast({ title: 'Error Reading File', description: 'Could not read the selected file.', variant: 'destructive', action: <AlertCircle/> });
          setFileContent('');
          setFileName('');
        };
        reader.readAsText(file);
      } else {
        toast({ title: 'Invalid File Type', description: 'Please select a text file (e.g., .txt, .csv, .md, .log).', variant: 'destructive', action: <AlertCircle/> });
        setFileContent('');
        setFileName('');
      }
    }
    event.target.value = null; 
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>Text File Viewer - View TXT Files Online | Toolzenix</title>
        <meta name="description" content="View the content of text files (.txt, .csv, .md, .log, etc.) directly in your browser. No uploads, fast and secure." />
        <link rel="canonical" href="https://toolzenix.com/text-file-viewer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Eye className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Text File Viewer</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Quickly view the contents of your text files right here in your browser.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label htmlFor="file-upload-viewer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Text File to View:
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <Label
                    htmlFor="file-upload-viewer"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <Input id="file-upload-viewer" name="file-upload-viewer" type="file" className="sr-only" onChange={handleFileChange} accept="text/*,.txt,.csv,.md,.log,.json,.xml,.html,.css,.js" />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Any text-based file</p>
              </div>
            </div>
          </div>

          {fileName && (
             <h3 className="text-lg font-medium text-gray-900 dark:text-white">Viewing: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{fileName}</span></h3>
          )}
          
          <div>
            <Label htmlFor="file-content-area" className="text-gray-700 dark:text-gray-300">File Content:</Label>
            <Textarea 
              id="file-content-area" 
              value={fileContent} 
              readOnly 
              placeholder="Upload a text file to see its content here..." 
              rows={15} 
              className="mt-1 w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 font-mono text-sm p-4"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How to Use the Text File Viewer</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click "Upload a file" or drag and drop a text file (e.g., .txt, .csv, .md, .log, .json, .xml) into the designated area.</li>
            <li>The content of the selected file will be displayed in the text area below.</li>
            <li>The viewer is read-only; you cannot edit the content here.</li>
          </ol>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>All file processing happens locally in your browser. Your files are not uploaded to any server. Large files might take a moment to load or could impact browser performance.</p>
        </motion.div>
      </div>
    </>
  );
};

export default TextFileViewer;
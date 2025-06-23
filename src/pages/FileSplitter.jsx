import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { FileOutput, UploadCloud, AlertCircle, Download, Scissors } from 'lucide-react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const FileSplitter = () => {
  const [file, setFile] = useState(null);
  const [splitType, setSplitType] = useState('lines');
  const [splitValue, setSplitValue] = useState('100');
  const [isSplitting, setIsSplitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('text/')) {
      setFile(selectedFile);
    } else {
      toast({ title: 'Invalid File Type', description: 'Please select a text file (e.g., .txt, .csv). Binary file splitting is not supported.', variant: 'destructive', action: <AlertCircle/> });
      setFile(null);
    }
    event.target.value = null; 
  };

  const splitFile = useCallback(async () => {
    if (!file) {
      toast({ title: 'No File Selected', description: 'Please select a text file to split.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }
    if (!splitValue || parseInt(splitValue) <= 0) {
      toast({ title: 'Invalid Split Value', description: 'Please enter a positive value for splitting.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }

    setIsSplitting(true);

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const zip = new JSZip();
      const baseFileName = file.name.substring(0, file.name.lastIndexOf('.'));
      const extension = file.name.substring(file.name.lastIndexOf('.'));
      let partNumber = 1;

      try {
        if (splitType === 'lines') {
          const lines = content.split(/\r\n|\r|\n/);
          const linesPerChunk = parseInt(splitValue);
          for (let i = 0; i < lines.length; i += linesPerChunk) {
            const chunk = lines.slice(i, i + linesPerChunk).join('\n');
            zip.file(`${baseFileName}_part${partNumber}${extension}`, chunk);
            partNumber++;
          }
        } else {
          const sizePerChunkKB = parseInt(splitValue);
          const sizePerChunkBytes = sizePerChunkKB * 1024;
          let currentPosition = 0;
          while (currentPosition < content.length) {
            let endPosition = currentPosition + sizePerChunkBytes;
            if (endPosition < content.length) {
                let nextNewline = content.indexOf('\n', endPosition);
                if(nextNewline !== -1) endPosition = nextNewline + 1;
            }
            const chunk = content.substring(currentPosition, endPosition);
            zip.file(`${baseFileName}_part${partNumber}${extension}`, chunk);
            currentPosition = endPosition;
            partNumber++;
             if (partNumber > 1000) {
                toast({ title: 'Too Many Parts', description: 'Splitting resulted in too many parts. Please adjust split value.', variant: 'destructive'});
                setIsSplitting(false);
                return;
            }
          }
        }

        if (partNumber === 1 && splitType === 'size' && content.length <= parseInt(splitValue) * 1024) {
             toast({ title: 'File Not Split', description: 'File is smaller than the specified split size. Original file content is zipped.', variant: 'default' });
             zip.file(file.name, content);
        } else if (partNumber === 1 && splitType === 'lines' && content.split(/\r\n|\r|\n/).length <= parseInt(splitValue)) {
             toast({ title: 'File Not Split', description: 'File has fewer lines than specified. Original file content is zipped.', variant: 'default' });
             zip.file(file.name, content);
        }

        const zipContent = await zip.generateAsync({ type: 'blob' });
        saveAs(zipContent, `${baseFileName}_parts.zip`);
        toast({ title: 'Split Successful!', description: `File split into ${partNumber -1} parts and zipped.` });
        setFile(null);

      } catch (error) {
        console.error("Splitting error:", error);
        toast({ title: 'Splitting Failed', description: `An error occurred: ${error.message}`, variant: 'destructive', action: <AlertCircle/> });
      } finally {
        setIsSplitting(false);
      }
    };
    reader.readAsText(file);
  }, [file, splitType, splitValue, toast]);

  return (
    <>
      <Helmet>
        <title>File Splitter - Split Text Files | Toolzenix</title>
        <meta name="description" content="Split large text files into smaller parts based on line count or approximate size. Client-side processing for privacy." />
        <link rel="canonical" href="https://toolzenix.com/file-splitter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Scissors className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">File Splitter (Text Files)</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Divide large text files into smaller, manageable parts.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label htmlFor="file-upload-splitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Text File to Split:
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <Label
                    htmlFor="file-upload-splitter"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                  >
                    <span>Upload a file</span>
                    <Input id="file-upload-splitter" name="file-upload-splitter" type="file" className="sr-only" onChange={handleFileChange} accept="text/*,.csv,.log" />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Text files (.txt, .csv, .log, etc.)</p>
              </div>
            </div>
          </div>

          {file && (
            <p className="text-sm text-gray-700 dark:text-gray-300">Selected: <span className="font-medium">{file.name}</span></p>
          )}

          <div>
            <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Split By:</Label>
            <RadioGroup value={splitType} onValueChange={setSplitType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lines" id="split-lines" className="text-yellow-600 border-yellow-300 dark:text-yellow-400 dark:border-yellow-500"/>
                <Label htmlFor="split-lines" className="text-gray-700 dark:text-gray-300">Number of Lines</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="size" id="split-size" className="text-yellow-600 border-yellow-300 dark:text-yellow-400 dark:border-yellow-500"/>
                <Label htmlFor="split-size" className="text-gray-700 dark:text-gray-300">Approximate Size (KB)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="split-value" className="text-gray-700 dark:text-gray-300">
              {splitType === 'lines' ? 'Lines per Part:' : 'Approx. Size per Part (KB):'}
            </Label>
            <Input 
              id="split-value" 
              type="number" 
              value={splitValue}
              onChange={(e) => setSplitValue(e.target.value)}
              placeholder={splitType === 'lines' ? "e.g., 1000" : "e.g., 1024"}
              className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" 
              min="1"
            />
          </div>
          

          <Button 
            onClick={splitFile} 
            disabled={isSplitting || !file}
            className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
          >
            {isSplitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                ></motion.div>
                Splitting...
              </>
            ) : (
              <>
                <FileOutput className="mr-2 h-5 w-5" /> Split File & Download ZIP
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
          <h2 className="text-2xl font-semibold">How to Split Files</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Upload a text file (.txt, .csv, .log, etc.). Binary file splitting is not supported.</li>
            <li>Choose whether to split by a specific number of lines or by an approximate size in kilobytes (KB).</li>
            <li>Enter the desired value for lines per part or size per part.</li>
            <li>Click "Split File & Download ZIP". The tool will generate multiple smaller files, packaged in a ZIP archive.</li>
          </ol>
           <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>This tool is designed for text files. Splitting by size is approximate and aims to preserve line integrity. All processing is done in your browser.</p>
        </motion.div>
      </div>
    </>
  );
};

export default FileSplitter;
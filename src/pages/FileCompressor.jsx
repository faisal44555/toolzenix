import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileArchive, UploadCloud, AlertCircle, Download, Trash2, CheckCircle } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const FileCompressor = () => {
  const [files, setFiles] = useState([]);
  const [zipName, setZipName] = useState('compressed_files');
  const [isCompressing, setIsCompressing] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    event.target.value = null;
  };

  const removeFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const compressFiles = useCallback(async () => {
    if (files.length === 0) {
      toast({
        title: 'No Files Selected',
        description: 'Please select one or more files to compress.',
        variant: 'destructive',
        action: <AlertCircle/>
      });
      return;
    }

    setIsCompressing(true);

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    const zip = new JSZip();

    files.forEach(file => {
      zip.file(file.name, file);
    });

    try {
      const content = await zip.generateAsync({ type: 'blob', compression: "DEFLATE", compressionOptions: { level: 9 } });
      saveAs(content, `${zipName || 'compressed_files'}.zip`);
      toast({
        title: 'Compression Successful!',
        description: `Files compressed into ${zipName || 'compressed_files'}.zip`,
        action: <CheckCircle className="text-green-500" />
      });
      setFiles([]);
    } catch (error) {
      console.error("Compression error:", error);
      toast({
        title: 'Compression Failed',
        description: 'An error occurred while compressing files. Please try again.',
        variant: 'destructive',
        action: <AlertCircle/>
      });
    } finally {
      setIsCompressing(false);
    }
  }, [files, zipName, toast]);

  return (
    <>
      <Helmet>
        <title>File Compressor - Compress Files to ZIP | Toolzenix</title>
        <meta name="description" content="Compress multiple files into a single ZIP archive directly in your browser. Fast, secure, and no uploads required." />
        <link rel="canonical" href="https://toolzenix.com/file-compressor" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <FileArchive className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">File Compressor (ZIP)</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Compress your files into a ZIP archive locally in your browser.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div>
            <Label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Files to Compress:
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <Label
                    htmlFor="file-upload-compressor"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload files</span>
                    <Input id="file-upload-compressor" name="file-upload-compressor" type="file" className="sr-only" multiple onChange={handleFileChange} />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Any files, up to your browser's limit</p>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Selected Files:</h3>
              <ul className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <FileArchive className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
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
            <Label htmlFor="zip-name" className="text-gray-700 dark:text-gray-300">ZIP File Name (without .zip)</Label>
            <Input 
              id="zip-name" 
              type="text" 
              value={zipName}
              onChange={(e) => setZipName(e.target.value.replace(/\.zip$/, ''))}
              placeholder="compressed_files"
              className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" 
            />
          </div>

          <Button 
            onClick={compressFiles} 
            disabled={isCompressing || files.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 text-lg font-semibold disabled:opacity-50"
          >
            {isCompressing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                ></motion.div>
                Compressing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" /> Compress & Download ZIP
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
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <p>
            This File Compressor tool uses the JSZip library to create ZIP archives directly in your web browser. 
            Your files are processed locally and are never uploaded to any server, ensuring your privacy and security.
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click "Upload files" or drag and drop files into the designated area. You can select multiple files.</li>
            <li>Optionally, provide a custom name for your ZIP file. If left blank, it defaults to "compressed_files".</li>
            <li>Click "Compress & Download ZIP". The tool will compress the files and initiate a download of the .zip archive.</li>
          </ol>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>Compression speed and maximum file size depend on your browser and device capabilities. Large files may take some time to process.</p>
        </motion.div>
      </div>
    </>
  );
};

export default FileCompressor;
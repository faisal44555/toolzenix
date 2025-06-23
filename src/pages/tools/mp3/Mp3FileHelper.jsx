import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, DownloadCloud, FileAudio, Info, AlertTriangle, Trash2 } from 'lucide-react';
import ToolPageLayout from '@/components/layout/ToolPageLayout';

const Mp3FileHelper = () => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'audio/mpeg') {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        if (fileUrl) {
          URL.revokeObjectURL(fileUrl); // Revoke old URL
        }
        const newUrl = URL.createObjectURL(selectedFile);
        setFileUrl(newUrl);
        toast({ title: "File Ready", description: `${selectedFile.name} is ready for download or use.` });
      } else {
        toast({ title: "Invalid File", description: "Please upload an MP3 file.", variant: "destructive" });
        clearSelection();
      }
    }
  };

  const handleDownload = () => {
    if (!file || !fileUrl) {
      toast({ title: "No File", description: "Please upload an MP3 file first.", variant: "destructive" });
      return;
    }
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // URL.revokeObjectURL(fileUrl) should not be called here if we want to keep the link active for multiple downloads
    // It will be revoked when a new file is uploaded or component unmounts.
    toast({ title: "Download Started", description: `Downloading ${fileName}.` });
  };
  
  const clearSelection = () => {
    setFile(null);
    setFileName('');
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  // Cleanup URL on unmount
  React.useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  return (
    <ToolPageLayout
      pageTitle="Upload MP3"
      pageDescription="Easily upload and download MP3 files. A simple utility for managing your audio files in the browser."
      canonicalPath="/mp3-file-helper"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto"
      >
        <div className="flex flex-col items-center mb-6">
          <FileAudio className="w-12 h-12 text-red-500 dark:text-red-400 mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Upload MP3</h2>
        </div>

        <div className="mb-6">
          <Label htmlFor="mp3HelperFile" className="sr-only">Upload MP3</Label>
          <div
            className="flex items-center justify-center w-full px-4 py-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-red-500 dark:hover:border-red-400 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileChange({ target: { files: e.dataTransfer.files }});
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Click to upload</span> or drag & drop MP3
              </p>
              {fileName && <p className="text-xs text-red-600 dark:text-red-400 mt-1 truncate max-w-xs mx-auto">{fileName}</p>}
            </div>
          </div>
          <Input
            id="mp3HelperFile"
            type="file"
            accept=".mp3"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {file && (
          <motion.div 
            initial={{ opacity: 0, scale:0.9}} 
            animate={{ opacity: 1, scale:1}} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6"
          >
            <Button 
              onClick={handleDownload} 
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white py-3 px-6 text-base"
            >
              <DownloadCloud className="w-5 h-5 mr-2" /> Download "{fileName}"
            </Button>
            <Button variant="outline" onClick={clearSelection} className="w-full sm:w-auto">
              <Trash2 className="w-4 h-4 mr-2" /> Clear Selection
            </Button>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-4 bg-red-50 dark:bg-slate-700/50 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" /> Tool Usage
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This tool helps you quickly upload an MP3 file and then download it. This can be useful if you need to confirm a file is correctly formatted or if another tool on this site requires an MP3 upload.
          </p>
           <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            <AlertTriangle className="w-3 h-3 inline mr-1"/> Your file is processed in your browser and not sent to any server.
          </p>
        </motion.div>

      </motion.div>
    </ToolPageLayout>
  );
};

export default Mp3FileHelper;
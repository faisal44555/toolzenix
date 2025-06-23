import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, DownloadCloud, Edit3, Info, AlertTriangle, Trash2, Link as LinkIcon } from 'lucide-react';
import ToolPageLayout from '@/components/layout/ToolPageLayout';
import { Link } from 'react-router-dom';

const Mp3Renamer = () => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [originalFileName, setOriginalFileName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'audio/mpeg') {
        setFile(selectedFile);
        setOriginalFileName(selectedFile.name);
        const nameWithoutExtension = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.')) || selectedFile.name;
        setNewFileName(nameWithoutExtension); 
        toast({ title: "File Ready", description: `${selectedFile.name} is ready to be renamed.` });
      } else {
        toast({ title: "Invalid File", description: "Please upload an MP3 file.", variant: "destructive" });
        clearSelection();
      }
    }
  };

  const handleNewFileNameChange = (event) => {
    setNewFileName(event.target.value);
  };

  const handleRenameAndDownload = () => {
    if (!file) {
      toast({ title: "No File", description: "Please upload an MP3 file first.", variant: "destructive" });
      return;
    }
    if (!newFileName.trim()) {
      toast({ title: "No New Name", description: "Please enter a new file name.", variant: "destructive" });
      return;
    }

    let finalNewName = newFileName.trim();
    if (!finalNewName.toLowerCase().endsWith('.mp3')) {
      finalNewName += '.mp3';
    }
    
    finalNewName = finalNewName.replace(/[<>:"/\\|?*]+/g, '_');

    const blob = new Blob([file], { type: file.type });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = finalNewName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    toast({ title: "Download Started", description: `Downloading as ${finalNewName}.` });
  };

  const clearSelection = () => {
    setFile(null);
    setOriginalFileName('');
    setNewFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <>
      <Helmet>
        <title>MP3 File Renamer - Quick & Secure | Toolzenix</title>
        <meta name="description" content="Easily rename your MP3 files online. Upload, enter a new name, and download. Secure, client-side processing for your audio files." />
        <link rel="canonical" href="https://toolzenix.com/mp3-renamer" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg mx-auto"
      >
        <div className="flex flex-col items-center mb-6">
          <Edit3 className="w-12 h-12 text-green-500 dark:text-green-400 mb-3" />
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">MP3 File Renamer</h1>
        </div>

        <div className="mb-6">
          <Label htmlFor="mp3FileRename" className="sr-only">Upload MP3</Label>
          <div
            className="flex items-center justify-center w-full px-4 py-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-green-500 dark:hover:border-green-400 transition-colors"
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
              {originalFileName && <p className="text-xs text-green-600 dark:text-green-400 mt-1 truncate max-w-xs mx-auto">Selected: {originalFileName}</p>}
            </div>
          </div>
          <Input
            id="mp3FileRename"
            type="file"
            accept=".mp3"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {file && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mb-6">
            <div>
              <Label htmlFor="newFileName" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">New File Name (without .mp3 extension)</Label>
              <Input
                id="newFileName"
                type="text"
                value={newFileName}
                onChange={handleNewFileNameChange}
                placeholder="Enter new name"
                className="border-gray-300 dark:border-slate-600 focus:ring-green-500 focus:border-green-500 dark:bg-slate-700 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">.mp3 extension will be added automatically if not provided.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={handleRenameAndDownload} 
                  disabled={!newFileName.trim()}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 px-6 text-base"
                >
                  <DownloadCloud className="w-5 h-5 mr-2" /> Rename & Download
                </Button>
                 <Button variant="outline" onClick={clearSelection} className="w-full sm:w-auto">
                    <Trash2 className="w-4 h-4 mr-2" /> Clear
                </Button>
            </div>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-4 bg-green-50 dark:bg-slate-700/50 rounded-lg"
        >
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center">
            <Info className="w-5 h-5 mr-2" /> How It Works
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            This MP3 Renamer tool allows you to quickly change the filename of your MP3 audio files directly in your browser. It's a simple process:
          </p>
          <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1 mb-3">
            <li><strong>Upload Your MP3:</strong> Click the upload area or drag and drop your MP3 file.</li>
            <li><strong>Enter New Name:</strong> Type the desired new name for your file. The ".mp3" extension is optional; it will be added if missing.</li>
            <li><strong>Download:</strong> Click "Rename & Download". Your browser will download the file with the new name.</li>
          </ol>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-start">
            <AlertTriangle className="w-4 h-4 inline mr-1.5 mt-0.5 flex-shrink-0"/> 
            <span>Your file is processed entirely within your browser. It is <strong>not uploaded to any server</strong>, ensuring your privacy and data security. This client-side approach makes the process fast and secure.</span>
          </p>
           <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
            For more audio utilities, explore our main <Link to="/mp3-tools" className="text-green-600 dark:text-green-400 hover:underline">MP3 Tools category</Link>. If you need to convert your audio files, check out the <Link to="/mp3-base64-converter" className="text-green-600 dark:text-green-400 hover:underline">MP3 to Base64 Converter</Link>.
          </p>
        </motion.div>

      </motion.div>
    </>
  );
};

export default Mp3Renamer;
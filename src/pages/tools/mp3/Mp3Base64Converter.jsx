import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, DownloadCloud, ArrowRightLeft, Copy, Trash2, FileAudio, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import ToolPageLayout from '@/components/layout/ToolPageLayout';

const Mp3Base64Converter = () => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [base64String, setBase64String] = useState('');
  const [conversionMode, setConversionMode] = useState('toBase64'); // 'toBase64' or 'toMp3'
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (conversionMode === 'toBase64' && selectedFile.type !== 'audio/mpeg') {
        toast({ title: "Invalid File", description: "Please upload an MP3 file for Base64 encoding.", variant: "destructive" });
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      if (conversionMode === 'toBase64') setBase64String(''); // Clear previous Base64 if new file for encoding
    }
  };

  const handleBase64InputChange = (event) => {
    setBase64String(event.target.value);
    if (conversionMode === 'toMp3') setFile(null); // Clear file if new Base64 for decoding
  };

  const convertFileToBase64 = () => {
    if (!file) {
      toast({ title: "No File", description: "Please upload an MP3 file first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64String(reader.result.split(',')[1]); // Get only Base64 part
      setIsLoading(false);
      toast({ title: "Converted to Base64", description: `${fileName} successfully encoded.` });
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
      toast({ title: "Conversion Error", description: "Could not convert file to Base64.", variant: "destructive" });
      setIsLoading(false);
    };
  };

  const convertBase64ToMp3 = () => {
    if (!base64String.trim()) {
      toast({ title: "No Base64 String", description: "Please enter a Base64 string first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/mpeg' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName || 'decoded.mp3'; // Use original filename if available, else default
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      setIsLoading(false);
      toast({ title: "Converted to MP3", description: "MP3 file download started." });
    } catch (error) {
      console.error("Error converting Base64 to MP3:", error);
      toast({ title: "Conversion Error", description: "Invalid Base64 string or error during conversion.", variant: "destructive" });
      setIsLoading(false);
    }
  };
  
  const handleConvert = () => {
    if (conversionMode === 'toBase64') {
      convertFileToBase64();
    } else {
      convertBase64ToMp3();
    }
  };
  
  const handleCopyBase64 = async () => {
    if (!base64String) {
      toast({ title: 'Nothing to Copy', description: 'Base64 output is empty.', variant: 'destructive' });
      return;
    }
    try {
      await navigator.clipboard.writeText(base64String);
      toast({ title: 'Copied to Clipboard!', description: 'Base64 string copied.' });
    } catch (err) {
      toast({ title: 'Copy Failed', description: 'Could not copy Base64 string.', variant: 'destructive' });
    }
  };

  const clearFields = () => {
    setFile(null);
    setFileName('');
    setBase64String('');
    setIsLoading(false);
    if(fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <ToolPageLayout
      pageTitle="MP3 to Base64 Converter"
      pageDescription="Convert MP3 files to Base64 strings and vice-versa. Useful for data embedding or transmission. Client-side and secure."
      canonicalPath="/mp3-base64-converter"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-2xl mx-auto"
      >
        <div className="flex flex-col items-center mb-6">
          <FileAudio className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">MP3 &harr; Base64 Converter</h2>
        </div>

        <div className="mb-6">
          <Label htmlFor="conversionModeSelect" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Conversion Mode</Label>
          <Select value={conversionMode} onValueChange={(value) => { setConversionMode(value); clearFields(); }}>
            <SelectTrigger id="conversionModeSelect" className="w-full dark:bg-slate-700 dark:border-slate-600">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toBase64">MP3 to Base64</SelectItem>
              <SelectItem value="toMp3">Base64 to MP3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {conversionMode === 'toBase64' && (
          <div className="mb-6">
            <Label htmlFor="mp3FileToBase64" className="sr-only">Upload MP3</Label>
            <div
              className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center">
                <UploadCloud className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500" />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Click to upload MP3</span>
                </p>
                {fileName && <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 truncate max-w-xs mx-auto">{fileName}</p>}
              </div>
            </div>
            <Input
              id="mp3FileToBase64"
              type="file"
              accept=".mp3"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
        )}

        {conversionMode === 'toMp3' && (
          <div className="mb-6">
            <Label htmlFor="base64InputForMp3" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Base64 String</Label>
            <Textarea
              id="base64InputForMp3"
              value={base64String}
              onChange={handleBase64InputChange}
              placeholder="Paste Base64 string here..."
              className="h-32 sm:h-40 text-sm border-gray-300 dark:border-slate-600 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white"
            />
             <div className="mt-2 flex justify-end space-x-2">
              <Button variant="ghost" size="sm" onClick={handleCopyBase64} title="Copy Base64 String" disabled={!base64String}>
                <Copy className="w-4 h-4 mr-1" /> Copy
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4">
            <Button 
              onClick={handleConvert} 
              disabled={isLoading || (conversionMode === 'toBase64' && !file) || (conversionMode === 'toMp3' && !base64String.trim())}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 text-base"
            >
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
              ) : (
                conversionMode === 'toBase64' ? <ArrowRightLeft className="w-5 h-5 mr-2" /> : <DownloadCloud className="w-5 h-5 mr-2" />
              )}
              {isLoading ? 'Processing...' : (conversionMode === 'toBase64' ? 'Convert to Base64' : 'Convert to MP3 & Download')}
            </Button>
            <Button variant="outline" onClick={clearFields} className="w-full sm:w-auto">
              <Trash2 className="w-4 h-4 mr-2"/> Clear
            </Button>
        </div>


        {conversionMode === 'toBase64' && base64String && (
          <div className="mt-6">
            <Label htmlFor="base64Output" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Base64 Output</Label>
            <Textarea
              id="base64Output"
              value={base64String}
              readOnly
              className="h-32 sm:h-40 text-sm bg-gray-50 dark:bg-slate-900 border-gray-300 dark:border-slate-600 dark:text-white"
            />
            <div className="mt-2 flex justify-end">
              <Button variant="ghost" size="sm" onClick={handleCopyBase64} title="Copy Base64 String">
                <Copy className="w-4 h-4 mr-1" /> Copy Output
              </Button>
            </div>
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-4 bg-indigo-50 dark:bg-slate-700/50 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" /> How It Works
          </h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>Select mode: 'MP3 to Base64' or 'Base64 to MP3'.</li>
            <li>If 'MP3 to Base64': Upload your MP3 file. The Base64 string will be generated.</li>
            <li>If 'Base64 to MP3': Paste the Base64 string. Click convert to download the MP3.</li>
          </ol>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            <AlertTriangle className="w-3 h-3 inline mr-1"/> Your files and data are processed client-side and are not uploaded.
          </p>
        </motion.div>

      </motion.div>
    </ToolPageLayout>
  );
};

export default Mp3Base64Converter;
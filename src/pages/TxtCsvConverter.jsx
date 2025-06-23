import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { FileText, UploadCloud, AlertCircle, Download, RefreshCw, CheckCircle } from 'lucide-react';
import { saveAs } from 'file-saver';

const TxtCsvConverter = () => {
  const [inputFile, setInputFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fromFormat, setFromFormat] = useState('txt');
  const [toFormat, setToFormat] = useState('csv');
  const [delimiter, setDelimiter] = useState(',');
  const [customDelimiter, setCustomDelimiter] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('text/')) {
        toast({ title: 'Invalid File', description: 'Please upload a text-based file (.txt, .csv).', variant: 'destructive', action: <AlertCircle /> });
        return;
      }
      setInputFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setInputText(e.target.result);
      reader.readAsText(file);
    }
    event.target.value = null; 
  };

  const handleConvert = useCallback(() => {
    if (!inputText) {
      toast({ title: 'No Input', description: 'Please enter text or upload a file.', variant: 'destructive', action: <AlertCircle /> });
      return;
    }

    const effectiveDelimiter = delimiter === 'custom' ? customDelimiter : delimiter;
    if ((fromFormat === 'txt' && toFormat === 'csv' && !effectiveDelimiter) || (fromFormat === 'csv' && toFormat === 'txt' && !effectiveDelimiter)) {
        toast({ title: 'Delimiter Missing', description: 'Please specify a delimiter.', variant: 'destructive', action: <AlertCircle /> });
        return;
    }

    try {
      let result = '';
      if (fromFormat === 'txt' && toFormat === 'csv') {
        const lines = inputText.split(/\r\n|\r|\n/).filter(line => line.trim() !== '');
        result = lines.map(line => `"${line.replace(/"/g, '""')}"`).join('\n');
      } else if (fromFormat === 'csv' && toFormat === 'txt') {
        const lines = inputText.split(/\r\n|\r|\n/).filter(line => line.trim() !== '');
        result = lines.map(line => {
            return line.split(effectiveDelimiter).map(cell => cell.replace(/^"|"$/g, '').trim()).join(' ');
        }).join('\n');
      } else {
        toast({ title: 'Invalid Conversion', description: 'Selected conversion path is not supported or identical.', variant: 'destructive', action: <AlertCircle /> });
        return;
      }
      setOutputText(result);
      toast({ title: 'Conversion Successful!', description: `Converted from ${fromFormat.toUpperCase()} to ${toFormat.toUpperCase()}.`, action: <CheckCircle className="text-green-500" /> });
    } catch (error) {
      console.error("Conversion error:", error);
      toast({ title: 'Conversion Failed', description: 'An error occurred during conversion.', variant: 'destructive', action: <AlertCircle /> });
    }
  }, [inputText, fromFormat, toFormat, delimiter, customDelimiter, toast]);
  
  const handleDownload = () => {
    if (!outputText) {
      toast({ title: 'No Output', description: 'Please convert text first.', variant: 'destructive', action: <AlertCircle /> });
      return;
    }

    toast({
      title: "Downloading file...",
      description: "See notification for download status.",
      duration: 3000,
    });

    const blob = new Blob([outputText], { type: `text/${toFormat === 'csv' ? 'csv' : 'plain'};charset=utf-8` });
    const fileName = `${inputFile ? inputFile.name.split('.')[0] : 'converted'}_to_${toFormat}.${toFormat}`;
    saveAs(blob, fileName);
  };

  const handleSwitchFormats = () => {
    setFromFormat(toFormat);
    setToFormat(fromFormat);
  };

  return (
    <>
      <Helmet>
        <title>TXT to CSV Converter (and vice-versa) | Toolzenix</title>
        <meta name="description" content="Convert text files between TXT and CSV formats directly in your browser. Specify delimiters and handle conversions easily." />
        <link rel="canonical" href="https://toolzenix.com/txt-csv-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <FileText className="w-16 h-16 text-teal-500 dark:text-teal-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">TXT &harr; CSV Converter</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert text between TXT and CSV formats.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-1">
              <Label htmlFor="from-format" className="text-gray-700 dark:text-gray-300">From</Label>
              <select id="from-format" value={fromFormat} onChange={e => setFromFormat(e.target.value)} className="w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <option value="txt">TXT</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div className="flex justify-center items-end">
                <Button onClick={handleSwitchFormats} variant="outline" className="p-2 dark:border-gray-600 dark:text-gray-300"><RefreshCw size={20}/></Button>
            </div>
            <div className="md:col-span-1">
              <Label htmlFor="to-format" className="text-gray-700 dark:text-gray-300">To</Label>
              <select id="to-format" value={toFormat} onChange={e => setToFormat(e.target.value)} className="w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <option value="csv">CSV</option>
                <option value="txt">TXT</option>
              </select>
            </div>
          </div>
          
          <div>
             <Label htmlFor="delimiter" className="text-gray-700 dark:text-gray-300">Delimiter (for CSV)</Label>
             <div className="flex items-center space-x-2 mt-1">
                 <select id="delimiter" value={delimiter} onChange={e => setDelimiter(e.target.value)} className="p-2 border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <option value=",">Comma (,)</option>
                    <option value=";">Semicolon (;)</option>
                    <option value="\t">Tab</option>
                    <option value="|">Pipe (|)</option>
                    <option value="custom">Custom</option>
                 </select>
                 {delimiter === 'custom' && (
                    <Input type="text" value={customDelimiter} onChange={e => setCustomDelimiter(e.target.value)} placeholder="Custom" className="w-24 dark:bg-gray-700 dark:text-white dark:border-gray-600"/>
                 )}
             </div>
          </div>

          <div>
            <Label htmlFor="file-upload-txtcsv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload File (Optional):
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <Label
                    htmlFor="file-upload-txtcsv"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                  >
                    <span>Upload a file</span>
                    <Input id="file-upload-txtcsv" name="file-upload-txtcsv" type="file" className="sr-only" onChange={handleFileChange} accept=".txt,.csv,.text" />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">.txt, .csv files</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="input-text" className="text-gray-700 dark:text-gray-300">Input Text ({fromFormat.toUpperCase()})</Label>
              <Textarea id="input-text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={`Paste your ${fromFormat.toUpperCase()} content here...`} rows={8} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <Label htmlFor="output-text" className="text-gray-700 dark:text-gray-300">Output Text ({toFormat.toUpperCase()})</Label>
              <Textarea id="output-text" value={outputText} readOnly placeholder={`Converted ${toFormat.toUpperCase()} will appear here...`} rows={8} className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleConvert} className="flex-1 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white py-3 text-lg font-semibold">
              <RefreshCw className="mr-2 h-5 w-5" /> Convert
            </Button>
            <Button onClick={handleDownload} disabled={!outputText} className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 text-lg font-semibold disabled:opacity-50">
              <Download className="mr-2 h-5 w-5" /> Download Output
            </Button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How to Use TXT/CSV Converter</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Select the input format (TXT or CSV) and the desired output format.</li>
            <li>Choose the delimiter used in your CSV data (comma, semicolon, tab, pipe, or custom).</li>
            <li>Paste your text into the "Input Text" area or upload a file.</li>
            <li>Click "Convert". The converted text will appear in the "Output Text" area.</li>
            <li>Click "Download Output" to save the converted text as a file.</li>
          </ol>
          <p className="text-sm"><strong>Note on TXT to CSV:</strong> A simple TXT to CSV conversion treats each line of the TXT input as a single cell in a new row of the CSV output. The cell content will be enclosed in double quotes to ensure CSV integrity. For more complex TXT structures, manual formatting might be needed before or after conversion.</p>
          <p className="text-sm"><strong>Note on CSV to TXT:</strong> A simple CSV to TXT conversion replaces the specified delimiter with spaces and removes surrounding quotes from cells. This basic parser might not correctly handle CSV files with newlines or delimiters within quoted fields.</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/>This tool uses basic parsing. For very complex CSV files or specific TXT structures, results may vary. Always verify the output for critical applications.</p>
        </motion.div>
      </div>
    </>
  );
};

export default TxtCsvConverter;
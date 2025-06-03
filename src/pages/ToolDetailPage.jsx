
    import React, { useState, useCallback, useMemo } from 'react';
    import { useParams } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { UploadCloud, Settings, FileWarning, Download, CheckCircle, XCircle, Hash } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast.js';
    import { allToolsData } from '@/lib/toolsData.jsx';
    import { NotFoundPage } from '@/pages/NotFoundPage';
    import { 
      getToolDisplayName, 
      createMockConvertedFile, 
      handleMockDownload,
      handleFileSelect,
      handleFileDrop,
      MAX_FILE_SIZE_MB,
    } from '@/lib/toolUtils.js';

    export function ToolDetailPage() {
      const { categoryId, toolId } = useParams();
      const { toast } = useToast();
      const [selectedFile, setSelectedFile] = useState(null);
      const [isConverting, setIsConverting] = useState(false);
      const [convertedFile, setConvertedFile] = useState(null);
      const [error, setError] = useState(null);
      const [isDragOver, setIsDragOver] = useState(false);

      const category = useMemo(() => allToolsData[categoryId], [categoryId]);
      const tool = useMemo(() => category?.tools.find(t => t.id === toolId), [category, toolId]);
      
      const toolDisplayName = useMemo(() => getToolDisplayName(toolId, categoryId), [toolId, categoryId]);
      const isHashGenerator = useMemo(() => categoryId === 'hash', [categoryId]);

      const resetConversionState = useCallback(() => {
        setConvertedFile(null);
        setError(null);
      }, []);

      const onFileSelected = useCallback((file) => {
        setSelectedFile(file);
        resetConversionState();
      }, [resetConversionState]);

      const onFileError = useCallback((errorMessage) => {
        setError(errorMessage);
        setSelectedFile(null);
        toast({
          title: 'File Error',
          description: errorMessage,
          variant: 'destructive',
          duration: 4000,
        });
      }, [toast]);

      const onDownload = useCallback(() => {
        if (convertedFile && selectedFile) {
            handleMockDownload(convertedFile, selectedFile, toolDisplayName, category?.name || categoryId, toast);
        }
      }, [convertedFile, selectedFile, toolDisplayName, category, categoryId, toast]);
      
      const onDownloadFromToast = useCallback((mockFileToDownload) => {
        if (mockFileToDownload && selectedFile) {
            handleMockDownload(mockFileToDownload, selectedFile, toolDisplayName, category?.name || categoryId, toast);
        }
      }, [selectedFile, toolDisplayName, category, categoryId, toast]);

      const handleConversion = useCallback(async () => {
        if (!selectedFile) {
          toast({
            title: 'No file selected',
            description: 'Please select a file to process.',
            variant: 'destructive',
            duration: 3000,
          });
          return;
        }

        setIsConverting(true);
        setError(null);
        setConvertedFile(null);

        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000)); 

        try {
          const mockFileResult = createMockConvertedFile(selectedFile, toolId, categoryId);
          if (!mockFileResult) throw new Error("Could not create mock file.");
          
          localStorage.setItem(`converted_${mockFileResult.name}`, JSON.stringify({
            original: selectedFile.name,
            converted: mockFileResult,
            timestamp: new Date().toISOString(),
            tool: toolId,
            category: categoryId
          }));

          setConvertedFile(mockFileResult);
          toast({
            title: 'Processing Successful!',
            description: (
              <>
                {selectedFile.name} processed to {mockFileResult.name}.<br/>
                <Button variant="link" size="sm" className="p-0 h-auto text-primary hover:underline" onClick={(e) => { e.preventDefault(); onDownloadFromToast(mockFileResult); }}>
                  Download now
                </Button>
              </>
            ),
            variant: 'default', 
            duration: 5000,
          });
        } catch (e) {
          const errorMessage = e.message || 'Processing failed. Please check the file or try again.';
          setError(errorMessage);
          toast({
            title: 'Processing Error',
            description: errorMessage,
            variant: 'destructive',
            duration: 3000,
          });
        } finally {
          setIsConverting(false);
        }
      }, [selectedFile, toolId, categoryId, toast, onDownloadFromToast]);

      if (!category || !tool) {
        return <NotFoundPage message={`Tool "${toolId}" in category "${categoryId}" not found.`} />;
      }
      
      const handleFileChangeWrapper = (event) => {
        handleFileSelect(event, onFileSelected, onFileError);
      };

      const handleDropWrapper = (event) => {
        handleFileDrop(event, onFileSelected, onFileError, setIsDragOver);
      };

      const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(true);
      };

      const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);
      };
      
      const clearSelection = () => {
        setSelectedFile(null);
        resetConversionState();
      };

      return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 sm:mb-8">
              {toolDisplayName}
            </h1>

            {!selectedFile ? (
              <label 
                htmlFor="file-upload" 
                className={`w-full h-48 border-2 border-dashed border-slate-300 hover:border-blue-500 transition-all duration-300 rounded-xl flex flex-col justify-center items-center cursor-pointer bg-slate-50 hover:bg-blue-50 ${isDragOver ? 'border-blue-500 bg-blue-100 scale-105' : ''} relative group mb-6`}
                onDrop={handleDropWrapper}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <UploadCloud className={`h-12 w-12 mb-3 text-slate-400 group-hover:text-blue-500 transition-colors ${isDragOver ? 'text-blue-500' : ''}`} />
                <p className={`text-md font-semibold text-slate-600 group-hover:text-blue-600 ${isDragOver ? 'text-blue-600' : ''}`}>
                  {isHashGenerator ? 'Select file to hash' : 'Select file to convert'}
                </p>
                <p className="text-slate-500 text-xs">or click to browse</p>
                {MAX_FILE_SIZE_MB && <p className="text-slate-400 text-xs mt-1">(Max {MAX_FILE_SIZE_MB}MB)</p>}
                <input id="file-upload" type="file" onChange={handleFileChangeWrapper} className="hidden" />
              </label>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full p-4 bg-slate-100 rounded-xl shadow-inner text-center mb-6"
              >
                <p className="font-semibold text-slate-700 truncate" title={selectedFile.name}>{selectedFile.name}</p>
                <p className="text-xs text-slate-500 mb-2">({(selectedFile.size / 1024).toFixed(2)} KB)</p>
                <Button onClick={clearSelection} variant="outline" size="sm" className="text-xs border-slate-300 text-slate-600 hover:bg-slate-200">
                  Change file
                </Button>
              </motion.div>
            )}

            {error && !selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full p-3 rounded-md bg-red-100 text-red-700 text-sm flex items-center mb-6"
              >
                <FileWarning className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            
            <Button 
              onClick={handleConversion} 
              disabled={!selectedFile || isConverting}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-base mb-3 transition-colors duration-150 ease-in-out disabled:opacity-50"
            >
              {isConverting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="mr-2 inline-block"
                  >
                    <Settings className="h-5 w-5" />
                  </motion.div>
                  Processing...
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2 h-5 w-5 inline-block" />
                  {isHashGenerator ? 'Generate Hash' : 'Start Conversion'}
                </>
              )}
            </Button>

            <AnimatePresence>
              {convertedFile && selectedFile && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200"
                >
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-700 mb-1">{isHashGenerator ? "Hash Generated!" : "Conversion Complete!"}</h3>
                  <p className="text-xs text-slate-600 mb-3">Output: <span className="font-medium">{convertedFile.name}</span></p>
                  <Button 
                    onClick={onDownload}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-base transition-colors duration-150 ease-in-out"
                  >
                    <Download className="mr-2 h-5 w-5 inline-block" />
                    {isHashGenerator ? "Download Hash File" : "Download Converted File"}
                  </Button>
                </motion.div>
              )}
              {error && convertedFile === null && selectedFile && ( // Show processing error if a file was selected
                 <motion.div
                    key="process-error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200"
                 >
                    <XCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <h3 className="text-lg font-semibold text-red-700 mb-1">Processing Failed</h3>
                    <p className="text-xs text-slate-600">{error}</p>
                 </motion.div>
              )}
            </AnimatePresence>

            {!selectedFile && !convertedFile && !error && (
              <div className="mt-6 text-slate-500 text-sm">
                <p>{isHashGenerator ? "Select a file to generate its hash." : "Select a file and click 'Start Conversion'."}</p>
              </div>
            )}
          </motion.div>
        </div>
      );
    }
  

    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { CheckCircle, XCircle, Download, Hash, UploadCloud } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';
    
    export function ConversionResultArea({ error, convertedFile, selectedFile, handleDownload, isHashGenerator = false }) {
      const successTitle = isHashGenerator ? "Hash Generated!" : "Conversion Complete!";
      const downloadButtonText = isHashGenerator ? "Download Hash File" : "Download Converted File";
      const placeholderTitle = isHashGenerator ? "Ready to Generate Hash" : "Ready to Convert";
      const placeholderText = isHashGenerator 
        ? "Your generated hash will appear here once the process is complete."
        : "Your converted file will appear here once the process is complete.";
      const PlaceholderIcon = isHashGenerator ? Hash : UploadCloud;

      return (
        <AnimatePresence mode="wait">
          {error && !convertedFile && ( 
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md p-6 rounded-xl bg-red-100 text-red-700 text-center"
            >
              <XCircle className="h-12 w-12 mx-auto mb-3 text-red-500" />
              <h3 className="text-xl font-semibold mb-2">Processing Failed</h3>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {convertedFile && selectedFile && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
              className="w-full max-w-md p-6 md:p-8 rounded-xl bg-green-50 border border-green-200 text-center shadow-lg"
            >
              <CheckCircle className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-3 md:mb-4 text-green-500" />
              <h3 className="text-xl md:text-2xl font-semibold text-green-700 mb-1 md:mb-2">{successTitle}</h3>
              <p className="text-xs md:text-sm text-slate-600 mb-1">Original: <span className="font-medium text-slate-800">{selectedFile.name}</span></p>
              <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4">Output: <span className="font-medium text-slate-800">{convertedFile.name}</span> ({(convertedFile.size / 1024).toFixed(2)} KB)</p>
              <Button 
                onClick={() => handleDownload(convertedFile)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-base transition-colors duration-150 ease-in-out"
              >
                <Download className="mr-2 h-5 w-5 inline-block" />
                {downloadButtonText}
              </Button>
            </motion.div>
          )}

          {!error && !convertedFile && (
             <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-slate-500 p-4"
             >
                <PlaceholderIcon className="mx-auto mb-4 h-20 w-20 md:h-24 md:w-24 opacity-30" />
                <h3 className="text-lg md:text-xl font-semibold text-slate-600 mb-2">{placeholderTitle}</h3>
                <p className="text-xs md:text-sm">{placeholderText}</p>
             </motion.div>
          )}
        </AnimatePresence>
      );
    }
  
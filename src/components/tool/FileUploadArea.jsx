
    import React from 'react';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { UploadCloud, FileText, RotateCw } from 'lucide-react';
    import { motion } from 'framer-motion';

    export function FileUploadArea({ 
      selectedFile, 
      isDragOver, 
      onFileChange, 
      onDrop, 
      onDragOver, 
      onDragLeave, 
      onClearSelection,
      fileTypePrompt = "Drag & drop your file here",
      maxFileSizeMB
    }) {
      return (
        <>
          {!selectedFile ? (
            <label 
              htmlFor="file-upload" 
              className={`w-full max-w-md h-60 md:h-64 border-2 border-dashed border-slate-300 hover:border-blue-500 transition-all duration-300 rounded-xl flex flex-col justify-center items-center cursor-pointer bg-slate-50 hover:bg-blue-50 ${isDragOver ? 'border-blue-500 bg-blue-100 scale-105' : ''} relative group`}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              <UploadCloud className={`h-12 w-12 md:h-16 md:w-16 mb-3 text-slate-400 group-hover:text-blue-500 transition-colors ${isDragOver ? 'text-blue-500' : ''}`} />
              <p className={`text-md md:text-lg font-semibold text-slate-600 group-hover:text-blue-600 ${isDragOver ? 'text-blue-600' : ''}`}>{fileTypePrompt}</p>
              <p className="text-slate-500 text-xs md:text-sm">or click to browse</p>
              {maxFileSizeMB && <p className="text-slate-400 text-xs mt-2">(Max {maxFileSizeMB}MB)</p>}
              <Input id="file-upload" type="file" onChange={onFileChange} className="hidden" />
            </label>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md p-4 md:p-6 bg-slate-100 rounded-xl shadow-inner text-center"
            >
              <FileText className="h-10 w-10 md:h-12 md:w-12 text-blue-500 mx-auto mb-2 md:mb-3" />
              <p className="font-semibold text-slate-700 truncate text-sm md:text-base" title={selectedFile.name}>{selectedFile.name}</p>
              <p className="text-xs md:text-sm text-slate-500 mb-3 md:mb-4">({(selectedFile.size / 1024).toFixed(2)} KB)</p>
              <Button 
                onClick={onClearSelection} 
                variant="outline" 
                size="sm" 
                className="text-xs md:text-sm border-slate-300 text-slate-600 hover:bg-slate-200"
              >
                <RotateCw className="mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4"/> Change file
              </Button>
            </motion.div>
          )}
        </>
      );
    }
  
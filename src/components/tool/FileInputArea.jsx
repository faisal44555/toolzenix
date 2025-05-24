
    import React from 'react';
    import { Label } from '@/components/ui/label';
    import { Input } from '@/components/ui/input';
    import { UploadCloud } from 'lucide-react';
    import { motion } from 'framer-motion';

    export function FileInputArea({ title, specificText, acceptedTypes, handleFileChange, triggerFileInput, fileInputRef, selectedFile }) {
      return (
        <div>
          <Label htmlFor="file-upload" className="text-lg font-semibold mb-2 block">{title}</Label>
          <div 
            className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors"
            onClick={triggerFileInput}
          >
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="flex text-sm text-muted-foreground">
                <span className="text-primary font-semibold">Click to upload</span>
                <Input id="file-upload" name="file-upload" type="file" className="sr-only" accept={acceptedTypes} onChange={handleFileChange} ref={fileInputRef} />
              </div>
              <p className="text-xs text-muted-foreground">{specificText}</p>
            </div>
          </div>
          {selectedFile && (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-2 text-sm text-muted-foreground"
            >
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </motion.p>
          )}
        </div>
      );
    }
  
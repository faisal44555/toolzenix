
    import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Download } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';

    export function ConvertedImageDisplay({ convertedImage, handleDownload }) {
      return (
        <AnimatePresence>
          {convertedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pt-4 border-t"
            >
              <h3 className="text-lg font-semibold">Converted Image Preview:</h3>
              <img-replace src={convertedImage} alt="Converted image preview" className="max-w-full h-auto rounded-md border shadow-sm max-h-60 object-contain bg-slate-50" />
              <Button onClick={handleDownload} className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      );
    }
  
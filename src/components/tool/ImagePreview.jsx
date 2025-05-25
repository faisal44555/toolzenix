
    import React from 'react';
    import { motion, AnimatePresence } from 'framer-motion';

    export function ImagePreview({ src, alt, title }) {
      return (
        <AnimatePresence>
          {src && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {title && <h3 className="text-md font-semibold mb-2">{title}</h3>}
              <img-replace src={src} alt={alt} className="max-w-full h-auto rounded-md border shadow-sm max-h-60 object-contain bg-slate-50" />
            </motion.div>
          )}
        </AnimatePresence>
      );
    }
  
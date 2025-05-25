
    import React from 'react';
    import { motion } from 'framer-motion';

    export function ToolInfoDisplay({ tool, isImageConverter, requiresFFmpeg, ffmpegLoaded, isFFmpegLoading }) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-slate-500 text-sm"
        >
          <p>{tool?.description || "Select a file and apply the tool."}</p>
          {isImageConverter && <p>Choose output format (PNG, JPG, WEBP) after selecting an image.</p>}
          {requiresFFmpeg && !ffmpegLoaded && !isFFmpegLoading && (
            <p className="text-orange-600 font-medium">Video tools require an initial engine load. Please wait...</p>
          )}
        </motion.div>
      );
    }
  
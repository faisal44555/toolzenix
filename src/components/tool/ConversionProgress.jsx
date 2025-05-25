
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Loader2 } from 'lucide-react';

    export function ConversionProgress({ ffmpegLoading, ffmpegLoaded, conversionProgress, statusMessage }) {
      if (!ffmpegLoading && !conversionProgress && !statusMessage) return null;

      let progressPercent = 0;
      let message = statusMessage || "Initializing...";

      if (ffmpegLoading) {
        message = "Loading converter engine...";
        progressPercent = 5; 
      } else if (ffmpegLoaded && conversionProgress > 0 && conversionProgress <= 100) {
        message = `Converting... ${(conversionProgress).toFixed(0)}%`;
        progressPercent = conversionProgress;
      } else if (ffmpegLoaded && conversionProgress === 0 && !statusMessage) {
        message = "Ready to convert.";
        progressPercent = 0;
      }


      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="w-full max-w-md my-4 p-3 bg-slate-100 rounded-lg shadow"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-slate-700">{message}</span>
            { (ffmpegLoading || (conversionProgress > 0 && conversionProgress < 100)) && <Loader2 className="h-4 w-4 animate-spin text-blue-500" /> }
          </div>
          {(ffmpegLoading || conversionProgress > 0) && (
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <motion.div
                className="bg-blue-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>
      );
    }
  
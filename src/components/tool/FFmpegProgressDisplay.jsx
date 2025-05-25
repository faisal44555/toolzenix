
    import React from 'react';
    import { Progress } from "@/components/ui/progress";
    import { motion } from 'framer-motion';

    export function FFmpegProgressDisplay({ isFFmpegLoading, isConverting, requiresFFmpeg, ffmpegProgress }) {
      if (!(isFFmpegLoading || (isConverting && requiresFFmpeg && ffmpegProgress > 0 && ffmpegProgress < 100))) {
        return null;
      }

      return (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full max-w-md my-4"
        >
          <Progress value={ffmpegProgress} className="w-full h-2 bg-slate-200" indicatorClassName="bg-blue-500" />
          <p className="text-sm text-slate-600 mt-1 text-center">
            {isFFmpegLoading ? `Loading video engine: ${ffmpegProgress.toFixed(0)}%` : `Processing: ${ffmpegProgress.toFixed(0)}%`}
          </p>
        </motion.div>
      );
    }
  
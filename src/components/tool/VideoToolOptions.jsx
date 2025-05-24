
    import React from 'react';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { motion } from 'framer-motion';

    export function VideoToolOptions({
      toolId,
      options,
      onOptionChange,
      isConverting,
    }) {
      if (toolId !== 'trim-video') {
        return null;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mt-4 space-y-4"
        >
          {toolId === 'trim-video' && (
            <>
              <div>
                <Label htmlFor="trim-start-time" className="text-sm font-medium text-slate-700 mb-1 block text-left">
                  Start Time (e.g., 00:00:05)
                </Label>
                <Input
                  id="trim-start-time"
                  type="text"
                  placeholder="00:00:05"
                  value={options.startTime || ''}
                  onChange={(e) => onOptionChange('startTime', e.target.value)}
                  disabled={isConverting}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="trim-duration" className="text-sm font-medium text-slate-700 mb-1 block text-left">
                  Duration (seconds, e.g., 5)
                </Label>
                <Input
                  id="trim-duration"
                  type="text"
                  placeholder="5"
                  value={options.duration || ''}
                  onChange={(e) => onOptionChange('duration', e.target.value)}
                  disabled={isConverting}
                  className="w-full"
                />
              </div>
            </>
          )}
        </motion.div>
      );
    }
  
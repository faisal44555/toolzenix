
    import React from 'react';
    import { Label } from '@/components/ui/label';
    import { Slider } from '@/components/ui/slider';
    import { motion } from 'framer-motion';

    export function ImageQualitySlider({ quality, onQualityChange, disabled = false }) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="w-full max-w-md mt-4"
        >
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="quality-slider" className="text-sm font-medium text-slate-700">
              Compression Quality
            </Label>
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-md">
              {quality}%
            </span>
          </div>
          <Slider
            id="quality-slider"
            min={1}
            max={100}
            step={1}
            value={[quality]}
            onValueChange={(value) => onQualityChange(value[0])}
            disabled={disabled}
            className="my-2"
          />
          <p className="text-xs text-slate-500 text-left">
            Lower values mean smaller file size but lower quality. Higher values mean better quality but larger file size.
          </p>
        </motion.div>
      );
    }
  
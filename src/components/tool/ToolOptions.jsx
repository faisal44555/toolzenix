
    import React from 'react';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Label } from "@/components/ui/label";
    import { ImageQualitySlider } from '@/components/tool/ImageQualitySlider.jsx';
    import { motion } from 'framer-motion';

    export function ToolOptions({ 
      toolId, 
      categoryId, 
      selectedFile, 
      outputFormat, 
      onOutputFormatChange, 
      compressionQuality, 
      onCompressionQualityChange,
      isConverting
    }) {
      const isImageConverter = ['to-png', 'to-jpg', 'to-jpeg', 'to-webp'].includes(toolId) && categoryId === 'image';
      const isImageCompressor = toolId === 'compress-image' && categoryId === 'image';
      
      const showOptions = selectedFile && (isImageConverter || isImageCompressor);

      if (!showOptions) {
        return null; 
      }

      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mt-4 space-y-4"
        >
          {isImageConverter && (
            <div>
              <Label htmlFor="output-format-select" className="text-sm font-medium text-slate-700 mb-1 block text-left">Output Format</Label>
              <Select value={outputFormat} onValueChange={onOutputFormatChange} disabled={isConverting}>
                <SelectTrigger id="output-format-select" className="w-full">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpeg">JPG/JPEG</SelectItem>
                  <SelectItem value="webp">WEBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {isImageCompressor && (
            <ImageQualitySlider 
              quality={compressionQuality} 
              onQualityChange={onCompressionQualityChange}
              disabled={isConverting}
            />
          )}
        </motion.div>
      );
    }
  
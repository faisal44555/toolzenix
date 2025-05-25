
    import React from 'react';
    import { useState, useEffect } from 'react';

    export function useToolOptionsState(toolId, isImageConverter, isImageCompressor, isSimpleImageTool, isImageBase64Tool, isVideoBase64Tool) {
      const [outputFormat, setOutputFormat] = useState('png');
      const [compressionQuality, setCompressionQuality] = useState(70);
      const [videoToolOptions, setVideoToolOptions] = useState({ startTime: '00:00:00', duration: '5' });

      useEffect(() => {
        if (isImageConverter) {
          if (toolId === 'to-jpg' || toolId === 'to-jpeg') setOutputFormat('jpeg');
          else if (toolId === 'to-webp') setOutputFormat('webp');
          else setOutputFormat('png');
        } else if (isImageCompressor) {
          setOutputFormat('jpeg');
        } else if (isSimpleImageTool) {
          setOutputFormat('png'); 
        } else if (isImageBase64Tool || isVideoBase64Tool) {
          setOutputFormat('txt');
        }
      }, [toolId, isImageConverter, isImageCompressor, isSimpleImageTool, isImageBase64Tool, isVideoBase64Tool]);

      const handleVideoOptionChange = (optionKey, value) => {
        setVideoToolOptions(prev => ({ ...prev, [optionKey]: value }));
      };

      return {
        outputFormat,
        setOutputFormat,
        compressionQuality,
        setCompressionQuality,
        videoToolOptions,
        handleVideoOptionChange,
      };
    }
  
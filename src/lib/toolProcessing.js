
    import React from 'react';
    import { 
      convertImage, 
      compressImage, 
      enhanceImage,
      applyGrayscale,
      rotateImage,
      flipImage,
      applyBlur,
      applyBrightness,
      pixelateImage,
      imageToBase64,
      removeWhiteBackground
    } from '@/lib/imageUtils.js';
    import {
      trimVideo,
      muteVideo,
      extractAudio,
      compressVideo,
      videoToGif,
      videoToBase64
    } from '@/lib/videoUtils.js';
    import { getToolDisplayName } from '@/lib/toolMetaUtils.js';


    export const createConvertedFileBlob = async (file, toolId, categoryId, ffmpeg, options = {}) => {
      const { outputFormat = 'png', quality = 0.7, videoOptions = {} } = options;

      if (categoryId === 'image' && file.type.startsWith('image/')) {
        switch (toolId) {
          case 'to-png':
          case 'to-jpg':
          case 'to-jpeg':
          case 'to-webp':
            let format = 'png'; 
            if (toolId === 'to-jpg' || toolId === 'to-jpeg') format = 'jpeg';
            if (toolId === 'to-webp') format = 'webp';
            if (outputFormat === 'jpeg' || outputFormat === 'jpg') format = 'jpeg';
            else if (outputFormat === 'png') format = 'png';
            else if (outputFormat === 'webp') format = 'webp';
            return convertImage(file, format, quality);
          case 'compress-image':
            return compressImage(file, quality);
          case 'enhance-image':
            return enhanceImage(file);
          case 'grayscale-image':
            return applyGrayscale(file);
          case 'rotate-image':
            return rotateImage(file, 90); 
          case 'flip-image-horizontal':
            return flipImage(file, 'horizontal');
          case 'flip-image-vertical':
            return flipImage(file, 'vertical');
          case 'blur-image':
            return applyBlur(file, 3); 
          case 'brighten-image':
            return applyBrightness(file, 1.4); 
          case 'pixelate-image':
            return pixelateImage(file, 10);
          case 'image-to-base64':
            return imageToBase64(file).then(result => {
              const blob = new Blob([result.base64String], { type: 'text/plain' });
              return { ...result, blob };
            });
          case 'remove-white-background':
            return removeWhiteBackground(file);
          default:
            break; 
        }
      } else if (categoryId === 'video' && file.type.startsWith('video/')) {
         if (toolId === 'video-to-base64') {
            return videoToBase64(file).then(result => {
              const blob = new Blob([result.base64String], { type: 'text/plain' });
              return { ...result, blob };
            });
          }
          
        if (!ffmpeg || !ffmpeg.isLoaded()) {
          throw new Error("FFmpeg is not loaded. Please wait or try reloading.");
        }
        switch (toolId) {
          case 'trim-video':
            return trimVideo(ffmpeg, file, videoOptions.startTime || '00:00:00', videoOptions.duration || '5');
          case 'mute-video':
            return muteVideo(ffmpeg, file);
          case 'extract-audio':
            return extractAudio(ffmpeg, file);
          case 'compress-video':
            return compressVideo(ffmpeg, file);
          case 'video-to-gif':
            return videoToGif(ffmpeg, file);
          default:
            break;
        }
      }


      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          let content = reader.result;
          let newMimeType = file.type;

          if (categoryId === 'hash') {
            const pseudoHash = Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
            content = `Original File: ${file.name}\nTool: ${getToolDisplayName(toolId, categoryId)}\n\nGenerated Mock Hash:\n${pseudoHash}\n\n(This is a randomly generated mock hash for demonstration purposes.)`;
            newMimeType = "text/plain";
          } else if (file.type.startsWith("text/")) {
            content = typeof content === 'string' ? content.toUpperCase() : "Error: Content not string"; 
            newMimeType = "text/plain";
          } else {
            content = `Mock binary conversion for ${file.name}.\nOriginal type: ${file.type}.\nThis is a placeholder as actual binary conversion is complex and typically backend-driven.`;
            newMimeType = "application/octet-stream"; 
          }
          
          const blob = new Blob([content], { type: newMimeType });

          const extension = toolId?.startsWith("to-")
            ? toolId.slice(3).toLowerCase()
            : (categoryId === 'hash' ? 'txt' : 'converted');
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + `.${extension}`;
          resolve({ blob, name: newFileName, originalName: file.name, originalSize: file.size, type: newMimeType, size: blob.size });
        };
        reader.onerror = (error) => {
            console.error("FileReader error:", error);
            reject(error);
        };

        if (file.type.startsWith("text/") || categoryId === 'hash') {
            reader.readAsText(file);
        } else {
            reader.readAsArrayBuffer(file); 
        }
      });
    };
  

    import { allToolsData } from '@/lib/toolsData.jsx';
    import { convertImage } from '@/lib/imageConversionUtils.js';
    import { convertVideoToMP3WithFFmpeg } from '@/lib/ffmpegUtils.js';
    import { getToolDisplayName } from '@/lib/toolDisplayNameUtils.js';

    export const createConvertedFileBlob = async (file, toolId, categoryId, outputFormat = 'png', progressCallback) => {
      const isImageConversionTool = toolId === 'to-png' || toolId === 'to-jpg' || toolId === 'to-jpeg' || toolId === 'to-webp';
      if (isImageConversionTool && file.type.startsWith('image/')) {
        let format = 'png'; 
        if (toolId === 'to-jpg' || toolId === 'to-jpeg') format = 'jpeg';
        if (toolId === 'to-webp') format = 'webp';
        
        if (outputFormat === 'jpeg' || outputFormat === 'jpg') format = 'jpeg';
        else if (outputFormat === 'png') format = 'png';
        else if (outputFormat === 'webp') format = 'webp';
        return convertImage(file, format);
      }

      if (toolId === 'to-mp3' && categoryId === 'video' && file.type.startsWith('video/')) {
        return convertVideoToMP3WithFFmpeg(file, progressCallback);
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
          resolve({ blob, name: newFileName, originalName: file.name, originalSize: file.size, type: newMimeType });
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

    export const downloadBlob = ({ blob, name }) => {
      if (!blob || !name) {
        console.error("Download failed: blob or name is missing.");
        return;
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    };
  
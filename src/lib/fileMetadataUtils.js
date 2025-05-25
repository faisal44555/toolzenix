
    import { allToolsData } from '@/lib/toolsData.jsx';

    export const createMockConvertedFileMetadata = (selectedFile, toolId, categoryId, outputFormat = 'png') => {
      if (!selectedFile) return null;
      const originalFileName = selectedFile.name;
      let targetFormat = 'file';

      const isImageTool = toolId === 'to-png' || toolId === 'to-jpg' || toolId === 'to-jpeg' || toolId === 'to-webp';
      const isVideoToMp3Tool = toolId === 'to-mp3' && categoryId === 'video';

      if (isImageTool && selectedFile.type.startsWith('image/')) {
        targetFormat = outputFormat === 'jpeg' ? 'jpg' : outputFormat;
      } else if (isVideoToMp3Tool && selectedFile.type.startsWith('video/')) {
        targetFormat = 'mp3';
      }
      else if (toolId.startsWith('to-')) {
        targetFormat = toolId.substring(3);
      } else if (categoryId === 'hash') {
        targetFormat = 'txt'; 
      } else {
        const toolParts = toolId.split('-');
        targetFormat = toolParts[toolParts.length -1] || 'file';
      }
      
      const baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;
      const mockConvertedFileName = `${baseName}_converted.${targetFormat.toLowerCase()}`;

      let mimeType = 'application/octet-stream';
      if (isImageTool) mimeType = `image/${outputFormat}`;
      else if (isVideoToMp3Tool) mimeType = 'audio/mp3';
      else if (categoryId === 'hash') mimeType = 'text/plain';
      else if (allToolsData[categoryId]?.defaultMimeType) mimeType = `${allToolsData[categoryId]?.defaultMimeType}/${targetFormat.toLowerCase()}`;


      return {
        name: mockConvertedFileName,
        size: Math.max(10, selectedFile.size * (Math.random() * (1.2 - 0.5) + 0.5)), 
        type: mimeType,
        originalName: selectedFile.name,
        originalSize: selectedFile.size,
      };
    };
  

    import React from 'react';
    import { allToolsData } from '@/lib/toolsData.jsx';

    export const getToolDisplayName = (toolId, categoryId) => {
      if (!toolId) return "Unknown Tool";

      const category = allToolsData[categoryId];
      const tool = category?.tools.find(t => t.id === toolId);
      if (tool?.name) return tool.name;
      
      if (toolId.startsWith('to-')) {
        return `Convert to ${toolId.substring(3).toUpperCase()}`;
      }
      if (toolId.startsWith('for-')) {
        return `Optimize for ${toolId.substring(4).charAt(0).toUpperCase() + toolId.substring(5)}`;
      }
      if (toolId.startsWith('gen-')) {
        return `${toolId.substring(4).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Generator`;
      }
      return toolId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    export const createMockConvertedFileMetadata = (selectedFile, toolId, categoryId, options = {}) => {
      const { outputFormat = 'png', quality = 0.7 } = options;
      if (!selectedFile) return null;
      const originalFileName = selectedFile.name;
      let targetFormat = 'file';

      const isImageConverter = ['to-png', 'to-jpg', 'to-jpeg', 'to-webp'].includes(toolId);
      const isImageCompressor = toolId === 'compress-image';
      const isImageEnhancer = toolId === 'enhance-image';

      if (isImageConverter && selectedFile.type.startsWith('image/')) {
        targetFormat = outputFormat === 'jpeg' ? 'jpg' : outputFormat;
      } else if (isImageCompressor && selectedFile.type.startsWith('image/')) {
        targetFormat = 'jpg'; 
      } else if (isImageEnhancer && selectedFile.type.startsWith('image/')) {
        targetFormat = 'png';
      } else if (toolId.startsWith('to-')) {
        targetFormat = toolId.substring(3);
      } else if (categoryId === 'hash') {
        targetFormat = 'txt'; 
      } else {
        const toolParts = toolId.split('-');
        targetFormat = toolParts[toolParts.length -1] || 'file';
      }
      
      const baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;
      let suffix = '_converted';
      if (isImageCompressor) suffix = '_compressed';
      if (isImageEnhancer) suffix = '_enhanced';

      const mockConvertedFileName = `${baseName}${suffix}.${targetFormat.toLowerCase()}`;

      let mimeType = 'application/octet-stream';
      if (isImageConverter) mimeType = `image/${outputFormat}`;
      else if (isImageCompressor) mimeType = 'image/jpeg';
      else if (isImageEnhancer) mimeType = 'image/png';
      else if (categoryId === 'hash') mimeType = 'text/plain';
      else if (allToolsData[categoryId]?.defaultMimeType) mimeType = `${allToolsData[categoryId]?.defaultMimeType}/${targetFormat.toLowerCase()}`;


      return {
        name: mockConvertedFileName,
        size: Math.max(10, selectedFile.size * (isImageCompressor ? quality * 0.8 : (isImageEnhancer ? 1 : (Math.random() * (1.2 - 0.5) + 0.5)))), 
        type: mimeType,
        originalName: selectedFile.name,
        originalSize: selectedFile.size,
      };
    };
  
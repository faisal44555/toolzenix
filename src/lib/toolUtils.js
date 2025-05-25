
    import { allToolsData } from '@/lib/toolsData.jsx';

    export const MAX_FILE_SIZE_MB = 10;
    export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

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

    export const createMockConvertedFile = (selectedFile, toolId, categoryId) => {
      if (!selectedFile) return null;
      const originalFileName = selectedFile.name;
      let targetFormat = 'file';
      if (toolId.startsWith('to-')) {
        targetFormat = toolId.substring(3);
      } else if (categoryId === 'hash') {
        targetFormat = 'txt'; 
      } else {
        const toolParts = toolId.split('-');
        targetFormat = toolParts[toolParts.length -1] || 'file';
      }
      
      const baseName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;
      const mockConvertedFileName = `${baseName}_${toolId}.${targetFormat.toLowerCase()}`;

      return {
        name: mockConvertedFileName,
        size: Math.max(10, selectedFile.size * (Math.random() * (1.2 - 0.5) + 0.5)),
        type: `${categoryId === 'hash' ? 'text/plain' : (allToolsData[categoryId]?.defaultMimeType || 'application')}/${targetFormat.toLowerCase()}`, 
      };
    };

    export const handleMockDownload = (fileToDownload, originalFile, toolName, categoryName, toast) => {
      if (!fileToDownload || !originalFile) {
        if (toast) {
          toast({
            title: 'Download Error',
            description: 'Cannot download file: missing file data.',
            variant: 'destructive',
            duration: 3000,
          });
        }
        return;
      }
      
      let mockSpecificContent = "";
      if (categoryName && (categoryName.toLowerCase().includes("hash") || toolName.toLowerCase().includes("hash"))) {
        const pseudoHash = Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        mockSpecificContent = `\n\nGenerated Mock Hash (${toolName}):\n${pseudoHash}\n(This is a randomly generated mock hash for demonstration purposes.)`;
      } else if (fileToDownload.type && fileToDownload.type.startsWith('text/')) {
        mockSpecificContent = `\n\nThis is a mock text content for ${fileToDownload.name}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
      } else {
        mockSpecificContent = `\n\nMock binary data placeholder for ${fileToDownload.name}. This file contains simulated binary content.`;
      }

      const mockContent = `This is a mock converted file: ${fileToDownload.name}
Original file: ${originalFile.name}
Original file size: ${originalFile.size} bytes
Mock converted file size: ${fileToDownload.size.toFixed(0)} bytes.

Tool Used: ${toolName}
Category: ${categoryName}
${mockSpecificContent}

Note: This is a placeholder file as actual file conversion/generation logic is not yet implemented. This mock download demonstrates the download flow.
Timestamp: ${new Date().toISOString()}
`;
      
      let mimeType = fileToDownload.type;
      const fileNameParts = fileToDownload.name.split('.');
      const fileExtension = fileNameParts.length > 1 ? fileNameParts[fileNameParts.length - 1].toLowerCase() : '';

      if (!mimeType || mimeType.split('/').length !== 2 || mimeType === 'application/file' || mimeType === 'application/' ) {
        mimeType = 'application/octet-stream'; 
      }
      if (fileExtension === 'txt' && (mimeType === 'application/txt' || mimeType === 'application/octet-stream')) { 
        mimeType = 'text/plain';
      }
    
      try {
        const blob = new Blob([mockContent], { type: mimeType });
        if (blob.size === 0) {
            const fallbackContent = `File content generation resulted in an empty file for ${fileToDownload.name}. This is a fallback message.`;
            const fallbackBlob = new Blob([fallbackContent], { type: 'text/plain' });
            const fallbackUrl = URL.createObjectURL(fallbackBlob);
            const fallbackLink = document.createElement('a');
            fallbackLink.href = fallbackUrl;
            fallbackLink.setAttribute('download', `error_empty_${fileToDownload.name}`);
            document.body.appendChild(fallbackLink);
            fallbackLink.click();
            document.body.removeChild(fallbackLink);
            URL.revokeObjectURL(fallbackUrl);
            if (toast) {
              toast({
                title: 'Download Warning',
                description: 'Downloaded file was unexpectedly empty. A fallback file was provided.',
                variant: 'destructive', 
                duration: 5000,
              });
            }
            return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileToDownload.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        const errorContent = `Error during download generation for ${fileToDownload.name}: ${error.message}`;
        const errorBlob = new Blob([errorContent], { type: 'text/plain' });
        const errorUrl = URL.createObjectURL(errorBlob);
        const errorLink = document.createElement('a');
        errorLink.href = errorUrl;
        errorLink.setAttribute('download', `download_error_${fileToDownload.name}.txt`);
        document.body.appendChild(errorLink);
        errorLink.click();
        document.body.removeChild(errorLink);
        URL.revokeObjectURL(errorUrl);
        if (toast) {
          toast({
            title: 'Download Failed',
            description: `Could not generate download: ${error.message}`,
            variant: 'destructive',
            duration: 3000,
          });
        }
      }
    };

    export const handleFileSelect = (event, onFileSelected, onError) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          onError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
          if (event.target) event.target.value = null;
          return;
        }
        onFileSelected(file);
      }
      if (event.target) event.target.value = null;
    };
    
    export const handleFileDrop = (event, onFileSelected, onError, setIsDragOver) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);
      const file = event.dataTransfer.files && event.dataTransfer.files[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          onError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
          return;
        }
        onFileSelected(file);
      }
    };
  
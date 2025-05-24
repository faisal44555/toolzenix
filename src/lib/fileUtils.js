
    import React from 'react';

    export const MAX_FILE_SIZE_MB = 50;
    export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

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
  
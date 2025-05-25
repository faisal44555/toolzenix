
    import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '@/lib/fileConstants.js';

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
  
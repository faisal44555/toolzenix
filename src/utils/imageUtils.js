export const loadImageFromFile = (file, { maxSizeMB = 10 } = {}) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file selected."));
    }

    if (!file.type.startsWith('image/')) {
      return reject(new Error("Invalid image file. Please select a JPG, PNG, GIF, or WEBP file."));
    }

    const maxSizeInBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return reject(new Error(`File is too large. Maximum size is ${maxSizeMB}MB.`));
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        resolve({ img, dataUrl: e.target.result, file });
      };
      img.onerror = () => {
        reject(new Error("Invalid image data. The file might be corrupted or in an unsupported format."));
      };
      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file. Please try again."));
    };

    reader.readAsDataURL(file);
  });
};

    import React from 'react';

    export const convertImage = (file, toolId, quality) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            let outputDataUrl, successMsg, errorTitle, errorDetail;

            try {
              if (toolId === 'jpg-to-png') {
                outputDataUrl = canvas.toDataURL('image/png');
                successMsg = "JPG image converted to PNG successfully!";
                errorTitle = "JPG to PNG Error";
                errorDetail = "Could not convert image to PNG.";
              } else if (toolId === 'png-to-webp') {
                outputDataUrl = canvas.toDataURL('image/webp', quality);
                successMsg = `PNG image converted to WebP (quality: ${Math.round(quality*100)}%) successfully!`;
                errorTitle = "PNG to WebP Error";
                errorDetail = "Could not convert image to WebP.";
              } else {
                 reject({ title: "Unsupported Tool", message: "This tool configuration is not supported for image conversion." });
                 return;
              }

              if (outputDataUrl && outputDataUrl.length > 100) { // Basic check for valid data URL
                resolve({ outputDataUrl, successMsg });
              } else {
                throw new Error("Image conversion resulted in empty or invalid data.");
              }
            } catch (err) {
              reject({ title: errorTitle || "Conversion Error", message: `${errorDetail || "An unexpected error occurred."} ${err.message}` });
            }
          };
          img.onerror = () => {
            reject({ title: "Image Load Error", message: "Could not load the selected image. It might be corrupted or an unsupported format." });
          };
          img.src = e.target.result;
        };
        reader.onerror = () => {
          reject({ title: "File Read Error", message: "Could not read the selected file." });
        };
        reader.readAsDataURL(file);
      });
    };

    export const getOutputExtension = (toolId) => {
      if (toolId === 'jpg-to-png') return '.png';
      if (toolId === 'png-to-webp') return '.webp';
      return '.dat'; 
    };
  
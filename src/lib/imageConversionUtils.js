
    export const convertImage = (file, format = 'png') => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");

            if (format === "jpeg") {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);
            const mimeType = `image/${format}`;
            canvas.toBlob((blob) => {
              if (!blob) {
                console.error(`Canvas toBlob failed for format: ${format}`);
                return reject(new Error(`Conversion failed: Could not create blob for ${format}.`));
              }
              const extension = format === 'jpeg' ? 'jpg' : format;
              resolve({ blob, name: file.name.replace(/\.[^/.]+$/, `.${extension}`), type: mimeType });
            }, mimeType, format === 'jpeg' ? 0.9 : undefined); 
          };
          img.onerror = (error) => {
            console.error("Image load error:", error);
            reject(new Error("Image load failed. The file might be corrupted or not a supported image format."));
          };
          if (typeof reader.result === 'string') {
            img.src = reader.result;
          } else {
             reject(new Error("FileReader did not return a string."));
          }
        };
        reader.onerror = (error) => {
            console.error("FileReader error:", error);
            reject(new Error("File could not be read."));
        };
        reader.readAsDataURL(file);
      });
    };
  
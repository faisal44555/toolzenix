
    import React from 'react';

    const loadImage = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (error) => {
            console.error("Image load error in loadImage:", error);
            reject(new Error("Image load failed. The file might be corrupted or not a supported image format."));
          };
          if (typeof e.target?.result === 'string') {
            img.src = e.target.result;
          } else {
            reject(new Error("FileReader did not return a string."));
          }
        };
        reader.onerror = (error) => {
          console.error("FileReader error in loadImage:", error);
          reject(new Error("File could not be read."));
        };
        reader.readAsDataURL(file);
      });
    };
    
    const imageToBlob = (canvas, mimeType = 'image/png', quality, fileName) => {
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            return reject(new Error(`Conversion failed: Could not create blob for ${mimeType}.`));
          }
          resolve({ blob, name: fileName, type: mimeType, size: blob.size });
        }, mimeType, quality);
      });
    };

    export const convertImage = async (file, format = 'png', quality = 0.9) => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (format === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const extension = format === 'jpeg' ? 'jpg' : format;
      const newName = file.name.replace(/\.[^/.]+$/, `_converted.${extension}`);
      return imageToBlob(canvas, `image/${format}`, format === 'jpeg' ? quality : undefined, newName);
    };

    export const compressImage = async (file, quality = 0.7) => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const newName = file.name.replace(/\.[^/.]+$/, "_compressed.jpg");
      return imageToBlob(canvas, 'image/jpeg', quality, newName);
    };

    export const enhanceImage = async (file) => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.filter = 'contrast(120%) brightness(110%)';
      ctx.drawImage(img, 0, 0);
      ctx.filter = 'none'; 
      const newName = file.name.replace(/\.[^/.]+$/, "_enhanced.png");
      return imageToBlob(canvas, 'image/png', undefined, newName);
    };

    export const applyGrayscale = async (file) => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.filter = 'grayscale(100%)';
      ctx.drawImage(img, 0, 0);
      ctx.filter = 'none';
      const newName = file.name.replace(/\.[^/.]+$/, "_grayscale.png");
      return imageToBlob(canvas, 'image/png', undefined, newName);
    };

    export const rotateImage = async (file, degrees = 90) => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext('2d');
      const radians = degrees * (Math.PI / 180);

      if (degrees === 90 || degrees === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.setTransform(1,0,0,1,0,0);
      
      const newName = file.name.replace(/\.[^/.]+$/, `_rotated${degrees}.png`);
      return imageToBlob(canvas, 'image/png', undefined, newName);
    };

    export const flipImage = async (file, direction = 'horizontal') => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      const scaleH = direction === 'horizontal' ? -1 : 1;
      const scaleV = direction === 'vertical' ? -1 : 1;
      
      ctx.translate(direction === 'horizontal' ? canvas.width : 0, direction === 'vertical' ? canvas.height : 0);
      ctx.scale(scaleH, scaleV);
      ctx.drawImage(img, 0, 0);
      ctx.setTransform(1,0,0,1,0,0);
      
      const newName = file.name.replace(/\.[^/.]+$/, `_flipped_${direction}.png`);
      return imageToBlob(canvas, 'image/png', undefined, newName);
    };

    export const applyBlur = async (file, blurAmount = 3) => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = 'none';
      const newName = file.name.replace(/\.[^/.]+$/, "_blurred.png");
      return imageToBlob(canvas, 'image/png', undefined, newName);
    };

    export const applyBrightness = async (file, brightnessAmount = 1.4) => { // 1.4 = 140%
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.filter = `brightness(${brightnessAmount * 100}%)`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = 'none';
      const newName = file.name.replace(/\.[^/.]+$/, "_brightened.png");
      return imageToBlob(canvas, 'image/png', undefined, newName);
    };
    
    export const pixelateImage = async (file, pixelSize = 10) => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      ctx.imageSmoothingEnabled = false;

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      
      tempCanvas.width = Math.ceil(w / pixelSize);
      tempCanvas.height = Math.ceil(h / pixelSize);

      tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
      
      ctx.clearRect(0,0,w,h);
      ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, w, h);
      
      const newName = file.name.replace(/\.[^/.]+$/, "_pixelated.png");
      return imageToBlob(canvas, 'image/png', undefined, newName);
    };

    export const imageToBase64 = async (file) => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(file.type.startsWith('image/') ? file.type : 'image/png'); 
      const newName = file.name.replace(/\.[^/.]+$/, "_base64.txt");
      return { base64String: dataUrl, name: newName, type: 'text/plain', size: dataUrl.length };
    };

    export const removeWhiteBackground = async (file) => {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const threshold = 240; 

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0; 
        }
      }
      ctx.putImageData(imageData, 0, 0);
      const newName = file.name.replace(/\.[^/.]+$/, "_bg_removed.png");
      return imageToBlob(canvas, 'image/png', undefined, newName);
    };
  
export const applyImageEnhancements = (originalCanvas, targetCanvas, settings) => {
  if (!originalCanvas || !targetCanvas) return;
  
  const ctx = targetCanvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  
  // Apply filters
  const filters = [];
  
  if (settings.brightness !== 100) {
    filters.push(`brightness(${settings.brightness}%)`);
  }
  
  if (settings.contrast !== 100) {
    filters.push(`contrast(${settings.contrast}%)`);
  }
  
  if (settings.blur > 0) {
    filters.push(`blur(${settings.blur}px)`);
  }
  
  if (settings.grayscale > 0) {
    filters.push(`grayscale(${settings.grayscale}%)`);
  }
  
  ctx.filter = filters.length > 0 ? filters.join(' ') : 'none';
  
  // Draw the image with filters
  ctx.drawImage(originalCanvas, 0, 0);
  
  // Apply sharpness if needed (custom implementation)
  if (settings.sharpness > 0) {
    applySharpness(ctx, targetCanvas.width, targetCanvas.height, settings.sharpness);
  }
};

export const applySharpness = (ctx, width, height, amount) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const factor = amount / 100;
  
  // Simple sharpening kernel
  const kernel = [
    0, -factor, 0,
    -factor, 1 + 4 * factor, -factor,
    0, -factor, 0
  ];
  
  const newData = new Uint8ClampedArray(data);
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4 + c;
            sum += data[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
        }
        const idx = (y * width + x) * 4 + c;
        newData[idx] = Math.max(0, Math.min(255, sum));
      }
    }
  }
  
  const newImageData = new ImageData(newData, width, height);
  ctx.putImageData(newImageData, 0, 0);
};

export const getAutoEnhanceSettings = () => ({
  brightness: 110,
  contrast: 115,
  sharpness: 25,
  blur: 0,
  grayscale: 0
});

export const getDefaultSettings = () => ({
  brightness: 100,
  contrast: 100,
  sharpness: 0,
  blur: 0,
  grayscale: 0
});
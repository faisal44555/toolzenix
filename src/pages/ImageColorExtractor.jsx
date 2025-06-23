import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Aperture, Upload, Loader2, RefreshCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';
import { loadImageFromFile } from '@/utils/imageUtils';

const ImageColorExtractor = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [palette, setPalette] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [numColors] = useState(5);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setImageSrc(null);
    setPalette([]);
    
    try {
      const { img, dataUrl } = await loadImageFromFile(file);
      setImageSrc(dataUrl);
      extractColors(img);
    } catch (error) {
      toast({ 
        title: 'Upload Failed', 
        description: error.message || "Invalid image file. Please try a different file.", 
        variant: 'destructive' 
      });
      setProcessing(false);
    }
  };

  const extractColors = (img) => {
    const canvas = canvasRef.current;
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const colorCounts = {};

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const rgb = `rgb(${r},${g},${b})`;
      colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
    }

    const sortedColors = Object.entries(colorCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, numColors)
      .map(([rgb]) => rgbToHex(rgb));
    
    setPalette(sortedColors);
    toast({ title: 'Colors Extracted!', description: `Found ${sortedColors.length} dominant colors.`});
    setProcessing(false);
  };
  
  const rgbToHex = (rgbString) => {
    const [r, g, b] = rgbString.match(/\d+/g).map(Number);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: `${text} copied.`,
    });
  };

  const handleReset = () => {
    setImageSrc(null);
    setPalette([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>Image Color Extractor | Toolzenix</title>
        <meta name="description" content="Extract dominant colors from any image. Upload an image and get its color palette." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Aperture className="w-10 h-10 mr-3 text-indigo-500" /> Image Color Extractor
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Upload an image to extract its dominant colors and create a palette.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        {!imageSrc ? (
          <div>
            <Label htmlFor="imageUpload" className="text-gray-700 dark:text-gray-300">Upload Image</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {processing ? (
                  <Loader2 className="mx-auto h-12 w-12 text-indigo-500 animate-spin" />
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="imageUploadInput"
                    className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <Input id="imageUploadInput" ref={fileInputRef} name="imageUploadInput" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} disabled={processing} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <Label>Preview:</Label>
              <img src={imageSrc} alt="Uploaded preview" className="mt-2 rounded-lg max-h-64 w-auto mx-auto shadow" />
            </div>

            {palette.length > 0 && (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Extracted Palette ({palette.length} colors):</h3>
                <div className={`grid grid-cols-2 sm:grid-cols-${Math.min(palette.length, 5)} gap-2`}>
                  {palette.map((color, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-md shadow flex flex-col items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <span className="font-mono text-xs text-white mix-blend-difference">{color}</span>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(color)} className="mt-1 text-white/70 hover:text-white hover:bg-white/20 p-1 h-auto w-auto" aria-label="Copy color code">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
             <div className="flex justify-center pt-4">
                <Button onClick={handleReset} variant="outline">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
          </>
        )}
        
        <div className="hidden">
          <canvas ref={canvasRef}></canvas>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageColorExtractor;
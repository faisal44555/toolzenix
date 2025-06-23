import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Download, Upload, Maximize2, Loader2, Ratio as AspectRatio, RefreshCcw } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Helmet } from "react-helmet-async";
import { loadImageFromFile } from "@/utils/imageUtils";
import { saveAs } from "file-saver";
import { individualTools } from "@/config/navigation";

const ImageResizer = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: "", height: "" });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [imageName, setImageName] = useState("resized-image");
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);

  useEffect(() => {
    const tools = individualTools
      .filter(tool => tool.category === "Image Tools" && tool.path !== "/image-resizer")
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    setRelatedTools(tools);
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setPreviewUrl(null);
    setOriginalImage(null);

    try {
      const { img, file: loadedFile, dataUrl } = await loadImageFromFile(file);

      setPreviewUrl(dataUrl);
      setImageName(loadedFile.name.split('.')[0] || "resized-image");
      setOriginalImage(img);
      setOriginalDimensions({ width: img.width, height: img.height });
      setDimensions({ width: img.width, height: img.height });
      
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setPreviewUrl(null);
    } finally {
      setProcessing(false);
    }
  };

  const handleDimensionChange = (axis, value) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) && value !== "") return;

    let newWidth = dimensions.width;
    let newHeight = dimensions.height;

    if (axis === 'width') {
      newWidth = value === "" ? "" : numValue;
      if (keepAspectRatio && originalDimensions.width > 0 && numValue > 0) {
        newHeight = Math.round((numValue / originalDimensions.width) * originalDimensions.height);
      }
    } else {
      newHeight = value === "" ? "" : numValue;
      if (keepAspectRatio && originalDimensions.height > 0 && numValue > 0) {
        newWidth = Math.round((numValue / originalDimensions.height) * originalDimensions.width);
      }
    }
    setDimensions({ width: newWidth, height: newHeight });
  };

  const handleResizeAndDownload = () => {
    if (!originalImage || !dimensions.width || !dimensions.height) {
      toast({
        title: "Missing information",
        description: "Please upload an image and specify valid width and height.",
        variant: "destructive"
      });
      return;
    }
    if (parseInt(dimensions.width, 10) <= 0 || parseInt(dimensions.height, 10) <= 0) {
      toast({
        title: "Invalid dimensions",
        description: "Width and height must be positive numbers.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = parseInt(dimensions.width, 10);
      tempCanvas.height = parseInt(dimensions.height, 10);
      
      tempCtx.drawImage(originalImage, 0, 0, tempCanvas.width, tempCanvas.height);

      const fileType = originalImage.src.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';
      const fileExtension = fileType.split('/')[1];

      tempCanvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${imageName}_${dimensions.width}x${dimensions.height}.${fileExtension}`);
          toast({
            title: "Success!",
            description: "Image has been resized and downloaded."
          });
        } else {
          throw new Error("Failed to create blob from canvas.");
        }
        setLoading(false);
      }, fileType, 0.9);
    } catch (error) {
      toast({
        title: "Resize Error",
        description: `Could not resize image: ${error.message}`,
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setOriginalImage(null);
    setDimensions({ width: "", height: "" });
    setOriginalDimensions({ width: 0, height: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Image Resizer - Resize Images Online | Toolzenix</title>
        <meta name="description" content="Resize your images to any dimensions while maintaining quality. Free, fast, and secure online image resizer." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">↔️ Image Resizer</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Resize your images to any dimensions while maintaining quality.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          {previewUrl && (
            <div className="w-full text-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Image Preview:</h3>
              <img src={previewUrl} alt="Image Preview" className="max-w-full max-h-72 mx-auto rounded-lg shadow-lg border dark:border-gray-700" />
            </div>
          )}
          
          {!previewUrl ? (
             <div className="w-full max-w-lg">
              <label 
                htmlFor="file-upload-resizer"
                className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
              >
                <input
                  id="file-upload-resizer"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                  disabled={processing}
                  ref={fileInputRef}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  {processing ? (
                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Drag and drop your image here, or click to select
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Supports JPG, PNG, WEBP, etc.
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          ) : (
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 max-w-md mx-auto">
                <div>
                  <Label htmlFor="width-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Width (px)
                  </Label>
                  <Input
                    id="width-input"
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => handleDimensionChange('width', e.target.value)}
                    placeholder="Width"
                    className="w-full dark:bg-gray-700 dark:text-white"
                    min="1"
                    disabled={processing}
                  />
                </div>
                <div>
                  <Label htmlFor="height-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Height (px)
                  </Label>
                  <Input
                    id="height-input"
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => handleDimensionChange('height', e.target.value)}
                    placeholder="Height"
                    className="w-full dark:bg-gray-700 dark:text-white"
                    min="1"
                    disabled={processing}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2 mb-6 max-w-md mx-auto">
                <Checkbox
                  id="aspect-ratio-checkbox"
                  checked={keepAspectRatio}
                  onCheckedChange={setKeepAspectRatio}
                  disabled={processing}
                />
                <Label htmlFor="aspect-ratio-checkbox" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Keep Aspect Ratio
                </Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
                <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full"
                    disabled={processing}
                >
                    <RefreshCcw className="w-5 h-5 mr-2" />
                    Try Again
                </Button>
                <Button
                  onClick={handleResizeAndDownload}
                  disabled={loading || processing || !originalImage}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Maximize2 className="w-5 h-5 mr-2" />
                  )}
                  Resize & Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload the image you want to resize. A preview will be displayed.</li>
          <li>Enter your desired width and height in pixels.</li>
          <li>Check "Keep Aspect Ratio" if you want to maintain proportions. Changing one dimension will auto-update the other.</li>
          <li>Click "Resize & Download". Your resized image will be downloaded.</li>
        </ul>
      </div>

       <div className="mt-12 w-full max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">You Might Also Like...</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedTools.map(tool => (
            <Link to={tool.path} key={tool.path} className="group block p-4 bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-400 border border-transparent transition-all duration-300 transform hover:-translate-y-1">
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{tool.name}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageResizer;
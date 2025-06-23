import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Palette, Loader2, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { loadImageFromFile } from "@/utils/imageUtils";
import { saveAs } from "file-saver";

const ImageGrayscale = () => {
  const [downloading, setDownloading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState(null);
  const [imageName, setImageName] = useState("grayscale-image");
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const drawImageToCanvas = (image, canvas) => {
    if (image && canvas) {
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setOriginalImage(null);
    setIsGrayscale(false);
    setPreviewUrl(null);
    
    try {
      const { img, file: loadedFile, dataUrl } = await loadImageFromFile(file);
      setPreviewUrl(dataUrl);
      setImageName(loadedFile.name.split('.')[0] || "grayscale-image");
      setOriginalImage(img);
      
      // Directly draw and stop processing
      drawImageToCanvas(img, canvasRef.current);
      setProcessing(false);

    } catch (error) {
      toast({ 
        title: "Upload Failed", 
        description: error.message || "Invalid image file. Please try a different file.", 
        variant: "destructive" 
      });
      setPreviewUrl(null);
      setProcessing(false);
    }
  };

  const convertToGrayscale = () => {
    if (!originalImage || !canvasRef.current) {
       toast({ title: "No Image", description: "Please upload an image first.", variant: "destructive" });
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height); 
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] * 0.299) + (data[i + 1] * 0.587) + (data[i + 2] * 0.114);
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    
    ctx.putImageData(imageData, 0, 0);
    setIsGrayscale(true);
    toast({ title: "Grayscale Applied!", description: "Image converted to grayscale." });
  };

  const downloadImage = () => {
    if (!canvasRef.current || !originalImage) {
      toast({ title: "No Image", description: "Please process an image first.", variant: "destructive" });
      return;
    }
    setDownloading(true);

    try {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${imageName}_grayscale.png`);
          toast({
            title: "Success!",
            description: "Your grayscale image has been downloaded."
          });
        } else {
          throw new Error("Could not create image blob.");
        }
        setDownloading(false);
      }, 'image/png');
    } catch (error) {
      toast({
        title: "Download Error",
        description: error.message || "Failed to download the image.",
        variant: "destructive"
      });
      setDownloading(false);
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setOriginalImage(null);
    setIsGrayscale(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Grayscale Image Converter | Toolzenix</title>
        <meta name="description" content="Convert your color images to stunning black and white (grayscale) with our free online tool." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Grayscale Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert your images to stunning grayscale
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          {!previewUrl ? (
            <div className="w-full max-w-md">
              <label 
                htmlFor="file-upload"
                className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                  disabled={processing}
                  ref={fileInputRef}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  {processing ? (
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Drag and drop your image here, or click to select
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Supports all image formats. Up to 10MB.
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex justify-center mb-6 bg-gray-100 dark:bg-gray-700/30 p-2 rounded-lg shadow-inner min-h-[100px]">
                {processing ? 
                  <div className="flex items-center justify-center h-full min-h-[200px]"><Loader2 className="w-12 h-12 text-blue-500 animate-spin" /></div> :
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[400px] border border-gray-200 dark:border-gray-700 rounded-lg object-contain"
                  />
                }
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={convertToGrayscale}
                  variant="outline"
                  disabled={isGrayscale || processing}
                >
                  <Palette className="w-5 h-5 mr-2" />
                  Convert to Grayscale
                </Button>
                
                <div className="flex gap-4">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    disabled={processing || downloading}
                  >
                    <RefreshCcw className="w-5 h-5 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={downloadImage}
                    disabled={downloading || processing || !isGrayscale}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {downloading ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Download Grayscale Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload your image using the designated area. A preview will appear.</li>
          <li>Click the "Convert to Grayscale" button.</li>
          <li>The image preview will update to show the grayscale version.</li>
          <li>Click "Download Grayscale Image" to save your result.</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageGrayscale;
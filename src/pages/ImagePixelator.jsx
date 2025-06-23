import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Grid as GridIcon, Loader2, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { loadImageFromFile } from "@/utils/imageUtils";
import { saveAs } from "file-saver";

const ImagePixelator = () => {
  const [downloading, setDownloading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [pixelSize, setPixelSize] = useState(10);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState(null);
  const [imageName, setImageName] = useState("pixelated-image");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setPreviewUrl(null);
    setOriginalImage(null);
    setPixelSize(10);

    try {
      const { img, file: loadedFile, dataUrl } = await loadImageFromFile(file);
      setPreviewUrl(dataUrl);
      setImageName(loadedFile.name.split('.')[0] || "pixelated-image");
      setOriginalImage(img);
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        pixelateImage(10, img);
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error.message || "Invalid image file. Please try a different file.",
        variant: "destructive"
      });
      setPreviewUrl(null);
    } finally {
      setProcessing(false);
    }
  };

  const pixelateImage = (size, imageToProcess = originalImage) => {
    if (!imageToProcess || !canvasRef.current || size < 1) return;
    setPixelSize(size);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = imageToProcess.width;
    canvas.height = imageToProcess.height;

    ctx.imageSmoothingEnabled = false;
    
    const tempCanvasWidth = Math.max(1, Math.floor(imageToProcess.width / size));
    const tempCanvasHeight = Math.max(1, Math.floor(imageToProcess.height / size));

    ctx.drawImage(imageToProcess, 0, 0, tempCanvasWidth, tempCanvasHeight);
    
    ctx.drawImage(
      canvas, 
      0, 0, 
      tempCanvasWidth, tempCanvasHeight,
      0, 0, 
      canvas.width, canvas.height
    );
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
          saveAs(blob, `${imageName}_pixelated_${pixelSize}px.png`);
          toast({
            title: "Success!",
            description: "Your pixelated image has been downloaded."
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
    setPixelSize(10);
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
        <title>Image Pixelator - Create Pixel Art Effects | Toolzenix</title>
        <meta name="description" content="Create awesome pixel art effects with your images using our free online pixelator tool. Adjust pixel size for desired effect." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">👾 Image Pixelator</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Create awesome pixel art effects with your images.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          {!previewUrl ? (
            <div className="w-full max-w-lg">
              <label 
                htmlFor="file-upload-pixelator"
                className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-amber-500 dark:hover:border-amber-400 transition-colors"
              >
                <input
                  id="file-upload-pixelator"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                  disabled={processing}
                  ref={fileInputRef}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  {processing ? (
                    <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Drag and drop your image here, or click to select
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Supports JPG, PNG, WEBP, etc. Up to 10MB.
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
                  <div className="flex items-center justify-center h-full"><Loader2 className="w-12 h-12 text-amber-500 animate-spin" /></div> :
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[400px] object-contain border border-gray-200 dark:border-gray-700 rounded-md"
                    style={{ imageRendering: 'pixelated' }}
                  />
                }
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-md">
                  <Label htmlFor="pixel-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pixel Size: {pixelSize}
                  </Label>
                  <Slider
                    id="pixel-slider"
                    value={[pixelSize]}
                    onValueChange={(value) => pixelateImage(value[0])}
                    min={2}
                    max={50}
                    step={1}
                    className="w-full"
                    disabled={processing}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full"
                    disabled={processing || downloading}
                  >
                    <RefreshCcw className="w-5 h-5 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={downloadImage}
                    disabled={downloading || processing || !originalImage}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    {downloading ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5 mr-2" />
                    )}
                    Download Pixelated Image
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
          <li>Upload the image you want to pixelate. A preview will be shown.</li>
          <li>Adjust the "Pixel Size" slider. Larger values create bigger pixels.</li>
          <li>The preview will update to show the pixelated effect.</li>
          <li>Click "Download Pixelated Image" to save your retro-style image.</li>
        </ul>
      </div>
    </div>
  );
};

export default ImagePixelator;
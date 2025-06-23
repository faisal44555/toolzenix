import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Download, Sun, Loader2, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { loadImageFromFile } from "@/utils/imageUtils";
import { saveAs } from "file-saver";
import { individualTools } from "@/config/navigation";

const ImageBrightness = () => {
  const [downloading, setDownloading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState(null);
  const [imageName, setImageName] = useState("adjusted-image");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [relatedTools, setRelatedTools] = useState([]);

  useEffect(() => {
    const tools = individualTools
      .filter(tool => tool.category === "Image Tools" && tool.path !== "/image-brightness")
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
    setBrightness(100);

    try {
      const { img, file: loadedFile, dataUrl } = await loadImageFromFile(file);
      setPreviewUrl(dataUrl);
      setImageName(loadedFile.name.split('.')[0] || "adjusted-image");
      setOriginalImage(img);
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.width;
        canvas.height = img.height;
        adjustBrightness(100, img);
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

  const adjustBrightness = (value, imageToProcess = originalImage) => {
    if (!imageToProcess || !canvasRef.current) return;
    setBrightness(value);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.filter = `brightness(${value}%)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageToProcess, 0, 0, canvas.width, canvas.height);
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
          saveAs(blob, `${imageName}_brightness_${brightness}%.png`);
          toast({
            title: "Success!",
            description: "Your brightness-adjusted image has been downloaded."
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
    setBrightness(100);
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
        <title>Image Brightness Adjuster | Toolzenix</title>
        <meta name="description" content="Adjust the brightness of your images with precision using our free online tool. Lighten or darken photos easily." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">☀️ Image Brightness Adjuster</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Adjust the brightness of your images with precision.
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
                htmlFor="file-upload-brightness"
                className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors"
              >
                <input
                  id="file-upload-brightness"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                  disabled={processing}
                  ref={fileInputRef}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  {processing ? (
                    <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
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
                  <div className="flex items-center justify-center h-full"><Loader2 className="w-12 h-12 text-yellow-500 animate-spin" /></div> :
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[400px] object-contain border border-gray-200 dark:border-gray-700 rounded-md"
                  />
                }
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-md">
                  <Label htmlFor="brightness-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brightness: {brightness}% (Default: 100%)
                  </Label>
                  <Slider
                    id="brightness-slider"
                    value={[brightness]}
                    onValueChange={(value) => adjustBrightness(value[0])}
                    min={0}
                    max={200}
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
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    {downloading ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5 mr-2" />
                    )}
                    Download Adjusted Image
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
          <li>Upload the image you want to adjust. A preview will be shown.</li>
          <li>Use the "Brightness" slider to lighten or darken the image. 100% is original brightness.</li>
          <li>The preview will update in real-time.</li>
          <li>Click "Download Adjusted Image" to save your result.</li>
        </ul>
      </div>

       <div className="mt-12 w-full max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">You Might Also Like...</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedTools.map(tool => (
            <Link to={tool.path} key={tool.path} className="group block p-4 bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-xl hover:border-yellow-500 dark:hover:border-yellow-400 border border-transparent transition-all duration-300 transform hover:-translate-y-1">
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{tool.name}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageBrightness;
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FlipVertical as FlipIcon, Upload, Download, RotateCcw, Loader2, RefreshCcw } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { loadImageFromFile } from "@/utils/imageUtils";
import { saveAs } from "file-saver";

const ImageFlipper = () => {
  const [downloading, setDownloading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState(null);
  const [imageName, setImageName] = useState("flipped-image");
  const [currentImageState, setCurrentImageState] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setPreviewUrl(null);
    setCurrentImageState(null);
    setOriginalImage(null);

    try {
      const { img, file: loadedFile, dataUrl } = await loadImageFromFile(file);
      setPreviewUrl(dataUrl);
      setImageName(loadedFile.name.split('.')[0] || "flipped-image");
      setOriginalImage(img); 
      setCurrentImageState(img); 
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
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

  const flip = (direction) => {
    if (!currentImageState || !canvasRef.current) {
        toast({ title: "No Image", description: "Please upload an image first.", variant: "destructive" });
        return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imgToFlip = currentImageState; 
    
    canvas.width = imgToFlip.width;
    canvas.height = imgToFlip.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    if (direction === 'horizontal') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    } else if (direction === 'vertical') {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
    }
    
    ctx.drawImage(imgToFlip, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    const newImage = new window.Image();
    newImage.onload = () => setCurrentImageState(newImage);
    newImage.src = canvas.toDataURL();

    toast({ title: `Image Flipped ${direction}ly!`, description: "Ready to download or flip again." });
  };
  
  const resetImage = () => {
    if (!originalImage || !canvasRef.current) return;
    setCurrentImageState(originalImage);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.drawImage(originalImage, 0, 0);
    toast({ title: "Image Reset", description: "Image restored to original state."});
  };

  const downloadImage = () => {
    if (!canvasRef.current || !currentImageState) {
         toast({ title: "No Image to Download", description: "Please upload and flip an image first.", variant: "destructive" });
        return;
    }
    setDownloading(true);

    try {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${imageName}_flipped.png`);
          toast({
            title: "Success!",
            description: "Your flipped image has been downloaded."
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
    setCurrentImageState(null);
    setOriginalImage(null);
    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Image Flipper - Flip Images Horizontally & Vertically Online | Toolzenix</title>
        <meta name="description" content="Easily flip your images horizontally or vertically with our free online image flipper tool. Create mirrored effects or correct orientation instantly. Supports JPG, PNG, and more." />
        <link rel="canonical" href="https://toolzenix.com/image-flipper" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Image Flipper
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Instantly flip your images horizontally or vertically. This tool is perfect for creating mirror effects, correcting photo orientations, or preparing images for specific design layouts.
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
                        Supports JPG, PNG, GIF, WEBP, etc. Up to 10MB.
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex justify-center mb-6 min-h-[100px]">
                {processing ?
                  <div className="flex items-center justify-center h-full"><Loader2 className="w-12 h-12 text-blue-500 animate-spin" /></div> :
                  <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-[400px] border border-gray-300 dark:border-gray-600 rounded-lg object-contain"
                  />
                }
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={() => flip('horizontal')}
                    variant="outline"
                    className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <FlipIcon className="w-5 h-5 mr-2" />
                    Flip Horizontal
                  </Button>
                  <Button
                    onClick={() => flip('vertical')}
                    variant="outline"
                    className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <FlipIcon className="w-5 h-5 mr-2 rotate-90" />
                    Flip Vertical
                  </Button>
                  <Button
                    onClick={resetImage}
                    variant="outline"
                    className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset to Original
                  </Button>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                     className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <RefreshCcw className="w-5 h-5 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={downloadImage}
                    disabled={downloading || !currentImageState}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {downloading ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Download Flipped Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">About Our Image Flipper</h2>
        <p>The Image Flipper tool provides a quick and easy way to mirror your images either horizontally or vertically. This can be useful for various creative and practical purposes, such as correcting the orientation of photos taken with a front-facing camera (which often appear mirrored), creating symmetrical designs, or preparing images for specific printing or crafting projects where a mirrored version is needed (like iron-on transfers).</p>
        <p>Unlike an <Link to="/image-rotator">Image Rotator</Link> which turns an image around its center, the flipper creates a mirror image. This simple transformation can significantly alter the composition or fix common orientation issues. Our tool processes images directly in your browser, ensuring your files remain private. After flipping, you can download the modified image. For more image editing options, explore our other <Link to="/image-converters">Image Tools</Link> like the <Link to="/image-cropper">Image Cropper</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ul className="list-decimal pl-5 space-y-1">
          <li>Upload an image file (JPG, PNG, GIF, WEBP, etc.) using the upload area. A preview will appear.</li>
          <li>Once the image is displayed, click either "Flip Horizontal" or "Flip Vertical" to apply the desired transformation. The image on the canvas will update to show the flipped version.</li>
          <li>You can continue to flip the image multiple times. For example, flipping horizontally twice will return it to its previous state before the first horizontal flip.</li>
          <li>Use the "Reset to Original" button to revert all flips and restore the image to how it was when first uploaded.</li>
          <li>When you're satisfied with the result, click "Download Flipped Image" to save the image as a PNG file.</li>
        </ul>
        <p className="mt-4">This tool is ideal for graphic designers, social media users, or anyone needing a fast way to mirror images without complex software. Discover more useful utilities on our <Link to="/tools">All Tools</Link> page.</p>
      </div>
    </div>
  );
};

export default ImageFlipper;
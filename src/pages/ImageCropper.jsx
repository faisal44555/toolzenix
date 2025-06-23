import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Crop, Download, Upload, Maximize, Loader2, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { loadImageFromFile } from "@/utils/imageUtils";
import { saveAs } from "file-saver";

const ImageCropper = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [imageData, setImageData] = useState(null); 
  const [currentCanvasImage, setCurrentCanvasImage] = useState(null); 
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [imageName, setImageName] = useState("cropped-image");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setCurrentCanvasImage(null);
    setImageData(null);

    try {
      const { img, file: loadedFile } = await loadImageFromFile(file);
      
      setImageName(loadedFile.name.split('.')[0] || "cropped-image");
      
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      const originalImageData = ctx.getImageData(0, 0, img.width, img.height);
      setImageData(originalImageData);
      
      setCurrentCanvasImage(img);
      
    } catch (error) {
       toast({
        title: "Upload Failed",
        description: error.message || "Invalid image file. Please try a different file.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleMouseDown = (e) => {
    if (!currentCanvasImage) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    setStartPos({ x, y });
    setIsDrawing(true);
  };

  const handleMouseUp = (e) => {
    if (!isDrawing || !currentCanvasImage) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const endX = (e.clientX - rect.left) * scaleX;
    const endY = (e.clientY - rect.top) * scaleY;

    const cropX = Math.min(startPos.x, endX);
    const cropY = Math.min(startPos.y, endY);
    const cropWidth = Math.abs(endX - startPos.x);
    const cropHeight = Math.abs(endY - startPos.y);

    if (cropWidth < 10 || cropHeight < 10) {
      toast({
        title: "Selection too small",
        description: "Please make a larger selection to crop.",
        variant: "destructive"
      });
      if (currentCanvasImage && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        canvasRef.current.width = currentCanvasImage.width;
        canvasRef.current.height = currentCanvasImage.height;
        ctx.drawImage(currentCanvasImage, 0, 0);
      }
      return;
    }

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = cropWidth;
    tempCanvas.height = cropHeight;
    const tempCtx = tempCanvas.getContext("2d");
    
    tempCtx.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(tempCanvas, 0, 0);

    const newCroppedImage = new window.Image();
    newCroppedImage.onload = () => setCurrentCanvasImage(newCroppedImage);
    newCroppedImage.src = canvas.toDataURL();
    
    toast({title: "Image Cropped", description: "You can crop again or download."});
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentCanvasImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;

    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(currentCanvasImage, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(0, 255, 0, 0.7)";
    ctx.lineWidth = 2 / scaleX;
    ctx.setLineDash([5 / scaleX, 5 / scaleX]);
    ctx.strokeRect(
      startPos.x,
      startPos.y,
      currentX - startPos.x,
      currentY - startPos.y
    );
  };
  
  const resetToOriginal = () => {
    if (imageData && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);

        const originalImgObj = new window.Image();
        originalImgObj.onload = () => setCurrentCanvasImage(originalImgObj);
        originalImgObj.src = canvas.toDataURL();
        toast({title: "Image Reset", description: "Cropper reset to original uploaded image."});
    }
  };

  const downloadCroppedImage = () => {
    if (!canvasRef.current || !currentCanvasImage) {
       toast({
        title: "No Image",
        description: "Please upload and crop an image first.",
        variant: "destructive"
      });
      return;
    }
    setDownloading(true);

    try {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${imageName}_cropped.png`);
          toast({
            title: "Success!",
            description: "Your cropped image has been downloaded."
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
    setCurrentCanvasImage(null);
    setImageData(null);
    if (canvasRef.current) { 
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Online Image Cropper - Crop JPG, PNG, GIF Images Free | Toolzenix</title>
        <meta name="description" content="Easily crop your images (JPG, PNG, GIF, etc.) online with our interactive image cropper. Select the area you want and download the cropped image instantly. Free and simple to use for any project." />
        <link rel="canonical" href="https://toolzenix.com/image-cropper" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Image Cropper
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Select and cut out the perfect portion of your image. Our interactive tool makes cropping simple for social media, presentations, or any project.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          {!currentCanvasImage ? (
            <div className="w-full max-w-md">
              <label 
                htmlFor="file-upload-cropper"
                className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <input
                  id="file-upload-cropper"
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
              <div className="w-full flex justify-center mb-4 overflow-hidden" style={{ maxHeight: '500px' }}>
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => { if (isDrawing) setIsDrawing(false);}}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg cursor-crosshair object-contain"
                  style={{maxWidth: '100%', maxHeight: '500px'}}
                />
              </div>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4 text-center">
                  Click and drag on the image to select the area. Release to crop.
                </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                 <Button
                  onClick={resetToOriginal}
                  variant="outline"
                  className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                  disabled={!imageData}
                >
                  <Maximize className="w-5 h-5 mr-2" /> Reset to Original
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <RefreshCcw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={downloadCroppedImage}
                  disabled={downloading || !currentCanvasImage}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {downloading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download Cropped
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">About Our Image Cropper</h2>
        <p>Our Image Cropper tool provides an intuitive way to select and cut out specific portions of your images. Whether you need to focus on a particular subject, remove unwanted elements, or adjust the aspect ratio for social media, banners, or presentations, this tool makes it easy. Simply upload your image, draw a rectangle over the desired area, and the image will be cropped to your selection. This is different from an <Link to="/image-resizer">Image Resizer</Link>, which changes the overall dimensions, or an <Link to="/image-flipper">Image Flipper</Link>, which mirrors the image.</p>
        <p>All processing happens client-side in your browser, ensuring your images are not uploaded to any server, thus maintaining your privacy. You can crop an image multiple times or reset to the original uploaded image. Once satisfied, download the cropped image as a PNG. For other image manipulations, explore our suite of <Link to="/image-converters">Image Tools</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Upload an image using the upload area. Common formats like JPG, PNG, GIF, and WEBP are supported.</li>
          <li>Once the image loads on the canvas, click and hold your mouse button.</li>
          <li>Drag your mouse to draw a rectangle over the area you wish to keep. A selection highlight will appear.</li>
          <li>Release the mouse button. The image will be automatically cropped to the selected area.</li>
          <li>If you wish to crop the newly cropped image further, simply draw another selection. To start over with the original image, click "Reset to Original".</li>
          <li>Click "Download Cropped" to save the result. The image will be downloaded in PNG format.</li>
        </ol>
        <p className="mt-4">This tool is perfect for quick, precise image cropping without needing complex software. Check out our <Link to="/tools">All Tools</Link> page for more handy utilities.</p>
      </div>
    </div>
  );
};

export default ImageCropper;
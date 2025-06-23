import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, RotateCcw, RotateCw, Download, Upload, Loader2, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import DownloadPageLayout from "@/components/layout/DownloadPageLayout"; 
import { Link } from "react-router-dom";
import { loadImageFromFile } from "@/utils/imageUtils";
import { saveAs } from "file-saver";

const ImageRotator = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [fileName, setFileName] = useState("rotated-image");
  const [originalFileType, setOriginalFileType] = useState("image/png");
  const { toast } = useToast();
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showDownloadPage, setShowDownloadPage] = useState(false);
  const [processedImageBlob, setProcessedImageBlob] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setImageSrc(null);
    setOriginalImage(null);
    setRotation(0); 
    setShowDownloadPage(false);
    setProcessedImageUrl(null);
    setProcessedImageBlob(null);

    try {
      const { img, dataUrl, file: loadedFile } = await loadImageFromFile(file);
      setFileName(loadedFile.name.split('.')[0] || "rotated-image");
      setOriginalFileType(loadedFile.type);
      setImageSrc(dataUrl);
      setOriginalImage(img);
    } catch (error) {
       toast({
        title: "Upload Failed",
        description: error.message || "Invalid image file. Please try a different file.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const rotateImage = (degrees) => {
    setRotation((prevRotation) => (prevRotation + degrees + 360) % 360);
  };

  const applyRotationAndDisplay = () => {
    if (!originalImage) return;
    setProcessing(true);
    try {
      const img = originalImage;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const rad = (rotation * Math.PI) / 180;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);

      const newWidth = Math.abs(img.width * cos) + Math.abs(img.height * sin);
      const newHeight = Math.abs(img.width * sin) + Math.abs(img.height * cos);

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate(rad);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0); 
      
      canvas.toBlob((blob) => {
        if (!blob) {
          toast({ title: "Error", description: "Failed to process image.", variant: "destructive" });
          setProcessing(false);
          return;
        }
        if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
        setProcessedImageBlob(blob);
        setProcessedImageUrl(URL.createObjectURL(blob));
        setShowDownloadPage(true);
        setProcessing(false);
        toast({
          title: "Rotation Applied!",
          description: `Image rotated by ${rotation} degrees.`,
        });
      }, originalFileType);
    } catch(error) {
       toast({ title: "Error", description: "An unexpected error occurred during rotation.", variant: "destructive" });
       setProcessing(false);
    }
  };
  
  const handleDownload = () => {
    if (!processedImageBlob) return;
    saveAs(processedImageBlob, `${fileName}_rotated_${rotation}.${originalFileType.split('/')[1] || 'png'}`);
  };

  const handleReset = () => {
    setImageSrc(null);
    setOriginalImage(null);
    setRotation(0);
    setShowDownloadPage(false);
    setProcessedImageUrl(null);
    setProcessedImageBlob(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const actionButtons = [
    { label: "Rotate 90° Left", onClick: () => rotateImage(-90), icon: <RotateCcw /> },
    { label: "Rotate 90° Right", onClick: () => rotateImage(90), icon: <RotateCw /> },
    { label: "Apply Rotation", onClick: applyRotationAndDisplay, variant: "default", icon: <ImageIcon/> }
  ];

  if (showDownloadPage && processedImageUrl) {
    return (
      <DownloadPageLayout
        pageTitle="Download Rotated Image"
        metaDescription={`Your image has been rotated by ${rotation} degrees and is ready for download.`}
        toolName="Image Rotator"
        toolIcon={ImageIcon}
        processedFileName={`${fileName}_rotated_${rotation}.${originalFileType.split('/')[1] || 'png'}`}
        fileDescription={`Successfully rotated image by ${rotation} degrees.`}
        filePreview={<img src={processedImageUrl} alt="Rotated Preview" className="max-w-full max-h-80 object-contain rounded-lg shadow-md" />}
        onDownload={handleDownload}
        downloadButtonText="Download Rotated Image"
        onGoBack={handleReset}
        goBackText="Try Again"
        toolCategory="Image Tools"
        currentToolPath="/image-rotator"
        additionalInfo={
          <div>
            <p className="mb-2">Your image has been rotated! You can go back to rotate further or upload a new image.</p>
            <p>For other image adjustments, try our <Link to="/image-cropper" className="text-blue-600 dark:text-blue-400 underline">Image Cropper</Link> or <Link to="/image-flipper" className="text-blue-600 dark:text-blue-400 underline">Image Flipper</Link>.</p>
          </div>
        }
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Online Image Rotator - Rotate Images Free | Toolzenix</title>
        <meta name="description" content="Rotate your JPG, PNG, or WEBP images online for free. Easily turn images left or right by 90 degrees. Simple, fast, and client-side processing." />
        <link rel="canonical" href="https://toolzenix.com/image-rotator" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Image Rotator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Easily rotate your images by 90 degrees left or right. Upload, rotate, and download.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md mb-6">
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
                  <>
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Processing...</p>
                  </>
                ) : imageSrc ? (
                   <img src={imageSrc} alt="Uploaded preview" className="max-h-full max-w-full object-contain" style={{ transform: `rotate(${rotation}deg)` }} />
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
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          {imageSrc && !processing && (
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {actionButtons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.onClick}
                  variant={button.variant || "outline"}
                  className="min-w-[160px]"
                >
                  {button.icon && React.cloneElement(button.icon, { className: "w-5 h-5 mr-2" })}
                  {button.label}
                </Button>
              ))}
               <Button onClick={handleReset} variant="outline">
                  <RefreshCcw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
            </div>
          )}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300"
      >
        <h2 className="text-2xl font-semibold mb-4">About Our Image Rotator</h2>
        <p>Our Image Rotator tool allows you to quickly and easily rotate your images. Whether you need to turn an image 90 degrees to the left or right, this tool provides a simple interface to get the job done. It's perfect for correcting the orientation of photos taken sideways or for creative image manipulation.</p>
        <p>The tool supports common image formats like JPG, PNG, and WEBP. All processing is done client-side in your browser, meaning your images are not uploaded to any server, ensuring your privacy and security. After rotating, you can preview the result and download the modified image. For other image adjustments, consider our <Link to="/image-cropper">Image Cropper</Link> or <Link to="/image-flipper">Image Flipper</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Drag and drop your image file (JPG, PNG, WEBP, etc.) onto the upload area, or click to select a file from your device. A preview will appear.</li>
          <li>Once the image is uploaded, a preview will be displayed.</li>
          <li>Use the "Rotate 90° Left" or "Rotate 90° Right" buttons to adjust the image orientation. The preview will update with each rotation.</li>
          <li>When you are satisfied with the rotation, click the "Apply Rotation" button. This will process the image and take you to the download page.</li>
          <li>On the download page, you can preview the final rotated image and click "Download Rotated Image" to save it to your device.</li>
        </ol>
        <p className="mt-4">This tool is ideal for photographers, social media users, and anyone needing to quickly adjust image orientation. Explore more <Link to="/image-converters">Image Tools</Link> or browse <Link to="/tools">all available tools</Link> on Toolzenix.</p>
      </motion.div>
    </div>
  );
};

export default ImageRotator;
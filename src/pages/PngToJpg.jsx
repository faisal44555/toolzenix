import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Download, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import DownloadPageLayout from "@/components/layout/DownloadPageLayout";
import { loadImageFromFile } from "@/utils/imageUtils";
import { saveAs } from "file-saver";

const PngToJpg = () => {
  const [convertedImageBlob, setConvertedImageBlob] = useState(null);
  const [convertedImageUrl, setConvertedImageUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  const [fileName, setFileName] = useState("converted-image");
  const [showDownloadPage, setShowDownloadPage] = useState(false);
  const [originalFileName, setOriginalFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleConvertToJPG = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setShowDownloadPage(false);
    setConvertedImageUrl(null);
    setConvertedImageBlob(null);
    setPreviewUrl(null);

    if (!file.type.includes('image/png')) {
      toast({
        title: "Invalid file type",
        description: "Please select a PNG image.",
        variant: "destructive"
      });
      setProcessing(false);
      return;
    }

    try {
      const { img, file: loadedFile, dataUrl } = await loadImageFromFile(file);
      setPreviewUrl(dataUrl);
      setOriginalFileName(loadedFile.name);
      setFileName(loadedFile.name.split('.')[0] || "converted-image");
      
      setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            setConvertedImageBlob(blob);
            if (convertedImageUrl) URL.revokeObjectURL(convertedImageUrl);
            setConvertedImageUrl(URL.createObjectURL(blob));
            setShowDownloadPage(true);
            toast({
              title: "Conversion successful!",
              description: "Your image has been converted to JPG format."
            });
          } else {
            throw new Error("Canvas to Blob conversion failed.");
          }
          setProcessing(false);
        }, "image/jpeg", 0.9);
      }, 100);

    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error.message || "Invalid image file. Please try a different file.",
        variant: "destructive"
      });
      setProcessing(false);
      setPreviewUrl(null);
    }
  };

  const handleDownload = () => {
    if (!convertedImageBlob) return;
    saveAs(convertedImageBlob, `${fileName}.jpg`);
  };

  const handleReset = () => {
    setShowDownloadPage(false);
    setConvertedImageUrl(null);
    setConvertedImageBlob(null);
    setPreviewUrl(null);
    setOriginalFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (showDownloadPage && convertedImageUrl) {
    return (
      <DownloadPageLayout
        pageTitle="Download JPG Image"
        metaDescription={`Your PNG image ${originalFileName} has been converted to JPG format.`}
        toolName="PNG to JPG Converter"
        toolIcon={ImageIcon}
        processedFileName={`${fileName}.jpg`}
        fileDescription={`Successfully converted ${originalFileName} to JPG.`}
        filePreview={<img src={convertedImageUrl} alt="Converted JPG Preview" className="max-w-full max-h-80 object-contain rounded-lg shadow-md" />}
        onDownload={handleDownload}
        downloadButtonText="Download JPG Image"
        onGoBack={handleReset}
        goBackText="Try Again"
        additionalInfo={<p>JPG format is widely compatible and great for photographs, offering smaller file sizes.</p>}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>PNG to JPG Converter - Free Online Tool | Toolzenix</title>
        <meta name="description" content="Convert PNG images to JPG format instantly. Free, fast, and secure online image converter." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          PNG to JPG Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert your PNG images to JPG format instantly. Free, fast, and secure.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          {previewUrl && (
            <div className="w-full text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Image Preview:</h3>
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-72 mx-auto rounded-lg shadow-lg border dark:border-gray-700" />
            </div>
          )}
          <div className="w-full max-w-md">
            <label 
              htmlFor="file-upload"
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <input
                id="file-upload"
                type="file"
                accept=".png"
                onChange={handleConvertToJPG}
                className="sr-only"
                disabled={processing}
                ref={fileInputRef}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {processing ? (
                  <>
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Converting...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      Drag and drop your PNG file here, or click to select
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Maximum file size: 10MB
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Why Convert PNG to JPG?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <ImageIcon className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Smaller File Size
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              JPG files are typically smaller than PNG files
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <ImageIcon className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Wide Compatibility
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              JPG is supported by virtually all platforms
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <ImageIcon className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Fast Loading
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Perfect for web images that need to load quickly
            </p>
          </div>
        </div>
      </motion.div>
      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Upload your PNG image file. A preview will appear.</li>
          <li>The tool will automatically convert the image to JPG format.</li>
          <li>You'll be taken to a download page with a preview of the converted JPG.</li>
          <li>Click "Download JPG Image" to save your new file.</li>
        </ul>
      </div>
    </div>
  );
};

export default PngToJpg;
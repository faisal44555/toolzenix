import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Download, Upload, Loader2, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import ToolResultPage from "@/components/layout/ToolResultPage";
import { Link } from "react-router-dom";
import { loadImageFromFile } from "@/utils/imageUtils";
import { saveAs } from "file-saver";

const JpgToPng = () => {
  const [convertedImageBlob, setConvertedImageBlob] = useState(null);
  const [convertedImageUrl, setConvertedImageUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  const [fileName, setFileName] = useState("converted-image");
  const [showDownloadPage, setShowDownloadPage] = useState(false);
  const [originalFileName, setOriginalFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleConvertToPNG = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setShowDownloadPage(false);
    setConvertedImageUrl(null);
    setConvertedImageBlob(null);
    setPreviewUrl(null);

    if (!file.type.includes('image/jpeg')) {
      toast({
        title: "Invalid file type",
        description: "Please select a JPG/JPEG image.",
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
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            setConvertedImageBlob(blob);
            if (convertedImageUrl) URL.revokeObjectURL(convertedImageUrl);
            setConvertedImageUrl(URL.createObjectURL(blob));
            setShowDownloadPage(true);
            toast({
              title: "Conversion successful!",
              description: "Your image has been converted to PNG format."
            });
          } else {
            throw new Error("Canvas to Blob conversion failed.");
          }
          setProcessing(false);
        }, 'image/png');
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
    saveAs(convertedImageBlob, `${fileName}.png`);
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
      <ToolResultPage
        pageTitle="Download PNG Image"
        metaDescription={`Your JPG image ${originalFileName} has been converted to PNG format.`}
        toolName="JPG to PNG Converter"
        toolIcon={ImageIcon}
        processedFileName={`${fileName}.png`}
        fileDescription={`Successfully converted ${originalFileName} to PNG format with transparency support!`}
        filePreview={<img src={convertedImageUrl} alt="Converted PNG Preview" className="max-w-full max-h-80 object-contain rounded-lg shadow-md" />}
        onDownload={handleDownload}
        downloadButtonText="Download PNG Image"
        onGoBack={handleReset}
        goBackText="Try Again"
        toolCategory="Image Tools"
        currentToolPath="/jpg-to-png"
        additionalInfo={
          <div>
            <p className="mb-2">PNG format is perfect for images requiring transparency or lossless quality!</p>
            <p>It's widely used for web graphics, logos, and images with sharp details. Try our <Link to="/png-to-jpg" className="text-blue-600 dark:text-blue-400 underline">PNG to JPG Converter</Link> for the reverse conversion, or explore our <Link to="/image-compressor" className="text-blue-600 dark:text-blue-400 underline">Image Compressor</Link> to optimize file sizes.</p>
          </div>
        }
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>JPG to PNG Converter - Free Online Image Conversion | Toolzenix</title>
        <meta name="description" content="Convert your JPG or JPEG images to PNG format quickly and easily. Our free online tool preserves image quality and supports transparency. No registration required." />
        <link rel="canonical" href="https://toolzenix.com/jpg-to-png" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          JPG to PNG Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert your JPG/JPEG images to PNG format instantly. Free, fast, and secure. PNG offers lossless compression and transparency support.
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
                accept=".jpg,.jpeg"
                onChange={handleConvertToPNG}
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
                      Drag and drop your JPG/JPEG file here, or click to select
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
        className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300"
      >
        <h2 className="text-2xl font-semibold mb-4">About Our JPG to PNG Converter</h2>
        <p>Our JPG to PNG Converter is a simple and efficient tool for changing your image format from JPG (or JPEG) to PNG. JPG is a lossy compression format commonly used for photographs, while PNG is a lossless format that supports transparency, making it ideal for web graphics, logos, and images where quality and sharp lines are crucial.</p>
        <p>This tool processes your images directly in your browser, ensuring privacy and speed. No files are uploaded to a server. Converting to PNG can be beneficial when you need to preserve image details perfectly or require a transparent background for your graphics. If you need to convert in the other direction, try our <Link to="/png-to-jpg">PNG to JPG Converter</Link>. For other image modifications, explore our <Link to="/image-compressor">Image Compressor</Link> or <Link to="/image-resizer">Image Resizer</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Why Convert JPG to PNG?</h3>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Lossless Quality:</strong> PNG format uses lossless compression, meaning no image data is lost during compression. This is great for graphics, text-based images, and images requiring sharp details.</li>
            <li><strong>Transparency Support:</strong> PNG is one of the few widely supported formats that can handle transparent backgrounds. This is essential for logos, icons, and web graphics that need to blend seamlessly with different backgrounds.</li>
            <li><strong>Web Optimization:</strong> While JPGs are often smaller for photos, PNGs are preferred for graphics with sharp lines, text, or areas of solid color due to their crisp rendering.</li>
            <li><strong>Editing Flexibility:</strong> Since PNG is lossless, it's a better format for images that will undergo multiple rounds of editing, as it avoids the generational quality loss that can occur with JPGs.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Drag and drop your JPG or JPEG image file onto the upload area, or click to select a file from your device.</li>
          <li>A preview will appear, and the tool will automatically start converting the image to PNG format.</li>
          <li>Once the conversion is complete, you'll be redirected to a download page. This page will display a preview of your new PNG image.</li>
          <li>Click the "Download PNG Image" button to save the converted file to your device.</li>
        </ol>
        <p className="mt-4">This tool is perfect for web designers, graphic artists, and anyone needing to quickly convert JPGs to high-quality PNGs. Explore more <Link to="/image-converters">Image Tools</Link> or browse <Link to="/tools">all available tools</Link> on Toolzenix for a complete suite of utilities.</p>
      </motion.div>
    </div>
  );
};

export default JpgToPng;
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

const ImageCompressor = () => {
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [compressedImageUrl, setCompressedImageUrl] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  const [fileName, setFileName] = useState("compressed-image");
  const [showDownloadPage, setShowDownloadPage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProcessing(true);
    setShowDownloadPage(false);
    setCompressedImageUrl(null);
    setCompressedBlob(null);
    setPreviewUrl(null);

    try {
      const { img, file: loadedFile, dataUrl } = await loadImageFromFile(file);
      setPreviewUrl(dataUrl);
      
      setFileName(loadedFile.name.split('.')[0] || "compressed-image");
      setOriginalSize(loadedFile.size);

      setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            setCompressedBlob(blob);
            setCompressedSize(blob.size);
            const compressedDataUrl = URL.createObjectURL(blob);
            setCompressedImageUrl(compressedDataUrl);
            setShowDownloadPage(true);
            toast({
              title: "Compression successful!",
              description: `Original: ${(loadedFile.size / 1024).toFixed(2)} KB, Compressed: ${(blob.size / 1024).toFixed(2)} KB`
            });
          } else {
            toast({
              title: "Compression Failed",
              description: "Could not compress the image. Try a different image or format.",
              variant: "destructive"
            });
          }
          setProcessing(false);
        }, 'image/jpeg', 0.7);
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

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleDownload = () => {
    if (!compressedBlob) {
        toast({ title: "Download Error", description: "No compressed image data found.", variant: "destructive" });
        return;
    }
    saveAs(compressedBlob, `${fileName}.jpg`);
  };

  const handleReset = () => {
    setShowDownloadPage(false);
    setCompressedImageUrl(null);
    setCompressedBlob(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (showDownloadPage && compressedImageUrl) {
    const reductionPercent = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(2) : 0;
    return (
      <ToolResultPage
        pageTitle="Download Compressed Image"
        metaDescription="Your compressed image is ready for download. Reduced file size while maintaining quality."
        toolName="Image Compressor"
        toolIcon={ImageIcon}
        processedFileName={`${fileName}.jpg`}
        fileDescription={`Successfully compressed your image with ${reductionPercent}% size reduction!`}
        filePreview={<img src={compressedImageUrl} alt="Compressed Preview" className="max-w-full max-h-80 object-contain rounded-lg shadow-md" />}
        onDownload={handleDownload}
        downloadButtonText="Download Compressed Image"
        onGoBack={handleReset}
        goBackText="Try Again"
        toolCategory="Image Tools"
        currentToolPath="/image-compressor"
        fileSize={`${formatBytes(compressedSize)} (was ${formatBytes(originalSize)})`}
        qualityInfo={`${reductionPercent}% smaller`}
        additionalInfo={
          <div>
            <p className="mb-2">Your image has been compressed to reduce file size while maintaining visual quality!</p>
            <p>This is perfect for faster web loading and saving storage space. For other image optimizations, try our <Link to="/image-resizer" className="text-blue-600 dark:text-blue-400 underline">Image Resizer</Link> or <Link to="/image-cropper" className="text-blue-600 dark:text-blue-400 underline">Image Cropper</Link>.</p>
          </div>
        }
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Online Image Compressor - Reduce JPG/PNG Size Free | Toolzenix</title>
        <meta name="description" content="Compress JPG, PNG, WEBP, and other image formats online for free. Reduce image file sizes significantly while maintaining visual quality. Perfect for web optimization and saving storage space." />
        <link rel="canonical" href="https://toolzenix.com/image-compressor" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Image Compressor
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Compress your images while maintaining quality. Fast, free, and secure. Reduce file sizes for faster websites and easier sharing.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          {previewUrl && !processing && (
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
                    <p className="text-gray-600 dark:text-gray-400">Compressing...</p>
                  </>
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
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300"
      >
        <h2 className="text-2xl font-semibold mb-4">About Our Image Compressor</h2>
        <p>Our Image Compressor tool helps you reduce the file size of your images without significant loss in visual quality. This is essential for optimizing images for web use, as smaller images lead to faster page load times, improved user experience, and better SEO rankings. It's also great for saving storage space and making images easier to share via email or social media.</p>
        <p>The tool supports various common image formats like JPG, PNG, and WEBP. It uses a balanced compression algorithm (JPEG at 0.7 quality by default) to achieve good size reduction while preserving detail. All processing is done client-side in your browser, ensuring your images are not uploaded to any server, thus maintaining your privacy. For other image manipulations, you might like our <Link to="/image-resizer">Image Resizer</Link> or <Link to="/image-cropper">Image Cropper</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Why Compress Images?</h3>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Faster Website Loading:</strong> Smaller image files mean your web pages load quicker, which is crucial for user retention and SEO.</li>
            <li><strong>Save Storage Space:</strong> Reduce the disk space occupied by your image library on your devices or servers.</li>
            <li><strong>Improved SEO:</strong> Search engines like Google favor fast-loading websites. Optimized images contribute to better search rankings.</li>
            <li><strong>Easier Sharing:</strong> Smaller images are quicker to upload and share via email, messaging apps, or social media platforms.</li>
            <li><strong>Reduced Bandwidth Usage:</strong> Save on data transfer costs for both you and your website visitors.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Drag and drop your image file (JPG, PNG, WEBP, etc.) onto the upload area, or click to select a file from your device.</li>
          <li>A preview of your image will appear, and the tool will automatically start compressing it.</li>
          <li>Once compression is complete, you'll be redirected to a download page. This page will display a preview of the compressed image, along with details about the original and compressed file sizes, and the percentage of reduction achieved.</li>
          <li>Click the "Download Compressed Image" button to save the optimized image to your device. The compressed image will typically be in JPG format.</li>
        </ol>
        <p className="mt-4">This tool is ideal for web developers, bloggers, social media managers, or anyone looking to optimize images quickly and easily. Explore more <Link to="/image-converters">Image Tools</Link> or browse <Link to="/tools">all available tools</Link> on Toolzenix.</p>
      </motion.div>
    </div>
  );
};

export default ImageCompressor;
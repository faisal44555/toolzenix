import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import jsQR from "jsqr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, AlertTriangle, Clipboard, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const QrImageDecoder = () => {
  const [decodedText, setDecodedText] = useState("");
  const [error, setError] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setError("");
      setDecodedText("");
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current) {
            const canvasElement = canvasRef.current;
            const context = canvasElement.getContext("2d");
            canvasElement.width = img.width;
            canvasElement.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              setDecodedText(code.data);
              toast({ title: "QR Code Decoded!", description: "Content displayed below." });
            } else {
              setError("No QR code found in the uploaded image.");
              toast({ title: "Decode Error", description: "Could not find a QR code in the image.", variant: "destructive" });
            }
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
     // Reset file input to allow uploading the same file again
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleCopyResult = () => {
    if (decodedText) {
      navigator.clipboard.writeText(decodedText);
      toast({ title: "Copied!", description: "Decoded content copied to clipboard." });
    }
  };

  const handleClear = () => {
    setDecodedText("");
    setError("");
    setImageSrc(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    toast({ title: "Cleared", description: "Input and results cleared." });
  };

  return (
    <ToolPageLayout
      pageTitle="QR Code Image Decoder"
      pageDescription="Upload an image containing a QR code (PNG, JPG, GIF) and instantly decode its content. Free online tool to read QR codes from image files. Fast and secure."
      canonicalPath="/qr-image-decoder"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg space-y-6 max-w-2xl mx-auto"
      >
        <div 
          className="w-full aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          {imageSrc ? (
            <img src={imageSrc} alt="Uploaded QR Code Preview" className="max-w-full max-h-full object-contain" />
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 p-4">
              <UploadCloud className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2" />
              <p>Click to upload QR Code image</p>
              <p className="text-xs">(PNG, JPG, GIF)</p>
            </div>
          )}
        </div>
        <Input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          className="hidden" 
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {error && (
          <div className="flex items-center text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-md">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {decodedText && (
          <div className="space-y-3 pt-4 border-t dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Decoded Text:</h3>
            <Textarea value={decodedText} readOnly rows={5} className="dark:bg-gray-700 dark:text-white" />
            <Button onClick={handleCopyResult} variant="outline" className="w-full">
              <Clipboard className="w-4 h-4 mr-2" /> Copy Decoded Text
            </Button>
          </div>
        )}
        
        <Button onClick={handleClear} variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" /> Clear
        </Button>
      </motion.div>

      <div className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">About Our QR Image Decoder</h2>
        <p>The QR Image Decoder is a tool designed to extract information from QR codes embedded in image files. If you have an image (such as a screenshot, a photo of a poster, or a downloaded graphic) that contains a QR code, this tool allows you to upload it and read the encoded data. This is particularly useful when you can't scan a QR code directly with your camera but have an image of it.</p>
        <p>Our decoder supports common image formats like PNG, JPG, and GIF. The decoding process happens entirely within your browser, ensuring that your images and the decoded data remain private and are not uploaded to any server. If you need to scan a QR code using your camera, try our <Link to="/qr-code-scanner">QR Code Scanner</Link>. To create your own QR codes, use our <Link to="/qr-code-generator">QR Code Generator</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Click on the upload area or the "Click to upload QR Code image" text.</li>
          <li>Select an image file (PNG, JPG, GIF, etc.) from your device that contains a QR code.</li>
          <li>The tool will attempt to detect and decode the QR code within the uploaded image.</li>
          <li>If a QR code is successfully decoded, the extracted text or data will appear in the "Decoded Text" area.</li>
          <li>If no QR code is found or if it's unreadable, an error message will be displayed. Try using a clearer image or ensure the QR code is fully visible.</li>
          <li>You can click "Copy Decoded Text" to copy the result to your clipboard.</li>
          <li>Click "Clear" to remove the current image and result, allowing you to upload a new image.</li>
        </ol>
        <p className="mt-4">This tool is helpful for situations where direct scanning isn't possible, such as extracting information from QR codes in documents, presentations, or saved images. Explore more <Link to="/qr-barcode-tools">QR & Barcode Tools</Link> or browse <Link to="/tools">all available tools</Link> on Toolzenix.</p>
      </div>
    </ToolPageLayout>
  );
};

export default QrImageDecoder;
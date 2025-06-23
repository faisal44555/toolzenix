import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import jsQR from "jsqr"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, UploadCloud, Zap, Clipboard, AlertTriangle, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const BarcodeScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const [facingMode, setFacingMode] = useState("environment");
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const startScan = async (mode = facingMode) => {
    setError("");
    setScanResult("");
    setIsRequestingPermission(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser does not support camera access. Please use a modern browser.");
      }
      
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        setIsScanning(true);
        requestAnimationFrame(tick);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      let userMessage = "Could not access camera. Please ensure it's not in use and permissions are granted.";

      if (err.name === "NotAllowedError") {
        userMessage = "Camera permission denied. Please enable camera access in your browser settings and try again.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
         userMessage = `No camera found for the selected mode (${mode}). Please check device connections or switch cameras.`;
      } else if (err.name === "NotReadableError") {
        userMessage = "The camera is currently in use by another application. Please close the other application and try again.";
      } else if (err.name === "OverconstrainedError") {
        userMessage = `Your device's camera (${mode}) does not support the required video settings.`;
      } else {
        userMessage = err.message || userMessage;
      }
      
      setError(userMessage);
      toast({ title: "Camera Error", description: userMessage, variant: "destructive" });
      setIsScanning(false);
    } finally {
        setIsRequestingPermission(false);
    }
  };

  const stopScan = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsScanning(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  };

  const tick = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
      const video = videoRef.current;
      const canvasElement = canvasRef.current;
      const canvas = canvasElement.getContext("2d");

      canvasElement.height = video.videoHeight;
      canvasElement.width = video.videoWidth;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      
      const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        setScanResult(code.data);
        toast({ title: "Barcode Scanned!", description: "Content displayed below." });
        stopScan();
      }
    }
    if (isScanning && streamRef.current && streamRef.current.active) {
      requestAnimationFrame(tick);
    } else if (isScanning) {
        stopScan();
    }
  };

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);
  
  const handleSwitchCamera = () => {
    if (isScanning) {
        stopScan();
    }
    const newMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newMode);
    setTimeout(() => startScan(newMode), 100);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setError("");
      setScanResult("");
      if (isScanning) stopScan();
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current) {
            const canvasElement = canvasRef.current;
            const canvas = canvasElement.getContext("2d");
            canvasElement.width = img.width;
            canvasElement.height = img.height;
            canvas.drawImage(img, 0, 0, img.width, img.height);
            const imageData = canvas.getImageData(0, 0, img.width, img.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              setScanResult(code.data);
              toast({ title: "Barcode Decoded!", description: "Content from image displayed." });
            } else {
              setError("No barcode found in the uploaded image.");
              toast({ title: "Decode Error", description: "Could not find a barcode in the image.", variant: "destructive" });
            }
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyResult = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      toast({ title: "Copied!", description: "Scanned content copied to clipboard." });
    }
  };

  return (
    <ToolPageLayout
      pageTitle="Online Barcode Scanner"
      pageDescription="Scan barcodes and QR codes instantly using your device's camera or by uploading an image. Fast, free, and easy-to-use online barcode reader. Supports various 2D barcode formats."
      canonicalPath="/barcode-scanner"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg space-y-6"
      >
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative">
          <video ref={videoRef} className={`w-full h-full object-cover ${isScanning ? '' : 'hidden'}`} playsInline />
          {isRequestingPermission && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-4 text-center">
              <Camera className="w-12 h-12 sm:w-16 sm:h-16 mb-4 animate-pulse" />
              <p className="font-semibold">Requesting camera access...</p>
              <p className="text-sm">Please allow camera access to scan.</p>
            </div>
          )}
          {!isScanning && !error && !isRequestingPermission && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-4 text-center">
              <Camera className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
              <p>Camera preview or uploaded image will appear here</p>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-4 text-center">
              <AlertTriangle className="w-12 h-12 mb-2" />
              <p className="font-semibold">Camera Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="flex flex-col sm:flex-row gap-4">
            {!isScanning ? (
                <Button onClick={() => startScan()} className="flex-grow bg-green-500 hover:bg-green-600">
                    <Camera className="w-4 h-4 mr-2" /> Start Camera Scan
                </Button>
            ) : (
                <Button onClick={stopScan} variant="destructive" className="flex-grow">
                    <Zap className="w-4 h-4 mr-2" /> Stop Camera Scan
                </Button>
            )}
            <Button onClick={handleSwitchCamera} variant="outline" title="Switch Camera" className="flex-grow sm:flex-grow-0">
                <RefreshCcw className="w-5 h-5 mr-2" />
                <span>Switch Camera</span>
            </Button>
        </div>
        
        <div>
          <Button onClick={() => fileInputRef.current && fileInputRef.current.click()} variant="outline" className="w-full">
            <UploadCloud className="w-4 h-4 mr-2" /> Upload Barcode Image
          </Button>
          <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">Note: This scanner works best with QR codes and some 2D barcodes. For 1D barcodes (like EAN, UPC), results may vary.</p>

        {scanResult && (
          <div className="space-y-3 pt-4 border-t dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Scan/Decode Result:</h3>
            <Textarea value={scanResult} readOnly rows={4} className="dark:bg-gray-700 dark:text-white" />
            <Button onClick={handleCopyResult} variant="outline" className="w-full">
              <Clipboard className="w-4 h-4 mr-2" /> Copy Result
            </Button>
          </div>
        )}
      </motion.div>

      <div className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">About Our Barcode Scanner</h2>
        <p>Our online Barcode Scanner provides a quick and convenient way to read data encoded in various barcode formats, primarily focusing on QR codes and other 2D barcodes. Whether you need to quickly access a URL, contact information, or any text embedded in a QR code, this tool can help. You can use your device's camera for real-time scanning or upload an image file containing a barcode.</p>
        <p>The scanner utilizes JavaScript-based decoding, meaning all processing happens directly in your browser, ensuring your data privacy. It's designed for ease of use: simply point your camera or select a file, and the tool will attempt to decode the barcode. While it's optimized for QR codes, it may also work with other common 2D barcode types. For generating your own codes, try our <Link to="/barcode-generator">Barcode Generator</Link> or <Link to="/qr-code-generator">QR Code Generator</Link>.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>For Camera Scanning:</strong> Click the "Start Camera Scan" button. If prompted by your browser, grant permission to access your camera. Point your device's camera steadily at the barcode you wish to scan. The tool will attempt to detect and decode it automatically.</li>
          <li><strong>For Image Upload:</strong> Click the "Upload Barcode Image" button. Select an image file (e.g., PNG, JPG) from your device that contains a barcode. The tool will process the image to find and decode the barcode.</li>
          <li>Once a barcode is successfully decoded, the extracted information will appear in the "Scan/Decode Result" text area.</li>
          <li>You can then click the "Copy Result" button to copy the decoded text to your clipboard for easy pasting elsewhere.</li>
          <li>If you encounter issues or want to scan another barcode, you might need to stop the camera scan or clear the previous result.</li>
        </ol>
        <p className="mt-4">This tool is ideal for quickly checking QR codes on posters, products, or websites. It's a handy utility for anyone needing to extract information from barcodes without installing a dedicated app. For a comprehensive list of all our utilities, visit the <Link to="/tools">All Tools</Link> page.</p>
      </div>
    </ToolPageLayout>
  );
};

export default BarcodeScanner;
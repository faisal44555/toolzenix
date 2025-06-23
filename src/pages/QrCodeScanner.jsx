import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import jsQR from "jsqr";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Zap, Clipboard, AlertTriangle, RefreshCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
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
        toast({ title: "QR Code Scanned!", description: "Content displayed below." });
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

  const handleCopyResult = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      toast({ title: "Copied!", description: "Scanned content copied to clipboard." });
    }
  };

  return (
    <ToolPageLayout
      pageTitle="QR Code Scanner"
      pageDescription="Scan QR codes instantly using your device's camera."
      canonicalPath="/qr-code-scanner"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg space-y-6 max-w-2xl mx-auto"
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
              <p>Camera preview will appear here</p>
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
              <Camera className="w-4 h-4 mr-2" /> Start Scan
            </Button>
          ) : (
            <Button onClick={stopScan} variant="destructive" className="flex-grow">
              <Zap className="w-4 h-4 mr-2" /> Stop Scan
            </Button>
          )}
          <Button onClick={handleSwitchCamera} variant="outline" title="Switch Camera" className="flex-grow sm:flex-grow-0">
            <RefreshCcw className="w-5 h-5 mr-2" />
            <span>Switch Camera</span>
          </Button>
        </div>

        {scanResult && (
          <div className="space-y-3 pt-4 border-t dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Scan Result:</h3>
            <Textarea value={scanResult} readOnly rows={4} className="dark:bg-gray-700 dark:text-white" />
            <Button onClick={handleCopyResult} variant="outline" className="w-full">
              <Clipboard className="w-4 h-4 mr-2" /> Copy Result
            </Button>
          </div>
        )}
      </motion.div>
    </ToolPageLayout>
  );
};

export default QrCodeScanner;
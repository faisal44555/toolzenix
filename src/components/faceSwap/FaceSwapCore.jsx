import React, { useState, useRef, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

const FaceSwapCore = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [overlayPreview, setOverlayPreview] = useState(null);
  const [overlayTransform, setOverlayTransform] = useState({
    x: 50,
    y: 50,
    scale: 1,
    rotation: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  
  const backgroundInputRef = useRef(null);
  const overlayInputRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const { toast } = useToast();

  const loadImageFromFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error("No file selected."));
      }

      if (!file.type.startsWith('image/')) {
        return reject(new Error("Invalid image file. Please select a JPG, PNG, GIF, or WEBP file."));
      }

      const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSizeInBytes) {
        return reject(new Error("File is too large. Maximum size is 10MB."));
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          resolve({ img, dataUrl: e.target.result });
        };
        img.onerror = () => {
          reject(new Error("Invalid image data. The file might be corrupted."));
        };
        img.src = e.target.result;
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the file. Please try again."));
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const handleBackgroundUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { img, dataUrl } = await loadImageFromFile(file);
      setBackgroundImage(img);
      setBackgroundPreview(dataUrl);
      
      toast({
        title: "Background Image Uploaded!",
        description: "Base image loaded successfully."
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  }, [loadImageFromFile, toast]);

  const handleOverlayUpload = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { img, dataUrl } = await loadImageFromFile(file);
      setOverlayImage(img);
      setOverlayPreview(dataUrl);
      
      toast({
        title: "Overlay Face Uploaded!",
        description: "Face to swap loaded successfully."
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  }, [loadImageFromFile, toast]);

  const handleMouseDown = useCallback((e, action) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setDragStart({ x: startX, y: startY });

    if (action === 'drag') {
      setIsDragging(true);
    } else if (action === 'resize') {
      setIsResizing(true);
    } else if (action === 'rotate') {
      setIsRotating(true);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging && !isResizing && !isRotating) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const deltaX = currentX - dragStart.x;
    const deltaY = currentY - dragStart.y;

    if (isDragging) {
      setOverlayTransform(prev => ({
        ...prev,
        x: Math.max(0, Math.min(100, prev.x + (deltaX / rect.width) * 100)),
        y: Math.max(0, Math.min(100, prev.y + (deltaY / rect.height) * 100))
      }));
      setDragStart({ x: currentX, y: currentY });
    } else if (isResizing) {
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const scaleDelta = distance / 100;
      setOverlayTransform(prev => ({
        ...prev,
        scale: Math.max(0.1, Math.min(3, prev.scale + scaleDelta * (deltaY < 0 ? 1 : -1)))
      }));
      setDragStart({ x: currentX, y: currentY });
    } else if (isRotating) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angle = Math.atan2(currentY - centerY, currentX - centerX) * (180 / Math.PI);
      setOverlayTransform(prev => ({
        ...prev,
        rotation: angle
      }));
    }
  }, [isDragging, isResizing, isRotating, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setIsRotating(false);
  }, []);

  const generateFinalImage = useCallback(() => {
    if (!backgroundImage || !overlayImage) {
      toast({
        title: "Missing Images",
        description: "Please upload both background and overlay images.",
        variant: "destructive"
      });
      return null;
    }

    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match background image
    canvas.width = backgroundImage.width;
    canvas.height = backgroundImage.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    ctx.drawImage(backgroundImage, 0, 0);

    // Save context for overlay transformations
    ctx.save();

    // Calculate overlay position and size
    const overlayWidth = overlayImage.width * overlayTransform.scale * 0.3;
    const overlayHeight = overlayImage.height * overlayTransform.scale * 0.3;
    const overlayX = (overlayTransform.x / 100) * canvas.width;
    const overlayY = (overlayTransform.y / 100) * canvas.height;

    // Apply transformations
    ctx.translate(overlayX, overlayY);
    ctx.rotate((overlayTransform.rotation * Math.PI) / 180);
    ctx.translate(-overlayWidth / 2, -overlayHeight / 2);

    // Draw overlay image
    ctx.drawImage(overlayImage, 0, 0, overlayWidth, overlayHeight);

    // Restore context
    ctx.restore();

    return canvas.toDataURL('image/png');
  }, [backgroundImage, overlayImage, overlayTransform, toast]);

  const downloadImage = useCallback(() => {
    const dataUrl = generateFinalImage();
    if (!dataUrl) return;

    toast({
      title: "Downloading file...",
      description: "See notification for download status."
    });

    try {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'face-swap-result.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Success!",
        description: "Your face swap image has been downloaded."
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Failed to download the image.",
        variant: "destructive"
      });
    }
  }, [generateFinalImage, toast]);

  const resetAll = useCallback(() => {
    setBackgroundImage(null);
    setOverlayImage(null);
    setBackgroundPreview(null);
    setOverlayPreview(null);
    setOverlayTransform({
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0
    });
    
    if (backgroundInputRef.current) backgroundInputRef.current.value = '';
    if (overlayInputRef.current) overlayInputRef.current.value = '';
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return {
    backgroundImage,
    overlayImage,
    backgroundPreview,
    overlayPreview,
    overlayTransform,
    isDragging,
    isResizing,
    isRotating,
    backgroundInputRef,
    overlayInputRef,
    canvasRef,
    overlayRef,
    containerRef,
    handleBackgroundUpload,
    handleOverlayUpload,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setOverlayTransform,
    downloadImage,
    resetAll
  };
};

export default FaceSwapCore;
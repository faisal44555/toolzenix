import React, { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const ImageEnhancerCore = ({ onImageLoad, onSettingsChange }) => {
  const [settings, setSettings] = useState({
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    blur: 0
  });
  const [originalImage, setOriginalImage] = useState(null);
  const [imageName, setImageName] = useState("enhanced-image");
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      const img = new Image();
      img.onload = function() {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          
          setOriginalImage(img);
          setImageName(file.name.split('.')[0] || "enhanced-image");
          onImageLoad(true);
          applyFilters();
        }
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  const applyFilters = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.filter = `
      brightness(${settings.brightness})
      contrast(${settings.contrast})
      grayscale(${settings.grayscale})
      blur(${settings.blur}px)
    `;
  };

  const handleSettingChange = (setting, value) => {
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
    applyFilters();
  };

  const downloadImage = () => {
    if (!canvasRef.current || !originalImage) {
      toast({ 
        title: "No Image", 
        description: "Please upload an image first.", 
        variant: "destructive" 
      });
      return;
    }

    toast({
      title: "Downloading file...",
      description: "See notification for download status."
    });

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasRef.current.width;
    tempCanvas.height = canvasRef.current.height;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.filter = canvasRef.current.style.filter;
    tempCtx.drawImage(originalImage, 0, 0);

    const link = document.createElement('a');
    link.download = `${imageName}_enhanced.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const resetImage = () => {
    setOriginalImage(null);
    setImageName("enhanced-image");
    setSettings({
      brightness: 1,
      contrast: 1,
      grayscale: 0,
      blur: 0
    });
    onImageLoad(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [settings]);

  return {
    settings,
    originalImage,
    canvasRef,
    fileInputRef,
    handleImageUpload,
    handleSettingChange,
    downloadImage,
    resetImage
  };
};

export default ImageEnhancerCore;
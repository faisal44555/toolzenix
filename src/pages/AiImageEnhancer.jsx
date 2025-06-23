import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Upload, Download } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { individualTools } from "@/config/navigation";
import ImageEnhancerCore from "@/components/imageEnhancer/ImageEnhancerCore";
import ImageEnhancerSliders from "@/components/imageEnhancer/ImageEnhancerSliders";

const AiImageEnhancer = () => {
  const [hasImage, setHasImage] = useState(false);
  const [currentSettings, setCurrentSettings] = useState({
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    blur: 0
  });

  const relatedTools = individualTools
    .filter(tool => tool.category === "AI Tools" && tool.path !== "/ai-image-enhancer")
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  const enhancerCore = ImageEnhancerCore({
    onImageLoad: setHasImage,
    onSettingsChange: setCurrentSettings
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Helmet>
        <title>AI Image Enhancer - Enhance Photos Online | Toolzenix</title>
        <meta name="description" content="Enhance your images with AI-powered tools. Adjust brightness, contrast, blur, and grayscale with live preview. Download enhanced images instantly." />
        <link rel="canonical" href="https://toolzenix.com/ai-image-enhancer" />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">🤖 AI Image Enhancer</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Enhance your images with powerful AI-driven tools and real-time preview.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center">
          {/* File Upload */}
          <div className="w-full max-w-lg mb-8">
            <label 
              htmlFor="file-upload-enhancer"
              className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
            >
              <input
                ref={enhancerCore.fileInputRef}
                id="file-upload-enhancer"
                type="file"
                accept="image/*"
                onChange={enhancerCore.handleImageUpload}
                className="sr-only"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Drag and drop your image here, or click to select
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Supports JPG, PNG, WEBP, etc. Up to 10MB.
                </p>
              </div>
            </label>
          </div>

          {/* Canvas Preview */}
          <div className="w-full mb-8">
            <canvas
              ref={enhancerCore.canvasRef}
              className="max-w-full max-h-[400px] mx-auto border border-gray-300 dark:border-gray-600 rounded-lg"
              style={{ display: hasImage ? 'block' : 'none' }}
            />
          </div>

          {/* Controls - Only show when image is loaded */}
          {hasImage && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ImageEnhancerSliders
                settings={enhancerCore.settings}
                onSettingChange={enhancerCore.handleSettingChange}
              />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Actions</h3>
                
                <Button
                  onClick={enhancerCore.downloadImage}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Enhanced Image
                </Button>
                
                <Button
                  onClick={enhancerCore.resetImage}
                  variant="outline"
                  className="w-full"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload New Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* How to Use Section */}
      <div className="mt-10 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">How to Use the AI Image Enhancer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Quick Enhancement</h3>
            <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-2 text-sm">
              <li>Upload your image using the upload area</li>
              <li>Adjust sliders to enhance brightness, contrast, grayscale, and blur</li>
              <li>See live preview of changes on the canvas</li>
              <li>Download your enhanced image instantly</li>
            </ul>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">Enhancement Controls</h3>
            <ul className="list-disc list-inside text-purple-700 dark:text-purple-300 space-y-2 text-sm">
              <li>Brightness: Adjust from 50% to 150% for exposure correction</li>
              <li>Contrast: Control from 50% to 150% for better definition</li>
              <li>Grayscale: Convert to black & white (0-100%)</li>
              <li>Blur: Apply artistic blur effect (0-5px)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-12 w-full max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
          You Might Also Like...
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedTools.map(tool => (
            <Link to={tool.path} key={tool.path} className="group block p-4 bg-white dark:bg-slate-800/80 rounded-lg shadow-md hover:shadow-xl hover:border-purple-500 dark:hover:border-purple-400 border border-transparent transition-all duration-300 transform hover:-translate-y-1">
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{tool.name}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiImageEnhancer;
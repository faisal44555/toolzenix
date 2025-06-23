import React from "react";
import { motion } from "framer-motion";
import { Upload, Users, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { individualTools } from "@/config/navigation";
import FaceSwapCore from "@/components/faceSwap/FaceSwapCore";
import FaceSwapPreview from "@/components/faceSwap/FaceSwapPreview";
import FaceSwapControls from "@/components/faceSwap/FaceSwapControls";

const AiFaceSwap = () => {
  const faceSwapCore = FaceSwapCore();
  
  const relatedTools = individualTools
    .filter(tool => tool.category === "AI Tools" && tool.path !== "/ai-face-swap")
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  const hasImages = faceSwapCore.backgroundImage && faceSwapCore.overlayImage;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Face Swap Tool - Swap Faces Online | Toolzenix</title>
        <meta name="description" content="Create amazing face swaps with our interactive tool. Upload two images, drag, resize, and rotate the overlay face, then download your creation instantly." />
        <link rel="canonical" href="https://toolzenix.com/ai-face-swap" />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-block p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
          <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Face <span className="gradient-text">Swap Tool</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Create amazing face swaps with our interactive tool. Upload two images, drag, resize, and rotate the overlay face with real-time preview.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800/70 rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {/* Image Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Background Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
              Background Face
            </h3>
            <label 
              htmlFor="background-upload"
              className="relative block w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <input
                ref={faceSwapCore.backgroundInputRef}
                id="background-upload"
                type="file"
                accept="image/*"
                onChange={faceSwapCore.handleBackgroundUpload}
                className="sr-only"
              />
              {faceSwapCore.backgroundPreview ? (
                <img 
                  src={faceSwapCore.backgroundPreview} 
                  alt="Background Preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Upload background image
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    JPG, PNG, WEBP up to 10MB
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Overlay Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
              Overlay Face
            </h3>
            <label 
              htmlFor="overlay-upload"
              className="relative block w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
            >
              <input
                ref={faceSwapCore.overlayInputRef}
                id="overlay-upload"
                type="file"
                accept="image/*"
                onChange={faceSwapCore.handleOverlayUpload}
                className="sr-only"
              />
              {faceSwapCore.overlayPreview ? (
                <img 
                  src={faceSwapCore.overlayPreview} 
                  alt="Overlay Preview" 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Upload overlay face
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    JPG, PNG, WEBP up to 10MB
                  </p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Preview and Controls Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Preview */}
          <FaceSwapPreview
            backgroundPreview={faceSwapCore.backgroundPreview}
            overlayPreview={faceSwapCore.overlayPreview}
            overlayTransform={faceSwapCore.overlayTransform}
            containerRef={faceSwapCore.containerRef}
            overlayRef={faceSwapCore.overlayRef}
            handleMouseDown={faceSwapCore.handleMouseDown}
            handleMouseMove={faceSwapCore.handleMouseMove}
            handleMouseUp={faceSwapCore.handleMouseUp}
            isDragging={faceSwapCore.isDragging}
            isResizing={faceSwapCore.isResizing}
            isRotating={faceSwapCore.isRotating}
          />

          {/* Transform Controls */}
          <FaceSwapControls
            overlayTransform={faceSwapCore.overlayTransform}
            setOverlayTransform={faceSwapCore.setOverlayTransform}
            downloadImage={faceSwapCore.downloadImage}
            resetAll={faceSwapCore.resetAll}
            hasImages={hasImages}
          />
        </div>

        {/* Hidden Canvas for Final Rendering */}
        <canvas ref={faceSwapCore.canvasRef} className="hidden" />
      </motion.div>

      {/* How to Use Section */}
      <div className="mt-12 w-full max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">How to Use the Face Swap Tool</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Upload Background</h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm">Upload the base image where you want to place the face.</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg text-center">
            <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Upload Overlay Face</h3>
            <p className="text-purple-700 dark:text-purple-300 text-sm">Upload the face image you want to swap onto the background.</p>
          </div>
          <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg text-center">
            <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h3 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">Drag & Adjust</h3>
            <p className="text-pink-700 dark:text-pink-300 text-sm">Drag, resize, and rotate the overlay face to perfect position.</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Download Result</h3>
            <p className="text-green-700 dark:text-green-300 text-sm">Download your final face swap creation instantly.</p>
          </div>
        </div>
      </div>

      {/* Interactive Features */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Interactive Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Drag to Move</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Click and drag the overlay face to position it anywhere on the background image.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Resize & Scale</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Use the blue handle or sliders to resize the overlay face to fit perfectly.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-8 h-8" />
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Rotate & Align</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Use the green handle or rotation slider to align the face at any angle.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="mt-16 w-full max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Explore More AI Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedTools.map(tool => (
            <motion.div
              key={tool.path}
              whileHover={{ y: -5 }}
              className="group block p-6 bg-white dark:bg-gray-800/80 rounded-lg shadow-md hover:shadow-xl hover:border-purple-500 dark:hover:border-purple-400 border border-transparent transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{tool.name}</h4>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
              <div className="mt-4">
                <a href={tool.path} className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
                  Try this tool →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiFaceSwap;
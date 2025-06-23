import React from 'react';
import { Loader2 } from "lucide-react";

const ImageEnhancerPreview = ({ canvasRef, processing }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enhanced Preview</h3>
      <div className="flex justify-center bg-gray-100 dark:bg-gray-700/30 p-4 rounded-lg shadow-inner min-h-[300px]">
        {processing ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-[400px] object-contain border border-gray-200 dark:border-gray-700 rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default ImageEnhancerPreview;
import React from 'react';
import { Upload, Loader2 } from "lucide-react";

const ImageUploadArea = ({ onImageUpload, processing }) => {
  return (
    <div className="w-full max-w-lg">
      <label 
        htmlFor="file-upload-enhancer"
        className="relative block w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
      >
        <input
          id="file-upload-enhancer"
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="sr-only"
          disabled={processing}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          {processing ? (
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
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
  );
};

export default ImageUploadArea;
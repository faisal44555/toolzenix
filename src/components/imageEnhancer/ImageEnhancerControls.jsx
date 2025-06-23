import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Wand2, RotateCcw, Download, Upload, Loader2 } from "lucide-react";

const ImageEnhancerControls = ({
  settings,
  onSettingChange,
  onAutoEnhance,
  onReset,
  onDownload,
  onUploadNew,
  autoEnhancing,
  processing,
  downloading,
  hasImage
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enhancement Controls</h3>
      
      {/* Brightness */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Brightness: {settings.brightness}%
        </Label>
        <Slider
          value={[settings.brightness]}
          onValueChange={(value) => onSettingChange('brightness', value)}
          min={0}
          max={200}
          step={1}
          className="w-full"
          disabled={processing || autoEnhancing}
        />
      </div>

      {/* Contrast */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Contrast: {settings.contrast}%
        </Label>
        <Slider
          value={[settings.contrast]}
          onValueChange={(value) => onSettingChange('contrast', value)}
          min={0}
          max={200}
          step={1}
          className="w-full"
          disabled={processing || autoEnhancing}
        />
      </div>

      {/* Sharpness */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sharpness: {settings.sharpness}%
        </Label>
        <Slider
          value={[settings.sharpness]}
          onValueChange={(value) => onSettingChange('sharpness', value)}
          min={0}
          max={100}
          step={1}
          className="w-full"
          disabled={processing || autoEnhancing}
        />
      </div>

      {/* Blur */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Blur: {settings.blur}px
        </Label>
        <Slider
          value={[settings.blur]}
          onValueChange={(value) => onSettingChange('blur', value)}
          min={0}
          max={10}
          step={0.1}
          className="w-full"
          disabled={processing || autoEnhancing}
        />
      </div>

      {/* Grayscale */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Grayscale: {settings.grayscale}%
        </Label>
        <Slider
          value={[settings.grayscale]}
          onValueChange={(value) => onSettingChange('grayscale', value)}
          min={0}
          max={100}
          step={1}
          className="w-full"
          disabled={processing || autoEnhancing}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          onClick={onAutoEnhance}
          disabled={autoEnhancing || processing || !hasImage}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          {autoEnhancing ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Wand2 className="w-5 h-5 mr-2" />
          )}
          Auto Enhance
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          disabled={processing || autoEnhancing}
          className="flex-1"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
      </div>

      {/* Download and Upload Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={onDownload}
          disabled={downloading || processing || autoEnhancing || !hasImage}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {downloading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Download className="w-5 h-5 mr-2" />
          )}
          Download Enhanced Image
        </Button>
        
        <Button
          onClick={onUploadNew}
          variant="outline"
          className="w-full"
          disabled={processing || autoEnhancing}
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload New Image
        </Button>
      </div>
    </div>
  );
};

export default ImageEnhancerControls;
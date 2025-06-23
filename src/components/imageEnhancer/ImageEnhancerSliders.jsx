import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const ImageEnhancerSliders = ({ settings, onSettingChange, disabled = false }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Enhancement Controls</h3>
      
      {/* Brightness */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Brightness: {Math.round(settings.brightness * 100)}%
        </Label>
        <Slider
          value={[settings.brightness]}
          onValueChange={(value) => onSettingChange('brightness', value[0])}
          min={0.5}
          max={1.5}
          step={0.1}
          className="w-full"
          disabled={disabled}
        />
      </div>

      {/* Contrast */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Contrast: {Math.round(settings.contrast * 100)}%
        </Label>
        <Slider
          value={[settings.contrast]}
          onValueChange={(value) => onSettingChange('contrast', value[0])}
          min={0.5}
          max={1.5}
          step={0.1}
          className="w-full"
          disabled={disabled}
        />
      </div>

      {/* Grayscale */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Grayscale: {Math.round(settings.grayscale * 100)}%
        </Label>
        <Slider
          value={[settings.grayscale]}
          onValueChange={(value) => onSettingChange('grayscale', value[0])}
          min={0}
          max={1}
          step={0.1}
          className="w-full"
          disabled={disabled}
        />
      </div>

      {/* Blur */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Blur: {settings.blur}px
        </Label>
        <Slider
          value={[settings.blur]}
          onValueChange={(value) => onSettingChange('blur', value[0])}
          min={0}
          max={5}
          step={0.5}
          className="w-full"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ImageEnhancerSliders;
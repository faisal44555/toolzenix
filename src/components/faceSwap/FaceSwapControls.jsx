import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download, RotateCcw, RotateCw, Maximize2, Move } from "lucide-react";

const FaceSwapControls = ({ 
  overlayTransform, 
  setOverlayTransform, 
  downloadImage, 
  resetAll,
  hasImages 
}) => {
  const handleTransformChange = (property, value) => {
    setOverlayTransform(prev => ({
      ...prev,
      [property]: Array.isArray(value) ? value[0] : value
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transform Controls</h3>
      
      {/* Position Controls */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Move className="w-4 h-4 mr-1" />
            Horizontal Position: {Math.round(overlayTransform.x)}%
          </Label>
          <Slider
            value={[overlayTransform.x]}
            onValueChange={(value) => handleTransformChange('x', value)}
            min={0}
            max={100}
            step={1}
            className="w-full"
            disabled={!hasImages}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Move className="w-4 h-4 mr-1" />
            Vertical Position: {Math.round(overlayTransform.y)}%
          </Label>
          <Slider
            value={[overlayTransform.y]}
            onValueChange={(value) => handleTransformChange('y', value)}
            min={0}
            max={100}
            step={1}
            className="w-full"
            disabled={!hasImages}
          />
        </div>
      </div>

      {/* Scale Control */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <Maximize2 className="w-4 h-4 mr-1" />
          Scale: {Math.round(overlayTransform.scale * 100)}%
        </Label>
        <Slider
          value={[overlayTransform.scale]}
          onValueChange={(value) => handleTransformChange('scale', value)}
          min={0.1}
          max={3}
          step={0.1}
          className="w-full"
          disabled={!hasImages}
        />
      </div>

      {/* Rotation Control */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <RotateCw className="w-4 h-4 mr-1" />
          Rotation: {Math.round(overlayTransform.rotation)}°
        </Label>
        <Slider
          value={[overlayTransform.rotation]}
          onValueChange={(value) => handleTransformChange('rotation', value)}
          min={-180}
          max={180}
          step={1}
          className="w-full"
          disabled={!hasImages}
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          onClick={downloadImage}
          disabled={!hasImages}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Final Image
        </Button>
        
        <Button
          onClick={resetAll}
          variant="outline"
          className="w-full"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset All
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleTransformChange('rotation', 0)}
          variant="outline"
          size="sm"
          disabled={!hasImages}
        >
          Reset Rotation
        </Button>
        <Button
          onClick={() => handleTransformChange('scale', 1)}
          variant="outline"
          size="sm"
          disabled={!hasImages}
        >
          Reset Scale
        </Button>
      </div>
    </div>
  );
};

export default FaceSwapControls;
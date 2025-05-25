
    import React from 'react';
    import { Label } from '@/components/ui/label';
    import { Slider } from '@/components/ui/slider';

    export function ConversionOptions({ toolId, webpQuality, setWebpQuality, isLoading, selectedFile }) {
      if (toolId === 'png-to-webp' && selectedFile) {
        return (
          <div className="space-y-2">
            <Label htmlFor="webp-quality">WebP Quality: {Math.round(webpQuality[0]*100)}%</Label>
            <Slider
              id="webp-quality"
              min={0.1}
              max={1}
              step={0.05}
              value={webpQuality}
              onValueChange={setWebpQuality}
              className="w-full"
              disabled={isLoading}
            />
          </div>
        );
      }
      return null;
    }
  
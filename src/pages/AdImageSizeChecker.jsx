import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ImagePlus, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const adPlatforms = {
  google: {
    name: 'Google Ads',
    sizes: [
      { name: 'Square', width: 250, height: 250 },
      { name: 'Small Square', width: 200, height: 200 },
      { name: 'Banner', width: 468, height: 60 },
      { name: 'Leaderboard', width: 728, height: 90 },
      { name: 'Inline Rectangle', width: 300, height: 250 },
      { name: 'Large Rectangle', width: 336, height: 280 },
      { name: "Skyscraper", width: 120, height: 600 },
      { name: "Wide Skyscraper", width: 160, height: 600 },
      { name: "Half-Page Ad", width: 300, height: 600 },
      { name: "Large Leaderboard", width: 970, height: 90 },
      { name: "Mobile Banner", width: 320, height: 50 },
      { name: "Large Mobile Banner", width: 320, height: 100 },
    ],
  },
  facebook: {
    name: 'Facebook / Instagram Ads',
    sizes: [
      { name: 'Feed Image (Square)', width: 1080, height: 1080, ratio: '1:1' },
      { name: 'Feed Image (Landscape)', width: 1200, height: 628, ratio: '1.91:1' },
      { name: 'Stories Image (Portrait)', width: 1080, height: 1920, ratio: '9:16' },
      { name: 'Carousel Image', width: 1080, height: 1080, ratio: '1:1' },
      { name: 'Right Column Image', width: 1200, height: 1200, minWidth: 254, minHeight: 133 },
    ],
  },
  twitter: {
    name: 'X (Twitter) Ads',
    sizes: [
      { name: 'In-stream Image (Mobile)', width: 1200, height: 675, ratio: '16:9' },
      { name: 'In-stream Image (Desktop)', width: 1200, height: 675, minWidth: 600, minHeight:335 },
      { name: 'Website Card Image', width: 800, height: 418, ratio: '1.91:1' },
      { name: 'App Card Image', width: 800, height: 418, ratio: '1.91:1' },
    ]
  },
  linkedin: {
    name: 'LinkedIn Ads',
    sizes: [
      { name: 'Sponsored Content Image', width: 1200, height: 627, ratio: '1.91:1' },
      { name: 'Carousel Image', width: 1080, height: 1080, ratio: '1:1' },
      { name: 'Company Page Main Image', width: 1128, height: 191 },
      { name: 'Spotlight Ad Logo', width: 100, height: 100 },
    ]
  }
};

const AdImageSizeChecker = () => {
  const [platform, setPlatform] = useState('google');
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const { toast } = useToast();

  const checkSize = () => {
    const width = parseInt(imageWidth);
    const height = parseInt(imageHeight);

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      toast({ title: "Invalid Dimensions", description: "Please enter valid positive numbers for width and height.", variant: "destructive" });
      setValidationResult(null);
      return;
    }

    const platformSizes = adPlatforms[platform]?.sizes;
    if (!platformSizes) {
      toast({ title: "Platform Error", description: "Selected ad platform not found.", variant: "destructive" });
      setValidationResult(null);
      return;
    }

    const matchedSizes = platformSizes.filter(size => {
      const widthMatch = size.width === width;
      const heightMatch = size.height === height;
      
      // Check for minWidth/minHeight if exact dimensions don't match
      const minWidthMatch = size.minWidth ? width >= size.minWidth : true;
      const minHeightMatch = size.minHeight ? height >= size.minHeight : true;

      if (widthMatch && heightMatch) return true;
      // If ratio is important and exact dimensions are not met, check ratio and min dimensions
      if (size.ratio && minWidthMatch && minHeightMatch) {
        const [ratioW, ratioH] = size.ratio.split(':').map(Number);
        // Allow for slight tolerance in ratio matching due to rounding
        return Math.abs((width / height) - (ratioW / ratioH)) < 0.02;
      }
      return false;
    });

    if (matchedSizes.length > 0) {
      setValidationResult({
        status: 'success',
        message: `Dimensions ${width}x${height}px match the following for ${adPlatforms[platform].name}:`,
        matches: matchedSizes.map(s => `${s.name}${s.ratio ? ` (Ratio: ${s.ratio})` : ''}`)
      });
      toast({ title: "Size Validated!", description: "Matching ad formats found.", action: <CheckCircle2 className="text-green-500" /> });
    } else {
      setValidationResult({
        status: 'error',
        message: `Dimensions ${width}x${height}px do not match standard sizes for ${adPlatforms[platform].name}.`,
        matches: []
      });
      toast({ title: "No Exact Match", description: "Consider checking platform guidelines for custom sizes or aspect ratios.", variant: "default" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Ad Image Size Checker | Toolzenix Marketing Tools</title>
        <meta name="description" content="Validate your ad banner dimensions against standard sizes for Google Ads, Facebook, Instagram, X (Twitter), and LinkedIn. Ensure your creatives are optimized." />
        <link rel="canonical" href="https://toolzenix.com/ad-image-size-checker" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <ImagePlus className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Ad Image Size Checker
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Ensure your ad creatives meet platform dimension requirements.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div>
              <Label htmlFor="platform-select" className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Select Ad Platform
              </Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger id="platform-select" className="w-full mt-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-md p-3 h-auto">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white">
                  {Object.entries(adPlatforms).map(([key, plat]) => (
                    <SelectItem key={key} value={key} className="text-md">{plat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="image-width" className="text-lg font-medium text-gray-700 dark:text-gray-300">Width (px)</Label>
                <Input
                  id="image-width"
                  type="number"
                  value={imageWidth}
                  onChange={(e) => setImageWidth(e.target.value)}
                  placeholder="e.g., 1080"
                  className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="image-height" className="text-lg font-medium text-gray-700 dark:text-gray-300">Height (px)</Label>
                <Input
                  id="image-height"
                  type="number"
                  value={imageHeight}
                  onChange={(e) => setImageHeight(e.target.value)}
                  placeholder="e.g., 1080"
                  className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <Button onClick={checkSize} className="w-full mt-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg py-3">
            Check Dimensions
          </Button>

          {validationResult && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className={`text-xl font-semibold text-center mb-3 ${validationResult.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {validationResult.status === 'success' ? <CheckCircle2 className="inline mr-2 h-5 w-5" /> : <XCircle className="inline mr-2 h-5 w-5" />}
                Validation Result
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-center mb-3">{validationResult.message}</p>
              {validationResult.matches.length > 0 && (
                <ul className="list-disc list-inside space-y-1 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md text-sm text-gray-700 dark:text-gray-200">
                  {validationResult.matches.map((match, index) => (
                    <li key={index}>{match}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-lg mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Why Ad Dimensions Matter</h2>
          <p>
            Using the correct image sizes for your digital ads is crucial for optimal performance. Ads that don't meet platform specifications may be rejected, cropped poorly, or displayed inefficiently, leading to wasted budget and lower engagement.
          </p>
          <p>
            This tool helps you quickly verify if your image dimensions match common ad sizes for major platforms. It does not analyze image content or file size, only pixel dimensions.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default AdImageSizeChecker;
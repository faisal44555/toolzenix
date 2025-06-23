import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Image as ImageIconLucide, UploadCloud, Download, Crop, AlertTriangle, CheckCircle2, RefreshCcw, Loader2 } from 'lucide-react';
import { saveAs } from 'file-saver';
import { loadImageFromFile } from '@/utils/imageUtils';

const socialPresets = {
  instagram_post_square: { name: "Instagram Post (Square 1:1)", width: 1080, height: 1080, icon: <InstagramIcon /> },
  instagram_post_portrait: { name: "Instagram Post (Portrait 4:5)", width: 1080, height: 1350, icon: <InstagramIcon /> },
  instagram_post_landscape: { name: "Instagram Post (Landscape 1.91:1)", width: 1080, height: 566, icon: <InstagramIcon /> },
  instagram_story: { name: "Instagram Story (9:16)", width: 1080, height: 1920, icon: <InstagramIcon /> },
  facebook_post: { name: "Facebook Post (Recommended)", width: 1200, height: 630, icon: <FacebookIcon /> },
  facebook_cover: { name: "Facebook Cover Photo", width: 851, height: 315, icon: <FacebookIcon /> },
  twitter_post: { name: "X/Twitter Post (In-stream 16:9)", width: 1200, height: 675, icon: <TwitterIcon /> },
  twitter_header: { name: "X/Twitter Header", width: 1500, height: 500, icon: <TwitterIcon /> },
  linkedin_post_image: { name: "LinkedIn Post Image (1.91:1)", width: 1200, height: 627, icon: <LinkedInIcon /> },
  linkedin_cover: { name: "LinkedIn Cover Image", width: 1584, height: 396, icon: <LinkedInIcon /> },
  youtube_thumbnail: { name: "YouTube Thumbnail (16:9)", width: 1280, height: 720, icon: <YoutubeIcon /> },
  pinterest_pin: { name: "Pinterest Pin (2:3)", width: 1000, height: 1500, icon: <PinterestIcon /> },
  custom: { name: "Custom Dimensions", width: 0, height: 0, icon: <Crop /> }
};

function InstagramIcon(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8c1.99 0 3.6-1.61 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"></path></svg>; }
function FacebookIcon(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"></path></svg>; }
function TwitterIcon(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}><path fill="currentColor" d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334c0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518a3.301 3.301 0 0 0 1.447-1.817a6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429a3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218a3.203 3.203 0 0 1-.865.115a3.23 3.23 0 0 1-.614-.057a3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15Z"></path></svg>; }
function LinkedInIcon(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"></path></svg>; }
function YoutubeIcon(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 180" {...props}><path fill="currentColor" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.842 0 128.228 0 128.228 0S48.612 0 28.765 5.418A32.18 32.18 0 0 0 6.109 28.075C0 48.046 0 89.838 0 89.838s0 41.792 6.109 61.763a32.18 32.18 0 0 0 22.656 22.657c19.848 5.418 99.463 5.418 99.463 5.418s79.615 0 99.463-5.418a32.18 32.18 0 0 0 22.657-22.657c6.108-19.971 6.108-61.763 6.108-61.763s0-41.793-6.109-61.763Z"></path><path fill="#FFF" d="m102.421 128.06l66.328-38.408l-66.328-38.408v76.816Z"></path></svg>; }
function PinterestIcon(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M9.043 21.757a2.048 2.048 0 0 1-1.006-.293c-.63-.356-3.213-1.853-3.213-5.431V9.799L2 12L2.002 8l5.038-2.405c.06-.029 2.33-1.094 5.038.518c2.143 1.272 3.31 3.577 3.31 5.969c0 3.84-2.048 7.107-5.08 7.107c-.93 0-1.785-.355-1.785-.355s-.508 1.834-.703 2.589a.75.75 0 0 1-.748.63Z"></path><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm2.77 16.36a4.29 4.29 0 0 0 3.31-3.996c0-3.31-2.223-6.138-5.187-6.138c-2.857 0-5.187 2.33-5.187 5.294c0 2.143.93 3.683 1.942 3.683c.53 0 .836-.53.836-.53s-.53 2.048-.725 2.75a.75.75 0 0 0 .688.855c.048 0 .095-.008.14-.023C10.76 19.84 12 17.523 12 17.523s.93 1.785 1.076 1.837Z"></path></svg>; }

const SocialMediaImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [preset, setPreset] = useState('custom');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [resizedImage, setResizedImage] = useState(null);
  const [originalFileName, setOriginalFileName] = useState('');
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    handleReset(false);
    setIsProcessing(true);

    try {
      const { img, dataUrl, file: loadedFile } = await loadImageFromFile(file);
      setSelectedFile(loadedFile);
      setOriginalImage(img);
      setOriginalFileName(loadedFile.name.split('.').slice(0, -1).join('.'));
      setImagePreview(dataUrl);
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive', action: <AlertTriangle /> });
      handleReset(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePresetChange = (value) => {
    setPreset(value);
    if (value !== 'custom' && socialPresets[value]) {
      setWidth(socialPresets[value].width.toString());
      setHeight(socialPresets[value].height.toString());
    } else {
      setWidth('');
      setHeight('');
    }
  };

  const handleResize = () => {
    if (!selectedFile || !originalImage) {
      toast({ title: 'No Image Selected', description: 'Please upload an image first.', variant: 'destructive', action: <AlertTriangle /> });
      return;
    }
    const numWidth = parseInt(width);
    const numHeight = parseInt(height);

    if (isNaN(numWidth) || isNaN(numHeight) || numWidth <= 0 || numHeight <= 0) {
      toast({ title: 'Invalid Dimensions', description: 'Please enter valid positive numbers for width and height.', variant: 'destructive', action: <AlertTriangle /> });
      return;
    }

    setIsProcessing(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = numWidth;
      canvas.height = numHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(originalImage, 0, 0, numWidth, numHeight);
      
      canvas.toBlob((blob) => {
        if (blob) {
          if (resizedImage) URL.revokeObjectURL(resizedImage);
          setResizedImage(URL.createObjectURL(blob));
          toast({ title: 'Image Resized!', description: `Successfully resized to ${numWidth}x${numHeight}px.`, action: <CheckCircle2 className="text-green-500" /> });
        } else {
          throw new Error("Canvas to Blob conversion failed.");
        }
        setIsProcessing(false);
      }, selectedFile.type);
    } catch (error) {
      toast({ title: 'Resize Error', description: `Could not resize image. ${error.message}`, variant: 'destructive', action: <AlertTriangle /> });
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedImage || !originalFileName) {
      toast({ title: 'No Resized Image', description: 'Please resize an image first.', variant: 'destructive' });
      return;
    }
    const fileExtension = selectedFile.type.split('/')[1] || 'png';
    const newFileName = `${originalFileName}_${width}x${height}.${fileExtension}`;
    saveAs(resizedImage, newFileName);
  };
  
  const handleReset = (showToast = true) => {
    setSelectedFile(null);
    setOriginalImage(null);
    setImagePreview(null);
    setPreset('custom');
    setWidth('');
    setHeight('');
    if (resizedImage) URL.revokeObjectURL(resizedImage);
    setResizedImage(null);
    setOriginalFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (showToast) {
      toast({ title: 'Reset', description: 'All fields and image cleared.' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Social Media Image Resizer | Toolzenix</title>
        <meta name="description" content="Easily resize your images for popular social media platforms like Instagram, Facebook, Twitter, LinkedIn, YouTube, and Pinterest. Custom dimensions also available." />
        <link rel="canonical" href="https://toolzenix.com/social-media-image-resizer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <ImageIconLucide className="w-16 h-16 text-teal-500 dark:text-teal-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Social Media Image Resizer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Quickly resize images for your social media posts and profiles.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="image-upload" className="text-lg font-medium text-gray-700 dark:text-gray-300">Upload Image</Label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {isProcessing && !imagePreview ? <Loader2 className="mx-auto h-12 w-12 text-teal-500 animate-spin" /> : <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />}
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="image-upload-input"
                    className={`relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800 focus-within:ring-teal-500 ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    <span>Upload a file</span>
                    <input id="image-upload-input" name="image-upload-input" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" ref={fileInputRef} disabled={isProcessing} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {imagePreview && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center">
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Original Image Preview:</h3>
              <img src={imagePreview} alt="Original preview" className="max-w-full max-h-60 mx-auto rounded-md shadow-md" />
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="preset-select" className="text-md font-medium text-gray-700 dark:text-gray-300">Resize Preset</Label>
              <Select value={preset} onValueChange={handlePresetChange} disabled={isProcessing}>
                <SelectTrigger id="preset-select" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm p-2.5 h-auto">
                  <SelectValue placeholder="Select a preset" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white">
                  {Object.entries(socialPresets).map(([key, value]) => (
                    <SelectItem key={key} value={key} className="text-sm">
                      <div className="flex items-center">
                        {React.cloneElement(value.icon, { className: "w-4 h-4 mr-2" })}
                        {value.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Width (px)</Label>
                <Input id="width-input" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g., 1080" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" disabled={preset !== 'custom' || isProcessing} />
              </div>
              <div>
                <Label htmlFor="height-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Height (px)</Label>
                <Input id="height-input" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 1080" className="mt-1 p-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600" disabled={preset !== 'custom' || isProcessing} />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleResize} className="flex-1 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white text-lg py-3" disabled={isProcessing}>
              {isProcessing ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Crop className="w-5 h-5 mr-2" />}
              {isProcessing ? 'Processing...' : 'Resize Image'}
            </Button>
             <Button onClick={() => handleReset(true)} variant="outline" className="flex-1 text-lg py-3 border-gray-300 dark:border-gray-500 dark:text-gray-300" disabled={isProcessing}>
              <RefreshCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </div>

          {resizedImage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Resized Image Preview:</h3>
              <img src={resizedImage} alt="Resized preview" className="max-w-full max-h-80 mx-auto rounded-md shadow-xl border border-gray-300 dark:border-gray-600" />
              <Button onClick={handleDownload} className="mt-6 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-lg py-3 px-8">
                <Download className="w-5 h-5 mr-2" /> Download Resized Image
              </Button>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Why Image Sizes Matter for Social Media</h2>
          <p>
            Each social media platform has its own recommended image dimensions for posts, stories, profile pictures, and cover photos. Using optimized image sizes ensures your content looks its best, avoids awkward cropping, and can improve loading times and engagement.
          </p>
          <p>This tool provides presets for common social media platforms and allows custom resizing. Note that this tool performs a direct resize (stretch/squash) to fit the target dimensions. For aspect ratio-preserving cropping or resizing with padding, more advanced tools might be needed.</p>
        </motion.div>
      </div>
    </>
  );
};

export default SocialMediaImageResizer;
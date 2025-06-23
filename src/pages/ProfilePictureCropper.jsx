import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UserCircle, UploadCloud, Crop, Download, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { saveAs } from 'file-saver';

const ProfilePictureCropper = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [cropShape, setCropShape] = useState('circle'); // 'circle' or 'square'
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef(null);
  const imageRef = useRef(new Image());
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const CROP_SIZE = 250; // Size of the crop preview area

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageRef.current.onload = () => drawCanvas();
        imageRef.current.src = e.target.result;
        setImageSrc(e.target.result);
        setZoom(1);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    } else {
      toast({ title: 'Invalid File', description: 'Please upload a valid image file.', variant: 'destructive' });
    }
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current.src) return;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, CROP_SIZE, CROP_SIZE);
    
    // Save context state
    ctx.save();

    // Translate to center for rotation and zoom
    ctx.translate(CROP_SIZE / 2, CROP_SIZE / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(zoom, zoom);
    
    // Calculate aspect ratios
    const imgAspectRatio = img.width / img.height;
    const canvasAspectRatio = 1; // Crop area is square

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspectRatio > canvasAspectRatio) { // Image is wider than canvas
      drawHeight = CROP_SIZE / zoom; // This might need adjustment based on how zoom is applied
      drawWidth = drawHeight * imgAspectRatio;
    } else { // Image is taller or square
      drawWidth = CROP_SIZE / zoom;
      drawHeight = drawWidth / imgAspectRatio;
    }
    
    // Center the image
    // These calculations need to be relative to the translated/scaled context
    offsetX = -drawWidth / 2;
    offsetY = -drawHeight / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Restore context state
    ctx.restore();

    // Clipping mask for shape
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in'; // Keep parts of image inside the shape
    ctx.beginPath();
    if (cropShape === 'circle') {
      ctx.arc(CROP_SIZE / 2, CROP_SIZE / 2, CROP_SIZE / 2, 0, Math.PI * 2);
    } else { // square
      ctx.rect(0, 0, CROP_SIZE, CROP_SIZE);
    }
    ctx.fill();
    ctx.restore();
  };
  
  // Redraw canvas when image, zoom, rotation or shape changes
  React.useEffect(() => {
    if (imageSrc) drawCanvas();
  }, [imageSrc, zoom, rotation, cropShape, drawCanvas]);


  const handleDownload = () => {
    if (!canvasRef.current || !imageSrc) {
      toast({ title: 'No Image', description: 'Please upload and crop an image first.', variant: 'destructive' });
      return;
    }
    canvasRef.current.toBlob((blob) => {
      saveAs(blob, `profile_picture_${cropShape}.png`);
      toast({ title: 'Image Downloaded!', description: 'Your new profile picture is saved.' });
    }, 'image/png');
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <>
      <Helmet>
        <title>Profile Picture Cropper | Toolzenix Social Media Tools</title>
        <meta name="description" content="Crop your images into perfect circle or square shapes for social media profile pictures. Adjust zoom and rotation for the best fit." />
        <link rel="canonical" href="https://toolzenix.com/profile-picture-cropper" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <UserCircle className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Profile Picture Cropper
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Create the perfect circular or square profile picture for any social media.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Controls */}
            <div className="space-y-6">
              <Button onClick={triggerFileInput} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg py-3">
                <UploadCloud className="w-5 h-5 mr-2" /> Upload Image
              </Button>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />

              {imageSrc && (
                <>
                  <div>
                    <Label htmlFor="crop-shape" className="text-md font-medium text-gray-700 dark:text-gray-300">Crop Shape</Label>
                    <div className="flex gap-2 mt-1">
                      <Button variant={cropShape === 'circle' ? 'default': 'outline'} onClick={() => setCropShape('circle')} className="flex-1 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Circle</Button>
                      <Button variant={cropShape === 'square' ? 'default': 'outline'} onClick={() => setCropShape('square')} className="flex-1 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Square</Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="zoom-slider" className="text-md font-medium text-gray-700 dark:text-gray-300">Zoom ({Math.round(zoom * 100)}%)</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <ZoomOut className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <Slider id="zoom-slider" min={0.5} max={3} step={0.01} value={[zoom]} onValueChange={([val]) => setZoom(val)} className="[&>span:first-child]:h-1 dark:[&>span:first-child]:bg-gray-50" />
                      <ZoomIn className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="rotation-slider" className="text-md font-medium text-gray-700 dark:text-gray-300">Rotation ({rotation}°)</Label>
                     <div className="flex items-center gap-2 mt-1">
                      <RotateCcw className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <Slider id="rotation-slider" min={0} max={360} step={1} value={[rotation]} onValueChange={([val]) => setRotation(val)} className="[&>span:first-child]:h-1 dark:[&>span:first-child]:bg-gray-50" />
                    </div>
                  </div>
                  <Button onClick={handleDownload} className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-lg py-3">
                    <Download className="w-5 h-5 mr-2" /> Download Cropped
                  </Button>
                </>
              )}
            </div>

            {/* Preview Area */}
            <div className="flex justify-center items-center">
              <div className={`w-[${CROP_SIZE}px] h-[${CROP_SIZE}px] bg-gray-200 dark:bg-gray-700 overflow-hidden relative shadow-inner ${cropShape === 'circle' ? 'rounded-full' : 'rounded-md'}`}>
                <canvas ref={canvasRef} width={CROP_SIZE} height={CROP_SIZE} className="absolute top-0 left-0"></canvas>
                {!imageSrc && (
                  <div className="w-full h-full flex flex-col justify-center items-center text-gray-400 dark:text-gray-500">
                    <Crop size={48} />
                    <p className="mt-2 text-sm">Preview Area</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Perfect Your Profile Pic</h2>
          <p>
            A great profile picture makes a strong first impression. This tool helps you easily crop your images to fit the standard circular or square formats used by most social media platforms.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Upload your image.</li>
            <li>Choose your desired crop shape (circle or square).</li>
            <li>Adjust zoom and rotation to get the perfect composition.</li>
            <li>Download your new, perfectly cropped profile picture.</li>
          </ul>
          <p>All processing is done in your browser, ensuring your images remain private.</p>
        </motion.div>
      </div>
    </>
  );
};

export default ProfilePictureCropper;
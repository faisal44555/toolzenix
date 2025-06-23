import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';

const colorBlindnessMatrices = {
  normal: [1, 0, 0, 0, 1, 0, 0, 0, 1],
  protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
  achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
};

const ColorBlindnessSimulator = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [simulationType, setSimulationType] = useState('normal');
  const originalCanvasRef = useRef(null);
  const simulatedCanvasRef = useRef(null);
  const { toast } = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const applySimulation = () => {
    if (!imageSrc || !originalCanvasRef.current || !simulatedCanvasRef.current) return;

    const originalCtx = originalCanvasRef.current.getContext('2d');
    const simulatedCtx = simulatedCanvasRef.current.getContext('2d');
    const img = new Image();

    img.onload = () => {
      originalCanvasRef.current.width = img.width;
      originalCanvasRef.current.height = img.height;
      originalCtx.drawImage(img, 0, 0);

      simulatedCanvasRef.current.width = img.width;
      simulatedCanvasRef.current.height = img.height;

      const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
      const pixels = imageData.data;
      const matrix = colorBlindnessMatrices[simulationType];

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        pixels[i] = matrix[0] * r + matrix[1] * g + matrix[2] * b;
        pixels[i + 1] = matrix[3] * r + matrix[4] * g + matrix[5] * b;
        pixels[i + 2] = matrix[6] * r + matrix[7] * g + matrix[8] * b;
      }
      simulatedCtx.putImageData(imageData, 0, 0);
      toast({ title: 'Simulation Applied', description: `Simulating ${simulationType}.` });
    };
    img.src = imageSrc;
  };

  useEffect(() => {
    applySimulation();
  }, [imageSrc, simulationType]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Color Blindness Simulator | Toolzenix</title>
        <meta name="description" content="Simulate how images appear to people with different types of color vision deficiencies." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Eye className="w-10 h-10 mr-3 text-cyan-500" /> Color Blindness Simulator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          See how your images look to individuals with different color vision deficiencies.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div>
          <Label htmlFor="imageUploadSimulator" className="text-gray-700 dark:text-gray-300">Upload Image</Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="imageUploadSimulator"
                  className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500"
                >
                  <span>Upload a file</span>
                  <Input id="imageUploadSimulator" name="imageUploadSimulator" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="simulationType">Type of Color Blindness</Label>
          <Select value={simulationType} onValueChange={setSimulationType}>
            <SelectTrigger id="simulationType" className="w-full mt-1">
              <SelectValue placeholder="Select simulation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal Vision</SelectItem>
              <SelectItem value="protanopia">Protanopia (Red-Blind)</SelectItem>
              <SelectItem value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
              <SelectItem value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
              <SelectItem value="achromatopsia">Achromatopsia (Monochromacy)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {imageSrc && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-lg font-medium text-center text-gray-900 dark:text-white mb-2">Original Image</h3>
              <canvas ref={originalCanvasRef} className="w-full h-auto rounded-md border border-gray-300 dark:border-gray-600"></canvas>
            </div>
            <div>
              <h3 className="text-lg font-medium text-center text-gray-900 dark:text-white mb-2">Simulated Image ({simulationType})</h3>
              <canvas ref={simulatedCanvasRef} className="w-full h-auto rounded-md border border-gray-300 dark:border-gray-600"></canvas>
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Click "Upload a file" or drag and drop an image into the designated area.</li>
          <li>Select the "Type of Color Blindness" from the dropdown menu.</li>
          <li>The original image and the simulated image will be displayed side-by-side.</li>
          <li>The simulation updates automatically when you change the image or simulation type.</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorBlindnessSimulator;
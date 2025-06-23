import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Shuffle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';

const HexToRgbConverter = () => {
  const [hexColor, setHexColor] = useState('#FFFFFF');
  const [rgbColor, setRgbColor] = useState('rgb(255, 255, 255)');
  const { toast } = useToast();

  const convertHexToRgb = (hex) => {
    let sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;
    if (sanitizedHex.length === 3) {
      sanitizedHex = sanitizedHex.split('').map(char => char + char).join('');
    }
    if (sanitizedHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(sanitizedHex)) {
      toast({
        title: 'Invalid HEX Color',
        description: 'Please enter a valid 3 or 6 digit HEX color code.',
        variant: 'destructive',
      });
      return null;
    }
    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleConversion = () => {
    const rgb = convertHexToRgb(hexColor);
    if (rgb) {
      setRgbColor(rgb);
      toast({
        title: 'Conversion Successful!',
        description: `${hexColor} converted to ${rgb}`,
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: `${text} copied.`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>HEX to RGB Converter | Toolzenix</title>
        <meta name="description" content="Convert HEX color codes to RGB values instantly with our free online converter." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Shuffle className="w-10 h-10 mr-3 text-teal-500" /> HEX to RGB Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Easily convert HEX color codes to their RGB equivalent.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="hex-input">HEX Color (e.g., #RRGGBB or #RGB)</Label>
            <Input
              id="hex-input"
              type="text"
              value={hexColor}
              onChange={(e) => setHexColor(e.target.value)}
              placeholder="Enter HEX color"
              className="mt-1"
            />
          </div>
          <Button onClick={handleConversion} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
            Convert to RGB
          </Button>
        </div>

        {rgbColor && (
          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Label htmlFor="rgb-output">RGB Color:</Label>
              <div className="flex items-center">
                <Input id="rgb-output" type="text" value={rgbColor} readOnly className="w-40 text-center bg-gray-100 dark:bg-gray-700" />
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(rgbColor)} aria-label="Copy RGB value">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div 
              className="w-full h-24 rounded-lg shadow-inner"
              style={{ backgroundColor: rgbColor, border: '1px solid #ccc' }}
            ></div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default HexToRgbConverter;
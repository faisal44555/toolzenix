import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Palette } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';

const ColorPickerTool = () => {
  const [color, setColor] = useState('#FF0000');
  const { toast } = useToast();

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: `${text} copied.`,
    });
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1,3), 16);
      g = parseInt(hex.substring(3,5), 16);
      b = parseInt(hex.substring(5,7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0, s = 0, l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }


  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Online Color Picker Tool | Toolzenix</title>
        <meta name="description" content="Pick colors easily with our online color picker tool. Get HEX, RGB, and HSL values instantly." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Palette className="w-10 h-10 mr-3 text-pink-500" /> Color Picker Tool
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Select a color and get its values in different formats.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div className="flex flex-col items-center space-y-4">
          <Label htmlFor="color-picker-input" className="text-lg font-medium">Choose a color:</Label>
          <Input
            id="color-picker-input"
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-32 h-32 p-0 border-none rounded-full cursor-pointer"
            style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
          />
           <div 
            className="w-full h-32 rounded-lg shadow-inner" 
            style={{ backgroundColor: color, border: '1px solid #ccc' }}
          ></div>
        </div>

        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Label htmlFor="hex-value">HEX:</Label>
            <div className="flex items-center">
              <Input id="hex-value" type="text" value={color.toUpperCase()} readOnly className="w-32 text-center bg-gray-100 dark:bg-gray-700" />
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(color.toUpperCase())} aria-label="Copy HEX value">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="rgb-value">RGB:</Label>
            <div className="flex items-center">
              <Input id="rgb-value" type="text" value={hexToRgb(color)} readOnly className="w-32 text-center bg-gray-100 dark:bg-gray-700" />
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hexToRgb(color))} aria-label="Copy RGB value">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hsl-value">HSL:</Label>
            <div className="flex items-center">
              <Input id="hsl-value" type="text" value={hexToHsl(color)} readOnly className="w-32 text-center bg-gray-100 dark:bg-gray-700" />
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hexToHsl(color))} aria-label="Copy HSL value">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Click on the large color circle or the color input box to open your system's color picker.</li>
          <li>Select your desired color. The preview box below will update.</li>
          <li>The HEX, RGB, and HSL values for the selected color will be displayed.</li>
          <li>Click the copy icon next to any value to copy it to your clipboard.</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPickerTool;
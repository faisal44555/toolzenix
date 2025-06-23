import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Palette, AlertTriangle, CheckCircle2, RefreshCcw } from 'lucide-react';

const ColorCodeConverter = () => {
  const [hexColor, setHexColor] = useState('#ffffff');
  const [rgbColor, setRgbColor] = useState('rgb(255, 255, 255)');
  const [hslColor, setHslColor] = useState('hsl(0, 0%, 100%)');
  const [colorPreview, setColorPreview] = useState('#ffffff');
  const [lastChanged, setLastChanged] = useState('hex'); // 'hex', 'rgb', 'hsl'
  const { toast } = useToast();

  // Conversion functions
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return { r, g, b };
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };
  
  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToRgb = (h, s, l) => {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
  };

  useEffect(() => {
    try {
      if (lastChanged === 'hex') {
        if (/^#([0-9A-F]{3}){1,2}$/i.test(hexColor)) {
          setColorPreview(hexColor);
          const { r, g, b } = hexToRgb(hexColor);
          setRgbColor(`rgb(${r}, ${g}, ${b})`);
          const { h, s, l } = rgbToHsl(r, g, b);
          setHslColor(`hsl(${h}, ${s}%, ${l}%)`);
        }
      } else if (lastChanged === 'rgb') {
        const match = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
        if (match) {
          const r = parseInt(match[1]), g = parseInt(match[2]), b = parseInt(match[3]);
          if (r <= 255 && g <= 255 && b <= 255) {
            const newHex = rgbToHex(r, g, b);
            setHexColor(newHex);
            setColorPreview(newHex);
            const { h, s, l } = rgbToHsl(r, g, b);
            setHslColor(`hsl(${h}, ${s}%, ${l}%)`);
          }
        }
      } else if (lastChanged === 'hsl') {
        const match = hslColor.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/i);
        if (match) {
          const h = parseInt(match[1]), s = parseInt(match[2]), l = parseInt(match[3]);
          if (h <= 360 && s <= 100 && l <= 100) {
            const { r, g, b } = hslToRgb(h, s, l);
            setRgbColor(`rgb(${r}, ${g}, ${b})`);
            const newHex = rgbToHex(r, g, b);
            setHexColor(newHex);
            setColorPreview(newHex);
          }
        }
      }
    } catch (e) {
      toast({ title: "Conversion Error", description: "Invalid color format entered.", variant: "destructive" });
    }
  }, [hexColor, rgbColor, hslColor, lastChanged]);

  const handleHexChange = (e) => {
    setHexColor(e.target.value);
    setLastChanged('hex');
  };
  const handleRgbChange = (e) => {
    setRgbColor(e.target.value);
    setLastChanged('rgb');
  };
  const handleHslChange = (e) => {
    setHslColor(e.target.value);
    setLastChanged('hsl');
  };

  const handleCopy = (textToCopy, type) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast({ title: 'Copied!', description: `${type} color code copied.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };
  
  const handleColorPickerChange = (e) => {
    setHexColor(e.target.value);
    setLastChanged('hex');
  };

  return (
    <>
      <Helmet>
        <title>Color Code Converter (HEX, RGB, HSL) | Toolzenix</title>
        <meta name="description" content="Convert color codes between HEX, RGB, and HSL formats. Includes a color picker and live preview. Fast and easy to use." />
        <link rel="canonical" href="https://toolzenix.com/color-code-converter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Color Code Converter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert between HEX, RGB, and HSL color formats seamlessly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
          >
            <div>
              <Label htmlFor="hex-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">HEX</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input id="hex-input" value={hexColor} onChange={handleHexChange} placeholder="#RRGGBB" className="font-mono dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                <Button variant="ghost" size="icon" onClick={() => handleCopy(hexColor, 'HEX')}><Copy className="w-4 h-4" /></Button>
              </div>
            </div>
            <div>
              <Label htmlFor="rgb-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">RGB</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input id="rgb-input" value={rgbColor} onChange={handleRgbChange} placeholder="rgb(r, g, b)" className="font-mono dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                <Button variant="ghost" size="icon" onClick={() => handleCopy(rgbColor, 'RGB')}><Copy className="w-4 h-4" /></Button>
              </div>
            </div>
            <div>
              <Label htmlFor="hsl-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">HSL</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input id="hsl-input" value={hslColor} onChange={handleHslChange} placeholder="hsl(h, s%, l%)" className="font-mono dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                <Button variant="ghost" size="icon" onClick={() => handleCopy(hslColor, 'HSL')}><Copy className="w-4 h-4" /></Button>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <Label htmlFor="color-picker" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live Color Picker</Label>
             <div 
              className="w-48 h-48 rounded-lg border-4 border-gray-200 dark:border-gray-700 shadow-inner mb-4"
              style={{ backgroundColor: colorPreview }}
              aria-label="Color Preview"
            ></div>
            <Input
              id="color-picker"
              type="color"
              value={hexColor.startsWith("#") ? hexColor : "#000000"} // Ensure value is valid hex for color input
              onChange={handleColorPickerChange}
              className="w-full h-12 p-1 cursor-pointer dark:bg-gray-700"
              aria-label="Color Picker Input"
            />
          </motion.div>
        </div>

        <div className="mt-12 prose dark:prose-invert max-w-none mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold">About Color Code Conversion</h2>
          <p>
            This tool allows you to convert color codes between three common web formats: HEX (Hexadecimal), RGB (Red, Green, Blue), and HSL (Hue, Saturation, Lightness).
          </p>
          <ul>
            <li><strong>HEX:</strong> A six-digit (or three-digit shorthand) hexadecimal number representing RGB color values (e.g., #FF0000 for red).</li>
            <li><strong>RGB:</strong> Specifies colors using integer values for Red, Green, and Blue components, typically ranging from 0 to 255 (e.g., rgb(255, 0, 0) for red).</li>
            <li><strong>HSL:</strong> Represents colors based on Hue (color wheel position 0-360), Saturation (intensity 0-100%), and Lightness (brightness 0-100%) (e.g., hsl(0, 100%, 50%) for red).</li>
          </ul>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Enter a color code in any of the HEX, RGB, or HSL input fields.</li>
            <li>The other fields will automatically update with the converted values.</li>
            <li>Alternatively, use the color picker to select a color visually. The input fields will update accordingly.</li>
            <li>Click the copy icon next to any field to copy its value to your clipboard.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default ColorCodeConverter;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Code } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CssColorCodeGenerator = () => {
  const [color, setColor] = useState('#FF0000');
  const [opacity, setOpacity] = useState(1); // Range 0 to 1
  const [format, setFormat] = useState('hex'); // hex, hexa, rgb, rgba, hsl, hsla
  const { toast } = useToast();

  const hexToRgbValues = (hex) => {
    let sanitizedHex = hex.replace('#', '');
    if (sanitizedHex.length === 3) {
      sanitizedHex = sanitizedHex.split('').map(char => char + char).join('');
    }
    if (sanitizedHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(sanitizedHex)) return null;
    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);
    return { r, g, b };
  };

  const rgbToHslValues = (r, g, b) => {
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
    return { h, s, l };
  };

  const generateCssCode = () => {
    const rgbValues = hexToRgbValues(color);
    if (!rgbValues) return 'Invalid HEX';

    const { r, g, b } = rgbValues;
    const alpha = parseFloat(opacity).toFixed(2);

    switch (format) {
      case 'hex':
        return color.toUpperCase();
      case 'hexa':
        const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();
        return `${color.toUpperCase()}${alphaHex}`;
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`;
      case 'rgba':
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      case 'hsl':
        const { h, s, l } = rgbToHslValues(r,g,b);
        return `hsl(${h}, ${s}%, ${l}%)`;
      case 'hsla':
        const hslVals = rgbToHslValues(r,g,b);
        return `hsla(${hslVals.h}, ${hslVals.s}%, ${hslVals.l}%, ${alpha})`;
      default:
        return color.toUpperCase();
    }
  };

  const cssCode = generateCssCode();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'CSS Code Copied!',
      description: `${text} copied.`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>CSS Color Code Generator | Toolzenix</title>
        <meta name="description" content="Generate CSS color codes in various formats (HEX, RGB, HSL) with opacity options." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Code className="w-10 h-10 mr-3 text-red-500" /> CSS Color Code Generator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Generate CSS color codes in HEX, RGB, HSL formats with opacity.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <Label htmlFor="color-input-css">Color</Label>
            <Input id="color-input-css" type="text" value={color.toUpperCase()} onChange={(e) => setColor(e.target.value)} className="w-full mt-1" />
          </div>
          <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-16 h-10 p-1 mt-6" />
        </div>

        <div>
          <Label htmlFor="opacity-slider">Opacity: {opacity}</Label>
          <Input 
            id="opacity-slider" 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={opacity} 
            onChange={(e) => setOpacity(e.target.value)} 
            className="w-full mt-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div>
          <Label htmlFor="format-select">Output Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format-select" className="w-full mt-1">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hex">HEX (#RRGGBB)</SelectItem>
              <SelectItem value="hexa">HEXA (#RRGGBBAA)</SelectItem>
              <SelectItem value="rgb">RGB (rgb(r,g,b))</SelectItem>
              <SelectItem value="rgba">RGBA (rgba(r,g,b,a))</SelectItem>
              <SelectItem value="hsl">HSL (hsl(h,s%,l%))</SelectItem>
              <SelectItem value="hsla">HSLA (hsla(h,s%,l%,a))</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div 
          className="w-full h-32 rounded-lg shadow-inner"
          style={{ backgroundColor: `rgba(${hexToRgbValues(color)?.r || 0}, ${hexToRgbValues(color)?.g || 0}, ${hexToRgbValues(color)?.b || 0}, ${opacity})`, border: '1px solid #ccc' }}
        ></div>
        
        <div className="space-y-2 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Label htmlFor="generated-css-code">Generated CSS Code:</Label>
          <div className="relative">
            <Input
              id="generated-css-code"
              type="text"
              value={cssCode}
              readOnly
              className="pr-10 bg-gray-100 dark:bg-gray-700"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(cssCode)}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              aria-label="Copy CSS code"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="mt-10 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Select your base color using the color picker or by typing a HEX code.</li>
          <li>Adjust the opacity using the slider.</li>
          <li>Choose your desired CSS output format (HEX, RGB, HSL, etc.).</li>
          <li>Copy the generated CSS code.</li>
        </ul>
      </div>
    </div>
  );
};

export default CssColorCodeGenerator;
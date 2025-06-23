import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Contrast, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';

const ContrastChecker = () => {
  const [foregroundColor, setForegroundColor] = useState('#FFFFFF');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [contrastRatio, setContrastRatio] = useState(null);
  const { toast } = useToast();

  const hexToRgb = (hex) => {
    let sanitizedHex = hex.replace('#', '');
    if (sanitizedHex.length === 3) {
      sanitizedHex = sanitizedHex.split('').map(char => char + char).join('');
    }
    if (sanitizedHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(sanitizedHex)) {
      return null; 
    }
    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);
    return { r, g, b };
  };

  const luminance = (r, g, b) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const calculateContrast = () => {
    const fgRgb = hexToRgb(foregroundColor);
    const bgRgb = hexToRgb(backgroundColor);

    if (!fgRgb || !bgRgb) {
      if (foregroundColor.length === 7 && backgroundColor.length === 7) { // Only toast if full hex codes were attempted
        toast({
          title: 'Invalid Color',
          description: 'Please enter valid HEX color codes for both foreground and background.',
          variant: 'destructive',
        });
      }
      setContrastRatio(null);
      return;
    }

    const lum1 = luminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const lum2 = luminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);
    setContrastRatio(ratio.toFixed(2));
  };

  useEffect(() => {
    calculateContrast();
  }, [foregroundColor, backgroundColor]);

  const getWCAGRating = (ratio) => {
    if (ratio >= 7) return { normal: 'AAA', large: 'AAA' };
    if (ratio >= 4.5) return { normal: 'AA', large: 'AAA' };
    if (ratio >= 3) return { normal: 'Fail', large: 'AA' };
    return { normal: 'Fail', large: 'Fail' };
  };

  const rating = contrastRatio ? getWCAGRating(parseFloat(contrastRatio)) : null;

  const renderRating = (level, type) => {
    if (!rating) return null;
    const pass = rating[type] !== 'Fail';
    return (
      <div className={`flex items-center ${pass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {pass ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />}
        <span className="font-semibold">{rating[type]}</span>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>WCAG Contrast Checker | Toolzenix</title>
        <meta name="description" content="Check color contrast ratios for WCAG compliance. Ensure your text is readable and accessible." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Contrast className="w-10 h-10 mr-3 text-yellow-500" /> Contrast Checker
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Ensure your color combinations meet WCAG accessibility standards.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="foregroundColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Foreground Color</Label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <Input type="color" value={foregroundColor} onChange={(e) => setForegroundColor(e.target.value)} className="w-16 h-10 p-1 border-r-0 rounded-l-md" />
              <Input id="foregroundColor" type="text" value={foregroundColor.toUpperCase()} onChange={(e) => setForegroundColor(e.target.value)} className="flex-1 rounded-r-md" />
            </div>
          </div>
          <div>
            <Label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Background Color</Label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <Input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-16 h-10 p-1 border-r-0 rounded-l-md" />
              <Input id="backgroundColor" type="text" value={backgroundColor.toUpperCase()} onChange={(e) => setBackgroundColor(e.target.value)} className="flex-1 rounded-r-md" />
            </div>
          </div>
        </div>

        <div 
          className="w-full p-8 rounded-lg text-center text-xl" 
          style={{ backgroundColor: backgroundColor, color: foregroundColor, border: '1px solid #ccc' }}
        >
          <p className="font-bold">Large Text Example (18pt or 14pt bold)</p>
          <p>Normal Text Example (Regular)</p>
        </div>

        {contrastRatio !== null && (
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <div className="text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300">Contrast Ratio:</p>
              <p className="text-5xl font-bold text-gray-900 dark:text-white">{contrastRatio}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Normal Text (AA)</h3>
                {renderRating(4.5, 'normal')}
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Large Text (AA)</h3>
                {renderRating(3, 'large')}
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Normal Text (AAA)</h3>
                {renderRating(7, 'normal')}
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Large Text (AAA)</h3>
                {renderRating(4.5, 'large')}
              </div>
            </div>
            {parseFloat(contrastRatio) < 3 && (
              <div className="flex items-center p-3 rounded-md bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <p>This combination may be difficult for many users to read.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>

      <div className="mt-10 w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Enter the "Foreground Color" (e.g., text color) using the color picker or by typing a HEX code.</li>
          <li>Enter the "Background Color" using the color picker or by typing a HEX code.</li>
          <li>The contrast ratio and WCAG compliance ratings (AA/AAA for normal and large text) will update automatically.</li>
          <li>A preview of the colors will be shown below the inputs.</li>
        </ul>
      </div>
    </div>
  );
};

export default ContrastChecker;
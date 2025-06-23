import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Copy, Shuffle, Lock, Unlock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const ColorPaletteGenerator = () => {
  const [palette, setPalette] = useState([]);
  const [lockedColors, setLockedColors] = useState(Array(5).fill(false));
  const [numColors, setNumColors] = useState(5);
  const { toast } = useToast();

  const generateRandomHexColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
  };

  const generatePalette = () => {
    const newPalette = Array(numColors).fill(null).map((_, index) => {
      if (lockedColors[index] && palette[index]) {
        return palette[index];
      }
      return generateRandomHexColor();
    });
    setPalette(newPalette);
  };

  useEffect(() => {
    generatePalette();
     // Add event listener for spacebar
    const handleSpacebar = (event) => {
      if (event.code === 'Space' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener('keydown', handleSpacebar);
    return () => window.removeEventListener('keydown', handleSpacebar);
  }, [numColors, lockedColors]); // Re-generate if numColors changes or locks change (to preserve locked colors)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: `${text} copied.`,
    });
  };

  const toggleLock = (index) => {
    const newLockedColors = [...lockedColors];
    newLockedColors[index] = !newLockedColors[index];
    setLockedColors(newLockedColors);
  };

  const handleNumColorsChange = (value) => {
    const newNumColors = value[0];
    setNumColors(newNumColors);
    // Adjust lockedColors array size if numColors changes
    if (newNumColors > lockedColors.length) {
      setLockedColors([...lockedColors, ...Array(newNumColors - lockedColors.length).fill(false)]);
    } else if (newNumColors < lockedColors.length) {
      setLockedColors(lockedColors.slice(0, newNumColors));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Color Palette Generator | Toolzenix</title>
        <meta name="description" content="Generate beautiful color palettes instantly. Lock colors you like and find complementary shades." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Shuffle className="w-10 h-10 mr-3 text-blue-500" /> Color Palette Generator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Create stunning color schemes with a click. Press Spacebar to generate new palettes!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="mb-6">
          <Label htmlFor="num-colors-slider" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Colors: {numColors}
          </Label>
          <Slider
            id="num-colors-slider"
            defaultValue={[numColors]}
            max={10}
            min={2}
            step={1}
            onValueChange={handleNumColorsChange}
          />
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-${numColors > 5 ? 5 : numColors} gap-0 rounded-lg overflow-hidden mb-6`} style={{ gridTemplateColumns: `repeat(${Math.min(numColors, 5)}, minmax(0, 1fr))` }}>
          {palette.map((color, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-64 flex flex-col items-center justify-end p-4 text-white relative"
              style={{ backgroundColor: color }}
            >
              <span className="font-mono text-sm drop-shadow-md">{color}</span>
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(color)} className="text-white hover:bg-white/20 p-1 h-auto w-auto" aria-label="Copy color">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => toggleLock(index)} className="text-white hover:bg-white/20 p-1 h-auto w-auto" aria-label={lockedColors[index] ? "Unlock color" : "Lock color"}>
                  {lockedColors[index] ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <Button onClick={generatePalette} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-3">
          <Shuffle className="mr-2 h-5 w-5" /> Generate Palette
        </Button>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          Tip: Press Spacebar to generate a new palette.
        </p>
      </motion.div>

      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Use the slider to select the "Number of Colors" in your palette (2-10).</li>
          <li>Click "Generate Palette" or press the Spacebar to create a new random color scheme.</li>
          <li>Hover over a color to see its HEX code. Click the copy icon to copy it.</li>
          <li>Click the lock icon on a color to keep it when generating new palettes.</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
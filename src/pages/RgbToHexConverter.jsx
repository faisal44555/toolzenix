import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Shuffle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';

const RgbToHexConverter = () => {
  const [rValue, setRValue] = useState('255');
  const [gValue, setGValue] = useState('255');
  const [bValue, setBValue] = useState('255');
  const [hexColor, setHexColor] = useState('#FFFFFF');
  const { toast } = useToast();

  const componentToHex = (c) => {
    const num = parseInt(c);
    if (isNaN(num) || num < 0 || num > 255) {
      return null;
    }
    const hex = num.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const convertRgbToHex = () => {
    const rHex = componentToHex(rValue);
    const gHex = componentToHex(gValue);
    const bHex = componentToHex(bValue);

    if (rHex === null || gHex === null || bHex === null) {
      toast({
        title: 'Invalid RGB Values',
        description: 'Please enter R, G, B values between 0 and 255.',
        variant: 'destructive',
      });
      return;
    }
    const hex = `#${rHex}${gHex}${bHex}`.toUpperCase();
    setHexColor(hex);
    toast({
      title: 'Conversion Successful!',
      description: `rgb(${rValue}, ${gValue}, ${bValue}) converted to ${hex}`,
    });
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
        <title>RGB to HEX Converter | Toolzenix</title>
        <meta name="description" content="Convert RGB color values to HEX codes instantly with our free online converter." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Shuffle className="w-10 h-10 mr-3 text-purple-500" /> RGB to HEX Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Easily convert RGB color values to their HEX equivalent.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="r-value">Red (0-255)</Label>
            <Input id="r-value" type="number" value={rValue} onChange={(e) => setRValue(e.target.value)} placeholder="R" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="g-value">Green (0-255)</Label>
            <Input id="g-value" type="number" value={gValue} onChange={(e) => setGValue(e.target.value)} placeholder="G" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="b-value">Blue (0-255)</Label>
            <Input id="b-value" type="number" value={bValue} onChange={(e) => setBValue(e.target.value)} placeholder="B" className="mt-1" />
          </div>
        </div>
        <Button onClick={convertRgbToHex} className="w-full bg-purple-500 hover:bg-purple-600 text-white">
          Convert to HEX
        </Button>

        {hexColor && (
          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Label htmlFor="hex-output">HEX Color:</Label>
              <div className="flex items-center">
                <Input id="hex-output" type="text" value={hexColor} readOnly className="w-32 text-center bg-gray-100 dark:bg-gray-700" />
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hexColor)} aria-label="Copy HEX value">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div 
              className="w-full h-24 rounded-lg shadow-inner"
              style={{ backgroundColor: hexColor, border: '1px solid #ccc' }}
            ></div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RgbToHexConverter;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Layers, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GradientGenerator = () => {
  const [color1, setColor1] = useState('#FF0000');
  const [color2, setColor2] = useState('#0000FF');
  const [angle, setAngle] = useState('90');
  const [gradientType, setGradientType] = useState('linear'); // linear or radial
  const { toast } = useToast();

  const generateCssGradient = () => {
    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    } else {
      return `radial-gradient(circle, ${color1}, ${color2})`;
    }
  };

  const cssCode = generateCssGradient();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(`background: ${text};`);
    toast({
      title: 'CSS Copied!',
      description: 'Gradient CSS copied to clipboard.',
    });
  };
  
  const randomizeColors = () => {
    const randomHex = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor1(randomHex());
    setColor2(randomHex());
    if (gradientType === 'linear') {
        setAngle(Math.floor(Math.random() * 360).toString());
    }
    toast({
      title: 'Colors Randomized!',
      description: 'New random colors and angle applied.',
    });
  };


  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>CSS Gradient Generator | Toolzenix</title>
        <meta name="description" content="Create beautiful CSS gradients (linear and radial) with our easy-to-use online generator." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Layers className="w-10 h-10 mr-3 text-green-500" /> CSS Gradient Generator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Visually create and customize stunning CSS gradients.
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
            <Label htmlFor="color1">Color 1</Label>
            <Input id="color1" type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-12 mt-1" />
            <Input type="text" value={color1.toUpperCase()} onChange={(e) => setColor1(e.target.value)} className="w-full mt-2" />
          </div>
          <div>
            <Label htmlFor="color2">Color 2</Label>
            <Input id="color2" type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-12 mt-1" />
            <Input type="text" value={color2.toUpperCase()} onChange={(e) => setColor2(e.target.value)} className="w-full mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <Label htmlFor="gradientType">Gradient Type</Label>
                 <Select value={gradientType} onValueChange={setGradientType}>
                    <SelectTrigger id="gradientType" className="w-full mt-1">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {gradientType === 'linear' && (
                 <div>
                    <Label htmlFor="angle">Angle (degrees)</Label>
                    <Input id="angle" type="number" value={angle} onChange={(e) => setAngle(e.target.value)} min="0" max="360" className="w-full mt-1" />
                 </div>
            )}
        </div>
        
        <Button onClick={randomizeColors} variant="outline" className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" /> Randomize Colors
        </Button>


        <div className="w-full h-64 rounded-lg shadow-inner" style={{ background: cssCode, border: '1px solid #ccc' }}>
        </div>

        <div className="space-y-2 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Label htmlFor="css-code">CSS Code:</Label>
          <div className="relative">
            <Input
              id="css-code"
              type="text"
              value={`background: ${cssCode};`}
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
    </div>
  );
};

export default GradientGenerator;
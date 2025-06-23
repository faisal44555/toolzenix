import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Layers, Sun, Moon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const DarkLightColorPreview = () => {
  const [primaryColor, setPrimaryColor] = useState('#3B82F6'); // blue-500
  const [secondaryColor, setSecondaryColor] = useState('#10B981'); // emerald-500
  const [accentColor, setAccentColor] = useState('#F59E0B'); // amber-500
  const [textColorLight, setTextColorLight] = useState('#1F2937'); // gray-800
  const [backgroundColorLight, setBackgroundColorLight] = useState('#F9FAFB'); // gray-50
  const [textColorDark, setTextColorDark] = useState('#F3F4F6'); // gray-100
  const [backgroundColorDark, setBackgroundColorDark] = useState('#111827'); // gray-900

  const PreviewCard = ({ title, bgColor, textColor, primary, secondary, accent }) => (
    <div className="rounded-lg shadow-lg p-6 transition-all" style={{ backgroundColor: bgColor, color: textColor }}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="mb-2">This is some sample text to demonstrate readability.</p>
      <div className="space-y-2">
        <Button style={{ backgroundColor: primary, color: textColorDark }} className="w-full">Primary Button</Button>
        <Button style={{ backgroundColor: secondary, color: textColorDark }} className="w-full">Secondary Button</Button>
        <div className="p-2 rounded" style={{ backgroundColor: accent }}>
          <p className="text-sm text-center" style={{color: textColorLight}}>Accent Area</p>
        </div>
      </div>
      <div className="mt-4 p-3 rounded-md border" style={{ borderColor: primary }}>
        <p className="text-xs">This is a bordered container using the primary color.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Helmet>
        <title>Dark/Light Theme Color Preview | Toolzenix</title>
        <meta name="description" content="Preview your color choices in both dark and light theme mockups. Ensure great readability and aesthetics." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Layers className="w-10 h-10 mr-3 text-orange-500" /> Dark/Light Theme Color Preview
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Test your color palettes in both dark and light UI mockups.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div>
            <Label htmlFor="primaryColor">Primary Color</Label>
            <Input id="primaryColor" type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-full h-10 mt-1" />
          </div>
          <div>
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <Input id="secondaryColor" type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-full h-10 mt-1" />
          </div>
          <div>
            <Label htmlFor="accentColor">Accent Color</Label>
            <Input id="accentColor" type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-full h-10 mt-1" />
          </div>
          <div>
            <Label htmlFor="textColorLight">Light Theme Text</Label>
            <Input id="textColorLight" type="color" value={textColorLight} onChange={(e) => setTextColorLight(e.target.value)} className="w-full h-10 mt-1" />
          </div>
          <div>
            <Label htmlFor="bgColorLight">Light Theme BG</Label>
            <Input id="bgColorLight" type="color" value={backgroundColorLight} onChange={(e) => setBackgroundColorLight(e.target.value)} className="w-full h-10 mt-1" />
          </div>
           <div>
            <Label htmlFor="textColorDark">Dark Theme Text</Label>
            <Input id="textColorDark" type="color" value={textColorDark} onChange={(e) => setTextColorDark(e.target.value)} className="w-full h-10 mt-1" />
          </div>
          <div>
            <Label htmlFor="bgColorDark">Dark Theme BG</Label>
            <Input id="bgColorDark" type="color" value={backgroundColorDark} onChange={(e) => setBackgroundColorDark(e.target.value)} className="w-full h-10 mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center justify-center mb-2">
              <Sun className="w-6 h-6 mr-2 text-yellow-500" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Light Theme Preview</h2>
            </div>
            <PreviewCard 
              title="Light Mode UI"
              bgColor={backgroundColorLight}
              textColor={textColorLight}
              primary={primaryColor}
              secondary={secondaryColor}
              accent={accentColor}
            />
          </motion.div>
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center justify-center mb-2">
              <Moon className="w-6 h-6 mr-2 text-indigo-400" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Dark Theme Preview</h2>
            </div>
            <PreviewCard 
              title="Dark Mode UI"
              bgColor={backgroundColorDark}
              textColor={textColorDark}
              primary={primaryColor}
              secondary={secondaryColor}
              accent={accentColor}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DarkLightColorPreview;
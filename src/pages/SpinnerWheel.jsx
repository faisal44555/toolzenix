import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { RotateCcw as SpinnerIcon, Play, PlusCircle, Trash2, Settings, CheckCircle2 } from 'lucide-react';

const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#B76E79", "#FF8C32", "#AEEA00", "#00B8D4", "#C500E0", "#FF6AC2"];

const SpinnerWheel = () => {
  const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
  const [newOption, setNewOption] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  const { toast } = useToast();

  const addOption = () => {
    if (newOption.trim() && options.length < 10) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    } else if (options.length >= 10) {
      toast({ title: 'Limit Reached', description: 'Maximum of 10 options allowed.', variant: 'destructive' });
    }
  };

  const removeOption = (index) => {
    if (options.length <= 2) {
      toast({ title: 'Minimum Options', description: 'At least 2 options are required.', variant: 'destructive' });
      return;
    }
    setOptions(options.filter((_, i) => i !== index));
  };

  const spinWheel = () => {
    if (isSpinning || options.length < 2) return;
    setIsSpinning(true);
    setResult(null);

    const totalSpins = Math.floor(Math.random() * 5) + 5; // 5-9 full spins
    const winningSegmentIndex = Math.floor(Math.random() * options.length);
    const segmentAngle = 360 / options.length;
    const randomOffsetWithinSegment = (Math.random() * segmentAngle) - (segmentAngle / 2); // Spin to middle of segment
    
    const finalRotation = rotation + (totalSpins * 360) + (winningSegmentIndex * segmentAngle) + randomOffsetWithinSegment;
    
    setRotation(finalRotation);

    setTimeout(() => {
      const winningOption = options[winningSegmentIndex];
      setResult(winningOption);
      setIsSpinning(false);
      toast({ title: 'Winner!', description: `The wheel landed on: ${winningOption}`, action: <CheckCircle2 className="text-green-500" /> });
    }, 5000); // Corresponds to CSS transition duration
  };
  
  const segmentAngle = 360 / options.length;

  return (
    <>
      <Helmet>
        <title>Spinner Wheel - Random Picker | Toolzenix</title>
        <meta name="description" content="Create a customizable spinner wheel to make random choices. Add your options and spin the wheel!" />
        <link rel="canonical" href="https://toolzenix.com/spinner-wheel" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <SpinnerIcon className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Spinner Wheel</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Let the wheel decide your fate!</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-4xl">
          <div className="lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center"><Settings className="mr-2"/>Customize Options</h3>
            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new option"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                onKeyPress={(e) => e.key === 'Enter' && addOption()}
              />
              <Button onClick={addOption} size="icon" className="bg-pink-500 hover:bg-pink-600 text-white flex-shrink-0"><PlusCircle size={20}/></Button>
            </div>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                  <span className="text-gray-700 dark:text-gray-300 truncate" title={option}>{option}</span>
                  <Button onClick={() => removeOption(index)} size="icon" variant="ghost" className="text-red-500 hover:text-red-600"><Trash2 size={16}/></Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-2/3 flex flex-col items-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 mb-8">
              <motion.div
                ref={wheelRef}
                className="absolute inset-0 rounded-full border-4 border-pink-300 dark:border-pink-700 shadow-2xl overflow-hidden"
                style={{ transform: `rotate(${rotation}deg)` }}
                transition={{ type: 'spring', stiffness: 20, damping: 10, duration: isSpinning ? 5 : 0 }}
              >
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="absolute w-1/2 h-1/2 origin-bottom-right flex items-center justify-center text-center"
                    style={{
                      transform: `rotate(${index * segmentAngle}deg) skewY(-${90 - segmentAngle}deg)`,
                      backgroundColor: colors[index % colors.length],
                      clipPath: `polygon(0 0, 100% 0, 100% 100%)`,
                    }}
                  >
                    <span 
                      className="transform -rotate-45 origin-center text-white font-semibold text-xs sm:text-sm px-1 break-all"
                      style={{ transform: `skewY(${90 - segmentAngle}deg) rotate(${segmentAngle/2 - 90}deg)`}}
                    >
                      {option.length > 12 ? option.substring(0,10) + '...' : option}
                    </span>
                  </div>
                ))}
              </motion.div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 
                              border-l-8 border-l-transparent border-r-8 border-r-transparent 
                              border-b-16 border-b-gray-800 dark:border-b-gray-200 z-10"></div> {/* Pointer */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-900 rounded-full border-4 border-pink-500 dark:border-pink-400 z-20"></div>
            </div>
            
            <Button onClick={spinWheel} disabled={isSpinning || options.length < 2} className="bg-pink-600 hover:bg-pink-700 text-white text-xl py-4 px-10">
              <Play className="w-6 h-6 mr-2" /> {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
            </Button>

            {result && !isSpinning && (
              <motion.div initial={{ opacity: 0, scale:0.5 }} animate={{ opacity: 1, scale:1 }} className="mt-6 p-4 bg-green-100 dark:bg-green-700/30 text-green-700 dark:text-green-300 rounded-lg shadow-md">
                <p className="text-2xl font-bold">Winner: {result}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpinnerWheel;
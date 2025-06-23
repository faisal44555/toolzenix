import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MousePointerClick, Timer, RotateCcw, Trophy } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const ClickSpeedTester = () => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5); // Default duration
  const [testDuration, setTestDuration] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [cps, setCps] = useState(0);
  const { toast } = useToast();
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      const calculatedCps = (clicks / testDuration).toFixed(2);
      setCps(calculatedCps);
      toast({
        title: 'Time\'s Up!',
        description: `You achieved ${calculatedCps} CPS!`,
        action: <Trophy className="text-yellow-400" />,
      });
    }
    return () => clearTimeout(timerRef.current);
  }, [isActive, timeLeft, clicks, testDuration]);

  const handleTestAreaClick = () => {
    if (!isActive && timeLeft === 0) return; // Game ended
    if (!isActive && timeLeft === testDuration) { // Start game
      setIsActive(true);
    }
    if (isActive) {
      setClicks(prevClicks => prevClicks + 1);
    }
  };

  const startGame = () => {
    setClicks(0);
    setTimeLeft(testDuration);
    setIsActive(true);
    setCps(0);
  };
  
  const resetGame = () => {
    clearTimeout(timerRef.current);
    setClicks(0);
    setTimeLeft(testDuration);
    setIsActive(false);
    setCps(0);
  };

  const handleDurationChange = (value) => {
    const newDuration = parseInt(value, 10);
    setTestDuration(newDuration);
    setTimeLeft(newDuration); // Reset timeLeft when duration changes
    if (isActive) { // If game is active, reset it
        resetGame();
    }
  };

  return (
    <>
      <Helmet>
        <title>Click Speed Tester (CPS Test) | Toolzenix</title>
        <meta name="description" content="Test your click speed with our CPS (Clicks Per Second) tester. See how many times you can click in a set duration." />
        <link rel="canonical" href="https://toolzenix.com/click-speed-tester" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <MousePointerClick className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Click Speed Tester (CPS)</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">How fast can you click?</p>
        </motion.div>

        <div className="w-full max-w-lg mb-6">
            <Label htmlFor="duration-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test Duration:</Label>
            <Select value={testDuration.toString()} onValueChange={handleDurationChange} disabled={isActive}>
                <SelectTrigger id="duration-select" className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                    <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5 Seconds</SelectItem>
                    <SelectItem value="10">10 Seconds</SelectItem>
                    <SelectItem value="15">15 Seconds</SelectItem>
                    <SelectItem value="30">30 Seconds</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <motion.div
          onClick={handleTestAreaClick}
          className={`w-full max-w-2xl h-64 sm:h-80 rounded-xl shadow-2xl flex flex-col items-center justify-center text-white cursor-pointer transition-colors duration-150
                      ${isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          whileTap={{ scale: isActive ? 0.98 : 1 }}
        >
          {!isActive && timeLeft === testDuration && (
            <Button onClick={startGame} className="bg-transparent border-2 border-white hover:bg-white/20 text-2xl px-8 py-4">Start Clicking!</Button>
          )}
          {isActive && <p className="text-5xl font-bold">{clicks}</p>}
          {!isActive && timeLeft === 0 && cps > 0 && (
            <div className="text-center">
              <p className="text-2xl">Time's Up!</p>
              <p className="text-4xl font-bold my-2">{cps} CPS</p>
              <p className="text-lg">({clicks} clicks in {testDuration}s)</p>
            </div>
          )}
        </motion.div>

        <div className="mt-6 text-center w-full max-w-2xl">
          <div className="flex justify-around items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Time Left</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{timeLeft}s</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Clicks</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{clicks}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">CPS</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{cps > 0 ? cps : '-'}</p>
            </div>
          </div>
          <Button onClick={resetGame} variant="outline" className="mt-6">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset Test
          </Button>
        </div>
      </div>
    </>
  );
};

export default ClickSpeedTester;
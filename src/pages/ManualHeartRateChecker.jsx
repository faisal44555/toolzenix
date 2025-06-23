import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { HeartPulse, Timer, Play, Pause, RotateCcw, AlertCircle } from 'lucide-react';

const ManualHeartRateChecker = () => {
  const [timerDuration, setTimerDuration] = useState(15); // seconds
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [isActive, setIsActive] = useState(false);
  const [pulseCount, setPulseCount] = useState('');
  const [bpm, setBpm] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      toast({ title: "Time's Up!", description: "Enter your pulse count now." });
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, toast]);

  const handleStartPause = () => {
    if (timeLeft === 0) { // If timer finished, reset before starting
      setTimeLeft(timerDuration);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(timerDuration);
    setPulseCount('');
    setBpm(null);
  };

  const handleCalculateBpm = () => {
    if (!pulseCount) {
      toast({ title: 'Missing Pulse Count', description: 'Please enter the number of pulses you counted.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }
    const count = parseInt(pulseCount);
    if (isNaN(count) || count < 0) {
      toast({ title: 'Invalid Pulse Count', description: 'Please enter a valid number.', variant: 'destructive', action: <AlertCircle/> });
      return;
    }
    
    const multiplier = 60 / timerDuration;
    const calculatedBpm = count * multiplier;
    setBpm(calculatedBpm);
    toast({ title: 'BPM Calculated!', description: `Your estimated heart rate is ${calculatedBpm} BPM.` });
  };
  
  const handleTimerDurationChange = (duration) => {
    if (!isActive) {
      setTimerDuration(duration);
      setTimeLeft(duration);
    } else {
      toast({ title: 'Timer Active', description: 'Reset the timer to change duration.', variant: 'destructive' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Manual Heart Rate Checker | Toolzenix</title>
        <meta name="description" content="Check your heart rate manually using our simple timer and BPM calculator. Find your pulse, count the beats, and get your estimated beats per minute." />
        <link rel="canonical" href="https://toolzenix.com/manual-heart-rate-checker" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <HeartPulse className="w-16 h-16 text-pink-500 dark:text-pink-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Manual Heart Rate Checker</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Use the timer to count your pulse and calculate your BPM.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-6"
        >
          <div className="text-center">
            <Label className="text-gray-700 dark:text-gray-300">Timer Duration (seconds):</Label>
            <div className="flex justify-center space-x-2 mt-2">
              {[10, 15, 30, 60].map(duration => (
                <Button 
                  key={duration}
                  variant={timerDuration === duration ? "default" : "outline"}
                  onClick={() => handleTimerDurationChange(duration)}
                  className={`${timerDuration === duration ? 'bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-600 dark:hover:bg-pink-700' : 'dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'}`}
                  disabled={isActive}
                >
                  {duration}s
                </Button>
              ))}
            </div>
          </div>
        
          <div className="text-center my-8">
            <Timer className="w-12 h-12 text-pink-500 dark:text-pink-400 mx-auto mb-2" />
            <div className="text-6xl font-bold text-gray-800 dark:text-white">{timeLeft}s</div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={handleStartPause} className={`w-28 ${isActive ? 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'} text-white py-3 text-lg`}>
              {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={handleReset} variant="outline" className="w-28 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 py-3 text-lg">
              <RotateCcw className="mr-2" /> Reset
            </Button>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <Label htmlFor="pulse-count" className="text-gray-700 dark:text-gray-300">Pulse Count (beats in {timerDuration}s)</Label>
            <Input 
              id="pulse-count" 
              type="number" 
              placeholder="Enter beats counted" 
              value={pulseCount} 
              onChange={e => setPulseCount(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              disabled={isActive && timeLeft > 0}
            />
            <Button onClick={handleCalculateBpm} className="w-full mt-4 bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white py-3 text-lg">
              Calculate BPM
            </Button>
          </div>

          {bpm !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300">Your Estimated Heart Rate:</p>
              <p className="text-4xl font-bold text-pink-600 dark:text-pink-400 my-2">{bpm} <span className="text-xl">BPM</span></p>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-10 prose dark:prose-invert max-w-lg mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How to Check Your Pulse Manually:</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Find your pulse: Use your first two fingers (not your thumb) to find your pulse on your wrist (radial artery) or neck (carotid artery).</li>
            <li>Choose a timer duration (e.g., 15 seconds).</li>
            <li>Click "Start" and begin counting the beats you feel until the timer stops.</li>
            <li>Enter the number of beats you counted into the "Pulse Count" field.</li>
            <li>Click "Calculate BPM" to see your estimated heart rate in beats per minute.</li>
          </ol>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center"><AlertCircle size={16} className="mr-2"/> This tool provides an estimation. For accurate heart rate monitoring, especially for medical conditions, consult a healthcare professional or use a medical-grade device.</p>
        </motion.div>
      </div>
    </>
  );
};

export default ManualHeartRateChecker;
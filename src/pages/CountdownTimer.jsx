import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Timer, Play, Pause, RotateCcw, AlertTriangle, BellRing } from 'lucide-react';

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('00:00');
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);
  const { toast } = useToast();

  const calculateTimeLeft = () => {
    if (!targetDate || !targetTime) return null;

    const targetDateTime = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();
    const difference = targetDateTime.getTime() - now.getTime();

    if (difference <= 0) {
      setIsRunning(false);
      setIsFinished(true);
      clearInterval(intervalRef.current);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const newTimeLeft = calculateTimeLeft();
        if (newTimeLeft) {
          setTimeLeft(newTimeLeft);
        } else {
          // This case should be handled by difference <= 0 in calculateTimeLeft
          setIsRunning(false);
          clearInterval(intervalRef.current);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, targetDate, targetTime]);
  
  useEffect(() => {
    if (isFinished) {
      toast({
        title: "Countdown Finished!",
        description: "The timer has reached zero.",
        duration: 5000,
        action: <BellRing className="text-green-500" />,
      });
      // Optionally play a sound
      // const audio = new Audio('/path-to-sound.mp3'); // Make sure you have a sound file
      // audio.play();
    }
  }, [isFinished, toast]);


  const handleStartPause = () => {
    if (!targetDate || !targetTime) {
      toast({
        title: 'Set Target First',
        description: 'Please select a date and time for the countdown.',
        variant: 'destructive',
        action: <AlertTriangle className="text-red-500" />,
      });
      return;
    }
    
    const targetDateTime = new Date(`${targetDate}T${targetTime}`);
    if (targetDateTime <= new Date()) {
        toast({
            title: 'Invalid Time',
            description: 'Target date and time must be in the future.',
            variant: 'destructive',
            action: <AlertTriangle className="text-red-500" />,
        });
        return;
    }

    setIsFinished(false); // Reset finished state if restarting
    setIsRunning(!isRunning);
    if (!isRunning) { // If was paused and now starting
        const initialTimeLeft = calculateTimeLeft();
        setTimeLeft(initialTimeLeft);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(null);
    // setTargetDate(''); // Optionally clear inputs
    // setTargetTime('00:00');
    clearInterval(intervalRef.current);
    toast({ title: 'Timer Reset', description: 'Countdown has been reset.' });
  };

  return (
    <>
      <Helmet>
        <title>Countdown Timer | Toolzenix</title>
        <meta name="description" content="Set a countdown timer for any future date and time. Track events, deadlines, or special occasions with this easy-to-use online timer." />
        <link rel="canonical" href="https://toolzenix.com/countdown-timer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Timer className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Countdown Timer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Set a timer for any event, deadline, or special occasion.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="target-date" className="text-lg font-medium text-gray-800 dark:text-gray-200">Target Date</Label>
              <Input
                id="target-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <Label htmlFor="target-time" className="text-lg font-medium text-gray-800 dark:text-gray-200">Target Time</Label>
              <Input
                id="target-time"
                type="time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button onClick={handleStartPause} className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-lg py-3">
              {isRunning ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1 text-lg py-3 border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
              <RotateCcw className="w-6 h-6 mr-2" /> Reset
            </Button>
          </div>
          
          {timeLeft && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
            >
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg shadow">
                <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg shadow">
                <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hours</div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg shadow">
                <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg shadow">
                <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
              </div>
            </motion.div>
          )}
          {isFinished && (
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 mt-4"
            >
                <BellRing className="w-16 h-16 text-green-500 mx-auto mb-3 animate-pulse" />
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">Countdown Finished!</p>
            </motion.div>
          )}
          {!timeLeft && !isFinished && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                Set a target date and time to start your countdown.
            </p>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Track Your Important Moments</h2>
          <p>
            Whether it's a project deadline, a special event, a holiday, or any future moment you're looking forward to, our Countdown Timer helps you keep track.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol>
            <li>Select the "Target Date" from the calendar.</li>
            <li>Set the "Target Time" for your event.</li>
            <li>Click "Start" to begin the countdown.</li>
            <li>You can "Pause" and "Resume" the timer, or "Reset" it to start over.</li>
          </ol>
          <p>
            The timer will display the remaining days, hours, minutes, and seconds until your set time.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default CountdownTimer;
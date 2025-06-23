import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Clock, Play, Pause, RotateCcw, AlertTriangle, BellRing } from 'lucide-react';
import { Link } from "react-router-dom";

const DateTimeCountdownTimer = () => {
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
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, targetDate, targetTime]);
  
  useEffect(() => {
    if (isFinished && timeLeft && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      toast({
        title: "Countdown Finished!",
        description: "The timer has reached zero.",
        duration: 5000,
        action: <BellRing className="text-green-500" />,
      });
    }
  }, [isFinished, timeLeft, toast]);


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
    if (targetDateTime <= new Date() && !isRunning) { // Check only if starting
        toast({
            title: 'Invalid Time',
            description: 'Target date and time must be in the future.',
            variant: 'destructive',
            action: <AlertTriangle className="text-red-500" />,
        });
        return;
    }

    setIsFinished(false); 
    setIsRunning(!isRunning);
    if (!isRunning) { 
        const initialTimeLeft = calculateTimeLeft();
        setTimeLeft(initialTimeLeft);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(null);
    setTargetDate(''); 
    setTargetTime('00:00');
    clearInterval(intervalRef.current);
    toast({ title: 'Timer Reset', description: 'Countdown has been reset.' });
  };

  return (
    <>
      <Helmet>
        <title>Countdown Timer to Date & Time - Online Event Timer | Toolzenix</title>
        <meta name="description" content="Set a precise countdown timer for any future date and time. Track upcoming events, deadlines, holidays, or special occasions with this easy-to-use online timer. Displays days, hours, minutes, and seconds remaining." />
        <link rel="canonical" href="https://toolzenix.com/datetime-countdown-timer" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Clock className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Countdown Timer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Set a timer for any event, deadline, or special occasion. Watch the seconds tick down to your important moment.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="target-date-dt" className="text-lg font-medium text-gray-800 dark:text-gray-200">Target Date</Label>
              <Input
                id="target-date-dt"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                min={new Date().toISOString().split("T")[0]}
                disabled={isRunning}
              />
            </div>
            <div>
              <Label htmlFor="target-time-dt" className="text-lg font-medium text-gray-800 dark:text-gray-200">Target Time</Label>
              <Input
                id="target-time-dt"
                type="time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button onClick={handleStartPause} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-lg py-3">
              {isRunning ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1 text-lg py-3 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30">
              <RotateCcw className="w-6 h-6 mr-2" /> Reset
            </Button>
          </div>
          
          {timeLeft && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
            >
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hours</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow">
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
              </div>
            </motion.div>
          )}
          {isFinished && timeLeft && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
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

        <div className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold mb-4">About Our Countdown Timer</h2>
          <p>Our Countdown Timer is a versatile tool that allows you to track the time remaining until any specific future date and time. Whether you're counting down to a birthday, holiday, product launch, project deadline, or any other significant event, this timer provides a clear and visually appealing display of the remaining days, hours, minutes, and seconds.</p>
          <p>Setting up your countdown is simple: just select your target date and time using the intuitive input fields. Once started, the timer updates every second. You can pause and resume the countdown as needed, or reset it to start over with a new target. When the countdown reaches zero, you'll receive a notification. This tool is perfect for building anticipation, managing your time effectively, or simply keeping track of important future moments. For other time-related utilities, consider our <Link to="/date-calculator">Date Calculator</Link> or <Link to="/stopwatch">Stopwatch</Link>.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Enter the "Target Date" for your event using the date picker. Ensure it's a future date.</li>
            <li>Enter the "Target Time" for your event using the time input.</li>
            <li>Click the "Start" button to begin the countdown. The display will show the time remaining in days, hours, minutes, and seconds.</li>
            <li>You can "Pause" the countdown at any time and "Resume" it later.</li>
            <li>Click the "Reset" button to clear the current countdown and set a new target date and time.</li>
            <li>Once the countdown reaches zero, a "Countdown Finished!" message will appear.</li>
          </ol>
          <p className="mt-4">This tool is great for personal use, event planning, or any situation where you need to track time leading up to a specific moment. Explore more <Link to="/calendar-time-tools">Calendar & Time Tools</Link> or browse <Link to="/tools">all available tools</Link> on Toolzenix.</p>
        </div>
      </div>
    </>
  );
};

export default DateTimeCountdownTimer;
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Timer, Play, Pause, RotateCcw, Flag, ListChecks } from 'lucide-react';

const StopwatchTool = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const { toast } = useToast();

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10); // Update every 10ms for smoother display
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    toast({ title: 'Stopwatch Reset', description: 'Timer cleared.' });
  };

  const handleLap = () => {
    if (isRunning) {
      const lapTime = time;
      const lastLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
      const currentLapDuration = lapTime - lastLapTime;
      setLaps([...laps, { lap: laps.length + 1, time: formatTime(currentLapDuration), totalTime: lapTime, displayTotal: formatTime(lapTime) }]);
    } else {
      toast({ title: 'Timer Not Running', description: 'Start the stopwatch to record laps.', variant:'destructive' });
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <>
      <Helmet>
        <title>Online Stopwatch | Toolzenix</title>
        <meta name="description" content="A simple and accurate online stopwatch. Start, stop, reset, and record laps directly in your browser. Perfect for timing activities." />
        <link rel="canonical" href="https://toolzenix.com/stopwatch" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Timer className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Online Stopwatch
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Precise timing at your fingertips. Start, stop, and record laps.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center"
        >
          <div className="text-6xl font-mono font-bold text-gray-800 dark:text-white mb-10">
            {formatTime(time)}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button onClick={handleStartPause} className={`py-3 text-lg ${isRunning ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700' : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'} text-white`}>
              {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={handleLap} variant="outline" className="py-3 text-lg border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30" disabled={!isRunning && time === 0}>
              <Flag className="w-5 h-5 mr-2" /> Lap
            </Button>
          </div>
          <Button onClick={handleReset} variant="outline" className="w-full py-3 text-lg border-gray-400 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
            <RotateCcw className="w-5 h-5 mr-2" /> Reset
          </Button>
        </motion.div>

        {laps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
              <ListChecks className="w-6 h-6 mr-2 text-green-500 dark:text-green-400" /> Laps
            </h2>
            <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
              {laps.slice().reverse().map((lap, index) => (
                <li key={lap.lap} className="py-3 px-1 flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-600 dark:text-gray-300">Lap {lap.lap}</span>
                  <span className="text-gray-700 dark:text-gray-200 font-mono">{lap.time}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-mono">Total: {lap.displayTotal}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default StopwatchTool;
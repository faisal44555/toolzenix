import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MousePointerClick, Zap, RotateCcw, History } from 'lucide-react';

const ReactionTimeTester = () => {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, active, result
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [scores, setScores] = useState([]);
  const { toast } = useToast();
  const testAreaRef = useRef(null);

  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    const randomDelay = Math.random() * 3000 + 1000; // 1-4 seconds
    const id = setTimeout(() => {
      setGameState('active');
      setStartTime(performance.now());
    }, randomDelay);
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      clearTimeout(timeoutId);
      setGameState('idle');
      toast({ title: 'Too Soon!', description: 'Clicked before the color changed. Try again.', variant: 'destructive' });
    } else if (gameState === 'active') {
      const endTime = performance.now();
      const time = Math.round(endTime - startTime);
      setReactionTime(time);
      setScores(prevScores => [time, ...prevScores.slice(0, 4)]); // Keep last 5 scores
      setGameState('result');
    }
  };

  const resetGame = () => {
    clearTimeout(timeoutId);
    setGameState('idle');
    setReactionTime(null);
    setStartTime(null);
  };
  
  const getAverageScore = () => {
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [timeoutId]);

  let bgColor = 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700';
  let text = 'Click to Start';
  if (gameState === 'waiting') {
    bgColor = 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700';
    text = 'Wait for Green...';
  } else if (gameState === 'active') {
    bgColor = 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700';
    text = 'Click NOW!';
  } else if (gameState === 'result') {
    bgColor = 'bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700';
    text = `Your time: ${reactionTime} ms! Click to Retry.`;
  }

  return (
    <>
      <Helmet>
        <title>Reaction Time Tester | Toolzenix</title>
        <meta name="description" content="Test your reaction speed with this simple click-based game. See how fast you can react to visual cues." />
        <link rel="canonical" href="https://toolzenix.com/reaction-time-tester" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Zap className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Reaction Time Tester</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">How fast can you react?</p>
        </motion.div>

        <motion.div
          ref={testAreaRef}
          onClick={gameState === 'idle' || gameState === 'result' ? startGame : handleClick}
          className={`w-full max-w-2xl h-64 sm:h-80 rounded-xl shadow-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold cursor-pointer transition-colors duration-150 ${bgColor}`}
          whileTap={{ scale: 0.98 }}
        >
          {text}
        </motion.div>

        {scores.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-2xl mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <History className="w-5 h-5 mr-2 text-gray-500" /> Recent Scores
            </h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              {scores.map((score, index) => (
                <li key={index} className="flex justify-between p-1 bg-gray-50 dark:bg-gray-700/50 rounded">
                  <span>Attempt {scores.length - index}:</span>
                  <span className="font-semibold">{score} ms</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-center font-bold text-lg text-purple-600 dark:text-purple-400">
              Average: {getAverageScore()} ms
            </p>
          </motion.div>
        )}
        <Button onClick={resetGame} variant="outline" className="mt-8">
          <RotateCcw className="w-4 h-4 mr-2" /> Reset Game
        </Button>
      </div>
    </>
  );
};

export default ReactionTimeTester;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Coins, RotateCcw, CheckCircle2, History, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoinFlipSimulator = () => {
  const [result, setResult] = useState(null); 
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ heads: 0, tails: 0, total: 0 });
  const { toast } = useToast();

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null); 

    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setResult(outcome);
      setIsFlipping(false);
      
      setHistory(prevHistory => [outcome, ...prevHistory.slice(0, 9)]); 
      setStats(prevStats => ({
        heads: prevStats.heads + (outcome === 'Heads' ? 1 : 0),
        tails: prevStats.tails + (outcome === 'Tails' ? 1 : 0),
        total: prevStats.total + 1,
      }));

      toast({
        title: `It's ${outcome}!`,
        action: <CheckCircle2 className={`w-5 h-5 ${outcome === 'Heads' ? 'text-blue-500' : 'text-orange-500'}`} />,
      });
    }, 1000); 
  };
  
  const resetStats = () => {
    setHistory([]);
    setStats({ heads: 0, tails: 0, total: 0 });
    setResult(null);
    toast({ title: 'Stats Reset!', description: 'History and counts have been cleared.' });
  };

  const headsPercentage = stats.total > 0 ? ((stats.heads / stats.total) * 100).toFixed(1) : 0;
  const tailsPercentage = stats.total > 0 ? ((stats.tails / stats.total) * 100).toFixed(1) : 0;

  return (
    <>
      <Helmet>
        <title>Coin Flip Simulator - Heads or Tails? | Toolzenix</title>
        <meta name="description" content="Flip a virtual coin to get Heads or Tails. A simple and fun random coin flipper with history and statistics for making quick decisions." />
        <link rel="canonical" href="https://toolzenix.com/coin-flip-simulator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Coins className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Coin Flip Simulator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Heads or Tails? Let fate decide!
          </p>
        </motion.div>

        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center">
          <motion.div
            className="mx-auto mb-8 w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold
                       border-4 dark:border-gray-600"
            animate={{ rotateY: isFlipping ? 1080 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              background: result === 'Heads' ? 'linear-gradient(to bottom right, #3b82f6, #60a5fa)' : 
                          result === 'Tails' ? 'linear-gradient(to bottom right, #f97316, #fb923c)' :
                          'linear-gradient(to bottom right, #9ca3af, #e5e7eb)',
              borderColor: result === 'Heads' ? '#2563eb' : result === 'Tails' ? '#ea580c' : '#6b7280',
              color: result ? 'white' : 'text-gray-700 dark:text-gray-300'
            }}
          >
            {isFlipping ? '?' : result || '?'}
          </motion.div>
          
          <Button 
            onClick={flipCoin} 
            disabled={isFlipping}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-3 px-6"
          >
            {isFlipping ? 'Flipping...' : 'Flip Coin'}
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <History className="w-5 h-5 mr-2 text-gray-500" /> Statistics
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
              <p className="text-2xl font-bold text-blue-500">{stats.heads}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Heads ({headsPercentage}%)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-500">{stats.tails}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tails ({tailsPercentage}%)</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">{stats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Flips</p>
            </div>
          </div>
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Last 10 Flips:</h4>
          {history.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {history.map((item, index) => (
                <span 
                  key={index} 
                  className={`px-2 py-1 rounded text-xs font-medium text-white
                              ${item === 'Heads' ? 'bg-blue-500' : 'bg-orange-500'}`}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No flips yet.</p>
          )}
          <Button onClick={resetStats} variant="outline" size="sm" className="mt-6 w-full">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset Stats
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-md mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Make a Quick Decision with a Coin Flip</h2>
          <p>
            Can't decide between two options? Let the classic coin flip make the choice for you! Our Coin Flip Simulator provides a quick, easy, and fun way to get a random Heads or Tails result.
            This tool is perfect for making impartial decisions, settling friendly bets, playing games, or simply for a bit of random fun.
          </p>
          <p>
            The simulator not only gives you an instant result but also keeps track of your flip history (last 10 flips) and overall statistics, including the total number of heads, tails, and total flips. This allows you to see if your coin flips are leaning one way or another over time, though remember, each flip is independent and has a 50/50 chance! For more decision-making fun, try our <Link to="/rock-paper-scissors" className="text-yellow-600 dark:text-yellow-400 hover:underline">Rock Paper Scissors game</Link>.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default CoinFlipSimulator;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Dices, RefreshCw, CheckCircle2, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const DiceIcon = ({ value }) => {
  switch (value) {
    case 1: return <Dice1 className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-600 dark:text-cyan-400" />;
    case 2: return <Dice2 className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-600 dark:text-cyan-400" />;
    case 3: return <Dice3 className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-600 dark:text-cyan-400" />;
    case 4: return <Dice4 className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-600 dark:text-cyan-400" />;
    case 5: return <Dice5 className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-600 dark:text-cyan-400" />;
    case 6: return <Dice6 className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-600 dark:text-cyan-400" />;
    default: return <Dices className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-600 dark:text-cyan-400" />;
  }
};

const DiceRoller = () => {
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [diceResults, setDiceResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const { toast } = useToast();

  const rollDice = () => {
    const numDice = parseInt(numberOfDice, 10);
    if (isNaN(numDice) || numDice < 1 || numDice > 10) {
      toast({ title: 'Invalid Input', description: 'Please enter a number of dice between 1 and 10.', variant: 'destructive' });
      return;
    }

    setIsRolling(true);
    setDiceResults([]); // Clear previous results for animation

    setTimeout(() => {
      const results = [];
      let currentTotal = 0;
      for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        results.push(roll);
        currentTotal += roll;
      }
      setDiceResults(results);
      setTotal(currentTotal);
      setIsRolling(false);
      toast({ title: 'Dice Rolled!', description: `Total: ${currentTotal}`, action: <CheckCircle2 className="text-green-500" /> });
    }, 500); // Rolling animation duration
  };

  return (
    <>
      <Helmet>
        <title>Dice Roller | Toolzenix</title>
        <meta name="description" content="Roll one or more virtual dice (up to 10). Perfect for board games, RPGs, or any time you need random dice rolls." />
        <link rel="canonical" href="https://toolzenix.com/dice-roller" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Dices className="w-20 h-20 text-cyan-500 mx-auto mb-5" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Dice Roller
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Let the good times roll!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl"
        >
          <div className="mb-6">
            <Label htmlFor="num-dice" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of Dice (1-10):
            </Label>
            <Input
              id="num-dice"
              type="number"
              min="1"
              max="10"
              value={numberOfDice}
              onChange={(e) => setNumberOfDice(e.target.value)}
              className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-center"
              disabled={isRolling}
            />
          </div>
          
          <Button 
            onClick={rollDice} 
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-lg py-3 mb-8"
            disabled={isRolling}
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isRolling ? 'animate-spin' : ''}`} /> 
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </Button>

          {diceResults.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <Label className="text-lg font-semibold text-gray-700 dark:text-gray-200">Results:</Label>
              <div className="flex flex-wrap justify-center gap-4 my-4 min-h-[80px] sm:min-h-[100px]">
                {diceResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.5, opacity: 0, rotate: Math.random() * 180 - 90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 }}
                    className="p-2 bg-cyan-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <DiceIcon value={result} />
                  </motion.div>
                ))}
              </div>
              <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
                Total: {total}
              </p>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-xl text-center text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Virtual Dice Rolling</h2>
          <p>
            Need to roll dice for a game or decision? Choose how many dice you want to roll (up to 10 standard six-sided dice) and click "Roll Dice". The results and total will be displayed.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default DiceRoller;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RockingChair as HandRock, PenBox as HandPaper, Scissors as HandScissors, RotateCcw, Trophy, ShieldAlert, History, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const choices = [
  { name: 'Rock', icon: <HandRock className="w-8 h-8" />, beats: 'Scissors' },
  { name: 'Paper', icon: <HandPaper className="w-8 h-8" />, beats: 'Rock' },
  { name: 'Scissors', icon: <HandScissors className="w-8 h-8" />, beats: 'Paper' },
];

const RockPaperScissorsGame = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null); 
  const [scores, setScores] = useState({ player: 0, computer: 0, draws: 0 });
  const [gameHistory, setGameHistory] = useState([]); 
  const { toast } = useToast();

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    const randomComputerChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomComputerChoice);

    if (choice.name === randomComputerChoice.name) {
      setResult('Draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else if (choice.beats === randomComputerChoice.name) {
      setResult('Win');
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult('Lose');
      setScores(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  useEffect(() => {
    if (playerChoice && computerChoice && result) {
      setGameHistory(prev => [{ 
        player: playerChoice.name, 
        computer: computerChoice.name, 
        result 
      }, ...prev.slice(0, 4)]); 

      toast({
        title: `You ${result === 'Draw' ? 'Drew' : result === 'Win' ? 'Won!' : 'Lost.'}`,
        description: `You chose ${playerChoice.name}, Computer chose ${computerChoice.name}.`,
        variant: result === 'Win' ? 'default' : result === 'Lose' ? 'destructive' : 'default',
        action: result === 'Win' ? <Trophy className="text-yellow-400" /> : result === 'Lose' ? <ShieldAlert className="text-red-400" /> : null,
      });
    }
  }, [result]);

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScores({ player: 0, computer: 0, draws: 0 });
    setGameHistory([]);
    toast({ title: 'Game Reset!', description: 'Scores and history cleared.' });
  };

  const getResultColor = (res) => {
    if (res === 'Win') return 'text-green-500 dark:text-green-400';
    if (res === 'Lose') return 'text-red-500 dark:text-red-400';
    return 'text-gray-500 dark:text-gray-400';
  };
  
  const getChoiceIcon = (choiceName) => {
    const choiceObj = choices.find(c => c.name === choiceName);
    return choiceObj ? React.cloneElement(choiceObj.icon, {className: "w-5 h-5 inline-block"}) : null;
  };

  return (
    <>
      <Helmet>
        <title>Rock Paper Scissors Game - Play Online | Toolzenix</title>
        <meta name="description" content="Play the classic game of Rock Paper Scissors against the computer. Test your luck and strategy in this timeless hand game." />
        <link rel="canonical" href="https://toolzenix.com/rock-paper-scissors" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center space-x-2 mb-4">
            <HandRock className="w-10 h-10 text-blue-500" />
            <HandPaper className="w-10 h-10 text-green-500" />
            <HandScissors className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Rock Paper Scissors
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Choose your weapon and challenge the computer!
          </p>
        </motion.div>

        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="flex justify-around mb-8">
            {choices.map((choice) => (
              <motion.div key={choice.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => handlePlayerChoice(choice)}
                  variant="outline"
                  className="p-4 h-auto flex flex-col items-center space-y-2 border-2 hover:border-purple-500 dark:hover:border-purple-400 w-28 h-28"
                  aria-label={`Choose ${choice.name}`}
                >
                  {React.cloneElement(choice.icon, {className: "w-10 h-10"})}
                  <span className="text-sm font-medium">{choice.name}</span>
                </Button>
              </motion.div>
            ))}
          </div>

          {playerChoice && computerChoice && (
            <motion.div 
              initial={{ opacity: 0, y:10 }}
              animate={{ opacity: 1, y:0 }}
              className="text-center mb-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex justify-around items-center mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">You Chose</p>
                  {React.cloneElement(playerChoice.icon, {className: "w-12 h-12 mx-auto text-blue-600 dark:text-blue-400"})}
                  <p className="font-semibold mt-1">{playerChoice.name}</p>
                </div>
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">VS</p>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Computer Chose</p>
                  {React.cloneElement(computerChoice.icon, {className: "w-12 h-12 mx-auto text-red-600 dark:text-red-400"})}
                  <p className="font-semibold mt-1">{computerChoice.name}</p>
                </div>
              </div>
              <h2 className={`text-3xl font-bold ${getResultColor(result)}`}>
                You {result}!
              </h2>
            </motion.div>
          )}

          <div className="grid grid-cols-3 gap-4 text-center mb-6 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{scores.player}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Player Wins</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{scores.computer}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Computer Wins</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{scores.draws}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Draws</p>
            </div>
          </div>
          
          <Button onClick={resetGame} variant="outline" className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset Game
          </Button>
        </div>

        {gameHistory.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-2xl mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <History className="w-5 h-5 mr-2 text-gray-500" /> Game History (Last 5)
            </h3>
            <ul className="space-y-2">
              {gameHistory.map((game, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded text-sm">
                  <span>
                    Player: {getChoiceIcon(game.player)} vs Computer: {getChoiceIcon(game.computer)}
                  </span>
                  <span className={`font-semibold ${getResultColor(game.result)}`}>{game.result}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">The Classic Game of Wits and Chance</h2>
          <p>
            Rock Paper Scissors is a simple hand game beloved worldwide, often used to make decisions or just for fun. Each player simultaneously forms one of three shapes: Rock (a fist), Paper (a flat hand), or Scissors (a V-shape with two fingers).
          </p>
          <ul className="list-disc list-inside">
            <li><strong>Rock</strong> crushes (beats) <strong>Scissors</strong></li>
            <li><strong>Scissors</strong> cuts (beats) <strong>Paper</strong></li>
            <li><strong>Paper</strong> covers (beats) <strong>Rock</strong></li>
          </ul>
          <p>
            Test your luck and strategy against our computer opponent! Can you predict its moves and emerge victorious? This game is a great way to pass the time or settle a friendly dispute. For other fun challenges, try our <Link to="/truth-or-dare-generator" className="text-purple-600 dark:text-purple-400 hover:underline">Truth or Dare Generator</Link> or the <Link to="/coin-flip-simulator" className="text-purple-600 dark:text-purple-400 hover:underline">Coin Flip Simulator</Link>.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default RockPaperScissorsGame;
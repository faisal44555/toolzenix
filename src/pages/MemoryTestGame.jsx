import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Brain, RotateCcw, CheckCircle, XCircle, Star, Zap, Anchor, Apple, Bomb, Bug, Cat, Dog, Fish, Gem, Ghost, Gift, Heart, Home, Leaf, Moon, Plane, Rocket, Sun, TreeDeciduous, Umbrella, Wand, Watch, Waves, Wind, Wine, Sprout, Snowflake, Smile as SmileIcon } from 'lucide-react';

const icons = [Star, Zap, Anchor, Apple, Bomb, Bug, Cat, Dog, Fish, Gem, Ghost, Gift, Heart, Home, Leaf, Moon, Plane, Rocket, Sun, TreeDeciduous, Umbrella, Wand, Watch, Waves, Wind, Wine, Sprout, Snowflake, SmileIcon];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateCards = (numPairs = 8) => {
  const selectedIcons = shuffleArray(icons).slice(0, numPairs);
  const gameCards = [...selectedIcons, ...selectedIcons].map((Icon, index) => ({
    id: index,
    IconComponent: Icon,
    isFlipped: false,
    isMatched: false,
  }));
  return shuffleArray(gameCards);
};

const MemoryTestGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.IconComponent === secondCard.IconComponent) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.IconComponent === firstCard.IconComponent ? { ...card, isMatched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              (card.id === firstCard.id || card.id === secondCard.id) ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prevMoves => prevMoves + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameOver(true);
      toast({
        title: 'Congratulations!',
        description: `You completed the game in ${moves} moves!`,
        action: <CheckCircle className="text-green-500" />,
      });
    }
  }, [cards, moves]);

  const handleCardClick = (clickedCard) => {
    if (gameOver || clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) {
      return;
    }
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prevFlipped => [...prevFlipped, { ...clickedCard, isFlipped: true }]);
  };

  const restartGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    toast({ title: 'Game Restarted!', description: 'Good luck!' });
  };

  return (
    <>
      <Helmet>
        <title>Memory Test Game | Toolzenix</title>
        <meta name="description" content="Test and improve your memory with this fun card matching game. Flip cards and find pairs!" />
        <link rel="canonical" href="https://toolzenix.com/memory-test-game" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Brain className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Memory Test Game</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Match the pairs to win!</p>
        </motion.div>

        <div className="mb-6 flex justify-between items-center w-full max-w-lg">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Moves: {moves}</p>
          <Button onClick={restartGame} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" /> Restart
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-lg p-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
        >
          {cards.map(card => (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300
                          ${card.isFlipped || card.isMatched ? 'bg-green-100 dark:bg-green-700/30' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}
                          ${card.isMatched ? 'opacity-50 cursor-default' : ''}`}
              style={{ perspective: '1000px' }}
              animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                {(card.isFlipped || card.isMatched) ? (
                  <card.IconComponent className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
                ) : (
                  <Brain className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {gameOver && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 text-center p-6 bg-green-500 text-white rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-2">You Won!</h2>
            <p className="text-lg">Completed in {moves} moves.</p>
            <Button onClick={restartGame} variant="secondary" className="mt-4 bg-white text-green-500 hover:bg-gray-100">Play Again</Button>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default MemoryTestGame;
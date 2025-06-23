import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy as CardIcon, Shuffle, CheckCircle2 } from 'lucide-react'; // Using Copy as a generic card icon

const suits = ['♥', '♦', '♣', '♠'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const deck = suits.flatMap(suit => values.map(value => ({ suit, value })));

const PlayingCardPicker = () => {
  const [drawnCard, setDrawnCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { toast } = useToast();

  const drawCard = () => {
    setIsDrawing(true);
    setDrawnCard(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck[randomIndex];
      setDrawnCard(card);
      setIsDrawing(false);
      toast({
        title: 'Card Drawn!',
        description: `You drew the ${card.value}${card.suit}.`,
        action: <CheckCircle2 className="text-green-500" />,
      });
    }, 700); // Simulate drawing animation
  };

  const getSuitColor = (suit) => {
    return (suit === '♥' || suit === '♦') ? 'text-red-600 dark:text-red-400' : 'text-black dark:text-gray-200';
  };

  return (
    <>
      <Helmet>
        <title>Playing Card Picker | Toolzenix</title>
        <meta name="description" content="Draw a random playing card from a standard 52-card deck. Perfect for games or quick random selections." />
        <link rel="canonical" href="https://toolzenix.com/playing-card-picker" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <CardIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Playing Card Picker
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Draw a random card from the deck!
          </p>
        </motion.div>

        <div className="w-full max-w-xs bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center">
          <motion.div
            className={`mx-auto mb-8 w-40 h-56 rounded-lg flex flex-col items-center justify-center border-2
                        ${drawnCard ? 'bg-gray-50 dark:bg-gray-700' : 'bg-gray-200 dark:bg-gray-600'}
                        ${drawnCard ? (getSuitColor(drawnCard.suit).includes('red') ? 'border-red-500' : 'border-gray-800 dark:border-gray-300') : 'border-gray-400 dark:border-gray-500'}`}
            animate={{ rotateY: isDrawing ? 360 : 0, scale: isDrawing ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {isDrawing && <Shuffle className="w-16 h-16 text-gray-500 animate-spin" />}
            {!isDrawing && drawnCard && (
              <>
                <span className={`text-5xl font-bold ${getSuitColor(drawnCard.suit)}`}>{drawnCard.value}</span>
                <span className={`text-4xl ${getSuitColor(drawnCard.suit)}`}>{drawnCard.suit}</span>
              </>
            )}
            {!isDrawing && !drawnCard && (
              <CardIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
            )}
          </motion.div>
          
          <Button 
            onClick={drawCard} 
            disabled={isDrawing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 px-6"
          >
            {isDrawing ? 'Drawing...' : 'Draw Card'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default PlayingCardPicker;
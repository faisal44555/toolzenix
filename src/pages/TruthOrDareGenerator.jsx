import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, MessageCircle as MessageCircleQuestion, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const truths = [
  "What's the most embarrassing thing you've ever done?",
  "What's a secret you've never told anyone?",
  "What's your biggest fear?",
  "Have you ever cheated on a test?",
  "What's the biggest lie you've ever told?",
  "What's something you're glad your family doesn't know about you?",
  "What's your guilty pleasure?",
  "Who was your first crush?",
  "What's the silliest thing you've ever cried about?",
  "If you could be invisible for a day, what would you do?",
  "What's the weirdest dream you've ever had?",
  "Have you ever pretended to be sick to avoid something?",
  "What's one thing you would change about your appearance if you could?",
  "What's the most childish thing you still do?",
  "What's a food you pretend to like but actually don't?"
];

const dares = [
  "Sing a song chosen by the group.",
  "Do your best impression of a celebrity.",
  "Talk in a funny accent for the next 3 rounds.",
  "Let someone tickle you for 30 seconds.",
  "Post an embarrassing photo of yourself online (temporarily).",
  "Call a random number and try to have a 1-minute conversation.",
  "Wear socks on your hands for the next 10 minutes.",
  "Try to juggle 3 items chosen by the group.",
  "Do 10 push-ups.",
  "Speak only in questions for the next 5 minutes.",
  "Dance like nobody's watching for 1 minute.",
  "Eat a spoonful of a condiment (e.g., ketchup, mustard).",
  "Let the group give you a new hairstyle.",
  "Serenade the person to your right.",
  "Act like a chicken until your next turn."
];

const TruthOrDareGenerator = () => {
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [challengeType, setChallengeType] = useState(''); 
  const { toast } = useToast();

  const getNewChallenge = (type) => {
    let list = type === 'Truth' ? truths : dares;
    const randomIndex = Math.floor(Math.random() * list.length);
    let newChallenge = list[randomIndex];
    
    if (list.length > 1 && newChallenge === currentChallenge) {
      newChallenge = list[(randomIndex + 1) % list.length];
    }
    setCurrentChallenge(newChallenge);
    setChallengeType(type);
    toast({ title: `New ${type} Generated!`, action: <CheckCircle2 className="text-green-500" /> });
  };

  useEffect(() => {
    const randomType = Math.random() < 0.5 ? 'Truth' : 'Dare';
    getNewChallenge(randomType);
  }, []);

  return (
    <>
      <Helmet>
        <title>Truth or Dare Generator - Fun Party Game Ideas | Toolzenix</title>
        <meta name="description" content="Generate random Truth questions and Dare challenges for your game. Perfect for parties, sleepovers, and fun gatherings with friends." />
        <link rel="canonical" href="https://toolzenix.com/truth-or-dare-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <MessageCircleQuestion className="w-20 h-20 text-red-500 mx-auto mb-5" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Truth or Dare
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Ready for some revealing truths or daring challenges?
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-2xl text-center"
        >
          {currentChallenge ? (
            <>
              <motion.div 
                key={challengeType}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-2xl font-bold mb-4 ${challengeType === 'Truth' ? 'text-blue-500 dark:text-blue-400' : 'text-red-500 dark:text-red-400'}`}
              >
                {challengeType}!
              </motion.div>
              <motion.p 
                key={currentChallenge}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl min-h-[100px] text-gray-800 dark:text-gray-200 mb-10 flex items-center justify-center"
              >
                {currentChallenge}
              </motion.p>
            </>
          ) : (
            <p className="text-xl sm:text-2xl min-h-[140px] text-gray-500 dark:text-gray-400 mb-10 flex items-center justify-center">
              Choose Truth or Dare to start!
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => getNewChallenge('Truth')} className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
              <RefreshCw className="w-5 h-5 mr-2" /> New Truth
            </Button>
            <Button onClick={() => getNewChallenge('Dare')} className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3">
              <RefreshCw className="w-5 h-5 mr-2" /> New Dare
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl text-center text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Spice Up Your Gatherings!</h2>
          <p>
            Truth or Dare is a timeless party game that brings laughter, surprises, and sometimes a bit of blush to any group. Whether you're with close friends or new acquaintances, this game is a fantastic icebreaker and a way to create memorable moments. Our generator provides a wide variety of questions and challenges to keep the fun going.
          </p>
          <p>
            Simply choose "New Truth" for a thought-provoking or revealing question, or "New Dare" for a fun or silly task to perform. Remember to play responsibly and ensure everyone is comfortable with the challenges. For other fun generators, try our <Link to="/joke-generator" className="text-red-600 dark:text-red-400 hover:underline">Joke Generator</Link> or the <Link to="/fortune-cookie-generator" className="text-red-600 dark:text-red-400 hover:underline">Fortune Cookie Generator</Link>.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default TruthOrDareGenerator;
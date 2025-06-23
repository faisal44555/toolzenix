import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, Brain, CheckCircle2 } from 'lucide-react';

const questions = [
  "Would you rather have the ability to fly or be invisible?",
  "Would you rather live in a world without music or a world without movies?",
  "Would you rather be able to talk to animals or speak all human languages?",
  "Would you rather have unlimited money or unlimited time?",
  "Would you rather explore deep space or the deep ocean?",
  "Would you rather give up your favorite food for a year or your phone for a month?",
  "Would you rather be a famous movie star or a Nobel Prize-winning scientist?",
  "Would you rather always have to tell the truth or always have to lie?",
  "Would you rather live in a house shaped like a shoe or a teapot?",
  "Would you rather have a personal chef or a personal chauffeur?",
  "Would you rather be able_to control fire or water?",
  "Would you rather never use social media again or never watch TV shows/movies again?",
  "Would you rather have a photographic memory or be amazing at math?",
  "Would you rather meet your ancestors or your future descendants?",
  "Would you rather be able to teleport anywhere or read minds?",
  "Would you rather have a rewind button for your life or a pause button?",
  "Would you rather fight one horse-sized duck or one hundred duck-sized horses?",
  "Would you rather always be 10 minutes late or always be 20 minutes early?",
  "Would you rather have a dragon or be a dragon?",
  "Would you rather find true love or win a $100 million lottery?"
];

const WouldYouRatherGenerator = () => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const { toast } = useToast();

  const getNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    let newQuestion = questions[randomIndex];
    if (questions.length > 1 && newQuestion === currentQuestion) {
      newQuestion = questions[(randomIndex + 1) % questions.length];
    }
    setCurrentQuestion(newQuestion);
    toast({ title: 'New Question Loaded!', action: <CheckCircle2 className="text-green-500" /> });
  };

  useEffect(() => {
    getNewQuestion();
  }, []);

  return (
    <>
      <Helmet>
        <title>Would You Rather Questions | Toolzenix</title>
        <meta name="description" content="Generate fun and thought-provoking 'Would You Rather' questions. Perfect for parties, icebreakers, or just for fun!" />
        <link rel="canonical" href="https://toolzenix.com/would-you-rather-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Brain className="w-20 h-20 text-purple-500 mx-auto mb-5" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Would You Rather...?
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Get ready for some tough choices and fun dilemmas!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-2xl text-center"
        >
          {currentQuestion ? (
            <motion.p 
              key={currentQuestion}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-semibold min-h-[120px] text-gray-800 dark:text-gray-200 mb-10 flex items-center justify-center"
            >
              {currentQuestion}
            </motion.p>
          ) : (
            <p className="text-2xl sm:text-3xl font-semibold min-h-[120px] text-gray-500 dark:text-gray-400 mb-10 flex items-center justify-center">
              Click "New Question" to start!
            </p>
          )}

          <Button onClick={getNewQuestion} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white text-lg px-10 py-4">
            <RefreshCw className="w-6 h-6 mr-3" /> New Question
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl text-center text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How to Play</h2>
          <p>
            "Would You Rather" is a conversation game that poses a dilemma in the form of a question beginning with "Would you rather...". The dilemma can be between two supposedly good options, two bad options, or two options that are just interesting to compare.
          </p>
          <p>Click "New Question" to generate a random dilemma and discuss your choice with friends!</p>
        </motion.div>
      </div>
    </>
  );
};

export default WouldYouRatherGenerator;
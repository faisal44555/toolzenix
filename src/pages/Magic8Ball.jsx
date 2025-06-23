import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wand2, HelpCircle } from 'lucide-react';

const answers = [
  "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes – definitely.",
  "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.",
  "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.",
  "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
  "Don't count on it.", "My reply is no.", "My sources say no.",
  "Outlook not so good.", "Very doubtful."
];

const Magic8Ball = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const askMagic8Ball = () => {
    if (!question.trim() || !question.endsWith('?')) {
      setAnswer("Please ask a clear yes/no question ending with a '?'");
      return;
    }

    setIsShaking(true);
    setAnswer(''); // Clear previous answer

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * answers.length);
      setAnswer(answers[randomIndex]);
      setIsShaking(false);
    }, 1500); // Shake duration
  };

  return (
    <>
      <Helmet>
        <title>Magic 8 Ball Online | Toolzenix</title>
        <meta name="description" content="Ask the Magic 8 Ball any yes/no question and get a mysterious answer. Fun and classic fortune-telling tool." />
        <link rel="canonical" href="https://toolzenix.com/magic-8-ball" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Wand2 className="w-20 h-20 text-indigo-500 mx-auto mb-5" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Magic 8 Ball
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Ask a yes/no question and reveal your fortune!
          </p>
        </motion.div>

        <div className="w-full max-w-md">
          <motion.div 
            className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-8 cursor-pointer"
            animate={isShaking ? { rotate: [0, -5, 5, -5, 5, 0], x: [0, -3, 3, -3, 3, 0] } : {}}
            transition={isShaking ? { duration: 0.2, repeat: 7 } : {}}
            onClick={!isShaking && answer ? askMagic8Ball : undefined} // Allow re-shake if answered
          >
            <div className="absolute inset-0 bg-gray-900 dark:bg-black rounded-full shadow-2xl flex items-center justify-center">
              {!isShaking && answer && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="w-32 h-32 sm:w-40 sm:h-40 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-center p-2"
                >
                  <p className="text-white font-semibold text-sm sm:text-md leading-tight">{answer}</p>
                </motion.div>
              )}
              {isShaking && (
                 <HelpCircle className="w-16 h-16 text-indigo-400 animate-pulse" />
              )}
              {!answer && !isShaking && (
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-center p-2">
                    <p className="text-white font-bold text-5xl sm:text-6xl">8</p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <Label htmlFor="question-input" className="text-md font-medium text-gray-700 dark:text-gray-300">
              Ask your question (ending with '?'):
            </Label>
            <Input
              id="question-input"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Will I succeed...?"
              className="mt-2 mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              disabled={isShaking}
            />
            <Button 
              onClick={askMagic8Ball} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3"
              disabled={isShaking || !question.trim()}
            >
              {isShaking ? 'Shaking...' : 'Ask the Ball'}
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-md text-center text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How to Use</h2>
          <p>
            Concentrate on a yes/no question you want an answer to. Type your question into the box, ensuring it ends with a question mark. Then, click "Ask the Ball" and let fate decide!
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Magic8Ball;
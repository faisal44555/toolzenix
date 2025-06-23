import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy, RefreshCw, Smile, CheckCircle2 } from 'lucide-react';

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Why don't programmers like nature? It has too many bugs.",
  "What do you call fake spaghetti? An impasta!",
  "Why did the bicycle fall over? Because it was two tired!",
  "I told my wife she was drawing her eyebrows too high. She seemed surprised.",
  "What's orange and sounds like a parrot? A carrot!",
  "Why can't you give Elsa a balloon? Because she will let it go.",
  "Parallel lines have so much in common. It’s a shame they’ll never meet.",
  "My dog used to chase people on a bike a lot. It got so bad, I had to take his bike away.",
  "What do you call a fish with no eyes? Fsh!",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "Did you hear about the restaurant on the moon? I heard the food was good but it had no atmosphere.",
  "Why do we tell actors to 'break a leg?' Because every play has a cast.",
  "Helvetica and Times New Roman walk into a bar. 'Get out of here!' shouts the bartender. 'We don't serve your type.'",
  "What did the zero say to the eight? Nice belt!",
  "Why was the math book sad? Because it had too many problems.",
  "What concert costs just 45 cents? 50 Cent featuring Nickelback!",
  "Why did the coffee file a police report? It got mugged.",
  "How does a penguin build its house? Igloos it together."
];

const JokeGenerator = () => {
  const [currentJoke, setCurrentJoke] = useState('');
  const { toast } = useToast();

  const getNewJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    let newJoke = jokes[randomIndex];
    // Ensure new joke is different from current one if possible
    if (jokes.length > 1 && newJoke === currentJoke) {
      newJoke = jokes[(randomIndex + 1) % jokes.length];
    }
    setCurrentJoke(newJoke);
    toast({ title: 'New Joke Loaded!', action: <CheckCircle2 className="text-green-500" /> });
  };

  useState(() => {
    getNewJoke();
  }, []);

  const handleCopyToClipboard = () => {
    if (!currentJoke) {
      toast({ title: 'Nothing to Copy', description: 'No joke generated yet.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(currentJoke)
      .then(() => toast({ title: 'Copied!', description: 'Joke copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Joke Generator - Random Jokes | Toolzenix</title>
        <meta name="description" content="Get a random joke with our fun and easy-to-use joke generator. Brighten your day with a new joke each time!" />
        <link rel="canonical" href="https://toolzenix.com/joke-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Smile className="w-20 h-20 text-green-500 mx-auto mb-5" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Joke Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Need a laugh? Get a random joke here!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center"
        >
          {currentJoke ? (
            <motion.p 
              key={currentJoke}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl min-h-[100px] text-gray-800 dark:text-gray-200 mb-8 flex items-center justify-center"
            >
              {currentJoke}
            </motion.p>
          ) : (
            <p className="text-xl min-h-[100px] text-gray-500 dark:text-gray-400 mb-8 flex items-center justify-center">
              Click "New Joke" to start!
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={getNewJoke} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3">
              <RefreshCw className="w-5 h-5 mr-2" /> New Joke
            </Button>
            <Button variant="outline" onClick={handleCopyToClipboard} className="w-full sm:w-auto text-lg px-8 py-3" disabled={!currentJoke}>
              <Copy className="w-5 h-5 mr-2" /> Copy Joke
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-lg text-center text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Spread the Laughter!</h2>
          <p>
            Enjoy a collection of hand-picked jokes. Click "New Joke" for endless fun. All jokes are safe for work and family-friendly.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default JokeGenerator;
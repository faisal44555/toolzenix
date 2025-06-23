import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy, RefreshCw, Lightbulb, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const funFacts = [
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "A single cloud can weigh more than a million pounds.",
  "A group of flamingos is called a 'flamboyance'.",
  "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
  "Octopuses have three hearts.",
  "Bananas are berries, but strawberries aren't.",
  "A day on Venus is longer than a year on Venus. Venus rotates very slowly on its axis but orbits the Sun faster.",
  "There are more stars in the universe than grains of sand on all the beaches on Earth.",
  "Cows have best friends and can become stressed when they are separated.",
  "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
  "Humans share 50% of their DNA with bananas.",
  "A bolt of lightning is five times hotter than the surface of the sun.",
  "It's impossible to hum while holding your nose.",
  "A 'jiffy' is an actual unit of time: 1/100th of a second.",
  "The unicorn is the national animal of Scotland.",
  "Slugs have four noses.",
  "An ostrich's eye is bigger than its brain.",
  "Butterflies taste with their feet.",
  "A shrimp's heart is in its head.",
  "It rains diamonds on Saturn and Jupiter.",
  "Polar bears have black skin under their white fur.",
  "The Hawaiian alphabet has only 13 letters.",
  "A crocodile cannot stick its tongue out.",
  "Sea otters hold hands when they sleep to keep from drifting apart.",
  "There are more possible iterations of a game of chess than there are atoms in the known universe.",
  "A sneeze travels about 100 miles per hour.",
  "The Great Wall of China is not visible from the moon with the naked eye.",
  "Hot water will turn into ice faster than cold water (Mpemba effect).",
  "Rats multiply so quickly that in 18 months, two rats could have over a million descendants.",
  "Wearing headphones for just an hour could increase the bacteria in your ear by 700 times."
];

const FunFactGenerator = () => {
  const [currentFact, setCurrentFact] = useState('');
  const { toast } = useToast();

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    const newFact = funFacts[randomIndex];
    setCurrentFact(newFact);
    toast({ title: 'New Fun Fact Loaded!', action: <CheckCircle2 className="text-green-500" /> });
  };

  useEffect(() => {
    getRandomFact(); 
  }, []);

  const handleCopyToClipboard = () => {
    if (!currentFact) {
      toast({ title: 'Nothing to Copy', description: 'No fact loaded.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(currentFact)
      .then(() => toast({ title: 'Copied!', description: 'Fun fact copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Fun Fact Generator - Amazing & Surprising Facts | Toolzenix</title>
        <meta name="description" content="Discover amazing and interesting fun facts with our random fact generator. Learn something new, surprising, and shareable every day!" />
        <link rel="canonical" href="https://toolzenix.com/fun-fact-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Fun Fact Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Learn something new and surprising!
          </p>
        </motion.div>

        <motion.div
          key={currentFact}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center min-h-[150px] flex items-center justify-center"
        >
          {currentFact ? (
            <p className="text-xl italic text-gray-700 dark:text-gray-200">
              {currentFact}
            </p>
          ) : (
            <p className="text-xl text-gray-500 dark:text-gray-400">Loading fun fact...</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex space-x-4"
        >
          <Button onClick={getRandomFact} variant="outline" className="border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500">
            <RefreshCw className="w-5 h-5 mr-2" /> Get Another Fact
          </Button>
          <Button onClick={handleCopyToClipboard} className="bg-yellow-400 hover:bg-yellow-500 text-black">
            <Copy className="w-5 h-5 mr-2" /> Copy Fact
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Expand Your Knowledge with Fun Facts</h2>
          <p>
            Our Fun Fact Generator is a delightful way to learn interesting tidbits about science, history, nature, and the world around us. Each click brings a new, surprising piece of information designed to pique your curiosity and broaden your horizons. These facts are perfect for sparking conversations, impressing friends, or simply as a daily dose of interesting knowledge.
          </p>
          <p>
            All facts are curated for general interest and entertainment. The collection is regularly updated to ensure fresh and engaging content. Whether you're a trivia enthusiast or just looking for a fun way to learn, this tool offers an endless stream of fascinating information. If you enjoy random generators, you might also like our <Link to="/joke-generator" className="text-yellow-500 dark:text-yellow-300 hover:underline">Joke Generator</Link> or the <Link to="/quote-of-the-day" className="text-yellow-500 dark:text-yellow-300 hover:underline">Quote of the Day</Link>.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default FunFactGenerator;
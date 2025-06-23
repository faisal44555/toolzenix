import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy, RefreshCw, MessageSquare as MessageSquareQuote, CheckCircle2 } from 'lucide-react';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "Money and success don’t change people; they merely amplify what is already there.", author: "Will Smith" },
  { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { text: "The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.", author: "Henry Ford" },
  { text: "In order to write about life first you must live it.", author: "Ernest Hemingway" },
  { text: "The big lesson in life, baby, is never be scared of anyone or anything.", author: "Frank Sinatra" },
  { text: "Curiosity about life in all of its aspects, I think, is still the secret of great creative people.", author: "Leo Burnett" },
  { text: "Life is not a problem to be solved, but a reality to be experienced.", author: "Soren Kierkegaard" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't cry because it's over, smile because it happened.", author: "Dr. Seuss" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "It is never too late to be what you might have been.", author: "George Eliot" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" }
];

const QuoteOfTheDay = () => {
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });
  const { toast } = useToast();

  const getDailyQuote = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const quoteIndex = dayOfYear % quotes.length;
    setCurrentQuote(quotes[quoteIndex]);
  };
  
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];
    setCurrentQuote(newQuote);
    toast({ title: 'New Quote Loaded!', action: <CheckCircle2 className="text-green-500" /> });
  };

  useEffect(() => {
    getDailyQuote(); // Load quote of the day on initial render
  }, []);

  const handleCopyToClipboard = () => {
    if (!currentQuote.text) {
      toast({ title: 'Nothing to Copy', description: 'No quote loaded.', variant: 'destructive' });
      return;
    }
    const textToCopy = `"${currentQuote.text}" - ${currentQuote.author}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast({ title: 'Copied!', description: 'Quote copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Quote of the Day | Toolzenix</title>
        <meta name="description" content="Get your daily dose of inspiration with a new quote each day. Discover wisdom from famous authors and thinkers." />
        <link rel="canonical" href="https://toolzenix.com/quote-of-the-day" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <MessageSquareQuote className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Quote of the Day
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Daily inspiration to brighten your day.
          </p>
        </motion.div>

        <motion.div
          key={currentQuote.text} 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center"
        >
          {currentQuote.text ? (
            <>
              <blockquote className="text-2xl italic font-medium text-gray-800 dark:text-gray-100 mb-4">
                "{currentQuote.text}"
              </blockquote>
              <p className="text-md text-gray-600 dark:text-gray-400">- {currentQuote.author}</p>
            </>
          ) : (
            <p className="text-xl text-gray-500 dark:text-gray-400">Loading quote...</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex space-x-4"
        >
          <Button onClick={getRandomQuote} variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-600">
            <RefreshCw className="w-5 h-5 mr-2" /> Get Another Quote
          </Button>
          <Button onClick={handleCopyToClipboard} className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Copy className="w-5 h-5 mr-2" /> Copy Quote
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Find Your Inspiration</h2>
          <p>
            Our Quote of the Day tool provides a fresh piece of wisdom or inspiration each day. You can also browse through random quotes to find one that resonates with you.
          </p>
          <p>
            Quotes can offer new perspectives, motivate action, or simply provide a moment of reflection. Share your favorite quotes with friends or use them as a daily mantra.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default QuoteOfTheDay;
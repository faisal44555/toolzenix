import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Cookie, RefreshCw, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const fortunes = [
  "A beautiful, smart, and loving person will be coming into your life.",
  "A dubious friend may be an enemy in camouflage.",
  "A faithful friend is a strong defense.",
  "A fresh start will put you on your way.",
  "A golden egg of opportunity falls into your lap this month.",
  "A good time to finish up old tasks.",
  "A hunch is creativity trying to tell you something.",
  "A lifetime of happiness lies ahead of you.",
  "A light heart carries you through all the hard times.",
  "A new perspective will come with the new year.",
  "A pleasant surprise is waiting for you.",
  "A smile is your passport into the hearts of others.",
  "Adventure can be real happiness.",
  "All your hard work will soon pay off.",
  "An acquaintance of the past will affect you in the near future.",
  "Believe in yourself and others will too.",
  "Change is happening in your life, so go with the flow!",
  "Courtesy is contagious.",
  "Do not be afraid of competition.",
  "Don’t let your limitations overshadow your talents.",
  "Every day is a new beginning. Treat it that way.",
  "Failure is the chance to do better next time.",
  "Good news will come to you by mail.",
  "Happiness begins with facing life with a smile and a wink.",
  "If you want the rainbow, you must to put up with the rain. D. Parton",
  "It is now, and in this world, that we must live.",
  "Let the deeds speak.",
  "Listen not to vain words of empty tongue.",
  "Love is like sweet medicine, good to the last drop.",
  "Never give up. You're not a failure if you don't give up.",
  "Now is the time to try something new.",
  "Patience is a virtue.",
  "Practice makes perfect.",
  "Serious trouble will bypass you.",
  "Sometimes you just need to lay on the floor.",
  "The greatest achievement in life is to stand up again after falling.",
  "The man or woman you desire feels the same about you.",
  "The object of your desire is closer than you think.",
  "The world is always ready to receive talent with open arms.",
  "There is no greater pleasure than seeing your loved ones prosper.",
  "Things don't just happen; they happen just.",
  "Today it's up to you to create the peacefulness you long for.",
  "Welcome change.",
  "What’s hidden in an empty box?",
  "You are a person of another time.",
  "You are talented in many ways.",
  "You will be successful in your work.",
  "You will conquer obstacles to achieve success.",
  "Your ability to juggle many tasks will take you far.",
  "Your dreams are never silly; depend on them to guide you."
];

const FortuneCookieGenerator = () => {
  const [currentFortune, setCurrentFortune] = useState('');
  const [isCracking, setIsCracking] = useState(false);
  const { toast } = useToast();

  const getNewFortune = () => {
    setIsCracking(true);
    setCurrentFortune(''); 

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      let newFortune = fortunes[randomIndex];
      if (fortunes.length > 1 && newFortune === currentFortune) {
        newFortune = fortunes[(randomIndex + 1) % fortunes.length];
      }
      setCurrentFortune(newFortune);
      setIsCracking(false);
      toast({ title: 'Fortune Revealed!', action: <CheckCircle2 className="text-green-500" /> });
    }, 1000); 
  };

  useEffect(() => {
    getNewFortune(); 
  }, []);

  return (
    <>
      <Helmet>
        <title>Fortune Cookie Generator - Reveal Your Wisdom | Toolzenix</title>
        <meta name="description" content="Crack open a virtual fortune cookie and reveal your fortune! Get a new insightful, fun, or prophetic message each time you click." />
        <link rel="canonical" href="https://toolzenix.com/fortune-cookie-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Cookie className="w-20 h-20 text-orange-500 mx-auto mb-5" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Fortune Cookie
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Crack open a cookie and see what wisdom awaits!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center"
        >
          <motion.div 
            className="min-h-[100px] mb-8 p-4 bg-orange-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center"
            animate={isCracking ? { scale: [1, 1.1, 0.9, 1], opacity: [1, 0.5, 1] } : {}}
            transition={isCracking ? { duration: 1, ease: "easeInOut" } : {}}
          >
            {isCracking && <p className="text-lg text-orange-600 dark:text-orange-400 italic">Cracking...</p>}
            {!isCracking && currentFortune && (
              <motion.p
                key={currentFortune} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg italic text-gray-700 dark:text-gray-300"
              >
                "{currentFortune}"
              </motion.p>
            )}
            {!isCracking && !currentFortune && (
                 <p className="text-lg text-gray-500 dark:text-gray-400">Click to get your fortune!</p>
            )}
          </motion.div>
          
          <Button 
            onClick={getNewFortune} 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3"
            disabled={isCracking}
          >
            <RefreshCw className="w-5 h-5 mr-2" /> {isCracking ? 'Getting Fortune...' : 'Crack Another Cookie'}
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-md text-center text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">A Bite of Wisdom and Fun</h2>
          <p>
            Fortune cookies are a delightful tradition, often concluding a meal with a crisp cookie and a slip of paper carrying a vague prophecy, a wise aphorism, or a fun message. Our digital Fortune Cookie Generator brings this experience online, offering a moment of lighthearted fun and perhaps a touch of inspiration.
          </p>
          <p>
            Each click "cracks open" a new cookie, revealing a unique fortune from our extensive collection. Whether you're looking for a bit of guidance, a chuckle, or a conversation starter, this tool is sure to provide. If you enjoy this, you might also like our <Link to="/quote-of-the-day" className="text-orange-600 dark:text-orange-400 hover:underline">Quote of the Day</Link> or the <Link to="/magic-8-ball" className="text-orange-600 dark:text-orange-400 hover:underline">Magic 8-Ball</Link> for more random fun.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default FortuneCookieGenerator;
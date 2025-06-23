import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Copy, RefreshCw, User, CheckCircle2 } from 'lucide-react';

const adjectives = [
  "Awesome", "Bold", "Clever", "Daring", "Epic", "Fearless", "Grand", "Heroic",
  "Iron", "Jade", "Keen", "Lucky", "Mighty", "Noble", "Omega", "Prime",
  "Quick", "Royal", "Swift", "Titan", "Ultra", "Vivid", "Wild", "Xeno",
  "Young", "Zealous", "Shadow", "Silent", "Phantom", "Cosmic", "Cyber", "Neon"
];

const nouns = [
  "Ace", "Blade", "Comet", "Dragon", "Eagle", "Falcon", "Ghost", "Hawk",
  "Jaguar", "King", "Lion", "Maverick", "Ninja", "Oracle", "Phoenix", "Queen",
  "Rider", "Storm", "Tiger", "Unicorn", "Viper", "Wolf", "X-Factor", "Yeti",
  "Zephyr", "Legend", "Warrior", "Sorcerer", "Hunter", "Gladiator", "Pilot"
];

const NicknameGenerator = () => {
  const [nameInput, setNameInput] = useState('');
  const [generatedNickname, setGeneratedNickname] = useState('');
  const { toast } = useToast();

  const generateNickname = () => {
    let prefix = nameInput.trim().slice(0, 3) || ''; // Use first 3 letters of name or empty
    if (prefix && Math.random() < 0.3) prefix = ''; // Sometimes don't use prefix

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    let nickname;
    const style = Math.random();

    if (style < 0.4) {
      nickname = `${randomAdjective} ${randomNoun}`;
    } else if (style < 0.7) {
      nickname = `${prefix}${randomNoun}`;
      if (prefix) nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1);
    } else {
      nickname = `${randomAdjective}${Math.random() < 0.5 ? '' : Math.floor(Math.random() * 100)}`;
    }
    
    // Ensure nickname is not too long
    if (nickname.length > 15) {
        nickname = nickname.substring(0, 15);
    }
    
    // Capitalize first letter if not already
    nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1);


    setGeneratedNickname(nickname);
    toast({ title: 'Nickname Generated!', description: `Here's one: ${nickname}`, action: <CheckCircle2 className="text-green-500" /> });
  };
  
  useEffect(() => {
    generateNickname(); // Generate one on load
  }, []);


  const handleCopyToClipboard = () => {
    if (!generatedNickname) {
      toast({ title: 'Nothing to Copy', description: 'No nickname generated yet.', variant: 'destructive' });
      return;
    }
    navigator.clipboard.writeText(generatedNickname)
      .then(() => toast({ title: 'Copied!', description: 'Nickname copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Nickname Generator | Toolzenix</title>
        <meta name="description" content="Generate cool, fun, and unique nicknames. Perfect for gaming, social media, or just for fun!" />
        <link rel="canonical" href="https://toolzenix.com/nickname-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <User className="w-20 h-20 text-yellow-500 mx-auto mb-5" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Nickname Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Find your perfect alter ego!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl"
        >
          <div className="mb-6">
            <Label htmlFor="name-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your name (optional):
            </Label>
            <Input
              id="name-input"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g., Alex"
              className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          
          <Button onClick={generateNickname} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-3 mb-6">
            <RefreshCw className="w-5 h-5 mr-2" /> Generate Nickname
          </Button>

          {generatedNickname && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your New Nickname:</Label>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 my-3 p-4 bg-yellow-50 dark:bg-gray-700/50 rounded-lg">
                {generatedNickname}
              </div>
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="w-4 h-4 mr-2" /> Copy Nickname
              </Button>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-md text-center text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Find Your Unique Identity</h2>
          <p>
            Whether for gaming, social media, or just for fun, a good nickname can make you stand out. This tool combines adjectives, nouns, and parts of your name (if provided) to create unique suggestions.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default NicknameGenerator;
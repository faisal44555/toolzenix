import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Users, Play, Trash2, RotateCcw, CheckCircle2, ListPlus } from 'lucide-react';

const NamePickerGame = () => {
  const [namesInput, setNamesInput] = useState('');
  const [namesList, setNamesList] = useState([]);
  const [pickedName, setPickedName] = useState(null);
  const [isPicking, setIsPicking] = useState(false);
  const [tempNamesDisplay, setTempNamesDisplay] = useState([]); // For animation
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setNamesInput(e.target.value);
  };

  const addNamesToList = () => {
    const newNames = namesInput.split(/[\n,]+/).map(name => name.trim()).filter(name => name);
    if (newNames.length === 0) {
      toast({ title: 'No Names Entered', description: 'Please enter some names to add.', variant: 'destructive' });
      return;
    }
    setNamesList(prev => [...new Set([...prev, ...newNames])]); // Add unique names
    setNamesInput('');
    toast({ title: 'Names Added!', description: `${newNames.length} name(s) added to the list.` });
  };

  const pickRandomName = () => {
    if (namesList.length === 0) {
      toast({ title: 'List Empty', description: 'Please add names to the list first.', variant: 'destructive' });
      return;
    }
    setIsPicking(true);
    setPickedName(null);

    let animationInterval;
    let animationDuration = 0;
    const totalAnimationTime = 2000; // 2 seconds

    animationInterval = setInterval(() => {
      const shuffled = [...namesList].sort(() => 0.5 - Math.random());
      setTempNamesDisplay(shuffled.slice(0, 1)); // Show one random name during animation
      animationDuration += 100;
      if (animationDuration >= totalAnimationTime) {
        clearInterval(animationInterval);
        const randomIndex = Math.floor(Math.random() * namesList.length);
        const winner = namesList[randomIndex];
        setPickedName(winner);
        setIsPicking(false);
        setTempNamesDisplay([]);
        toast({ title: 'And the winner is...', description: winner, action: <CheckCircle2 className="text-green-500" /> });
      }
    }, 100);
  };
  
  const removeName = (nameToRemove) => {
    setNamesList(prev => prev.filter(name => name !== nameToRemove));
    toast({ title: 'Name Removed', description: `${nameToRemove} has been removed from the list.` });
  };

  const clearList = () => {
    setNamesList([]);
    setPickedName(null);
    setNamesInput('');
    toast({ title: 'List Cleared', description: 'All names have been removed.' });
  };

  return (
    <>
      <Helmet>
        <title>Name Picker Game | Toolzenix</title>
        <meta name="description" content="Randomly pick a name from a list. Perfect for giveaways, choosing teams, or making random selections." />
        <link rel="canonical" href="https://toolzenix.com/name-picker-game" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Users className="w-16 h-16 text-teal-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Name Picker Game
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Randomly select a name from your list.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl"
          >
            <Label htmlFor="names-input" className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 block">
              Enter Names (one per line or comma-separated)
            </Label>
            <Textarea
              id="names-input"
              value={namesInput}
              onChange={handleInputChange}
              placeholder="Alice, Bob, Charlie..."
              className="min-h-[150px] mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Button onClick={addNamesToList} className="w-full bg-teal-600 hover:bg-teal-700 text-white mb-4">
              <ListPlus className="w-5 h-5 mr-2" /> Add Names to List
            </Button>

            {namesList.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">Current List ({namesList.length} names):</h3>
                <div className="max-h-60 overflow-y-auto p-2 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700/50 mb-4">
                  {namesList.map((name, index) => (
                    <div key={index} className="flex justify-between items-center p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                      <span className="text-sm">{name}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeName(name)} className="text-red-500 hover:text-red-700 p-1 h-auto">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button onClick={clearList} variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/30">
                  <Trash2 className="w-4 h-4 mr-2" /> Clear Entire List
                </Button>
              </>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center justify-center"
          >
            <div className="w-full h-48 sm:h-64 border-4 border-dashed border-teal-300 dark:border-teal-700 rounded-lg flex items-center justify-center mb-6 bg-teal-50 dark:bg-gray-700/50">
              <AnimatePresence mode="wait">
                {isPicking && tempNamesDisplay.length > 0 && (
                  <motion.p
                    key={tempNamesDisplay[0]}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.05 }}
                    className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400"
                  >
                    {tempNamesDisplay[0]}
                  </motion.p>
                )}
                {!isPicking && pickedName && (
                  <motion.p
                    key={pickedName + "-result"}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl sm:text-5xl font-bold text-teal-500 dark:text-teal-300 p-4"
                  >
                    {pickedName}!
                  </motion.p>
                )}
                {!isPicking && !pickedName && (
                  <p className="text-xl text-gray-500 dark:text-gray-400">Click "Pick a Name" to start!</p>
                )}
              </AnimatePresence>
            </div>
            <Button 
              onClick={pickRandomName} 
              disabled={isPicking || namesList.length === 0}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white text-lg py-4"
            >
              {isPicking ? <RotateCcw className="w-5 h-5 mr-2 animate-spin" /> : <Play className="w-5 h-5 mr-2" />}
              {isPicking ? 'Picking...' : 'Pick a Name!'}
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NamePickerGame;
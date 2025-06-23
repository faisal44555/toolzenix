import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ClipboardList, PlusCircle, MinusCircle, Trash2, UserPlus, Users, Edit3, Save, X } from 'lucide-react';

const ScoreboardTool = () => {
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem('scoreboardPlayers');
    return savedPlayers ? JSON.parse(savedPlayers) : [{ id: Date.now(), name: 'Player 1', score: 0, isEditing: false }];
  });
  const [newPlayerName, setNewPlayerName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('scoreboardPlayers', JSON.stringify(players));
  }, [players]);

  const addPlayer = () => {
    if (!newPlayerName.trim()) {
      toast({ title: 'Error', description: 'Player name cannot be empty.', variant: 'destructive' });
      return;
    }
    if (players.length >= 10) {
        toast({ title: 'Limit Reached', description: 'Maximum of 10 players allowed.', variant: 'destructive' });
        return;
    }
    setPlayers([...players, { id: Date.now(), name: newPlayerName, score: 0, isEditing: false }]);
    setNewPlayerName('');
    toast({ title: 'Player Added', description: `${newPlayerName} has been added to the scoreboard.` });
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
    toast({ title: 'Player Removed', description: 'Player has been removed from the scoreboard.' });
  };

  const updateScore = (id, amount) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, score: Math.max(0, player.score + amount) } : player
    ));
  };
  
  const toggleEditName = (id) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, isEditing: !player.isEditing, tempName: player.name } : { ...player, isEditing: false }
    ));
  };

  const handleNameChange = (id, newName) => {
     setPlayers(players.map(player =>
      player.id === id ? { ...player, tempName: newName } : player
    ));
  };

  const saveNameChange = (id) => {
    setPlayers(players.map(player => {
      if (player.id === id) {
        if (!player.tempName || !player.tempName.trim()) {
          toast({ title: 'Error', description: 'Player name cannot be empty.', variant: 'destructive' });
          return { ...player, isEditing: false, tempName: undefined }; // Revert to original name if empty
        }
        return { ...player, name: player.tempName, isEditing: false, tempName: undefined };
      }
      return player;
    }));
  };


  const resetAllScores = () => {
    setPlayers(players.map(player => ({ ...player, score: 0 })));
    toast({ title: 'Scores Reset', description: 'All player scores have been reset to 0.' });
  };

  return (
    <>
      <Helmet>
        <title>Scoreboard Tool | Toolzenix</title>
        <meta name="description" content="Keep track of scores for your games with this easy-to-use online scoreboard. Add players, update scores, and manage your game." />
        <link rel="canonical" href="https://toolzenix.com/scoreboard-tool" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <ClipboardList className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Scoreboard Tool</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Keep track of scores for any game!</p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl">
          <div className="mb-6 flex gap-2">
            <Input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter new player name"
              className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600"
              onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
            />
            <Button onClick={addPlayer} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <UserPlus className="w-4 h-4 mr-2" /> Add Player
            </Button>
          </div>

          <AnimatePresence>
            {players.length === 0 && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center text-gray-500 dark:text-gray-400 py-4"
              >
                No players yet. Add some to start!
              </motion.p>
            )}
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 mb-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-sm"
              >
                {player.isEditing ? (
                  <Input 
                    type="text" 
                    value={player.tempName || ''} 
                    onChange={(e) => handleNameChange(player.id, e.target.value)}
                    className="flex-grow mr-2 dark:bg-gray-600 dark:text-white"
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && saveNameChange(player.id)}
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-800 dark:text-gray-200 flex-grow truncate" title={player.name}>
                    {player.name}
                  </span>
                )}
                
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {player.isEditing ? (
                    <>
                      <Button size="icon" variant="ghost" onClick={() => saveNameChange(player.id)} className="text-green-500 hover:text-green-600"><Save size={18}/></Button>
                      <Button size="icon" variant="ghost" onClick={() => toggleEditName(player.id)} className="text-gray-500 hover:text-gray-600"><X size={18}/></Button>
                    </>
                  ) : (
                     <Button size="icon" variant="ghost" onClick={() => toggleEditName(player.id)} className="text-gray-500 hover:text-gray-600"><Edit3 size={16}/></Button>
                  )}
                  <Button size="icon" variant="ghost" onClick={() => updateScore(player.id, -1)} className="text-red-500 hover:text-red-600" disabled={player.score === 0}><MinusCircle size={18}/></Button>
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 w-10 text-center">{player.score}</span>
                  <Button size="icon" variant="ghost" onClick={() => updateScore(player.id, 1)} className="text-green-500 hover:text-green-600"><PlusCircle size={18}/></Button>
                  <Button size="icon" variant="ghost" onClick={() => removePlayer(player.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {players.length > 0 && (
            <Button onClick={resetAllScores} variant="outline" className="w-full mt-6">
              Reset All Scores
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ScoreboardTool;
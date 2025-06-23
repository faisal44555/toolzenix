import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Puzzle, RotateCcw, Check, Lightbulb, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const emptyGrid = () => Array(9).fill(null).map(() => Array(9).fill(0));

const simplePuzzles = {
  easy: [
    {
      puzzle: [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
      ],
      solution: [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
      ]
    }
  ],
  medium: [
    {
      puzzle: [
        [0,0,0,2,6,0,7,0,1],
        [6,8,0,0,7,0,0,9,0],
        [1,9,0,0,0,4,5,0,0],
        [8,2,0,1,0,0,0,4,0],
        [0,0,4,6,0,2,9,0,0],
        [0,5,0,0,0,3,0,2,8],
        [0,0,9,3,0,0,0,7,4],
        [0,4,0,0,5,0,0,3,6],
        [7,0,3,0,1,8,0,0,0]
      ],
      solution: [
        [4,3,5,2,6,9,7,8,1],
        [6,8,2,5,7,1,4,9,3],
        [1,9,7,8,3,4,5,6,2],
        [8,2,6,1,9,7,3,4,5],
        [3,7,4,6,8,2,9,1,0],
        [9,5,1,4,0,3,6,2,8],
        [5,1,9,3,2,6,8,7,4],
        [2,4,8,0,5,7,1,3,6],
        [7,6,3,9,1,8,2,5,0]
      ]
    }
  ],
  hard: [
     {
      puzzle: [
        [0,2,0,0,0,0,0,0,0],
        [0,0,0,6,0,0,0,0,3],
        [0,7,4,0,8,0,0,0,0],
        [0,0,0,0,0,3,0,0,2],
        [0,8,0,0,4,0,0,1,0],
        [6,0,0,5,0,0,0,0,0],
        [0,0,0,0,1,0,7,8,0],
        [5,0,0,0,0,9,0,0,0],
        [0,0,0,0,0,0,0,4,0]
      ],
      solution: [
        [1,2,6,4,3,7,9,5,8],
        [8,9,5,6,2,1,4,7,3],
        [3,7,4,9,8,5,1,2,6],
        [4,5,7,1,9,3,8,6,2],
        [9,8,3,2,4,6,5,1,7],
        [6,1,2,5,7,8,3,9,4],
        [2,6,9,3,1,4,7,8,5],
        [5,4,8,7,6,9,2,3,1],
        [7,3,1,8,5,2,6,4,9]
      ]
    }
  ]
};
simplePuzzles.expert = simplePuzzles.hard; // For now, expert uses hard puzzles

const SudokuGenerator = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [puzzleGrid, setPuzzleGrid] = useState(emptyGrid());
  const [solutionGrid, setSolutionGrid] = useState(emptyGrid());
  const [userBoard, setUserBoard] = useState(emptyGrid());
  const [isSolved, setIsSolved] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const { toast } = useToast();

  const generateNewPuzzle = useCallback((level) => {
    try {
      const puzzlesForLevel = simplePuzzles[level] || simplePuzzles.easy;
      const randomIndex = Math.floor(Math.random() * puzzlesForLevel.length);
      const { puzzle, solution } = puzzlesForLevel[randomIndex];

      const deepCopyPuzzle = JSON.parse(JSON.stringify(puzzle));
      const deepCopySolution = JSON.parse(JSON.stringify(solution));
      
      setPuzzleGrid(deepCopyPuzzle);
      setSolutionGrid(deepCopySolution);
      setUserBoard(JSON.parse(JSON.stringify(deepCopyPuzzle))); // Make a deep copy for user board
      setIsSolved(false);
      setShowSolution(false);
      toast({ title: 'New Puzzle Generated!', description: `Difficulty: ${level}` });
    } catch (error) {
      console.error("Error generating Sudoku:", error);
      toast({ title: 'Error Generating Puzzle', description: 'Could not generate a new puzzle. Please try again.', variant: 'destructive' });
    }
  }, [toast]);

  useEffect(() => {
    generateNewPuzzle(difficulty);
  }, [difficulty, generateNewPuzzle]);

  const handleInputChange = (row, col, value) => {
    if (showSolution) return;
    const numValue = value === '' ? 0 : parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 9) return;

    const newUserBoard = userBoard.map((r, rIndex) =>
      r.map((cell, cIndex) => (rIndex === row && cIndex === col ? numValue : cell))
    );
    setUserBoard(newUserBoard);
    setIsSolved(false); // Reset solved status on input change
  };

  const checkSolution = () => {
    if (!solutionGrid || !userBoard) return;
    let correct = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (userBoard[i][j] !== solutionGrid[i][j]) {
          correct = false;
          break;
        }
      }
      if (!correct) break;
    }
    setIsSolved(correct);
    toast({
      title: correct ? 'Congratulations!' : 'Incorrect Solution',
      description: correct ? 'You solved the Sudoku!' : 'Keep trying, some numbers are wrong.',
      variant: correct ? 'default' : 'destructive',
    });
  };

  const revealSolution = () => {
    if (!solutionGrid) return;
    setUserBoard(JSON.parse(JSON.stringify(solutionGrid))); // Deep copy solution
    setShowSolution(true);
    setIsSolved(true);
    toast({ title: 'Solution Revealed', description: 'The correct solution is now displayed.' });
  };
  
  const hideSolution = () => {
    if (!puzzleGrid) return;
    setUserBoard(JSON.parse(JSON.stringify(puzzleGrid))); // Deep copy original puzzle
    setShowSolution(false);
    setIsSolved(false);
  };

  const getCellClasses = (value, row, col) => {
    let classes = "aspect-square w-full h-full text-center text-lg sm:text-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 ";
    if (puzzleGrid && puzzleGrid[row] && puzzleGrid[row][col] !== 0) {
      classes += "bg-gray-100 dark:bg-gray-700 font-bold text-gray-700 dark:text-gray-300";
    } else {
      classes += "bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-300";
    }
    if (showSolution && userBoard && userBoard[row] && puzzleGrid && puzzleGrid[row] && userBoard[row][col] !== puzzleGrid[row][col] && solutionGrid && solutionGrid[row] && userBoard[row][col] === solutionGrid[row][col]) {
        classes += " text-blue-500 dark:text-blue-400 font-bold";
    }
    return classes;
  };
  
  const getGridLineClasses = (index, type) => {
    if ((index + 1) % 3 === 0 && index < 8) {
      return type === 'col' ? 'border-r-2 border-r-gray-500 dark:border-r-gray-400' : 'border-b-2 border-b-gray-500 dark:border-b-gray-400';
    }
    return '';
  };

  if (!userBoard || !userBoard[0]) return <div className="text-center py-10">Loading Sudoku...</div>;


  return (
    <>
      <Helmet>
        <title>Sudoku Generator & Player | Toolzenix</title>
        <meta name="description" content="Generate and play Sudoku puzzles of various difficulty levels. Challenge your logic and enjoy this classic number game." />
        <link rel="canonical" href="https://toolzenix.com/sudoku-generator" />
      </Helmet>
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8">
          <Puzzle className="w-12 h-12 sm:w-16 sm:h-16 text-teal-500 mx-auto mb-3 sm:mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 dark:text-white">Sudoku Puzzle</h1>
          <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">Challenge your mind with a new puzzle!</p>
        </motion.div>

        <div className="w-full max-w-md mb-6 sm:mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Label htmlFor="difficulty-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty:</Label>
          <Select value={difficulty} onValueChange={(val) => { setDifficulty(val); }}>
            <SelectTrigger id="difficulty-select" className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-9 w-full max-w-md aspect-square border-2 border-gray-500 dark:border-gray-400 rounded-md shadow-xl bg-white dark:bg-gray-800"
        >
          {userBoard.map((row, rIndex) =>
            row.map((cell, cIndex) => (
              <input
                key={`${rIndex}-${cIndex}`}
                type="number"
                min="1"
                max="9"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleInputChange(rIndex, cIndex, e.target.value)}
                readOnly={(puzzleGrid && puzzleGrid[rIndex] && puzzleGrid[rIndex][cIndex] !== 0) || showSolution}
                className={`${getCellClasses(cell, rIndex, cIndex)} ${getGridLineClasses(cIndex, 'col')} ${getGridLineClasses(rIndex, 'row')}`}
                aria-label={`Cell R${rIndex+1}C${cIndex+1}`}
              />
            ))
          )}
        </motion.div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
          <Button onClick={checkSolution} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
            <Check className="w-5 h-5 mr-2" /> Check Solution
          </Button>
          {showSolution ? (
            <Button onClick={hideSolution} variant="outline" className="flex-1">
              <EyeOff className="w-5 h-5 mr-2" /> Hide Solution
            </Button>
          ) : (
            <Button onClick={revealSolution} variant="outline" className="flex-1">
              <Lightbulb className="w-5 h-5 mr-2" /> Show Solution
            </Button>
          )}
          <Button onClick={() => generateNewPuzzle(difficulty)} variant="outline" className="flex-1">
            <RotateCcw className="w-5 h-5 mr-2" /> New Puzzle
          </Button>
        </div>
        {isSolved && !showSolution && (
            <motion.p initial={{opacity:0}} animate={{opacity:1}} className="mt-4 text-green-600 dark:text-green-400 font-semibold">
                Puzzle Solved Correctly!
            </motion.p>
        )}
      </div>
    </>
  );
};

export default SudokuGenerator;
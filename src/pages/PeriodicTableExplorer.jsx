import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Atom, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const elementsData = [
  { number: 1, symbol: 'H', name: 'Hydrogen', mass: 1.008, category: 'nonmetal', x: 1, y: 1, color: 'bg-green-200 dark:bg-green-700', textColor: 'text-green-800 dark:text-green-100' },
  { number: 2, symbol: 'He', name: 'Helium', mass: 4.0026, category: 'noble-gas', x: 18, y: 1, color: 'bg-purple-200 dark:bg-purple-700', textColor: 'text-purple-800 dark:text-purple-100' },
  { number: 3, symbol: 'Li', name: 'Lithium', mass: 6.94, category: 'alkali-metal', x: 1, y: 2, color: 'bg-red-200 dark:bg-red-700', textColor: 'text-red-800 dark:text-red-100' },
  { number: 4, symbol: 'Be', name: 'Beryllium', mass: 9.0122, category: 'alkaline-earth-metal', x: 2, y: 2, color: 'bg-orange-200 dark:bg-orange-700', textColor: 'text-orange-800 dark:text-orange-100' },
  { number: 5, symbol: 'B', name: 'Boron', mass: 10.81, category: 'metalloid', x: 13, y: 2, color: 'bg-yellow-200 dark:bg-yellow-700', textColor: 'text-yellow-800 dark:text-yellow-100' },
  { number: 6, symbol: 'C', name: 'Carbon', mass: 12.011, category: 'nonmetal', x: 14, y: 2, color: 'bg-green-200 dark:bg-green-700', textColor: 'text-green-800 dark:text-green-100' },
  { number: 7, symbol: 'N', name: 'Nitrogen', mass: 14.007, category: 'nonmetal', x: 15, y: 2, color: 'bg-green-200 dark:bg-green-700', textColor: 'text-green-800 dark:text-green-100' },
  { number: 8, symbol: 'O', name: 'Oxygen', mass: 15.999, category: 'nonmetal', x: 16, y: 2, color: 'bg-green-200 dark:bg-green-700', textColor: 'text-green-800 dark:text-green-100' },
  { number: 9, symbol: 'F', name: 'Fluorine', mass: 18.998, category: 'halogen', x: 17, y: 2, color: 'bg-teal-200 dark:bg-teal-700', textColor: 'text-teal-800 dark:text-teal-100' },
  { number: 10, symbol: 'Ne', name: 'Neon', mass: 20.180, category: 'noble-gas', x: 18, y: 2, color: 'bg-purple-200 dark:bg-purple-700', textColor: 'text-purple-800 dark:text-purple-100' },
  { number: 11, symbol: 'Na', name: 'Sodium', mass: 22.990, category: 'alkali-metal', x: 1, y: 3, color: 'bg-red-200 dark:bg-red-700', textColor: 'text-red-800 dark:text-red-100' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', mass: 24.305, category: 'alkaline-earth-metal', x: 2, y: 3, color: 'bg-orange-200 dark:bg-orange-700', textColor: 'text-orange-800 dark:text-orange-100' },
  { number: 13, symbol: 'Al', name: 'Aluminum', mass: 26.982, category: 'post-transition-metal', x: 13, y: 3, color: 'bg-blue-200 dark:bg-blue-700', textColor: 'text-blue-800 dark:text-blue-100' },
  { number: 14, symbol: 'Si', name: 'Silicon', mass: 28.085, category: 'metalloid', x: 14, y: 3, color: 'bg-yellow-200 dark:bg-yellow-700', textColor: 'text-yellow-800 dark:text-yellow-100' },
  { number: 15, symbol: 'P', name: 'Phosphorus', mass: 30.974, category: 'nonmetal', x: 15, y: 3, color: 'bg-green-200 dark:bg-green-700', textColor: 'text-green-800 dark:text-green-100' },
  { number: 16, symbol: 'S', name: 'Sulfur', mass: 32.06, category: 'nonmetal', x: 16, y: 3, color: 'bg-green-200 dark:bg-green-700', textColor: 'text-green-800 dark:text-green-100' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', mass: 35.45, category: 'halogen', x: 17, y: 3, color: 'bg-teal-200 dark:bg-teal-700', textColor: 'text-teal-800 dark:text-teal-100' },
  { number: 18, symbol: 'Ar', name: 'Argon', mass: 39.948, category: 'noble-gas', x: 18, y: 3, color: 'bg-purple-200 dark:bg-purple-700', textColor: 'text-purple-800 dark:text-purple-100' },
];

const categoryColors = {
  'nonmetal': 'bg-green-200 dark:bg-green-700',
  'noble-gas': 'bg-purple-200 dark:bg-purple-700',
  'alkali-metal': 'bg-red-200 dark:bg-red-700',
  'alkaline-earth-metal': 'bg-orange-200 dark:bg-orange-700',
  'metalloid': 'bg-yellow-200 dark:bg-yellow-700',
  'halogen': 'bg-teal-200 dark:bg-teal-700',
  'post-transition-metal': 'bg-blue-200 dark:bg-blue-700',
  'transition-metal': 'bg-pink-200 dark:bg-pink-700',
  'lanthanide': 'bg-indigo-200 dark:bg-indigo-700',
  'actinide': 'bg-rose-200 dark:bg-rose-700',
};

const categoryTextColors = {
    'nonmetal': 'text-green-800 dark:text-green-100',
    'noble-gas': 'text-purple-800 dark:text-purple-100',
    'alkali-metal': 'text-red-800 dark:text-red-100',
    'alkaline-earth-metal': 'text-orange-800 dark:text-orange-100',
    'metalloid': 'text-yellow-800 dark:text-yellow-100',
    'halogen': 'text-teal-800 dark:text-teal-100',
    'post-transition-metal': 'text-blue-800 dark:text-blue-100',
    'transition-metal': 'text-pink-800 dark:text-pink-100',
    'lanthanide': 'text-indigo-800 dark:text-indigo-100',
    'actinide': 'text-rose-800 dark:text-rose-100',
}


const PeriodicTableExplorer = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  const elementsToDisplay = useMemo(() => {
    // Add more elements or a full dataset later. For now, use the initial 18.
    // For a full table, you would map all 118 elements here.
    return elementsData;
  }, []);

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const closeModal = () => {
    setSelectedElement(null);
  };
  
  const formatCategoryName = (category) => {
    return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <>
      <Helmet>
        <title>Interactive Periodic Table Explorer | Toolzenix</title>
        <meta name="description" content="Explore the periodic table of elements. Click on an element to see its atomic number, symbol, name, mass, and category." />
        <link rel="canonical" href="https://toolzenix.com/periodic-table-explorer" />
      </Helmet>
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <Atom className="w-12 h-12 sm:w-16 sm:h-16 text-sky-500 mx-auto mb-3 sm:mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Periodic Table Explorer
          </h1>
          <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Click on an element to view its details. (Showing first 18 elements)
          </p>
        </motion.div>

        <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-0.5 sm:gap-1 mx-auto max-w-fit p-1 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-md shadow-lg">
          {elementsToDisplay.map((el) => (
            <motion.div
              key={el.number}
              onClick={() => handleElementClick(el)}
              className={`p-0.5 sm:p-1 aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-sky-500 hover:z-10 rounded-sm
                ${el.color || 'bg-gray-200 dark:bg-gray-600'} 
                ${el.textColor || 'text-gray-800 dark:text-gray-100'}`}
              style={{ gridColumnStart: el.x, gridRowStart: el.y }}
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
              layoutId={`element-${el.symbol}`}
            >
              <div className="text-[0.5rem] sm:text-xs font-medium">{el.number}</div>
              <div className="text-xs sm:text-lg font-bold">{el.symbol}</div>
              <div className="hidden sm:block text-[0.4rem] sm:text-[0.6rem] truncate w-full text-center">{el.name}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 sm:mt-8 max-w-3xl mx-auto p-2 sm:p-4 bg-white dark:bg-gray-800/50 rounded-lg shadow">
            <h3 className="text-sm sm:text-md font-semibold text-center mb-2 text-gray-700 dark:text-gray-300">Legend</h3>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {Object.entries(categoryColors).map(([category, colorClass]) => (
                    <div key={category} className="flex items-center">
                        <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-xs mr-1 ${colorClass}`}></div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{formatCategoryName(category)}</span>
                    </div>
                ))}
            </div>
        </div>


        {selectedElement && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              layoutId={`element-${selectedElement.symbol}`}
              onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
              className={`p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm
                ${selectedElement.color} ${selectedElement.textColor}
                border-4 ${selectedElement.textColor.replace('text-', 'border-')}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold">{selectedElement.name} ({selectedElement.symbol})</h2>
                  <p className="text-lg sm:text-xl">Atomic Number: {selectedElement.number}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={closeModal} className={`hover:bg-white/20 ${selectedElement.textColor}`}>
                  <X />
                </Button>
              </div>
              <div className="space-y-2 text-md sm:text-lg">
                <p><strong>Atomic Mass:</strong> {selectedElement.mass.toFixed(3)}</p>
                <p><strong>Category:</strong> <span className="capitalize">{formatCategoryName(selectedElement.category)}</span></p>
                <p><strong>Position:</strong> Group {selectedElement.x}, Period {selectedElement.y}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-10 prose dark:prose-invert max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">About the Periodic Table</h2>
          <p>
            The periodic table is a tabular arrangement of the chemical elements, ordered by their atomic number, electron configuration, and recurring chemical properties. Elements are presented in order of increasing atomic number.
          </p>
          <p>
            This interactive explorer currently shows a subset of elements. Click on any element to see more details about it. The colors represent different element categories.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default PeriodicTableExplorer;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Globe2, Scale, CheckCircle2, AlertTriangle } from 'lucide-react';

const surfaceGravityFactors = { // Relative to Earth's gravity (9.81 m/s²)
  Mercury: 0.38, Venus: 0.91, Earth: 1.00, Mars: 0.38, Jupiter: 2.34,
  Saturn: 0.93, Uranus: 0.92, Neptune: 1.12, Pluto: 0.06, Moon: 0.166, Sun: 27.9
};

const PlanetWeightCalculator = () => {
  const [earthWeight, setEarthWeight] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState('Mars');
  const [planetWeight, setPlanetWeight] = useState(null);
  const [unit, setUnit] = useState('kg'); // 'kg' or 'lbs'
  const { toast } = useToast();

  const calculatePlanetWeight = () => {
    const weight = parseFloat(earthWeight);
    if (isNaN(weight) || weight <= 0) {
      toast({ title: 'Invalid Input', description: 'Please enter a valid positive weight.', variant: 'destructive', action: <AlertTriangle/> });
      setPlanetWeight(null);
      return;
    }

    const factor = surfaceGravityFactors[selectedPlanet];
    const newWeight = weight * factor;
    setPlanetWeight(newWeight.toFixed(2));
    toast({ title: 'Calculation Complete!', action: <CheckCircle2 className="text-green-500"/> });
  };

  return (
    <>
      <Helmet>
        <title>Planet Weight Calculator | Toolzenix</title>
        <meta name="description" content="Find out how much you would weigh on other planets, the Moon, or the Sun based on your weight on Earth." />
        <link rel="canonical" href="https://toolzenix.com/planet-weight-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Globe2 className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Planet Weight Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Discover your weight on different celestial bodies!
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="earth-weight" className="text-md font-medium text-gray-700 dark:text-gray-300">Your Weight on Earth</Label>
              <Input
                id="earth-weight"
                type="number"
                value={earthWeight}
                onChange={(e) => setEarthWeight(e.target.value)}
                placeholder="e.g., 70"
                className="mt-1 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <div>
              <Label htmlFor="unit-select" className="text-md font-medium text-gray-700 dark:text-gray-300">Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id="unit-select" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-lg p-3 h-auto">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:text-white">
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="planet-select" className="text-md font-medium text-gray-700 dark:text-gray-300">Select Celestial Body</Label>
            <Select value={selectedPlanet} onValueChange={setSelectedPlanet}>
              <SelectTrigger id="planet-select" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-lg p-3 h-auto">
                <SelectValue placeholder="Select a planet" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                {Object.keys(surfaceGravityFactors).map(planet => (
                  <SelectItem key={planet} value={planet}>{planet}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={calculatePlanetWeight} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg py-3">
            <Scale className="w-5 h-5 mr-2" /> Calculate Weight
          </Button>

          {planetWeight !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Your weight on {selectedPlanet} would be approximately:
              </h2>
              <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                {planetWeight} {unit}
              </p>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-lg mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">How is This Calculated?</h2>
          <p>
            Your weight is a measure of the gravitational force acting on your mass. Different planets and celestial bodies have different masses and sizes, resulting in different gravitational pulls at their surfaces.
          </p>
          <p>
            This calculator uses the surface gravity of each celestial body relative to Earth's gravity. It multiplies your Earth weight by this factor to estimate your weight elsewhere. For example, if a planet has a gravity factor of 0.5, you would weigh half as much there.
          </p>
          <p>Remember, your mass remains the same no matter where you are in the universe!</p>
        </motion.div>
      </div>
    </>
  );
};

export default PlanetWeightCalculator;
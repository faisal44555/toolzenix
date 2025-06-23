import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Sigma, Calculator, CheckCircle2, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const formulas = {
  newtonsSecondLaw: {
    name: "Newton's Second Law (F=ma)",
    variables: { force: 'N', mass: 'kg', acceleration: 'm/s²' },
    calculate: (vars) => {
      const { force, mass, acceleration } = vars;
      if (mass !== undefined && acceleration !== undefined) return { force: mass * acceleration };
      if (force !== undefined && acceleration !== undefined && acceleration !== 0) return { mass: force / acceleration };
      if (force !== undefined && mass !== undefined && mass !== 0) return { acceleration: force / mass };
      return null;
    },
  },
  kineticEnergy: {
    name: "Kinetic Energy (KE = 0.5mv²)",
    variables: { kineticEnergy: 'J', mass: 'kg', velocity: 'm/s' },
    calculate: (vars) => {
      const { kineticEnergy, mass, velocity } = vars;
      if (mass !== undefined && velocity !== undefined) return { kineticEnergy: 0.5 * mass * velocity ** 2 };
      if (kineticEnergy !== undefined && velocity !== undefined && velocity !== 0) return { mass: (2 * kineticEnergy) / velocity ** 2 };
      if (kineticEnergy !== undefined && mass !== undefined && mass > 0) return { velocity: Math.sqrt((2 * kineticEnergy) / mass) };
      return null;
    },
  },
  potentialEnergy: {
    name: "Gravitational Potential Energy (PE = mgh)",
    variables: { potentialEnergy: 'J', mass: 'kg', height: 'm' },
    constants: { gravity: 9.81 }, 
    calculate: (vars, consts) => {
      const { potentialEnergy, mass, height } = vars;
      const { gravity } = consts;
      if (mass !== undefined && height !== undefined) return { potentialEnergy: mass * gravity * height };
      if (potentialEnergy !== undefined && height !== undefined && gravity !== 0 && height !== 0) return { mass: potentialEnergy / (gravity * height) };
      if (potentialEnergy !== undefined && mass !== undefined && gravity !== 0 && mass !== 0) return { height: potentialEnergy / (gravity * mass) };
      return null;
    },
  },
};

const PhysicsFormulaCalculator = () => {
  const [selectedFormulaKey, setSelectedFormulaKey] = useState('newtonsSecondLaw');
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const selectedFormula = formulas[selectedFormulaKey];

  const handleInputChange = (variable, value) => {
    setInputs(prev => ({ ...prev, [variable]: value === '' ? undefined : parseFloat(value) }));
    setResult(null); 
  };

  const calculate = () => {
    const knownValues = Object.entries(inputs).reduce((acc, [key, value]) => {
      if (value !== undefined && !isNaN(value)) acc[key] = value;
      return acc;
    }, {});
    
    const numberOfInputs = Object.keys(knownValues).length;
    const totalVariables = Object.keys(selectedFormula.variables).length;

    if (numberOfInputs !== totalVariables - 1) {
      toast({ title: 'Insufficient Data', description: `Please provide exactly ${totalVariables - 1} known values.`, variant: 'destructive', action: <AlertTriangle/> });
      setResult(null);
      return;
    }
    
    const calculatedResult = selectedFormula.calculate(knownValues, selectedFormula.constants || {});

    if (calculatedResult) {
      const resultKey = Object.keys(calculatedResult)[0];
      const resultValue = calculatedResult[resultKey];
      
      if (resultValue === undefined || isNaN(resultValue) || !isFinite(resultValue)) {
        toast({ title: 'Calculation Error', description: 'Result is undefined or infinite. Check for division by zero or invalid inputs (e.g., negative mass for velocity calculation).', variant: 'destructive', action: <AlertTriangle/>, duration: 7000 });
        setResult(null);
      } else {
        setResult({ variable: resultKey, value: resultValue.toPrecision(4) });
        toast({ title: 'Calculation Successful!', action: <CheckCircle2 className="text-green-500"/> });
      }
    } else {
      toast({ title: 'Calculation Error', description: 'Could not calculate with the provided values. Ensure inputs are valid for the formula.', variant: 'destructive', action: <AlertTriangle/>, duration: 7000 });
      setResult(null);
    }
  };
  
  const handleFormulaChange = (key) => {
    setSelectedFormulaKey(key);
    setInputs({});
    setResult(null);
  };

  return (
    <>
      <Helmet>
        <title>Physics Formula Calculator - Solve Equations | Toolzenix</title>
        <meta name="description" content="Solve common physics formulas for motion, force, and energy. Calculate F=ma, Kinetic Energy (KE), Potential Energy (PE), and more with specified units. Essential for students." />
        <link rel="canonical" href="https://toolzenix.com/physics-formula-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Sigma className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Physics Formula Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Solve for unknown variables in common physics formulas.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <Label htmlFor="formula-select" className="text-md font-medium text-gray-700 dark:text-gray-300">Select Formula:</Label>
            <Select value={selectedFormulaKey} onValueChange={handleFormulaChange}>
              <SelectTrigger id="formula-select" className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select a formula" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                {Object.entries(formulas).map(([key, formula]) => (
                  <SelectItem key={key} value={key}>{formula.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {Object.entries(selectedFormula.variables).map(([variable, unit]) => (
              <div key={variable}>
                <Label htmlFor={variable} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {variable.charAt(0).toUpperCase() + variable.slice(1)} ({unit})
                </Label>
                <Input
                  id={variable}
                  type="number"
                  step="any"
                  value={inputs[variable] === undefined ? '' : inputs[variable]}
                  onChange={(e) => handleInputChange(variable, e.target.value)}
                  placeholder={`Enter ${variable.toLowerCase()}`}
                  className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
            ))}
          </div>
          
          <Button onClick={calculate} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3">
            <Calculator className="w-5 h-5 mr-2" /> Calculate
          </Button>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Result</h2>
              <div className="text-xl text-center text-indigo-600 dark:text-indigo-400">
                <span className="font-semibold">{result.variable.charAt(0).toUpperCase() + result.variable.slice(1)}: </span>
                {result.value} {selectedFormula.variables[result.variable]}
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Master Physics Equations with Ease</h2>
          <p>
            This Physics Formula Calculator is designed to help students and enthusiasts solve common physics problems quickly and accurately. By selecting a formula and inputting the known variables, you can effortlessly find the unknown quantity.
          </p>
          <h3 className="text-xl font-semibold">How to Use:</h3>
          <ol className="list-disc list-inside space-y-1">
            <li><strong>Select Formula:</strong> Choose the physics equation you need from the dropdown menu.</li>
            <li><strong>Enter Knowns:</strong> Input the values for the variables you know. Make sure to use the units specified (e.g., kg for mass, m/s for velocity).</li>
            <li><strong>Calculate:</strong> Click the "Calculate" button. The tool will solve for the remaining variable.</li>
          </ol>
          <p>Units are crucial in physics! Ensure your inputs match the standard units shown next to each variable (e.g., Newtons (N), kilograms (kg), meters per second (m/s), Joules (J), meters (m)).</p>
          <h3 className="text-xl font-semibold">Currently Supported Formulas:</h3>
          <ul className="list-disc list-inside">
            <li><strong>Newton's Second Law:</strong> F = ma (Force = mass × acceleration)</li>
            <li><strong>Kinetic Energy:</strong> KE = 0.5 × m × v² (Kinetic Energy = 0.5 × mass × velocity squared)</li>
            <li><strong>Gravitational Potential Energy:</strong> PE = mgh (Potential Energy = mass × gravity × height). Gravity (g) is assumed to be 9.81 m/s².</li>
          </ul>
          <p>For more specialized calculations, check out our <Link to="/science-tools" className="text-indigo-600 dark:text-indigo-400 hover:underline">Science Tools</Link> category or specific calculators like the <Link to="/molar-mass-calculator" className="text-indigo-600 dark:text-indigo-400 hover:underline">Molar Mass Calculator</Link>.</p>
        </motion.div>
      </div>
    </>
  );
};

export default PhysicsFormulaCalculator;
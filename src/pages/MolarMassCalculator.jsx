import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { TestTube2, Calculator, AlertTriangle, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const atomicMasses = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
  Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
  Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
  Nb: 92.906, Mo: 95.96, Tc: 98, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71,
  Sb: 121.76, Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24,
  Pm: 145, Sm: 150.36, Eu: 151.96, Gd: 157.25, Tb: 158.93, Dy: 162.50, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05,
  Lu: 174.97, Hf: 178.49, Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59,
  Tl: 204.38, Pb: 207.2, Bi: 208.98, Po: 209, At: 210, Rn: 222, Fr: 223, Ra: 226, Ac: 227, Th: 232.04, Pa: 231.04, U: 238.03, Np: 237, Pu: 244, Am: 243, Cm: 247, Bk: 247, Cf: 251, Es: 252, Fm: 257, Md: 258, No: 259, Lr: 262
};

const parseFormula = (formula) => {
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  const elements = {};
  while ((match = regex.exec(formula)) !== null) {
    const element = match[1];
    const count = parseInt(match[2] || '1', 10);
    if (atomicMasses[element]) {
      elements[element] = (elements[element] || 0) + count;
    } else {
      throw new Error(`Unknown element: ${element}`);
    }
  }
  if (Object.keys(elements).length === 0 && formula.trim() !== "") {
    throw new Error("Invalid chemical formula format.");
  }
  return elements;
};

const MolarMassCalculator = () => {
  const [formula, setFormula] = useState('');
  const [molarMass, setMolarMass] = useState(null);
  const [calculationDetails, setCalculationDetails] = useState([]);
  const { toast } = useToast();

  const calculateMolarMass = () => {
    if (!formula.trim()) {
      toast({ title: 'Input Empty', description: 'Please enter a chemical formula.', variant: 'destructive' });
      setMolarMass(null);
      setCalculationDetails([]);
      return;
    }
    try {
      const parsedElements = parseFormula(formula);
      let totalMass = 0;
      const details = [];
      for (const [element, count] of Object.entries(parsedElements)) {
        const mass = atomicMasses[element] * count;
        totalMass += mass;
        details.push({ element, count, mass: atomicMasses[element], totalElementMass: mass });
      }
      setMolarMass(totalMass.toFixed(4));
      setCalculationDetails(details);
      toast({ title: 'Calculation Successful!', description: `Molar mass: ${totalMass.toFixed(4)} g/mol`, action: <CheckCircle2 className="text-green-500"/> });
    } catch (error) {
      toast({ title: 'Calculation Error', description: error.message, variant: 'destructive', action: <AlertTriangle className="text-red-500"/> });
      setMolarMass(null);
      setCalculationDetails([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Molar Mass Calculator (Molecular Weight) | Toolzenix</title>
        <meta name="description" content="Calculate the molar mass (molecular weight) of any chemical compound from its formula. Shows detailed breakdown of element contributions. Essential for chemistry students and professionals." />
        <link rel="canonical" href="https://toolzenix.com/molar-mass-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <TestTube2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Molar Mass Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Enter a chemical formula (e.g., H2O, C6H12O6) to calculate its molar mass.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <Label htmlFor="chemical-formula" className="text-lg font-medium text-gray-700 dark:text-gray-300">Chemical Formula</Label>
            <Input
              id="chemical-formula"
              type="text"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="e.g., NaCl or Fe2(SO4)3"
              className="mt-2 text-lg p-3 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <Button onClick={calculateMolarMass} className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3">
            <Calculator className="w-5 h-5 mr-2" /> Calculate Molar Mass
          </Button>

          {molarMass !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Result</h2>
              <div className="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
                {molarMass} g/mol
              </div>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Calculation Breakdown:</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {calculationDetails.map(detail => (
                  <li key={detail.element} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                    <span>{detail.element} × {detail.count}</span>
                    <span>({detail.mass.toFixed(4)} g/mol × {detail.count})</span>
                    <span>= {detail.totalElementMass.toFixed(4)} g/mol</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-lg mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Understanding Molar Mass</h2>
          <p>
            Molar mass (also known as molecular weight) is a fundamental concept in chemistry. It represents the mass of one mole of a substance (e.g., atoms, molecules, or ions), typically expressed in grams per mole (g/mol). Calculating molar mass is crucial for stoichiometry, solution preparation, and various chemical analyses.
          </p>
          <h3 className="text-xl font-semibold">How to Use This Calculator:</h3>
          <ol className="list-disc list-inside space-y-1">
            <li>Enter the chemical formula of the compound using standard element symbols (e.g., H, O, C).</li>
            <li>Use numbers after element symbols to indicate the count of that atom (e.g., H2O for water, C6H12O6 for glucose).</li>
            <li>Ensure correct capitalization (e.g., 'Co' for Cobalt, not 'co').</li>
            <li>Click "Calculate Molar Mass" to see the result and a detailed breakdown of each element's contribution.</li>
          </ol>
          <p><strong>Note:</strong> This calculator currently does not support parentheses in formulas directly. For compounds like Ca(OH)2, you would need to enter it as CaO2H2 by expanding the elements within the parentheses. For other scientific calculations, explore our <Link to="/science-tools" className="text-green-600 dark:text-green-400 hover:underline">Science Tools</Link> section, including the <Link to="/periodic-table-explorer" className="text-green-600 dark:text-green-400 hover:underline">Periodic Table Explorer</Link>.</p>
        </motion.div>
      </div>
    </>
  );
};

export default MolarMassCalculator;
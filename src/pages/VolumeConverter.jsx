import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Beaker, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const units = {
  l: { name: "Liter", factor: 1 },
  ml: { name: "Milliliter", factor: 0.001 },
  gal_us: { name: "Gallon (US)", factor: 3.78541 },
  gal_uk: { name: "Gallon (UK)", factor: 4.54609 },
  m3: { name: "Cubic Meter", factor: 1000 },
  ft3: { name: "Cubic Foot", factor: 28.3168 },
  in3: { name: "Cubic Inch", factor: 0.0163871 },
};

const VolumeConverter = () => {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("l");
  const [toUnit, setToUnit] = useState("gal_us");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (inputValue === "" || isNaN(parseFloat(inputValue))) {
      setResult("");
      return;
    }
    const valueInLiters = parseFloat(inputValue) * units[fromUnit].factor;
    const convertedValue = valueInLiters / units[toUnit].factor;
    setResult(convertedValue.toLocaleString(undefined, { maximumFractionDigits: 5 }));
  }, [inputValue, fromUnit, toUnit]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    toast({ title: "Units Swapped!", description: `${units[toUnit].name} is now the input unit.`});
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Beaker className="w-10 h-10 mr-3 text-purple-500" /> Volume Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Convert between various units of volume.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="inputValueVolume" className="text-gray-700 dark:text-gray-300">Value</Label>
            <Input
              id="inputValueVolume"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter volume"
              className="text-lg"
            />
          </div>
          <div>
            <Label htmlFor="fromUnitVolume" className="text-gray-700 dark:text-gray-300">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="fromUnitVolume" className="text-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>{unit.name} ({key.replace('_', ' ')})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center my-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={swapUnits}
            className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-md"
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="toUnitVolume" className="text-gray-700 dark:text-gray-300">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="toUnitVolume" className="text-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>{unit.name} ({key.replace('_', ' ')})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="resultVolume" className="text-gray-700 dark:text-gray-300">Result</Label>
            <Input
              id="resultVolume"
              type="text"
              value={result}
              readOnly
              placeholder="Conversion result"
              className="text-lg font-semibold bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>
        
        {result && inputValue && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 dark:text-gray-400 mt-6 text-lg"
          >
            {inputValue} {units[fromUnit].name} = {result} {units[toUnit].name}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default VolumeConverter;
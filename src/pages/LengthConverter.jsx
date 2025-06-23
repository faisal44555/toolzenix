import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ruler, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const units = {
  cm: { name: "Centimeter", factor: 0.01 },
  m: { name: "Meter", factor: 1 },
  km: { name: "Kilometer", factor: 1000 },
  in: { name: "Inch", factor: 0.0254 },
  ft: { name: "Foot", factor: 0.3048 },
  mi: { name: "Mile", factor: 1609.34 },
};

const LengthConverter = () => {
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (inputValue === "" || isNaN(parseFloat(inputValue))) {
      setResult("");
      return;
    }
    const valueInMeters = parseFloat(inputValue) * units[fromUnit].factor;
    const convertedValue = valueInMeters / units[toUnit].factor;
    setResult(convertedValue.toLocaleString(undefined, { maximumFractionDigits: 5 }));
  }, [inputValue, fromUnit, toUnit]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    // Optionally, swap input value with result if you want inverse conversion
    // if (result) setInputValue(result.replace(/,/g, '')); 
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
          <Ruler className="w-10 h-10 mr-3 text-sky-500" /> Length Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Convert between various units of length.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="inputValue" className="text-gray-700 dark:text-gray-300">Value</Label>
            <Input
              id="inputValue"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter length"
              className="text-lg"
            />
          </div>
          <div>
            <Label htmlFor="fromUnit" className="text-gray-700 dark:text-gray-300">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="fromUnit" className="text-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>{unit.name} ({key})</SelectItem>
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
            className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-md"
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="toUnit" className="text-gray-700 dark:text-gray-300">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="toUnit" className="text-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>{unit.name} ({key})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="result" className="text-gray-700 dark:text-gray-300">Result</Label>
            <Input
              id="result"
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

export default LengthConverter;
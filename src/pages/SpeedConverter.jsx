import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gauge, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const units = {
  kmh: { name: "Kilometers/hour", factor: 1 },
  mph: { name: "Miles/hour", factor: 0.621371 },
  ms: { name: "Meters/second", factor: 0.277778 },
  knot: { name: "Knots", factor: 0.539957 },
};

const SpeedConverter = () => {
  const [inputValue, setInputValue] = useState("100");
  const [fromUnit, setFromUnit] = useState("kmh");
  const [toUnit, setToUnit] = useState("mph");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (inputValue === "" || isNaN(parseFloat(inputValue))) {
      setResult("");
      return;
    }
    // Convert input to a base unit (km/h) then to target unit
    // This approach is simpler if all factors are relative to one base unit.
    // Here, factors are direct conversion from km/h.
    // So, convert input to km/h first:
    const valueInKmh = parseFloat(inputValue) / units[fromUnit].factor;
    // Then convert from km/h to the target unit:
    const convertedValue = valueInKmh * units[toUnit].factor;
    
    setResult(convertedValue.toLocaleString(undefined, { maximumFractionDigits: 3 }));
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
          <Gauge className="w-10 h-10 mr-3 text-yellow-500" /> Speed Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Convert between km/h, mph, m/s, and knots.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="inputValueSpeed" className="text-gray-700 dark:text-gray-300">Value</Label>
            <Input
              id="inputValueSpeed"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter speed"
              className="text-lg"
            />
          </div>
          <div>
            <Label htmlFor="fromUnitSpeed" className="text-gray-700 dark:text-gray-300">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="fromUnitSpeed" className="text-lg"><SelectValue /></SelectTrigger>
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
            className="p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-md"
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="toUnitSpeed" className="text-gray-700 dark:text-gray-300">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="toUnitSpeed" className="text-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>{unit.name} ({key})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="resultSpeed" className="text-gray-700 dark:text-gray-300">Result</Label>
            <Input
              id="resultSpeed"
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
            {inputValue} {units[fromUnit].name} ({units[fromUnit].name.split('/')[1] || units[fromUnit].name.split(' ')[1] || fromUnit}) = {result} {units[toUnit].name.split('/')[0] || units[toUnit].name.split(' ')[0]} ({units[toUnit].name.split('/')[1] || units[toUnit].name.split(' ')[1] || toUnit})
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default SpeedConverter;
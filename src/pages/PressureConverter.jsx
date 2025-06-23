import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wind, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const units = {
  Pa: { name: "Pascal", factor: 1 },
  kPa: { name: "Kilopascal", factor: 1000 },
  bar: { name: "Bar", factor: 100000 },
  psi: { name: "Pound-force/sq.inch (PSI)", factor: 6894.76 },
  atm: { name: "Atmosphere (standard)", factor: 101325 },
  mmHg: { name: "Millimeter of mercury (mmHg)", factor: 133.322 },
};

const PressureConverter = () => {
  const [inputValue, setInputValue] = useState("101325");
  const [fromUnit, setFromUnit] = useState("Pa");
  const [toUnit, setToUnit] = useState("atm");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (inputValue === "" || isNaN(parseFloat(inputValue))) {
      setResult("");
      return;
    }
    const valueInPascals = parseFloat(inputValue) * units[fromUnit].factor;
    const convertedValue = valueInPascals / units[toUnit].factor;
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
          <Wind className="w-10 h-10 mr-3 text-rose-500" /> Pressure Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Convert between various units of pressure.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="inputValuePressure" className="text-gray-700 dark:text-gray-300">Value</Label>
            <Input
              id="inputValuePressure"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter pressure"
              className="text-lg"
            />
          </div>
          <div>
            <Label htmlFor="fromUnitPressure" className="text-gray-700 dark:text-gray-300">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="fromUnitPressure" className="text-lg"><SelectValue /></SelectTrigger>
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
            className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-md"
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="toUnitPressure" className="text-gray-700 dark:text-gray-300">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="toUnitPressure" className="text-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>{unit.name} ({key})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="resultPressure" className="text-gray-700 dark:text-gray-300">Result</Label>
            <Input
              id="resultPressure"
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

export default PressureConverter;
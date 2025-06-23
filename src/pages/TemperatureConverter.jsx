import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const units = ["Celsius", "Fahrenheit", "Kelvin"];

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState("0");
  const [fromUnit, setFromUnit] = useState("Celsius");
  const [toUnit, setToUnit] = useState("Fahrenheit");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (inputValue === "" || isNaN(parseFloat(inputValue))) {
      setResult("");
      return;
    }
    const value = parseFloat(inputValue);
    let convertedValue;

    if (fromUnit === toUnit) {
      convertedValue = value;
    } else if (fromUnit === "Celsius") {
      if (toUnit === "Fahrenheit") convertedValue = (value * 9/5) + 32;
      else if (toUnit === "Kelvin") convertedValue = value + 273.15;
    } else if (fromUnit === "Fahrenheit") {
      if (toUnit === "Celsius") convertedValue = (value - 32) * 5/9;
      else if (toUnit === "Kelvin") convertedValue = (value - 32) * 5/9 + 273.15;
    } else if (fromUnit === "Kelvin") {
      if (toUnit === "Celsius") convertedValue = value - 273.15;
      else if (toUnit === "Fahrenheit") convertedValue = (value - 273.15) * 9/5 + 32;
    }
    
    setResult(convertedValue.toLocaleString(undefined, { maximumFractionDigits: 2 }));

  }, [inputValue, fromUnit, toUnit]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    toast({ title: "Units Swapped!", description: `${toUnit}° is now the input unit.`});
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Thermometer className="w-10 h-10 mr-3 text-red-500" /> Temperature Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Convert between Celsius, Fahrenheit, and Kelvin.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="inputValueTemp" className="text-gray-700 dark:text-gray-300">Value</Label>
            <Input
              id="inputValueTemp"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter temperature"
              className="text-lg"
            />
          </div>
          <div>
            <Label htmlFor="fromUnitTemp" className="text-gray-700 dark:text-gray-300">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="fromUnitTemp" className="text-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>°{unit}</SelectItem>
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
            className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md"
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="toUnitTemp" className="text-gray-700 dark:text-gray-300">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="toUnitTemp" className="text-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>°{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="resultTemp" className="text-gray-700 dark:text-gray-300">Result</Label>
            <Input
              id="resultTemp"
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
            {inputValue}°{fromUnit} = {result}°{toUnit}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default TemperatureConverter;
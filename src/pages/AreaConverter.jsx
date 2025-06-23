import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Maximize, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Helmet } from "react-helmet-async";

const units = {
  sqm: { name: "Square Meter", factor: 1 },
  sqkm: { name: "Square Kilometer", factor: 1000000 },
  acre: { name: "Acre", factor: 4046.86 },
  hectare: { name: "Hectare", factor: 10000 },
  sqft: { name: "Square Foot", factor: 0.092903 },
  sqmi: { name: "Square Mile", factor: 2589990 },
};

const AreaConverter = () => {
  const [inputValue, setInputValue] = useState("100");
  const [fromUnit, setFromUnit] = useState("sqm");
  const [toUnit, setToUnit] = useState("sqft");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (inputValue === "" || isNaN(parseFloat(inputValue))) {
      setResult("");
      return;
    }
    const valueInSqMeters = parseFloat(inputValue) * units[fromUnit].factor;
    const convertedValue = valueInSqMeters / units[toUnit].factor;
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
      <Helmet>
        <title>Area Converter - Convert Square Meters, Acres, Hectares & More | Toolzenix</title>
        <meta name="description" content="Convert area units like square meters, square kilometers, acres, hectares, square feet, and square miles with our free online area converter." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Maximize className="w-10 h-10 mr-3 text-green-500" /> Area Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">Convert between various units of area.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="inputValueArea" className="text-gray-700 dark:text-gray-300">Value</Label>
            <Input
              id="inputValueArea"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter area"
              className="text-lg"
            />
          </div>
          <div>
            <Label htmlFor="fromUnitArea" className="text-gray-700 dark:text-gray-300">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="fromUnitArea" className="text-lg"><SelectValue /></SelectTrigger>
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
            className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md"
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="toUnitArea" className="text-gray-700 dark:text-gray-300">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="toUnitArea" className="text-lg"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>{unit.name} ({key})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="resultArea" className="text-gray-700 dark:text-gray-300">Result</Label>
            <Input
              id="resultArea"
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

      <div className="mt-10 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Enter the area value in the "Value" field.</li>
          <li>Select the original unit from the "From" dropdown.</li>
          <li>Select the target unit from the "To" dropdown.</li>
          <li>The converted area will be displayed in the "Result" field.</li>
          <li>Click the swap icon to interchange "From" and "To" units.</li>
        </ul>
      </div>
    </div>
  );
};

export default AreaConverter;
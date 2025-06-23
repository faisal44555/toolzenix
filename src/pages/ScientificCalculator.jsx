import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator } from "lucide-react";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleNumber = (num) => {
    if (showResult) {
      setDisplay(num);
      setExpression(num);
      setShowResult(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
      setExpression(expression + num);
    }
  };

  const handleOperator = (op) => {
    if (showResult) {
      setExpression(display + op);
      setShowResult(false);
    } else {
      setExpression(expression + op);
    }
    setDisplay(op);
  };

  const handleFunction = (func) => {
    switch (func) {
      case "sin":
        setDisplay(Math.sin(parseFloat(display)).toString());
        break;
      case "cos":
        setDisplay(Math.cos(parseFloat(display)).toString());
        break;
      case "tan":
        setDisplay(Math.tan(parseFloat(display)).toString());
        break;
      case "sqrt":
        setDisplay(Math.sqrt(parseFloat(display)).toString());
        break;
      case "log":
        setDisplay(Math.log10(parseFloat(display)).toString());
        break;
      case "ln":
        setDisplay(Math.log(parseFloat(display)).toString());
        break;
      default:
        break;
    }
    setShowResult(true);
  };

  const calculate = () => {
    try {
      const result = eval(expression);
      setDisplay(result.toString());
      setExpression(result.toString());
      setShowResult(true);
    } catch (error) {
      setDisplay("Error");
      setShowResult(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setExpression("");
    setShowResult(false);
  };

  const buttonClass = "p-3 text-lg font-semibold rounded-lg transition-colors";
  const numberClass = `${buttonClass} bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600`;
  const operatorClass = `${buttonClass} bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-700 dark:text-blue-300`;
  const functionClass = `${buttonClass} bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 text-purple-700 dark:text-purple-300`;

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Calculator className="w-10 h-10 mr-3 text-blue-500" /> Scientific Calculator
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl"
      >
        <Input
          value={display}
          readOnly
          className="text-right text-2xl mb-4 font-mono bg-gray-50 dark:bg-gray-900"
        />

        <div className="grid grid-cols-4 gap-2">
          <Button onClick={() => handleFunction("sin")} className={functionClass}>sin</Button>
          <Button onClick={() => handleFunction("cos")} className={functionClass}>cos</Button>
          <Button onClick={() => handleFunction("tan")} className={functionClass}>tan</Button>
          <Button onClick={() => handleOperator("/")} className={operatorClass}>/</Button>

          <Button onClick={() => handleFunction("sqrt")} className={functionClass}>√</Button>
          <Button onClick={() => handleFunction("log")} className={functionClass}>log</Button>
          <Button onClick={() => handleFunction("ln")} className={functionClass}>ln</Button>
          <Button onClick={() => handleOperator("*")} className={operatorClass}>×</Button>

          <Button onClick={() => handleNumber("7")} className={numberClass}>7</Button>
          <Button onClick={() => handleNumber("8")} className={numberClass}>8</Button>
          <Button onClick={() => handleNumber("9")} className={numberClass}>9</Button>
          <Button onClick={() => handleOperator("-")} className={operatorClass}>-</Button>

          <Button onClick={() => handleNumber("4")} className={numberClass}>4</Button>
          <Button onClick={() => handleNumber("5")} className={numberClass}>5</Button>
          <Button onClick={() => handleNumber("6")} className={numberClass}>6</Button>
          <Button onClick={() => handleOperator("+")} className={operatorClass}>+</Button>

          <Button onClick={() => handleNumber("1")} className={numberClass}>1</Button>
          <Button onClick={() => handleNumber("2")} className={numberClass}>2</Button>
          <Button onClick={() => handleNumber("3")} className={numberClass}>3</Button>
          <Button onClick={calculate} className="p-3 text-lg font-semibold rounded-lg bg-green-500 hover:bg-green-600 text-white row-span-2">=</Button>

          <Button onClick={() => handleNumber("0")} className={numberClass}>0</Button>
          <Button onClick={() => handleNumber(".")} className={numberClass}>.</Button>
          <Button onClick={clear} className="p-3 text-lg font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white">C</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ScientificCalculator;
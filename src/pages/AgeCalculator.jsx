import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const calculateAge = (birthDateStr) => {
    if (!birthDateStr) {
      setAge({ years: 0, months: 0, days: 0 });
      return;
    }

    const today = new Date();
    const birthDateObj = new Date(birthDateStr);
    
    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of previous month
      days = lastMonth.getDate() - birthDateObj.getDate() + today.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  useEffect(() => {
    calculateAge(birthDate);
  }, [birthDate]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Helmet>
        <title>Age Calculator - Calculate Your Exact Age | Toolzenix</title>
        <meta name="description" content="Calculate your exact age in years, months, and days with our free online age calculator. Simple and accurate results instantly." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white flex items-center justify-center">
          <Calendar className="w-10 h-10 mr-3 text-yellow-500" /> Age Calculator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Calculate your exact age in years, months, and days
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6"
      >
        <div>
          <Label htmlFor="birthDate">Date of Birth</Label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-3xl font-bold text-yellow-500">{age.years}</div>
            <div className="text-gray-600 dark:text-gray-400">Years</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-3xl font-bold text-yellow-500">{age.months}</div>
            <div className="text-gray-600 dark:text-gray-400">Months</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-3xl font-bold text-yellow-500">{age.days}</div>
            <div className="text-gray-600 dark:text-gray-400">Days</div>
          </div>
        </div>

        {birthDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 dark:text-gray-400 pt-4"
          >
            <p>You are {age.years} years, {age.months} months, and {age.days} days old</p>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center text-gray-600 dark:text-gray-400"
      >
        <p>Select your date of birth to calculate your exact age.</p>
      </motion.div>

      <div className="mt-10 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">How to Use</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>Click on the "Date of Birth" input field.</li>
          <li>Select your birth date from the calendar.</li>
          <li>Your age will be automatically displayed in years, months, and days.</li>
        </ul>
      </div>
    </div>
  );
};

export default AgeCalculator;
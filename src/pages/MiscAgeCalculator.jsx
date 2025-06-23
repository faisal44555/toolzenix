import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays, Gift, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/components/ui/use-toast";

const MiscAgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [age, setAge] = useState(null);
  const { toast } = useToast();

  const calculateAge = () => {
    if (!birthDate || !targetDate) {
      setAge(null);
      if (birthDate || targetDate) { // Only toast if one is set but not the other, or if calculate is pressed
          toast({ title: "Missing Date", description: "Please select both birth date and target date.", variant: "destructive" });
      }
      return;
    }

    const startDate = new Date(birthDate);
    const endDate = new Date(targetDate);

    if (startDate > endDate) {
        toast({ title: "Invalid Dates", description: "Birth date cannot be after the target date.", variant: "destructive" });
        setAge(null);
        return;
    }

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days = lastMonth.getDate() - startDate.getDate() + endDate.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysInWeeks = totalDays % 7;


    setAge({ years, months, days, totalDays, totalWeeks, remainingDaysInWeeks });
  };
  
  useEffect(() => {
    if (birthDate && targetDate) {
        calculateAge();
    } else {
        setAge(null); // Clear age if dates are not set
    }
  }, [birthDate, targetDate]);


  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>Age Calculator - Calculate Age Between Dates | Toolzenix</title>
        <meta name="description" content="Calculate age or time duration between two dates in years, months, days, total weeks, and total days. Free and easy to use." />
        <link rel="canonical" href="https://toolzenix.com/misc-age-calculator" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <CalendarDays className="w-16 h-16 text-pink-500 mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white"> Age Calculator</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Calculate age or duration between two dates.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="birthDate" className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                <Gift className="w-4 h-4 mr-2 text-pink-500"/> Date of Birth / Start Date
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="targetDate" className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                <CalendarDays className="w-4 h-4 mr-2 text-pink-500"/> Age at Date / End Date
              </Label>
              <Input
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
        </div>
        
        <Button onClick={calculateAge} className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg py-3">
            Calculate Age / Duration
        </Button>

        {age && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Result</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-pink-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{age.years}</div>
                <div className="text-gray-600 dark:text-gray-400">Years</div>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{age.months}</div>
                <div className="text-gray-600 dark:text-gray-400">Months</div>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{age.days}</div>
                <div className="text-gray-600 dark:text-gray-400">Days</div>
              </div>
            </div>
            <div className="mt-6 text-center text-gray-700 dark:text-gray-300">
                <p className="text-lg">
                    Or <strong className="text-pink-600 dark:text-pink-400">{age.totalWeeks}</strong> weeks and <strong className="text-pink-600 dark:text-pink-400">{age.remainingDaysInWeeks}</strong> days
                </p>
                <p className="text-lg">
                    Or a total of <strong className="text-pink-600 dark:text-pink-400">{age.totalDays}</strong> days
                </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="mt-10 prose dark:prose-invert max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-semibold">How to Use the Age Calculator</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Enter the <strong>Date of Birth</strong> (or any start date).</li>
          <li>Enter the <strong>Age at Date</strong> (or any end date). By default, this is today's date.</li>
          <li>The calculator will automatically show the age or duration in years, months, and days.</li>
          <li>It also shows the total duration in weeks and days, and in total days.</li>
          <li>Click "Calculate Age / Duration" if you need to manually refresh the calculation.</li>
        </ul>
        <p className="mt-4">This tool is perfect for finding out your exact age, the time elapsed between two historical events, or the duration of a project.</p>
      </div>
    </div>
  );
};

export default MiscAgeCalculator;
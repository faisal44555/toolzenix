import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarClock, Gift, Users, AlertCircle, Link as LinkIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

const DateTimeAgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [age, setAge] = useState(null);
  const { toast } = useToast();

  const calculateAge = () => {
    if (!birthDate || !targetDate) {
      setAge(null);
      if (birthDate || targetDate) {
          toast({ title: "Missing Date", description: "Please select both birth date and target date.", variant: "destructive", action: <AlertCircle /> });
      }
      return;
    }

    const startDate = new Date(birthDate);
    const endDate = new Date(targetDate);

    if (startDate > endDate) {
        toast({ title: "Invalid Dates", description: "Birth date cannot be after the target date.", variant: "destructive", action: <AlertCircle /> });
        setAge(null);
        return;
    }

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
      months--;
      const lastDayOfPrevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
      days = lastDayOfPrevMonth - startDate.getDate() + endDate.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysInWeeks = totalDays % 7;

    const nextBirthdayYear = endDate.getMonth() > startDate.getMonth() || (endDate.getMonth() === startDate.getMonth() && endDate.getDate() >= startDate.getDate()) 
                           ? endDate.getFullYear() 
                           : endDate.getFullYear() + 1;
    const nextBirthday = new Date(nextBirthdayYear, startDate.getMonth(), startDate.getDate());
    let daysToNextBirthday = Math.ceil((nextBirthday.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));
    // Ensure daysToNextBirthday is not negative if today is the birthday
    if (daysToNextBirthday < 0 || (daysToNextBirthday === 0 && nextBirthday.getTime() < endDate.getTime())) {
      const nextYearBirthday = new Date(nextBirthdayYear + 1, startDate.getMonth(), startDate.getDate());
      daysToNextBirthday = Math.ceil((nextYearBirthday.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));
    }


    setAge({ years, months, days, totalDays, totalWeeks, remainingDaysInWeeks, daysToNextBirthday });
  };
  
  useEffect(() => {
    if (birthDate && targetDate) {
        calculateAge();
    } else {
        setAge(null);
    }
  }, [birthDate, targetDate]);


  return (
    <>
      <Helmet>
        <title>Age Calculator - Years, Months, Days Between Dates | Toolzenix</title>
        <meta name="description" content="Calculate age or time duration between two dates in years, months, days, total weeks, and total days. Also shows days until next birthday. Accurate and easy to use." />
        <link rel="canonical" href="https://toolzenix.com/datetime-age-calculator" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <CalendarClock className="w-16 h-16 text-pink-500 dark:text-pink-400 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white"> Age Calculator</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Calculate age accurately and find days until next birthday.
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
                <Label htmlFor="birthDate-dt" className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                  <Gift className="w-4 h-4 mr-2 text-pink-500"/> Date of Birth
                </Label>
                <Input
                  id="birthDate-dt"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  max={new Date().toISOString().split("T")[0]} 
                />
              </div>
              <div>
                <Label htmlFor="targetDate-dt" className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
                  <Users className="w-4 h-4 mr-2 text-pink-500"/> Age at Date
                </Label>
                <Input
                  id="targetDate-dt"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
          </div>
          
          <Button onClick={calculateAge} className="w-full bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white text-lg py-3">
              Calculate Age
          </Button>

          {age && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Your Age Is</h2>
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
              <div className="mt-6 text-center text-gray-700 dark:text-gray-300 space-y-2">
                  <p className="text-lg">
                      Or <strong className="text-pink-600 dark:text-pink-400">{age.totalWeeks}</strong> weeks and <strong className="text-pink-600 dark:text-pink-400">{age.remainingDaysInWeeks}</strong> days.
                  </p>
                  <p className="text-lg">
                      Or a total of <strong className="text-pink-600 dark:text-pink-400">{age.totalDays}</strong> days.
                  </p>
                  {birthDate && age.daysToNextBirthday >= 0 && (
                      <p className="text-lg pt-2">
                          Your next birthday is in <strong className="text-pink-600 dark:text-pink-400">{age.daysToNextBirthday}</strong> days.
                      </p>
                  )}
              </div>
            </motion.div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Comprehensive Age and Time Duration Calculation</h2>
          <p>
            This Age Calculator allows you to determine the age of a person or the duration between any two dates with precision. Simply enter a "Date of Birth" and an "Age at Date" (which defaults to today but can be any date). The tool will then display the duration in several formats: years, months, and days; total weeks and days; and total days. Additionally, it calculates the number of days remaining until the next birthday based on the birth date and the "Age at Date".
          </p>
          <h3 className="text-xl font-semibold">Features:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Calculates age in years, months, and days.</li>
            <li>Provides total duration in weeks and days.</li>
            <li>Shows total duration in days.</li>
            <li>Counts down days until the next birthday.</li>
            <li>Allows selection of any past, present, or future "Age at Date".</li>
          </ul>
          <p>
            Whether you're calculating someone's current age, figuring out the time between two historical events, or planning for a future milestone, this calculator is a versatile tool. For more date and time utilities, explore our <Link to="/calendar-time-tools" className="text-pink-600 dark:text-pink-400 hover:underline">Calendar & Time Tools</Link> section, including the <Link to="/date-calculator" className="text-pink-600 dark:text-pink-400 hover:underline">Date Calculator</Link> for adding/subtracting from dates.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default DateTimeAgeCalculator;
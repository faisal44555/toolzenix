import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Calculator, CalendarDays, AlertCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const DateCalculatorTool = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]); // Default to 30 days later
  const [duration, setDuration] = useState(null);
  const { toast } = useToast();

  const calculateDuration = () => {
    if (!startDate || !endDate) {
      toast({ title: 'Missing Dates', description: 'Please select both start and end dates.', variant: 'destructive' });
      setDuration(null);
      return;
    }

    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    if (date1 > date2) {
      toast({ title: 'Invalid Date Range', description: 'Start date cannot be after end date.', variant: 'destructive', action: <AlertCircle/> });
      setDuration(null);
      return;
    }

    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let years = date2.getFullYear() - date1.getFullYear();
    let months = date2.getMonth() - date1.getMonth();
    let days = date2.getDate() - date1.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(date2.getFullYear(), date2.getMonth(), 0);
      days = lastMonth.getDate() - date1.getDate() + date2.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysInWeeks = totalDays % 7;

    setDuration({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      remainingDaysInWeeks,
    });
  };
  
  useEffect(() => {
     calculateDuration(); // Calculate on initial load and when dates change
  }, [startDate, endDate]);

  return (
    <>
      <Helmet>
        <title>Date Calculator - Duration Between Dates | Toolzenix</title>
        <meta name="description" content="Calculate the exact duration (years, months, days, total days, total weeks) between two dates. A simple and free online tool for date difference calculations and planning." />
        <link rel="canonical" href="https://toolzenix.com/date-calculator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Calculator className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Date Calculator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Calculate the duration between two dates or find a date by adding/subtracting time. Perfect for project planning, event scheduling, and age calculations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="start-date" className="text-gray-700 dark:text-gray-300 flex items-center mb-1">
                <CalendarDays size={16} className="mr-2 text-yellow-500"/> Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-gray-700 dark:text-gray-300 flex items-center mb-1">
                <CalendarDays size={16} className="mr-2 text-yellow-500"/> End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
          
          <Button onClick={calculateDuration} className="w-full bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white py-3 text-lg">
            Calculate Duration
          </Button>

          {duration && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">Duration Result:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-4">
                <div className="p-3 bg-yellow-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{duration.years}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{duration.months}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Months</div>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{duration.days}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
                </div>
              </div>
              <div className="text-center text-gray-700 dark:text-gray-300">
                <p className="text-md">
                  Or <strong className="text-yellow-600 dark:text-yellow-400">{duration.totalWeeks}</strong> weeks and <strong className="text-yellow-600 dark:text-yellow-400">{duration.remainingDaysInWeeks}</strong> days
                </p>
                <p className="text-md">
                  Or a total of <strong className="text-yellow-600 dark:text-yellow-400">{duration.totalDays}</strong> days
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold mb-4">About Our Date Calculator</h2>
          <p>The Date Calculator is a handy online tool designed to help you quickly determine the duration between two specific dates. Whether you're planning a project timeline, calculating someone's age, or figuring out the number of days until an important event, this tool provides accurate results in years, months, days, total weeks, and total days. It simplifies date-related calculations, saving you time and effort.</p>
          <p>Our calculator is intuitive to use: simply select a start date and an end date using the calendar pickers. The tool will instantly compute the difference, taking into account varying month lengths and leap years. This is particularly useful for event planning, tracking anniversaries, or managing deadlines. For more specific time-based calculations, you might also find our <Link to="/datetime-countdown-timer">Countdown Timer</Link> or <Link to="/calendar-generator">Calendar Generator</Link> useful.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select the "Start Date" using the calendar input field. This is the earlier date in your calculation.</li>
            <li>Select the "End Date" using the other calendar input field. This is the later date.</li>
            <li>Click the "Calculate Duration" button (or the calculation will update automatically as you change dates).</li>
            <li>The results will be displayed below, showing the duration broken down into:
              <ul className="list-disc pl-5">
                <li>Years, Months, and Days (e.g., 2 years, 3 months, 15 days)</li>
                <li>Total Weeks and remaining Days (e.g., 120 weeks and 5 days)</li>
                <li>Total Days (e.g., 845 days)</li>
              </ul>
            </li>
            <li>If you enter a start date that is after the end date, an error message will appear. Please ensure your date range is valid.</li>
          </ol>
          <p className="mt-4">This tool is ideal for anyone needing precise date difference calculations without manual counting or complex formulas. Explore other <Link to="/calendar-time-tools">Calendar & Time Tools</Link> or browse <Link to="/tools">all available tools</Link> on Toolzenix for more utilities.</p>
        </div>
      </div>
    </>
  );
};

export default DateCalculatorTool;
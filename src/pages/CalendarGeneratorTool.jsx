import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import { Link } from "react-router-dom";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i); // +/- 10 years

const CalendarGeneratorTool = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)

  const generateCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const grid = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) { // Max 6 weeks for a month
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(<td key={`empty-start-${j}`} className="p-2 h-16 border dark:border-gray-700"></td>);
        } else if (dayCounter <= daysInMonth) {
          const isToday = new Date().getFullYear() === selectedYear &&
                          new Date().getMonth() === selectedMonth &&
                          new Date().getDate() === dayCounter;
          week.push(
            <td key={dayCounter} className={`p-2 h-16 border dark:border-gray-700 text-center align-top ${isToday ? 'bg-purple-100 dark:bg-purple-800/50' : ''}`}>
              <span className={`text-sm font-medium ${isToday ? 'text-purple-600 dark:text-purple-300' : 'text-gray-700 dark:text-gray-200'}`}>{dayCounter}</span>
            </td>
          );
          dayCounter++;
        } else {
          week.push(<td key={`empty-end-${j}`} className="p-2 h-16 border dark:border-gray-700"></td>);
        }
      }
      grid.push(<tr key={i}>{week}</tr>);
      if (dayCounter > daysInMonth && grid.length >= Math.ceil((firstDay + daysInMonth) / 7) ) break; // Stop if all days are rendered
    }
    return grid;
  };

  const handlePrint = () => {
    const printContents = document.getElementById('calendar-to-print').innerHTML;
    const originalContents = document.body.innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html><head><title>Calendar - ${months[selectedMonth]} ${selectedYear}</title>
      <style>
        body { font-family: sans-serif; margin: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: center; height: 70px; vertical-align: top; }
        th { background-color: #f0f0f0; }
        td span { font-size: 0.9em; }
        .today { background-color: #e0e0ff; } /* Simple today highlight for print */
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      </style>
      </head><body>
      <h2>${months[selectedMonth]} ${selectedYear}</h2>
      ${printContents}
      </body></html>`);
    printWindow.document.close();
    printWindow.focus();
    // Timeout needed for some browsers to load content before printing
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <Helmet>
        <title>Monthly Calendar Generator - Printable Calendars | Toolzenix</title>
        <meta name="description" content="Generate and view a printable monthly calendar for any month and year. Easy to use, customize, and print for your planning needs. Perfect for home, office, or school." />
        <link rel="canonical" href="https://toolzenix.com/calendar-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <CalendarDays className="w-16 h-16 text-purple-500 dark:text-purple-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Monthly Calendar Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            View and print a calendar for any month and year. Plan your schedule with ease.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
              <SelectTrigger className="w-full sm:w-auto min-w-[150px] dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                {months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
              <SelectTrigger className="w-full sm:w-auto min-w-[120px] dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white">
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
             <Button onClick={handlePrint} variant="outline" className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                <Printer className="w-4 h-4 mr-2"/> Print Calendar
            </Button>
          </div>
          
          <div id="calendar-to-print">
            <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
              {months[selectedMonth]} {selectedYear}
            </h3>
            <table className="w-full table-fixed border-collapse border dark:border-gray-700">
              <thead>
                <tr>
                  {daysOfWeek.map(day => (
                    <th key={day} className="p-2 border dark:border-gray-700 bg-gray-100 dark:bg-gray-700/50 text-sm font-medium text-gray-600 dark:text-gray-300">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {generateCalendarGrid()}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-12 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold mb-4">About Our Calendar Generator</h2>
          <p>The Monthly Calendar Generator is a simple yet effective tool for creating and viewing calendars for any month and year. Whether you're planning personal events, tracking deadlines, or need a quick reference for dates, this tool provides a clean, printable calendar layout. You can easily navigate between months and years, and the current day is highlighted for quick orientation.</p>
          <p>This tool is perfect for students, professionals, and anyone needing a straightforward calendar. The "Print Calendar" feature allows you to get a hard copy for your desk or wall. It's designed to be user-friendly and efficient, providing essential calendar functionality without unnecessary complexities. For other time-related utilities, check out our <Link to="/datetime-countdown-timer">Countdown Timer</Link> or the <Link to="/world-clock">World Clock</Link>.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-2">How to Use This Tool:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Use the "Select Month" dropdown to choose the desired month.</li>
            <li>Use the "Select Year" dropdown to choose the desired year. The calendar will automatically update.</li>
            <li>The calendar grid will display the selected month and year, with days of the week as headers. The current date (if it falls within the selected month and year) will be highlighted.</li>
            <li>To print the displayed calendar, click the "Print Calendar" button. This will open your browser's print dialog with a printer-friendly version of the calendar.</li>
          </ol>
          <p className="mt-4">This calendar generator is useful for quick lookups, scheduling, and creating simple printable calendars for various purposes. Explore more <Link to="/calendar-time-tools">Calendar & Time Tools</Link> or browse <Link to="/tools">all available tools</Link> on Toolzenix.</p>
        </div>
      </div>
    </>
  );
};

export default CalendarGeneratorTool;
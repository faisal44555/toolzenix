import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, CalendarClock, Timer, Clock, CalendarDays, Globe, Calculator, Bell, ArrowRight, ArrowRightLeft } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const tools = [
  {
    title: "Stopwatch",
    description: "Start, stop, lap and reset a timer in your browser.",
    icon: <Timer className="w-6 h-6" />,
    link: "/stopwatch",
    color: "bg-green-500"
  },
  {
    title: "Countdown Timer (Date/Time)",
    description: "Countdown to any specific date and time.",
    icon: <Clock className="w-6 h-6" />,
    link: "/datetime-countdown-timer",
    color: "bg-blue-500"
  },
  {
    title: "Calendar Generator",
    description: "Create and view monthly or yearly calendars.",
    icon: <CalendarDays className="w-6 h-6" />,
    link: "/calendar-generator",
    color: "bg-purple-500"
  },
  {
    title: "World Clock",
    description: "Show live time from multiple time zones.",
    icon: <Globe className="w-6 h-6" />,
    link: "/world-clock",
    color: "bg-teal-500"
  },
  {
    title: "Date Calculator",
    description: "Calculate the duration (days, etc.) between two dates.",
    icon: <Calculator className="w-6 h-6" />,
    link: "/date-calculator",
    color: "bg-yellow-500 text-gray-800"
  },
  {
    title: "Time Zone Converter",
    description: "Convert time from one zone to another.",
    icon: <ArrowRightLeft className="w-6 h-6" />,
    link: "/timezone-converter",
    color: "bg-orange-500"
  },
  {
    title: "Age Calculator",
    description: "Calculate age based on birthdate accurately.",
    icon: <CalendarClock className="w-6 h-6" />,
    link: "/datetime-age-calculator",
    color: "bg-pink-500"
  },
  {
    title: "Reminder Tool (Local)",
    description: "Set local browser notifications/reminders.",
    icon: <Bell className="w-6 h-6" />,
    link: "/local-reminder-tool",
    color: "bg-red-500"
  }
];

const CalendarTimeTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Calendar & Time Tools | Toolzenix</title>
        <meta 
          name="description" 
          content="A collection of free online calendar and time management tools. Includes stopwatch, countdown timer, world clock, date calculator, time zone converter, and more. All client-side and easy to use."
        />
        <link rel="canonical" href="https://toolzenix.com/calendar-time-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <CalendarClock className="w-16 h-16 text-indigo-600 dark:text-indigo-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Calendar & Time Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Manage your dates, times, and schedules effectively with our suite of browser-based utilities.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search calendar & time tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search calendar and time tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={tool.link} className="block group">
                <div className="flex items-start space-x-4">
                  <div className={`${tool.color} p-3 rounded-lg text-white`}>
                    {React.cloneElement(tool.icon, { "aria-hidden": true })}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-500">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-500 transition-colors" aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p
            className="text-center text-gray-500 dark:text-gray-400 mt-8"
          >
            No tools found for your search. Try a different keyword!
          </p>
        )}

        <div
          className="mt-12 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Your Time, Managed</h2>
          <p className="text-gray-200">
            All these tools run directly in your browser, ensuring your data stays private. No server interactions, just pure client-side power.
          </p>
        </div>
      </div>
    </>
  );
};

export default CalendarTimeTools;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, HeartPulse, Activity, Scale, Droplets, Footprints, BedDouble, Brain, ArrowRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const tools = [
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index.",
    icon: <Activity className="w-6 h-6" />,
    link: "/health-bmi-calculator",
    color: "bg-red-500"
  },
  {
    title: "Calorie Calculator",
    description: "Estimate your daily calorie needs.",
    icon: <HeartPulse className="w-6 h-6" />,
    link: "/calorie-needs-calculator",
    color: "bg-orange-500"
  },
  {
    title: "Heart Rate Checker (Manual)",
    description: "Check your pulse manually with a timer.",
    icon: <HeartPulse className="w-6 h-6" />,
    link: "/manual-heart-rate-checker",
    color: "bg-pink-500"
  },
  {
    title: "Ideal Weight Calculator",
    description: "Calculate your ideal body weight range.",
    icon: <Scale className="w-6 h-6" />,
    link: "/ideal-weight-calculator",
    color: "bg-green-500"
  },
  {
    title: "Water Intake Calculator",
    description: "Estimate your daily water needs.",
    icon: <Droplets className="w-6 h-6" />,
    link: "/water-intake-calculator",
    color: "bg-blue-500"
  },
  {
    title: "Steps to Calories Converter",
    description: "Convert steps walked to calories burned.",
    icon: <Footprints className="w-6 h-6" />,
    link: "/steps-to-calories-converter",
    color: "bg-yellow-500 text-gray-800"
  },
  {
    title: "Sleep Time Calculator",
    description: "Find the best time to sleep & wake up.",
    icon: <BedDouble className="w-6 h-6" />,
    link: "/sleep-time-calculator",
    color: "bg-indigo-500"
  },
  {
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate.",
    icon: <Brain className="w-6 h-6" />,
    link: "/bmr-calculator",
    color: "bg-purple-500"
  }
];

const HealthFitnessTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Health & Fitness Tools – BMI, Calorie, Sleep Calculators | Toolzenix</title>
        <meta 
          name="description" 
          content="Access free Health & Fitness tools on Toolzenix.com: BMI Calculator, Calorie Calculator, Ideal Weight, Water Intake, Sleep Time, BMR, and more. All tools are frontend-only and work offline."
        />
        <link rel="canonical" href="https://toolzenix.com/health-fitness-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <HeartPulse className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Health & Fitness Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Monitor, calculate, and improve your health & fitness with our suite of free, browser-based tools.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search health tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search health and fitness tools"
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
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" aria-hidden="true" />
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
          className="mt-12 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Your Health, Your Control</h2>
          <p className="text-green-50">
            All tools are designed for quick, easy use and operate entirely within your browser for privacy and speed.
          </p>
        </div>
      </div>
    </>
  );
};

export default HealthFitnessTools;
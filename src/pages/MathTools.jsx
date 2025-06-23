import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { Search, Calculator, Percent, Brain, Calendar, Coins, Activity, Divide, Binary, Hash, TableProperties as Function, Sigma, ArrowRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { allToolCategories } from "@/config/navigation";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "Percentage Calculator",
    description: "Calculate percentages with ease.",
    icon: <Percent className="w-6 h-6" />,
    link: "/percentage-calculator",
    color: "bg-violet-500"
  },
  {
    title: "Scientific Calculator",
    description: "Advanced scientific calculations.",
    icon: <Calculator className="w-6 h-6" />,
    link: "/scientific-calculator",
    color: "bg-blue-500"
  },
  {
    title: "Average Calculator",
    description: "Calculate mean, median, and mode.",
    icon: <Function className="w-6 h-6" />,
    link: "/average-calculator",
    color: "bg-green-500"
  },
  {
    title: "Age Calculator",
    description: "Calculate age between dates.",
    icon: <Calendar className="w-6 h-6" />,
    link: "/age-calculator",
    color: "bg-yellow-500 text-gray-800"
  },
  {
    title: "Simple Interest Calculator",
    description: "Calculate simple interest easily.",
    icon: <Coins className="w-6 h-6" />,
    link: "/simple-interest-calculator",
    color: "bg-pink-500"
  },
  {
    title: "Compound Interest Calculator",
    description: "Calculate compound interest.",
    icon: <Coins className="w-6 h-6" />,
    link: "/compound-interest-calculator",
    color: "bg-purple-500"
  },
  {
    title: "BMI Calculator",
    description: "Calculate Body Mass Index.",
    icon: <Activity className="w-6 h-6" />,
    link: "/bmi-calculator",
    color: "bg-red-500"
  },
  {
    title: "Fraction to Decimal",
    description: "Convert fractions to decimals.",
    icon: <Divide className="w-6 h-6" />,
    link: "/fraction-to-decimal",
    color: "bg-indigo-500"
  },
  {
    title: "Number to Words",
    description: "Convert numbers to words.",
    icon: <Binary className="w-6 h-6" />,
    link: "/number-to-words",
    color: "bg-cyan-500"
  },
  {
    title: "LCM & HCF Calculator",
    description: "Find LCM and HCF of numbers.",
    icon: <Hash className="w-6 h-6" />,
    link: "/lcm-hcf-calculator",
    color: "bg-amber-500"
  },
  {
    title: "Factorial Calculator",
    description: "Calculate factorial of numbers.",
    icon: <Sigma className="w-6 h-6" />,
    link: "/factorial-calculator",
    color: "bg-emerald-500"
  }
];

const MathTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const relatedCategoriesList = ["Finance Tools", "Science Tools", "Unit Converters"];
  const relatedCategories = allToolCategories.filter(cat => relatedCategoriesList.includes(cat.name));

  return (
    <>
      <Helmet>
        <title>Free Math Tools – Percentage, BMI, Age & More | Toolzenix</title>
        <meta 
          name="description" 
          content="Use Toolzenix.com's free math tools like percentage calculator, age calculator, BMI calculator, and more. Fast, accurate and 100% free."
        />
        <link rel="canonical" href="https://toolzenix.com/math-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            All-in-One Free Math Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Fast, accurate, and free mathematical calculations. All tools work offline in your browser.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search math tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search math tools"
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
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 w-full max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Explore Related Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCategories.map(cat => {
                const Icon = LucideIcons[cat.icon] || LucideIcons.Folder;
                return (
                  <div
                    key={cat.path}
                    className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:scale-103"
                  >
                    <Link to={cat.path} className="group">
                      <div className="flex items-center mb-3">
                        <Icon className={cn("w-8 h-8 mr-4", cat.color)} />
                        <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{cat.description}</p>
                    </Link>
                  </div>
                )
              })}
            </div>
        </div>

        <div
          className="mt-12 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Fast & Accurate</h2>
          <p className="text-purple-100">
            All calculations are performed instantly in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </>
  );
};

export default MathTools;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Ruler, Scale, Thermometer, Gauge, Maximize, Beaker, Clock, Wind, Zap, Database, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";


const tools = [
  {
    title: "Length Converter",
    description: "Convert cm, m, km, inch, foot, mile.",
    icon: <Ruler className="w-6 h-6" />,
    link: "/length-converter",
    color: "bg-sky-500"
  },
  {
    title: "Weight Converter",
    description: "Convert kg, g, lb, oz, ton.",
    icon: <Scale className="w-6 h-6" />,
    link: "/weight-converter",
    color: "bg-orange-500"
  },
  {
    title: "Temperature Converter",
    description: "Convert Celsius, Fahrenheit, Kelvin.",
    icon: <Thermometer className="w-6 h-6" />,
    link: "/temperature-converter",
    color: "bg-red-500"
  },
  {
    title: "Speed Converter",
    description: "Convert km/h, mph, m/s, knots.",
    icon: <Gauge className="w-6 h-6" />,
    link: "/speed-converter",
    color: "bg-yellow-500 text-gray-800"
  },
  {
    title: "Area Converter",
    description: "Convert sq.m, sq.km, acre, hectare, sq.ft.",
    icon: <Maximize className="w-6 h-6" />,
    link: "/area-converter",
    color: "bg-green-500"
  },
  {
    title: "Volume Converter",
    description: "Convert litre, ml, gallon, cubic meter.",
    icon: <Beaker className="w-6 h-6" />,
    link: "/volume-converter",
    color: "bg-purple-500"
  },
  {
    title: "Time Converter",
    description: "Convert seconds, minutes, hours, days.",
    icon: <Clock className="w-6 h-6" />,
    link: "/time-converter",
    color: "bg-indigo-500"
  },
  {
    title: "Pressure Converter",
    description: "Convert Pascal, Bar, PSI, mmHg.",
    icon: <Wind className="w-6 h-6" />,
    link: "/pressure-converter",
    color: "bg-rose-500"
  },
  {
    title: "Energy Converter",
    description: "Convert Joule, Calorie, kWh, BTU.",
    icon: <Zap className="w-6 h-6" />,
    link: "/energy-converter",
    color: "bg-amber-500"
  },
  {
    title: "Data Converter",
    description: "Convert KB, MB, GB, TB.",
    icon: <Database className="w-6 h-6" />,
    link: "/data-converter",
    color: "bg-teal-500"
  }
];

const UnitConverters = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Unit Converter Tools – Convert Length, Weight, Time & More | Toolzenix</title>
        <meta name="description" content="A comprehensive collection of free online unit converters for length, weight, temperature, speed, area, volume, time, pressure, energy, and data. Fast, accurate, and easy to use." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Unit Converter Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Convert various units of measurement instantly. All tools are frontend-only, ensuring privacy and speed.
          </p>
        </motion.div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search unit converters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search unit converters"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Accurate & Reliable</h2>
          <p className="text-green-100">
            Our unit converters use precise formulas to ensure you get accurate results every time, directly in your browser.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default UnitConverters;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, FlaskConical, Atom, TestTube2, Sigma, Globe2, Microscope as Telescope, Scale, Thermometer, BrainCircuit, Dna } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const tools = [
  { title: "Periodic Table Explorer", description: "Interactive periodic table with atomic details.", icon: <Atom />, link: "/periodic-table-explorer", color: "bg-sky-500" },
  { title: "Molar Mass Calculator", description: "Calculate molecular weights from chemical formulas.", icon: <TestTube2 />, link: "/molar-mass-calculator", color: "bg-green-500" },
  { title: "DNA Sequence Analyzer", description: "Analyze and convert DNA sequences.", icon: <Dna />, link: "/dna-sequence-analyzer", color: "bg-purple-500" },
  { title: "pH Calculator", description: "Calculate pH values from hydrogen ion concentration.", icon: <FlaskConical />, link: "/ph-calculator", color: "bg-red-500" },
  { title: "Physics Formula Calculator", description: "Solve motion, force, energy formulas.", icon: <Sigma />, link: "/physics-formula-calculator", color: "bg-indigo-500" },
  { title: "Planet Weight Calculator", description: "Find your weight on other planets.", icon: <Globe2 />, link: "/planet-weight-calculator", color: "bg-yellow-500 text-black" },
  { title: "Astronomical Unit Converter", description: "Convert light-years, AU, parsecs, etc.", icon: <Telescope />, link: "/astronomical-unit-converter", color: "bg-pink-500" },
  { title: "Density Calculator", description: "Calculate mass, volume, or density.", icon: <Scale />, link: "/density-calculator", color: "bg-teal-500" },
  { title: "Calorimetry Calculator", description: "Find heat transfer values using q=mcΔT.", icon: <Thermometer />, link: "/calorimetry-calculator", color: "bg-orange-500" },
  { title: "Body Temperature Converter", description: "Convert Fahrenheit ↔ Celsius for medical use.", icon: <BrainCircuit />, link: "/body-temperature-converter", color: "bg-cyan-500" },
];

const ScienceTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Free Online Science Tools | Toolzenix</title>
        <meta 
          name="description" 
          content="Explore a collection of science tools: Periodic Table, Molar Mass Calculator, DNA Analyzer, pH Calculator, Physics Formulas, and more. 100% client-side."
        />
        <link rel="canonical" href="https://toolzenix.com/science-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <FlaskConical className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Science <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Discover and utilize a range of scientific calculators and explorers. All tools work directly in your browser.
          </p>
        </motion.div>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search science tools (e.g., Periodic Table, Molar Mass...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Search science tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800/70 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-transparent hover:border-blue-500/30 dark:border-gray-700/50 dark:hover:border-blue-500/50"
            >
              <Link to={tool.link} className="block group p-6 h-full flex flex-col">
                <div className="flex items-start space-x-4 mb-3">
                  <div className={`${tool.color} p-3 rounded-lg text-white shadow-md`}>
                    {React.cloneElement(tool.icon, { "aria-hidden": true, className: "w-6 h-6" })}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
                  {tool.description}
                </p>
                <div className="mt-4 text-right">
                   <span className="text-xs font-medium text-blue-500 dark:text-blue-400 group-hover:underline">
                    Use Tool &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
         {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FlaskConical className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">No tools found for "{searchQuery}".</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try a different search term or explore all tools.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-blue-600 via-sky-600 to-green-600 dark:from-blue-700 dark:via-sky-700 dark:to-green-700 rounded-xl p-8 sm:p-12 text-white text-center shadow-2xl"
        >
          <FlaskConical className="w-12 h-12 mx-auto text-sky-300 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Explore the World of Science!</h2>
          <p className="text-sky-100 dark:text-sky-200 max-w-xl mx-auto">
            All science tools are designed to be educational and easy to use. They work directly in your browser, ensuring privacy and instant access.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default ScienceTools;
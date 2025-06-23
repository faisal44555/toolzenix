import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HardDrive, Zap, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { systemToolRoutes } from '@/config/routeModules/systemToolRoutes';

const SystemTools = () => {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)", y: -5 }
  };
  
  const categoryTools = systemToolRoutes.filter(route => route.path !== '/system-tools');


  return (
    <>
      <Helmet>
        <title>System Tools - Toolzenix</title>
        <meta name="description" content="A collection of client-side system utilities to check your device's status, network info, and more. All processed in your browser for privacy." />
        <link rel="canonical" href="https://toolzenix.com/system-tools" />
        <meta property="og:title" content="System Tools - Toolzenix" />
        <meta property="og:description" content="Client-side utilities for system information, network analysis, and device status checks." />
        <meta property="og:url" content="https://toolzenix.com/system-tools" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolzenix.com/images/og-system-tools.png" /> 
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center">
            <HardDrive className="w-10 h-10 mr-4 text-blue-600 dark:text-blue-400" />
            System Utilities
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore our suite of client-side system tools. Check your IP, screen resolution, battery status, and more, all processed directly in your browser for enhanced privacy and speed.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categoryTools.map((tool) => (
            <motion.div
              key={tool.path}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out"
            >
              <Link to={tool.path} className="block p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                   <Zap className="w-8 h-8 text-blue-500 dark:text-blue-400 mr-3" />
                  <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">{tool.title}</h2>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow mb-4">
                  {tool.description || `Access the ${tool.title} tool.`}
                </p>
                <div className="mt-auto">
                    <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md transition-colors duration-150">
                        Open Tool <Info size={16} className="ml-2" />
                    </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
         <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 p-6 bg-blue-50 dark:bg-slate-800/50 rounded-lg shadow"
        >
          <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center">
            <Info className="w-6 h-6 mr-2 text-blue-500" /> Important Note
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            All system tools on Toolzenix operate entirely within your browser. We do not store or transmit any of your system data. Your privacy and security are paramount. These tools are designed for quick checks and informational purposes.
          </p>
        </motion.section>
      </div>
    </>
  );
};

export default SystemTools;
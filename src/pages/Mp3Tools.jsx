import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Music, ListMusic, Info, UploadCloud, Edit3, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mp3ToolRoutes } from '@/config/routeModules/mp3ToolRoutes';

const Mp3Tools = () => {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)", y: -5 }
  };
  
  const categoryTools = mp3ToolRoutes.filter(route => route.path !== '/mp3-tools');

  const getToolIcon = (path) => {
    switch(path) {
      case '/mp3-renamer':
        return <Edit3 className="w-8 h-8 text-purple-500 dark:text-purple-400 mr-3" />;
      case '/mp3-base64-converter':
        return <ArrowRightLeft className="w-8 h-8 text-purple-500 dark:text-purple-400 mr-3" />;
      case '/mp3-file-helper':
        return <UploadCloud className="w-8 h-8 text-purple-500 dark:text-purple-400 mr-3" />;
      default:
        return <ListMusic className="w-8 h-8 text-purple-500 dark:text-purple-400 mr-3" />;
    }
  };


  return (
    <>
      <Helmet>
        <title>MP3 Tools - Toolzenix</title>
        <meta name="description" content="A collection of powerful and easy-to-use MP3 audio tools. Play, view metadata, convert, and manage your MP3 files directly in your browser." />
        <link rel="canonical" href="https://toolzenix.com/mp3-tools" />
        <meta property="og:title" content="MP3 Tools - Toolzenix" />
        <meta property="og:description" content="Online MP3 utilities for playing, analyzing, and managing audio files." />
        <meta property="og:url" content="https://toolzenix.com/mp3-tools" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolzenix.com/images/og-mp3-tools.png" /> 
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center">
            <Music className="w-10 h-10 mr-4 text-purple-600 dark:text-purple-400" />
            MP3 Audio Utilities
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover our suite of MP3 tools designed for all your audio needs. Convert formats, rename files, and more, all processed securely in your browser.
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
                   {getToolIcon(tool.path)}
                  <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">{tool.title}</h2>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow mb-4">
                  {tool.description || `Access the ${tool.title} tool.`}
                </p>
                <div className="mt-auto">
                    <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-md transition-colors duration-150">
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
          className="mt-16 p-6 bg-purple-50 dark:bg-slate-800/50 rounded-lg shadow"
        >
          <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center">
            <Info className="w-6 h-6 mr-2 text-purple-500" /> Privacy First Audio Processing
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            All MP3 tools on Toolzenix process your audio files directly in your browser. Your files are not uploaded to any server, ensuring your privacy and data security. Enjoy fast and secure audio manipulation!
          </p>
        </motion.section>
      </div>
    </>
  );
};

export default Mp3Tools;
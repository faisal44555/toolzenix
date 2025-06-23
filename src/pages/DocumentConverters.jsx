import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, FileType, FilePlus, FileMinus, FileLock, FileKey, FileCode, Info, Settings, RotateCcw, Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { documentToolRoutes } from '@/config/routeModules/documentToolRoutes';

const DocumentConverters = () => {
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)", y: -5 }
  };

  const categoryTools = documentToolRoutes.filter(route => route.path !== '/document-tools');

  const getToolIcon = (path) => {
    if (path.includes('word') || path.includes('excel') || path.includes('powerpoint')) return <FileType className="w-8 h-8 text-blue-500 dark:text-blue-400 mr-3" />;
    if (path.includes('merge')) return <FilePlus className="w-8 h-8 text-green-500 dark:text-green-400 mr-3" />;
    if (path.includes('split')) return <FileMinus className="w-8 h-8 text-red-500 dark:text-red-400 mr-3" />;
    if (path.includes('protect')) return <FileLock className="w-8 h-8 text-purple-500 dark:text-purple-400 mr-3" />;
    if (path.includes('unlock')) return <FileKey className="w-8 h-8 text-yellow-500 dark:text-yellow-400 mr-3" />;
    if (path.includes('html')) return <FileCode className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mr-3" />;
    if (path.includes('rotate')) return <RotateCcw className="w-8 h-8 text-pink-500 dark:text-pink-400 mr-3" />;
    if (path.includes('editor')) return <Puzzle className="w-8 h-8 text-orange-500 dark:text-orange-400 mr-3" />;
    return <Settings className="w-8 h-8 text-gray-500 dark:text-gray-400 mr-3" />;
  };

  return (
    <>
      <Helmet>
        <title>Document Tools - Toolzenix</title>
        <meta name="description" content="A comprehensive suite of online document tools. Convert, merge, split, protect, and manage PDF, Word, Excel, and PowerPoint files securely in your browser." />
        <link rel="canonical" href="https://toolzenix.com/document-tools" />
        <meta property="og:title" content="Document Tools - Toolzenix" />
        <meta property="og:description" content="Online document utilities for PDF, Word, Excel, and more. Convert, merge, split, and manage your documents client-side." />
        <meta property="og:url" content="https://toolzenix.com/document-tools" />
        <meta property="og:image" content="https://toolzenix.com/images/og-document-tools.png" /> 
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center">
            <FileText className="w-10 h-10 mr-4 text-blue-600 dark:text-blue-400" />
            Document Processing Tools
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Manage your documents efficiently with our versatile online tools. Convert formats, merge or split files, add security, and more—all processed securely in your browser.
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
            <Info className="w-6 h-6 mr-2 text-blue-500" /> Secure & Private Document Handling
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            At Toolzenix, your privacy is paramount. All document processing tools operate entirely within your browser. Your files are never uploaded to any server, ensuring complete confidentiality and security.
          </p>
        </motion.section>
      </div>
    </>
  );
};

export default DocumentConverters;
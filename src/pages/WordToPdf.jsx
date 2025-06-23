import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Wrench } from "lucide-react";

const WordToPdf = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Word to PDF Converter - Free Online Tool | Toolzenix</title>
        <meta name="description" content="Convert .doc or .docx files to PDF format quickly and easily. Fully offline and secure Word to PDF conversion." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          📝➡️📄 Word to PDF Converter
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Convert your .doc or .docx files to PDF format quickly and easily. Fully offline and secure.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            ⚠️ This tool is currently not supported in browser-only mode.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please try one of our working tools listed below.
          </p>
          <Link to="/tools">
            <Button>
              <Wrench className="w-4 h-4 mr-2" />
              Explore Other Tools
            </Button>
          </Link>
        </div>
      </motion.div>
      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">About this tool</h2>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
          <li>This tool is designed to convert Word documents (.doc or .docx) to PDF format.</li>
          <li>The conversion process is intended to be fast, secure, and happen entirely within your browser.</li>
          <li>Note: This tool is temporarily unavailable. Please check back later or explore our other tools.</li>
        </ul>
      </div>
    </div>
  );
};

export default WordToPdf;
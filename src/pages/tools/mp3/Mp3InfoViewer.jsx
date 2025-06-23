import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileSearch, Info, AlertTriangle, Wrench } from 'lucide-react';
import ToolPageLayout from '@/components/layout/ToolPageLayout';

const Mp3InfoViewer = () => {
  return (
    <ToolPageLayout
      pageTitle="MP3 Info Viewer"
      pageDescription="Upload an MP3 file to view its duration, file size, and bitrate. Quick and easy, processed in your browser."
      canonicalPath="/mp3-info-viewer"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto"
      >
        <div className="flex flex-col items-center mb-6">
          <FileSearch className="w-12 h-12 text-orange-500 dark:text-orange-400 mb-3" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">MP3 Info Viewer</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              ⚠️ This tool is currently not supported in browser-only mode.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please try one of our working tools listed below.
            </p>
            <Link to="/tools">
                <Button variant="outline">
                    <Wrench className="w-4 h-4 mr-2" />
                    Explore Other Tools
                </Button>
            </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-4 bg-orange-50 dark:bg-slate-700/50 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300 mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2" /> About This Tool
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Upload an MP3 file to quickly view its file size, duration, and approximate bitrate. All information is processed directly in your browser.
          </p>
           <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            <AlertTriangle className="w-3 h-3 inline mr-1"/> Note: This tool is temporarily unavailable.
          </p>
        </motion.div>

      </motion.div>
    </ToolPageLayout>
  );
};

export default Mp3InfoViewer;
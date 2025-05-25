
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { ArrowLeft } from 'lucide-react';
    import { motion } from 'framer-motion';

    export function ToolPageHeader({ categoryId, categoryName, toolDisplayName, toolDescription }) {
      return (
        <>
          <div className="mb-8">
            <Button 
              variant="outline" 
              asChild 
              className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
            >
              <Link to={`/tools/${categoryId}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to {categoryName}</Link>
            </Button>
          </div>
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-center mb-10"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
              {toolDisplayName}
            </h1>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              {toolDescription}
            </p>
          </motion.div>
        </>
      );
    }
  
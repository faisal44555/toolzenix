import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Lightbulb, Type, Copy, RefreshCw } from 'lucide-react';

const titleTemplates = [
  "The Ultimate Guide to {keyword}",
  "X Shocking Facts About {keyword} You Didn't Know",
  "How to Master {keyword} in Just X Days",
  "Why {keyword} is More Important Than You Think",
  "The Beginner's Friendly Handbook for {keyword}",
  "{keyword}: Everything You Need to Know",
  "X Common Mistakes to Avoid with {keyword}",
  "The Future of {keyword}: Trends to Watch",
  "Unlocking the Secrets of {keyword}",
  "X Creative Ways to Use {keyword}",
  "Is {keyword} Dead? Here's the Truth",
  "The Pro's Guide to {keyword} Success",
  "How {keyword} Can Change Your Life",
  "X Actionable Tips for Better {keyword}",
  "{keyword} Explained: A Simple Overview"
];

const BlogTitleGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const { toast } = useToast();

  const generateTitles = () => {
    if (!keyword.trim()) {
      toast({
        title: 'Keyword Missing',
        description: 'Please enter a keyword or topic to generate titles.',
        variant: 'destructive',
      });
      setGeneratedTitles([]);
      return;
    }
    const shuffledTemplates = [...titleTemplates].sort(() => 0.5 - Math.random());
    const newTitles = shuffledTemplates.slice(0, 5).map(template => 
      template.replace(/\{keyword\}/g, keyword.trim()).replace(/X/g, Math.floor(Math.random() * 10) + 3) // Replace X with random number 3-12
    );
    setGeneratedTitles(newTitles);
    toast({ title: 'Titles Generated!', description: 'Check out your new blog title ideas.' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: `"${text}" copied to clipboard.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Blog Title Generator - Catchy Headlines | Toolzenix</title>
        <meta name="description" content="Generate catchy and SEO-friendly blog titles and headlines based on your keywords. Get instant ideas to boost your content's click-through rate." />
        <link rel="canonical" href="https://toolzenix.com/blog-title-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Type className="w-16 h-16 text-rose-500 dark:text-rose-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Blog Title Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Instantly generate engaging blog titles for your content.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="keyword-btg" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <Lightbulb className="w-4 h-4 mr-2 text-rose-500" /> Enter Your Main Keyword or Topic
            </Label>
            <Input
              id="keyword-btg"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., Digital Marketing, Healthy Recipes"
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          
          <Button onClick={generateTitles} className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white py-3 text-lg flex items-center justify-center">
            <RefreshCw className="w-5 h-5 mr-2" /> Generate Titles
          </Button>

          {generatedTitles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Generated Titles:</h3>
              <ul className="space-y-3">
                {generatedTitles.map((title, index) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-rose-50 dark:bg-gray-700/50 rounded-lg shadow-sm">
                    <span className="text-gray-700 dark:text-gray-200 flex-grow">{title}</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(title)} className="ml-3 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-700/50">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default BlogTitleGenerator;
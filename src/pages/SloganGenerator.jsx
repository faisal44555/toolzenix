import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Lightbulb, Copy, RefreshCw, CheckCircle2 } from 'lucide-react';

const sloganPatterns = [
  "The Future of {keyword}.",
  "{keyword}: Redefined.",
  "Experience the Power of {keyword}.",
  "Unlock Your Potential with {keyword}.",
  "Simply {keyword}.",
  "{keyword} for a Better Tomorrow.",
  "Your Trusted Source for {keyword}.",
  "Innovate with {keyword}.",
  "The Ultimate {keyword} Solution.",
  "Discover {keyword}.",
  "{keyword} - Quality You Can Trust.",
  "Get More with {keyword}.",
  "The Smart Choice for {keyword}.",
  "Transforming {industry} with {keyword}.",
  "{keyword}: Built for You.",
  "Achieve Excellence with {keyword}.",
  "The Heart of Your {related_concept}.",
  "{keyword}. It's That Simple.",
  "Powering Your {related_concept} with {keyword}.",
  "Your Journey to {benefit} Starts with {keyword}."
];

const adjectives = ["Innovative", "Powerful", "Simple", "Trusted", "Ultimate", "Smart", "Next-Gen", "Sustainable", "Creative", "Dynamic"];
const nouns = ["Solutions", "Technology", "Systems", "Platform", "Future", "Innovation", "Growth", "Success", "Performance", "Experience"];
const verbs = ["Discover", "Unlock", "Experience", "Achieve", "Transform", "Innovate", "Build", "Create", "Empower", "Drive"];
const benefits = ["Success", "Growth", "Efficiency", "Productivity", "Innovation", "Results", "Performance", "Potential", "Freedom", "Clarity"];

const SloganGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState('');
  const [generatedSlogans, setGeneratedSlogans] = useState([]);
  const { toast } = useToast();

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateSlogans = () => {
    if (!keyword.trim()) {
      toast({ title: 'Keyword Required', description: 'Please enter a keyword for your brand or product.', variant: 'destructive' });
      return;
    }

    const newSlogans = [];
    const numSlogans = 5; // Generate 5 slogans at a time

    for (let i = 0; i < numSlogans; i++) {
      let pattern = getRandomElement(sloganPatterns);
      let slogan = pattern.replace(/{keyword}/g, keyword.trim());
      
      // Fill other placeholders if present
      if (slogan.includes("{industry}")) {
        slogan = slogan.replace(/{industry}/g, industry.trim() || "Your Industry");
      }
      if (slogan.includes("{related_concept}")) {
        slogan = slogan.replace(/{related_concept}/g, getRandomElement(nouns));
      }
      if (slogan.includes("{benefit}")) {
        slogan = slogan.replace(/{benefit}/g, getRandomElement(benefits));
      }
      // Add more dynamic parts
      if (Math.random() < 0.3) { // 30% chance to prepend an adjective
        slogan = `${getRandomElement(adjectives)} ${slogan}`;
      }
       if (Math.random() < 0.2 && i > 1) { // 20% chance to add a verb-based phrase
        slogan = `${getRandomElement(verbs)} ${keyword}. ${slogan}`;
      }

      newSlogans.push(slogan.charAt(0).toUpperCase() + slogan.slice(1)); // Capitalize first letter
    }
    setGeneratedSlogans(newSlogans);
    toast({ title: 'Slogans Generated!', description: `${numSlogans} new slogans created.`, action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = (slogan) => {
    navigator.clipboard.writeText(slogan)
      .then(() => toast({ title: 'Slogan Copied!', description: `"${slogan}" copied to clipboard.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Slogan Generator | Toolzenix</title>
        <meta name="description" content="Generate catchy and creative slogans for your brand, product, or service. Enter a keyword and get instant slogan ideas." />
        <link rel="canonical" href="https://toolzenix.com/slogan-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Lightbulb className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Slogan Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Instantly create catchy slogans for your brand or product.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div>
              <Label htmlFor="keyword-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Primary Keyword (Required)</Label>
              <Input
                id="keyword-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., Coffee, Tech, Fitness"
                className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="industry-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Industry/Niche (Optional)</Label>
              <Input
                id="industry-input"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g., SaaS, Retail, Healthcare"
                className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
          
          <Button onClick={generateSlogans} className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-lg py-3">
            <RefreshCw className="w-5 h-5 mr-2" /> Generate Slogans
          </Button>

          {generatedSlogans.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">Generated Slogans:</h2>
              <ul className="space-y-3">
                {generatedSlogans.map((slogan, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <span className="text-md text-gray-700 dark:text-gray-200">{slogan}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(slogan)} className="text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Crafting the Perfect Slogan</h2>
          <p>
            A good slogan is memorable, concise, and clearly communicates the essence or benefit of your brand. This tool uses a variety of patterns and keywords to spark ideas.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter a primary keyword related to your brand, product, or service.</li>
            <li>Optionally, provide an industry or niche for more targeted suggestions.</li>
            <li>Click "Generate Slogans" to see a list of ideas.</li>
            <li>Generate multiple times to explore different combinations.</li>
          </ul>
          <p>Use these generated slogans as inspiration. You might find the perfect one, or they could lead you to an even better idea of your own!</p>
        </motion.div>
      </div>
    </>
  );
};

export default SloganGenerator;
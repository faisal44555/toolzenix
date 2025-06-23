import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Speaker, Lightbulb, Copy, RefreshCw } from 'lucide-react';

const adCopyTemplates = {
  headline: [
    "Unlock {benefit} with {product}!",
    "Discover {product}: Your Solution for {problem}",
    "Get {product} Now and Experience {benefit}",
    "Limited Time: {product} for {targetAudience}!",
    "The Secret to {benefit}? It's {product}.",
  ],
  description: [
    "Tired of {problem}? {product} offers {feature1}, {feature2}, and {feature3} to help you achieve {benefit}. Perfect for {targetAudience}. Learn more today!",
    "Join thousands of satisfied {targetAudience} using {product} to {benefit}. With its unique {feature1} and {feature2}, you'll wonder how you lived without it. Get started now!",
    "Stop struggling with {problem}. {product} is designed for {targetAudience} seeking {benefit}. Key features include {feature1} and {feature2}. Click to find out more!",
  ],
  cta: [
    "Shop Now", "Learn More", "Get Started", "Sign Up Free", "Book Today", "Download Now", "Claim Your Offer"
  ]
};

const AdCopyGenerator = () => {
  const [productName, setProductName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keyBenefit, setKeyBenefit] = useState('');
  const [problemSolved, setProblemSolved] = useState('');
  const [feature1, setFeature1] = useState('');
  const [feature2, setFeature2] = useState('');
  const [generatedAds, setGeneratedAds] = useState([]);
  const { toast } = useToast();

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateAdCopy = () => {
    if (!productName || !targetAudience || !keyBenefit) {
      toast({
        title: 'Missing Information',
        description: 'Product Name, Target Audience, and Key Benefit are required.',
        variant: 'destructive',
      });
      setGeneratedAds([]);
      return;
    }

    const ads = [];
    for (let i = 0; i < 3; i++) { // Generate 3 ad variations
      let headline = getRandomElement(adCopyTemplates.headline);
      let description = getRandomElement(adCopyTemplates.description);
      const cta = getRandomElement(adCopyTemplates.cta);

      const replacements = {
        '{product}': productName,
        '{targetAudience}': targetAudience,
        '{benefit}': keyBenefit,
        '{problem}': problemSolved || 'common challenges',
        '{feature1}': feature1 || 'amazing results',
        '{feature2}': feature2 || 'powerful performance',
        '{feature3}': 'unbeatable value' // A default for the third feature if not provided
      };
      
      for (const placeholder in replacements) {
        headline = headline.replace(new RegExp(placeholder, 'g'), replacements[placeholder]);
        description = description.replace(new RegExp(placeholder, 'g'), replacements[placeholder]);
      }
      ads.push({ headline, description, cta });
    }
    setGeneratedAds(ads);
    toast({ title: 'Ad Copy Generated!', description: 'Review your compelling new ad variations.' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: 'Copied!', description: `Ad copy copied to clipboard.` }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Ad Copy Generator - Marketing Ad Copy | Toolzenix</title>
        <meta name="description" content="Generate compelling marketing ad copy (headlines, descriptions, CTAs) based on your product, audience, and benefits. Get instant ad ideas." />
        <link rel="canonical" href="https://toolzenix.com/ad-copy-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Speaker className="w-16 h-16 text-lime-500 dark:text-lime-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Ad Copy Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Create persuasive ad copy for your marketing campaigns.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="productName-acg" className="text-gray-700 dark:text-gray-300">Product/Service Name (Required)</Label>
            <Input id="productName-acg" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g., SuperWidget X" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div>
            <Label htmlFor="targetAudience-acg" className="text-gray-700 dark:text-gray-300">Target Audience (Required)</Label>
            <Input id="targetAudience-acg" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="e.g., Busy Professionals, Home Gardeners" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div>
            <Label htmlFor="keyBenefit-acg" className="text-gray-700 dark:text-gray-300">Key Benefit (Required)</Label>
            <Input id="keyBenefit-acg" value={keyBenefit} onChange={(e) => setKeyBenefit(e.target.value)} placeholder="e.g., Save Time, Grow Beautiful Plants" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
           <div>
            <Label htmlFor="problemSolved-acg" className="text-gray-700 dark:text-gray-300">Problem Solved (Optional)</Label>
            <Input id="problemSolved-acg" value={problemSolved} onChange={(e) => setProblemSolved(e.target.value)} placeholder="e.g., Tedious Manual Tasks, Pest Infestations" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="feature1-acg" className="text-gray-700 dark:text-gray-300">Feature 1 (Optional)</Label>
              <Input id="feature1-acg" value={feature1} onChange={(e) => setFeature1(e.target.value)} placeholder="e.g., Automated Scheduling" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div>
              <Label htmlFor="feature2-acg" className="text-gray-700 dark:text-gray-300">Feature 2 (Optional)</Label>
              <Input id="feature2-acg" value={feature2} onChange={(e) => setFeature2(e.target.value)} placeholder="e.g., Organic Ingredients" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
          </div>
          
          <Button onClick={generateAdCopy} className="w-full bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white py-3 text-lg flex items-center justify-center">
            <RefreshCw className="w-5 h-5 mr-2" /> Generate Ad Copy
          </Button>

          {generatedAds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Generated Ad Copy:</h3>
              {generatedAds.map((ad, index) => (
                <div key={index} className="p-4 bg-lime-50 dark:bg-gray-700/50 rounded-lg shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-lime-700 dark:text-lime-300">Headline: <span className="font-normal text-gray-800 dark:text-gray-100">{ad.headline}</span></p>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`Headline: ${ad.headline}\nDescription: ${ad.description}\nCTA: ${ad.cta}`)} className="ml-2 text-lime-500 hover:bg-lime-100 dark:hover:bg-lime-700/50">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Description: {ad.description}</p>
                  <p className="text-sm font-medium text-lime-600 dark:text-lime-400">CTA: <span className="bg-lime-200 dark:bg-lime-800 px-2 py-0.5 rounded">{ad.cta}</span></p>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default AdCopyGenerator;
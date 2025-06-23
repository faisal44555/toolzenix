import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Hash, Copy, RefreshCw, CheckCircle2, AlertTriangle, Tag } from 'lucide-react';
import { Link } from "react-router-dom";

// Sample hashtag categories and related tags
const hashtagCategories = {
  travel: ["instatravel", "travelgram", "wanderlust", "adventure", "explore", "vacation", "travelphotography", "beautifuldestinations", "passionpassport", "travelblogger"],
  food: ["foodie", "instafood", "foodporn", "foodphotography", "delicious", "yummy", "homemade", "foodblogger", "healthyfood", "veganfood", "dessert"],
  fitness: ["fitnessmotivation", "gymlife", "workout", "fitfam", "healthylifestyle", "training", "getfit", "fitspo", "bodybuilding", "cardio", "strong"],
  fashion: ["ootd", "style", "instafashion", "fashionblogger", "streetstyle", "lookbook", "fashionista", "outfitoftheday", "stylish", "mensfashion", "womensfashion"],
  photography: ["photographer", "photooftheday", "capture", "art", "instagood", "picoftheday", "exposure", "composition", "focus", "moment", "landscapephotography", "portraitphotography"],
  tech: ["technology", "innovation", "gadgets", "instatech", "futuretech", "coding", "developer", "software", "ai", "programming"],
  business: ["entrepreneur", "startup", "marketing", "smallbusiness", "success", "motivation", "leadership", "digitalmarketing", "hustle", "goals"],
  art: ["artist", "artwork", "instaart", "creative", "drawing", "painting", "illustration", "artoftheday", "digitalart", "sculpture"],
  music: ["musician", "instamusic", "song", "newmusic", "livemusic", "concert", "singer", "producer", "dj", "beats"],
  nature: ["naturephotography", "landscape", "beautiful", "outdoors", "adventure", "explore", "wildlife", "mothernature", "getoutside", "earth"],
};

const generalHashtags = ["instagood", "photooftheday", "picoftheday", "love", "beautiful", "happy", "cute", "followme", "like4like", "instadaily", "instalike", "amazing", "life", "bestoftheday"];

const HashtagGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [numHashtags, setNumHashtags] = useState(15);
  const [generatedHashtags, setGeneratedHashtags] = useState([]);
  const { toast } = useToast();

  const generateHashtags = () => {
    if (!keyword.trim()) {
      toast({ title: 'Keyword Required', description: 'Please enter a keyword to generate hashtags.', variant: 'destructive', action: <AlertTriangle /> });
      return;
    }

    const lowerKeyword = keyword.toLowerCase().trim();
    let newHashtags = new Set();

    // Add the keyword itself as a hashtag
    newHashtags.add(`#${lowerKeyword.replace(/\s+/g, '')}`);

    // Find matching categories
    Object.keys(hashtagCategories).forEach(category => {
      if (lowerKeyword.includes(category) || category.includes(lowerKeyword)) {
        hashtagCategories[category].forEach(tag => newHashtags.add(`#${tag}`));
      }
    });
    
    // Add some variations of the keyword
    newHashtags.add(`#${lowerKeyword}lover`);
    newHashtags.add(`#${lowerKeyword}life`);
    newHashtags.add(`#${lowerKeyword}gram`);
    newHashtags.add(`#best${lowerKeyword}`);


    // Add general hashtags to fill up if needed
    let generalIndex = 0;
    while (newHashtags.size < numHashtags && generalIndex < generalHashtags.length) {
      newHashtags.add(`#${generalHashtags[generalIndex]}`);
      generalIndex++;
    }
    
    // If still not enough, create more variations or generic popular ones
    const popularSuffixes = ["tips", "ideas", "community", "inspiration", "daily", "vibes", "goals", "style", "art", "world"];
    let suffixIndex = 0;
    while (newHashtags.size < numHashtags && suffixIndex < popularSuffixes.length) {
        newHashtags.add(`#${lowerKeyword}${popularSuffixes[suffixIndex]}`);
        suffixIndex++;
    }


    const finalHashtags = Array.from(newHashtags).slice(0, numHashtags);
    setGeneratedHashtags(finalHashtags);
    toast({ title: 'Hashtags Generated!', description: `${finalHashtags.length} hashtags are ready.`, action: <CheckCircle2 className="text-green-500" /> });
  };

  const handleCopyToClipboard = () => {
    if (generatedHashtags.length === 0) {
      toast({ title: 'Nothing to Copy', description: 'Generate hashtags first.', variant: 'destructive' });
      return;
    }
    const hashtagsString = generatedHashtags.join(' ');
    navigator.clipboard.writeText(hashtagsString)
      .then(() => toast({ title: 'Hashtags Copied!', description: 'Hashtags copied to clipboard.' }))
      .catch(() => toast({ title: 'Copy Failed', variant: 'destructive' }));
  };

  return (
    <>
      <Helmet>
        <title>Hashtag Generator - Boost Social Media Reach | Toolzenix</title>
        <meta name="description" content="Generate relevant and trending hashtags for your social media posts (Instagram, Twitter, TikTok, etc.). Enter a keyword, specify the number of hashtags, and get instant suggestions to increase visibility." />
        <link rel="canonical" href="https://toolzenix.com/hashtag-generator" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Hash className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Hashtag Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Boost your post's reach with relevant hashtags. Find the perfect tags for Instagram, Twitter, TikTok, and more.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div>
              <Label htmlFor="keyword-input" className="text-md font-medium text-gray-700 dark:text-gray-300">Enter a Keyword</Label>
              <Input
                id="keyword-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., travel, food, fitness"
                className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="num-hashtags" className="text-md font-medium text-gray-700 dark:text-gray-300">Number of Hashtags (max 30)</Label>
              <Input
                id="num-hashtags"
                type="number"
                value={numHashtags}
                onChange={(e) => setNumHashtags(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
                className="mt-1 text-lg p-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
          
          <Button onClick={generateHashtags} className="w-full mt-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg py-3">
            <RefreshCw className="w-5 h-5 mr-2" /> Generate Hashtags
          </Button>

          {generatedHashtags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Generated Hashtags:</h2>
                <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/30">
                  <Copy className="w-3.5 h-3.5 mr-1.5" /> Copy All
                </Button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md flex flex-wrap gap-2">
                {generatedHashtags.map((tag, index) => (
                  <span key={index} className="px-2.5 py-1 bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700" onClick={() => {
                    navigator.clipboard.writeText(tag);
                    toast({description: `${tag} copied!`});
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">About Our Hashtag Generator</h2>
          <p>
            Our Hashtag Generator helps you discover relevant and popular hashtags to increase the visibility and engagement of your social media posts. By entering a keyword related to your content, the tool suggests a list of hashtags, combining your keyword with common suffixes, category-specific tags, and general popular tags. This mix aims to provide a balanced set of hashtags that can reach both broad and niche audiences.
          </p>
          <p>
            Using the right hashtags is crucial for social media strategy. They help categorize your content, making it discoverable to users interested in your topic. This tool simplifies the process of finding suitable hashtags, saving you time and effort. For creating engaging text content to go with your hashtags, try our <Link to="/caption-generator">Caption Generator</Link>. Explore more <Link to="/social-media-tools">Social Media Tools</Link> to optimize your online presence.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Tips for Using Hashtags Effectively:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Mix It Up:</strong> Use a combination of broad (e.g., #travel), niche-specific (e.g., #backpackingasia), and branded hashtags (e.g., #YourBrandName).</li>
            <li><strong>Check Relevance:</strong> Ensure the hashtags accurately reflect your content and target audience. Irrelevant hashtags can be counterproductive.</li>
            <li><strong>Don't Overdo It:</strong> While platforms like Instagram allow up to 30 hashtags, quality often beats quantity. Aim for 10-20 highly relevant tags for optimal results.</li>
            <li><strong>Research Trending Tags:</strong> Keep an eye on what's popular in your niche. This tool provides a starting point, but also observe what successful accounts in your field are using.</li>
            <li><strong>Consider Placement:</strong> You can include hashtags directly in your caption or in the first comment (especially on Instagram) to keep your caption cleaner.</li>
            <li><strong>Analyze Performance:</strong> Pay attention to which hashtags seem to drive more engagement for your posts and adjust your strategy accordingly.</li>
          </ul>
          <p>This generator uses a predefined set of popular and category-based hashtags. For deep trending analysis and real-time hashtag popularity, specialized social media analytics tools are recommended. Browse <Link to="/tools">all our tools</Link> for more utilities.</p>
        </motion.div>
      </div>
    </>
  );
};

export default HashtagGenerator;
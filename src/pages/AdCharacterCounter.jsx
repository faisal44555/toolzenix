import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Baseline, TextCursorInput } from 'lucide-react';

const adPlatforms = {
  googleAdsSearchHeadline: { name: "Google Ads - Search Headline", charLimit: 30, wordLimit: null },
  googleAdsSearchDescription: { name: "Google Ads - Search Description", charLimit: 90, wordLimit: null },
  facebookPrimaryText: { name: "Facebook/Instagram - Primary Text", charLimit: 125, wordLimit: null, note: "Recommended for mobile, can be longer." },
  facebookHeadline: { name: "Facebook/Instagram - Headline", charLimit: 40, wordLimit: null },
  twitterX: { name: "Twitter/X - Post", charLimit: 280, wordLimit: null },
  linkedinPost: { name: "LinkedIn - Post (Company)", charLimit: 700, wordLimit: null },
  linkedinArticleHeadline: { name: "LinkedIn - Article Headline", charLimit: 100, wordLimit: null },
  tiktokCaption: { name: "TikTok - Caption", charLimit: 150, wordLimit: null }, 
  custom: { name: "Custom", charLimit: null, wordLimit: null }
};


const AdCharacterCounter = () => {
  const [text, setText] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('googleAdsSearchHeadline');
  const [counts, setCounts] = useState({ chars: 0, words: 0, lines: 0 });
  
  const platformDetails = adPlatforms[selectedPlatform];

  useEffect(() => {
    const charCount = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lineCount = text.split('\n').length;
    setCounts({ chars: charCount, words: wordCount, lines: lineCount });
  }, [text]);

  const getProgressColor = (current, limit) => {
    if (limit === null) return 'bg-gray-400'; 
    const percentage = (current / limit) * 100;
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 85) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <>
      {/* Helmet is now handled by ToolPageLayout */}
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Baseline className="w-16 h-16 text-fuchsia-500 dark:text-fuchsia-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Ad Character Counter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Check character and word counts for various ad platforms.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div>
            <Label htmlFor="adPlatformSelect" className="text-gray-700 dark:text-gray-300">Select Ad Platform/Type</Label>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger id="adPlatformSelect" className="mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Choose platform..." />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white max-h-72">
                {Object.entries(adPlatforms).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {platformDetails.note && <p className="text-xs text-fuchsia-600 dark:text-fuchsia-400 mt-1">{platformDetails.note}</p>}
          </div>

          <div>
            <Label htmlFor="adText" className="flex items-center mb-1 text-gray-700 dark:text-gray-300">
              <TextCursorInput className="w-4 h-4 mr-2 text-fuchsia-500" /> Enter Your Ad Text
            </Label>
            <Textarea
              id="adText"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Paste or type your ad copy for ${platformDetails.name}...`}
              className="min-h-[150px] dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={6}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-fuchsia-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Characters</p>
              <p className="text-2xl font-bold text-fuchsia-600 dark:text-fuchsia-300">{counts.chars}</p>
            </div>
            <div className="p-3 bg-fuchsia-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Words</p>
              <p className="text-2xl font-bold text-fuchsia-600 dark:text-fuchsia-300">{counts.words}</p>
            </div>
            <div className="p-3 bg-fuchsia-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">Lines</p>
              <p className="text-2xl font-bold text-fuchsia-600 dark:text-fuchsia-300">{counts.lines}</p>
            </div>
          </div>
          
          {platformDetails.charLimit !== null && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Character Limit: {counts.chars} / {platformDetails.charLimit}</span>
                {counts.chars > platformDetails.charLimit && 
                  <span className="text-red-500 font-semibold">Over limit by {counts.chars - platformDetails.charLimit}</span>
                }
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`${getProgressColor(counts.chars, platformDetails.charLimit)} h-2.5 rounded-full transition-all duration-300`} 
                  style={{ width: `${Math.min((counts.chars / platformDetails.charLimit) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {platformDetails.wordLimit !== null && (
             <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Word Limit: {counts.words} / {platformDetails.wordLimit}</span>
                 {counts.words > platformDetails.wordLimit && 
                  <span className="text-red-500 font-semibold">Over limit by {counts.words - platformDetails.wordLimit}</span>
                }
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`${getProgressColor(counts.words, platformDetails.wordLimit)} h-2.5 rounded-full transition-all duration-300`}
                  style={{ width: `${Math.min((counts.words / platformDetails.wordLimit) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* SocialShareButtons is now handled by ToolPageLayout */}
      </div>
    </>
  );
};

export default AdCharacterCounter;
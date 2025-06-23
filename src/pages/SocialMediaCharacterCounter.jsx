import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Type, Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';

const platformLimits = {
  twitter: { name: 'Twitter/X', limit: 280, icon: <Twitter className="w-5 h-5 text-sky-500" /> },
  instagramCaption: { name: 'Instagram Caption', limit: 2200, icon: <Instagram className="w-5 h-5 text-pink-500" /> },
  instagramBio: { name: 'Instagram Bio', limit: 150, icon: <Instagram className="w-5 h-5 text-pink-500" /> },
  facebookPost: { name: 'Facebook Post', limit: 63206, icon: <Facebook className="w-5 h-5 text-blue-600" /> }, // Technically very high
  linkedinPost: { name: 'LinkedIn Post', limit: 3000, icon: <Linkedin className="w-5 h-5 text-blue-700" /> }, // For articles it's much higher
  tiktokCaption: { name: 'TikTok Caption', limit: 2200, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 6.5a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z"></path><path d="M16.5 6.5v11"></path><path d="M16.5 12A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 4.5 4.5Z"></path><path d="M7.5 17.5v-11"></path><path d="M7.5 12a4.5 4.5 0 1 0 4.5 4.5 4.5 4.5 0 0 0-4.5-4.5Z"></path></svg> },
};

const SocialMediaCharacterCounter = () => {
  const [text, setText] = useState('');
  const [counts, setCounts] = useState({ characters: 0, words: 0, paragraphs: 0, sentences: 0 });

  useEffect(() => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim() !== '').length : 0;
    const sentences = text.trim() ? (text.match(/[.!?]+(\s|$)/g) || []).length : 0;
    if (sentences === 0 && characters > 0 && !/[.!?]$/.test(text.trim())) { // If no sentence-ending punctuation but text exists, count as 1 sentence
        setCounts({ characters, words, paragraphs, sentences: words > 0 ? 1: 0 });
    } else {
        setCounts({ characters, words, paragraphs, sentences });
    }
  }, [text]);

  return (
    <>
      <Helmet>
        <title>Social Media Character Counter | Toolzenix</title>
        <meta name="description" content="Count characters, words, and paragraphs for your social media posts. Check limits for Twitter/X, Instagram, Facebook, LinkedIn, and TikTok." />
        <link rel="canonical" href="https://toolzenix.com/social-media-character-counter" />
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Type className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Social Media Character Counter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Stay within limits! Count characters, words, and more for your posts.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <Label htmlFor="text-input" className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Paste Your Text Here
            </Label>
            <Textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your social media post content..."
              className="mt-2 min-h-[180px] text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{counts.characters}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Characters</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{counts.words}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Words</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{counts.sentences}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sentences</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{counts.paragraphs}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Paragraphs</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Platform Limits:</h3>
          <div className="space-y-3">
            {Object.entries(platformLimits).map(([key, platform]) => {
              const percentage = Math.min(100, (counts.characters / platform.limit) * 100);
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                      {platform.icon && React.cloneElement(platform.icon, { className: "w-4 h-4 mr-2"})}
                      {platform.name}
                    </span>
                    <span className={`text-xs ${counts.characters > platform.limit ? 'text-red-500 dark:text-red-400 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                      {counts.characters} / {platform.limit}
                    </span>
                  </div>
                  <Progress value={percentage} className={`h-2 ${counts.characters > platform.limit ? 'bg-red-200 dark:bg-red-700 [&>div]:bg-red-500' : 'bg-indigo-100 dark:bg-indigo-700 [&>div]:bg-indigo-500'}`} />
                </div>
              );
            })}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 prose dark:prose-invert max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
        >
          <h2 className="text-2xl font-semibold">Why Character Counts Matter</h2>
          <p>
            Each social media platform has its own limits for posts, bios, and captions. Exceeding these limits can result in your content being cut off or rejected. This tool helps you quickly check your text against common platform constraints.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Instantly see character, word, sentence, and paragraph counts.</li>
            <li>Visual progress bars show how close you are to platform limits.</li>
            <li>Optimize your content for maximum impact within the given constraints.</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default SocialMediaCharacterCounter;
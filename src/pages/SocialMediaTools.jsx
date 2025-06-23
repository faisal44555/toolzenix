import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from '@/components/ui/input';
import { Search, Instagram, Twitter, Youtube, MessageSquare, Hash, Image as ImageIconLucide, CalendarDays, Edit3, AtSign, Smile, Share2 } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const tools = [
  { title: "Instagram Bio Generator", description: "Craft stylish and effective bios for your Instagram profile.", icon: <Instagram />, link: "/instagram-bio-generator", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { title: "Hashtag Generator", description: "Generate trending and relevant hashtags based on keywords.", icon: <Hash />, link: "/hashtag-generator", color: "bg-blue-500" },
  { title: "Social Media Image Resizer", description: "Resize images for Instagram, Facebook, Twitter, etc.", icon: <ImageIconLucide />, link: "/social-media-image-resizer", color: "bg-teal-500" },
  { title: "Post Scheduler Planner", description: "Visually plan your social media posts (frontend only).", icon: <CalendarDays />, link: "/post-scheduler-planner", color: "bg-sky-500" },
  { title: "Tweet Generator", description: "Generate tweet ideas within character limits.", icon: <Twitter />, link: "/tweet-generator", color: "bg-blue-400" },
  { title: "YouTube Tag Extractor", description: "Extract tags from YouTube video text content.", icon: <Youtube />, link: "/youtube-tag-extractor", color: "bg-red-600" },
  { title: "Caption Generator", description: "Generate engaging captions for your social posts.", icon: <MessageSquare />, link: "/caption-generator", color: "bg-indigo-500" },
  { title: "Profile Picture Cropper", description: "Crop images perfectly for social media profiles.", icon: <AtSign />, link: "/profile-picture-cropper", color: "bg-green-500" },
  { title: "Social Media Character Counter", description: "Count characters/words for social media limits.", icon: <Edit3 />, link: "/social-media-character-counter", color: "bg-orange-500" },
  { title: "Emoji Picker & Inserter", description: "Easily find and insert emojis into your content.", icon: <Smile />, link: "/emoji-picker-inserter", color: "bg-yellow-500 text-black" },
];

const SocialMediaTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Free Social Media Tools | Toolzenix</title>
        <meta 
          name="description" 
          content="Elevate your social media game with Toolzenix's suite of free tools: Bio Generator, Hashtag Generator, Image Resizer, Post Planner, and more. All client-side & easy to use."
        />
        <link rel="canonical" href="https://toolzenix.com/social-media-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 rounded-full mb-4">
            <Share2 className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Social Media <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Tools</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Boost your online presence with our collection of handy, browser-based social media utilities.
          </p>
        </motion.div>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search social media tools (e.g., Hashtag, Bio, Planner...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
              aria-label="Search social media tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800/70 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-transparent hover:border-purple-500/30 dark:border-gray-700/50 dark:hover:border-purple-500/50"
            >
              <Link to={tool.link} className="block group p-6 h-full flex flex-col">
                <div className="flex items-start space-x-4 mb-3">
                  <div className={`${tool.color} p-3 rounded-lg text-white shadow-md`}>
                    {React.cloneElement(tool.icon, { "aria-hidden": true, className: "w-6 h-6" })}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {tool.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
                  {tool.description}
                </p>
                <div className="mt-4 text-right">
                   <span className="text-xs font-medium text-purple-500 dark:text-purple-400 group-hover:underline">
                    Use Tool &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
         {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Share2 className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">No tools found for "{searchQuery}".</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try a different search term or explore all tools.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-purple-700 dark:via-pink-600 dark:to-red-600 rounded-xl p-8 sm:p-12 text-white text-center shadow-2xl"
        >
          <Instagram className="w-12 h-12 mx-auto text-pink-200 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Level Up Your Social Media Game!</h2>
          <p className="text-purple-100 dark:text-purple-200 max-w-xl mx-auto">
            All our social media tools are free, easy to use, and work directly in your browser. No downloads, no sign-ups!
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default SocialMediaTools;
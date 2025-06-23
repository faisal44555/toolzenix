import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { Search, Sparkles, Dice5, Smile, Brain, MessageCircle as MessageCircleQuestion, Wand2, User, CalendarDays, Timer, Cookie, Dices, Gift, MessageSquare as MessageSquareText, Lightbulb, Languages, Coins, Hand } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { allToolCategories } from "@/config/navigation";
import { cn } from "@/lib/utils";


const tools = [
  { title: "Random Number Generator", description: "Generate random numbers within a specified range.", icon: <Dice5 />, link: "/random-number-generator", color: "bg-blue-500" },
  { title: "Joke Generator", description: "Get a random joke to brighten your day.", icon: <Smile />, link: "/joke-generator", color: "bg-green-500" },
  { title: "Would You Rather Generator", description: "Get fun 'Would You Rather' questions.", icon: <Brain />, link: "/would-you-rather-generator", color: "bg-purple-500" },
  { title: "Truth or Dare Generator", description: "Generate Truth or Dare questions.", icon: <MessageCircleQuestion />, link: "/truth-or-dare-generator", color: "bg-red-500" },
  { title: "Magic 8 Ball", description: "Ask the Magic 8 Ball a yes/no question.", icon: <Wand2 />, link: "/magic-8-ball", color: "bg-indigo-500" },
  { title: "Nickname Generator", description: "Generate cool and fun nicknames.", icon: <User />, link: "/nickname-generator", color: "bg-yellow-500 text-black" },
  { title: "Age Calculator", description: "Quickly calculate age from birth date.", icon: <CalendarDays />, link: "/misc-age-calculator", color: "bg-pink-500" },
  { title: "Countdown Timer", description: "Set a timer for any event or task.", icon: <Timer />, link: "/countdown-timer", color: "bg-teal-500" },
  { title: "Fortune Cookie Generator", description: "Open a virtual fortune cookie.", icon: <Cookie />, link: "/fortune-cookie-generator", color: "bg-orange-500" },
  { title: "Dice Roller", description: "Roll one or more virtual dice.", icon: <Dices />, link: "/dice-roller", color: "bg-cyan-500" },
  { title: "Birthday Countdown", description: "Count down to your next birthday.", icon: <Gift />, link: "/birthday-countdown", color: "bg-rose-500" },
  { title: "Quote of the Day", description: "Get an inspiring quote daily.", icon: <MessageSquareText />, link: "/quote-of-the-day", color: "bg-lime-500" },
  { title: "Fun Fact Generator", description: "Discover interesting and fun facts.", icon: <Lightbulb />, link: "/fun-fact-generator", color: "bg-amber-500" },
  { title: "Emoji Translator", description: "Translate text to emojis (simple).", icon: <Languages />, link: "/emoji-translator", color: "bg-fuchsia-500" },
  { title: "Coin Flip Simulator", description: "Flip a virtual coin: Heads or Tails?", icon: <Coins />, link: "/coin-flip-simulator", color: "bg-sky-500" },
  { title: "Rock Paper Scissors Game", description: "Play the classic game.", icon: <Hand />, link: "/rock-paper-scissors", color: "bg-emerald-500" },
];

const MiscellaneousTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const relatedCategoriesList = ["Game Tools", "Social Media Tools", "Language Tools"];
  const relatedCategories = allToolCategories.filter(cat => relatedCategoriesList.includes(cat.name));

  return (
    <>
      <Helmet>
        <title>Free Miscellaneous Online Tools | Toolzenix</title>
        <meta 
          name="description" 
          content="Explore a collection of fun and handy miscellaneous tools: Random Number Generator, Joke Generator, Magic 8 Ball, Countdown Timer, and more. All 100% client-side."
        />
        <link rel="canonical" href="https://toolzenix.com/miscellaneous-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
            <Sparkles className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Miscellaneous <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of fun, lightweight, and handy utilities for everyday tasks and entertainment. All tools work directly in your browser.
          </p>
        </motion.div>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search miscellaneous tools (e.g., Joke, Timer, Dice...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Search miscellaneous tools"
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
              className="bg-white dark:bg-gray-800/70 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-transparent hover:border-yellow-500/30 dark:border-gray-700/50 dark:hover:border-yellow-500/50"
            >
              <Link to={tool.link} className="block group p-6 h-full flex flex-col">
                <div className="flex items-start space-x-4 mb-3">
                  <div className={`${tool.color} p-3 rounded-lg text-white shadow-md`}>
                    {React.cloneElement(tool.icon, { "aria-hidden": true, className: "w-6 h-6" })}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                    {tool.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
                  {tool.description}
                </p>
                <div className="mt-4 text-right">
                   <span className="text-xs font-medium text-yellow-500 dark:text-yellow-400 group-hover:underline">
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
            <Sparkles className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">No tools found for "{searchQuery}".</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try a different search term or explore all tools.</p>
          </motion.div>
        )}
        
        <div className="mt-16 w-full max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Explore Related Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCategories.map(cat => {
                const Icon = LucideIcons[cat.icon] || LucideIcons.Folder;
                return (
                  <motion.div
                    key={cat.path}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg transition-all"
                  >
                    <Link to={cat.path} className="group">
                      <div className="flex items-center mb-3">
                        <Icon className={cn("w-8 h-8 mr-4", cat.color)} />
                        <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{cat.name}</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{cat.description}</p>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-700 dark:from-yellow-700 dark:via-amber-700 dark:to-orange-800 rounded-xl p-8 sm:p-12 text-white text-center shadow-2xl"
        >
          <Sparkles className="w-12 h-12 mx-auto text-orange-300 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Purely Client-Side Fun!</h2>
          <p className="text-orange-200 dark:text-amber-200 max-w-xl mx-auto">
            All miscellaneous tools are 100% frontend-based. They work directly in your browser, ensuring your data stays private and the tools load instantly.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default MiscellaneousTools;
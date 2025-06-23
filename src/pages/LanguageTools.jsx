import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { Search, Languages, MessageSquare, Globe, RadioTower, RotateCcw, Wand2, Eye, ArrowRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { allToolCategories } from "@/config/navigation";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "Simple Text Translator",
    description: "Basic translation for common phrases (e.g., EN-ES).",
    icon: <MessageSquare className="w-6 h-6" />,
    link: "/simple-text-translator",
    color: "bg-blue-500"
  },
  {
    title: "Language Detector",
    description: "Identify the language of a given text snippet.",
    icon: <Globe className="w-6 h-6" />,
    link: "/language-detector",
    color: "bg-green-500"
  },
  {
    title: "Morse Code Converter",
    description: "Convert text to Morse code and vice-versa.",
    icon: <RadioTower className="w-6 h-6" />,
    link: "/morse-code-converter",
    color: "bg-purple-500"
  },
  {
    title: "Upside Down Text Generator",
    description: "Flip your text upside down for a fun effect.",
    icon: <RotateCcw className="w-6 h-6" />,
    link: "/upside-down-text-generator",
    color: "bg-yellow-500 text-black"
  },
  {
    title: "Zalgo Text Generator",
    description: "Create 'creepy' or 'glitchy' Zalgo text.",
    icon: <Wand2 className="w-6 h-6" />,
    link: "/zalgo-text-generator",
    color: "bg-red-500"
  },
  {
    title: "Braille Translator",
    description: "Convert text to visual Braille representation.",
    icon: <Eye className="w-6 h-6" />,
    link: "/braille-translator",
    color: "bg-indigo-500"
  }
];

const LanguageToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const relatedCategoriesList = ["Text Tools", "AI Tools", "Miscellaneous Tools"];
  const relatedCategories = allToolCategories.filter(cat => relatedCategoriesList.includes(cat.name));

  return (
    <>
      <Helmet>
        <title>Language Tools - Translate, Detect & Convert | Toolzenix</title>
        <meta 
          name="description" 
          content="Explore a suite of frontend-only language tools for simple translation, language detection, Morse code conversion, and fun text effects like upside down and Zalgo text."
        />
        <link rel="canonical" href="https://toolzenix.com/language-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <Languages className="w-16 h-16 text-blue-600 dark:text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Language Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Translate, detect, and convert text with these handy language utilities.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search language tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search language tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={tool.link} className="block group">
                <div className="flex items-start space-x-4">
                  <div className={`${tool.color} p-3 rounded-lg text-white`}>
                    {React.cloneElement(tool.icon, { "aria-hidden": true })}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p
            className="text-center text-gray-500 dark:text-gray-400 mt-8"
          >
            No language tools found for your search. Try different keywords!
          </p>
        )}

        <div className="mt-16 w-full max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Explore Related Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCategories.map(cat => {
                const Icon = LucideIcons[cat.icon] || LucideIcons.Folder;
                return (
                  <div
                    key={cat.path}
                    className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:scale-103"
                  >
                    <Link to={cat.path} className="group">
                      <div className="flex items-center mb-3">
                        <Icon className={cn("w-8 h-8 mr-4", cat.color)} />
                        <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{cat.description}</p>
                    </Link>
                  </div>
                )
              })}
            </div>
        </div>

        <div
          className="mt-12 bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Communicate & Explore Languages.</h2>
          <p className="text-gray-200">
            Our language tools are designed for quick, secure, client-side processing to assist with your linguistic needs.
          </p>
        </div>
      </div>
    </>
  );
};

export default LanguageToolsPage;
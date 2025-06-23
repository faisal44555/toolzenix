import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Type,
  ArrowRight,
  Binary,
  Volume2,
  Search as SearchIcon,
  Save,
  Trash,
  ArrowUpDown,
  Lock,
  Hash,
  SplitSquareHorizontal,
  FileText,
  RefreshCcw,
  AlignJustify,
  Baseline,
  Heading1,
  Braces,
  Eraser,
  Sparkles
} from "lucide-react";

const tools = [
  {
    title: "Word Counter",
    description: "Count words, characters, sentences and paragraphs",
    icon: <FileText className="w-6 h-6" />,
    link: "/word-counter",
    color: "bg-blue-500"
  },
  {
    title: "Character Counter",
    description: "Count characters with and without spaces",
    icon: <Hash className="w-6 h-6" />,
    link: "/character-counter",
    color: "bg-green-500"
  },
  {
    title: "Sentence Counter",
    description: "Count sentences in your text",
    icon: <AlignJustify className="w-6 h-6" />,
    link: "/sentence-counter",
    color: "bg-purple-500"
  },
  {
    title: "Paragraph Counter",
    description: "Count paragraphs in your text",
    icon: <Baseline className="w-6 h-6" />,
    link: "/paragraph-counter",
    color: "bg-yellow-500"
  },
  {
    title: "Remove Duplicate Lines",
    description: "Remove duplicate lines from your text",
    icon: <Eraser className="w-6 h-6" />,
    link: "/remove-duplicate-lines",
    color: "bg-red-500"
  },
  {
    title: "Line Break Remover",
    description: "Remove line breaks from your text",
    icon: <SplitSquareHorizontal className="w-6 h-6" />,
    link: "/line-break-remover",
    color: "bg-indigo-500"
  },
  {
    title: "Text to Uppercase",
    description: "Convert text to uppercase",
    icon: <ArrowUpDown className="w-6 h-6" />,
    link: "/text-to-uppercase",
    color: "bg-teal-500"
  },
  {
    title: "Text to Lowercase",
    description: "Convert text to lowercase",
    icon: <ArrowUpDown className="w-6 h-6" />,
    link: "/text-to-lowercase",
    color: "bg-orange-500"
  },
  {
    title: "Title Case Converter",
    description: "Convert text to title case",
    icon: <Heading1 className="w-6 h-6" />,
    link: "/title-case-converter",
    color: "bg-pink-500"
  },
  {
    title: "Reverse Text",
    description: "Reverse your text",
    icon: <RefreshCcw className="w-6 h-6" />,
    link: "/reverse-text",
    color: "bg-cyan-500"
  },
  {
    title: "Text to Binary",
    description: "Convert text to binary",
    icon: <Binary className="w-6 h-6" />,
    link: "/text-to-binary",
    color: "bg-emerald-500"
  },
  {
    title: "Binary to Text",
    description: "Convert binary to text",
    icon: <Type className="w-6 h-6" />,
    link: "/binary-to-text",
    color: "bg-violet-500"
  },
  {
    title: "Text to Speech",
    description: "Convert text to speech",
    icon: <Volume2 className="w-6 h-6" />,
    link: "/text-to-speech",
    color: "bg-rose-500"
  },
  {
    title: "Find and Replace",
    description: "Find and replace text",
    icon: <SearchIcon className="w-6 h-6" />,
    link: "/find-and-replace",
    color: "bg-amber-500"
  },
  {
    title: "Online Notepad",
    description: "Write and save notes in your browser",
    icon: <Save className="w-6 h-6" />,
    link: "/online-notepad",
    color: "bg-lime-500"
  },
  {
    title: "Remove Extra Spaces",
    description: "Remove extra spaces from your text",
    icon: <Trash className="w-6 h-6" />,
    link: "/remove-extra-spaces",
    color: "bg-sky-500"
  },
  {
    title: "Word Occurrence Counter",
    description: "Count specific word occurrences",
    icon: <Hash className="w-6 h-6" />,
    link: "/word-occurrence-counter",
    color: "bg-fuchsia-500"
  },
  {
    title: "Word Frequency Analyzer",
    description: "Analyze word frequency in your text",
    icon: <Sparkles className="w-6 h-6" />,
    link: "/word-frequency-analyzer",
    color: "bg-blue-600"
  },
  {
    title: "Remove Empty Lines",
    description: "Remove empty lines from your text",
    icon: <Eraser className="w-6 h-6" />,
    link: "/remove-empty-lines",
    color: "bg-green-600"
  },
  {
    title: "Text Encrypt/Decrypt",
    description: "Encrypt or decrypt your text",
    icon: <Lock className="w-6 h-6" />,
    link: "/text-encrypt-decrypt",
    color: "bg-purple-600"
  }
];

const TextTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Text Tools
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Powerful text manipulation tools that work directly in your browser.
          Your text never leaves your device!
        </p>
      </motion.div>

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search text tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to={tool.link} className="block group">
              <div className="flex items-start space-x-4">
                <div className={`${tool.color} p-3 rounded-lg text-white`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Why Use Our Text Tools?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">100% Private</h3>
            <p className="text-blue-100">All processing happens in your browser.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-blue-100">Process text in milliseconds.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Free Forever</h3>
            <p className="text-blue-100">No hidden costs or limits.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextTools;
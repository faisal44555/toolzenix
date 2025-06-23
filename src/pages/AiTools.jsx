import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, BrainCircuit, FileText, MessageSquare, Smile, SpellCheck, Briefcase, Image as ImageIcon, Key, Code, ArrowRight, Users } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const tools = [
  {
    title: "AI Text Summarizer",
    description: "Condense long texts into brief, coherent summaries.",
    icon: <FileText className="w-6 h-6" />,
    link: "/ai-text-summarizer",
    color: "bg-indigo-500"
  },
  {
    title: "AI Paraphraser",
    description: "Rephrase sentences or paragraphs effectively.",
    icon: <MessageSquare className="w-6 h-6" />,
    link: "/ai-paraphraser",
    color: "bg-purple-500"
  },
  {
    title: "AI Sentiment Analyzer",
    description: "Analyze the emotional tone of any given text.",
    icon: <Smile className="w-6 h-6" />,
    link: "/ai-sentiment-analyzer",
    color: "bg-pink-500"
  },
  {
    title: "AI Grammar Checker",
    description: "Check and correct grammatical errors in your text.",
    icon: <SpellCheck className="w-6 h-6" />,
    link: "/ai-grammar-checker",
    color: "bg-red-500"
  },
  {
    title: "AI Resume Analyzer",
    description: "Get insights and suggestions for your resume content.",
    icon: <Briefcase className="w-6 h-6" />,
    link: "/ai-resume-analyzer",
    color: "bg-orange-500"
  },
  {
    title: "AI Image Caption Generator",
    description: "Generate descriptive captions for images (experimental).",
    icon: <ImageIcon className="w-6 h-6" />,
    link: "/ai-image-caption-generator",
    color: "bg-yellow-500 text-black"
  },
  {
    title: "AI Keyword Extractor",
    description: "Extract key terms and topics from your text.",
    icon: <Key className="w-6 h-6" />,
    link: "/ai-keyword-extractor",
    color: "bg-green-500"
  },
  {
    title: "AI Code Explainer",
    description: "Get simple explanations for basic code snippets.",
    icon: <Code className="w-6 h-6" />,
    link: "/ai-code-explainer",
    color: "bg-teal-500"
  },
  {
    title: "AI Image Enhancer",
    description: "Enhance images with AI-powered tools and filters.",
    icon: <ImageIcon className="w-6 h-6" />,
    link: "/ai-image-enhancer",
    color: "bg-cyan-500"
  },
  {
    title: "AI Face Swap",
    description: "Swap faces between two images with AI-powered processing.",
    icon: <Users className="w-6 h-6" />,
    link: "/ai-face-swap",
    color: "bg-violet-500"
  }
];

const AiToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>AI Tools - Smart Utilities | Toolzenix</title>
        <meta 
          name="description" 
          content="Explore a collection of frontend-only AI tools for text summarization, paraphrasing, sentiment analysis, grammar checking, and more. Enhance your productivity with intelligent utilities."
        />
        <link rel="canonical" href="https://toolzenix.com/ai-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <BrainCircuit className="w-16 h-16 text-indigo-600 dark:text-indigo-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            AI Powered Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Leverage the power of AI with these smart, browser-based utilities.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search AI tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-500">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100" aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p
            className="text-center text-gray-500 dark:text-gray-400 mt-8"
          >
            No AI tools found for your search. Try different keywords!
          </p>
        )}

        <div
          className="mt-12 bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-700 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Intelligent Solutions, Right in Your Browser.</h2>
          <p className="text-gray-200">
            Our AI tools are designed for quick, secure, and client-side processing to enhance your productivity.
          </p>
        </div>
      </div>
    </>
  );
};

export default AiToolsPage;
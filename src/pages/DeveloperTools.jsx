import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { 
  Search, Code2, FileJson, FileCode2, FileCode, Type, Hash, Link2, Terminal, 
  Clock, Fingerprint, Braces, Network, RefreshCcw, ShieldCheck, Pilcrow, DatabaseZap,
  Server, BarChart3
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { allToolCategories } from "@/config/navigation";
import { cn } from "@/lib/utils";

const tools = [
  {
    title: "JSON Formatter & Beautifier",
    description: "Format, validate, and beautify JSON data.",
    icon: <FileJson className="w-6 h-6" />,
    link: "/json-formatter",
    color: "bg-amber-500"
  },
  {
    title: "JSON to XML Converter",
    description: "Convert JSON data to XML format.",
    icon: <Braces className="w-6 h-6" />,
    link: "/json-to-xml",
    color: "bg-teal-500"
  },
  {
    title: "XML to JSON Converter",
    description: "Convert XML data to JSON format.",
    icon: <FileCode className="w-6 h-6" />,
    link: "/xml-to-json",
    color: "bg-sky-500"
  },
  {
    title: "Base64 Encode & Decode",
    description: "Encode to or decode from Base64.",
    icon: <ShieldCheck className="w-6 h-6" />,
    link: "/base64-converter",
    color: "bg-blue-500"
  },
  {
    title: "URL Encode & Decode",
    description: "Encode or decode URLs and URL components.",
    icon: <Link2 className="w-6 h-6" />,
    link: "/url-encoder-decoder",
    color: "bg-red-500"
  },
  {
    title: "HTML Minifier & Beautifier",
    description: "Minify or beautify HTML code.",
    icon: <FileCode2 className="w-6 h-6" />,
    link: "/html-minifier-beautifier",
    color: "bg-green-500"
  },
  {
    title: "CSS Minifier & Beautifier",
    description: "Minify or beautify CSS code.",
    icon: <FileCode className="w-6 h-6" />,
    link: "/css-minifier-beautifier",
    color: "bg-pink-500"
  },
  {
    title: "JavaScript Minifier & Beautifier",
    description: "Minify or beautify JavaScript code.",
    icon: <Code2 className="w-6 h-6" />,
    link: "/javascript-minifier-beautifier",
    color: "bg-yellow-500"
  },
  {
    title: "UUID Generator",
    description: "Generate universally unique identifiers (UUIDs/GUIDs).",
    icon: <Fingerprint className="w-6 h-6" />,
    link: "/uuid-generator",
    color: "bg-indigo-500"
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate Lorem Ipsum placeholder text.",
    icon: <Pilcrow className="w-6 h-6" />,
    link: "/lorem-ipsum-generator",
    color: "bg-purple-500"
  },
  {
    title: "Color Code Converter",
    description: "Convert between HEX, RGB, and HSL color codes.",
    icon: <RefreshCcw className="w-6 h-6" />,
    link: "/color-code-converter",
    color: "bg-rose-500"
  },
  {
    title: "Regex Tester",
    description: "Test and validate regular expressions with highlighting.",
    icon: <Terminal className="w-6 h-6" />,
    link: "/regex-tester",
    color: "bg-cyan-500"
  },
  {
    title: "HTML Entity Encoder/Decoder",
    description: "Encode or decode HTML entities.",
    icon: <Hash className="w-6 h-6" />,
    link: "/html-entity-converter",
    color: "bg-lime-500"
  },
  {
    title: "Timestamp Converter",
    description: "Convert Unix timestamps to human-readable dates and vice-versa.",
    icon: <Clock className="w-6 h-6" />,
    link: "/timestamp-converter",
    color: "bg-fuchsia-500"
  },
  {
    title: "Character Counter with Byte Info",
    description: "Count characters, words, lines, and view byte size.",
    icon: <BarChart3 className="w-6 h-6" />,
    link: "/character-byte-counter",
    color: "bg-orange-500"
  },
  {
    title: "HTTP Headers Viewer",
    description: "View your browser's current HTTP request headers. (Client-Side)",
    icon: <Network className="w-6 h-6" />,
    link: "/http-headers-viewer",
    color: "bg-violet-500"
  }
];

const DeveloperTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const relatedCategoriesList = ["Security Tools", "Text Tools", "File Tools"];
  const relatedCategories = allToolCategories.filter(cat => relatedCategoriesList.includes(cat.name));

  return (
    <>
      <Helmet>
        <title>Free Online Developer Tools | Toolzenix</title>
        <meta 
          name="description" 
          content="Boost productivity with Toolzenix's free developer tools – JSON, XML, Base64, URL, HTML, CSS, JS, UUID, Lorem Ipsum, Color Codes, Regex, HTML Entities, Timestamps, Character Count, HTTP Headers. 100% frontend."
        />
        <link rel="canonical" href="https://toolzenix.com/developer-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Code2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Developer <span className="gradient-text">Toolkit</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive suite of essential, 100% browser-based utilities designed to streamline your development workflow.
          </p>
        </div>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search developer tools (e.g., JSON, Base64, UUID...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Search developer tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {filteredTools.map((tool, index) => (
            <div
              key={tool.link}
              className="bg-white dark:bg-gray-800/70 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-transparent hover:border-blue-500/30 dark:border-gray-700/50 dark:hover:border-blue-500/50"
            >
              <Link to={tool.link} className="block group p-6 h-full flex flex-col">
                <div className="flex items-start space-x-4 mb-3">
                  <div className={`${tool.color} p-3 rounded-lg text-white shadow-md`}>
                    {React.cloneElement(tool.icon, { "aria-hidden": true, className: "w-6 h-6" })}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
                  {tool.description}
                </p>
                <div className="mt-4 text-right">
                   <span className="text-xs font-medium text-blue-500 dark:text-blue-400 group-hover:underline">
                    Open Tool &rarr;
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
         {filteredTools.length === 0 && (
          <div
            className="text-center py-12"
          >
            <Server className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">No tools found for "{searchQuery}".</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try a different search term.</p>
          </div>
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
          className="mt-16 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-xl p-8 sm:p-12 text-white text-center shadow-2xl"
        >
          <DatabaseZap className="w-12 h-12 mx-auto text-blue-400 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Lightning Fast & Secure</h2>
          <p className="text-slate-300 dark:text-gray-300 max-w-xl mx-auto">
            All developer tools operate entirely within your browser. Your data never leaves your computer, ensuring privacy and instant results.
          </p>
          <p className="text-sm mt-6 text-slate-400 dark:text-gray-500">
            Crafted by developers, for developers.
          </p>
        </div>
      </div>
    </>
  );
};

export default DeveloperTools;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Megaphone, Target, BarChart3, Mail, Lightbulb, TrendingUp, FileImage, Users, Edit3, Settings2, Tag, Type, Speaker, Baseline } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const tools = [
  { title: "Meta Tag Analyzer", description: "Analyze and preview meta tags (paste HTML).", icon: <Settings2 />, link: "/meta-tag-analyzer", color: "bg-blue-500" },
  { title: "UTM Link Generator", description: "Create UTM tracking links for campaigns.", icon: <Target />, link: "/utm-link-generator", color: "bg-green-500" },
  { title: "Keyword Density Checker", description: "Analyze keyword usage in content.", icon: <BarChart3 />, link: "/keyword-density-checker", color: "bg-sky-500" },
  { title: "Email Subject Line Tester", description: "Check effectiveness of email subject lines.", icon: <Mail />, link: "/email-subject-line-tester", color: "bg-purple-500" },
  { title: "Slogan Generator", description: "Generate catchy slogans for any brand.", icon: <Lightbulb />, link: "/slogan-generator", color: "bg-indigo-500" },
  { title: "ROI Calculator", description: "Calculate Return on Investment for campaigns.", icon: <TrendingUp />, link: "/roi-calculator", color: "bg-teal-500" },
  { title: "Content Idea Generator", description: "Generate blog/video content ideas.", icon: <Edit3 />, link: "/content-idea-generator", color: "bg-pink-500" },
  { title: "Ad Image Size Checker", description: "Validate ad banner sizes for platforms.", icon: <FileImage />, link: "/ad-image-size-checker", color: "bg-yellow-500 text-black" },
  { title: "Competitor Keyword Extractor", description: "Extract keywords from website content (paste text).", icon: <Users />, link: "/competitor-keyword-extractor", color: "bg-red-500" },
  { title: "Headline Analyzer", description: "Check clickability and readability of titles.", icon: <Search />, link: "/headline-analyzer", color: "bg-orange-500" },
  { title: "Meta Tag Generator", description: "Generate SEO meta tags for websites.", icon: <Tag />, link: "/meta-tag-generator", color: "bg-cyan-500" },
  { title: "Blog Title Generator", description: "Generate catchy blog titles.", icon: <Type />, link: "/blog-title-generator", color: "bg-rose-500" },
  { title: "Ad Copy Generator", description: "Create compelling marketing ad copy.", icon: <Speaker />, link: "/ad-copy-generator", color: "bg-lime-500" },
  { title: "Ad Character Counter", description: "Ensure ad copy meets character limits.", icon: <Baseline />, link: "/ad-character-counter", color: "bg-fuchsia-500" },
];

const MarketingTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Free Online Marketing Tools Suite | Toolzenix</title>
        <meta 
          name="description" 
          content="Boost your marketing campaigns with Toolzenix's suite of free online tools. Includes Meta Tag Analyzer, UTM Link Generator, Keyword Density Checker, ROI Calculator, Slogan Generator, and more. All client-side for privacy and speed."
        />
        <link rel="canonical" href="https://toolzenix.com/marketing-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-full mb-4">
            <Megaphone className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Marketing <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Tools</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Elevate your marketing strategy with our powerful, browser-based utilities. From SEO analysis to content creation, find the tools you need to succeed.
          </p>
        </div>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search marketing tools (e.g., UTM, ROI, Slogan...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Search marketing tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    Use Tool &rarr;
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
            <Megaphone className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">No tools found for "{searchQuery}".</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try a different search term or explore all tools.</p>
          </div>
        )}

        <div
          className="mt-16 bg-gradient-to-r from-blue-700 via-green-600 to-sky-700 dark:from-blue-800 dark:via-green-700 dark:to-sky-800 rounded-xl p-8 sm:p-12 text-white text-center shadow-2xl"
        >
          <Target className="w-12 h-12 mx-auto text-green-300 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Supercharge Your Marketing Efforts!</h2>
          <p className="text-blue-100 dark:text-blue-200 max-w-xl mx-auto">
            All marketing tools are designed for quick insights and easy use, right in your browser. No data leaves your device, ensuring your strategies remain confidential.
          </p>
          <p className="mt-4 text-sm text-blue-200 dark:text-blue-300">
            Explore tools for SEO, content creation, campaign tracking, and more. Need inspiration? Try our <Link to="/slogan-generator" className="underline hover:text-green-300">Slogan Generator</Link> or <Link to="/content-idea-generator" className="underline hover:text-green-300">Content Idea Generator</Link>.
          </p>
        </div>

        <div className="mt-16 prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
            <h2 className="text-3xl font-semibold mb-6">Empower Your Marketing with Toolzenix</h2>
            <p className="text-lg">
                In today's fast-paced digital landscape, having the right tools at your fingertips is essential for effective marketing. Toolzenix offers a comprehensive collection of free online marketing utilities designed to streamline your workflow, enhance your strategies, and help you achieve your campaign goals. Whether you're an SEO specialist, content creator, social media manager, or a small business owner, our tools provide practical solutions for everyday marketing challenges.
            </p>
            <p>
                Our marketing tools cover a wide range of needs. For instance, the <Link to="/meta-tag-analyzer">Meta Tag Analyzer</Link> and <Link to="/meta-tag-generator">Meta Tag Generator</Link> help you optimize your website's on-page SEO. Track your campaign effectiveness with the <Link to="/utm-link-generator">UTM Link Generator</Link> and measure your financial success with the <Link to="/roi-calculator">ROI Calculator</Link>. Content is king, and our <Link to="/keyword-density-checker">Keyword Density Checker</Link>, <Link to="/headline-analyzer">Headline Analyzer</Link>, <Link to="/blog-title-generator">Blog Title Generator</Link>, and <Link to="/ad-copy-generator">Ad Copy Generator</Link> are here to help you create compelling and optimized content.
            </p>
            <p>
                All tools on Toolzenix are client-side, meaning they run directly in your browser. This ensures your data remains private and secure, as no information is sent to our servers. We are committed to providing accessible and user-friendly tools that empower marketers of all levels. Explore the full list above and discover how Toolzenix can support your marketing endeavors. Don't forget to check our <Link to="/tools">main tools page</Link> for even more utilities across various categories.
            </p>
        </div>
      </div>
    </>
  );
};

export default MarketingTools;
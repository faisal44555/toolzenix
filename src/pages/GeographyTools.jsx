import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Globe2, MapPin, Clock, Info, LocateFixed, Milestone, Wallet, Flag, ArrowRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const tools = [
  {
    title: "Latitude & Longitude Finder",
    description: "Find geographic coordinates of any location.",
    icon: <MapPin className="w-6 h-6" />,
    link: "/lat-long-finder",
    color: "bg-blue-500"
  },
  {
    title: "Time Zone Converter",
    description: "Convert time between global time zones.",
    icon: <Clock className="w-6 h-6" />,
    link: "/geo-timezone-converter",
    color: "bg-teal-500"
  },
  {
    title: "Country Information Finder",
    description: "Get key facts about any country worldwide.",
    icon: <Info className="w-6 h-6" />,
    link: "/country-info-finder",
    color: "bg-green-500"
  },
  {
    title: "IP Geolocation Tool",
    description: "Find approximate geographic location of an IP address.",
    icon: <LocateFixed className="w-6 h-6" />,
    link: "/ip-geolocation",
    color: "bg-purple-500"
  },
  {
    title: "Distance Calculator",
    description: "Calculate distance between two geographic points.",
    icon: <Milestone className="w-6 h-6" />,
    link: "/distance-calculator",
    color: "bg-red-500"
  },
  {
    title: "World Clock",
    description: "View current times in major world cities.",
    icon: <Globe2 className="w-6 h-6" />, // Re-using Globe2 for World Clock here
    link: "/geo-world-clock",
    color: "bg-sky-500"
  },
  {
    title: "Currency Info by Country",
    description: "Find official currency details for each country.",
    icon: <Wallet className="w-6 h-6" />,
    link: "/country-currency-info",
    color: "bg-yellow-500 text-black"
  },
  {
    title: "Country Flags Viewer",
    description: "View national flags of all countries.",
    icon: <Flag className="w-6 h-6" />,
    link: "/country-flags-viewer",
    color: "bg-orange-500"
  }
];

const GeographyToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Geography Tools - Explore Your World | Toolzenix</title>
        <meta 
          name="description" 
          content="Discover a suite of online geography tools: find coordinates, convert time zones, get country information, calculate distances, view world clocks, and more. All client-side for ease of use."
        />
        <link rel="canonical" href="https://toolzenix.com/geography-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <Globe2 className="w-16 h-16 text-cyan-600 dark:text-cyan-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Geography Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Explore and understand our world with these handy geographic utilities.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search geography tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search geography tools"
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
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-500">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors opacity-0 group-hover:opacity-100" aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p
            className="text-center text-gray-500 dark:text-gray-400 mt-8"
          >
            No tools found for your search. Try exploring the world with different keywords!
          </p>
        )}

        <div
          className="mt-12 bg-gradient-to-r from-cyan-700 via-sky-600 to-blue-700 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Discover. Explore. Understand.</h2>
          <p className="text-gray-200">
            Our geography tools are designed for quick, easy, and secure use, all within your browser.
          </p>
        </div>
      </div>
    </>
  );
};

export default GeographyToolsPage;
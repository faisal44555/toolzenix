import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Gamepad2, Dice5, Copy as PlayingCardIcon, Brain, MousePointerClick, ClipboardList, Coins, Puzzle, RotateCcw as SpinnerIcon, Users, ArrowRight } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const tools = [
  {
    title: "Random Dice Roller",
    description: "Roll virtual dice for your games.",
    icon: <Dice5 className="w-6 h-6" />,
    link: "/game-dice-roller",
    color: "bg-red-500"
  },
  {
    title: "Playing Card Picker",
    description: "Draw a random playing card from a deck.",
    icon: <PlayingCardIcon className="w-6 h-6" />,
    link: "/playing-card-picker",
    color: "bg-blue-500"
  },
  {
    title: "Memory Test Game",
    description: "Test your memory with this card matching game.",
    icon: <Brain className="w-6 h-6" />,
    link: "/memory-test-game",
    color: "bg-green-500"
  },
  {
    title: "Reaction Time Tester",
    description: "Measure your reaction speed.",
    icon: <MousePointerClick className="w-6 h-6" />,
    link: "/reaction-time-tester",
    color: "bg-yellow-500 text-black"
  },
  {
    title: "Click Speed Tester (CPS)",
    description: "Test your clicks per second.",
    icon: <MousePointerClick className="w-6 h-6" />,
    link: "/click-speed-tester",
    color: "bg-purple-500"
  },
  {
    title: "Scoreboard Tool",
    description: "Keep track of scores for your games.",
    icon: <ClipboardList className="w-6 h-6" />,
    link: "/scoreboard-tool",
    color: "bg-indigo-500"
  },
  {
    title: "Coin Toss Simulator",
    description: "Flip a virtual coin for decisions.",
    icon: <Coins className="w-6 h-6" />,
    link: "/game-coin-toss",
    color: "bg-orange-500"
  },
  {
    title: "Sudoku Generator & Solver",
    description: "Generate and play Sudoku puzzles.",
    icon: <Puzzle className="w-6 h-6" />,
    link: "/sudoku-generator",
    color: "bg-teal-500"
  },
  {
    title: "Spinner Wheel",
    description: "Customizable spinner for random choices.",
    icon: <SpinnerIcon className="w-6 h-6" />,
    link: "/spinner-wheel",
    color: "bg-pink-500"
  },
  {
    title: "Name Picker Game",
    description: "Randomly pick a name from a list.",
    icon: <Users className="w-6 h-6" />,
    link: "/name-picker-game",
    color: "bg-cyan-500"
  }
];

const GameToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Game Tools - Fun Gaming Utilities | Toolzenix</title>
        <meta 
          name="description" 
          content="Explore a collection of fun and useful frontend-only game tools: Dice Roller, Card Picker, Memory Game, Reaction Tester, Scoreboard, Sudoku, and more."
        />
        <link rel="canonical" href="https://toolzenix.com/game-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="text-center mb-12"
        >
          <Gamepad2 className="w-16 h-16 text-purple-600 dark:text-purple-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Game Tools
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Fun utilities and tools to enhance your gaming experience or make quick decisions.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search game tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search game tools"
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
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-500">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-500 transition-colors opacity-0 group-hover:opacity-100" aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <p
            className="text-center text-gray-500 dark:text-gray-400 mt-8"
          >
            No game tools found for your search. Try different keywords!
          </p>
        )}

        <div
          className="mt-12 bg-gradient-to-r from-purple-700 via-pink-600 to-red-700 rounded-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Level Up Your Fun!</h2>
          <p className="text-gray-200">
            Our game tools are designed for quick, client-side fun and utility. No downloads, just instant play and use.
          </p>
        </div>
      </div>
    </>
  );
};

export default GameToolsPage;
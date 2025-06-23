import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoonStar, SunDim, Search, Menu, Sparkles, ChevronDown, X, BarChartHorizontalBig } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { allToolCategories } from '@/config/navigation';
import { useAnalytics } from '@/hooks/useAnalytics';

const Header = ({ darkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen, navLinks, allTools }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const { trackUserAction } = useAnalytics();

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tool.description && tool.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (tool.category && tool.category.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 10);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allTools]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchItemClick = (path, toolName) => {
    trackUserAction('search', {
      query: searchQuery,
      resultsCount: searchResults.length,
      selectedResult: toolName
    });
    
    navigate(path);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    trackUserAction('search_focus', {
      page_path: window.location.pathname
    });
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    trackUserAction('mobile_menu_toggle', {
      action: !isMobileMenuOpen ? 'open' : 'close'
    });
  };

  const handleNavClick = (navItem) => {
    trackUserAction('navigation_click', {
      nav_item: navItem,
      nav_location: 'header'
    });
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMenuToggle}
              className="md:hidden mr-2 text-white hover:bg-blue-700/60 focus-visible:ring-white"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 rounded-lg p-1"
              onClick={() => handleNavClick('logo')}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-white rounded-full blur opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-full shadow-md">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
              </div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold text-white tracking-tight hidden sm:block"
              >
                Toolzenix
              </motion.span>
            </Link>
            <nav className="hidden md:flex ml-8 space-x-1 items-center">
              {navLinks.map(link => {
                const toPath = link.text.toLowerCase() === 'home' ? '/' : link.to;
                return (
                  <Link 
                    key={link.to} 
                    to={toPath} 
                    className="text-blue-100 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
                    onClick={() => handleNavClick(link.text)}
                  >
                    {link.text}
                  </Link>
                );
              })}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-blue-100 hover:text-white hover:bg-blue-700/60 px-3 py-2 rounded-md text-sm font-medium focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
                    onClick={() => handleNavClick('all_tools_dropdown')}
                  >
                    All Tools <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-xl">
                  {allToolCategories.map((category) => (
                    <DropdownMenuItem key={category.path} asChild>
                      <Link 
                        to={category.path} 
                        className="text-slate-700 dark:text-slate-200 hover:!bg-slate-100 dark:hover:!bg-slate-800 focus:!bg-slate-100 dark:focus:!bg-slate-800"
                        onClick={() => handleNavClick(category.name)}
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link 
                to="/analytics" 
                className="flex items-center text-blue-100 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
                onClick={() => handleNavClick('analytics')}
              >
                <BarChartHorizontalBig className="mr-1.5 h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative" ref={searchContainerRef}>
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5 pointer-events-none z-10" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className={cn(
                  "search-input",
                  "pl-10 pr-8 w-40 sm:w-56 text-sm h-10",
                  "focus:w-48 sm:focus:w-64",
                  "rounded-full",
                  "border-2 border-blue-300/70 dark:border-blue-500/50",
                  "focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring-offset-blue-700 dark:focus:ring-offset-blue-800",
                  "bg-white/80 dark:bg-blue-900/60",
                  "text-slate-700 dark:text-slate-100",
                  "placeholder-slate-400 dark:placeholder-slate-500",
                  "transition-all duration-300 ease-in-out"
                )}
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 h-7 w-7 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 rounded-full"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <AnimatePresence>
                {isSearchFocused && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="search-results absolute top-full mt-2 w-full sm:w-72 max-h-80 overflow-y-auto rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  >
                    <ul>
                      {searchResults.map(tool => (
                        <li key={tool.path}>
                          <button
                            onClick={() => handleSearchItemClick(tool.path, tool.name)}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-800/70 focus:bg-slate-100 dark:focus:bg-slate-800/70 transition-colors"
                          >
                            <p className="font-medium text-slate-800 dark:text-slate-100">{tool.name}</p>
                            {tool.description && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {tool.description}
                              </p>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full text-white hover:bg-blue-700/60 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? "sun" : "moon"}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <SunDim className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
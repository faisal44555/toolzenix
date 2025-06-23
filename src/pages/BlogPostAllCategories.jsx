import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SocialShareButtons from '@/components/common/SocialShareButtons';
import { ArrowRight, CheckCircle, LayoutGrid, Image as ImageIcon, Video, FileText as DocumentIcon, Music2, Type, QrCode, SlidersHorizontal, Calculator, Palette, Code2, Share2, ShieldCheck, FolderKanban, Sparkles, FlaskConical, Megaphone, HeartPulse, CalendarClock, Landmark, Globe2, BrainCircuit, Languages, Gamepad2, Zap, FileText } from 'lucide-react';
import { allToolCategories, individualTools } from '@/config/navigation';

const BlogPostAllCategories = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const siteUrl = "https://toolzenix.com";
  const articleUrl = `${siteUrl}/blog/explore-all-tool-categories`;
  const articleTitle = "Explore 200+ Free Online Tools in 23 Powerful Categories | Toolzenix";
  const articleDescription = "Dive into Toolzenix.com's vast collection of over 200 free online tools, expertly organized into 23 categories. From image editing to developer utilities, find everything you need in one place—no signup, no fees, just powerful tools at your fingertips.";

  useEffect(() => {
    setCurrentUrl(window.location.href);
    window.scrollTo(0, 0);
  }, []);

  const getIconForCategory = (categoryName) => {
    const category = allToolCategories.find(cat => cat.name === categoryName);
    if (!category || !category.icon) return <LayoutGrid className="w-7 h-7 mr-3 text-indigo-500" />;

    const icons = {
      Image: <ImageIcon className="w-7 h-7 mr-3 text-indigo-500" />,
      Video: <Video className="w-7 h-7 mr-3 text-red-500" />,
      Music2: <Music2 className="w-7 h-7 mr-3 text-green-500" />,
      FileText: <DocumentIcon className="w-7 h-7 mr-3 text-blue-500" />,
      Type: <Type className="w-7 h-7 mr-3 text-purple-500" />,
      QrCode: <QrCode className="w-7 h-7 mr-3 text-teal-500" />,
      SlidersHorizontal: <SlidersHorizontal className="w-7 h-7 mr-3 text-cyan-500" />,
      Calculator: <Calculator className="w-7 h-7 mr-3 text-lime-500" />,
      Palette: <Palette className="w-7 h-7 mr-3 text-pink-500" />,
      Code2: <Code2 className="w-7 h-7 mr-3 text-gray-500" />,
      ShieldCheck: <ShieldCheck className="w-7 h-7 mr-3 text-rose-500" />,
      Sparkles: <Sparkles className="w-7 h-7 mr-3 text-yellow-500" />,
      FlaskConical: <FlaskConical className="w-7 h-7 mr-3 text-light-blue-500" />,
      Megaphone: <Megaphone className="w-7 h-7 mr-3 text-orange-500" />,
      Share2: <Share2 className="w-7 h-7 mr-3 text-sky-500" />,
      FolderKanban: <FolderKanban className="w-7 h-7 mr-3 text-amber-500" />,
      HeartPulse: <HeartPulse className="w-7 h-7 mr-3 text-red-400" />,
      CalendarClock: <CalendarClock className="w-7 h-7 mr-3 text-true-gray-500" />,
      Landmark: <Landmark className="w-7 h-7 mr-3 text-green-600" />,
      Globe2: <Globe2 className="w-7 h-7 mr-3 text-emerald-500" />,
      BrainCircuit: <BrainCircuit className="w-7 h-7 mr-3 text-violet-500" />,
      Languages: <Languages className="w-7 h-7 mr-3 text-fuchsia-500" />,
      Gamepad2: <Gamepad2 className="w-7 h-7 mr-3 text-blue-400" />,
      Zap: <Zap className="w-7 h-7 mr-3 text-yellow-400" />, // System Tools
    };
    return icons[category.icon] || <LayoutGrid className="w-7 h-7 mr-3 text-indigo-500" />;
  };
  
  const getPopularToolsForCategory = (categoryName) => {
    return individualTools
      .filter(tool => tool.category === categoryName)
      .slice(0, 4) // Get up to 4 tools
      .map(tool => ({ name: tool.name, path: tool.path }));
  };

  const categoriesData = [
    { name: "Image Tools", description: "Effortlessly convert, compress, resize, crop, and enhance your images. Perfect for web optimization, social media posts, or personal projects. All tools are free, fast, and require no signup.", popularTools: getPopularToolsForCategory("Image Tools") },
    { name: "Video Tools", description: "Handle your video files with ease. Convert formats, create GIFs from video clips, mute audio, or trim videos to the perfect length. Our video tools are mobile-friendly and privacy-focused.", popularTools: getPopularToolsForCategory("Video Tools") },
    { name: "MP3 Tools", description: "Your go-to for client-side MP3 manipulation. Play, analyze metadata, convert to Base64, or rename MP3 files directly in your browser. Fast, secure, and free.", popularTools: getPopularToolsForCategory("MP3 Tools") },
    { name: "Document Tools", description: "Manage your documents efficiently. Convert between PDF, Word, Excel, and PowerPoint formats. Extract text, merge files, and more, all online and for free.", popularTools: getPopularToolsForCategory("Document Tools") },
    { name: "PDF Tools", description: "A comprehensive suite for all your PDF needs. Merge, split, compress, protect, unlock, and rotate PDF pages. No software installation needed, just quick online processing.", popularTools: individualTools.filter(t => t.path.includes('pdf') && t.category === "Document Tools").slice(0,4).map(tool => ({ name: tool.name, path: tool.path })) }, // Specific PDF tools
    { name: "Text Tools", description: "Analyze and manipulate text with ease. Count words and characters, change text case, generate placeholder text, remove duplicate lines, and much more. Ideal for writers, editors, and developers.", popularTools: getPopularToolsForCategory("Text Tools") },
    { name: "QR/Barcode Tools", description: "Generate custom QR codes for URLs, WiFi, vCards, and more. Scan QR codes and various barcode types using your device camera or by uploading an image. Simple, fast, and effective.", popularTools: getPopularToolsForCategory("QR/Barcode Tools") },
    { name: "Unit Converters", description: "A versatile set of converters for various units of measurement. Convert length, weight, temperature, speed, area, volume, time, pressure, energy, and data storage units accurately.", popularTools: getPopularToolsForCategory("Unit Converters") },
    { name: "Math Tools", description: "Solve mathematical problems quickly. Includes percentage calculators, scientific calculator, age calculator, interest calculators, BMI calculator, and tools for fractions and number conversions.", popularTools: getPopularToolsForCategory("Math Tools") },
    { name: "Color Tools", description: "Everything you need for working with colors. Pick colors, convert between HEX, RGB, and HSL, generate color palettes, check contrast for accessibility, and create CSS gradients.", popularTools: getPopularToolsForCategory("Color Tools") },
    { name: "Developer Tools", description: "Essential utilities for web developers and programmers. Format JSON, XML, HTML, CSS, and JavaScript. Encode/decode Base64 and URLs, generate UUIDs, test Regex, and more.", popularTools: getPopularToolsForCategory("Developer Tools") },
    { name: "Security Tools", description: "Enhance your online security. Generate strong passwords, check password strength, create MD5 and SHA256 hashes, encrypt/decrypt text, and generate random PINs.", popularTools: getPopularToolsForCategory("Security Tools") },
    { name: "Miscellaneous Tools", description: "A collection of fun and handy utilities for everyday tasks. Includes random number generators, joke generator, Magic 8 Ball, nickname generator, countdown timers, and more.", popularTools: getPopularToolsForCategory("Miscellaneous Tools") },
    { name: "Science Tools", description: "Explore the world of science with interactive calculators and explorers. Includes a periodic table, molar mass calculator, DNA sequence analyzer, pH calculator, and physics formula solvers.", popularTools: getPopularToolsForCategory("Science Tools") },
    { name: "Marketing Tools", description: "Boost your marketing campaigns with specialized tools. Analyze meta tags, generate UTM links, check keyword density, test email subject lines, create slogans, and calculate ROI.", popularTools: getPopularToolsForCategory("Marketing Tools") },
    { name: "Social Media Tools", description: "Optimize your social media presence. Generate Instagram bios and hashtags, resize images for platforms, plan posts, create tweet ideas, and extract YouTube tags.", popularTools: getPopularToolsForCategory("Social Media Tools") },
    { name: "File Tools", description: "Manage your files directly in the browser. Compress files to ZIP, merge text/PDF files, split text files, batch rename files, and convert between TXT and CSV formats.", popularTools: getPopularToolsForCategory("File Tools") },
    { name: "Health & Fitness Tools", description: "Monitor and improve your health and fitness. Calculate BMI, daily calorie needs, BMR, ideal weight, and water intake. Convert steps to calories and plan your sleep.", popularTools: getPopularToolsForCategory("Health & Fitness Tools") },
    { name: "Calendar & Time Tools", description: "Effectively manage dates, times, and schedules. Use our stopwatch, countdown timer, calendar generator, world clock, date calculator, and time zone converter.", popularTools: getPopularToolsForCategory("Calendar & Time Tools") },
    { name: "Finance Tools", description: "Calculators for loans, investments, taxes, and savings. Includes EMI calculator, loan interest calculator, credit card payoff, simple/compound interest, GST, and SIP calculators.", popularTools: getPopularToolsForCategory("Finance Tools") },
    { name: "Geography Tools", description: "Explore the world with location, time, and distance tools. Find latitude/longitude, convert time zones, get country information, perform IP geolocation, and view world flags.", popularTools: getPopularToolsForCategory("Geography Tools") },
    { name: "AI Tools", description: "Leverage artificial intelligence for various tasks. Summarize text, paraphrase content, analyze sentiment, check grammar, get insights from resumes, and explain code snippets.", popularTools: getPopularToolsForCategory("AI Tools") },
    { name: "Language Tools", description: "Tools for text translation, language detection, and linguistic fun. Convert text to Morse code, upside-down text, Zalgo text, or visual Braille.", popularTools: getPopularToolsForCategory("Language Tools") },
    { name: "Game Tools", description: "A collection of fun utilities and simple games. Includes a dice roller, playing card picker, memory test, reaction time tester, click speed test, scoreboard, and Sudoku generator.", popularTools: getPopularToolsForCategory("Game Tools") },
    // Note: "System Tools" was not in the user's list of 23, but was in the codebase. Assuming the 23 from user message.
  ];


  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: "easeOut" } }
  };
  
  const listItemVariants = (index) => ({
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3, delay: index * 0.05, ease: "easeOut" } 
    }
  });

  return (
    <>
      <Helmet>
        <title>{articleTitle}</title>
        <meta name="description" content={articleDescription} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:title" content={articleTitle} />
        <meta property="og:description" content={articleDescription} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${siteUrl}/placeholder-blog-all-categories.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={articleTitle} />
        <meta name="twitter:description" content={articleDescription} />
        <meta name="twitter:image" content={`${siteUrl}/placeholder-blog-all-categories.jpg`} />
        <meta name="keywords" content="free online tools, Toolzenix categories, image tools, video tools, PDF tools, text utilities, developer tools, unit converters, no signup tools, mobile friendly tools, privacy focused tools" />
      </Helmet>

      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-10 bg-white dark:bg-slate-900 shadow-xl rounded-lg my-8"
      >
        <motion.header 
          variants={sectionVariants}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 text-slate-800 dark:text-slate-100 leading-tight">
            Explore 200+ Free Online Tools in 23 Powerful Categories on Toolzenix
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Published on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.header>

        <motion.section variants={sectionVariants} className="mb-8 prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl">
            Welcome to Toolzenix.com, your ultimate hub for a diverse range of free online tools designed to make your digital life easier and more productive. With over 200 utilities spread across 23 distinct categories, Toolzenix offers a solution for almost any task you can imagine—all without requiring any sign-ups, installations, or fees. Our platform is built for speed, convenience, and privacy, ensuring a seamless experience whether you're on a desktop or mobile device.
          </p>
          <p>
            Let's dive into the powerful categories Toolzenix has to offer and discover how they can help you tackle your daily challenges with ease.
          </p>
        </motion.section>

        {categoriesData.map((category, index) => {
          const categoryConfig = allToolCategories.find(c => c.name === category.name);
          return (
            <motion.section 
              key={category.name} 
              variants={sectionVariants} 
              className="mb-10 p-6 bg-slate-50 dark:bg-slate-800/70 rounded-lg shadow-md"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-700 dark:text-slate-200 flex items-center">
                {getIconForCategory(category.name)} {category.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4 prose dark:prose-invert max-w-none">
                {category.description}
              </p>
              {category.popularTools && category.popularTools.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Popular Tools in this Category:</h3>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    {category.popularTools.map(tool => (
                      <motion.li key={tool.name} custom={index} variants={listItemVariants(index)} className="text-slate-600 dark:text-slate-300">
                        <Link to={tool.path} className="text-indigo-600 hover:underline">{tool.name}</Link>
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
              {categoryConfig && (
                <Button asChild variant="outline" size="sm" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-900/30">
                  <Link to={categoryConfig.path}>
                    Explore all {category.name} <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
              )}
            </motion.section>
          );
        })}
        
        <motion.section variants={sectionVariants} className="my-10 text-center p-6 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-lg shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-indigo-100 dark:text-indigo-200 mb-6 prose prose-invert max-w-none">
            With 23 categories and over 200 tools, Toolzenix is your ultimate online toolkit. Experience the convenience of having powerful, free, and easy-to-use utilities right at your fingertips.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-indigo-600 font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 px-8 py-3">
            <Link to="/tools">
              Browse All Tools on Toolzenix <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.section>

        <motion.div variants={sectionVariants} className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3 text-center">Share this article:</h3>
          <SocialShareButtons 
            url={articleUrl} 
            title={articleTitle}
            description={articleDescription}
            className="!py-3 justify-center"
          />
        </motion.div>

        <motion.footer variants={sectionVariants} className="text-center mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Discover more helpful guides and tools on our <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline">Blog Home</Link>.
          </p>
          <img-replace src={`${siteUrl}/placeholder-blog-all-categories.jpg`} alt={articleTitle} style={{display: 'none'}} />
        </motion.footer>
      </motion.div>
    </>
  );
};

export default BlogPostAllCategories;
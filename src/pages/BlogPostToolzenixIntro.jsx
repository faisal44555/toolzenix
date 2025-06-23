import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SocialShareButtons from '@/components/common/SocialShareButtons';
import { ArrowRight, CheckCircle, Image as ImageIcon, Video, FileText as DocumentIcon, Music2, Type, QrCode, SlidersHorizontal, Calculator, Palette, Code2, Share2, ShieldCheck, FolderKanban, Sparkles, FlaskConical, Megaphone, HeartPulse, CalendarClock, Landmark, Globe2, BrainCircuit, Languages, Gamepad2, Zap, FileText } from 'lucide-react';

const BlogPostToolzenixIntro = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const siteUrl = "https://toolzenix.com";
  const articleUrl = `${siteUrl}/blog/introducing-toolzenix-your-free-online-toolkit`;
  const articleTitle = "Introducing Toolzenix: Your Ultimate Free Online Toolkit";
  const articleDescription = "Discover Toolzenix.com, the all-in-one platform offering a vast collection of 200+ free online tools across 23 powerful categories.";

  useEffect(() => {
    setCurrentUrl(window.location.href);
    window.scrollTo(0, 0);
  }, []);

  const toolCategories = [
    { name: "Image Tools", description: "Convert, compress, resize, rotate, flip, and enhance images easily.", icon: <ImageIcon className="w-6 h-6 mr-3 text-indigo-500" /> },
    { name: "Video Tools", description: "Cut, merge, compress, convert videos right in your browser.", icon: <Video className="w-6 h-6 mr-3 text-red-500" /> },
    { name: "Audio Tools", description: "Convert, trim, and adjust audio files with just a few clicks.", icon: <Music2 className="w-6 h-6 mr-3 text-green-500" /> },
    { name: "Document Tools", description: "Word, Excel, PPT, and text-related conversions and utilities.", icon: <DocumentIcon className="w-6 h-6 mr-3 text-blue-500" /> },
    { name: "PDF Tools", description: "Merge, split, compress, unlock, rotate PDFs — no software needed.", icon: <FileText className="w-6 h-6 mr-3 text-orange-500" /> },
    { name: "Text Tools", description: "Word counter, text formatter, case converter, and more.", icon: <Type className="w-6 h-6 mr-3 text-purple-500" /> },
    { name: "QR & Barcode Tools", description: "Generate and scan QR codes and barcodes instantly.", icon: <QrCode className="w-6 h-6 mr-3 text-teal-500" /> },
    { name: "Unit Converters", description: "Convert length, weight, area, temperature, currency, and more.", icon: <SlidersHorizontal className="w-6 h-6 mr-3 text-cyan-500" /> },
    { name: "Math Tools", description: "Calculators, equation solvers, and number-related utilities.", icon: <Calculator className="w-6 h-6 mr-3 text-lime-500" /> },
    { name: "Color Tools", description: "Pick colors, convert between HEX/RGB/CMYK, generate gradients.", icon: <Palette className="w-6 h-6 mr-3 text-pink-500" /> },
    { name: "Developer Tools", description: "JSON formatter, Base64 encoder/decoder, HTML viewer, etc.", icon: <Code2 className="w-6 h-6 mr-3 text-gray-500" /> },
    { name: "Social Media Tools", description: "Caption generator, hashtag tools, and more for creators.", icon: <Share2 className="w-6 h-6 mr-3 text-sky-500" /> },
    { name: "Security Tools", description: "Password generator, MD5/SHA256 hashing tools, etc.", icon: <ShieldCheck className="w-6 h-6 mr-3 text-rose-500" /> },
    { name: "File Tools", description: "ZIP/unzip, rename, and convert files securely.", icon: <FolderKanban className="w-6 h-6 mr-3 text-amber-500" /> },
    { name: "Fun & Misc Tools", description: "Random number generator, fake name generator, and more.", icon: <Sparkles className="w-6 h-6 mr-3 text-yellow-500" /> },
    { name: "Web Tools", description: "Website checker, meta tag generator, and link preview.", icon: <Globe2 className="w-6 h-6 mr-3 text-emerald-500" /> },
    { name: "Browser Tools", description: "Screen recorder, screenshot tool, and more.", icon: <Zap className="w-6 h-6 mr-3 text-violet-500" /> },
    { name: "Writing Tools", description: "Grammar checker, paraphraser, article spinner, and more.", icon: <FileText className="w-6 h-6 mr-3 text-fuchsia-500" /> },
    { name: "Student Tools", description: "GPA calculator, unit converter, scientific calculator, etc.", icon: <FlaskConical className="w-6 h-6 mr-3 text-light-blue-500" /> },
    { name: "Code Tools", description: "Code beautifiers, minifiers, diff checkers, and validators.", icon: <Code2 className="w-6 h-6 mr-3 text-warm-gray-500" /> },
    { name: "Timer Tools", description: "Stopwatch, countdown timer, and time tracker.", icon: <CalendarClock className="w-6 h-6 mr-3 text-true-gray-500" /> },
    { name: "Design Tools", description: "Favicon generator, CSS gradient generator, and UI color palettes.", icon: <Palette className="w-6 h-6 mr-3 text-red-400" /> },
    { name: "MP3 Tools", description: "MP3 cutter, converter, volume booster, and tag editor.", icon: <Music2 className="w-6 h-6 mr-3 text-blue-400" /> },
  ];

  const whyToolzenix = [
    "No installation – 100% browser-based tools.",
    "Free forever – No subscription or hidden fees.",
    "AdSense Ready – Optimized layout for fast loading and clean UX.",
    "Mobile Responsive – Works perfectly on all screen sizes.",
    "SEO Optimized – For quick indexing and better Google visibility."
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
  
  const listItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: i * 0.05, ease: "easeOut" }
    })
  };

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
        <meta property="og:image" content={`${siteUrl}/placeholder-blog-toolzenix-intro.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={articleTitle} />
        <meta name="twitter:description" content={articleDescription} />
        <meta name="twitter:image" content={`${siteUrl}/placeholder-blog-toolzenix-intro.jpg`} />
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-800 dark:text-slate-100 leading-tight">
            {articleTitle}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Published on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.header>

        <motion.section variants={sectionVariants} className="mb-8 prose prose-lg dark:prose-invert max-w-none">
          <p>
            Are you tired of switching between websites to complete everyday tasks like converting files, editing images, compressing videos, or calculating units? <strong>Toolzenix.com</strong> is your one-stop destination offering <strong>200+ powerful, free, and easy-to-use online tools</strong>, all sorted neatly into 23 essential categories — no login or installation required.
          </p>
        </motion.section>

        <motion.section variants={sectionVariants} className="mb-8 p-6 bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-700 dark:to-indigo-800 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white flex items-center">
            <Zap className="w-8 h-8 mr-3 text-yellow-300" /> What is Toolzenix?
          </h2>
          <p className="text-sky-100 dark:text-sky-200 leading-relaxed prose prose-invert max-w-none">
            Toolzenix.com is a feature-rich, all-in-one online tools platform designed for everyone — whether you're a student, professional, content creator, developer, or someone just looking to make life easier. With lightning-fast performance, mobile-friendly design, and full support for dark mode, Toolzenix is built for convenience and speed.
          </p>
        </motion.section>

        <motion.section variants={sectionVariants} className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-700 dark:text-slate-200">🧰 23 Tool Categories — Built for Real Needs</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 prose dark:prose-invert max-w-none">
            Here's a quick overview of the categories you’ll find:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolCategories.map((category, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={listItemVariants}
                className="flex items-start p-4 bg-slate-50 dark:bg-slate-800/70 rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                {category.icon}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200">{category.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={sectionVariants} className="mb-8 p-6 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-inner">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-700 dark:text-slate-200">💡 Why Toolzenix?</h2>
          <ul className="space-y-3">
            {whyToolzenix.map((item, index) => (
              <motion.li 
                key={index}
                custom={index}
                variants={listItemVariants}
                className="flex items-center"
              >
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section variants={sectionVariants} className="my-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-700 dark:text-slate-200">🌐 Visit Toolzenix.com Today!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 prose dark:prose-invert max-w-none">
            Toolzenix is the ultimate utility hub for smart users. Whether you're looking to convert a file, calculate something, or enhance media — Toolzenix has the tool you need.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 px-8 py-3">
            <a href="https://toolzenix.com/all-tools" target="_blank" rel="noopener noreferrer">
              Explore all tools now <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </motion.section>
        
        <motion.section variants={sectionVariants} className="my-10 text-center">
          <p className="text-lg text-slate-700 dark:text-slate-200 font-semibold">
            🔒 Safe. 🔧 Powerful. 🌎 Accessible. Welcome to the future of online tools.
          </p>
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
            Return to <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline">Blog Home</Link>
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default BlogPostToolzenixIntro;
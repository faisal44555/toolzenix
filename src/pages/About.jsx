import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Image, Video, FileText, Calculator, Type, QrCode, Code2, Heart, CheckCircle, Users, Globe, Shield, Zap, Award, Target } from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const achievements = [
    { icon: <Users className="w-6 h-6 text-blue-500" />, text: "200+ Free Online Tools", description: "Comprehensive collection of utilities" },
    { icon: <Globe className="w-6 h-6 text-green-500" />, text: "23 Tool Categories", description: "Organized for easy navigation" },
    { icon: <Shield className="w-6 h-6 text-purple-500" />, text: "100% Privacy Focused", description: "No data collection or storage" },
    { icon: <Zap className="w-6 h-6 text-yellow-500" />, text: "Lightning Fast", description: "Instant processing in your browser" },
    { icon: <Award className="w-6 h-6 text-red-500" />, text: "Mobile Optimized", description: "Perfect on all devices" },
    { icon: <Target className="w-6 h-6 text-indigo-500" />, text: "User-Centric Design", description: "Built for simplicity and efficiency" }
  ];

  const toolHighlights = [
    { icon: <Image className="w-6 h-6 text-pink-500" />, category: "Image Tools", count: "12+", description: "Convert, compress, resize, and enhance images" },
    { icon: <Video className="w-6 h-6 text-purple-500" />, category: "Video Tools", count: "3+", description: "Video conversion, trimming, and GIF creation" },
    { icon: <FileText className="w-6 h-6 text-indigo-500" />, category: "Document Tools", count: "14+", description: "PDF, Word, Excel, and PowerPoint utilities" },
    { icon: <Calculator className="w-6 h-6 text-green-500" />, category: "Math Tools", count: "11+", description: "Calculators and mathematical utilities" },
    { icon: <Type className="w-6 h-6 text-cyan-500" />, category: "Text Tools", count: "20+", description: "Text manipulation and analysis tools" },
    { icon: <QrCode className="w-6 h-6 text-teal-500" />, category: "QR & Barcode", count: "7+", description: "Generate and scan QR codes and barcodes" },
    { icon: <Code2 className="w-6 h-6 text-gray-500" />, category: "Developer Tools", count: "16+", description: "JSON, Base64, HTML, CSS, and JS utilities" }
  ];

  return (
    <>
      <Helmet>
        <title>About Toolzenix - Your Free Online Tool Hub | 200+ Tools in 23 Categories</title>
        <meta name="description" content="Learn about Toolzenix.com, your all-in-one free online tool hub offering 200+ tools for images, videos, documents, math, text, and more. Built with passion by Faisal Mehmood for everyone." />
        <meta name="keywords" content="about toolzenix, free online tools, image converter, video tools, document converter, text tools, developer tools, online utilities" />
        <link rel="canonical" href="https://toolzenix.com/about" />
        <meta property="og:title" content="About Toolzenix - Your Free Online Tool Hub" />
        <meta property="og:description" content="Discover the mission behind Toolzenix.com and its creator, Faisal Mehmood. Providing free, secure, and user-friendly online tools for everyone." />
        <meta property="og:url" content="https://toolzenix.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolzenix.com/og-about.jpg" />
      </Helmet>
      <motion.div 
        className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="gradient-text">About Toolzenix.com</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your All-in-One Free Online Tool Hub - Empowering Digital Productivity Since 2024
          </p>
        </motion.header>

        <motion.section className="mb-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
            At Toolzenix, we believe in making everyday digital tasks easier, faster, and accessible to everyone — without any cost or complexity. Whether you're a student, developer, designer, content creator, or just someone solving a quick problem online, Toolzenix.com is here to help you achieve more with less effort.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Our platform represents a commitment to digital democracy - providing professional-grade tools that were once expensive or complex, now available for free to anyone with an internet connection.
          </p>
        </motion.section>

        <motion.section className="mb-10" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white flex items-center justify-center">
            <Sparkles className="w-8 h-8 mr-3 text-yellow-500" />
            What We Offer
            <Sparkles className="w-8 h-8 ml-3 text-yellow-500" />
          </h2>
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-6">
            We proudly offer <strong className="text-blue-600 dark:text-blue-400">200+ real working tools</strong> across 23 comprehensive categories:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {toolHighlights.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-start p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg shadow hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                {item.icon}
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.category}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{item.count} tools available</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              All tools run <strong className="text-blue-600 dark:text-blue-400">100% on your browser (frontend-only)</strong> — meaning your files never leave your device. It's secure, private, fast, and completely free.
            </p>
          </div>
        </motion.section>

        <motion.section className="mb-10" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            <Heart className="w-8 h-8 inline-block mr-2 text-red-500" />
            Why Choose Toolzenix?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index} 
                className="flex items-start p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg shadow"
                variants={itemVariants}
              >
                {achievement.icon}
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{achievement.text}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How We're Different</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">No Registration Required</h3>
                <p className="text-gray-700 dark:text-gray-300">Start using any tool immediately without creating accounts or providing personal information.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">No Hidden Charges</h3>
                <p className="text-gray-700 dark:text-gray-300">Every tool is completely free with no premium tiers, subscriptions, or surprise fees.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Blazing Fast Performance</h3>
                <p className="text-gray-700 dark:text-gray-300">Client-side processing means instant results without waiting for server uploads or downloads.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Universal Accessibility</h3>
                <p className="text-gray-700 dark:text-gray-300">Designed for everyone — from beginners to professionals, students to business owners.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="mb-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Are all tools really free?</h3>
              <p className="text-gray-700 dark:text-gray-300">Yes! Every single tool on Toolzenix is completely free to use with no limitations, watermarks, or premium features.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is my data safe?</h3>
              <p className="text-gray-700 dark:text-gray-300">Absolutely. All processing happens in your browser - we never see, store, or have access to your files or data.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do I need to install anything?</h3>
              <p className="text-gray-700 dark:text-gray-300">No installation required! All tools work directly in your web browser on any device.</p>
            </div>
          </div>
        </motion.section>

        <motion.section className="text-center p-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-xl text-white" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Code2 className="w-8 h-8 mr-3" />
            Built With Purpose
          </h2>
          <p className="text-lg leading-relaxed mb-3">
            This platform is built and maintained by <strong className="font-semibold">Faisal Mehmood</strong>, a passionate and dedicated individual who, despite physical challenges, is building a better life by creating something valuable for the world. Toolzenix is not just a website — it's a dream in action.
          </p>
          <p className="text-lg leading-relaxed font-medium mb-6">
            By using Toolzenix, you're not only simplifying your work — you're also supporting a heartfelt mission. ❤️
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tools" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Explore All Tools
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors">
              Get in Touch
            </Link>
          </div>
        </motion.section>

        <motion.section className="mt-10 text-center" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Get Started?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Join thousands of users who trust Toolzenix for their daily digital tasks.
          </p>
          <Link to="/" className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Start Using Tools Now
            <Sparkles className="w-5 h-5 ml-2" />
          </Link>
        </motion.section>
      </motion.div>
    </>
  );
};

export default About;
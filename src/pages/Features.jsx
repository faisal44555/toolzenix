import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, Shield, Smartphone, Globe, Heart, Star, 
  CheckCircle, Users, Clock, Download, Palette, 
  Code, FileText, Image, Video, Calculator,
  QrCode, Settings, Sparkles, Award, Target,
  TrendingUp, Lock, Wifi, Battery
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Features = () => {
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

  const coreFeatures = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast Performance",
      description: "All tools run directly in your browser with instant processing. No waiting for uploads or downloads - just immediate results.",
      benefits: ["Instant processing", "No server delays", "Real-time results", "Offline capability"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "100% Privacy & Security",
      description: "Your files never leave your device. All processing happens locally in your browser, ensuring complete privacy and security.",
      benefits: ["No file uploads", "Local processing", "Zero data collection", "Complete privacy"]
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Completely Free Forever",
      description: "Every single tool is free to use with no hidden charges, premium tiers, or subscription fees. Quality tools for everyone.",
      benefits: ["No registration required", "No premium tiers", "No hidden fees", "Unlimited usage"]
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
      title: "Mobile-First Design",
      description: "Perfectly optimized for all devices. Whether you're on desktop, tablet, or mobile, enjoy the same great experience.",
      benefits: ["Responsive design", "Touch-friendly", "Mobile optimized", "Cross-platform"]
    }
  ];

  const toolCategories = [
    {
      icon: <Image className="w-6 h-6 text-pink-500" />,
      name: "Image Tools",
      count: "12+",
      description: "Convert, compress, resize, and enhance images with professional-grade tools."
    },
    {
      icon: <Video className="w-6 h-6 text-purple-500" />,
      name: "Video Tools", 
      count: "3+",
      description: "Video conversion, trimming, and GIF creation tools for content creators."
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-500" />,
      name: "Document Tools",
      count: "14+",
      description: "PDF, Word, Excel, and PowerPoint conversion and manipulation utilities."
    },
    {
      icon: <Calculator className="w-6 h-6 text-green-500" />,
      name: "Math Tools",
      count: "11+",
      description: "Calculators and mathematical utilities for students and professionals."
    },
    {
      icon: <Code className="w-6 h-6 text-gray-500" />,
      name: "Developer Tools",
      count: "16+",
      description: "JSON, Base64, HTML, CSS, and JavaScript utilities for developers."
    },
    {
      icon: <QrCode className="w-6 h-6 text-teal-500" />,
      name: "QR & Barcode",
      count: "7+",
      description: "Generate and scan QR codes and barcodes for various purposes."
    }
  ];

  const advancedFeatures = [
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "No Installation Required",
      description: "Access all tools directly through your web browser - no downloads or installations needed."
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: "Always Available",
      description: "24/7 access to all tools from anywhere in the world with an internet connection."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "User-Friendly Interface",
      description: "Intuitive design that works for beginners and professionals alike."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: "Regular Updates",
      description: "Constantly adding new tools and improving existing ones based on user feedback."
    },
    {
      icon: <Palette className="w-6 h-6 text-pink-500" />,
      title: "Dark Mode Support",
      description: "Switch between light and dark themes for comfortable usage any time of day."
    },
    {
      icon: <Battery className="w-6 h-6 text-yellow-500" />,
      title: "Low Resource Usage",
      description: "Optimized for performance with minimal impact on your device's battery and memory."
    }
  ];

  const useCases = [
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "For Students",
      description: "Perfect for academic projects, assignments, and research work.",
      examples: ["Convert documents for submissions", "Create QR codes for presentations", "Calculate mathematical problems"]
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: "For Professionals",
      description: "Streamline your workflow with professional-grade tools.",
      examples: ["Compress images for web", "Convert file formats", "Generate secure passwords"]
    },
    {
      icon: <Award className="w-6 h-6 text-blue-500" />,
      title: "For Developers",
      description: "Essential utilities for web development and programming.",
      examples: ["Format JSON data", "Encode/decode Base64", "Minify CSS/JS code"]
    },
    {
      icon: <Target className="w-6 h-6 text-green-500" />,
      title: "For Content Creators",
      description: "Tools to enhance your creative workflow and content production.",
      examples: ["Resize images for social media", "Create video thumbnails", "Generate color palettes"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - Why Choose Toolzenix | 200+ Free Online Tools</title>
        <meta name="description" content="Discover the key features and benefits of Toolzenix.com - 200+ free online tools with lightning-fast performance, complete privacy, mobile optimization, and no registration required." />
        <meta name="keywords" content="toolzenix features, free online tools, privacy-focused tools, mobile-friendly tools, browser-based tools, no registration tools" />
        <link rel="canonical" href="https://toolzenix.com/features" />
        <meta property="og:title" content="Features - Why Choose Toolzenix for Free Online Tools" />
        <meta property="og:description" content="Explore Toolzenix features: 200+ free tools, instant processing, complete privacy, mobile optimization, and professional-grade utilities for everyone." />
        <meta property="og:url" content="https://toolzenix.com/features" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolzenix.com/og-features.jpg" />
      </Helmet>

      <motion.div
        className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            <span className="text-gray-900 dark:text-white">Why Choose </span>
            <span className="gradient-text">Toolzenix?</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the powerful features that make Toolzenix the ultimate destination for free online tools. 
            Built for speed, privacy, and accessibility.
          </p>
        </motion.header>

        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Core Features That Set Us Apart
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                variants={itemVariants}
              >
                <div className="flex items-start mb-4">
                  {feature.icon}
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-1">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Comprehensive Tool Categories
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Over 200 professional-grade tools organized into 23 categories for every need imaginable.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((category, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <div className="flex items-center mb-3">
                  {category.icon}
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{category.count} tools</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/tools">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore All Categories
                <Settings className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.section>

        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Advanced Features & Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="flex items-start">
                  {feature.icon}
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Perfect for Every User
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl"
                variants={itemVariants}
              >
                <div className="flex items-start mb-4">
                  {useCase.icon}
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {useCase.description}
                    </p>
                    <ul className="space-y-2">
                      {useCase.examples.map((example, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-16 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Are all tools really free?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Yes! Every tool is completely free with no limitations, watermarks, or premium features.
              </p>
              
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do I need to create an account?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                No registration required. Start using any tool immediately without providing personal information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How secure are my files?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Completely secure. All processing happens in your browser - we never see or store your files.
              </p>
              
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I use tools offline?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Many tools work offline after the initial page load, thanks to our browser-based architecture.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="text-center p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl text-white"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg mb-6 text-blue-100 max-w-2xl mx-auto">
            Join thousands of users who trust Toolzenix for their daily digital tasks. 
            Start using our powerful, free tools today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button size="lg" variant="outline" className="bg-white text-blue-700 hover:bg-blue-50 border-white">
                <Zap className="w-5 h-5 mr-2" />
                Start Using Tools
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                <Heart className="w-5 h-5 mr-2" />
                Learn Our Story
              </Button>
            </Link>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Features;
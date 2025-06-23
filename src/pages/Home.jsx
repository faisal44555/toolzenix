import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { allToolCategories } from '@/config/navigation';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/lib/utils';
import LazyLoad from '@/components/common/LazyLoad';

const CategoryCard = ({ category, delay }) => {
  const IconComponent = LucideIcons[category.icon] || LucideIcons.Wrench;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        to={category.path}
        className="group block bg-white dark:bg-slate-800/60 p-6 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700/50 hover:border-blue-500 dark:hover:border-blue-400"
      >
        <div className="flex items-center mb-3">
          <IconComponent
            className={cn(
              "w-7 h-7 mr-3 group-hover:scale-110 transition-transform",
              category.color || 'text-blue-600 dark:text-blue-400'
            )}
          />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {category.name}
          </h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10 overflow-hidden">
          {category.description || `Explore various ${category.name.toLowerCase()} tools.`}
        </p>
        <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
          View Tools <LucideIcons.ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
};


const features = [
    { emoji: "⚡", title: "Fast & Free", description: "All tools are free to use and load instantly" },
    { emoji: "🛠️", title: "200+ Tools", description: "Organized in 23 categories for every need" },
    { emoji: "🌐", title: "No Signup Required", description: "Use any tool without creating an account" },
    { emoji: "🎨", title: "Modern Design", description: "Clean, user-friendly and responsive layout" },
    { emoji: "🔒", title: "Privacy Focused", description: "No data is stored or shared" },
    { emoji: "📱", title: "Mobile Friendly", description: "Works perfectly on all devices" },
    { emoji: "💡", title: "Smart Tools", description: "Built with the latest frontend technologies" },
    { emoji: "🚀", title: "Constant Updates", description: "New tools added regularly" },
];

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Toolzenix - 200+ Free Online Tools | Convert, Edit & More</title>
        <meta name="description" content="Toolzenix offers 200+ free online tools: image converters, video editors, document tools, calculators, and more. All 100% frontend, secure, and easy to use." />
        <link rel="canonical" href="https://toolzenix.com/" />
        <meta property="og:title" content="Toolzenix - 200+ Free Online Tools | Convert, Edit & More" />
        <meta property="og:description" content="Explore a vast collection of free online tools for images, videos, documents, text, math, and development at Toolzenix.com. Secure, fast, and user-friendly." />
        <meta property="og:url" content="https://toolzenix.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolzenix.com/og-image.png" />
      </Helmet>
      <div className="space-y-16 md:space-y-24 py-6 md:py-10">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            <span className="block text-slate-800 dark:text-slate-100">Welcome to</span>
            <span className="gradient-text block">Toolzenix</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">Your ultimate hub for 200+ free, secure, and easy-to-use online tools. All tools work offline in your browser!</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white dark:from-blue-500 dark:to-indigo-600 dark:hover:from-blue-600 dark:hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <Link to={allToolCategories[0]?.path || "/image-tools"}>
                Get Started <LucideIcons.ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.section>

        <LazyLoad placeholderHeight="100vh">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.05 }}
            className="px-4"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                Explore Our <span className="gradient-text">Tool Categories</span>
              </h2>
              <p className="text-md md:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                Discover a wide array of tools to simplify your digital tasks.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {allToolCategories.map((category, index) => (
                <CategoryCard key={category.path} category={category} delay={index * 0.05} />
              ))}
            </div>
          </motion.section>
        </LazyLoad>
        
        <LazyLoad placeholderHeight="50vh">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="px-4"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                🌟 Why Choose <span className="gradient-text">Toolzenix?</span>
              </h2>
              <p className="text-md md:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                Experience the difference with our powerful and user-centric platform.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="bg-white dark:bg-slate-800/60 p-6 rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-indigo-500/30 transition-all duration-300 border border-slate-200 dark:border-slate-700/50 hover:border-indigo-500 dark:hover:border-indigo-400"
                >
                  <div className="flex items-start mb-3">
                    <span className="text-3xl mr-3">{feature.emoji}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </LazyLoad>

        <LazyLoad placeholderHeight="300px">
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4 py-12 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 rounded-xl shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Boost Your Productivity?</h2>
            <p className="text-lg text-blue-100 dark:text-blue-200 mb-8 max-w-lg mx-auto">
              Dive into our collection of tools and experience the ease of Toolzenix.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <Button asChild size="lg" variant="outline" className="bg-white text-blue-700 hover:bg-blue-50 dark:bg-slate-100 dark:text-blue-700 dark:hover:bg-slate-200 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-300 font-semibold shadow-md hover:shadow-lg transition-all duration-300">
              <Link to="/sitemap"> 
                Explore All Tools
              </Link>
            </Button>
            </motion.div>
          </motion.section>
        </LazyLoad>

      </div>
    </>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { mainNavLinks, allToolCategories, individualTools } from '@/config/navigation';
const getCategoryIcon = categoryName => {
  const category = allToolCategories.find(cat => cat.name === categoryName);
  if (category && category.icon) {
    const IconComponent = LucideIcons[category.icon];
    return IconComponent ? <IconComponent className="w-5 h-5 mr-2 text-indigo-500" /> : <LucideIcons.FileDigit className="w-5 h-5 mr-2 text-indigo-500" />;
  }
  // Fallback for main pages or if icon not found in allToolCategories
  switch (categoryName) {
    case 'Main Pages':
      return <LucideIcons.Home className="w-5 h-5 mr-2 text-indigo-500" />;
    // Add other specific fallbacks if needed, though dynamic import should cover most
    default:
      return <LucideIcons.FolderOpen className="w-5 h-5 mr-2 text-gray-500" />;
  }
};
const SitemapPage = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [sitemapData, setSitemapData] = useState([]);
  useEffect(() => {
    setCurrentUrl(window.location.href);
    const generatedSitemapData = [];
    generatedSitemapData.push({
      category: 'Main Pages',
      icon: getCategoryIcon('Main Pages'),
      links: mainNavLinks.map(link => ({
        name: link.text,
        path: link.to
      })).concat([{
        name: 'Sitemap',
        path: '/sitemap'
      }, {
        name: 'Privacy Policy',
        path: '/privacy-policy'
      }, {
        name: 'Contact',
        path: '/contact'
      }])
    });
    allToolCategories.forEach(category => {
      const categoryTools = individualTools.filter(tool => tool.category === category.name).map(tool => ({
        name: tool.name,
        path: tool.path
      }));

      // Always add the category page link first
      const categoryPageLink = {
        name: `${category.name} (Category Page)`,
        path: category.path
      };
      const linksForCategory = [categoryPageLink, ...categoryTools];
      generatedSitemapData.push({
        category: category.name,
        icon: getCategoryIcon(category.name),
        basePath: category.path,
        // Used for context if needed, but links are absolute
        links: linksForCategory
      });
    });
    setSitemapData(generatedSitemapData);
    window.scrollTo(0, 0);
  }, []);
  const sectionVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
        staggerChildren: 0.05,
        ease: "easeOut"
      }
    }
  };
  const itemVariants = {
    initial: {
      opacity: 0,
      x: -10
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  return <>
      <Helmet>
        <title>Sitemap - Toolzenix</title>
        <meta name="description" content="Explore all pages and tools available on Toolzenix.com. Easily navigate through our comprehensive sitemap." />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content="Sitemap - Toolzenix" />
        <meta property="og:description" content="Navigate Toolzenix.com with ease using our complete sitemap. Find all tools and information pages." />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-10 bg-white dark:bg-slate-900 shadow-xl rounded-lg my-8">
        <motion.header variants={sectionVariants} initial="initial" animate="animate" className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center">
            <LucideIcons.Map className="w-10 h-10 mr-4 text-indigo-600 dark:text-indigo-400" />
            Toolzenix Sitemap
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">Discover all the pages and tools available on our platform</p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapData.map((section, sectionIndex) => <motion.section key={sectionIndex} variants={sectionVariants} initial="initial" animate="animate" className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-slate-700 dark:text-slate-200 flex items-center">
                {section.icon}
                {section.category}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => <motion.li key={linkIndex} variants={itemVariants}>
                    <Link to={link.path} // Links are now absolute from navigation.js
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 text-sm flex items-center group">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                      {link.name}
                    </Link>
                  </motion.li>)}
              </ul>
            </motion.section>)}
        </div>

        <motion.footer variants={sectionVariants} initial="initial" animate="animate" className="text-center mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Can't find what you're looking for? Try our <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">site search</Link> or <Link to="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact us</Link>.
          </p>
        </motion.footer>
      </div>
    </>;
};
export default SitemapPage;
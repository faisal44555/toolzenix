import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Newspaper, BookOpen } from 'lucide-react';
import { individualTools } from '@/config/navigation';

const BlogPage = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const siteUrl = "https://toolzenix.com";

  useEffect(() => {
    setCurrentUrl(window.location.href);
    window.scrollTo(0, 0);
  }, []);

  const staticBlogPostsList = [
    {
      title: "Introducing Toolzenix: Your Ultimate Free Online Toolkit",
      description: "Discover Toolzenix.com, the all-in-one platform offering a vast collection of 200+ free online tools across 23 powerful categories. From image and video editing to document conversion and development utilities, Toolzenix is designed for everyone.",
      slug: "/blog/introducing-toolzenix-your-free-online-toolkit", 
      date: "June 17, 2025",
      category: "Platform Introduction",
      type: "static"
    },
    {
      title: "Toolzenix: Your One-Stop Shop for Online Tools",
      description: "Discover why Toolzenix is the ultimate one-stop shop for all your online tool needs. Explore over 200+ free tools across 23 categories.",
      slug: "/blog/toolzenix-your-one-stop-shop-for-online-tools",
      date: "June 21, 2025",
      category: "Platform Overview",
      type: "static"
    },
    {
      title: "Explore 200+ Free Online Tools in 23 Powerful Categories | Toolzenix",
      description: "Dive into Toolzenix.com's vast collection of over 200 free online tools, expertly organized into 23 categories. Find everything you need in one place—no signup, no fees, just powerful tools.",
      slug: "/blog/explore-all-tool-categories",
      date: "June 20, 2025",
      category: "Platform Overview",
      type: "static"
    },
    {
      title: "Getting Started with Free Online Tools",
      description: "A new blog post on Toolzenix. Start writing your content here.",
      slug: "/blog/my-first-post",
      date: "June 18, 2025",
      category: "Getting Started",
      type: "static"
    },
    {
      title: "Advanced Tips for Online Tool Mastery",
      description: "The second blog post, ready for more insightful content.",
      slug: "/blog/another-great-article",
      date: "June 19, 2025",
      category: "Tips & Tricks",
      type: "static"
    }
  ];

  const toolBlogPosts = individualTools.map(tool => ({
    title: `${tool.name} – Free & Fast Online Tool`,
    description: `Learn how to use the ${tool.name} tool on Toolzenix. ${tool.description}`,
    slug: `/blog${tool.path}`,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }), 
    category: tool.category,
    type: "tool-guide"
  }));

  const allBlogPosts = [...staticBlogPostsList, ...toolBlogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } }
  };
  
  const listItemVariants = (index) => ({
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, delay: index * 0.05, ease: "easeOut" } 
    }
  });

  return (
    <>
      <Helmet>
        <title>Toolzenix Blog – Tips, Guides, and Tool Updates</title>
        <meta name="description" content="Explore articles, guides, and updates about Toolzenix's 200+ free online tools. Learn how to maximize your productivity and creativity." />
        <link rel="canonical" href={`${siteUrl}/blog`} />
        <meta property="og:title" content="Toolzenix Blog – Tips, Guides, and Tool Updates" />
        <meta property="og:description" content="Your source for learning about Toolzenix tools, online productivity, and digital tips." />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toolzenix Blog – Tips, Guides, and Tool Updates" />
        <meta name="twitter:description" content="Stay informed with the latest from Toolzenix: 200+ free online tools at your service." />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
      </Helmet>

      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-10 bg-white dark:bg-slate-900 shadow-xl rounded-lg my-8"
      >
        <motion.header 
          variants={sectionVariants}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-800 dark:text-slate-100 flex items-center justify-center">
            <Newspaper className="w-10 h-10 mr-4 text-indigo-500" />
            The Toolzenix <span className="gradient-text ml-2">Blog</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Your guide to mastering over 200+ free online tools. Discover tips, tricks, and updates to boost your productivity and creativity.
          </p>
        </motion.header>

        <motion.section 
          variants={sectionVariants} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
        >
          {allBlogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              custom={index}
              variants={listItemVariants(index)}
              className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={post.slug} className="block">
                <img  alt={post.title} className="w-full h-48 object-cover" src="https://images.unsplash.com/photo-1504983875-d3b163aba9e6" />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400 mb-1">{post.category}</span>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex-grow">
                  <Link to={post.slug}>{post.title}</Link>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{post.date}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 flex-grow">
                  {post.description}
                </p>
                <div className="mt-auto">
                  <Button asChild variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 px-0">
                    <Link to={post.slug}>
                      Read More <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>
        
        <motion.footer variants={sectionVariants} className="text-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
            <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
            <em>Toolzenix Blog – Unlocking Your Potential with Free Online Tools.</em>
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default BlogPage;
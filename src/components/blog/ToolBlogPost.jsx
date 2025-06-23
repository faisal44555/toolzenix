import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SocialShareButtons from '@/components/common/SocialShareButtons';
import { ArrowRight, CheckCircle, Users, Zap, Shield, Rocket, Smartphone, FileUp, Cog, Download } from 'lucide-react';
import { individualTools, allToolCategories } from '@/config/navigation';
import NotFound from '@/pages/NotFound';

const ToolBlogPost = () => {
  const { slug } = useParams();
  const siteUrl = "https://toolzenix.com";

  const tool = individualTools.find(t => t.path === `/${slug}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!tool) {
    return <NotFound />;
  }

  const generateTitle = () => {
    return `${tool.name} – Free & Fast Online Tool`;
  };
  
  const generateMetaDescription = () => {
      const baseDesc = `Discover the ${tool.name}, a free and fast online tool from Toolzenix. ${tool.description} No signup needed. Perfect for students, developers, and marketers.`;
      return baseDesc.slice(0, 155);
  };

  const articleTitle = generateTitle();
  const articleDescription = generateMetaDescription();
  const articleUrl = `${siteUrl}/blog/${slug}`;
  
  const keywords = [
    tool.name,
    `${tool.name} online`,
    `free ${tool.name}`,
    tool.category,
    'Toolzenix',
    slug.replace(/-/g, ' ')
  ].join(', ');

  const features = [
    { icon: <Rocket className="w-5 h-5 mr-2 text-green-500" />, text: "No login needed" },
    { icon: <Zap className="w-5 h-5 mr-2 text-yellow-500" />, text: "Works offline after first load" },
    { icon: <FileUp className="w-5 h-5 mr-2 text-blue-500" />, text: "Supports multiple files" },
    { icon: <Shield className="w-5 h-5 mr-2 text-purple-500" />, text: "Privacy-focused: no server uploads" },
    { icon: <Smartphone className="w-5 h-5 mr-2 text-rose-500" />, text: "Fully mobile-friendly" },
    { icon: <CheckCircle className="w-5 h-5 mr-2 text-indigo-500" />, text: "100% Free, no hidden costs" },
  ];
  
  const useCaseMap = {
    "Image Tools": [
        { title: "For Social Media Marketers", text: "Quickly compress and resize images for faster loading times on Instagram, Facebook, and Twitter posts." },
        { title: "For Web Developers", text: "Optimize website images to improve page speed scores and user experience without losing quality." },
        { title: "For Students", text: "Easily convert images to the required format (like PNG or JPG) for assignments and presentations." }
    ],
    "Document Tools": [
        { title: "For Office Professionals", text: "Merge multiple PDF reports into a single document for streamlined sharing and archiving." },
        { title: "For Students", text: "Combine lecture notes, research papers, and assignments into one PDF for easy studying." },
        { title: "For Legal Assistants", text: "Protect sensitive legal documents with a password before sharing them via email." }
    ],
    "Default": [
        { title: "For Everyday Tasks", text: "A quick and easy solution for your daily needs without requiring any software installation." },
        { title: "For Professionals", text: "Streamline your workflow with a reliable tool that works right in your browser." },
        { title: "For Hobbyists", text: "Perfect for personal projects, allowing you to get the job done fast and free." }
    ]
  };
  
  const getUseCases = (category) => {
    return useCaseMap[category] || useCaseMap.Default;
  };

  const useCases = getUseCases(tool.category);

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
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3, delay: index * 0.05, ease: "easeOut" } }
  });

  return (
    <>
      <Helmet>
        <title>{articleTitle}</title>
        <meta name="description" content={articleDescription} />
        <link rel="canonical" href={articleUrl} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={articleTitle} />
        <meta property="og:description" content={articleDescription} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Toolzenix" />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={articleTitle} />
        <meta name="twitter:description" content={articleDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
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
            {tool.name} – Free &amp; Fast Online Tool
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">In <Link to={allToolCategories.find(cat => cat.name === tool.category)?.path || '/tools'} className="text-indigo-600 hover:underline">{tool.category}</Link></p>
        </motion.header>

        <motion.section variants={sectionVariants} className="mb-8 prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl">
            The <strong>{tool.name}</strong> is a free, browser-based utility designed for everyone from {useCases[0].title.split(' ')[1].toLowerCase()} to {useCases[1].title.split(' ')[1].toLowerCase()}. {tool.description} It provides a simple, fast, and secure way to get your task done without any software downloads or sign-ups.
          </p>
        </motion.section>

        <motion.section variants={sectionVariants} className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/70 rounded-lg shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-700 dark:text-slate-200">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {features.map((feature, index) => (
              <motion.li key={index} custom={index} variants={listItemVariants(index)} className="flex items-center text-slate-600 dark:text-slate-300">
                {feature.icon} {feature.text}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <motion.section variants={sectionVariants} className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-700 dark:text-slate-200 flex items-center">
            How to Use the {tool.name}
          </h2>
          <ol className="space-y-4">
            <motion.li variants={listItemVariants(0)} custom={0} className="flex items-start">
              <div className="flex-shrink-0 bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4">1</div>
              <div>
                <h3 className="font-semibold text-lg">Upload Your File</h3>
                <p className="text-slate-600 dark:text-slate-400">Click the upload area to select your file or simply drag and drop it.</p>
              </div>
            </motion.li>
            <motion.li variants={listItemVariants(1)} custom={1} className="flex items-start">
              <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4">2</div>
              <div>
                <h3 className="font-semibold text-lg">Click on Convert</h3>
                 <p className="text-slate-600 dark:text-slate-400">The tool will automatically process your file. Adjust settings if available.</p>
              </div>
            </motion.li>
            <motion.li variants={listItemVariants(2)} custom={2} className="flex items-start">
              <div className="flex-shrink-0 bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4">3</div>
              <div>
                 <h3 className="font-semibold text-lg">Preview & Download</h3>
                 <p className="text-slate-600 dark:text-slate-400">Preview the result and click the download button to save your file.</p>
              </div>
            </motion.li>
          </ol>
        </motion.section>

        <motion.section variants={sectionVariants} className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-700 dark:text-slate-200 flex items-center">
            <Users className="w-7 h-7 mr-3 text-orange-500" /> Real-World Use Cases
          </h2>
          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <motion.div key={index} custom={index} variants={listItemVariants(index)} className="p-4 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800">
                <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-1">{useCase.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{useCase.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={sectionVariants} className="my-10 text-center p-6 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 rounded-lg shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            Ready to Try It?
          </h2>
          <p className="text-indigo-100 dark:text-indigo-200 mb-6 prose prose-invert max-w-none">
            Experience the simplicity and power of the {tool.name} for yourself. It's free, fast, and waiting for you!
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-indigo-600 font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 px-8 py-3">
            <Link to={tool.path}>
              Use {tool.name} Now <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.section>

        <motion.div variants={sectionVariants} className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
          <SocialShareButtons 
            url={articleUrl} 
            title={articleTitle}
            description={articleDescription}
            className="!py-3 justify-center"
          />
        </motion.div>

        <motion.footer variants={sectionVariants} className="text-center mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Discover more helpful guides on our <Link to="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline">Blog Home</Link> or explore all <Link to="/tools" className="text-indigo-600 dark:text-indigo-400 hover:underline">200+ Tools</Link>.
          </p>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default ToolBlogPost;
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ShieldCheck, DatabaseZap, Cookie, Users, AlertTriangle, FileText } from "lucide-react";

const PrivacyPolicyOld = () => {
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

  const policyPoints = [
    {
      icon: <DatabaseZap className="w-7 h-7 text-green-500 flex-shrink-0" />,
      title: "1. No Data Collection",
      text: "We do not collect, store, or share any personal information. All tools are built to work 100% in your browser, so your data (images, videos, documents, etc.) never leaves your device."
    },
    {
      icon: <Cookie className="w-7 h-7 text-orange-500 flex-shrink-0" />,
      title: "2. No Cookies, No Trackers",
      text: "We do not use any cookies, tracking scripts, or analytics tools. Your usage is completely private and anonymous."
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-blue-500 flex-shrink-0" />,
      title: "3. File Safety",
      text: "Your uploaded files are processed locally in your browser using frontend technologies (HTML/CSS/JS). Nothing is uploaded to any server, and all files remain secure on your device."
    },
    {
      icon: <AlertTriangle className="w-7 h-7 text-yellow-500 flex-shrink-0" />,
      title: "4. Third-Party Ads",
      text: "Toolzenix may display ads through Google AdSense or other platforms. These third parties may use cookies to serve ads based on your interests. You can control or disable cookies via your browser settings."
    },
    {
      icon: <Users className="w-7 h-7 text-purple-500 flex-shrink-0" />,
      title: "5. Children’s Privacy",
      text: "Toolzenix is safe for general audiences but not intended for children under 13. We do not knowingly collect any information from children."
    },
    {
      icon: <FileText className="w-7 h-7 text-indigo-500 flex-shrink-0" />,
      title: "6. Changes to This Policy",
      text: "We may update this Privacy Policy occasionally. Please review this page periodically. Continued use of the site after changes implies your acceptance."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Old Privacy Policy | Toolzenix.com</title>
        <meta name="description" content="Read the Privacy Policy for Toolzenix.com. We prioritize your privacy with no data collection, no cookies, and secure frontend-only tools. Effective Date: 4 June 2025." />
        <meta property="og:title" content="Old Privacy Policy | Toolzenix.com" />
        <meta property="og:description" content="Learn how Toolzenix.com handles your information. Your privacy and data security are our top priorities. Effective Date: 4 June 2025." />
        <meta property="og:url" content="https://www.toolzenix.com/privacy-old" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.toolzenix.com/privacy-old" />
      </Helmet>
      <motion.div 
        className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-5xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500">Privacy Policy (Archived)</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Effective Date: <span className="font-semibold">4 June 2025</span>
          </p>
        </motion.header>

        <motion.section 
          className="mb-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700"
          variants={itemVariants}
        >
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            At Toolzenix.com, we deeply respect your privacy. This Privacy Policy outlines how we handle your information while you use our free online tools.
          </p>
        </motion.section>

        <motion.div className="space-y-8" variants={containerVariants}>
          {policyPoints.map((point, index) => (
            <motion.section 
              key={index} 
              className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700"
              variants={itemVariants}
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">{point.icon}</div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">{point.title}</h2>
                  <p className="text-md leading-relaxed text-gray-700 dark:text-gray-300">{point.text}</p>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default PrivacyPolicyOld;
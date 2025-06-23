import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { AlertTriangle, FileText, Shield, Server, ExternalLink, BellRing, Mail } from "lucide-react";

const Disclaimer = () => {
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

  const sections = [
    {
      icon: <FileText className="w-7 h-7 text-blue-500 flex-shrink-0" />,
      title: "Tool Functionality",
      text: "Hum har tool ko achchi tarah test karte hain lekin 100% accuracy ya result ki guarantee nahi dete. Users apni files ka istemal apni zimmedari par karte hain.",
    },
    {
      icon: <Server className="w-7 h-7 text-green-500 flex-shrink-0" />,
      title: "No File Storage",
      text: "Toolzenix ke sabhi tools frontend-only hain — iska matlab hai ki aapki koi bhi file, image, video ya document hamare server par upload nahi hoti. Aapka data sirf aapke browser mein process hota hai.",
    },
    {
      icon: <Shield className="w-7 h-7 text-purple-500 flex-shrink-0" />,
      title: "No Legal or Professional Advice",
      text: "Toolzenix par diye gaye koi bhi result ya information legal, medical, financial, ya professional advice nahi hai. Kisi bhi important faisle se pehle aapko expert se salah lena chahiye.",
    },
    {
      icon: <ExternalLink className="w-7 h-7 text-orange-500 flex-shrink-0" />,
      title: "External Links",
      text: "Toolzenix.com kuch external websites ya ads ke links dikhata hai (jaise Google Ads). Hum un external sites ke content, privacy, ya policies ke liye zimmedar nahi hain.",
    },
    {
      icon: <BellRing className="w-7 h-7 text-yellow-500 flex-shrink-0" />,
      title: "Ad Services",
      text: "Toolzenix par dikhaye gaye ads Google AdSense ya doosre trusted ad networks ke through hote hain. Ye third-party services ho sakta hai cookies ya tracking use karein.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Disclaimer | Toolzenix.com</title>
        <meta name="description" content="Toolzenix.com ke liye important disclaimer aur terms. Hamare tools ke upyog ke liye guidelines." />
      </Helmet>

      <motion.div
        className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header className="text-center mb-12" variants={itemVariants}>
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mr-4" />
            <h1 className="text-5xl font-extrabold">
              <span className="gradient-text">Disclaimer</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Toolzenix.com par uplabdh sabhi tools sirf informational aur practical use ke liye diye gaye hain.
          </p>
        </motion.header>

        <motion.div className="space-y-8" variants={containerVariants}>
          {sections.map((section, index) => (
            <motion.section
              key={index}
              className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
              variants={itemVariants}
            >
              <div className="flex items-start">
                <div className="mr-4 mt-1">{section.icon}</div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {section.text}
                  </p>
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>

        <motion.section
          className="mt-12 p-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-xl text-white text-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
            <Mail className="w-8 h-8 mr-3" />
            Final Note
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Toolzenix ka upyog karne ka matlab hai ki aap is Disclaimer se sahmat hain.
          </p>
          <p className="text-lg">
            Agar aapko kisi tool ya service mein problem hoti hai, toh humein contact kar sakte hain:
          </p>
          <a
            href="mailto:toolzenix@gmail.com"
            className="inline-block mt-4 text-xl font-semibold hover:underline"
          >
            📧 toolzenix@gmail.com
          </a>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Disclaimer;
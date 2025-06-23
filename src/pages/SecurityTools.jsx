import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, ShieldCheck, KeyRound, LockKeyhole, Fingerprint, ShieldAlert, MessageSquare as BotMessageSquare, Pin } from 'lucide-react';
import { Helmet } from "react-helmet-async";

const tools = [
  {
    title: "Password Generator",
    description: "Generate strong, secure, and random passwords in seconds.",
    icon: <KeyRound className="w-6 h-6" />,
    link: "/password-generator",
    color: "bg-blue-500"
  },
  {
    title: "Password Strength Checker",
    description: "Check how strong your password is and get security tips.",
    icon: <ShieldAlert className="w-6 h-6" />,
    link: "/password-strength-checker",
    color: "bg-green-500"
  },
  {
    title: "MD5 Hash Generator",
    description: "Create MD5 hashes from text — perfect for integrity checks.",
    icon: <Fingerprint className="w-6 h-6" />,
    link: "/md5-generator",
    color: "bg-purple-500"
  },
  {
    title: "SHA256 Hash Generator",
    description: "Generate SHA256 hashes with high-level encryption standards.",
    icon: <LockKeyhole className="w-6 h-6" />,
    link: "/sha256-generator",
    color: "bg-red-500"
  },
  {
    title: "Text Encrypt/Decrypt",
    description: "Encrypt or decrypt any message using a passphrase – locally.",
    icon: <BotMessageSquare className="w-6 h-6" />,
    link: "/secure-text-encrypt-decrypt",
    color: "bg-yellow-500"
  },
  {
    title: "Random PIN Generator",
    description: "Instantly create secure numeric PINs for forms, cards, and more.",
    icon: <Pin className="w-6 h-6" />,
    link: "/random-pin-generator",
    color: "bg-teal-500"
  }
];

const SecurityTools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Free Online Security Tools | Toolzenix</title>
        <meta 
          name="description" 
          content="Protect your data with Toolzenix's free security tools: Password Generator, Strength Checker, MD5 & SHA256 Hash Generators, Text Encryption, PIN Generator. 100% client-side."
        />
        <link rel="canonical" href="https://toolzenix.com/security-tools" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <ShieldCheck className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Security <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Toolzenix.com brings you a powerful set of free online <strong>Security Tools</strong> to protect your data, strengthen your passwords, and secure your digital presence — all in your browser. No signup. No tracking. 100% privacy-focused.
          </p>
        </motion.div>

        <div className="mb-10 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search security tools (e.g., Password, Hash, Encrypt...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500"
              aria-label="Search security tools"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800/70 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-transparent hover:border-red-500/30 dark:border-gray-700/50 dark:hover:border-red-500/50"
            >
              <Link to={tool.link} className="block group p-6 h-full flex flex-col">
                <div className="flex items-start space-x-4 mb-3">
                  <div className={`${tool.color} p-3 rounded-lg text-white shadow-md`}>
                    {React.cloneElement(tool.icon, { "aria-hidden": true, className: "w-6 h-6" })}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {tool.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
                  {tool.description}
                </p>
                <div className="mt-4 text-right">
                   <span className="text-xs font-medium text-red-500 dark:text-red-400 group-hover:underline">
                    Open Tool &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
         {filteredTools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ShieldAlert className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">No security tools found for "{searchQuery}".</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try a different search term.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-red-700 via-rose-700 to-pink-800 dark:from-red-800 dark:via-rose-800 dark:to-pink-900 rounded-xl p-8 sm:p-12 text-white text-center shadow-2xl"
        >
          <ShieldCheck className="w-12 h-12 mx-auto text-pink-300 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Security, Our Priority</h2>
          <p className="text-rose-200 dark:text-pink-200 max-w-xl mx-auto">
            All security tools are 100% frontend-based and work directly in your browser. Your data never leaves your device.
          </p>
          <p className="text-sm mt-6 text-rose-300 dark:text-pink-300">
            Stay safe and secure with Toolzenix.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default SecurityTools;
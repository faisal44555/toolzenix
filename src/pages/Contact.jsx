import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Facebook, Instagram, MessageSquare, Clock, Phone, MapPin, Send, HelpCircle, Bug, Lightbulb, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [selectedTopic, setSelectedTopic] = useState("");

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

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 mr-3 text-blue-500" />,
      label: "Email Support",
      value: "toolzenix@gmail.com",
      href: "mailto:toolzenix@gmail.com",
      description: "Best for detailed questions and bug reports"
    },
    {
      icon: <Facebook className="w-6 h-6 mr-3 text-blue-600" />,
      label: "Facebook",
      value: "facebook.com/toolzenix",
      href: "https://facebook.com/toolzenix",
      description: "Follow us for updates and announcements"
    },
    {
      icon: <Instagram className="w-6 h-6 mr-3 text-pink-500" />,
      label: "Instagram",
      value: "instagram.com/toolzenix",
      href: "https://instagram.com/toolzenix",
      description: "Visual updates and behind-the-scenes content"
    },
  ];

  const contactTopics = [
    { icon: <HelpCircle className="w-5 h-5 text-blue-500" />, label: "General Question", value: "general" },
    { icon: <Bug className="w-5 h-5 text-red-500" />, label: "Bug Report", value: "bug" },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />, label: "Feature Request", value: "feature" },
    { icon: <Star className="w-5 h-5 text-purple-500" />, label: "Feedback", value: "feedback" }
  ];

  const faqItems = [
    {
      question: "How do I report a bug or issue?",
      answer: "Send us an email at toolzenix@gmail.com with details about the issue, including which tool you were using and what browser you're on."
    },
    {
      question: "Can you add a specific tool I need?",
      answer: "We love feature requests! Email us with your tool idea and we'll consider adding it to our development roadmap."
    },
    {
      question: "Are your tools really free forever?",
      answer: "Yes! All tools on Toolzenix are completely free with no hidden charges, premium tiers, or subscription fees."
    },
    {
      question: "How can I support Toolzenix?",
      answer: "Share our tools with friends, follow us on social media, and send us feedback. Your support helps us grow!"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Toolzenix - Get Support & Share Feedback | Free Online Tools</title>
        <meta name="description" content="Contact Toolzenix.com for questions, feedback, suggestions, or bug reports. We value your input and respond within 24-48 hours. Email: toolzenix@gmail.com" />
        <meta name="keywords" content="contact toolzenix, support, feedback, bug report, feature request, help, customer service" />
        <link rel="canonical" href="https://toolzenix.com/contact" />
        <meta property="og:title" content="Contact Toolzenix - Get Support & Share Feedback" />
        <meta property="og:description" content="Reach out to Toolzenix via email or social media. We're here to help and listen to your feedback about our free online tools." />
        <meta property="og:url" content="https://toolzenix.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolzenix.com/og-contact.jpg" />
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
            <span className="gradient-text">Contact Toolzenix</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're always happy to hear from you! Get support, share feedback, or just say hello.
          </p>
        </motion.header>

        <motion.section 
          className="mb-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How Can We Help You?</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            Whether you have a question, feedback, suggestions, or want to report a bug — feel free to reach out. At Toolzenix, your input helps us grow and build even better tools for you and the global community.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {contactTopics.map((topic) => (
              <button
                key={topic.value}
                onClick={() => setSelectedTopic(topic.value)}
                className={`flex items-center p-3 rounded-lg border transition-colors ${
                  selectedTopic === topic.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                {topic.icon}
                <span className="ml-2 font-medium">{topic.label}</span>
              </button>
            ))}
          </div>

          {selectedTopic && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg"
            >
              <p className="text-gray-700 dark:text-gray-300">
                {selectedTopic === 'general' && "For general questions about our tools or platform, email us with your question and we'll get back to you quickly."}
                {selectedTopic === 'bug' && "Found a bug? Please include details about what tool you were using, what browser you're on, and what happened."}
                {selectedTopic === 'feature' && "Have an idea for a new tool? We'd love to hear it! Describe what you need and how it would help you."}
                {selectedTopic === 'feedback' && "Your feedback helps us improve! Tell us what you love, what could be better, or share your success stories."}
              </p>
            </motion.div>
          )}
        </motion.section>

        <motion.section className="mb-10" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
            <Send className="w-8 h-8 mr-3 text-blue-500" />
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-1 gap-6">
            {contactMethods.map((method) => (
              <motion.div 
                key={method.label}
                className="p-6 bg-gray-50 dark:bg-slate-700/50 rounded-lg shadow hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <a href={method.href} target="_blank" rel="noopener noreferrer" className="flex items-start group">
                  {method.icon}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                      {method.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:underline mb-2">{method.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{method.description}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="mb-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
            <Clock className="w-8 h-8 mr-3 text-green-500" />
            Response Times & Support Hours
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Response Time</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We usually respond within <strong className="text-blue-600 dark:text-blue-400">24–48 hours</strong> during business days.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                For urgent issues, please mark your email as "URGENT" in the subject line.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Support Hours</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong className="text-blue-600 dark:text-blue-400">Monday to Saturday</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                10:00 AM to 6:00 PM (IST)
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mb-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Don't see your question here?
            </p>
            <Button asChild>
              <a href="mailto:toolzenix@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Ask Us Anything
              </a>
            </Button>
          </div>
        </motion.section>

        <motion.section 
          className="text-center p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-xl text-white" 
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <MessageSquare className="w-8 h-8 mr-3" />
            We Value Your Feedback!
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Every suggestion or message you send makes Toolzenix better. We are constantly improving, and your support truly matters to our mission of providing free, accessible tools for everyone.
          </p>
          <p className="text-lg leading-relaxed font-medium mb-6">
            Thank you for using Toolzenix.com — your trust keeps us moving forward! 💙
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tools" className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Explore Our Tools
            </Link>
            <Link to="/about" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition-colors">
              Learn More About Us
            </Link>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Contact;
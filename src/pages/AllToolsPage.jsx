import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { allToolCategories } from '@/config/navigation';

const categoryDisplayConfig = [
  { name: "Image Tools", icon: "Image", path: "/image-tools", color: "bg-gradient-to-br from-pink-500 to-rose-500" },
  { name: "Video Tools", icon: "Video", path: "/video-tools", color: "bg-gradient-to-br from-blue-500 to-sky-500" },
  { name: "MP3 Tools", icon: "Music2", path: "/mp3-tools", color: "bg-gradient-to-br from-green-500 to-emerald-500" },
  { name: "Document Tools", icon: "FileText", path: "/document-tools", color: "bg-gradient-to-br from-purple-500 to-indigo-500" },
  { name: "Text Tools", icon: "Type", path: "/text-tools", color: "bg-gradient-to-br from-slate-500 to-gray-500" },
  { name: "QR/Barcode Tools", icon: "QrCode", path: "/qr-barcode-tools", color: "bg-gradient-to-br from-neutral-500 to-stone-500" },
  { name: "Unit Converters", icon: "SlidersHorizontal", path: "/unit-converters", color: "bg-gradient-to-br from-yellow-500 to-amber-500" },
  { name: "Math Tools", icon: "Calculator", path: "/math-tools", color: "bg-gradient-to-br from-orange-500 to-yellow-600" },
  { name: "Color Tools", icon: "Palette", path: "/color-tools", color: "bg-gradient-to-br from-red-500 to-orange-500" },
  { name: "Developer Tools", icon: "Code2", path: "/developer-tools", color: "bg-gradient-to-br from-cyan-500 to-teal-500" },
  { name: "Security Tools", icon: "ShieldCheck", path: "/security-tools", color: "bg-gradient-to-br from-lime-500 to-green-600" },
  { name: "Miscellaneous Tools", icon: "Sparkles", path: "/miscellaneous-tools", color: "bg-gradient-to-br from-indigo-500 to-blue-600" },
  { name: "Science Tools", icon: "FlaskConical", path: "/science-tools", color: "bg-gradient-to-br from-sky-400 to-cyan-400" },
  { name: "Marketing Tools", icon: "Megaphone", path: "/marketing-tools", color: "bg-gradient-to-br from-rose-400 to-red-500" },
  { name: "Social Media Tools", icon: "Share2", path: "/social-media-tools", color: "bg-gradient-to-br from-fuchsia-500 to-pink-600" },
  { name: "File Tools", icon: "FolderKanban", path: "/file-tools", color: "bg-gradient-to-br from-violet-500 to-purple-600" },
  { name: "Health & Fitness Tools", icon: "HeartPulse", path: "/health-fitness-tools", color: "bg-gradient-to-br from-emerald-400 to-teal-500" },
  { name: "Calendar & Time Tools", icon: "CalendarClock", path: "/calendar-time-tools", color: "bg-gradient-to-br from-amber-400 to-orange-500" },
  { name: "Finance Tools", icon: "Landmark", path: "/finance-tools", color: "bg-gradient-to-br from-stone-400 to-neutral-500" },
  { name: "Geography Tools", icon: "Globe2", path: "/geography-tools", color: "bg-gradient-to-br from-teal-400 to-cyan-500" },
  { name: "AI Tools", icon: "BrainCircuit", path: "/ai-tools", color: "bg-gradient-to-br from-purple-400 to-fuchsia-500" },
  { name: "Language Tools", icon: "Languages", path: "/language-tools", color: "bg-gradient-to-br from-pink-400 to-rose-500" },
  { name: "Game Tools", icon: "Gamepad2", path: "/game-tools", color: "bg-gradient-to-br from-red-400 to-orange-500" },
];

const CategoryCard = ({ name, icon, path, color, delay }) => {
  const IconComponent = LucideIcons[icon] || LucideIcons.Wrench;
  const categoryDetails = allToolCategories.find(cat => cat.path === path);
  const description = categoryDetails ? categoryDetails.description : `Explore ${name.toLowerCase()}.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Link
        to={path}
        className={`block p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${color} text-white h-full flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center mb-3">
            <IconComponent className="w-8 h-8 mr-3 text-white/90 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold text-white">
              {name}
            </h3>
          </div>
          <p className="text-sm text-white/80 mb-4 h-12 overflow-hidden">
            {description}
          </p>
        </div>
        <div className="mt-auto text-right">
          <span className="inline-flex items-center text-sm font-medium text-white/90 group-hover:underline">
            Explore <LucideIcons.ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const AllToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>All Tools - Explore 200+ Online Tools by Category | Toolzenix</title>
        <meta name="description" content="Discover over 200 free online tools on Toolzenix, organized by category. Find tools for image editing, video conversion, document management, and much more." />
        <link rel="canonical" href="https://toolzenix.com/tools" />
        <meta property="og:title" content="All Tools - Explore 200+ Online Tools by Category | Toolzenix" />
        <meta property="og:description" content="Browse Toolzenix's extensive collection of free online tools. Categories include image, video, document, audio, unit converters, color tools, developer utilities, and more." />
        <meta property="og:url" content="https://toolzenix.com/tools" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="block text-slate-800 dark:text-slate-100">All Online Tools</span>
            <span className="gradient-text block">Explore 200+ Tools by Category</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Welcome to Toolzenix! Below are our most powerful and easy-to-use online tools organized into helpful categories. Click any category to explore tools for image editing, videos, documents, audio, unit conversions, colors, coding, and much more.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {allToolCategories.map((category, index) => (
            <CategoryCard 
              key={category.path}
              name={category.name}
              icon={category.icon}
              path={category.path}
              color={categoryDisplayConfig.find(c => c.name === category.name)?.color || 'bg-gray-500'}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllToolsPage;
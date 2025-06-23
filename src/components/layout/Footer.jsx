import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Info, ShieldCheck, FileText, Users, Map, Mail, Linkedin, Facebook, Twitter, MessageCircle, Home as HomeIcon, Settings, Code, Palette, Calculator, Film, Image as ImageIcon, Music, FileArchive, Link2, Globe, Heart, CalendarDays, DollarSign, Brain, Languages, Gamepad, Server } from 'lucide-react';
import SocialShareButtons from '@/components/common/SocialShareButtons';
import { allToolCategories } from '@/config/navigation';

const Footer = () => {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const footerSections = {
    'Company': [
      { to: "/about", text: "About Us", icon: <Users className="w-4 h-4 mr-2" /> },
      { to: "/contact", text: "Contact", icon: <Mail className="w-4 h-4 mr-2" /> },
    ],
    'Legal': [
      { to: "/privacy-policy", text: "Privacy Policy", icon: <ShieldCheck className="w-4 h-4 mr-2" /> },
      { to: "/terms", text: "Terms of Service", icon: <FileText className="w-4 h-4 mr-2" /> },
      { to: "/disclaimer", text: "Disclaimer", icon: <Info className="w-4 h-4 mr-2" /> },
    ],
    'Navigation': [
      { to: "/", text: "Home", icon: <HomeIcon className="w-4 h-4 mr-2" /> },
      { to: "/sitemap", text: "Sitemap", icon: <Map className="w-4 h-4 mr-2" /> },
    ]
  };

  const popularToolCategories = allToolCategories.slice(0, 5).map(category => {
    let icon;
    switch (category.name) {
      case "Image Tools": icon = <ImageIcon className="w-4 h-4 mr-2" />; break;
      case "Video Tools": icon = <Film className="w-4 h-4 mr-2" />; break;
      case "Document Tools": icon = <FileText className="w-4 h-4 mr-2" />; break;
      case "Text Tools": icon = <Briefcase className="w-4 h-4 mr-2" />; break;
      case "QR & Barcode Tools": icon = <Link2 className="w-4 h-4 mr-2" />; break;
      case "Unit Converters": icon = <Settings className="w-4 h-4 mr-2" />; break;
      case "Math Tools": icon = <Calculator className="w-4 h-4 mr-2" />; break;
      case "Color Tools": icon = <Palette className="w-4 h-4 mr-2" />; break;
      case "Developer Tools": icon = <Code className="w-4 h-4 mr-2" />; break;
      case "Security Tools": icon = <ShieldCheck className="w-4 h-4 mr-2" />; break;
      case "Miscellaneous Tools": icon = <Briefcase className="w-4 h-4 mr-2" />; break;
      case "Science Tools": icon = <Music className="w-4 h-4 mr-2" />; break;
      case "Marketing Tools": icon = <DollarSign className="w-4 h-4 mr-2" />; break;
      case "Social Media Tools": icon = <Users className="w-4 h-4 mr-2" />; break;
      case "File Tools": icon = <FileArchive className="w-4 h-4 mr-2" />; break;
      case "Health & Fitness Tools": icon = <Heart className="w-4 h-4 mr-2" />; break;
      case "Calendar & Time Tools": icon = <CalendarDays className="w-4 h-4 mr-2" />; break;
      case "Finance Tools": icon = <DollarSign className="w-4 h-4 mr-2" />; break;
      case "Geography Tools": icon = <Globe className="w-4 h-4 mr-2" />; break;
      case "AI Tools": icon = <Brain className="w-4 h-4 mr-2" />; break;
      case "Language Tools": icon = <Languages className="w-4 h-4 mr-2" />; break;
      case "Game Tools": icon = <Gamepad className="w-4 h-4 mr-2" />; break;
      case "System Tools": icon = <Server className="w-4 h-4 mr-2" />; break;
      default: icon = <Briefcase className="w-4 h-4 mr-2" />;
    }
    return { ...category, icon };
  });


  return (
    <footer className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center mb-3 group">
              <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Toolzenix</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              All-in-One Online Tools for Productivity & Creativity.
            </p>
          </div>

          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title} className="flex flex-col items-center md:items-start">
              <h3 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-4 uppercase tracking-wider">{title}</h3>
              <nav className="flex flex-col space-y-2.5">
                {links.map(link => (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    className="flex items-center justify-center md:justify-start text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 group"
                  >
                    {link.icon && React.cloneElement(link.icon, { className: `${link.icon.props.className} group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors` })}
                    {link.text}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
          
        </div>

        <div className="my-10 sm:my-12 border-t border-slate-200 dark:border-slate-700 pt-10 sm:pt-12">
           <SocialShareButtons 
            url={currentUrl} 
            title={`Check out this page on Toolzenix: ${document.title}`}
            className="!py-0" 
          />
        </div>
        
        <div className="pt-8 sm:pt-10 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Designed & Developed by Faisal Mehmood.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            © {new Date().getFullYear()} Toolzenix. All Rights Reserved. 
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Empowering users with a suite of free online utilities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
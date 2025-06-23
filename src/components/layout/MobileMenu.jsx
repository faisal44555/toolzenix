import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { mainNavLinks as importedMainNavLinks } from '@/config/navigation';
import { cn } from '@/lib/utils';

const MobileMenu = ({ navLinks, setIsMenuOpen }) => {
  const location = useLocation();

  const getIcon = (iconName, color) => {
    const IconComponent = LucideIcons[iconName];
    const finalColor = color || 'text-blue-300';
    const classes = "h-5 w-5 mr-3 group-hover:text-white transition-colors";
    
    return IconComponent 
        ? <IconComponent className={cn(classes, finalColor)} /> 
        : <LucideIcons.Tool className={cn(classes, finalColor)} />;
  };

  const siteLinks = importedMainNavLinks;
  const toolCategoryLinks = navLinks.filter(link => link.path && !siteLinks.find(sl => sl.to === link.path));


  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      className="fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-700 to-blue-900 shadow-lg md:hidden p-4 overflow-y-auto"
    >
      <nav className="flex flex-col space-y-1 mt-16">
        {siteLinks.map(link => (
          <Link 
            key={link.to} 
            to={link.to} 
            className={`group flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-all duration-150 ease-in-out
                        ${location.pathname === link.to 
                          ? 'bg-blue-500/30 text-white shadow-sm' 
                          : 'text-blue-100 hover:bg-blue-600/50 hover:text-white'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.icon ? getIcon(link.icon) : (link.to === "/contact" ? <LucideIcons.Mail className="h-5 w-5 mr-3 text-blue-300 group-hover:text-white transition-colors" /> : <LucideIcons.Link2 className="h-5 w-5 mr-3 text-blue-300 group-hover:text-white transition-colors" />)}
            {link.text}
          </Link>
        ))}
        
        <div className="pt-4 pb-2">
          <span className="px-3 text-xs font-semibold uppercase text-blue-300 tracking-wider">
            Dashboard
          </span>
        </div>
        <Link 
          to="/analytics" 
          className={`group flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-all duration-150 ease-in-out
                      ${location.pathname === '/analytics'
                        ? 'bg-blue-500/30 text-white shadow-sm' 
                        : 'text-blue-100 hover:bg-blue-600/50 hover:text-white'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <LucideIcons.BarChartHorizontalBig className="h-5 w-5 mr-3 text-blue-300" />
          Analytics
        </Link>
        
        {toolCategoryLinks.length > 0 && (
          <>
            <div className="pt-4 pb-2">
              <span className="px-3 text-xs font-semibold uppercase text-blue-300 tracking-wider">
                Tool Categories
              </span>
            </div>
            {toolCategoryLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`group flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ease-in-out
                            ${location.pathname.startsWith(link.path) 
                              ? 'bg-blue-500/30 text-white shadow-sm' 
                              : 'text-blue-100 hover:bg-blue-600/50 hover:text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {getIcon(link.icon, link.color)}
                {link.name}
              </Link>
            ))}
          </>
        )}
      </nav>
    </motion.div>
  );
};

export default MobileMenu;
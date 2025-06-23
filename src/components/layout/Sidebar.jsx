import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ navLinks, darkMode }) => {
  const location = useLocation();

  const getIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5 mr-3" /> : <LucideIcons.Tool className="h-5 w-5 mr-3" />;
  };

  return (
    <aside className={cn(
      "hidden md:block w-64 bg-white dark:bg-slate-800/70 border-r border-gray-200 dark:border-slate-700/50 p-4 space-y-2 transition-colors duration-300 shadow-sm",
      "sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto" 
    )}>
      <div className="pt-2 pb-2">
        <span className="px-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
          Dashboard
        </span>
      </div>
      <Link
        to="/analytics"
        className={cn(
          "group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ease-in-out",
          location.pathname.startsWith('/analytics')
            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm"
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700/50'
        )}
      >
        <LucideIcons.BarChartHorizontalBig className="h-5 w-5 mr-3" />
        <span className="transition-colors">Analytics</span>
      </Link>
      
      <div className="pt-4 pb-2">
        <span className="px-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
          Tool Categories
        </span>
      </div>
      {navLinks.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ease-in-out",
            location.pathname.startsWith(link.path)
              ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm"
              : [
                  link.color || 'text-gray-600 dark:text-gray-300',
                  'hover:bg-gray-100 dark:hover:bg-slate-700/50'
                ]
          )}
        >
          {getIcon(link.icon)}
          <span className="transition-colors">{link.name}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
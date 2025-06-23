import React, { useState, useEffect, Suspense, lazy } from "react";
import { useLocation, ScrollRestoration, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import RedirectHandler from "@/components/layout/RedirectHandler";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import ErrorBoundary from "@/components/common/ErrorBoundary";

import { mainNavLinks, allToolCategories, allToolsSearchable } from '@/config/navigation.js';
import { useAnalytics } from '@/hooks/useAnalytics';

import { Toaster } from "@/components/ui/toaster";

const MobileMenu = lazy(() => import('@/components/layout/MobileMenu'));

const LayoutSpinner = () => (
    <div className="w-full flex-grow flex justify-center items-center min-h-[calc(100vh-12rem)]">
        <div className="loading-orb-container">
          <motion.div 
            className="loading-orb"
            animate={{ y: ["0%", "-30%", "0%"], scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="loading-orb"
            animate={{ y: ["0%", "-30%", "0%"], scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.div 
            className="loading-orb"
            animate={{ y: ["0%", "-30%", "0%"], scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </div>
    </div>
);


const AppContent = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const GA_TRACKING_ID = "G-595ZG69BQ2";
  
  const { trackUserAction } = useAnalytics();
  
  const mobileNavLinks = [...mainNavLinks, ...allToolCategories];

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (GA_TRACKING_ID && typeof window.gtag === 'function') {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });

      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });
    }

    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // Silently fail if AdSense script fails to load or is blocked
    }
  }, [location.pathname, location.search]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    
    trackUserAction('theme_toggle', {
      theme: !darkMode ? 'dark' : 'light',
      page_path: location.pathname
    });
  };

  return (
    <div className={`min-h-screen flex flex-col`}>
      <RedirectHandler />
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navLinks={mainNavLinks}
        allTools={allToolsSearchable}
      />
      <div className="flex flex-grow pt-16"> 
        <Sidebar navLinks={allToolCategories} darkMode={darkMode} />
        <Suspense fallback={null}>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <MobileMenu 
                navLinks={mobileNavLinks} 
                setIsMenuOpen={setIsMobileMenuOpen} 
              />
            )}
          </AnimatePresence>
        </Suspense>

        <main className="flex-grow p-4 md:p-8 w-full"> 
          <Suspense fallback={<LayoutSpinner />}>
            <ErrorBoundary>
              <AnimatePresence initial={false}>
                <motion.div
                  key={location.pathname + location.search} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, ease: "linear" }}
                  className="w-full" 
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </ErrorBoundary>
          </Suspense>
        </main>
      </div>
      <Toaster />
      <Footer navLinks={allToolCategories} />
    </div>
  );
};

const App = () => {
  const siteUrl = "https://toolzenix.com";
  const GA_TRACKING_ID = "G-595ZG69BQ2";
  const location = useLocation();
  const canonicalUrl = `${siteUrl}${location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')}`;

  return (
    <HelmetProvider>
      <AnalyticsProvider>
        <Helmet>
          <link rel="canonical" href={canonicalUrl} />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                send_page_view: false,
                enhanced_measurement: {
                  scrolls: true,
                  outbound_clicks: true,
                  site_search: true,
                  file_downloads: true,
                  video_engagement: true
                },
                custom_map: {
                  'custom_parameter_1': 'tool_name',
                  'custom_parameter_2': 'tool_category'
                }
              });
            `}
          </script>
        </Helmet>
        <ScrollRestoration />
        <AppContent />
      </AnalyticsProvider>
    </HelmetProvider>
  );
};

export default App;
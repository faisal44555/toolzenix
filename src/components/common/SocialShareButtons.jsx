import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Copy, Check } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const SocialShareButtons = ({ 
  url = '', 
  title = '', 
  description = '', 
  className = '' 
}) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const { trackUserAction } = useAnalytics();

  useEffect(() => {
    setCurrentUrl(url || window.location.href);
  }, [url]);

  const shareUrl = encodeURIComponent(currentUrl);
  const shareTitle = encodeURIComponent(title || document.title);
  const shareDescription = encodeURIComponent(description || 'Check out this amazing tool on Toolzenix!');

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
      color: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4" />,
      url: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  const handleShare = (platform, shareUrl) => {
    trackUserAction('share', {
      platform: platform.toLowerCase(),
      contentType: 'tool_page',
      toolName: title,
      shareUrl: currentUrl
    });

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      
      trackUserAction('share', {
        platform: 'copy_link',
        contentType: 'tool_page',
        toolName: title,
        shareUrl: currentUrl
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 ${className}`}
    >
      <div className="flex items-center mb-4">
        <Share2 className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Share this tool
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {socialPlatforms.map((platform) => (
          <Button
            key={platform.name}
            onClick={() => handleShare(platform.name, platform.url)}
            className={`${platform.color} text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
            size="sm"
          >
            {platform.icon}
            <span className="ml-2 hidden sm:inline">{platform.name}</span>
          </Button>
        ))}
        
        <Button
          onClick={handleCopyLink}
          variant="outline"
          size="sm"
          className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="ml-2 text-green-500 hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="ml-2 hidden sm:inline">Copy Link</span>
            </>
          )}
        </Button>
      </div>
      
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
        Help others discover this tool by sharing it on your favorite platform!
      </p>
    </motion.div>
  );
};

export default SocialShareButtons;
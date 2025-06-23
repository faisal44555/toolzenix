import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RedirectHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const currentUrl = window.location.href;
    const hostname = window.location.hostname;
    
    if (hostname === 'www.toolzenix.com') {
      const newUrl = currentUrl.replace('www.toolzenix.com', 'toolzenix.com');
      window.location.replace(newUrl);
    }
    
    if (window.location.protocol === 'http:' && hostname.includes('toolzenix.com')) {
      const httpsUrl = currentUrl.replace('http:', 'https:');
      window.location.replace(httpsUrl);
    }
  }, [location]);

  return null;
};

export default RedirectHandler;
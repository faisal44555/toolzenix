import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const LazyLoad = ({ children, placeholderHeight = '200px', rootMargin = '200px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: rootMargin,
      }
    );

    const currentRef = placeholderRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, location.key]);

  return (
    <div ref={placeholderRef} style={{ minHeight: !isVisible ? placeholderHeight : 'auto' }}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazyLoad;
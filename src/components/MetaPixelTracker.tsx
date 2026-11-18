import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const MetaPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.fbq !== 'function') return;
    window.fbq('track', 'PageView');
    console.log('[Meta] PageView:', window.location.href);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default MetaPixelTracker;

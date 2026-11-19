import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const MetaPixelTracker = () => {
  const location = useLocation();
  const lastTrackedPage = useRef('');

  useEffect(() => {
    if (typeof window.fbq !== 'function') return;

    const currentUrl = window.location.href;

    // Prevent duplicate PageView events for the same route.
    if (lastTrackedPage.current === currentUrl) return;

    lastTrackedPage.current = currentUrl;

    window.fbq('track', 'PageView');

    console.log('[Meta] PageView:', currentUrl);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default MetaPixelTracker;

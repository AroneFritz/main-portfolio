"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { PageLoadingScreen } from "@/components/ui/loading";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log("Loading Provider: Component mounted");
    setIsMounted(true);

    // Add loading class to body to prevent scrolling and flash
    document.body.classList.add('loading-active');
    // Add hydrated class to show content
    document.body.classList.add('hydrated');
    // Make sure content is visible now that React has loaded
    document.documentElement.style.visibility = 'visible';

    // Always show loading animation regardless of document state
    // This ensures we see the loading screen even on refresh
    const startTime = Date.now();

    // Check if page has already loaded (for refresh scenarios)
    if (document.readyState === 'complete') {
      console.log("Loading Provider: Document already complete");
      // Still show loading for minimum time for better UX - increased for animation showcase
      const timer = setTimeout(() => {
        console.log("Loading Provider: Minimum loading time finished");
        // Remove loading class from body
        document.body.classList.remove('loading-active');
        setIsLoading(false);
      }, 4000); // Increased to 4 seconds for refresh scenarios
      return () => {
        clearTimeout(timer);
        // Cleanup: remove loading class if component unmounts
        document.body.classList.remove('loading-active');
      };
    }

    let hasFinished = false;
    const minLoadingTime = 4500; // Minimum 4.5 seconds for better UX and animation showcase
    const maxLoadingTime = 8000; // Maximum 8 seconds timeout

    // Function to finish loading
    const finishLoading = () => {
      if (hasFinished) return;
      hasFinished = true;

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      setTimeout(() => {
        console.log("Loading Provider: Loading finished");
        // Remove loading class from body
        document.body.classList.remove('loading-active');
        setIsLoading(false);
      }, remainingTime);
    };

    // Listen for page load events
    const handleLoad = () => {
      console.log("Loading Provider: Window load event");
      finishLoading();
    };

    const handleDOMContentLoaded = () => {
      console.log("Loading Provider: DOM content loaded");
      // Don't finish immediately, wait for images and other resources
    };

    // Set up event listeners
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    }

    window.addEventListener('load', handleLoad);

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      console.log("Loading Provider: Fallback timeout reached");
      finishLoading();
    }, maxLoadingTime);

    return () => {
      console.log("Loading Provider: Cleanup");
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimer);
      // Cleanup: remove loading class if component unmounts
      document.body.classList.remove('loading-active');
    };
  }, []);

  console.log("Loading Provider: Rendering, isLoading =", isLoading, "isMounted =", isMounted);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {/* Always show loading screen first, then conditionally show content */}
      {isLoading && <PageLoadingScreen />}
      {/* Hide content completely when loading to prevent flash */}
      {!isLoading && isMounted && (
        <div className="min-h-screen">
          {children}
        </div>
      )}
      {/* Show loading screen if not mounted yet */}
      {!isMounted && <PageLoadingScreen />}
    </LoadingContext.Provider>
  );
}

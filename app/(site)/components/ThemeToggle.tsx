'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

/**
 * Theme Toggle Component (Client Component)
 * * Handles user preferences for Light, Dark, and System color modes.
 * * Utilizes a mounted state check to strictly prevent Next.js hydration errors.
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 1. Hydration Safety: Wait until the component is fully mounted in the browser
  // This prevents the server (which doesn't know the user's OS preference) from rendering the wrong color.
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Fallback UI / Skeleton Loader
  // Show a blank placeholder matching the button's exact dimensions while loading
  // to prevent the layout from shifting or jumping.
  if (!mounted) {
    return (
      <div 
        className="w-[104px] h-[36px] bg-border rounded-lg animate-pulse" 
        aria-hidden="true" 
      />
    );
  }

  return (
    <div className="flex items-center p-1 border border-border rounded-lg bg-background">
      
      {/* --- LIGHT MODE BUTTON --- */}
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md cursor-pointer transition-colors ${
          theme === 'light' ? 'bg-primary text-white' : 'text-slate-500 hover:text-foreground'
        }`}
        title="Light Mode"
        aria-label="Switch to Light Mode" // Required for Screen Readers
      >
        {/* aria-hidden="true" tells screen readers to ignore the raw SVG code */}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>

      {/* --- SYSTEM DEFAULT BUTTON --- */}
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md cursor-pointer transition-colors ${
          theme === 'system' ? 'bg-primary text-white' : 'text-slate-500 hover:text-foreground'
        }`}
        title="System Default"
        aria-label="Switch to System Default"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>

      {/* --- DARK MODE BUTTON --- */}
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md cursor-pointer transition-colors ${
          theme === 'dark' ? 'bg-primary text-white' : 'text-slate-500 hover:text-foreground'
        }`}
        title="Dark Mode"
        aria-label="Switch to Dark Mode"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>

    </div>
  );
}
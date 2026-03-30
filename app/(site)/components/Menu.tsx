'use client';

import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

/**
 * Desktop Navigation Menu (Client Component)
 * * Handles localized routing and global UI toggles (Theme & Language).
 * * Hidden on mobile screens (max-md:hidden).
 */
export default function Menu() {
  const t = useTranslations('Navbar');
  
  // 1. WAKE UP THE LOCALE HOOK: We need to know what language the user is currently reading!
  const locale = useLocale(); 
  
  return (
    // Added text styling and increased the gap for a cleaner, modern look
    <div className="max-md:hidden flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
        
        {/* 2. THE FIX: Inject the active locale into the href path! */}
        <Link 
          href={`/${locale}`} 
          className="hover:text-primary transition-colors"
        >
          {t('home')}
        </Link>
        
        <Link 
          href={`/${locale}/projects`} 
          className="hover:text-primary transition-colors"
        >
          {t('projects')}
        </Link>
        
        {/* 3. Added a subtle left border to separate the links from the utility buttons */}
        <div className="flex items-center gap-4 pl-4 border-l border-border">
           <LanguageSwitcher />
           <ThemeToggle />
        </div>
        
    </div>
  );
}
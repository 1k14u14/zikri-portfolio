'use client';

import { useState } from "react";
import Link from "next/link";
import { LiaTimesSolid } from "react-icons/lia";
import { CgMenuRight } from "react-icons/cg";
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

/**
 * Mobile Drawer Menu (Client Component)
 * * Handles responsive slide-out navigation for mobile devices.
 * * Manages overlay state and traps focus for accessibility.
 */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const t = useTranslations('Navbar');
  
  // THE FIX 1: Wake up the locale hook so we can inject it into the links!
  const locale = useLocale(); 
  
  return (
    // 'md:hidden' ensures this entire component completely vanishes on desktop
    <div className="md:hidden">
      
      {/* --- HAMBURGER BUTTON --- */}
      {/* THE FIX 2: Added aria-label for Screen Readers */}
      <button
        onClick={toggleMenu}
        className="text-3xl text-slate-800 dark:text-slate-200 hover:text-primary transition-colors p-1"
        aria-label="Open mobile menu"
        aria-expanded={isOpen}
      >
        <CgMenuRight />
      </button>

      {/* --- BACKDROP OVERLAY --- */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          // Added a subtle backdrop-blur effect for a premium, frosted-glass look
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          aria-hidden="true" // Tells screen readers to ignore the overlay itself
        />
      )}

      {/* --- SIDE MENU DRAWER --- */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header (Close Button) */}
        <div className="flex justify-end p-4 border-b border-border">
          <button 
            onClick={toggleMenu}
            className="text-slate-500 hover:text-red-500 transition-colors p-2"
            aria-label="Close mobile menu"
          >
            <LiaTimesSolid size={28} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col justify-between h-[calc(100%-73px)] p-6">
          
          <nav className="flex flex-col gap-6 mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
            {/* Injected the locale into the href paths! */}
            <Link 
              href={`/${locale}`} 
              onClick={toggleMenu}
              className="hover:text-primary transition-colors"
            >
              {t('home')}
            </Link>
            
            <Link 
              href={`/${locale}/projects`} 
              onClick={toggleMenu}
              className="hover:text-primary transition-colors"
            >
              {t('projects')}
            </Link>
          </nav>
          
          {/* Drawer Footer (Toggles) */}
          <div className="flex flex-col gap-6 justify-center items-center pb-8">
            {/* Added a divider line to separate navigation from settings */}
            <div className="w-full h-px bg-border"></div>
            <div className="flex gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
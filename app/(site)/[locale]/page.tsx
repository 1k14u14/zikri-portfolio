import { getTranslations } from 'next-intl/server';
import Hero from '../components/Hero';
import Service from '../components/Service';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

/**
 * Main Landing Page (Server Component)
 * * Acts as the primary layout orchestrator for the portfolio.
 * * Passes the active locale down to section components for localized fetching.
 */
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  // 1. Extract the active locale
  const resolvedParams = await params;
  const currentLocale = resolvedParams.locale;

  // 2. Optional: Fetch translations for the Sidebar! 
  // (Make sure you have a 'Sidebar' or 'Navigation' section in your en.json / id.json)
  const t = await getTranslations('Sidebar'); 

  return (
    /* Grid Architecture: 
      1 column on mobile, 4 columns on large desktop screens.
      This replaces the broken 'flex-8' approach.
    */
    <div>
      <Hero locale={currentLocale} />
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 relative">
        
        {/* MAIN CONTENT AREA: Takes up 7 out of 8 columns on desktop */}
        <div className="lg:col-span-7">
          <Projects locale={currentLocale} />
          <About locale={currentLocale} />
          <Service locale={currentLocale} />
          <Contact />
        </div>

        {/* TABLE OF CONTENTS / SIDEBAR 
          'hidden lg:block' means it disappears on mobile, but shows on laptops.
        */}
        <aside className="hidden lg:block lg:col-span-1 mt-20">
          
          {/* sticky top-20 makes it float smoothly down the screen as the user scrolls */}
          <ul className="pl-6 border-l border-border sticky top-20 flex flex-col gap-4 text-sm text-slate-500 font-medium">
            
            <li className="hover:text-primary hover:translate-x-1 transition-all">
              <a href="#projects">{t('projects')}</a> {/* Replace with {t('projects')} if translated! */}
            </li>
            
            <li className="hover:text-primary hover:translate-x-1 transition-all">
              <a href="#about">{t('about')}</a>
            </li>
            
            <li className="hover:text-primary hover:translate-x-1 transition-all">
              <a href="#service">{t('service')}</a>
            </li>
            
            <li className="hover:text-primary hover:translate-x-1 transition-all">
              <a href="#contact">{t('contact')}</a>
            </li>
            
          </ul>
        </aside>
      </div>
    </div>
  );
}
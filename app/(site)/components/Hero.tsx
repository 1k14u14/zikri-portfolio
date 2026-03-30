import { getHero } from "@/sanity/sanity-utils";
import { PortableText } from 'next-sanity';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link'; // IMPORTED THE NEXT.JS LINK COMPONENT!

/**
 * Hero Section (Server Component)
 * * The primary landing viewport for the portfolio.
 * * Fetches the localized introduction and provides main Call-To-Action (CTA) links.
 */
export default async function Hero({ locale }: { locale: string }) {
    // Fetch data and translations concurrently
    const data = await getHero(locale);
    const t = await getTranslations('Hero');

    // Fallback UI if the Sanity document is missing
    if (!data) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl font-bold">Please publish this page in Sanity Studio first.</p>
            </div>
        );
    }
    
    return (
        // Added 'relative' here so the absolute scroll indicator stays contained inside this section
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center">
            
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium tracking-wide">
                {t('greeting')}
            </p>

            {/* Note: Assuming 'gradient-text' is a custom class in your globals.css */}
            <h1 className="text-5xl md:text-7xl font-extrabold gradient-text mt-2 mb-6">
                Zikri Aulia
            </h1>

            {/* Added typography styling for a cleaner reading experience */}
            <div className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                <PortableText value={data.description} />
            </div>

            {/* --- CALL TO ACTION (CTA) BUTTONS --- */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
                {/* FIX: Use Next.js <Link> for internal routes. 
                  Do not wrap it in a <button>! 
                */}
                <Link 
                    href={`/${locale}/projects`}
                    className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
                >
                    {t('projectBtn')}
                </Link>
                
                {/* FIX: Use an <a> tag for hash links (same-page anchor links).
                  Styled to look exactly like a button. 
                */}
                <a 
                    href="#contact"
                    className="outline outline-2 outline-slate-800 dark:outline-slate-200 px-6 py-3 rounded-md font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                >
                    {t('contactBtn')}
                </a>
            </div>

            {/* --- SCROLL INDICATOR --- */}
            {/* FIX: Absolute positioning keeps it cleanly at the bottom of the screen */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <a 
                    href="#projects" 
                    className="flex flex-col items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors group"
                    aria-label="Scroll to projects"
                >
                    <span className="uppercase tracking-widest">{t('scrollBtn')}</span>
                    {/* The bounce animation applied directly to the arrow icon */}
                    <span className="text-2xl animate-bounce group-hover:text-primary">&darr;</span>
                </a>
            </div>

        </section>
    );
}
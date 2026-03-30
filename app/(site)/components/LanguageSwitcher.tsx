'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

/**
 * LanguageSwitcher Component
 * * Handles client-side routing between English and Indonesian locales.
 * It dynamically replaces the locale prefix in the URL and contains 
 * specific fallback logic for Sanity dynamic project routes.
 */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    // Determine the target locale based on the current state
    const nextLocale = locale === 'en' ? 'id' : 'en';
    
    // Replace only the exact locale prefix at the start of the pathname
    // e.g., converts "/en/about" to "/id/about"
    let newPath = pathname.replace(new RegExp(`^/${locale}`), `/${nextLocale}`);

    // --- DYNAMIC ROUTE EDGE CASE HANDLING ---
    // Sanity requires unique slugs for localized documents.
    // Indonesian project slugs strictly use an '-id' suffix.
    if (pathname.includes('/projects/')) {
      if (nextLocale === 'id') {
        // Append suffix when navigating to the Indonesian document
        newPath = `${newPath}-id`;
      } else if (nextLocale === 'en') {
        // Strip the '-id' suffix when returning to the English document
        newPath = newPath.replace(/-id$/, '');
      }
    }

    // Use a transition to prevent the UI from freezing while Next.js fetches the new page
    startTransition(() => {
      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="px-4 py-2 text-sm font-semibold border border-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
      aria-label="Toggle Language"
    >
      {isPending ? '...' : (locale === 'en' ? '🇮🇩 ID' : '🇬🇧 EN')}
    </button>
  );
}
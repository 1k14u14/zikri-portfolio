import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'id'];

// 1. Change 'locale' to 'requestLocale'
export default getRequestConfig(async ({ requestLocale }) => {
  
  // 2. Unwrap the Promise!
  let locale = await requestLocale;

  console.log("The resolved locale is:", locale);

  // 3. The Ultimate Failsafe: If the proxy ever fails to provide a language, force English
  if (!locale) {
      locale = 'en';
  }

  // 4. Validate that the language is supported
  if (!locales.includes(locale as any)) {
      notFound();
  }

  return {
    // 5. CRITICAL NEW REQUIREMENT: We must now return the locale along with the messages
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
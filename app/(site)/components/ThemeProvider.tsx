'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class"       // Tells next-themes to use the class attribute
      defaultTheme="system"   // Defaults to the user's OS preference
      enableSystem={true}     // Allows the "system" option to work
    >
      {children}
    </NextThemesProvider>
  );
}
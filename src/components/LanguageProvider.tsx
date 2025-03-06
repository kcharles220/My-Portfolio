'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';

// Import your translations
import en from '../../languages/en.json';
import pt from '../../languages/pt.json';

type Locale = 'en' | 'pt';

type LanguageContextType = {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
};

const STORAGE_KEY = 'user-language-preference';

// Default to 'en' as fallback
const DEFAULT_LOCALE: Locale = 'en';

const LanguageContext = createContext<LanguageContextType | null>(null);

const messages = {
  en,
  pt,
};

// Helper to detect browser language
const detectBrowserLanguage = (): Locale => {
  // Using window to ensure this only runs on client
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.toLowerCase().split('-')[0];
    // Check if browser language is supported
    if (browserLang === 'pt' || browserLang === 'en') {
      return browserLang as Locale;
    }
  }
  return DEFAULT_LOCALE;
};

// Helper to get initial language from storage or browser
const getInitialLanguage = (): Locale => {
  // Try to get from localStorage first
  if (typeof window !== 'undefined') {
    const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale;
    if (savedLocale === 'en' || savedLocale === 'pt') {
      return savedLocale;
    }
  }
  
  // Fall back to browser detection
  return detectBrowserLanguage();
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  
  // Effect to initialize language preference (runs only on client)
  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLocale(initialLang);
  }, []);

  // Effect to save language when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, changeLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="UTC" >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
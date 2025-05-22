"use client"

import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const defaultLanguageContextValue: LanguageContextType = {
  language: 'en', // Default for SSR
  setLanguage: () => {
    // No-op for SSR or if called before provider is fully initialized
  },
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContextValue);

function ClientSideLanguageDetectorInternal({ onLanguageDetermined }: { onLanguageDetermined: (lang: string) => void }) {
  const searchParams = useSearchParams();
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    // This effect ensures setIsClientMounted(true) only happens client-side after mount
    setIsClientMounted(true);
  }, []);

  useEffect(() => {
    // This effect contains all client-side detection logic.
    // It will only run if isClientMounted is true.
    if (!isClientMounted) {
      return; // Do nothing if not mounted on the client yet
    }

    // 1. Check URL parameters first (client-side)
    const urlLang = searchParams?.get('lang');
    if (urlLang && (urlLang === 'en' || urlLang === 'zh')) {
      localStorage.setItem('selectedLanguage', urlLang);
      onLanguageDetermined(urlLang);
      return;
    }

    // 2. Check localStorage (client-side)
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'zh')) {
      onLanguageDetermined(storedLanguage);
      return;
    }

    // 3. Detect browser language or other heuristics (client-side)
    let detectedLang = 'en'; // Default to English
    try {
      // Explicitly check if running in a browser environment with navigator defined
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        const nav = navigator; // Use a local const for navigator

        // Check navigator.languages (most modern browsers)
        if (nav.languages && typeof nav.languages.length === 'number') { // Ensure .languages exists and .length is a number
          for (const lang of nav.languages) {
            // Ensure lang is a string and toLowerCase is a function before calling it
            if (lang && typeof lang === 'string' && typeof lang.toLowerCase === 'function' && lang.toLowerCase().startsWith('zh')) {
              detectedLang = 'zh';
              break;
            }
          }
        }
        // Fallback to navigator.language
        else if (nav.language && typeof nav.language === 'string' && typeof nav.language.toLowerCase === 'function' && nav.language.toLowerCase().startsWith('zh')) {
          detectedLang = 'zh';
        }
        // Fallback for very old browsers (less common, use with caution)
        // else if ((nav as any).userLanguage && typeof (nav as any).userLanguage === 'string' && typeof (nav as any).userLanguage.toLowerCase === 'function' && (nav as any).userLanguage.toLowerCase().startsWith('zh')) {
        //   detectedLang = 'zh';
        // }
      }
      // Optionally, check document.referrer (client-side, less reliable)
      // if (typeof document !== 'undefined' && document.referrer) { ... }

    } catch (error) {
      console.error('Error during client-side language detection (navigator/document):', error);
      // Fallback to 'en' on error to ensure stability
      detectedLang = 'en';
    }

    localStorage.setItem('selectedLanguage', detectedLang);
    onLanguageDetermined(detectedLang);

  }, [isClientMounted, searchParams, onLanguageDetermined]);

  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('en'); // SSR default

  const handleLanguageDetermined = useCallback((determinedLang: string) => {
    setLanguageState(determinedLang);
  }, []);

  const setLanguage = useCallback((lang: string) => {
    if (lang === 'en' || lang === 'zh') {
      setLanguageState(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedLanguage', lang);
        try {
          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set('lang', lang);
          window.history.replaceState({ ...window.history.state, lang }, '', currentUrl.toString());
        } catch (error) {
          console.error('Error updating URL:', error);
        }
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
      <Suspense fallback={null}>
        <ClientSideLanguageDetectorInternal onLanguageDetermined={handleLanguageDetermined} />
      </Suspense>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
"use client"

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>('en'); // Default language
  const searchParams = useSearchParams();
  
  // Load language from URL params, localStorage, or detect browser language on initial mount
  useEffect(() => {
    // First check URL param
    const urlLang = searchParams.get('lang');
    if (urlLang && (urlLang === 'en' || urlLang === 'zh')) {
      setLanguageState(urlLang);
      localStorage.setItem('selectedLanguage', urlLang);
      return;
    }
    
    // Then check localStorage
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'zh')) {
      setLanguageState(storedLanguage);
      return;
    }
    
    // If no saved preference, detect browser language
    const detectLanguage = () => {
      if (typeof navigator !== 'undefined') {
        // Check navigator.languages first for Chrome
        const browserLangs = navigator.languages || [navigator.language || (navigator as any).userLanguage];
        
        // Loop through browser languages
        for (const lang of browserLangs) {
          // Check if the language starts with 'zh'
          if (lang && typeof lang === 'string' && lang.startsWith('zh')) {
            return 'zh';
          }
        }
        
        // Also check the URL for Chinese search terms
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const searchQuery = urlParams.get('q') || urlParams.get('query');
          
          // Simple check for Chinese characters in query
          if (searchQuery && /[\u4E00-\u9FFF]/.test(searchQuery)) {
            return 'zh';
          }
          
          // Check referrer for Chinese search engines
          const referrer = document.referrer;
          if (referrer && (
            referrer.includes('baidu.com') ||
            referrer.includes('sogou.com') ||
            referrer.includes('haosou.com') ||
            referrer.includes('so.com') ||
            referrer.includes('sm.cn')
          )) {
            return 'zh';
          }
        } catch (error) {
          console.error("Error checking URL parameters:", error);
        }
      }
      
      return 'en'; // Default to English if nothing else matches
    };

    const detectedLang = detectLanguage();
    setLanguageState(detectedLang);
    localStorage.setItem('selectedLanguage', detectedLang);
    
    // Update URL with detected language - safely
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', detectedLang);
      window.history.replaceState({}, '', url.toString());
    } catch (error) {
      console.error("Error updating URL:", error);
    }
    
  }, [searchParams]);

  const setLanguage = (lang: string) => {
    if (lang === 'en' || lang === 'zh') {
      localStorage.setItem('selectedLanguage', lang);
      setLanguageState(lang);
      
      // Update URL when language changes - safely
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url.toString());
      } catch (error) {
        console.error("Error updating URL:", error);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
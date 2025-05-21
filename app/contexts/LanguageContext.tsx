"use client"

import { createContext, useState, useContext, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>('en'); // Default language

  // Load language from localStorage on initial mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'zh')) {
      setLanguageState(storedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    if (lang === 'en' || lang === 'zh') {
      localStorage.setItem('selectedLanguage', lang);
      setLanguageState(lang);
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
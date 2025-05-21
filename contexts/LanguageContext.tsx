"use client"

import { createContext, useContext, useEffect, useState } from 'react'

interface LanguageContextType {
  currentLang: string
  setLang: (lang: string) => void
  translations: {
    ourMission: string
    ourApproach: string
    howItWorks: string
    aboutUs: string
    joinWaitlist: string
  }
  availableLangs: { [key: string]: string }
}

const translations = {
  en: {
    ourMission: "Our Mission",
    ourApproach: "Our Approach",
    howItWorks: "How It Works",
    aboutUs: "About Us",
    joinWaitlist: "Join Waitlist"
  },
  zh: {
    ourMission: "我们的使命",
    ourApproach: "我们的方法",
    howItWorks: "运作方式",
    aboutUs: "关于我们",
    joinWaitlist: "加入候补名单"
  }
}

const availableLangs = {
  en: "English",
  zh: "中文"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState('en')

  useEffect(() => {
    // Load language preference from localStorage on mount
    const savedLang = localStorage.getItem('preferredLanguage')
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
      setCurrentLang(savedLang)
    }
  }, [])

  const setLang = (lang: string) => {
    setCurrentLang(lang)
    localStorage.setItem('preferredLanguage', lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setLang,
        translations: translations[currentLang as keyof typeof translations],
        availableLangs
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 
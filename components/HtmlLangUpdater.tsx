"use client"

import { useLanguage } from "@/app/contexts/LanguageContext"
import { useEffect } from "react"

export function HtmlLangUpdater() {
  const { language } = useLanguage();
  
  // Update HTML lang attribute on client-side only
  useEffect(() => {
    if (document && document.documentElement) {
      document.documentElement.lang = language || 'en';
    }
  }, [language]);
  
  return null;
}
"use client"

import { useLanguage } from "@/app/contexts/LanguageContext"
import { useEffect } from "react"

export function HtmlLangUpdater() {
  const { language } = useLanguage()
  
  // Update the HTML lang attribute when language changes
  useEffect(() => {
    if (language && document.documentElement) {
      document.documentElement.lang = language;
    }
  }, [language])
  
  // This component doesn't render anything visible
  return null
}
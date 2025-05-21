"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { currentLang } = useLanguage()

  return (
    <html lang={currentLang}>
      {children}
    </html>
  )
} 
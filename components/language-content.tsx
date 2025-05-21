"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export function LanguageContent({ children }: { children: React.ReactNode }) {
  const { currentLang } = useLanguage()

  return (
    <div lang={currentLang}>
      {children}
    </div>
  )
} 
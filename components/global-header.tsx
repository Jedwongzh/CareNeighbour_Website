"use client"

import { UnifiedHeader } from "@/components/unified-header"
import { useLanguage } from "@/app/contexts/LanguageContext"
import getHeaderTranslations from "@/lib/header-translations"

export function GlobalHeader() {
  const { language, setLanguage } = useLanguage()
  const translations = getHeaderTranslations(language)

  return (
    <UnifiedHeader
      language={language}
      setLanguage={setLanguage}
      translations={translations}
    />
  )
}


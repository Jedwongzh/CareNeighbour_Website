"use client"

import { useLanguage } from "../contexts/LanguageContext"
import { useEffect, useState } from "react"

export function DynamicHtmlLang({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // Only set mounted to true after first render on client
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // During SSR and first client render, use default
    return <html lang="en">{children}</html>;
  }
  
  return <html lang={language}>{children}</html>;
}
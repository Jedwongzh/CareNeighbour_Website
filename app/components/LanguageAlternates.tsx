"use client"

import { usePathname } from "next/navigation"
import { useLanguage } from "../contexts/LanguageContext"
import Script from "next/script"
import { useEffect } from "react"

export function LanguageAlternates() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const baseUrl = "https://www.careneighbour.com" // Update with your actual domain
  
  // Update the URL when language changes without full page reload
  useEffect(() => {
    // Get current URL and update search params
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    
    // Update browser history without reload
    window.history.replaceState({}, '', url.toString());
  }, [language, pathname]);

  // Instead of Head, insert link tags via script
  return (
    <Script id="language-alternates" strategy="afterInteractive">
      {`
        const linkEn = document.createElement('link');
        linkEn.rel = 'alternate';
        linkEn.hrefLang = 'en';
        linkEn.href = '${baseUrl}${pathname}?lang=en';
        document.head.appendChild(linkEn);
        
        const linkZh = document.createElement('link');
        linkZh.rel = 'alternate';
        linkZh.hrefLang = 'zh';
        linkZh.href = '${baseUrl}${pathname}?lang=zh';
        document.head.appendChild(linkZh);
        
        const linkDefault = document.createElement('link');
        linkDefault.rel = 'alternate';
        linkDefault.hrefLang = 'x-default';
        linkDefault.href = '${baseUrl}${pathname}';
        document.head.appendChild(linkDefault);
      `}
    </Script>
  )
}
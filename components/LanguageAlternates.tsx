"use client"

import { usePathname } from "next/navigation"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { useEffect } from "react"

export function LanguageAlternates() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const baseUrl = "https://www.careneighbour.com" // Update with your domain
  
  // Use useEffect to dynamically add alternate links to the document head
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Remove any existing alternate links first
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    // Create and append the new links
    const linkEn = document.createElement('link');
    linkEn.rel = 'alternate';
    linkEn.hreflang = 'en';
    linkEn.href = `${baseUrl}${pathname}?lang=en`;
    document.head.appendChild(linkEn);
    
    const linkZh = document.createElement('link');
    linkZh.rel = 'alternate';
    linkZh.hreflang = 'zh';
    linkZh.href = `${baseUrl}${pathname}?lang=zh`;
    document.head.appendChild(linkZh);
    
    const linkDefault = document.createElement('link');
    linkDefault.rel = 'alternate';
    linkDefault.hreflang = 'x-default';
    linkDefault.href = `${baseUrl}${pathname}`;
    document.head.appendChild(linkDefault);
  }, [pathname, language, baseUrl]);
  
  // This component doesn't render anything visible
  return null;
}
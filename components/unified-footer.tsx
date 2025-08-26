"use client"

import Link from "next/link"
import Image from "next/image"

interface UnifiedFooterProps {
  language: string
  translations: {
    heroLogo?: string
    aboutUs: string
    mainPage?: string
    footerCopyright?: string
  }
}

export function UnifiedFooter({ language, translations }: UnifiedFooterProps) {
  return (
    <footer 
      className="border-t bg-purple-50"
      style={{
          background: 'rgba(255,255,255,0)',
          borderRadius: '0px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(9px)',
          WebkitBackdropFilter: 'blur(9px)',
          border: '1px solid rgba(255,255,255,0.38)'
        }}
      >
      <div className="container px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Image src="/CN_Brandmark_Black.png" alt="CareNeighbour Logo" width={24} height={24} />
          <span>
            &copy; {new Date().getFullYear()}{" "}
            {translations.footerCopyright || (language === 'zh' ? '零距' : language === 'yue' ? '零距' : 'CareNeighbour')}
          </span>
        </div>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-primary transition-colors">
            {translations.aboutUs}
          </Link>
        </div>
      </div>
    </footer>
  )
}

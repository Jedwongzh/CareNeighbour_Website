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
    <footer className="border-t bg-purple-50">
      <div className="container px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Image src="/images/logo.png" alt="CareNeighbour Logo" width={24} height={24} />
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

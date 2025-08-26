"use client"

import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface UnifiedHeaderProps {
  language: string
  setLanguage: (lang: string) => void
  translations: {
    heroLogo: string
    howItWorks: string
    aboutUs: string
    joinWaitlist: string
    SourceforCare: string
    mainPage?: string
  }
}

export function UnifiedHeader({ language, setLanguage, translations }: UnifiedHeaderProps) {
  const pathname = usePathname()

  // Glass effect class
  const glassClass = "bg-white/30 backdrop-blur-md rounded px-2 py-1 shadow transition-all"

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300 ease-in-out"
      style={{
        background: 'rgba(255,255,255,0)',
        borderRadius: '0px',
        boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(9px)',
        WebkitBackdropFilter: 'blur(9px)',
        border: '1px solid rgba(255,255,255,0.38)'
      }}
    >
      <div className="container px-4 md:px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 transition-all duration-300 ease-in-out">
          <Image src="/CN_Brandmark_Black.png" alt="CareNeighbour Logo" width={25} height={25} />
          <span className="font-semibold text-lg transition-colors duration-300 ease-in-out">
            {language === 'zh' ? '零距' : language === 'yue' ? '零距' : 'CareNeighbour'}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {/* Language switcher */}
          <Button
            size="sm"
            variant={language === "en" ? "secondary" : "ghost"}
            onClick={() => setLanguage("en")}
            className="bg-transparent"
          >
            EN
          </Button>
          <Button
            size="sm"
            variant={language === "zh" ? "secondary" : "ghost"}
            onClick={() => setLanguage("zh")}
            className="transition-all duration-300 ease-in-out hover:scale-105 bg-transparent"
          >
            中文
          </Button>
          <a
            href="/"
            className={`text-sm font-medium text-center text-gray-600 hover:text-primary transition-all duration-300 ease-in-out ${pathname === "/" ? glassClass : ""}`}
            onClick={e => {
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            {translations.mainPage}
          </a>
          <Link
            href="/about"
            className={`text-sm font-medium text-center text-gray-600 hover:text-primary transition-all duration-300 ease-in-out ${pathname === "/about" ? glassClass : ""}`}
          >
            {translations.aboutUs}
          </Link>
          <Link
            href="/services"
            className={`text-sm font-medium text-center text-gray-600 hover:text-primary transition-all duration-300 ease-in-out ${pathname === "/services" ? glassClass : ""}`}
          >
            {translations.SourceforCare}
          </Link>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (typeof window !== 'undefined' && window.location.pathname === '/') {
          document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
              } else {
          window.location.href = '/#waitlist'
              }
            }}
            className={`text-sm font-medium text-center text-gray-600 hover:text-primary transition-all duration-300 ease-in-out bg-transparent`}
          >
            {translations.joinWaitlist}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <MobileNav
          translations={{
            mainPage: translations.mainPage || translations.heroLogo,
            howItWorks: translations.howItWorks,
            aboutUs: translations.aboutUs,
            joinWaitlist: translations.joinWaitlist,
            SourceforCare: translations.SourceforCare,
          }}
          currentLang={language}
          setLang={setLanguage}
          availableLangs={{ en: "EN", zh: "中文" }}
          onJoinWaitlist={() => window.location.href = '/#waitlist'}
        />
      </div>
    </header>
  )
}

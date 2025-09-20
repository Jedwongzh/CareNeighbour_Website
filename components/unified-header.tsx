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
    payment: string
    mainPage?: string
    becomeACarer?: string
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
      <div className="container px-4 md:px-6 flex h-16 items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center space-x-2 transition-all duration-300 ease-in-out">
          <Image src="/CN_Brandmark_Black.png" alt="CareNeighbour Logo" width={25} height={25} />
          <span className="font-semibold text-lg transition-colors duration-300 ease-in-out">
            {language === 'zh' ? '零距' : language === 'yue' ? '零距' : 'CareNeighbour'}
          </span>
        </Link>

        {/* Desktop Navigation + Language toggle (far right) */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 ml-auto">
          <nav className="flex gap-4 lg:gap-6 items-center">
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
            <Link
              href="/payment"
              className={`text-sm font-medium text-center text-gray-600 hover:text-primary transition-all duration-300 ease-in-out ${pathname?.startsWith("/payment") ? glassClass : ""}`}
            >
              {translations.payment}
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-center ml-2"
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium transition-all duration-300 ease-in-out hover:scale-105 px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm whitespace-nowrap"
              >
                {translations.becomeACarer || 'Become a Carer'}
              </Button>
            </Link>
          </nav>

          {/* Visual separator between links and language toggle */}
          <div className="h-6 w-px bg-gray-200 ml-2 lg:ml-3" aria-hidden="true" />

          {/* Language toggle (segmented with sliding thumb) */}
          <div
            className="relative inline-flex items-center rounded-full border border-gray-200 bg-white/70 backdrop-blur p-1 shadow-sm"
            role="group"
            aria-label="Language toggle"
          >
            <span
              className={`absolute inset-y-1 left-1 w-1/2 rounded-full bg-gray-900 shadow transition-transform duration-300 ease-out ${
                language === 'zh' ? 'translate-x-full' : 'translate-x-0'
              }`}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`relative z-10 inline-flex items-center justify-center w-16 px-3 py-1.5 text-xs font-medium rounded-full focus:outline-none ${
                language === 'en' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("zh")}
              className={`relative z-10 inline-flex items-center justify-center w-16 px-3 py-1.5 text-xs font-medium rounded-full focus:outline-none ${
                language === 'zh' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
              aria-pressed={language === 'zh'}
            >
              中文
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav
          translations={{
            mainPage: translations.mainPage || translations.heroLogo,
            howItWorks: translations.howItWorks,
            aboutUs: translations.aboutUs,
            joinWaitlist: translations.joinWaitlist,
            SourceforCare: translations.SourceforCare,
            payment: translations.payment,
            becomeACarer: translations.becomeACarer || 'Become a Carer',
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

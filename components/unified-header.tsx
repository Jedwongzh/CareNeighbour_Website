"use client"

import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LogOut, ChevronDown, Users, Heart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    getStarted?: string
    joinCareNeighbour?: string
    findSupport?: string
    findSupportDesc?: string
    provideSupport?: string
    provideSupportDesc?: string
  }
}

export function UnifiedHeader({ language, setLanguage, translations }: UnifiedHeaderProps) {
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  // Glass effect class
  const glassClass = "bg-white/30 backdrop-blur-md rounded px-2 py-1 shadow transition-all"

  // Function to handle "Find support" - scroll to waitlist section
  const handleFindSupport = () => {
    if (pathname === '/') {
      // If on home page, scroll to waitlist section
      const waitlistElement = document.getElementById('waitlist')
      if (waitlistElement) {
        waitlistElement.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If not on home page, navigate to home page with waitlist hash
      window.location.href = '/#waitlist'
    }
  }

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
      <div className="w-full px-4 md:px-6 flex h-16 items-center justify-between max-w-none">
        <Link href="/" className="flex items-center space-x-2 transition-all duration-300 ease-in-out">
          <Image src="/CN_Brandmark_Black.png" alt="CareNeighbour Logo" width={25} height={25} />
          <span className="font-semibold text-lg transition-colors duration-300 ease-in-out">
            {language === 'zh' ? '零距' : language === 'yue' ? '零距' : 'CareNeighbour'}
          </span>
        </Link>

        {isAuthenticated ? (
          /* Authenticated state: Show logo + logout button */
          <div className="flex items-center gap-3">
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          /* Unauthenticated state: Show full navigation */
          <>
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

                {/* Get Started Dropdown */}
                <div className="ml-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium transition-all duration-300 ease-in-out hover:scale-105 px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm whitespace-nowrap"
                      >
                        {translations.getStarted || 'Get Started'}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-0">
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-4 text-gray-900">{translations.joinCareNeighbour || 'Join CareNeighbour'}</h3>
                        
                        <button
                          onClick={handleFindSupport}
                          className="w-full p-4 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200 mb-3 text-left group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                              <Heart className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{translations.findSupport || 'I want to find support'}</h4>
                              <p className="text-sm text-gray-600">{translations.findSupportDesc || 'For myself, a client or on behalf of a friend or family member.'}</p>
                            </div>
                          </div>
                        </button>

                        <Link
                          href="/signup"
                          className="block w-full p-4 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200 text-left group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                              <Users className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{translations.provideSupport || 'I want to provide support'}</h4>
                              <p className="text-sm text-gray-600">{translations.provideSupportDesc || 'As a support worker, nurse, allied health professional, gardener or cleaner.'}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
                  className={`absolute inset-y-1 w-16 rounded-full bg-gray-900 shadow transition-all duration-300 ease-out ${
                    language === 'zh' ? 'left-[calc(50%)]' : 'left-1'
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
                getStarted: translations.getStarted || 'Get Started',
                findSupport: translations.findSupport || 'Find Support',
                provideSupport: translations.provideSupport || 'Provide Support',
              }}
              currentLang={language}
              setLang={setLanguage}
              availableLangs={{ en: "EN", zh: "中文" }}
              onJoinWaitlist={() => window.location.href = '/#waitlist'}
            />
          </>
        )}
      </div>
    </header>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"

interface MobileNavProps {
  translations: {
    mainPage: string
    howItWorks: string
    aboutUs: string
    joinWaitlist: string
    SourceforCare: string
    payment: string
    becomeACarer?: string
    getStarted?: string
    findSupport?: string
    provideSupport?: string
  }
  currentLang: string
  setLang: (lang: string) => void
  availableLangs: Record<string, string>
  onJoinWaitlist?: () => void
}

export function MobileNav({ 
  translations, 
  currentLang, 
  setLang, 
  availableLangs,
  onJoinWaitlist 
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false)

  const handleJoinWaitlist = () => {
    setIsOpen(false)
    setIsGetStartedOpen(false)
    if (onJoinWaitlist) {
      onJoinWaitlist()
    } else {
      window.location.href = '/#waitlist'
    }
  }
  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/20"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/90 backdrop-blur-md border-b shadow-lg z-50">
          <div className="container px-4 py-5 space-y-5">
            {/* Language switcher */}
            <div className="flex gap-2 justify-center">
              {Object.entries(availableLangs).map(([lang, label]) => (
          <Button
            key={lang}
            size="sm"
            variant={currentLang === lang ? "secondary" : "ghost"}
            onClick={() => setLang(lang)}
            className="min-w-[3rem]"
          >
            {label}
          </Button>
              ))}
            </div>

            {/* Navigation Links */}
            <div className="space-y-3">
              <Link
          href="/"
          className="block text-center py-3 text-gray-700 hover:text-primary transition-colors font-medium"
          onClick={() => setIsOpen(false)}
              >
          {translations.mainPage}
              </Link>
              <Link
          href="/about"
          className="block text-center py-3 text-gray-700 hover:text-primary transition-colors font-medium"
          onClick={() => setIsOpen(false)}
              >
          {translations.aboutUs}
              </Link>
              <Link
          href="/services"
          className="block text-center py-3 text-gray-700 hover:text-primary transition-colors font-medium"
          onClick={() => setIsOpen(false)}
              >
          {translations.SourceforCare}
              </Link>
              <Link
          href="/payment"
          className="block text-center py-3 text-gray-700 hover:text-primary transition-colors font-medium"
          onClick={() => setIsOpen(false)}
              >
          {translations.payment}
              </Link>
            </div>

            {/* Get Started Button with Dropdown */}
            <div className="pt-3">
              <button
                onClick={() => setIsGetStartedOpen(!isGetStartedOpen)}
                className="w-full flex items-center justify-center gap-2 py-3 text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {translations.getStarted || 'Get Started'}
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${isGetStartedOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {/* Collapsible Get Started Options */}
              {isGetStartedOpen && (
                <div className="mt-3 space-y-3 px-4">
                  <button
                    onClick={handleJoinWaitlist}
                    className="w-full p-3 rounded-lg border border-gray-200 bg-blue-50 hover:bg-blue-100 transition-colors text-center"
                  >
                    <div className="text-sm font-semibold text-gray-900">
                      {translations.findSupport || 'Find Support'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Join our waitlist for care services
                    </div>
                  </button>
                  
                  <Link
                    href="/signup"
                    onClick={() => {
                      setIsOpen(false)
                      setIsGetStartedOpen(false)
                    }}
                    className="block w-full p-3 rounded-lg border border-gray-200 bg-purple-50 hover:bg-purple-100 transition-colors text-center"
                  >
                    <div className="text-sm font-semibold text-gray-900">
                      {translations.provideSupport || 'Provide Support'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Join as a care provider
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
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

  const handleJoinWaitlist = () => {
    setIsOpen(false)
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

            {/* Sign Up Button */}
            <div className="pt-3">
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
              >
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white py-3 text-base font-medium"
                >
                  {translations.becomeACarer || 'Become a Carer'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

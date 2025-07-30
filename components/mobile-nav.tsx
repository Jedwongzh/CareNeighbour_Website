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
    BecomeACarer: string
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
        className="p-2"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/90 backdrop-blur-md border-b shadow-lg z-50">
          <div className="container px-4 py-4 space-y-4">
            {/* Language switcher */}
            <div className="flex gap-2 justify-center">
              {Object.entries(availableLangs).map(([lang, label]) => (
          <Button
            key={lang}
            size="sm"
            variant={currentLang === lang ? "secondary" : "ghost"}
            onClick={() => setLang(lang)}
          >
            {label}
          </Button>
              ))}
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <Link
          href="/"
          className="block text-center py-2 text-gray hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
              >
          {translations.mainPage}
              </Link>
              <Link
          href="/about"
          className="block text-center py-2 text-gray hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
              >
          {translations.aboutUs}
              </Link>
              <Link
          href="/services"
          className="block text-center py-2 text-gray hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
              >
          {translations.SourceforCare}
              </Link>
              <Link
          href="/become-a-carer"
          className="block text-center py-2 text-gray hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
              >
          {translations.BecomeACarer}
              </Link>
            </div>

            {/* Join Waitlist Button */}
            <Button
              className="w-full"
              onClick={handleJoinWaitlist}
            >
              {translations.joinWaitlist}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
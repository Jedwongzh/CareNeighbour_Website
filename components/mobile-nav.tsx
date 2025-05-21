"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

// Update interface to expect all necessary props
interface MobileNavProps {
  translations: {
    ourMission: string;
    ourApproach: string;
    howItWorks: string;
    aboutUs: string;
    joinWaitlist: string;
  };
  currentLang: string;
  setLang: (lang: string) => void;
  availableLangs: { [key: string]: string };
}

export function MobileNav({ translations, currentLang, setLang, availableLangs }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => setIsOpen(false)

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const targetElement = document.querySelector(id)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
    closeSheet()
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
          <div className="p-4">
            <nav className="flex flex-col gap-6 mt-8">
              <SheetClose asChild>
                <Link
                  href="#problem-statement"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={(e) => handleSmoothScroll(e, "#problem-statement")}
                >
                  {translations.ourMission}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="#how-it-works"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
                >
                  {translations.howItWorks}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="#our-approach"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={(e) => handleSmoothScroll(e, "#our-approach")}
                >
                  {translations.ourApproach}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/about"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeSheet}
                >
                  {translations.aboutUs}
                </Link>
              </SheetClose>
              {/* Language Switcher for Mobile */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-500 mb-2">Language</p>
                <div className="flex gap-2">
                  {Object.entries(availableLangs).map(([langCode, langName]: [string, string]) => (
                    <Button
                      key={langCode}
                      variant={currentLang === langCode ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => {
                        setLang(langCode) // This setLang comes from props (ultimately from LanguageContext)
                        closeSheet()
                      }}
                      className="flex-1"
                    >
                      {langName}
                    </Button>
                  ))}
                </div>
              </div>
              <SheetClose asChild>
                <Button
                  variant="default"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6"
                  onClick={() => {
                    const waitlistElement = document.getElementById("waitlist")
                    if (waitlistElement) {
                      waitlistElement.scrollIntoView({ behavior: "smooth" })
                    }
                    closeSheet()
                  }}
                >
                  {translations.joinWaitlist}
                </Button>
              </SheetClose>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

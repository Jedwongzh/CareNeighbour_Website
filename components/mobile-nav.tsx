"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

// Update interface to expect all necessary props
interface MobileNavProps {
  translations: {
    mainPage: string;
    howItWorks: string;
    aboutUs: string;
    joinWaitlist: string;
    SourceforCare: string;
  };
  currentLang: string;
  setLang: (lang: string) => void;
  availableLangs: { [key: string]: string };
}

export function MobileNav({ translations, currentLang, setLang, availableLangs }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="p-4">
            <nav className="flex flex-col gap-6 mt-8">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeSheet}
                >
                  {translations.mainPage}
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
              <SheetClose asChild>
                <Link
                  href="/services"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeSheet}
                >
                  {translations.SourceforCare}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    closeSheet()
                    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {translations.joinWaitlist}
                </Button>
              </SheetClose>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant={currentLang === "en" ? "secondary" : "ghost"}
                  onClick={() => setLang("en")}
                  className="flex-1"
                >
                  EN
                </Button>
                <Button
                  size="sm"
                  variant={currentLang === "zh" ? "secondary" : "ghost"}
                  onClick={() => setLang("zh")}
                  className="flex-1"
                >
                  中文
                </Button>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export function MobileNav() {
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
        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
          <div className="p-4">
            <nav className="flex flex-col gap-6 mt-8">
              <SheetClose asChild>
                <Link
                  href="#problem-statement"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeSheet}
                >
                  Our Mission
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="#how-it-works"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeSheet}
                >
                  How It Works
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="#our-approach"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeSheet}
                >
                  Our Approach
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/about"
                  className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={closeSheet}
                >
                  About Us
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant="default"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
                    closeSheet()
                  }}
                >
                  Join Waitlist
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    window.location.href = "/app-demo"
                    closeSheet()
                  }}
                >
                  Experience Demo
                </Button>
              </SheetClose>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

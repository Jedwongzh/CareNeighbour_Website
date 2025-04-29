"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2 text-gray-700" aria-label={isOpen ? "Close menu" : "Open menu"}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="p-2 text-gray-700" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col items-center space-y-8 p-4">
            <Link href="/" className="flex items-center space-x-2" onClick={toggleMenu}>
              <Image src="/images/logo.png" alt="CareNeighbor Logo" width={40} height={40} />
              <span className="font-bold text-xl">CareNeighbor</span>
            </Link>

            <nav className="flex flex-col items-center space-y-6 text-lg">
              <Link href="/#how-it-works" className="text-gray-700 hover:text-primary" onClick={toggleMenu}>
                How It Works
              </Link>
              <Link href="/#features" className="text-gray-700 hover:text-primary" onClick={toggleMenu}>
                Features
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary" onClick={toggleMenu}>
                About Us
              </Link>
              <Link href="/#waitlist" onClick={toggleMenu}>
                <Button size="lg">Join Waitlist</Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

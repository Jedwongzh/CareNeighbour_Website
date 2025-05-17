"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-md"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-md"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, staggerChildren: 0.1 }}
              className="flex flex-col items-center space-y-8 p-4"
            >
              <Link href="/" className="flex items-center space-x-2" onClick={toggleMenu}>
                <Image src="/CNlogo.png" alt="CareNeighbour Logo" width={40} height={40} />
                <span className="font-bold text-xl">CareNeighbour</span>
              </Link>

              <nav className="flex flex-col items-center space-y-6 text-lg w-full">
                <Link
                  href="/#problem-statement"
                  className="text-gray-700 hover:text-primary w-full text-center py-2"
                  onClick={toggleMenu}
                >
                  Our Mission
                </Link>
                <Link
                  href="/#how-it-works"
                  className="text-gray-700 hover:text-primary w-full text-center py-2"
                  onClick={toggleMenu}
                >
                  How It Works
                </Link>
                <Link
                  href="/#our-approach"
                  className="text-gray-700 hover:text-primary w-full text-center py-2"
                  onClick={toggleMenu}
                >
                  Our Approach
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-primary w-full text-center py-2"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
                <Link href="/#waitlist" onClick={toggleMenu} className="w-full">
                  <Button size="lg" className="w-full">
                    Join Waitlist
                  </Button>
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

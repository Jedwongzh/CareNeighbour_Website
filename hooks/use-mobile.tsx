"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const debounce = (func: () => void, delay: number) => {
      let timeout: NodeJS.Timeout
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(func, delay)
      }
    }

    const debouncedCheckIfMobile = debounce(checkIfMobile, 200)

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", debouncedCheckIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", debouncedCheckIfMobile)
  }, [])

  return isMobile
}

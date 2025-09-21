"use client"

import { createContext, useState, useEffect, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AuthContextProps {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check local storage or cookies for authentication status
    // Example:
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = () => {
    // Implement login logic (e.g., set token in local storage)
    localStorage.setItem("token", "dummy_token")
    setIsAuthenticated(true)
  }

  const logout = () => {
    // Implement logout logic (e.g., remove token from local storage)
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    
    // Redirect to main page after logout
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

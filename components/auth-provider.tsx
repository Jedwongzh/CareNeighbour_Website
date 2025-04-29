"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

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
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

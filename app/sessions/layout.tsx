"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ClipboardList,
  Search,
  Clock,
  Menu,
  X,
  ChevronRight
} from "lucide-react"

interface SessionsLayoutProps {
  children: React.ReactNode
}

export default function SessionsLayout({ children }: SessionsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  
  const menuItems = [
    {
      href: "/sessions",
      label: "Overview",
      icon: Menu,
      active: pathname === "/sessions"
    },
    {
      href: "/sessions/discover",
      label: "Discover",
      icon: ClipboardList,
      active: pathname === "/sessions/discover",
      description: "Personalized recommendations"
    },
    {
      href: "/sessions/search", 
      label: "Search",
      icon: Search,
      active: pathname === "/sessions/search",
      description: "Browse all jobs"
    },
    {
      href: "/sessions/last-minute",
      label: "Last Minute",
      icon: Clock,
      active: pathname === "/sessions/last-minute",
      description: "Urgent opportunities",
      badge: "2 urgent"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          {/* Mobile close button */}
          <div className="lg:hidden flex items-center justify-end p-4 border-b">
            <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/carer-dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
            <p className="text-gray-600 mt-1">Find and manage your care sessions</p>
          </div>

          {/* Navigation Menu */}
          <nav className="p-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${item.active ? "text-purple-600" : "text-gray-500"}`} />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-gray-500">{item.description}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="destructive" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </Link>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="p-6 border-t mt-auto">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900 mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Jobs</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urgent Jobs</span>
                    <span className="font-medium text-red-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile header for opening sidebar */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
            <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold">Jobs</h1>
            <div></div>
          </div>

          {/* Page Content */}
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { UnifiedFooter } from "@/components/unified-footer"
import { useLanguage } from "@/app/contexts/LanguageContext"
import {
  Bell,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  User,
  Users,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Heart,
  Home,
  Car,
  Utensils,
  ActivitySquare,
  FileText,
  Mail,
  ChevronRight,
  Camera,
  Plus,
  Edit,
  Menu,
  X,
  Shield,
  Award,
  Briefcase,
  GraduationCap,
  Languages,
  ClipboardList,
  HelpCircle
} from "lucide-react"

export default function CarerDashboard() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Mock data - in a real app this would come from an API
  const carerProfile = {
    name: "Sarah Thompson",
    displayName: "Sarah T",
    avatar: "/placeholder-user.jpg",
    rating: 4.8,
    reviewCount: 127,
    completedJobs: 234,
    earnings: 2450,
    monthlyEarnings: 580,
    memberSince: "2023",
    profileComplete: 65,
    isApproved: false,
    bio: "Experienced care provider with over 5 years in elderly care. Passionate about helping people maintain their independence and quality of life.",
    availability: "Available Now"
  }

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/carer-dashboard" },
    { id: "sessions", label: "Manage sessions", icon: Calendar, href: "/sessions" },
    { id: "jobs", label: "Jobs", icon: ClipboardList, href: "/jobs" },
    { id: "clients", label: "Manage clients", icon: Users, href: "/manage-clients" },
    { id: "timesheet", label: "Support hours", icon: Clock, href: "/timesheet" },
    { id: "inbox", label: "Inbox", icon: Mail, href: "/inbox" },
    { id: "billing", label: "Billing", icon: DollarSign, href: "/billing" },
    { id: "my-clients", label: "My clients", icon: Users, href: "/clients" },
    { id: "account", label: "Account", icon: Settings, href: "/account" },
  ]

  const extraLinks = [
    { label: "Help", href: "/help" },
    { label: "About us", href: "/about" },
    { label: "Search workers", href: "/search" },
  ]

  const upcomingJobs = [
    {
      id: 1,
      clientName: "Margaret Chen",
      service: "Companionship",
      date: "Today",
      time: "2:00 PM - 5:00 PM",
      location: "Richmond, BC",
      payment: "$120",
      urgent: false
    },
    {
      id: 2,
      clientName: "Robert Wilson",
      service: "Personal Care",
      date: "Tomorrow",
      time: "9:00 AM - 12:00 PM",
      location: "Vancouver, BC",
      payment: "$150",
      urgent: true
    }
  ]

  const verificationItems = [
    { name: "Working with Children Check", completed: false },
    { name: "First aid certificate", completed: false },
    { name: "CPR certificate", completed: false },
    { name: "Australian Driver's Licence", completed: false },
    { name: "Serious Incident Response Scheme training", completed: false },
    { name: "Code of Conduct for Aged Care training", completed: false },
  ]

  const ProfileHeader = () => (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg">
      {/* Profile approval banner */}
      {!carerProfile.isApproved && (
        <div className="bg-yellow-500/20 border border-yellow-300/50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-100">
            Your profile isn't visible to clients until your account is approved
          </h3>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative">
          <Avatar className="w-32 h-32 border-4 border-white/20">
            <AvatarImage src={carerProfile.avatar} alt={carerProfile.name} />
            <AvatarFallback className="text-2xl bg-gray-300 text-gray-700">
              {carerProfile.displayName}
            </AvatarFallback>
          </Avatar>
          <Button 
            size="sm" 
            className="absolute -bottom-2 -right-2 rounded-full p-2 bg-white/20 hover:bg-white/30"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{carerProfile.name}</h1>
              <p className="text-blue-100 text-lg">Support Worker</p>
              <p className="text-blue-200 text-sm mt-2">
                On CareNeighbour since {carerProfile.memberSince}
              </p>
              
              {/* Rating and stats */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{carerProfile.rating}</span>
                  <span className="text-blue-200">({carerProfile.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/CN_Brandmark_Black.png" alt="CareNeighbour" width={25} height={25} />
          <span className="font-semibold text-lg">CareNeighbour</span>
        </Link>
        <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Profile card */}
      <div className="p-4 border-b">
        <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <Avatar className="w-12 h-12">
            <AvatarImage src={carerProfile.avatar} alt={carerProfile.name} />
            <AvatarFallback>{carerProfile.displayName}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{carerProfile.name}</div>
            <div className="text-sm text-gray-600">Support Worker</div>
          </div>
        </Link>
        
        <div className="mt-3 space-y-2">
          <Link href="/profile-building/availability" className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700">
            <Edit className="h-4 w-4" />
            Edit profile
          </Link>
          <Button variant="outline" size="sm" className="w-full justify-start text-sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id 
                ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <Separator className="mx-4" />

      {/* Extra links */}
      <div className="p-4 space-y-1">
        {extraLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {link.label}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top header */}
        <header className="bg-white border-b lg:hidden">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/CN_Brandmark_Black.png" alt="CareNeighbour" width={25} height={25} />
              <span className="font-semibold text-lg">CareNeighbour</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
                <Badge className="ml-1 bg-red-500 text-white text-xs px-1">3</Badge>
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-5 w-5" />
                <Badge className="ml-1 bg-blue-500 text-white text-xs px-1">2</Badge>
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Profile Header */}
              <Card className="overflow-hidden">
                <ProfileHeader />
              </Card>

              {/* Profile completion and bio */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Profile details */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Bio section */}
                  <Card className="glassmorphism">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">About {carerProfile.name}</CardTitle>
                        <Link href="/profile-building" className="text-sm text-purple-600 hover:text-purple-700">
                          Edit bio
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {carerProfile.bio}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Availability */}
                  <Card className="glassmorphism">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Preferred hours</CardTitle>
                        <Link href="/profile-building/availability" className="text-sm text-purple-600 hover:text-purple-700">
                          Edit
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 text-sm">
                        Preferred hours to provide support is not yet set. Please check back later or contact Sarah for more details.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Rates */}
                  <Card className="glassmorphism">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Indicative rates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-500 mb-2">Only visible to you</p>
                        <h3 className="text-base font-medium mb-4">Enter your hourly rates for weekday, weekend and 24-hr sessions.</h3>
                        <Link href="/profile-building/rates" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">
                          <Plus className="h-4 w-4" />
                          Add rates
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Verification */}
                  <Card className="glassmorphism">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        CareNeighbour verified
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        We ensure every support worker is checked and verified to provide a trusted and positive experience.
                      </p>
                      <div className="space-y-3">
                        {verificationItems.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded border">
                            <span className="text-sm">{item.name}</span>
                            <Link href="/profile-building" className="text-purple-600 hover:text-purple-700">
                              <Plus className="h-4 w-4" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right column - Dashboard content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Quick stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <Card className="glassmorphism border-purple-200/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Rating</p>
                            <p className="text-2xl font-bold text-gray-900">{carerProfile.rating}</p>
                          </div>
                          <Star className="h-8 w-8 text-yellow-500 fill-current" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{carerProfile.reviewCount} reviews</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism border-blue-200/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Completed Jobs</p>
                            <p className="text-2xl font-bold text-gray-900">{carerProfile.completedJobs}</p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-blue-500" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">This month: 23</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism border-green-200/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Earnings</p>
                            <p className="text-2xl font-bold text-gray-900">${carerProfile.monthlyEarnings}</p>
                          </div>
                          <DollarSign className="h-8 w-8 text-green-500" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">This month</p>
                      </CardContent>
                    </Card>

                    <Card className="glassmorphism border-orange-200/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Next Appointment</p>
                            <p className="text-lg font-bold text-gray-900">2:00 PM</p>
                          </div>
                          <Clock className="h-8 w-8 text-orange-500" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Today</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Upcoming jobs */}
                  <Card className="glassmorphism">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        Upcoming Jobs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {upcomingJobs.map((job) => (
                        <div key={job.id} className="border rounded-lg p-4 hover:bg-purple-50/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{job.clientName}</h4>
                                {job.urgent && (
                                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{job.service}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {job.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {job.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {job.location}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">{job.payment}</p>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline" className="text-xs">
                                  <Phone className="h-3 w-3 mr-1" />
                                  Call
                                </Button>
                                <Button size="sm" className="text-xs bg-purple-600 hover:bg-purple-700">
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Other tab content placeholders */}
          {activeTab !== "dashboard" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {navigationItems.find(item => item.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
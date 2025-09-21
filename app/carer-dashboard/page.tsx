"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UnifiedFooter } from "@/components/unified-footer"
import { useLanguage } from "@/app/contexts/LanguageContext"
import { useAuth } from "@/components/auth-provider"
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
  HelpCircle,
  ArrowRight,
  AlertCircle,
  Info,
  Search,
  Eye,
  EyeOff
} from "lucide-react"

export default function CarerDashboard() {
  const { language } = useLanguage()
  const { login } = useAuth() // Get login function from auth context
  const [activeTab, setActiveTab] = useState("dashboard")
  const [activeSection, setActiveSection] = useState("dashboard") // New state for active section
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [activeSessionTab, setActiveSessionTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [activeAccountTab, setActiveAccountTab] = useState("email-password")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("john.doe@example.com")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [activeClientTab, setActiveClientTab] = useState("active")
  
  // Mock job data for sessions
  const jobListings = [
    {
      id: 1,
      title: "Companionship Support",
      client: "Margaret Chen",
      location: "Richmond, BC",
      date: "Today",
      time: "2:00 PM - 5:00 PM",
      rate: "$35/hour",
      duration: "3 hours",
      description: "Looking for a friendly companion for afternoon activities and light conversation.",
      services: ["Companionship", "Social Support"],
      urgent: false,
      rating: 4.8
    },
    {
      id: 2,
      title: "Personal Care Assistant",
      client: "Robert Wilson",
      location: "Vancouver, BC",
      date: "Tomorrow",
      time: "9:00 AM - 12:00 PM",
      rate: "$42/hour",
      duration: "3 hours",
      description: "Assistance with morning routine, medication reminders, and light housekeeping.",
      services: ["Personal Care", "Medication Support"],
      urgent: true,
      rating: 4.9
    },
    {
      id: 3,
      title: "Transport & Errands",
      client: "Helen Zhang",
      location: "Burnaby, BC",
      date: "Sep 23",
      time: "10:00 AM - 2:00 PM",
      rate: "$38/hour",
      duration: "4 hours",
      description: "Shopping assistance and medical appointment transport.",
      services: ["Transport", "Shopping Support"],
      urgent: false,
      rating: 4.7
    },
    {
      id: 4,
      title: "Overnight Care Support",
      client: "David Kim",
      location: "Vancouver, BC",
      date: "Sep 24",
      time: "10:00 PM - 6:00 AM",
      rate: "$45/hour",
      duration: "8 hours",
      description: "Overnight monitoring and assistance for elderly client with mobility concerns.",
      services: ["Personal Care", "Night Care"],
      urgent: false,
      rating: 4.6
    }
  ]

  const lastMinuteJobs = jobListings.filter(job => job.urgent)
  
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = !selectedLocation || job.location.includes(selectedLocation)
    const matchesService = !selectedService || job.services.includes(selectedService)
    
    return matchesSearch && matchesLocation && matchesService
  })

  // Job Card Component
  const JobCard = ({ job }: { job: typeof jobListings[0] }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
              {job.urgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{job.client}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{job.rating}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.services.map((service, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{job.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{job.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 w-4" />
              <span>{job.rate}</span>
            </div>
          </div>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  // Reusable Sidebar Component
  const renderSidebar = () => (
    <aside className="bg-white border-r border-gray-200 w-64 flex-shrink-0">
      <div className="p-6">
        {/* Profile Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                {carerProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{carerProfile.name}</h3>
              <p className="text-sm text-gray-500">Care Provider</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                setSidebarOpen(false) // Close mobile sidebar when item is selected
              }}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button 
            onClick={() => {
              // Handle logout logic here
              console.log("Logout clicked")
            }}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
  
  // Set user as authenticated when accessing dashboard
  useEffect(() => {
    login() // This simulates being logged in when accessing the dashboard
  }, [login])
  
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
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "sessions", label: "Manage sessions", icon: Calendar },
    { id: "jobs", label: "Jobs", icon: ClipboardList },
    { id: "clients", label: "Manage clients", icon: Users },
    { id: "timesheet", label: "Support hours", icon: Clock },
    { id: "inbox", label: "Inbox", icon: Mail },
    { id: "billing", label: "Billing", icon: DollarSign },
    { id: "my-clients", label: "My clients", icon: Users },
    { id: "account", label: "Account", icon: Settings },
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content with no top padding to remove gap with header */}
      <div>
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            {/* Mobile close button */}
            <div className="lg:hidden flex items-center justify-end p-4 border-b">
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
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    activeSection === item.id 
                      ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveSection(item.id)
                    setSidebarOpen(false) // Close mobile sidebar when clicking
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
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
          
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
              onClick={() => setSidebarOpen(false)}
              style={{ top: '64px' }}
            />
          )}

          {/* Main content */}
          <div className="flex-1 lg:ml-0">
            {/* Mobile header for opening sidebar */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
              <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="font-semibold text-lg">
                {navigationItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h1>
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

            <main className="p-6">
              {/* Conditional content based on active section */}
              {activeSection === "dashboard" && (
                <>
                  {/* Header with Edit Profile button */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    </div>
                    <Link href="/profile-building">
                      <button className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50 border border-gray-200">
                        <Edit className="h-5 w-5" />
                        Edit Profile
                      </button>
                    </Link>
                  </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Welcome Message */}
                <div className="space-y-6">
                  {/* Hero Image and Welcome */}
                  <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 overflow-hidden">
                    <CardContent className="p-8">
                      <div className="relative">
                        {/* Background decorative image */}
                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="25" r="8" fill="currentColor" />
                            <circle cx="30" cy="45" r="6" fill="currentColor" />
                            <circle cx="70" cy="45" r="6" fill="currentColor" />
                            <circle cx="20" cy="70" r="4" fill="currentColor" />
                            <circle cx="50" cy="70" r="4" fill="currentColor" />
                            <circle cx="80" cy="70" r="4" fill="currentColor" />
                          </svg>
                        </div>
                        
                        <div className="relative z-10">
                          <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Welcome {carerProfile.name.split(' ')[0]}
                          </h2>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            Let's get you started to find jobs and build a network of clients as soon as possible.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Info */}
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-700">
                        First, we need to know a few things about you and go through some checks to approve your account with CareNeighbour.
                      </p>
                      
                      <Button 
                        onClick={() => setShowPhoneVerification(true)}
                        className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                      >
                        Set up your account
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Setup Requirements */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900 font-bold">
                        What you'll need to set up your account
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { icon: Phone, title: "Your mobile number" },
                        { icon: Shield, title: "NDIS Worker Screening Check" },
                        { icon: Briefcase, title: "Australian Business Number (ABN)" },
                        { icon: Users, title: "Two professional references" },
                        { icon: Heart, title: "COVID-19 vaccination as required by your state" },
                        { icon: User, title: "Working with Children Check, if working with children and teenagers under 18 years old" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded border border-green-300 flex items-center justify-center mt-0.5">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">{item.title}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* CareNeighbour Direct Panel */}
                  <Card className="mt-6 bg-orange-50 border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Bell className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">CareNeighbour Direct</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Supplies you need direct to your home.
                          </p>
                          <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Manage Sessions Panel */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900 font-bold">
                        Jobs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {/* Tab Navigation */}
                      <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6" aria-label="Jobs navigation">
                          <button
                            onClick={() => setActiveSessionTab("discover")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                              activeSessionTab === "discover"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            Discover
                          </button>
                          <button
                            onClick={() => setActiveSessionTab("search")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                              activeSessionTab === "search"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            Search
                          </button>
                          <button
                            onClick={() => setActiveSessionTab("lastMinute")}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                              activeSessionTab === "lastMinute"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            Last Minute
                          </button>
                        </nav>
                      </div>

                      {/* Tab Content */}
                      <div className="p-6">
                        {activeSessionTab === "discover" && (
                          <div className="text-center py-8">
                            <div className="max-w-md mx-auto">
                              <p className="text-gray-600 mb-4">
                                <button 
                                  onClick={() => setActiveSection("account")}
                                  className="text-purple-600 hover:text-purple-700 underline bg-transparent border-none cursor-pointer"
                                >
                                  Complete your account
                                </button>{" "}
                                and watch this space to discover new jobs once you get approved.
                              </p>
                              <p className="text-gray-600 mb-6">
                                In the meantime, feel free to{" "}
                                <button 
                                  onClick={() => {
                                    setActiveSection("sessions")
                                    setActiveSessionTab("search")
                                  }}
                                  className="text-purple-600 hover:text-purple-700 underline bg-transparent border-none cursor-pointer"
                                >
                                  search for jobs
                                </button>.
                              </p>
                              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <ClipboardList className="w-16 h-16 text-gray-400" />
                              </div>
                              <p className="text-sm text-gray-500">No jobs to discover yet</p>
                            </div>
                          </div>
                        )}

                        {activeSessionTab === "search" && (
                          <div className="space-y-4">
                            <div className="text-center py-8">
                              <div className="max-w-md mx-auto">
                                <p className="text-gray-600 mb-6">
                                  Search for available care jobs in your area.
                                </p>
                                <Button 
                                  onClick={() => {
                                    setActiveSection("sessions")
                                    setActiveSessionTab("search")
                                  }}
                                  className="bg-purple-600 hover:bg-purple-700"
                                >
                                  Start Job Search
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeSessionTab === "lastMinute" && (
                          <div className="text-center py-8">
                            <div className="max-w-md mx-auto">
                              <p className="text-gray-600 mb-4">
                                Find urgent care jobs that need immediate attention.
                              </p>
                              <div className="w-32 h-32 mx-auto bg-red-50 rounded-lg flex items-center justify-center mb-4">
                                <Clock className="w-16 h-16 text-red-400" />
                              </div>
                              <p className="text-sm text-gray-500">No urgent jobs available</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Phone Verification Dialog */}
              <Dialog open={showPhoneVerification} onOpenChange={setShowPhoneVerification}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Please verify your number</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      We've sent a verification code to <span className="font-bold">0423 987 654</span>. 
                      It's a requirement for everyone using the CareNeighbour platform, to protect your personal information.
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <strong>Please wait at least a minute for the code to arrive.</strong> If you refresh the page, 
                          your current code will be cancelled, and a new one will be sent.
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter 6-digit verification code <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="000000"
                        maxLength={6}
                      />
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        Not the right number? <a href="#" className="text-purple-600 hover:text-purple-700 underline">Change your number here.</a>
                      </p>
                      <p>
                        Don't have a mobile or need additional help? Contact us on{' '}
                        <a href="tel:+61132100234" className="text-purple-600 hover:text-purple-700 underline">1321 00 234</a> or email{' '}
                        <a href="mailto:support@careneighbour.com" className="text-purple-600 hover:text-purple-700 underline">support@careneighbour.com</a>
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowPhoneVerification(false)}
                      >
                        Back to dashboard
                      </Button>
                      <Button 
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={() => {
                          // Handle verification logic here
                          setShowPhoneVerification(false)
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
                </>
              )}

              {/* Jobs Section */}
              {activeSection === "jobs" && (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Care Jobs</h1>
                  
                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8" aria-label="Sessions navigation">
                      <button
                        onClick={() => setActiveSessionTab("discover")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeSessionTab === "discover"
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Discover
                      </button>
                      <button
                        onClick={() => setActiveSessionTab("search")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeSessionTab === "search"
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Search
                      </button>
                      <button
                        onClick={() => setActiveSessionTab("lastMinute")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeSessionTab === "lastMinute"
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Last Minute
                      </button>
                    </nav>
                  </div>

                  {/* Sessions Content */}
                  <div>
                    {activeSessionTab === "discover" && (
                      <div>
                        {/* Empty State for Discover */}
                        <Card className="mb-8">
                          <CardContent className="p-12">
                            <div className="text-center">
                              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                                <ClipboardList className="w-16 h-16 text-gray-400" />
                              </div>
                              <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Your Profile to Discover Jobs</h2>
                              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                Once your account is complete and approved, we'll show you personalized job recommendations 
                                that match your skills, location, and preferences.
                              </p>
                              <div className="space-y-3">
                                <Button 
                                  onClick={() => setActiveSection("account")}
                                  className="bg-purple-600 hover:bg-purple-700"
                                >
                                  Complete Your Profile
                                </Button>
                                <div>
                                  <Button 
                                    variant="outline"
                                    onClick={() => setActiveSessionTab("search")}
                                  >
                                    Browse All Jobs Instead
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardContent className="p-6">
                              <h3 className="font-semibold text-gray-900 mb-2">Personalized Matching</h3>
                              <p className="text-gray-600 text-sm">
                                Our algorithm matches you with clients based on your location, skills, 
                                availability, and care preferences.
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-6">
                              <h3 className="font-semibold text-gray-900 mb-2">Quality Opportunities</h3>
                              <p className="text-gray-600 text-sm">
                                All clients on our platform are verified, and we ensure fair rates 
                                for quality care services.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                    {activeSessionTab === "search" && (
                      <div>
                        {/* Search and Filters */}
                        <div className="mb-6 space-y-4">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                  placeholder="Search for jobs..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                              <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">All Locations</SelectItem>
                                <SelectItem value="Vancouver">Vancouver</SelectItem>
                                <SelectItem value="Richmond">Richmond</SelectItem>
                                <SelectItem value="Burnaby">Burnaby</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select value={selectedService} onValueChange={setSelectedService}>
                              <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Service Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">All Services</SelectItem>
                                <SelectItem value="Companionship">Companionship</SelectItem>
                                <SelectItem value="Personal Care">Personal Care</SelectItem>
                                <SelectItem value="Transport">Transport</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Results */}
                        <div className="space-y-4">
                          {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
                          ) : (
                            <Card>
                              <CardContent className="p-12">
                                <div className="text-center">
                                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                  </div>
                                  <h3 className="font-medium text-gray-900 mb-2">No jobs found</h3>
                                  <p className="text-gray-600 text-sm">Try adjusting your search criteria</p>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSessionTab === "lastMinute" && (
                      <div>
                        {lastMinuteJobs.length > 0 ? (
                          <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                              <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-red-600" />
                                <h3 className="font-semibold text-red-800">Urgent Jobs Available</h3>
                              </div>
                              <p className="text-red-700 text-sm mt-1">
                                These jobs need immediate attention and often offer premium rates.
                              </p>
                            </div>
                            {lastMinuteJobs.map((job) => <JobCard key={job.id} job={job} />)}
                          </div>
                        ) : (
                          <Card>
                            <CardContent className="p-12">
                              <div className="text-center">
                                <div className="w-32 h-32 mx-auto bg-red-50 rounded-lg flex items-center justify-center mb-6">
                                  <Clock className="w-16 h-16 text-red-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">No Urgent Jobs Right Now</h2>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                  Check back regularly as urgent jobs can appear at any time and usually offer higher rates.
                                </p>
                                <Button 
                                  variant="outline"
                                  onClick={() => setActiveSessionTab("search")}
                                >
                                  Browse All Available Jobs
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Other sections with empty right columns */}
              {activeSection === "jobs" && (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">My Jobs</h1>
                  <Card>
                    <CardContent className="p-12">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                          <Briefcase className="w-16 h-16 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Jobs</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Your job applications and active jobs will be displayed here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "my-clients" && (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">My Clients</h1>
                  <Card>
                    <CardContent className="p-12">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                          <Users className="w-16 h-16 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Clients</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Your client relationships and communication will be displayed here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "timesheet" && (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">Timesheet</h1>
                  <Card>
                    <CardContent className="p-12">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                          <Clock className="w-16 h-16 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Timesheet</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Track your work hours and submit timesheets here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "inbox" && (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">Inbox</h1>
                  <Card>
                    <CardContent className="p-12">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                          <MessageSquare className="w-16 h-16 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Inbox</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Your messages and notifications will be displayed here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "billing" && (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">Billing</h1>
                  <Card>
                    <CardContent className="p-12">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                          <DollarSign className="w-16 h-16 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Your invoices and payment information will be displayed here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === "account" && (
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                  
                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8" aria-label="Account settings navigation">
                      <button
                        onClick={() => setActiveAccountTab("email-password")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeAccountTab === "email-password"
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Username & Password
                      </button>
                      <button
                        onClick={() => setActiveAccountTab("address")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeAccountTab === "address"
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Address
                      </button>
                      <button
                        onClick={() => setActiveAccountTab("phone-notifications")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeAccountTab === "phone-notifications"
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Phone & SMS Notifications
                      </button>
                      <button
                        onClick={() => setActiveAccountTab("emergency-contacts")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeAccountTab === "emergency-contacts"
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Emergency Contacts
                      </button>
                      <button
                        onClick={() => setActiveAccountTab("email-alerts")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeAccountTab === "email-alerts"
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Email Alerts
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-6">
                    {activeAccountTab === "email-password" && (
                      <Card>
                        <CardContent className="p-6">
                          <form className="space-y-6">
                            {/* Email Field */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                              </label>
                              <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                                required
                              />
                            </div>

                            {/* Password Field */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                              </label>
                              <p className="text-sm text-gray-600 mb-2">
                                Leave blank if you'd like to keep your password.
                              </p>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="w-full pr-12"
                                  autoComplete="new-password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                              
                              {/* Password Strength Indicator */}
                              {password && (
                                <div className="mt-2">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Strength:</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full transition-all duration-300 ${
                                          password.length < 8 ? 'bg-red-400 w-1/3' :
                                          password.length < 12 ? 'bg-yellow-400 w-2/3' :
                                          'bg-green-400 w-full'
                                        }`}
                                      />
                                    </div>
                                  </div>
                                  {password.length < 8 && (
                                    <div className="flex items-center space-x-2 mt-2 text-amber-600">
                                      <AlertCircle className="w-4 h-4" />
                                      <span className="text-sm">Use 8 characters or more for your password.</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                              </label>
                              <p className="text-sm text-gray-600 mb-2">
                                Leave blank if you'd like to keep your password.
                              </p>
                              <div className="relative">
                                <Input
                                  type={showConfirmPassword ? "text" : "password"}
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  className="w-full pr-12"
                                  autoComplete="new-password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <Button className="bg-purple-600 hover:bg-purple-700">
                              Save
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    )}

                    {activeAccountTab === "address" && (
                      <Card>
                        <CardContent className="p-6">
                          <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Street Address <span className="text-red-500">*</span>
                                </label>
                                <Input placeholder="123 Main Street" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Apartment/Unit
                                </label>
                                <Input placeholder="Apt 4B" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  City <span className="text-red-500">*</span>
                                </label>
                                <Input placeholder="Vancouver" />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Province <span className="text-red-500">*</span>
                                </label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select province" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="BC">British Columbia</SelectItem>
                                    <SelectItem value="AB">Alberta</SelectItem>
                                    <SelectItem value="ON">Ontario</SelectItem>
                                    <SelectItem value="QC">Quebec</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Postal Code <span className="text-red-500">*</span>
                                </label>
                                <Input placeholder="V6B 1A1" />
                              </div>
                            </div>
                            <Button className="bg-purple-600 hover:bg-purple-700">
                              Save Address
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    )}

                    {activeAccountTab === "phone-notifications" && (
                      <Card>
                        <CardContent className="p-6">
                          <form className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                              </label>
                              <Input placeholder="+1 (604) 123-4567" />
                            </div>
                            
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
                              <div className="space-y-3">
                                <label className="flex items-center space-x-3">
                                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                  <span className="text-sm text-gray-700">New job opportunities</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                  <span className="text-sm text-gray-700">Appointment reminders</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span className="text-sm text-gray-700">Payment notifications</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                  <span className="text-sm text-gray-700">Emergency alerts</span>
                                </label>
                              </div>
                            </div>
                            
                            <Button className="bg-purple-600 hover:bg-purple-700">
                              Save Preferences
                            </Button>
                          </form>
                        </CardContent>
                      </Card>
                    )}

                    {activeAccountTab === "emergency-contacts" && (
                      <Card>
                        <CardContent className="p-6">
                          <div className="space-y-6">
                            <p className="text-gray-600">
                              Add emergency contacts who can be reached in case of an emergency during your care sessions.
                            </p>
                            
                            <div className="space-y-4">
                              <div className="border border-gray-200 rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input placeholder="Emergency contact name" />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Relationship
                                    </label>
                                    <Input placeholder="Spouse, Parent, etc." />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Phone <span className="text-red-500">*</span>
                                    </label>
                                    <Input placeholder="+1 (604) 123-4567" />
                                  </div>
                                </div>
                              </div>
                              
                              <Button variant="outline" className="w-full">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Another Contact
                              </Button>
                            </div>
                            
                            <Button className="bg-purple-600 hover:bg-purple-700">
                              Save Contacts
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {activeAccountTab === "email-alerts" && (
                      <Card>
                        <CardContent className="p-6">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                              <div className="space-y-4">
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700">Job opportunity matches</span>
                                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700">Weekly job summary</span>
                                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700">New messages from clients</span>
                                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700">Booking confirmations</span>
                                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700">Payment confirmations</span>
                                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700">CareNeighbour updates</span>
                                  <input type="checkbox" className="rounded border-gray-300" />
                                </label>
                                <label className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700">Marketing emails</span>
                                  <input type="checkbox" className="rounded border-gray-300" />
                                </label>
                              </div>
                            </div>
                            
                            <Button className="bg-purple-600 hover:bg-purple-700">
                              Save Preferences
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Delete Account Section */}
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Delete Account</h2>
                      <p className="text-gray-700 mb-4">
                        Permanently delete your account and all personal information from CareNeighbour. 
                        Please ensure there are no outstanding care sessions or payments.
                      </p>
                      <p className="text-gray-700 mb-6">
                        Alternatively, you can mark yourself as unavailable so you aren't visible in any search results. 
                        To do this, go to your profile settings and uncheck 'Show my profile in search results'.
                      </p>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-blue-900 mb-2">Save your documents</h3>
                        <p className="text-blue-800 text-sm">
                          You can export your care session history, invoices and income statements from the{" "}
                          <button 
                            onClick={() => setActiveSection("billing")}
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            Billing page
                          </button>.
                        </p>
                      </div>
                      
                      <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                        Delete Account
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        We'll ask you to confirm this before your account is permanently deleted.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
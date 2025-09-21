"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Search,
  Star,
  Heart,
  User,
  ChevronRight,
  ClipboardList
} from "lucide-react"

export default function SessionsPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedService, setSelectedService] = useState("")

  // Set active tab from URL parameter
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && ['discover', 'search', 'lastMinute'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Mock job data
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
              <DollarSign className="w-4 h-4" />
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

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobs Overview</h1>
        <p className="text-gray-600">Quick access to all job search features</p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/sessions/discover">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-purple-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Discover</h3>
              <p className="text-sm text-gray-600">Personalized job recommendations</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sessions/search">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Search</h3>
              <p className="text-sm text-gray-600">Browse all available jobs</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sessions/last-minute">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Last Minute</h3>
              <p className="text-sm text-gray-600">Urgent jobs with premium rates</p>
              {lastMinuteJobs.length > 0 && (
                <Badge variant="destructive" className="mt-2 text-xs">
                  {lastMinuteJobs.length} urgent
                </Badge>
              )}
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-600 text-sm">Start applying for jobs to see your activity here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Preview of Latest Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Latest Opportunities</h2>
          <Link href="/sessions/search">
            <Button variant="outline" size="sm">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {jobListings.slice(0, 2).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Heart,
  User
} from "lucide-react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedService, setSelectedService] = useState("")

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Jobs</h1>
        <p className="text-gray-600">Find care opportunities that match your skills and schedule</p>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="Vancouver">Vancouver, BC</SelectItem>
                <SelectItem value="Richmond">Richmond, BC</SelectItem>
                <SelectItem value="Burnaby">Burnaby, BC</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Services</SelectItem>
                <SelectItem value="Companionship">Companionship</SelectItem>
                <SelectItem value="Personal Care">Personal Care</SelectItem>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Medication Support">Medication Support</SelectItem>
                <SelectItem value="Night Care">Night Care</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          {(searchQuery || selectedLocation || selectedService) && (
            <span>
              {" "}matching your criteria
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => {
                  setSearchQuery("")
                  setSelectedLocation("")
                  setSelectedService("")
                }}
                className="p-0 h-auto ml-2 text-purple-600"
              >
                Clear filters
              </Button>
            </span>
          )}
        </p>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or check back later for new opportunities.</p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedLocation("")
                setSelectedService("")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
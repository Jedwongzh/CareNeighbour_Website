"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Heart,
  User,
  AlertTriangle
} from "lucide-react"

export default function LastMinutePage() {
  // Mock urgent job data
  const urgentJobs = [
    {
      id: 1,
      title: "Urgent Personal Care Assistant",
      client: "Robert Wilson",
      location: "Vancouver, BC",
      date: "Today",
      time: "9:00 AM - 12:00 PM",
      rate: "$50/hour", // Premium rate for urgent
      duration: "3 hours",
      description: "Immediate assistance needed with morning routine, medication reminders, and light housekeeping. Previous carer unavailable due to illness.",
      services: ["Personal Care", "Medication Support"],
      urgent: true,
      rating: 4.9,
      postedTime: "2 hours ago",
      premiumRate: true
    },
    {
      id: 2,
      title: "Emergency Companionship",
      client: "Eleanor Thompson",
      location: "Richmond, BC",
      date: "Today",
      time: "6:00 PM - 10:00 PM",
      rate: "$45/hour",
      duration: "4 hours",
      description: "Family emergency - need someone to stay with elderly mother this evening. She enjoys reading and light conversation.",
      services: ["Companionship", "Social Support"],
      urgent: true,
      rating: 4.7,
      postedTime: "1 hour ago",
      premiumRate: true
    }
  ]

  const JobCard = ({ job }: { job: typeof urgentJobs[0] }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-red-500 bg-red-50/30">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Urgent
              </Badge>
              {job.premiumRate && (
                <Badge className="text-xs bg-green-100 text-green-800">
                  Premium Rate
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
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-red-500" />
                <span className="text-red-600 font-medium">{job.postedTime}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-gray-700 mb-4">{job.description}</p>

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
              <span className="font-medium text-red-600">{job.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{job.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold text-green-600">{job.rate}</span>
            </div>
          </div>
          <Button size="sm" className="bg-red-600 hover:bg-red-700">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Last Minute Jobs</h1>
        <p className="text-gray-600">Urgent care opportunities with premium rates</p>
      </div>

      {/* Info Banner */}
      <Card className="mb-8 bg-orange-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Last Minute Opportunities</h3>
              <p className="text-sm text-gray-700 mb-3">
                These positions require immediate attention and often offer premium rates. 
                Applications are reviewed quickly, and you may be contacted within the hour.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Quick response required</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>Premium rates available</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {urgentJobs.length} urgent job{urgentJobs.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Urgent Job Listings */}
      <div className="space-y-4 mb-8">
        {urgentJobs.length > 0 ? (
          urgentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto bg-red-50 rounded-lg flex items-center justify-center mb-6">
              <Clock className="w-16 h-16 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No urgent jobs available</h3>
            <p className="text-gray-600 mb-4">
              All urgent positions have been filled. Check back soon for new last-minute opportunities.
            </p>
            <div className="space-y-3">
              <Link href="/sessions/search">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Browse Regular Jobs
                </Button>
              </Link>
              <div>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Tips for Last Minute Jobs</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Keep your profile updated and phone on for quick notifications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Be flexible with your schedule for these premium opportunities
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Respond quickly - these positions fill fast
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Have your documents ready for immediate verification
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
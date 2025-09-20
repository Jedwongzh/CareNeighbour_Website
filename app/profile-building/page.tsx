"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  Eye, 
  Circle, 
  CheckCircle2, 
  ChevronUp, 
  ChevronDown 
} from "lucide-react"

// Profile building sections data
const jobDetailsItems = [
  { id: "availability", label: "Preferred Hours", completed: true, current: true },
  { id: "rates", label: "Indicative Rates", completed: false },
  { id: "locations", label: "Locations", completed: true },
  { id: "experience", label: "Experience", completed: false },
]

const additionalDetailsItems = [
  { id: "bank-account", label: "Bank Account", completed: false },
  { id: "work-history", label: "Work History", completed: false },
  { id: "education-training", label: "Education & Training", completed: false },
  { id: "ndis-worker-screening", label: "NDIS Worker Screening", completed: false },
  { id: "badges", label: "Badges", completed: false },
  { id: "immunisation", label: "Immunisation", completed: false },
  { id: "languages", label: "Languages", completed: false },
  { id: "cultural-background", label: "Cultural Background", completed: false },
  { id: "religion", label: "Religion", completed: false },
  { id: "interests-hobbies", label: "Interests & Hobbies", completed: false },
  { id: "about-me", label: "About Me", completed: false },
  { id: "my-preferences", label: "My Preferences", completed: false },
]

const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

export default function ProfileBuilding() {
  const router = useRouter()
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [showAllTimeSlots, setShowAllTimeSlots] = useState(false)
  const [desiredHours, setDesiredHours] = useState(0)
  const [tellMeAboutJobs, setTellMeAboutJobs] = useState(true)
  const [showProfileInSearch, setShowProfileInSearch] = useState(true)
  const [availableLastMinute, setAvailableLastMinute] = useState(false)

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  const adjustHours = (increment: boolean) => {
    setDesiredHours(prev => {
      const newValue = increment ? prev + 1 : prev - 1
      return Math.max(0, newValue)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/carer-dashboard" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">My profile</h1>
            </div>
            
            <Link href="/profile-building">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Preview profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Details Section */}
            <Card className="glassmorphism">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {jobDetailsItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.id === "availability" ? "/profile-building" : `/profile-building/${item.id}`}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      item.current 
                        ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Additional Details Section */}
            <Card className="glassmorphism">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {additionalDetailsItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/profile-building/${item.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-gray-50 text-gray-700"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card className="glassmorphism">
              <CardContent className="p-6 space-y-8">
                {/* Preferred Hours Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Preferred hours</h2>
                  
                  {/* Working Hours Description */}
                  <div className="mb-6">
                    <p className="text-gray-700 font-medium mb-2">
                      Help us find you the best matched jobs.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Select one or more time slots for your preferred hours. Sessions can span across 
                      multiple time slots without needing to fill each slot entirely.
                    </p>
                  </div>

                  {/* Days Selection */}
                  <div className="space-y-4 mb-6">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="flex items-center space-x-3">
                        <Checkbox
                          id={day.toLowerCase()}
                          checked={selectedDays.includes(day)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleDayToggle(day)
                            } else {
                              handleDayToggle(day)
                            }
                          }}
                        />
                        <label 
                          htmlFor={day.toLowerCase()} 
                          className="text-sm font-medium text-gray-900 capitalize cursor-pointer"
                        >
                          {day.toLowerCase()}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Show All Time Slots Toggle */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Show all time slots</h4>
                      <Switch
                        checked={showAllTimeSlots}
                        onCheckedChange={(checked) => setShowAllTimeSlots(checked)}
                      />
                    </div>
                  </div>

                  {/* Feedback Banner */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          Share your thoughts on the new preferred hours format.
                        </h3>
                      </div>
                      <Button variant="outline" size="sm">
                        Give feedback
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Total Support Hours Section */}
                <div className="border-t pt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Total support hours per week on Mable
                  </h3>
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    What's the total number of support hours per week you'd like the Mable platform to help you achieve?
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-600 text-sm">
                      Enter the hours of work you already have with Mable plus any additional support hours you'd like us to help you find.
                    </p>
                    <p className="text-gray-600 text-sm">
                      This will help us to send you job requests that better fit your support hours goals.
                    </p>
                  </div>

                  {/* Hours Input */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="relative">
                      <Input
                        type="number"
                        value={desiredHours}
                        onChange={(e) => setDesiredHours(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-24 pr-8"
                        min="0"
                      />
                      <div className="absolute right-1 top-1 flex flex-col">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-6 p-0"
                          onClick={() => adjustHours(true)}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-6 p-0"
                          onClick={() => adjustHours(false)}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">hours per week</span>
                  </div>
                </div>

                {/* Settings Toggles */}
                <div className="border-t pt-8 space-y-6">
                  {/* Tell me about jobs toggle */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">Tell me about jobs</h3>
                        <p className="text-sm text-gray-600">
                          This setting is turned on. We'll help you find jobs by sending you recommendations and alerts.
                        </p>
                      </div>
                      <Switch
                        checked={tellMeAboutJobs}
                        onCheckedChange={(checked) => setTellMeAboutJobs(checked)}
                      />
                    </div>
                  </div>

                  {/* Show profile in search toggle */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">Show my profile in search results</h3>
                        <div className="text-sm text-gray-600">
                          <p className="mb-2">
                            This setting is turned on. Your profile will appear in search results. People seeking support 
                            can find your profile and message you with job requests.
                          </p>
                          <p className="font-medium">
                            To help clients avoid disappointment, only enable this setting if you're actively seeking work.
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={showProfileInSearch}
                        onCheckedChange={(checked) => setShowProfileInSearch(checked)}
                      />
                    </div>
                  </div>

                  {/* Last minute jobs toggle */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">Available for Last Minute Jobs</h3>
                        <div className="text-sm text-gray-600">
                          <p className="mb-2">Access jobs only available for the next 4 to 48 hours.</p>
                          <Button variant="link" size="sm" className="p-0 h-auto text-purple-600">
                            What are Last Minute Jobs?
                          </Button>
                        </div>
                      </div>
                      <Switch
                        checked={availableLastMinute}
                        onCheckedChange={(checked) => setAvailableLastMinute(checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="border-t pt-8">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-medium"
                    onClick={() => router.push('/carer-dashboard')}
                  >
                    Save and continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ChevronLeft, 
  Eye, 
  Circle, 
  CheckCircle2,
  DollarSign,
  Calculator
} from "lucide-react"

// Profile building sections data
const jobDetailsItems = [
  { id: "availability", label: "Preferred Hours", completed: true, current: false },
  { id: "rates", label: "Indicative Rates", completed: false, current: true },
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

export default function IndicativeRates() {
  const router = useRouter()
  const [enableWeekday, setEnableWeekday] = useState(false)
  const [enableSaturday, setEnableSaturday] = useState(false)
  const [enableSunday, setEnableSunday] = useState(false)
  const [enableOvernight, setEnableOvernight] = useState(false)
  const [weekdayRate, setWeekdayRate] = useState("")
  const [saturdayRate, setSaturdayRate] = useState("")
  const [sundayRate, setSundayRate] = useState("")
  const [overnightRate, setOvernightRate] = useState("")
  const [freeMeetGreet, setFreeMeetGreet] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/profile-building" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">My profile</h1>
            </div>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview profile</span>
            </Button>
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
                    href={`/profile-building/${item.id}`}
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
                {/* Indicative Rates Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Indicative rates</h2>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6">
                    Indicative rates display on your profile as a guide for potential clients. The actual rates you agree on 
                    and include in a service agreement may differ slightly, based on a client's individual service requirements.
                  </p>

                  {/* Rate Calculator Banner */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Not sure how much to charge?</h3>
                        <p className="text-sm text-gray-600">
                          Check out <strong>CareNeighbour's rate calculator</strong> for insights into the range of rates charged by 
                          the majority of support workers via CareNeighbour in the last 6 months, filtered by state, service type and day of the week.
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2 shrink-0">
                        <Calculator className="h-4 w-4" />
                        Rate calculator
                      </Button>
                    </div>
                  </div>

                  {/* Add Your Rates Section */}
                  <div className="mb-6">
                    <p className="font-semibold text-gray-900 mb-2">Add your indicative rates</p>
                    <p className="text-sm text-gray-600">
                      Take into consideration your experience, qualifications, skills and service types. For NDIS-funded clients, 
                      hourly rates (including their CareNeighbour platform fee of 7.95%) must not exceed NDIS price limits.
                    </p>
                  </div>

                  {/* Rate Input Sections */}
                  <div className="space-y-6">
                    {/* Weekday Rate */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Checkbox
                          id="weekday"
                          checked={enableWeekday}
                          onCheckedChange={(checked) => setEnableWeekday(checked as boolean)}
                        />
                        <Label htmlFor="weekday" className="font-medium text-gray-900">Weekday</Label>
                      </div>
                      
                      {enableWeekday && (
                        <div>
                          <Label className="text-sm text-gray-600 mb-2 block">Add an indicative hourly rate</Label>
                          <div className="relative max-w-xs">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="text"
                              value={weekdayRate}
                              onChange={(e) => setWeekdayRate(e.target.value)}
                              className="pl-10"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Saturday Rate */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Checkbox
                          id="saturday"
                          checked={enableSaturday}
                          onCheckedChange={(checked) => setEnableSaturday(checked as boolean)}
                        />
                        <Label htmlFor="saturday" className="font-medium text-gray-900">Saturday</Label>
                      </div>
                      
                      {enableSaturday && (
                        <div>
                          <Label className="text-sm text-gray-600 mb-2 block">Add an indicative hourly rate</Label>
                          <div className="relative max-w-xs">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="text"
                              value={saturdayRate}
                              onChange={(e) => setSaturdayRate(e.target.value)}
                              className="pl-10"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sunday Rate */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Checkbox
                          id="sunday"
                          checked={enableSunday}
                          onCheckedChange={(checked) => setEnableSunday(checked as boolean)}
                        />
                        <Label htmlFor="sunday" className="font-medium text-gray-900">Sunday</Label>
                      </div>
                      
                      {enableSunday && (
                        <div>
                          <Label className="text-sm text-gray-600 mb-2 block">Add an indicative hourly rate</Label>
                          <div className="relative max-w-xs">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="text"
                              value={sundayRate}
                              onChange={(e) => setSundayRate(e.target.value)}
                              className="pl-10"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Overnight Rate */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Checkbox
                          id="overnight"
                          checked={enableOvernight}
                          onCheckedChange={(checked) => setEnableOvernight(checked as boolean)}
                        />
                        <Label htmlFor="overnight" className="font-medium text-gray-900">Overnight rates</Label>
                      </div>
                      
                      {enableOvernight && (
                        <div>
                          <Label className="text-sm text-gray-600 mb-2 block">Add an indicative flat rate</Label>
                          <div className="relative max-w-xs mb-4">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="text"
                              value={overnightRate}
                              onChange={(e) => setOvernightRate(e.target.value)}
                              className="pl-10"
                              placeholder="0.00"
                            />
                          </div>
                          <p className="text-sm text-gray-600">
                            <strong>Note:</strong> A flat rate for 24-hour support can be a combination of active support, 
                            passive support and sleep, outlined in an agreement with a client.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Meet and Greet Section */}
                <div className="border-t pt-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Checkbox
                      id="meet-greet"
                      checked={freeMeetGreet}
                      onCheckedChange={(checked) => setFreeMeetGreet(checked as boolean)}
                    />
                    <Label htmlFor="meet-greet" className="font-medium text-gray-900">
                      I offer a <strong>free meet and greet</strong>.
                    </Label>
                  </div>
                </div>

                {/* Save Button */}
                <div className="border-t pt-8">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-medium"
                    onClick={() => router.push('/profile-building')}
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
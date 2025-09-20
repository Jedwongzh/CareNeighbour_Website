"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { 
  ChevronLeft, 
  Eye, 
  Circle, 
  CheckCircle2
} from "lucide-react"

// Profile building sections data
const jobDetailsItems = [
  { id: "availability", label: "Preferred Hours", completed: true, current: false },
  { id: "rates", label: "Indicative Rates", completed: false },
  { id: "locations", label: "Locations", completed: true },
  { id: "experience", label: "Experience", completed: false },
]

const additionalDetailsItems = [
  { id: "bank-account", label: "Bank Account", completed: false },
  { id: "work-history", label: "Work History", completed: false },
  { id: "education-training", label: "Education & Training", completed: false },
  { id: "ndis-worker-screening", label: "NDIS Worker Screening", completed: false, current: true },
  { id: "badges", label: "Badges", completed: false },
  { id: "immunisation", label: "Immunisation", completed: false },
  { id: "languages", label: "Languages", completed: false },
  { id: "cultural-background", label: "Cultural Background", completed: false },
  { id: "religion", label: "Religion", completed: false },
  { id: "interests-hobbies", label: "Interests & Hobbies", completed: false },
  { id: "about-me", label: "About Me", completed: false },
  { id: "my-preferences", label: "My Preferences", completed: false },
]

export default function NDISWorkerScreening() {
  const router = useRouter()
  const [screeningStatus, setScreeningStatus] = useState("")

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
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card className="glassmorphism">
              <CardContent className="p-6 space-y-8">
                {/* NDIS Worker Screening Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">NDIS Worker Screening</h2>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-600 text-sm mb-4">
                      The NDIS Worker Screening Check is a background check for people working with NDIS participants.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Please indicate your NDIS Worker Screening status. <span className="text-red-500">*</span>
                    </p>
                  </div>

                  {/* Radio Group */}
                  <RadioGroup value={screeningStatus} onValueChange={setScreeningStatus} className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="approved" id="approved" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="approved" className="text-sm font-medium text-gray-900 cursor-pointer">
                          I have an approved NDIS Worker Screening clearance
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="applied" id="applied" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="applied" className="text-sm font-medium text-gray-900 cursor-pointer">
                          I have applied for NDIS Worker Screening and am waiting for my clearance
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="not-applied" id="not-applied" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="not-applied" className="text-sm font-medium text-gray-900 cursor-pointer">
                          I have not yet applied for NDIS Worker Screening
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="exemption" id="exemption" className="mt-0.5" />
                      <div className="flex-1">
                        <Label htmlFor="exemption" className="text-sm font-medium text-gray-900 cursor-pointer">
                          I have an exemption from NDIS Worker Screening Check requirements
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Additional Information */}
                  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Need to apply for NDIS Worker Screening?</strong>
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Visit the NDIS Quality and Safeguards Commission website for more information and to apply.
                    </p>
                  </div>
                </div>

                {/* Save Button */}
                <div className="border-t pt-8">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-medium"
                    onClick={() => router.push('/profile-building')}
                    disabled={!screeningStatus}
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
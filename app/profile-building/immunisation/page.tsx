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
  CheckCircle2,
  Shield
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
  { id: "ndis-worker-screening", label: "NDIS Worker Screening", completed: false },
  { id: "badges", label: "Badges", completed: false },
  { id: "immunisation", label: "Immunisation", completed: false, current: true },
  { id: "languages", label: "Languages", completed: false },
  { id: "cultural-background", label: "Cultural Background", completed: false },
  { id: "religion", label: "Religion", completed: false },
  { id: "interests-hobbies", label: "Interests & Hobbies", completed: false },
  { id: "about-me", label: "About Me", completed: false },
  { id: "my-preferences", label: "My Preferences", completed: false },
]

export default function Immunisation() {
  const router = useRouter()
  const [covidVaccination, setCovidVaccination] = useState("")
  const [fluVaccination, setFluVaccination] = useState("")

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
                {/* Immunisation Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Immunisation</h2>
                  
                  {/* Description */}
                  <div className="mb-8">
                    <p className="text-gray-600 text-sm mb-4">
                      Your vaccination status helps participants make informed decisions about their care. 
                      Being vaccinated protects both you and the people you support.
                    </p>
                    <div className="flex items-start space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-800">
                        <strong>Privacy note:</strong> Your vaccination information is only shared with potential 
                        participants when relevant to their specific health and safety requirements.
                      </p>
                    </div>
                  </div>

                  {/* COVID-19 Vaccination */}
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">COVID-19 vaccination</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Are you fully vaccinated against COVID-19? <span className="text-red-500">*</span>
                      </p>
                      
                      <RadioGroup value={covidVaccination} onValueChange={setCovidVaccination} className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="fully-vaccinated" id="covid-fully-vaccinated" />
                          <Label htmlFor="covid-fully-vaccinated" className="text-sm font-medium text-gray-900 cursor-pointer">
                            Yes, I am fully vaccinated against COVID-19
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="partially-vaccinated" id="covid-partially-vaccinated" />
                          <Label htmlFor="covid-partially-vaccinated" className="text-sm font-medium text-gray-900 cursor-pointer">
                            I am partially vaccinated against COVID-19
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="not-vaccinated" id="covid-not-vaccinated" />
                          <Label htmlFor="covid-not-vaccinated" className="text-sm font-medium text-gray-900 cursor-pointer">
                            No, I am not vaccinated against COVID-19
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="prefer-not-to-say" id="covid-prefer-not-to-say" />
                          <Label htmlFor="covid-prefer-not-to-say" className="text-sm font-medium text-gray-900 cursor-pointer">
                            I prefer not to say
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Flu Vaccination */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Flu vaccination</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Have you received a flu vaccination in the last 12 months? <span className="text-red-500">*</span>
                      </p>
                      
                      <RadioGroup value={fluVaccination} onValueChange={setFluVaccination} className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="vaccinated-current" id="flu-vaccinated-current" />
                          <Label htmlFor="flu-vaccinated-current" className="text-sm font-medium text-gray-900 cursor-pointer">
                            Yes, I have received a flu vaccination in the last 12 months
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="not-vaccinated-current" id="flu-not-vaccinated-current" />
                          <Label htmlFor="flu-not-vaccinated-current" className="text-sm font-medium text-gray-900 cursor-pointer">
                            No, I have not received a flu vaccination in the last 12 months
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="prefer-not-to-say-flu" id="flu-prefer-not-to-say" />
                          <Label htmlFor="flu-prefer-not-to-say" className="text-sm font-medium text-gray-900 cursor-pointer">
                            I prefer not to say
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Information Note */}
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Need vaccination information?</strong>
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Visit the Australian Government Department of Health website for current vaccination guidelines and 
                      locations to receive vaccines.
                    </p>
                  </div>
                </div>

                {/* Save Button */}
                <div className="border-t pt-8">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-medium"
                    onClick={() => router.push('/profile-building')}
                    disabled={!covidVaccination || !fluVaccination}
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
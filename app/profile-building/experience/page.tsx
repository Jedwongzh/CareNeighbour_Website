"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  { id: "experience", label: "Experience", completed: false, current: true },
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

const experienceAreas = [
  { id: "aged-care", label: "Aged care" },
  { id: "chronic-medical", label: "Chronic medical conditions" },
  { id: "disability", label: "Disability" },
  { id: "mental-health", label: "Mental health" },
]

export default function Experience() {
  const router = useRouter()
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [experienceDetails, setExperienceDetails] = useState<Record<string, string>>({})

  const handleAreaToggle = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    )
  }

  const handleDetailChange = (areaId: string, value: string) => {
    setExperienceDetails(prev => ({
      ...prev,
      [areaId]: value
    }))
  }

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
                {/* Experience Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                  
                  {/* Experience Areas Selection */}
                  <div className="mb-8">
                    <fieldset className="border border-gray-200 rounded-lg p-6">
                      <legend className="text-base font-medium text-gray-900 px-2">
                        Select all areas that you've worked or have professional or personal experience in.
                      </legend>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {experienceAreas.map((area) => (
                          <div key={area.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={area.id}
                              checked={selectedAreas.includes(area.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleAreaToggle(area.id)
                                } else {
                                  handleAreaToggle(area.id)
                                }
                              }}
                            />
                            <Label 
                              htmlFor={area.id} 
                              className="text-sm font-medium text-gray-900 cursor-pointer"
                            >
                              {area.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  {/* Experience Details */}
                  {selectedAreas.length > 0 && (
                    <div className="space-y-6">
                      <p className="text-gray-600">
                        Provide more details and describe your experience and knowledge under each area.
                      </p>
                      
                      {selectedAreas.map((areaId) => {
                        const area = experienceAreas.find(a => a.id === areaId)
                        if (!area) return null
                        
                        return (
                          <div key={areaId} className="border border-gray-200 rounded-lg p-4">
                            <Label 
                              htmlFor={`${areaId}-details`}
                              className="text-base font-medium text-gray-900 mb-3 block"
                            >
                              {area.label} experience
                            </Label>
                            <Textarea
                              id={`${areaId}-details`}
                              value={experienceDetails[areaId] || ""}
                              onChange={(e) => handleDetailChange(areaId, e.target.value)}
                              placeholder={`Describe your experience in ${area.label.toLowerCase()}...`}
                              className="min-h-[100px] resize-none"
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {selectedAreas.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select your experience areas</h3>
                      <p className="text-sm">Choose the areas where you have professional or personal experience to get started</p>
                    </div>
                  )}
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
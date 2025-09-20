"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  Eye, 
  Circle, 
  CheckCircle2,
  MapPin,
  X
} from "lucide-react"

// Profile building sections data
const jobDetailsItems = [
  { id: "availability", label: "Preferred Hours", completed: true, current: false },
  { id: "rates", label: "Indicative Rates", completed: false },
  { id: "locations", label: "Locations", completed: true, current: true },
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

export default function Locations() {
  const router = useRouter()
  const [locationInput, setLocationInput] = useState("")
  const [selectedLocations, setSelectedLocations] = useState([
    "Melbourne VIC 3000"
  ])

  const addLocation = () => {
    if (locationInput.trim() && !selectedLocations.includes(locationInput.trim())) {
      setSelectedLocations([...selectedLocations, locationInput.trim()])
      setLocationInput("")
    }
  }

  const removeLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter(loc => loc !== location))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addLocation()
    }
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
                {/* Locations Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Locations</h2>
                  
                  {/* Location Input Section */}
                  <div className="space-y-4 mb-8">
                    <div>
                      <Label htmlFor="location-input" className="text-base font-medium text-gray-900">
                        Suburb or postcode
                      </Label>
                      <p className="text-sm text-gray-600 mt-1 mb-3">
                        Add as many suburbs or postcodes you are willing to travel to for work. We recommend at least 3
                      </p>
                      
                      <div className="flex gap-3">
                        <div className="flex-1 max-w-md">
                          <Input
                            id="location-input"
                            type="search"
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter suburb or postcode"
                            className="w-full"
                          />
                        </div>
                        <Button 
                          onClick={addLocation}
                          variant="outline"
                          className="shrink-0"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Selected Locations */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Selected locations</h3>
                    
                    {selectedLocations.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedLocations.map((location, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{location}</span>
                            <button
                              onClick={() => removeLocation(location)}
                              className="hover:text-red-600 transition-colors"
                              aria-label={`Remove ${location}`}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No locations added yet</p>
                        <p className="text-sm">Add suburbs or postcodes where you're willing to work</p>
                      </div>
                    )}
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
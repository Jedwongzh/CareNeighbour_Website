"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { 
  ChevronLeft, 
  Eye, 
  Circle, 
  CheckCircle2,
  Heart
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
  { id: "badges", label: "Badges", completed: false, current: true },
  { id: "immunisation", label: "Immunisation", completed: false },
  { id: "languages", label: "Languages", completed: false },
  { id: "cultural-background", label: "Cultural Background", completed: false },
  { id: "religion", label: "Religion", completed: false },
  { id: "interests-hobbies", label: "Interests & Hobbies", completed: false },
  { id: "about-me", label: "About Me", completed: false },
  { id: "my-preferences", label: "My Preferences", completed: false },
]

export default function Badges() {
  const router = useRouter()
  const [lgbtqiaBadge, setLgbtqiaBadge] = useState(false)

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
                {/* Badges Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Badges</h2>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-8">
                    Badges help members of your community find you as a support worker who understands their experiences and values.
                  </p>

                  {/* LGBTQIA+ Community Badge */}
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        {/* Badge Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 flex items-center justify-center">
                            <Heart className="h-6 w-6 text-white" />
                          </div>
                        </div>

                        {/* Badge Content */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Checkbox
                              id="lgbtqia-badge"
                              checked={lgbtqiaBadge}
                              onCheckedChange={(checked) => setLgbtqiaBadge(checked as boolean)}
                            />
                            <Label htmlFor="lgbtqia-badge" className="text-lg font-semibold text-gray-900 cursor-pointer">
                              LGBTQIA+ community badge
                            </Label>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">
                            By selecting this badge, you're indicating that you're a supportive ally or member of the LGBTQIA+ community. 
                            This helps LGBTQIA+ participants find support workers who understand and respect their experiences.
                          </p>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-xs text-blue-800">
                              <strong>Important:</strong> Only select this badge if you genuinely support LGBTQIA+ rights and feel 
                              comfortable providing inclusive care to LGBTQIA+ participants.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Future Badges Placeholder */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="text-gray-500">
                        <Circle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium mb-1">More badges coming soon</p>
                        <p className="text-xs">We're working on additional community badges to help you connect with participants who share your values and experiences.</p>
                      </div>
                    </div>
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
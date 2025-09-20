"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ChevronLeft, 
  Eye, 
  Circle, 
  CheckCircle2,
  CalendarX,
  Plus
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
  { id: "work-history", label: "Work History", completed: false, current: true },
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

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const years = Array.from({ length: 61 }, (_, i) => 2025 - i) // 1965 to 2025

interface WorkHistoryEntry {
  id: string
  jobTitle: string
  company: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  stillCurrent: boolean
}

export default function WorkHistory() {
  const router = useRouter()
  const [workHistory, setWorkHistory] = useState<WorkHistoryEntry[]>([
    {
      id: "1",
      jobTitle: "",
      company: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      stillCurrent: false
    }
  ])

  const addWorkHistory = () => {
    const newEntry: WorkHistoryEntry = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      stillCurrent: false
    }
    setWorkHistory([...workHistory, newEntry])
  }

  const removeWorkHistory = (id: string) => {
    if (workHistory.length > 1) {
      setWorkHistory(workHistory.filter(entry => entry.id !== id))
    }
  }

  const updateWorkHistory = (id: string, field: keyof WorkHistoryEntry, value: string | boolean) => {
    setWorkHistory(workHistory.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ))
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
                {/* Work History Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Work history</h2>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6">
                    Enter your work history and experience in the last five years.
                  </p>

                  {/* Work History Entries */}
                  <div className="space-y-8">
                    {workHistory.map((entry, index) => (
                      <div key={entry.id} className="border border-gray-200 rounded-lg p-6 relative">
                        {workHistory.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeWorkHistory(entry.id)}
                          >
                            <CalendarX className="h-4 w-4 mr-1" />
                            Delete job
                          </Button>
                        )}

                        <div className="space-y-4 pr-20">
                          {/* Job Title */}
                          <div>
                            <Label htmlFor={`job-title-${entry.id}`} className="text-sm font-medium text-gray-900 mb-1 block">
                              Job title/role <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`job-title-${entry.id}`}
                              type="text"
                              value={entry.jobTitle}
                              onChange={(e) => updateWorkHistory(entry.id, 'jobTitle', e.target.value)}
                              required
                              className="w-full"
                              placeholder="Enter job title"
                            />
                          </div>

                          {/* Company */}
                          <div>
                            <Label htmlFor={`company-${entry.id}`} className="text-sm font-medium text-gray-900 mb-1 block">
                              Company <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id={`company-${entry.id}`}
                              type="text"
                              value={entry.company}
                              onChange={(e) => updateWorkHistory(entry.id, 'company', e.target.value)}
                              required
                              className="w-full"
                              placeholder="Enter company name"
                            />
                          </div>

                          {/* Start Date */}
                          <div>
                            <Label className="text-sm font-medium text-gray-900 mb-2 block">Start date</Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-xs text-gray-600 mb-1 block">Month</Label>
                                <Select value={entry.startMonth} onValueChange={(value) => updateWorkHistory(entry.id, 'startMonth', value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Month" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {months.map((month) => (
                                      <SelectItem key={month} value={month}>{month}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-xs text-gray-600 mb-1 block">Year</Label>
                                <Select value={entry.startYear} onValueChange={(value) => updateWorkHistory(entry.id, 'startYear', value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Year" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {years.map((year) => (
                                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          {/* End Date */}
                          <div>
                            <Label className="text-sm font-medium text-gray-900 mb-2 block">End date</Label>
                            
                            {/* Still Current Checkbox */}
                            <div className="mb-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`still-current-${entry.id}`}
                                  checked={entry.stillCurrent}
                                  onCheckedChange={(checked) => updateWorkHistory(entry.id, 'stillCurrent', checked as boolean)}
                                />
                                <Label htmlFor={`still-current-${entry.id}`} className="text-sm text-gray-700">
                                  I am currently working in this role
                                </Label>
                              </div>
                            </div>

                            {!entry.stillCurrent && (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-xs text-gray-600 mb-1 block">Month</Label>
                                  <Select value={entry.endMonth} onValueChange={(value) => updateWorkHistory(entry.id, 'endMonth', value)}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {months.map((month) => (
                                        <SelectItem key={month} value={month}>{month}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-600 mb-1 block">Year</Label>
                                  <Select value={entry.endYear} onValueChange={(value) => updateWorkHistory(entry.id, 'endYear', value)}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {years.map((year) => (
                                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Work History Button */}
                    <Button 
                      variant="outline" 
                      onClick={addWorkHistory}
                      className="w-full border-dashed border-2 border-gray-300 hover:border-purple-300 text-gray-600 hover:text-purple-600"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add work history
                    </Button>
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
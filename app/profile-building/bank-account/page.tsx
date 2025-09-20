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
  Lock
} from "lucide-react"

// Profile building sections data
const jobDetailsItems = [
  { id: "availability", label: "Preferred Hours", completed: true, current: false },
  { id: "rates", label: "Indicative Rates", completed: false },
  { id: "locations", label: "Locations", completed: true },
  { id: "experience", label: "Experience", completed: false },
]

const additionalDetailsItems = [
  { id: "bank-account", label: "Bank Account", completed: false, current: true },
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

export default function BankAccount() {
  const router = useRouter()
  const [accountName, setAccountName] = useState("")
  const [bankName, setBankName] = useState("")
  const [bsb, setBsb] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountResponsibility, setAccountResponsibility] = useState(false)

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
                {/* Bank Account Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Bank account</h2>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6">
                    To get you paid as soon as possible, enter your bank details below so that CareNeighbour can process payments to you on behalf of your clients.
                  </p>

                  {/* Security Info Banner */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                      <div className="text-sm text-gray-700">
                        Your bank details <strong>will not be displayed on your profile</strong> and only used to process your payments by the CareNeighbour team.
                      </div>
                    </div>
                  </div>

                  {/* Bank Account Form */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Add your bank account details</h3>
                    
                    <div className="space-y-4">
                      {/* Account Name */}
                      <div>
                        <Label htmlFor="account-name" className="text-sm font-medium text-gray-900 mb-1 block">
                          Account name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="account-name"
                          type="text"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          required
                          className="w-full"
                          placeholder="Enter account name"
                        />
                      </div>

                      {/* Bank Name */}
                      <div>
                        <Label htmlFor="bank-name" className="text-sm font-medium text-gray-900 mb-1 block">
                          Bank name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="bank-name"
                          type="text"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          required
                          className="w-full"
                          placeholder="Enter bank name"
                        />
                      </div>

                      {/* BSB and Account Number */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bsb" className="text-sm font-medium text-gray-900 mb-1 block">
                            BSB <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="bsb"
                            type="text"
                            value={bsb}
                            onChange={(e) => setBsb(e.target.value)}
                            maxLength={6}
                            required
                            className="w-full"
                            placeholder="000-000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="account-number" className="text-sm font-medium text-gray-900 mb-1 block">
                            Account number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="account-number"
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            required
                            className="w-full"
                            placeholder="Enter account number"
                          />
                        </div>
                      </div>

                      {/* Responsibility Checkbox */}
                      <div className="pt-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="account-responsibility"
                            checked={accountResponsibility}
                            onCheckedChange={(checked) => setAccountResponsibility(checked as boolean)}
                          />
                          <Label htmlFor="account-responsibility" className="text-sm text-gray-700 leading-relaxed">
                            I understand that CareNeighbour is not responsible for checking the accuracy of my BSB and Account Number. 
                            Any errors in this information may result in me not being paid for services I have provided to clients.
                          </Label>
                        </div>
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
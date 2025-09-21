"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"

export default function DiscoverPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Jobs</h1>
        <p className="text-gray-600">Personalized job recommendations based on your profile</p>
      </div>

      {/* Empty State */}
      <Card className="mb-8">
        <CardContent className="p-12">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              <ClipboardList className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Your Profile to Discover Jobs</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Once your account is complete and approved, we'll show you personalized job recommendations 
              that match your skills, location, and preferences.
            </p>
            <div className="space-y-3">
              <Link href="/onboarding">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Complete Your Profile
                </Button>
              </Link>
              <div>
                <Link href="/sessions/search">
                  <Button variant="outline">
                    Browse All Jobs Instead
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Matching</h3>
            <p className="text-gray-600 text-sm">
              Our algorithm matches you with clients based on your location, skills, 
              availability, and care preferences.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Quality Opportunities</h3>
            <p className="text-gray-600 text-sm">
              All clients on our platform are verified, and we ensure fair rates 
              for quality care services.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
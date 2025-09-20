"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UnifiedFooter } from "@/components/unified-footer"
import { useLanguage } from "@/app/contexts/LanguageContext"
import {
  Search,
  MapPin,
  Star,
  Heart,
  MessageSquare,
  Filter,
  Calendar,
  Clock,
  User,
  ArrowLeft
} from "lucide-react"

export default function SearchPage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  
  // Mock search results
  const carers = [
    {
      id: 1,
      name: "Sarah Thompson",
      avatar: "/placeholder-user.jpg",
      rating: 4.8,
      reviewCount: 127,
      location: "Richmond, BC",
      specialties: ["Companionship", "Personal Care", "Meal Preparation"],
      languages: ["English", "Mandarin"],
      availability: "Available Today",
      hourlyRate: 35,
      distance: "2.3 km away"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      avatar: "/placeholder-user.jpg",
      rating: 4.9,
      reviewCount: 89,
      location: "Vancouver, BC",
      specialties: ["Dementia Care", "Medical Support", "Transportation"],
      languages: ["English", "Spanish"],
      availability: "Available Tomorrow",
      hourlyRate: 40,
      distance: "3.1 km away"
    },
    {
      id: 3,
      name: "James Chen",
      avatar: "/placeholder-user.jpg",
      rating: 4.7,
      reviewCount: 156,
      location: "Burnaby, BC",
      specialties: ["Physical Therapy", "Companionship", "Housekeeping"],
      languages: ["English", "Cantonese", "Mandarin"],
      availability: "Available Now",
      hourlyRate: 38,
      distance: "4.5 km away"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm text-gray-600">Back</span>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/CN_Brandmark_Black.png" alt="CareNeighbour" width={25} height={25} />
                <span className="font-semibold text-lg">CareNeighbour</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find the perfect carer for your needs
          </h1>
          <p className="text-gray-600">
            Connect with qualified, compassionate carers in your area
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for care services, specialties, or languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 h-12 px-6">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
            <Button variant="outline" className="h-12 px-4">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Popular Services</h3>
          <div className="flex flex-wrap gap-2">
            {["Companionship", "Personal Care", "Meal Preparation", "Transportation", "Dementia Care", "Medical Support"].map((service) => (
              <Badge 
                key={service} 
                variant="outline" 
                className="cursor-pointer hover:bg-purple-50 hover:border-purple-300"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {carers.length} carers available in your area
            </h2>
            <div className="text-sm text-gray-600">
              Sorted by: Distance
            </div>
          </div>

          <div className="space-y-4">
            {carers.map((carer) => (
              <Card key={carer.id} className="glassmorphism hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Carer Info */}
                    <div className="flex gap-4 flex-1">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={carer.avatar} alt={carer.name} />
                        <AvatarFallback>{carer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{carer.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="font-medium">{carer.rating}</span>
                                <span>({carer.reviewCount} reviews)</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{carer.location} • {carer.distance}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                            <Heart className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        {/* Specialties */}
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {carer.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Languages:</span>
                            {carer.languages.map((lang, index) => (
                              <span key={lang} className="text-gray-900">
                                {lang}{index < carer.languages.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Availability & Rate */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="text-green-600 font-medium">{carer.availability}</span>
                          </div>
                          <div className="text-gray-900 font-semibold">
                            ${carer.hourlyRate}/hour
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:w-48">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Carers
          </Button>
        </div>
      </main>

      <UnifiedFooter 
        language={language}
        translations={{
          heroLogo: "CareNeighbour",
          aboutUs: "About Us",
          mainPage: "Home",
          footerCopyright: "© 2024 CareNeighbour, Inc. All rights reserved."
        }}
      />
    </div>
  )
}
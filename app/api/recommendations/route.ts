import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Sample carer recommendations data
    const recommendations = [
      {
        id: "1",
        name: "Sarah Thompson",
        photo: "/images/caregivers/sarah.jpg",
        rating: 4.9,
        experience: "7+ years in aged care",
        distance: "1.2 miles away",
        hourlyRate: 28,
        bio: "Certified nurse assistant specializing in medication management and personal care.",
        languages: ["English", "Spanish"],
        skills: ["Medication Management", "Personal Care", "Meal Preparation", "Mobility Assistance"],
        matchScore: 95,
        availability: "Available immediately"
      },
      {
        id: "2", 
        name: "Michael Reed",
        photo: "/images/caregivers/michael.jpg",
        rating: 4.7,
        experience: "5+ years specializing in medical care",
        distance: "2.1 miles away", 
        hourlyRate: 32,
        bio: "Licensed practical nurse with expertise in post-surgical care and rehabilitation.",
        languages: ["English", "French"],
        skills: ["Medical Care", "Physical Therapy", "Wound Care", "Rehabilitation Support"],
        matchScore: 89,
        availability: "Available weekdays"
      },
      {
        id: "3",
        name: "Emily Johnson", 
        photo: "/images/caregivers/emily.jpg",
        rating: 4.8,
        experience: "6+ years in dementia care",
        distance: "1.8 miles away",
        hourlyRate: 30,
        bio: "Specialized in dementia and Alzheimer's care with patience and compassion.",
        languages: ["English"],
        skills: ["Dementia Care", "Behavioral Support", "Memory Activities", "Family Communication"],
        matchScore: 92,
        availability: "Flexible schedule"
      }
    ]

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Recommendations API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { preferences, location, careType } = await request.json()

    // This is a placeholder for recommendation logic
    // In a real application, you would filter and rank carers based on the preferences
    
    // Return sample recommendations for now
    const recommendations = [
      {
        id: "1",
        name: "Sarah Thompson",
        photo: "/images/caregivers/sarah.jpg",
        rating: 4.9,
        experience: "7+ years in aged care",
        distance: "1.2 miles away",
        hourlyRate: 28,
        bio: "Certified nurse assistant specializing in medication management and personal care.",
        languages: ["English", "Spanish"],
        skills: ["Medication Management", "Personal Care", "Meal Preparation", "Mobility Assistance"],
        matchScore: 95,
        availability: "Available immediately"
      }
    ]

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Recommendations API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

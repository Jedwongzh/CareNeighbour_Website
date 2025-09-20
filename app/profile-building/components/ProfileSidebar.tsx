"use client"

import Link from "next/link"
import { 
  Circle, 
  CheckCircle2,
  User,
  MapPin,
  DollarSign,
  Briefcase,
  CreditCard,
  Clock,
  GraduationCap,
  Shield,
  Award,
  Syringe,
  Languages,
  Globe,
  Heart,
  Smile,
  MessageSquare,
  Settings
} from "lucide-react"
import { Card } from "@/components/ui/card"

interface ProfileSidebarProps {
  currentStep: string
}

// Profile building sections data
const jobDetailsItems = [
  { 
    id: "availability", 
    label: "Preferred Hours", 
    completed: false, 
    icon: Clock,
    href: "/profile-building/availability"
  },
  { 
    id: "rates", 
    label: "Indicative Rates", 
    completed: false, 
    icon: DollarSign,
    href: "/profile-building/rates"
  },
  { 
    id: "locations", 
    label: "Locations", 
    completed: false, 
    icon: MapPin,
    href: "/profile-building/locations"
  },
  { 
    id: "experience", 
    label: "Experience", 
    completed: false, 
    icon: Briefcase,
    href: "/profile-building/experience"
  },
]

const additionalDetailsItems = [
  { 
    id: "bank-account", 
    label: "Bank Account", 
    completed: false, 
    icon: CreditCard,
    href: "/profile-building/bank-account"
  },
  { 
    id: "work-history", 
    label: "Work History", 
    completed: false, 
    icon: Briefcase,
    href: "/profile-building/work-history"
  },
  { 
    id: "education-training", 
    label: "Education & Training", 
    completed: false, 
    icon: GraduationCap,
    href: "/profile-building/education-training"
  },
  { 
    id: "ndis-worker-screening", 
    label: "NDIS Worker Screening", 
    completed: false, 
    icon: Shield,
    href: "/profile-building/ndis-worker-screening"
  },
  { 
    id: "badges", 
    label: "Badges", 
    completed: false, 
    icon: Award,
    href: "/profile-building/badges"
  },
  { 
    id: "immunisation", 
    label: "Immunisation", 
    completed: false, 
    icon: Syringe,
    href: "/profile-building/immunisation"
  },
  { 
    id: "languages", 
    label: "Languages", 
    completed: false, 
    icon: Languages,
    href: "/profile-building/languages"
  },
  { 
    id: "cultural-background", 
    label: "Cultural Background", 
    completed: false, 
    icon: Globe,
    href: "/profile-building/cultural-background"
  },
  { 
    id: "religion", 
    label: "Religion", 
    completed: false, 
    icon: Heart,
    href: "/profile-building/religion"
  },
  { 
    id: "interests-hobbies", 
    label: "Interests & Hobbies", 
    completed: false, 
    icon: Smile,
    href: "/profile-building/interests-hobbies"
  },
  { 
    id: "about-me", 
    label: "About Me", 
    completed: false, 
    icon: MessageSquare,
    href: "/profile-building/about-me"
  },
  { 
    id: "my-preferences", 
    label: "My Preferences", 
    completed: false, 
    icon: Settings,
    href: "/profile-building/my-preferences"
  },
]

export default function ProfileSidebar({ currentStep }: ProfileSidebarProps) {
  const allItems = [...jobDetailsItems, ...additionalDetailsItems]
  
  const renderNavItem = (item: typeof jobDetailsItems[0]) => {
    const Icon = item.icon
    const isActive = item.id === currentStep
    const isCompleted = item.completed
    
    return (
      <Link
        key={item.id}
        href={item.href}
        className={`
          flex items-center gap-3 p-3 rounded-lg transition-all duration-200
          ${isActive 
            ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-200 shadow-sm' 
            : 'hover:bg-gray-100'
          }
        `}
      >
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
          ${isCompleted 
            ? 'bg-green-100 text-green-600' 
            : isActive 
              ? 'bg-purple-100 text-purple-600' 
              : 'bg-gray-100 text-gray-500'
          }
        `}>
          {isCompleted ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Icon className="h-4 w-4" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`
            text-sm font-medium truncate
            ${isActive ? 'text-purple-900' : 'text-gray-900'}
          `}>
            {item.label}
          </p>
        </div>
        
        <div className={`
          w-2 h-2 rounded-full flex-shrink-0
          ${isCompleted 
            ? 'bg-green-500' 
            : isActive 
              ? 'bg-purple-500' 
              : 'bg-gray-300'
          }
        `} />
      </Link>
    )
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        {/* Progress Summary */}
        <Card className="p-4 mb-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Profile Builder</h3>
              <p className="text-sm text-gray-600">Complete your CareNeighbour profile</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(allItems.filter(item => item.completed).length / allItems.length) * 100}%` 
                }}
              />
            </div>
            <span className="font-medium">
              {allItems.filter(item => item.completed).length} / {allItems.length}
            </span>
          </div>
        </Card>

        {/* Job Details Section */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-purple-600" />
            Job Details
          </h4>
          <div className="space-y-2">
            {jobDetailsItems.map(renderNavItem)}
          </div>
        </div>

        {/* Additional Details Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-purple-600" />
            Additional Details
          </h4>
          <div className="space-y-2">
            {additionalDetailsItems.map(renderNavItem)}
          </div>
        </div>
      </div>
    </div>
  )
}
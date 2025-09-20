'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChevronLeft, 
  Eye, 
  Circle, 
  CheckCircle2,
  Check, 
  ChefHat, 
  Flower, 
  Puzzle, 
  Film, 
  Music, 
  Globe, 
  Heart, 
  Palette, 
  BookOpen, 
  Bike, 
  Palmtree 
} from 'lucide-react';

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
  { id: "immunisation", label: "Immunisation", completed: false },
  { id: "languages", label: "Languages", completed: false },
  { id: "cultural-background", label: "Cultural Background", completed: false },
  { id: "religion", label: "Religion", completed: false },
  { id: "interests-hobbies", label: "Interests & Hobbies", completed: false, current: true },
  { id: "about-me", label: "About Me", completed: false },
  { id: "my-preferences", label: "My Preferences", completed: false },
]

interface InterestsHobbiesForm {
  interests: string[];
}

const interestsData = [
  { name: 'Cooking', icon: ChefHat },
  { name: 'Gardening', icon: Flower },
  { name: 'Indoor Games / Puzzles', icon: Puzzle },
  { name: 'Movies', icon: Film },
  { name: 'Music', icon: Music },
  { name: 'Cultural Festivities', icon: Globe },
  { name: 'Pets', icon: Heart },
  { name: 'Photography / Art', icon: Palette },
  { name: 'Reading', icon: BookOpen },
  { name: 'Sports', icon: Bike },
  { name: 'Travel', icon: Palmtree },
  { name: 'Other', icon: null }
];

export default function InterestsHobbiesPage() {
  const router = useRouter();
  const [form, setForm] = useState<InterestsHobbiesForm>({
    interests: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInterestChange = (interest: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to next step
      router.push('/profile-building/about-me');
    } catch (error) {
      console.error('Error saving interests and hobbies:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Interests & hobbies</h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Select the things that you enjoy doing. Clients are more likely to find Support Workers who share similar interests.
                    </p>
                  </div>

                  {/* Interests Selection */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {interestsData.map((interest) => {
                        const IconComponent = interest.icon;
                        return (
                          <div key={interest.name} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-purple-50 transition-colors">
                            <Checkbox
                              id={interest.name}
                              checked={form.interests.includes(interest.name)}
                              onCheckedChange={(checked) => handleInterestChange(interest.name, checked as boolean)}
                              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label 
                              htmlFor={interest.name}
                              className="flex items-center space-x-3 cursor-pointer flex-1"
                            >
                              {form.interests.includes(interest.name) && (
                                <Check className="h-4 w-4 text-purple-600" />
                              )}
                              {IconComponent && (
                                <IconComponent className="h-5 w-5 text-purple-600" />
                              )}
                              <span className="text-sm font-medium text-gray-700">
                                {interest.name}
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary */}
                  {form.interests.length > 0 && (
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Selected Interests & Hobbies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {form.interests.map((interest) => {
                            const interestData = interestsData.find(i => i.name === interest);
                            const IconComponent = interestData?.icon;
                            return (
                              <span
                                key={interest}
                                className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                              >
                                {IconComponent && <IconComponent className="h-3 w-3" />}
                                <span>{interest}</span>
                              </span>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Saving...' : 'Save and continue'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
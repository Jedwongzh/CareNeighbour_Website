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
  Check
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
  { id: "cultural-background", label: "Cultural Background", completed: false, current: true },
  { id: "religion", label: "Religion", completed: false },
  { id: "interests-hobbies", label: "Interests & Hobbies", completed: false },
  { id: "about-me", label: "About Me", completed: false },
  { id: "my-preferences", label: "My Preferences", completed: false },
]

interface CulturalBackgroundForm {
  backgrounds: string[];
}

const culturalBackgrounds = [
  'Australian',
  'Australian Aboriginal',
  'Australian South East Islander',
  'Torres Strait Islander',
  'New Zealander',
  'Maori',
  'Polynesian',
  'Other Oceanian',
  'Western European',
  'Northern European',
  'Southern & Eastern European',
  'Middle Eastern',
  'Jewish',
  'Asian',
  'North American',
  'South American',
  'Central American',
  'Caribbean Islander',
  'South African',
  'Other African'
];

export default function CulturalBackgroundPage() {
  const router = useRouter();
  const [form, setForm] = useState<CulturalBackgroundForm>({
    backgrounds: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveCompletionStatus = (sectionId: string, completed: boolean) => {
    const completionData = JSON.parse(localStorage.getItem('profile-completion') || '{}');
    completionData[sectionId] = completed;
    localStorage.setItem('profile-completion', JSON.stringify(completionData));
  };

  const handleBackgroundChange = (background: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      backgrounds: checked 
        ? [...prev.backgrounds, background]
        : prev.backgrounds.filter(b => b !== background)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save form data to localStorage
      localStorage.setItem('cultural-background-form', JSON.stringify(form));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mark this step as completed
      saveCompletionStatus('cultural-background', true);
      
      // Navigate to next step
      router.push('/profile-building/religion');
    } catch (error) {
      console.error('Error saving cultural background:', error);
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Cultural background</h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Select your cultural background, this will help clients search for Support Workers who share a similar cultural background.
                    </p>
                  </div>

                  {/* Cultural Background Selection */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {culturalBackgrounds.map((background) => (
                        <div key={background} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-purple-50 transition-colors">
                          <Checkbox
                            id={background}
                            checked={form.backgrounds.includes(background)}
                            onCheckedChange={(checked) => handleBackgroundChange(background, checked as boolean)}
                            className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                          />
                          <label 
                            htmlFor={background}
                            className="flex items-center space-x-2 cursor-pointer flex-1"
                          >
                            {form.backgrounds.includes(background) && (
                              <Check className="h-4 w-4 text-purple-600" />
                            )}
                            <span className="text-sm font-medium text-gray-700">
                              {background}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  {form.backgrounds.length > 0 && (
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Selected Cultural Backgrounds:</h4>
                        <div className="flex flex-wrap gap-2">
                          {form.backgrounds.map((background) => (
                            <span
                              key={background}
                              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                            >
                              {background}
                            </span>
                          ))}
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
'use client';

import { useState, useEffect } from 'react';
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

// Helper function to get completion status from localStorage
const getCompletionStatus = () => {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem('profile-building-completion');
  return saved ? JSON.parse(saved) : {};
};

// Helper function to save completion status to localStorage
const saveCompletionStatus = (stepId: string, completed: boolean) => {
  if (typeof window === 'undefined') return;
  const current = getCompletionStatus();
  current[stepId] = completed;
  localStorage.setItem('profile-building-completion', JSON.stringify(current));
};

// Profile building sections data
const getJobDetailsItems = (completionStatus: Record<string, boolean>) => [
  { id: "availability", label: "Preferred Hours", completed: completionStatus.availability || false, current: false },
  { id: "rates", label: "Indicative Rates", completed: completionStatus.rates || false },
  { id: "locations", label: "Locations", completed: completionStatus.locations || false },
  { id: "experience", label: "Experience", completed: completionStatus.experience || false },
];

const getAdditionalDetailsItems = (completionStatus: Record<string, boolean>) => [
  { id: "bank-account", label: "Bank Account", completed: completionStatus['bank-account'] || false },
  { id: "work-history", label: "Work History", completed: completionStatus['work-history'] || false },
  { id: "education-training", label: "Education & Training", completed: completionStatus['education-training'] || false },
  { id: "ndis-worker-screening", label: "NDIS Worker Screening", completed: completionStatus['ndis-worker-screening'] || false },
  { id: "badges", label: "Badges", completed: completionStatus.badges || false },
  { id: "immunisation", label: "Immunisation", completed: completionStatus.immunisation || false },
  { id: "languages", label: "Languages", completed: completionStatus.languages || false },
  { id: "cultural-background", label: "Cultural Background", completed: completionStatus['cultural-background'] || false },
  { id: "religion", label: "Religion", completed: completionStatus.religion || false },
  { id: "interests-hobbies", label: "Interests & Hobbies", completed: completionStatus['interests-hobbies'] || false },
  { id: "about-me", label: "About Me", completed: completionStatus['about-me'] || false },
  { id: "my-preferences", label: "My Preferences", completed: completionStatus['my-preferences'] || false, current: true },
];

interface MyPreferencesForm {
  preferences: string[];
}

const preferencesOptions = [
  'Female only',
  'Male only',
  'Non-smoker',
  'No pets',
  'No preferences'
];

export default function MyPreferencesPage() {
  const router = useRouter();
  const [completionStatus, setCompletionStatus] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<MyPreferencesForm>({
    preferences: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load completion status and saved form data on component mount
  useEffect(() => {
    const status = getCompletionStatus();
    setCompletionStatus(status);
    
    // Load saved form data
    const savedData = localStorage.getItem('my-preferences-form');
    if (savedData) {
      setForm(JSON.parse(savedData));
    }
  }, []);

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      preferences: checked 
        ? [...prev.preferences, preference]
        : prev.preferences.filter(p => p !== preference)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save form data to localStorage
      localStorage.setItem('my-preferences-form', JSON.stringify(form));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mark this step as completed
      saveCompletionStatus('my-preferences', true);
      setCompletionStatus(prev => ({ ...prev, 'my-preferences': true }));
      
      // Navigate to profile preview or completion page
      router.push('/profile-building/complete');
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const jobDetailsItems = getJobDetailsItems(completionStatus);
  const additionalDetailsItems = getAdditionalDetailsItems(completionStatus);

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
            
            <Link href="/profile-building">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Preview profile</span>
              </Button>
            </Link>
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">My preferences</h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Select your work preferences to help match you with suitable clients.
                    </p>
                  </div>

                  {/* Preferences Section */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Who do you prefer to work with?
                      </h3>
                      
                      <div className="space-y-4">
                        {preferencesOptions.map((preference) => (
                          <div key={preference} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-purple-50 transition-colors">
                            <Checkbox
                              id={preference}
                              checked={form.preferences.includes(preference)}
                              onCheckedChange={(checked) => handlePreferenceChange(preference, checked as boolean)}
                              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label 
                              htmlFor={preference}
                              className="flex items-center space-x-2 cursor-pointer flex-1"
                            >
                              {form.preferences.includes(preference) && (
                                <Check className="h-4 w-4 text-purple-600" />
                              )}
                              <p className="text-sm font-medium text-gray-700">
                                {preference}
                              </p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  {form.preferences.length > 0 && (
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Your Work Preferences:</h4>
                        <div className="flex flex-wrap gap-2">
                          {form.preferences.map((preference) => (
                            <span
                              key={preference}
                              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                            >
                              {preference}
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
                      {isSubmitting ? 'Saving...' : 'Save and preview profile'}
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
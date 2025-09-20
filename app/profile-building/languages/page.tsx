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
  { id: "languages", label: "Languages", completed: completionStatus.languages || false, current: true },
  { id: "cultural-background", label: "Cultural Background", completed: completionStatus['cultural-background'] || false },
  { id: "religion", label: "Religion", completed: completionStatus.religion || false },
  { id: "interests-hobbies", label: "Interests & Hobbies", completed: completionStatus['interests-hobbies'] || false },
  { id: "about-me", label: "About Me", completed: completionStatus['about-me'] || false },
  { id: "my-preferences", label: "My Preferences", completed: completionStatus['my-preferences'] || false },
];

interface LanguageForm {
  mainLanguages: string[];
  otherLanguages: string[];
}

const mainLanguagesList = [
  'Nepali', 'Arabic', 'Cantonese', 'Croatian', 'English', 'French', 'German', 'Greek',
  'Hebrew', 'Hindi', 'Hungarian', 'Indonesian', 'Italian', 'Japanese', 'Korean', 'Mandarin',
  'Maltese', 'Macedonian', 'Netherlandic (Dutch)', 'Persian', 'Polish', 'Portuguese',
  'Russian', 'Serbian', 'Sinhalese', 'Samoan', 'Spanish', 'Tamil', 'Tagalog (Filipino)',
  'Turkish', 'Vietnamese', 'Auslan (Australian sign language)', 'Other'
];

const otherLanguagesList = [
  'Nepali', 'Arabic', 'Cantonese', 'Croatian', 'English', 'French', 'German', 'Greek',
  'Hebrew', 'Hindi', 'Hungarian', 'Indonesian', 'Italian', 'Japanese', 'Korean', 'Mandarin',
  'Maltese', 'Macedonian', 'Netherlandic (Dutch)', 'Persian', 'Polish', 'Portuguese',
  'Russian', 'Serbian', 'Sinhalese', 'Samoan', 'Spanish', 'Tamil', 'Tagalog (Filipino)',
  'Turkish', 'Vietnamese', 'Auslan (Australian sign language)', 'Other'
];

export default function LanguagesPage() {
  const router = useRouter();
  const [completionStatus, setCompletionStatus] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<LanguageForm>({
    mainLanguages: [],
    otherLanguages: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load completion status and saved form data on component mount
  useEffect(() => {
    const status = getCompletionStatus();
    setCompletionStatus(status);
    
    // Load saved form data
    const savedData = localStorage.getItem('languages-form');
    if (savedData) {
      setForm(JSON.parse(savedData));
    }
  }, []);

  const handleMainLanguageChange = (language: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      mainLanguages: checked 
        ? [...prev.mainLanguages, language]
        : prev.mainLanguages.filter(l => l !== language)
    }));
  };

  const handleOtherLanguageChange = (language: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      otherLanguages: checked 
        ? [...prev.otherLanguages, language]
        : prev.otherLanguages.filter(l => l !== language)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save form data to localStorage
      localStorage.setItem('languages-form', JSON.stringify(form));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mark this step as completed
      saveCompletionStatus('languages', true);
      setCompletionStatus(prev => ({ ...prev, languages: true }));
      
      // Navigate to next step
      router.push('/profile-building/cultural-background');
    } catch (error) {
      console.error('Error saving languages:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSave = form.mainLanguages.length > 0;
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
            
            <Link href="/profile-building/availability">
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
                    <p className="text-gray-600 text-sm mb-6">
                      Select the languages you are fluent in to help clients find support workers who can communicate in their preferred language.
                    </p>
                  </div>

                  {/* Main Languages Section */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        What languages are you fluent in?
                      </h2>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Select your main language(s)
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mainLanguagesList.map((language) => (
                          <div key={`main-${language}`} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-purple-50 transition-colors">
                            <Checkbox
                              id={`main-${language}`}
                              checked={form.mainLanguages.includes(language)}
                              onCheckedChange={(checked) => handleMainLanguageChange(language, checked as boolean)}
                              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label 
                              htmlFor={`main-${language}`}
                              className="flex items-center space-x-2 cursor-pointer flex-1"
                            >
                              {form.mainLanguages.includes(language) && (
                                <Check className="h-4 w-4 text-purple-600" />
                              )}
                              <span className="text-sm font-medium text-gray-700">
                                {language}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Other Languages Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Other language
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Select other language(s) you can provide support in.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherLanguagesList.map((language) => (
                          <div key={`other-${language}`} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-purple-50 transition-colors">
                            <Checkbox
                              id={`other-${language}`}
                              checked={form.otherLanguages.includes(language)}
                              onCheckedChange={(checked) => handleOtherLanguageChange(language, checked as boolean)}
                              className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label 
                              htmlFor={`other-${language}`}
                              className="flex items-center space-x-2 cursor-pointer flex-1"
                            >
                              {form.otherLanguages.includes(language) && (
                                <Check className="h-4 w-4 text-purple-600" />
                              )}
                              <span className="text-sm font-medium text-gray-700">
                                {language}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  {(form.mainLanguages.length > 0 || form.otherLanguages.length > 0) && (
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Selected Languages:</h4>
                        <div className="space-y-2">
                          {form.mainLanguages.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-purple-800">Main languages: </span>
                              <span className="text-sm text-purple-700">{form.mainLanguages.join(', ')}</span>
                            </div>
                          )}
                          {form.otherLanguages.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-purple-800">Other languages: </span>
                              <span className="text-sm text-purple-700">{form.otherLanguages.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      disabled={!canSave || isSubmitting}
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
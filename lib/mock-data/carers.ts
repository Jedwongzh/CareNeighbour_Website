export interface CarerProfile {
  id: number;
  name: string;
  photo: string;
  rating: number;
  experience: string;
  distance: string;
  hourlyRate: number;
  bio: string;
  languages: string[];
  skills: string[];
  availability: string;
}

export function getCarerById(id: number): CarerProfile | undefined {
  return mockCarers.find((carer) => carer.id === id);
}

export function getAllCarerIds(): number[] {
  return mockCarers.map((carer) => carer.id);
}

// Sample carer data
export const mockCarers: CarerProfile[] = [
  {
    id: 1,
    name: "Sarah Thompson",
    photo: "/images/caregivers/sarah.jpg",
    rating: 4.9,
    experience: "7+ years in aged care",
    distance: "1.2 miles away",
    hourlyRate: 28,
    bio: "Certified nurse assistant specializing in medication management and personal care.",
    languages: ["English", "Spanish"],
    skills: [
      "Medication Management",
      "Personal Care",
      "Meal Preparation",
      "Mobility Assistance",
    ],
    availability: "Available immediately",
  },
  {
    id: 2,
    name: "Michael Reed",
    photo: "/images/caregivers/michael.jpg",
    rating: 4.7,
    experience: "5+ years specializing in medical care",
    distance: "2.1 miles away",
    hourlyRate: 32,
    bio: "Licensed practical nurse with expertise in post-surgical care and rehabilitation.",
    languages: ["English", "French"],
    skills: [
      "Medical Care",
      "Physical Therapy",
      "Wound Care",
      "Rehabilitation Support",
    ],
    availability: "Available weekdays",
  },
  {
    id: 3,
    name: "Emily Johnson",
    photo: "/images/caregivers/emily.jpg",
    rating: 4.8,
    experience: "6+ years in dementia care",
    distance: "1.8 miles away",
    hourlyRate: 30,
    bio: "Specialized in dementia and Alzheimer's care with patience and compassion.",
    languages: ["English"],
    skills: [
      "Dementia Care",
      "Behavioral Support",
      "Memory Activities",
      "Family Communication",
    ],
    availability: "Flexible schedule",
  },
  {
    id: 4,
    name: "David Chen",
    photo: "/images/caregivers/david.jpg",
    rating: 4.6,
    experience: "4+ years in disability support",
    distance: "2.8 miles away",
    hourlyRate: 26,
    bio: "Compassionate caregiver specializing in disability support and independent living assistance.",
    languages: ["English", "Mandarin"],
    skills: [
      "Disability Support",
      "Independent Living",
      "Transportation",
      "Social Activities",
    ],
    availability: "Monday to Friday",
  },
  {
    id: 5,
    name: "Priya Patel",
    photo: "/images/caregivers/priya.jpg",
    rating: 4.8,
    experience: "6+ years in palliative care",
    distance: "2.2 miles away",
    hourlyRate: 29,
    bio: "Compassionate palliative care specialist with expertise in end-of-life support and family counseling.",
    languages: ["English", "Hindi", "Gujarati"],
    skills: [
      "Palliative Care",
      "Pain Management",
      "Family Support",
      "Spiritual Care",
    ],
    availability: "Available 6 days a week",
  },
];

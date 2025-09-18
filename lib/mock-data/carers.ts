export interface CarerProfile {
  id: number;
  name: string;
  photo: string;
  video?: string;
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
export const oldMockCarers: CarerProfile[] = [
  {
    id: 1,
    name: "Sarah Thompson",
    photo: "/images/caregivers/sarah.jpg",
    video: "/videos/mock-video-bios/sarah.mp4",
    rating: 4.9,
    experience: "7+ years in aged care",
    distance: "1.2 km",
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
    distance: "2.1 km",
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
    distance: "1.8 km",
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
    distance: "2.8 km",
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
    distance: "2.2 km",
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

export const mockCarers: CarerProfile[] = [
  {
    id: 6,
    name: "Mahathir L.",
    photo: "/images/demo-mock-avatars/Mahathir.png",
    video: "/videos/mock-video-bios/Mahathir.MOV",
    rating: 4.9,
    experience: "7+ years in aged care",
    distance: "5.7 km",
    hourlyRate: 50,
    bio: "Certified nurse assistant specializing in medication management and personal care.",
    languages: ["English", "Hindi"],
    skills: [
      "Medication Management",
      "Personal Care",
      "Meal Preparation",
      "Mobility Assistance",
    ],
    availability: "Available immediately",
  },
  {
    id: 7,
    name: "Yufei T.",
    photo: "/images/demo-mock-avatars/Yufei.png",
    video: "/videos/mock-video-bios/Yufei.MOV",
    rating: 4.7,
    experience: "1+ years specializing in nursing",
    distance: "2.1 km",
    hourlyRate: 50,
    bio: "Licensed practical nurse with expertise in post-surgical care and rehabilitation.",
    languages: ["English", "Mandarin", "Chinese"],
    skills: [
      "Medical Care",
      "Physical Therapy",
      "Wound Care",
      "Rehabilitation Support",
    ],
    availability: "Available weekdays",
  },
  {
    id: 8,
    name: "Jed W.",
    photo: "/images/demo-mock-avatars/Jed.png",
    video: "/videos/mock-video-bios/Jed.mp4",
    rating: 4.8,
    experience: "6+ years in dementia care",
    distance: "1.8 km",
    hourlyRate: 53,
    bio: "Specialized in dementia and Alzheimer's care with patience and compassion.",
    languages: ["English", "Malay", "Cantonese", "Mandarin", "Chinese"],
    skills: [
      "Dementia Care",
      "Behavioral Support",
      "Memory Activities",
      "Family Communication",
    ],
    availability: "Flexible schedule",
  },
  {
    id: 9,
    name: "Muhammad Ilham R.",
    photo: "/images/demo-mock-avatars/Muhammad.png",
    video: "/videos/mock-video-bios/Muhammad.MOV",
    rating: 4.6,
    experience: "4+ years in disability support",
    distance: "8.2 km",
    hourlyRate: 47,
    bio: "Compassionate caregiver specializing in disability support and independent living assistance.",
    languages: ["English", "Indonesian"],
    skills: [
      "Disability Support",
      "Independent Living",
      "Transportation",
      "Social Activities",
    ],
    availability: "Monday to Friday",
  },
  {
    id: 10,
    name: "Dennis D. Z.",
    photo: "/images/demo-mock-avatars/Dennis.jfif",
    video: "/videos/mock-video-bios/Dennis.MOV",
    rating: 4.8,
    experience: "6+ years in palliative care",
    distance: "13.1 km",
    hourlyRate: 53,
    bio: "Compassionate palliative care specialist with expertise in end-of-life support and family counseling.",
    languages: ["English", "Cantonese", "Mandarin", "Chinese"],
    skills: [
      "Palliative Care",
      "Pain Management",
      "Family Support",
      "Spiritual Care",
    ],
    availability: "Available 6 days a week",
  },
];

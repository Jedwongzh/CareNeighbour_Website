export interface Review {
  id: number;
  reviewerName: string;
  rating: number;
  date: string;
  comment: string;
}

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
  pastExperience: string[][];
  reviews: Review[];
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
    bio: "I'm a Certified Nurse Assistant with over seven years of experience. I specialize in the safe and effective management of medications and providing comprehensive personal care. My approach is all about respectful support to help clients maintain their independence and dignity. Outside of work, I'm passionate about cooking traditional meals and I volunteer with a local community garden, finding peace in nurturing things.",
    languages: ["English", "Hindi"],
    skills: [
      "Medication Management",
      "Personal Care",
      "Meal Preparation",
      "Mobility Assistance",
    ],
    availability: "Available immediately",
    pastExperience: [
      ["City Hospital", "Certified Nurse Assistant", "2018 ~ Present"],
      ["Green Acres Retirement Home", "Aged Care Assistant", "2016 ~ 2018"],
    ],
    reviews: [
      {
        id: 1,
        reviewerName: "Margaret S.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Mahathir has been an absolute blessing for my mother. His patience and attention to detail with her medications is impeccable. He's professional yet warm, and mom always looks forward to his visits."
      },
      {
        id: 2,
        reviewerName: "Robert T.",
        rating: 5,
        date: "1 month ago",
        comment: "Highly skilled and compassionate caregiver. Mahathir went above and beyond in providing care for my father. His cooking skills are an added bonus - dad loves the traditional meals he prepares!"
      },
      {
        id: 3,
        reviewerName: "Linda K.",
        rating: 4,
        date: "2 months ago",
        comment: "Very professional and reliable. Mahathir is excellent with mobility assistance and personal care. My only minor note is that he can sometimes run a few minutes late, but he always communicates ahead of time."
      }
    ],
  },
  {
    id: 7,
    name: "Yufei T.",
    photo: "/images/demo-mock-avatars/Yufei.png",
    video: "/videos/mock-video-bios/Yufei.MOV",
    rating: 4.7,
    experience: "3+ years specializing in nursing",
    distance: "2.1 km",
    hourlyRate: 50,
    bio: "As a Licensed Practical Nurse, I'm focused on delivering high-quality care, especially for clients needing post-surgical support and rehabilitation. I'm dedicated to helping patients recover smoothly and quickly, and I enjoy leveraging my language skills to connect with diverse families. In my spare time, I love hiking and photography—capturing the beauty in nature helps me bring a calm and observant presence to my work.",
    languages: ["English", "Mandarin", "Chinese"],
    skills: [
      "Medical Care",
      "Physical Therapy",
      "Wound Care",
      "Rehabilitation Support",
    ],
    availability: "Available weekdays",
    pastExperience: [
      ["Sunrise Clinic", "Licensed Practical Nurse", "2023 ~ Present"],
      ["Willow Creek Nursing Home", "Caregiver Assistant", "2021 ~ 2023"],
    ],
    reviews: [
      {
        id: 1,
        reviewerName: "Chen W.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Yufei's post-surgical care for my husband was exceptional. Her wound care expertise and gentle approach made his recovery much easier. Being able to communicate in Mandarin was also incredibly helpful for our family."
      },
      {
        id: 2,
        reviewerName: "Patricia M.",
        rating: 5,
        date: "1 month ago",
        comment: "Outstanding rehabilitation support! Yufei is patient, knowledgeable, and really knows her stuff. My mother's mobility has improved significantly under her care."
      },
      {
        id: 3,
        reviewerName: "James L.",
        rating: 4,
        date: "2 months ago",
        comment: "Very competent nurse with great technical skills. Yufei is professional and caring. Would definitely recommend her services."
      }
    ],
  },
  {
    id: 8,
    name: "Jed W.",
    photo: "/images/demo-mock-avatars/Jed.png",
    video: "/videos/mock-video-bios/Jed.mp4",
    rating: 4.8,
    experience: "6+ years in dementia care",
    pastExperience: [
      ["St. Mary's Hospital", "Registered Nurse (Australia)", "2019 ~ Present"],
      [
        "Local Community Health Center",
        "Home Care Assistant (Malaysia)",
        "2015 ~ 2019",
      ],
    ],
    distance: "1.8 km",
    hourlyRate: 53,
    bio: "I have over six years of experience as a Registered Nurse, with a special focus on dementia and Alzheimer's care. My approach is built on genuine patience and compassion, helping clients feel safe and understood through specialized behavioral support and engaging memory activities. I enjoy playing guitar; these creative outlets help me practice patience and attention to detail.",
    languages: ["English", "Malay", "Cantonese", "Mandarin", "Chinese"],
    skills: [
      "Dementia Care",
      "Behavioral Support",
      "Memory Activities",
      "Family Communication",
    ],
    availability: "Flexible schedule",
    reviews: [
      {
        id: 1,
        reviewerName: "Susan H.",
        rating: 5,
        date: "1 week ago",
        comment: "Jed has been a godsend for our family. His expertise in dementia care and his musical talents have brought so much joy to my mother. She's calmer and happier when he's around. Cannot recommend him enough!"
      },
      {
        id: 2,
        reviewerName: "David R.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Exceptional caregiver with a special gift for working with Alzheimer's patients. Jed's patience is remarkable, and his memory activities have really helped keep dad engaged. His multilingual abilities are also a huge plus."
      },
      {
        id: 3,
        reviewerName: "Emily C.",
        rating: 5,
        date: "1 month ago",
        comment: "Professional, compassionate, and incredibly skilled. Jed understands the challenges of dementia care and communicates so well with the family. We trust him completely with our loved one."
      }
    ],
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
    bio: "I am a Disability Support Worker with a passion for helping clients achieve maximum independence. For the past four years, I've focused on personal growth, safe transportation, and encouraging social inclusion to support a fulfilling and active life. My goal is always to empower the people I work with. On weekends, I'm an avid amateur soccer player, and I find that teamwork and determination on the field translate well to providing dedicated support.",
    languages: ["English", "Indonesian"],
    skills: [
      "Disability Support",
      "Independent Living",
      "Transportation",
      "Social Activities",
    ],
    availability: "Monday to Friday",
    pastExperience: [
      ["Green Valley Care", "Disability Support Worker", "2021 ~ Present"],
      ["Community Outreach Program", "Volunteer Support Guide", "2020 ~ 2021"],
    ],
    reviews: [
      {
        id: 1,
        reviewerName: "Karen B.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Muhammad has been wonderful in supporting my son's independence goals. His positive energy and dedication to social inclusion have made a real difference. He's reliable with transportation and always encourages active participation in community activities."
      },
      {
        id: 2,
        reviewerName: "Thomas G.",
        rating: 5,
        date: "1 month ago",
        comment: "Fantastic disability support worker! Muhammad's approach is empowering rather than enabling. He genuinely cares about helping people live their best lives independently."
      },
      {
        id: 3,
        reviewerName: "Rachel P.",
        rating: 4,
        date: "2 months ago",
        comment: "Very supportive and encouraging caregiver. Muhammad is great at building confidence and promoting independence. My daughter enjoys working with him."
      }
    ],
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
    bio: "I am a Palliative Care Specialist committed to providing comfort, dignity, and peace during end-of-life journeys. With six years of experience, I offer expert pain management, emotional support for clients, and sensitive family counseling, integrating spiritual care as needed. I believe in holistic care that respects individual wishes. My passion outside of work is classical music; playing the cello helps me cultivate the serenity and deep listening skills essential for my professional role.",
    languages: ["English", "Cantonese", "Mandarin", "Chinese"],
    skills: [
      "Palliative Care",
      "Pain Management",
      "Family Support",
      "Spiritual Care",
    ],
    availability: "Available 6 days a week",
    pastExperience: [
      ["Harmony Hospice", "Palliative Care Nurse", "2019 ~ Present"],
      [
        "St. Jude's Home Care Services",
        "End-of-Life Support Specialist",
        "2017 ~ 2019",
      ],
    ],
    reviews: [
      {
        id: 1,
        reviewerName: "Victoria L.",
        rating: 5,
        date: "4 days ago",
        comment: "Dennis provided the most compassionate end-of-life care for my father. His expertise in pain management and his gentle, respectful approach gave our family peace during a difficult time. His musical background brought unexpected moments of tranquility."
      },
      {
        id: 2,
        reviewerName: "Michael K.",
        rating: 5,
        date: "2 weeks ago",
        comment: "An exceptional palliative care specialist. Dennis's holistic approach honored my mother's wishes perfectly. He provided not just medical care but emotional and spiritual support for the whole family. We're forever grateful."
      },
      {
        id: 3,
        reviewerName: "Jennifer W.",
        rating: 5,
        date: "1 month ago",
        comment: "Dennis is a truly special caregiver with a rare combination of medical expertise and deep compassion. His multilingual skills helped us communicate with all family members, and his presence brought comfort during the hardest time."
      }
    ],
  },
];

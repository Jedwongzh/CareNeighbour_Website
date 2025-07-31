"use client"

import { useState, useEffect, useRef, type JSX } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  Mic,
  MicOff,
  Globe,
  MessageSquare,
  MapPin,
  Clock,
  Check,
  Edit,
  Search,
  User,
  Heart,
  Calendar,
  Home,
  Loader2,
  Star,
  X,
  RefreshCw,
  LogOut, // Icon for Exit button
  // Added some potentially relevant icons for background commands
  Pill,
  Users,
  Thermometer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// ** REVISED: Dummy caregiver profiles with translations **
const caregiverProfiles = [
  {
    id: 1,
    name: "Sarah Thompson",
    photo: "/images/caregivers/sarah.jpg",
    rating: 4.9,
    experience: "7+ years in aged care",
    distance: "1.2 miles away",
    hourlyRate: 28,
    bio: "Certified nurse assistant specializing in medication management and personal care. I'm passionate about helping seniors maintain their independence.",
    languages: ["English", "Spanish"],
    skills: ["Medication Management", "Personal Care", "Meal Preparation", "Mobility Assistance"],
    translations: {
      es: {
        bio: "Asistente de enfermería certificada especializada en manejo de medicamentos y cuidado personal. Me apasiona ayudar a las personas mayores a mantener su independencia.",
        skills: ["Manejo de Medicamentos", "Cuidado Personal", "Preparación de Comidas", "Asistencia de Movilidad"],
        experience: "Más de 7 años en cuidado de ancianos",
      },
      fr: {
        bio: "Aide-soignante certifiée spécialisée dans la gestion des médicaments et les soins personnels. Je suis passionnée par l'aide aux seniors pour maintenir leur indépendance.",
        skills: ["Gestion Médicaments", "Soins Personnels", "Préparation Repas", "Aide Mobilité"],
        experience: "7+ ans en soins aux personnes âgées",
      },
      zh: {
        bio: "认证护士助理，专门从事药物管理和个人护理。我热衷于帮助老年人保持独立。",
        skills: ["药物管理", "个人护理", "膳食准备", "行动协助"],
        experience: "7年以上老年护理经验",
      },
      vi: {
        bio: "Sarah là một trợ lý y tá được chứng nhận với hơn 7 năm kinh nghiệm trong lĩnh vực chăm sóc người cao tuổi. Cô ấy chuyên về quản lý thuốc và chăm sóc cá nhân, với niềm đam mê giúp người cao tuổi duy trì sự độc lập.",
        skills: ["Quản lý thuốc", "Chăm sóc cá nhân", "Chuẩn bị bữa ăn", "Hỗ trợ di chuyển"],
        experience: "Hơn 7 năm kinh nghiệm trong lĩnh vực chăm sóc người cao tuổi",
      },
    },
  },
  {
    id: 2,
    name: "Michael Reed",
    photo: "/images/caregivers/michael.jpg",
    rating: 4.7,
    experience: "5+ years as a registered nurse",
    distance: "2.5 miles away",
    hourlyRate: 35,
    bio: "Registered nurse with experience in post-surgery care and chronic condition management. I provide compassionate care with a focus on health education.",
    languages: ["English"],
    skills: ["Medical Care", "Wound Care", "Vital Monitoring", "Injections"],
    translations: {
      es: {
        bio: "Enfermero registrado con experiencia en cuidados postquirúrgicos y manejo de condiciones crónicas. Brindo atención compasiva con enfoque en la educación para la salud.",
        skills: ["Atención Médica", "Cuidado de Heridas", "Monitoreo Vital", "Inyecciones"],
        experience: "Más de 5 años como enfermero registrado",
      },
      fr: {
        bio: "Infirmier diplômé avec expérience en soins post-chirurgicaux et gestion des maladies chroniques. Je fournis des soins compatissants axés sur l'éducation à la santé.",
        skills: ["Soins Médicaux", "Soins Plaies", "Surveillance Vitals", "Injections"],
        experience: "5+ ans comme infirmier diplômé",
      },
      zh: {
        bio: "注册护士，具有术后护理和慢性病管理经验。我提供富有同情心的护理，并注重健康教育。",
        skills: ["医疗护理", "伤口护理", "生命体征监测", "注射"],
        experience: "5年以上注册护士经验",
      },
      vi: {
        bio: "Michael là một y tá đã đăng ký với hơn 5 năm kinh nghiệm trong việc chăm sóc sau phẫu thuật và quản lý các bệnh mãn tính. Anh ấy cung cấp dịch vụ chăm sóc tận tâm với trọng tâm là giáo dục sức khỏe.",
        skills: ["Chăm sóc y tế", "Chăm sóc vết thương", "Theo dõi dấu hiệu sinh tồn", "Tiêm"],
        experience: "Hơn 5 năm kinh nghiệm làm y tá đã đăng ký",
      },
    },
  },
  {
    id: 3,
    name: "Emily Johnson",
    photo: "/images/caregivers/emily.jpg",
    rating: 4.8,
    experience: "6+ years in home care",
    distance: "1.8 miles away",
    hourlyRate: 30,
    bio: "Home care specialist with expertise in dementia care and companionship. I strive to create a safe and nurturing environment for my clients.",
    languages: ["English", "French"],
    skills: ["Dementia Care", "Companionship", "Light Housekeeping", "Meal Preparation"],
    translations: {
      es: {
        bio: "Especialista en cuidado en el hogar con experiencia en cuidado de la demencia y compañía. Me esfuerzo por crear un entorno seguro y acogedor para mis clientes.",
        skills: ["Cuidado de Demencia", "Compañía", "Limpieza Ligera", "Preparación de Comidas"],
        experience: "Más de 6 años en cuidado en el hogar",
      },
      fr: {
        bio: "Spécialiste des soins à domicile avec expertise en soins de la démence et compagnie. Je m'efforce de créer un environnement sûr et chaleureux pour mes clients.",
        skills: ["Soins Démence", "Compagnie", "Entretien Léger", "Préparation Repas"],
        experience: "6+ ans en soins à domicile",
      },
      zh: {
        bio: "家庭护理专家，擅长痴呆症护理和陪伴。我努力为客户创造一个安全和有爱的环境。",
        skills: ["痴呆症护理", "陪伴", "轻度家务", "膳食准备"],
        experience: "6年以上家庭护理经验",
      },
      vi: {
        bio: "Emily là một chuyên gia chăm sóc tại nhà với hơn 6 năm kinh nghiệm trong việc chăm sóc sa sút trí tuệ và đồng hành. Cô ấy luôn cố gắng tạo ra một môi trường an toàn và nuôi dưỡng cho khách hàng của mình.",
        skills: ["Chăm sóc sa sút trí tuệ", "Đồng hành", "Dọn dẹp nhẹ", "Chuẩn bị bữa ăn"],
        experience: "Hơn 6 năm kinh nghiệm trong chăm sóc tại nhà",
      },
    },
  },
  {
    id: 4,
    name: "David Lee",
    photo: "/images/caregivers/david.jpg",
    rating: 4.6,
    experience: "4+ years in physical therapy",
    distance: "2.0 miles away",
    hourlyRate: 33,
    bio: "Physical therapy assistant with a focus on mobility assistance and post-surgery recovery. I enjoy helping clients regain their strength and confidence.",
    languages: ["English", "Mandarin"],
    skills: ["Physical Therapy", "Mobility Assistance", "Post-Surgery Recovery", "Exercise Planning"],
    translations: {
      es: {
        bio: "Asistente de terapia física con enfoque en asistencia de movilidad y recuperación postquirúrgica. Disfruto ayudando a los clientes a recuperar su fuerza y confianza.",
        skills: [
          "Terapia Física",
          "Asistencia de Movilidad",
          "Recuperación Postquirúrgica",
          "Planificación de Ejercicios",
        ],
        experience: "Más de 4 años en terapia física",
      },
      fr: {
        bio: "Assistant en physiothérapie spécialisé dans l'assistance à la mobilité et la récupération post-chirurgicale. J'aime aider les clients à retrouver leur force et leur confiance.",
        skills: ["Physiothérapie", "Aide Mobilité", "Récupération Post-Chirurgicale", "Planification Exercices"],
        experience: "4+ ans en physiothérapie",
      },
      zh: {
        bio: "物理治疗助理，专注于行动协助和术后恢复。我喜欢帮助客户恢复力量和信心。",
        skills: ["物理治疗", "行动协助", "术后恢复", "锻炼计划"],
        experience: "4年以上物理治疗经验",
      },
      vi: {
        bio: "David là một trợ lý vật lý trị liệu với hơn 4 năm kinh nghiệm tập trung vào hỗ trợ di chuyển và phục hồi sau phẫu thuật. Anh ấy thích giúp khách hàng lấy lại sức mạnh và sự tự tin.",
        skills: ["Vật lý trị liệu", "Hỗ trợ di chuyển", "Phục hồi sau phẫu thuật", "Lập kế hoạch tập luyện"],
        experience: "Hơn 4 năm kinh nghiệm trong vật lý trị liệu",
      },
    },
  },
  {
    id: 5,
    name: "Priya Sharma",
    photo: "/images/caregivers/priya.jpg",
    rating: 4.9,
    experience: "8+ years in elder care",
    distance: "3.5 miles away",
    hourlyRate: 32,
    bio: "Experienced elder care specialist with a nursing background. I provide holistic care with attention to both physical and emotional wellbeing.",
    languages: ["English", "Hindi", "Punjabi"],
    skills: ["Medication Management", "Dementia Care", "Cooking", "Companionship"],
    translations: {
      es: {
        bio: "Especialista experimentada en cuidado de ancianos con experiencia en enfermería. Brindo atención integral prestando atención al bienestar físico y emocional.",
        skills: ["Manejo Medicamentos", "Cuidado Demencia", "Cocina", "Compañía"],
        experience: "Más de 8 años en cuidado de ancianos",
      },
      fr: {
        bio: "Spécialiste expérimentée en soins aux personnes âgées avec une formation en soins infirmiers. Je fournis des soins holistiques en prêtant attention au bien-être physique et émotionnel.",
        skills: ["Gestion Médicaments", "Soins Démence", "Cuisine", "Compagnie"],
        experience: "8+ ans en soins aux aînés",
      },
      zh: {
        bio: "经验丰富的养老专家，具有护理背景。我提供全面的护理，关注身心健康。",
        skills: ["药物管理", "痴呆症护理", "烹饪", "陪伴"],
        experience: "8年以上老年护理经验",
      },
      vi: {
        bio: "Priya là một chuyên gia chăm sóc người cao tuổi giàu kinh nghiệm với nền tảng điều dưỡng. Cô ấy cung cấp dịch vụ chăm sóc toàn diện với sự chú ý đến cả sức khỏe thể chất và tinh thần.",
        skills: ["Quản lý thuốc", "Chăm sóc sa sút trí tuệ", "Nấu ăn", "Đồng hành"],
        experience: "Hơn 8 năm kinh nghiệm trong chăm sóc người cao tuổi",
      },
    },
  },
]

// Placeholder images (unchanged)
const placeholderImages = {
  "/images/caregivers/sarah.jpg": "/images/caregivers/sarah.jpg",
  "/images/caregivers/michael.jpg": "/images/caregivers/michael.jpg",
  "/images/caregivers/emily.jpg": "/images/caregivers/emily.jpg",
  "/images/caregivers/david.jpg": "/images/caregivers/david.jpg",
  "/images/caregivers/priya.jpg": "/images/caregivers/priya.jpg",
}

// ** REVISED: Translations object with sample transcript and background commands **
const translations = {
  en: {
    title: "App Demo",
    subtitle: "Experience CareNeighbour",
    description: "See how our app works to connect you with qualified caregivers in your neighborhood",
    voicePrompt: "How can we help you today?",
    recordingStatus: "Listening...",
    processingStatus: "Processing your request...",
    sampleTranscript:
      "I need someone to help my mother with medication management and light housekeeping twice a week.",
    aiSummary: "Based on your request, you need:",
    careType: "Personal Care & Assistance",
    details: [
      "Medication management and reminders",
      "Light housekeeping and home organization",
      "Twice weekly care schedule",
    ],
    editRequest: "Edit request details",
    findCaregivers: "Find Caregivers",
    searchingCaregivers: "Searching for caregivers near you...",
    caregiverFound: "We found caregivers available now!",
    swipeInstructions: "Swipe right to select, left to skip",
    regenerate: "Show more caregivers",
    bookNow: "Book Now",
    trackingTitle: "Tracking Your Caregiver",
    trackingStatus: "Sarah is on the way - ETA: 10 minutes",
    caregiverArrived: "Sarah has arrived!",
    completeBooking: "Complete Booking",
    tryAgain: "Try Again",
    exitDemo: "Exit demo", // Added
    backgroundCommands: [
      // Added more diverse terms
      "Book a caregiver",
      "Medication reminder",
      "Find help nearby",
      "Schedule appointment",
      "Personal care needed",
      "Companionship",
      "Check availability",
      "Light housekeeping",
      "Mobility assistance",
      "Transport to doctor",
      "Meal preparation",
      "Post-surgery care",
      "Elderly care",
      "Disability support",
      "Check my schedule",
      "Grocery shopping",
      "Respite care",
      "Check vitals",
      "Wound dressing",
      "Physical therapy exercise",
      "Emergency contact",
    ],
  },
  es: {
    title: "Demostración de la Aplicación",
    subtitle: "Experimenta CareNeighbour",
    description: "Vea cómo funciona nuestra aplicación para conectarlo con cuidadores calificados en su vecindario",
    voicePrompt: "¿Cómo podemos ayudarte hoy?",
    recordingStatus: "Escuchando...",
    processingStatus: "Procesando tu solicitud...",
    sampleTranscript:
      "Necesito a alguien que ayude a mi madre con la gestión de medicamentos y la limpieza ligera dos veces por semana.",
    aiSummary: "Según tu solicitud, necesitas:",
    careType: "Cuidado Personal y Asistencia",
    details: [
      "Gestión y recordatorios de medicamentos",
      "Limpieza ligera y organización del hogar",
      "Horario de cuidado dos veces por semana",
    ],
    editRequest: "Editar detalles de la solicitud",
    findCaregivers: "Encontrar Cuidadores",
    searchingCaregivers: "Buscando cuidadores cerca de ti...",
    caregiverFound: "¡Encontramos cuidadores disponibles ahora!",
    swipeInstructions: "Desliza a la derecha para seleccionar, a la izquierda para omitir",
    regenerate: "Mostrar más cuidadores",
    bookNow: "Reservar Ahora",
    trackingTitle: "Rastreando a Tu Cuidador",
    trackingStatus: "Sarah está en camino - ETA: 10 minutos",
    caregiverArrived: "¡Sarah ha llegado!",
    completeBooking: "Completar Reserva",
    tryAgain: "Intentar de Nuevo",
    exitDemo: "Salir demo", // Added
    backgroundCommands: [
      // Added more diverse terms
      "Reservar cuidador",
      "Recordatorio medicación",
      "Buscar ayuda cerca",
      "Agendar cita",
      "Necesito cuidado personal",
      "Compañía",
      "Verificar disponibilidad",
      "Limpieza ligera",
      "Asistencia movilidad",
      "Transporte al médico",
      "Preparación comidas",
      "Cuidado post-cirugía",
      "Cuidado ancianos",
      "Apoyo discapacidad",
      "Revisar mi horario",
      "Compras supermercado",
      "Cuidado de respiro",
      "Revisar vitales",
      "Curación de heridas",
      "Ejercicio fisioterapia",
      "Contacto emergencia",
    ],
  },
  fr: {
    title: "Démo de l'Application",
    subtitle: "Découvrez CareNeighbour",
    description: "Découvrez comment notre application vous connecte avec des soignants qualifiés dans votre quartier",
    voicePrompt: "Comment pouvons-nous vous aider aujourd'hui?",
    recordingStatus: "Écoute...",
    processingStatus: "Traitement de votre demande...",
    sampleTranscript:
      "J'ai besoin de quelqu'un pour aider ma mère avec la gestion des médicaments et le ménage léger deux fois par semaine.",
    aiSummary: "Selon votre demande, vous avez besoin de:",
    careType: "Soins Personnels et Assistance",
    details: [
      "Gestion et rappels de médicaments",
      "Ménage léger et organisation de la maison",
      "Horaire de soins deux fois par semaine",
    ],
    editRequest: "Modifier les détails de la demande",
    findCaregivers: "Trouver des Soignants",
    searchingCaregivers: "Recherche de soignants près de chez vous...",
    caregiverFound: "Nous avons trouvé des soignants disponibles maintenant!",
    swipeInstructions: "Glissez à droite pour sélectionner, à gauche pour passer",
    regenerate: "Afficher plus de soignants",
    bookNow: "Réserver Maintenant",
    trackingTitle: "Suivi de Votre Soignant",
    trackingStatus: "Sarah est en route - ETA: 10 minutes",
    caregiverArrived: "Sarah est arrivée!",
    completeBooking: "Terminer la Réservation",
    tryAgain: "Réessayer",
    exitDemo: "Quitter démo", // Added
    backgroundCommands: [
      // Added more diverse terms
      "Réserver soignant",
      "Rappel médicaments",
      "Trouver aide proche",
      "Planifier rendez-vous",
      "Besoin soins personnels",
      "Compagnie",
      "Vérifier disponibilité",
      "Ménage léger",
      "Aide mobilité",
      "Transport médecin",
      "Préparation repas",
      "Soins post-opératoires",
      "Soins personnes âgées",
      "Soutien handicap",
      "Consulter mon horaire",
      "Faire les courses",
      "Soins de répit",
      "Vérifier constantes vitales",
      "Pansement plaie",
      "Exercice physiothérapie",
      "Contact urgence",
    ],
  },
  de: {
    title: "App-Demo",
    subtitle: "Erleben Sie CareNeighbour",
    description: "Sehen Sie, wie unsere App Sie mit qualifizierten Pflegekräften in Ihrer Nachbarschaft verbindet",
    voicePrompt: "Wie können wir Ihnen heute helfen?",
    recordingStatus: "Hören...",
    processingStatus: "Verarbeitung Ihrer Anfrage...",
    sampleTranscript:
      "Ich brauche jemanden, der meiner Mutter zweimal pro Woche bei der Medikamentenverwaltung und leichten Hausarbeiten hilft.",
    aiSummary: "Basierend auf Ihrer Anfrage benötigen Sie:",
    careType: "Persönliche Pflege und Unterstützung",
    details: [
      "Medikamentenmanagement und Erinnerungen",
      "Leichte Haushaltsführung und Organisation",
      "Pflegeplan zweimal wöchentlich",
    ],
    editRequest: "Anfragedetails bearbeiten",
    findCaregivers: "Pflegekräfte finden",
    searchingCaregivers: "Suche nach Pflegekräften in Ihrer Nähe...",
    caregiverFound: "Wir haben Pflegekräfte gefunden, die jetzt verfügbar sind!",
    swipeInstructions: "Wischen Sie nach rechts, um auszuwählen, nach links, um zu überspringen",
    regenerate: "Zeigen Sie mehr Pflegekräfte",
    bookNow: "Jetzt buchen",
    trackingTitle: "Verfolgung Ihrer Pflegekraft",
    trackingStatus: "Sarah ist unterwegs - ETA: 10 Minuten",
    caregiverArrived: "Sarah ist angekommen!",
    completeBooking: "Buchung abschließen",
    tryAgain: "Erneut versuchen",
    exitDemo: "Demo beenden", // Added
    backgroundCommands: [
      // Added more diverse terms
      "Pflegekraft buchen",
      "Medikamentenerinnerung",
      "Hilfe in der Nähe finden",
      "Termin vereinbaren",
      "Persönliche Pflege benötigt",
      "Gesellschaft",
      "Verfügbarkeit prüfen",
      "Leichte Hausarbeit",
      "Mobilitätshilfe",
      "Transport zum Arzt",
      "Essenszubereitung",
      "Pflege nach OP",
      "Altenpflege",
      "Behindertenunterstützung",
      "Meinen Zeitplan prüfen",
      "Lebensmitteleinkauf",
      "Verhinderungspflege",
      "Vitalwerte prüfen",
      "Wundverband",
      "Physiotherapie-Übung",
      "Notfallkontakt",
    ],
  },
  // ... (Add zh, ja, ar, hi similarly with diverse terms) ...
  zh: {
    title: "应用演示",
    subtitle: "体验 CareNeighbour",
    description: "了解我们的应用程序如何将您与您附近的合格护理人员联系起来",
    voicePrompt: "今天我们能帮您什么？",
    recordingStatus: "正在听...",
    processingStatus: "正在处理您的请求...",
    sampleTranscript: "我需要有人每周两次帮助我母亲进行药物管理和轻度家政服务。",
    aiSummary: "根据您的要求，您需要：",
    careType: "个人护理与协助",
    details: ["药物管理和提醒", "轻度家政和家庭整理", "每周两次护理安排"],
    editRequest: "编辑请求详情",
    findCaregivers: "寻找护理员",
    searchingCaregivers: "正在搜索您附近的护理员...",
    caregiverFound: "我们找到了现在可用的护理员！",
    swipeInstructions: "向右滑动选择，向左滑动跳过",
    regenerate: "显示更多护理员",
    bookNow: "立即预订",
    trackingTitle: "追踪您的护理员",
    trackingStatus: "Sarah 正在路上 - 预计到达时间: 10 分钟",
    caregiverArrived: "Sarah 已到达！",
    completeBooking: "完成预订",
    tryAgain: "再试一次",
    exitDemo: "退出演示",
    backgroundCommands: [
      "预订护理员",
      "用药提醒",
      "查找附近帮助",
      "安排预约",
      "需要个人护理",
      "陪伴",
      "检查可用性",
      "轻度家政",
      "行动协助",
      "送医",
      "膳食准备",
      "术后护理",
      "老年护理",
      "残疾支持",
      "检查我的日程",
      "购买食品",
      "临时护理",
      "检查生命体征",
      "伤口敷料",
      "物理治疗运动",
      "紧急联系人",
    ],
  },
  // ** Added Vietnamese translation placeholders **
  vi: {
    title: "Bản Demo Ứng Dụng",
    subtitle: "Trải nghiệm CareNeighbour",
    description:
      "Xem cách ứng dụng của chúng tôi kết nối bạn với những người chăm sóc đủ tiêu chuẩn trong khu phố của bạn",
    voicePrompt: "Hôm nay chúng tôi có thể giúp gì cho bạn?",
    recordingStatus: "Đang nghe...",
    processingStatus: "Đang xử lý yêu cầu của bạn...",
    sampleTranscript: "Tôi cần người giúp mẹ tôi quản lý thuốc và làm việc nhà nhẹ nhàng hai lần một tuần.",
    aiSummary: "Dựa trên yêu cầu của bạn, bạn cần:",
    careType: "Chăm sóc Cá nhân & Hỗ trợ",
    details: ["Quản lý và nhắc nhở thuốc", "Việc nhà nhẹ nhàng và sắp xếp nhà cửa", "Lịch chăm sóc hai lần mỗi tuần"],
    editRequest: "Chỉnh sửa chi tiết yêu cầu",
    findCaregivers: "Tìm Người Chăm Sóc",
    searchingCaregivers: "Đang tìm người chăm sóc gần bạn...",
    caregiverFound: "Chúng tôi đã tìm thấy người chăm sóc có sẵn ngay bây giờ!",
    swipeInstructions: "Vuốt sang phải để chọn, sang trái để bỏ qua",
    regenerate: "Hiển thị thêm người chăm sóc",
    bookNow: "Đặt Ngay",
    trackingTitle: "Theo dõi Người Chăm Sóc Của Bạn",
    trackingStatus: "Sarah đang trên đường - ETA: 10 phút",
    caregiverArrived: "Sarah đã đến!",
    completeBooking: "Hoàn Tất Đặt Lịch",
    tryAgain: "Thử Lại",
    exitDemo: "Thoát demo",
    backgroundCommands: [
      "Đặt người chăm sóc",
      "Nhắc nhở thuốc",
      "Tìm trợ giúp gần đây",
      "Lên lịch hẹn",
      "Cần chăm sóc cá nhân",
      "Bầu bạn",
      "Kiểm tra tình trạng sẵn có",
      "Việc nhà nhẹ",
      "Hỗ trợ di chuyển",
      "Đưa đến bác sĩ",
      "Chuẩn bị bữa ăn",
      "Chăm sóc sau phẫu thuật",
      "Chăm sóc người già",
      "Hỗ trợ người khuyết tật",
      "Kiểm tra lịch trình của tôi",
      "Mua sắm tạp hóa",
      "Chăm sóc thay thế",
      "Kiểm tra dấu hiệu sinh tồn",
      "Thay băng vết thương",
      "Bài tập vật lý trị liệu",
      "Liên hệ khẩn cấp",
    ],
  },
}

// Define icons for background
const backgroundIcons = [
  { icon: Pill, key: "pill" },
  { icon: Users, key: "users" },
  { icon: Thermometer, key: "thermometer" },
  { icon: Heart, key: "heart" },
  { icon: Calendar, key: "calendar" },
]

export default function AppDemoPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [language, setLanguage] = useState("en")
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [caregiverSearching, setCaregiverSearching] = useState(false)
  const [caregiverFound, setCaregiverFound] = useState(false)
  const [trackingStarted, setTrackingStarted] = useState(false)
  const [caregiverArrived, setCaregiverArrived] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; scale: number }[]>([])
  const rippleIdRef = useRef(0)
  const [floatingItems, setFloatingItems] = useState<
    { id: number; x: number; y: number; content: string | JSX.Element; speed: number; opacity: number; size: number }[]
  >([])
  const floatingItemIdRef = useRef(0)
  const animationFrameIdRef = useRef<number | null>(null) // Ref to store animation frame ID
  const [currentCaregiverIndex, setCurrentCaregiverIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<null | "left" | "right">(null)
  const [selectedCaregiver, setSelectedCaregiver] = useState<(typeof caregiverProfiles)[0] | null>(null)
  const [transcriptWords, setTranscriptWords] = useState<string[]>([]) // Can hold words or characters
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "zh", name: "中文" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    // { code: "ja", name: "日本語" },
    // { code: "ar", name: "العربية" },
    // { code: "hi", name: "हिन्दी" },
  ] // Trimmed for brevity, add back if full translations are provided

  const t = translations[language as keyof typeof translations] || translations.en

  // Function to start the recording simulation and set language-specific transcript
  const startRecording = () => {
    if (isProcessing || isTyping) return
    setIsRecording(true)
    // Set the transcript words/chars based on the *current* language's sample
    const currentSampleTranscript = t.sampleTranscript || translations.en.sampleTranscript

    // ** Split by character for Chinese, otherwise by space **
    const splitBy = language === "zh" ? "" : " "
    setTranscriptWords(currentSampleTranscript.split(splitBy))

    setCurrentWordIndex(0)
    setTranscript("") // Clear previous transcript
  }

  // ** REVISED: Generate floating items based on current language (with icons) **
  useEffect(() => {
    const currentBgCommands = t.backgroundCommands || translations.en.backgroundCommands

    // Function to create a new item (text or icon)
    const createFloatingItem = (startY?: number) => {
      let content: string | JSX.Element
      let size: number
      // ~20% chance of showing an icon instead of text
      if (Math.random() < 0.2) {
        const randomIcon = backgroundIcons[Math.floor(Math.random() * backgroundIcons.length)]
        const IconComponent = randomIcon.icon
        content = <IconComponent key={randomIcon.key} className="h-4 w-4" />
        size = Math.random() * 6 + 18 // Slightly larger base size for icons (18-24px)
      } else {
        content = currentBgCommands[Math.floor(Math.random() * currentBgCommands.length)]
        size = Math.random() * 5 + 11 // Text size (11-16px)
      }

      return {
        id: floatingItemIdRef.current++,
        x: Math.random() * 90 + 5, // 5-95% width
        y: startY !== undefined ? startY : Math.random() * 90 + 5, // 5-95% height if no startY
        content: content,
        speed: Math.random() * 0.3 + 0.1, // Slower speed
        opacity: Math.random() * 0.3 + 0.15, // Slightly higher base opacity (15-45%)
        size: size, // Use determined size
      }
    }

    // Only run animation on step 0
    if (currentStep === 0) {
      // Initial items
      const initialItems = Array.from({ length: 25 }, () => createFloatingItem()) // Increased initial count slightly
      setFloatingItems(initialItems)

      // Add new items periodically from the bottom
      const interval = setInterval(() => {
        const newItem = createFloatingItem(110) // Start from below screen
        setFloatingItems((prev) => {
          const updated = [...prev, newItem]
          // Keep a max number of items
          return updated.length > 30 ? updated.slice(updated.length - 30) : updated // Keep up to 30
        })
      }, 3000) // Add items slightly faster

      // Animation loop
      function animateItems() {
        setFloatingItems((prev) =>
          prev.map((item) => {
            const newY = item.y - item.speed * 0.1 // Adjust speed factor if needed
            return {
              ...item,
              y: newY < -10 ? 110 : newY, // Reset position if it goes off screen
              // Optionally reset X when wrapping
              ...(newY < -10 ? { x: Math.random() * 90 + 5 } : {}),
            }
          }),
        )
        animationFrameIdRef.current = requestAnimationFrame(animateItems) // Continue animation loop, store ID
      }
      animationFrameIdRef.current = requestAnimationFrame(animateItems) // Start the loop

      // Cleanup function
      return () => {
        clearInterval(interval)
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current) // Use stored ID
        }
        // console.log("Cleared background animation for step 0");
      }
    } else {
      // Clear items when moving away from step 0
      setFloatingItems([])
      // Ensure animation frame is cancelled if step changes quickly
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
    // ** Add t.backgroundCommands to dependency array **
  }, [currentStep, language, t.backgroundCommands])

  // Recording ripple effect (unchanged from original logic)
  useEffect(() => {
    if (isRecording) {
      const rippleInterval = setInterval(() => {
        const newRipple = { id: rippleIdRef.current++, scale: 1 }
        setRipples((prev) => [...prev, newRipple])
      }, 1200)

      // Start typing effect *after* setting transcript words in startRecording
      setIsTyping(true)

      return () => clearInterval(rippleInterval)
    } else {
      // Stop typing if recording stops manually (before completion)
      // setIsTyping(false); // Typing stops itself on completion
    }
  }, [isRecording])

  // Typing effect (depends on transcriptWords set by startRecording)
  useEffect(() => {
    if (isTyping && currentWordIndex < transcriptWords.length) {
      const typingInterval = setInterval(() => {
        setCurrentWordIndex((prev) => {
          const newIndex = prev + 1
          // ** Join with empty string for Chinese, space otherwise **
          const joinBy = language === "zh" ? "" : " "
          setTranscript(transcriptWords.slice(0, newIndex).join(joinBy))
          if (newIndex >= transcriptWords.length) {
            setIsTyping(false)
            setIsRecording(false) // Stop recording animation
            clearInterval(typingInterval)
            // Automatically move to processing
            setTimeout(() => {
              // Check step again in case user navigated away quickly
              if (currentStep === 0 && !isProcessing) {
                processRequest()
              }
            }, 800)
          }
          return newIndex
        })
      }, 150) // Adjusted typing speed

      return () => clearInterval(typingInterval)
    } else if (!isTyping) {
      // If typing stopped abruptly or finished, ensure recording state is false
      if (isRecording) setIsRecording(false)
    }
    // ** Add language to dependency array to handle joining correctly **
  }, [isTyping, currentWordIndex, transcriptWords, currentStep, isProcessing, language]) // Added isProcessing dependency

  // Remove ripples (unchanged)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples((prev) => prev.slice(1))
      }
    }, 2500) // Ripple duration
    return () => clearTimeout(timeout)
  }, [ripples])

  // Process request (unchanged logic, timing adjusted)
  const processRequest = () => {
    if (isProcessing) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep(1)
    }, 2000)
  }

  // Find caregivers (unchanged logic, timing adjusted)
  const findCaregivers = () => {
    setCaregiverSearching(true)
    setTimeout(() => {
      setCaregiverSearching(false)
      setCaregiverFound(true)
      setCurrentStep(2)
      setCurrentCaregiverIndex(0)
    }, 2500)
  }

  // Handle swipe (unchanged)
  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction)
    setTimeout(() => {
      if (direction === "right") {
        setSelectedCaregiver(caregiverProfiles[currentCaregiverIndex])
        bookNow() // Directly proceed to booking/tracking
      } else {
        setCurrentCaregiverIndex((prev) => (prev < caregiverProfiles.length - 1 ? prev + 1 : 0))
      }
      setSwipeDirection(null)
    }, 300)
  }

  // Regenerate caregivers (unchanged)
  const regenerateCaregivers = () => {
    setCurrentCaregiverIndex(0)
    setCaregiverFound(false)
    setTimeout(() => setCaregiverFound(true), 300)
  }

  // Book now / start tracking (unchanged logic, timing adjusted)
  const bookNow = () => {
    setTrackingStarted(true)
    setCurrentStep(3)

    setTimeout(() => {
      setCaregiverArrived(true)
    }, 6000)
  }

  // Reset demo (unchanged)
  const resetDemo = () => {
    setCurrentStep(0)
    setIsRecording(false)
    setTranscript("")
    setIsProcessing(false)
    setCaregiverSearching(false)
    setCaregiverFound(false)
    setTrackingStarted(false)
    setCaregiverArrived(false)
    setRipples([])
    setCurrentCaregiverIndex(0)
    setSwipeDirection(null)
    setSelectedCaregiver(null)
    setTranscriptWords([])
    setCurrentWordIndex(0)
    setIsTyping(false)
    setFloatingItems([]) // Reset floating items
    // Force re-render slightly later to re-trigger useEffect for floating items
    // setTimeout(() => setCurrentStep(0), 50); // This might cause loop, useEffect dependency on currentStep is enough
  }

  const exitDemo = () => {
    router.push("/") // Navigate to home page
  }

  // Helper to get translated profile data
  const getTranslatedProfileData = (caregiver: (typeof caregiverProfiles)[0]) => {
    const langCode = language as keyof typeof caregiver.translations
    const fallbackLang = "en" // Assuming English is the fallback

    const translated = caregiver.translations?.[langCode]
    const fallback = caregiver // Assuming base object has English data

    return {
      bio: translated?.bio || fallback.bio,
      skills: translated?.skills || fallback.skills,
      experience: translated?.experience || fallback.experience,
      // Keep original non-translated fields
      name: fallback.name,
      photo: fallback.photo,
      rating: fallback.rating,
      distance: fallback.distance,
      hourlyRate: fallback.hourlyRate,
      languages: fallback.languages,
    }
  }

  return (
    // Using global gradient background
    <div className="min-h-screen relative overflow-hidden font-sans"
>
      {/* ** Aesthetic Change: Floating items background - subtle ** */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            // ** Adjusted for smoother animation & distribution **
            className="absolute text-slate-500 flex items-center justify-center text-center whitespace-nowrap select-none" // Added select-none
            initial={{ opacity: 0 }} // Start transparent
            animate={{ opacity: item.opacity }}
            exit={{ opacity: 0 }}
            // Apply position and other styles directly via style prop, driven by state updates from requestAnimationFrame
            style={{
              // Positioning:
              top: `${item.y}%`,
              left: `${item.x}%`,
              transform: `translate(-50%, -50%)`, // Center the item on its x,y coordinate
              // Other styles:
              fontSize: `${item.size}px`,
              padding: typeof item.content === "string" ? "3px 8px" : "5px", // Slightly more padding
              borderRadius: "14px", // More rounded
              backgroundColor: "rgba(255, 255, 255, 0.4)", // Slightly more visible background
              backdropFilter: "blur(3px)", // Slightly more blur
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)", // Subtle shadow
              // Ensure icons inherit text color
              color: "inherit",
            }}
            transition={{ duration: 0.8, ease: "linear" }} // Smooth fade in/out for opacity
          >
            {/* Render content (string or JSX icon) */}
            {item.content}
          </motion.div>
        ))}
      </div>

      {/* ** Header with Exit Button ** */}
      <header className="w-full bg-white/80 backdrop-blur-md fixed top-0 z-20 border-b border-slate-200/70">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={resetDemo} className="mr-2 text-slate-600 hover:bg-slate-100">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-lg text-slate-800">{t.title}</h1>

          {/* Right side elements */}
          <div className="ml-auto flex items-center space-x-3">
            {" "}
            {/* Adjusted spacing */}
            <Globe className="h-5 w-5 text-slate-500" />
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[130px] border-slate-300 text-slate-700 text-sm h-9 focus:ring-purple-400">
                {" "}
                {/* Adjusted focus color */}
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-sm">
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* ** Exit Demo Button ** */}
            <Button
              variant="outline"
              size="sm"
              onClick={exitDemo}
              className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:text-purple-800 h-9"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              {t.exitDemo}
            </Button>
          </div>
        </div>
      </header>

      {/* Ensure main content is above background but below header */}
      <main className="container mx-auto max-w-md px-4 pt-24 pb-16 relative z-10">
        {" "}
        {/* Reduced pb slightly as footer is gone */}
        {/* Step 0: Voice Input */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            // ** Adjusted height slightly if needed, ensure enough space **
            className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-180px)]" // Use min-h for flexibility
          >
            {/* ** BOLD Subtitle ** */}
            <h2 className="text-2xl font-bold text-slate-800 mb-3">{t.subtitle}</h2>
            {/* ** BOLD Voice Prompt ** */}
            <p className="text-slate-500 mb-10 font-bold">{t.voicePrompt}</p>

            {/* Recording Button Area */}
            <div className="relative mb-6 flex flex-col items-center">
              <AnimatePresence>
                {ripples.map((ripple) => (
                  <motion.div
                    key={ripple.id}
                    initial={{ scale: 0.5, opacity: 0.6 }}
                    animate={{ scale: 4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    // ** Aesthetic Change: Purple Ripple **
                    className="absolute inset-0 rounded-full bg-purple-200/70 z-0"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "128px",
                      height: "128px",
                    }}
                  />
                ))}
              </AnimatePresence>

              {/* Recording Button */}
              <motion.button
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ease-out text-white shadow-md hover:shadow-lg ${
                  isRecording
                    ? "bg-gradient-to-br from-red-500 to-red-600"
                    : "bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700" // Purple gradient
                } z-10 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2`}
                onClick={startRecording} // Use the dedicated function
                whileTap={{ scale: isProcessing ? 1 : 0.92 }}
                disabled={isProcessing || isTyping}
              >
                {isRecording || isTyping ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
              </motion.button>
            </div>

            {/* Transcript Display */}
            <AnimatePresence>
              {transcript && (
                <motion.div
                  key="transcript"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  // ** Added margin-top to prevent overlap **
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mt-8 w-full max-w-sm shadow-sm border border-slate-200/70"
                >
                  <p className="text-slate-700 text-center min-h-[40px]">
                    {transcript}
                    {isTyping && <span className="animate-pulse ml-1 text-purple-600">|</span>} {/* Purple cursor */}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Processing Indicator */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center mt-6 text-purple-700" // Purple indicator
                >
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>{t.processingStatus}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {/* Step 1: AI Summary */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-slate-200/70 mb-6 overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <h3 className="text-lg font-semibold text-black mb-4">{t.aiSummary}</h3>

                {/* Purple-themed detail box */}
                <div className="bg-purple-50/50 rounded-lg p-4 mb-6 border border-purple-100">
                  <p className="text-purple-900 font-medium mb-4">{t.careType}</p>
                  <div className="mt-4 pt-4 border-t border-purple-100/80">
                    <h4 className="text-xs font-medium text-slate-500 uppercase mb-3 tracking-wider">Details:</h4>
                    <ul className="space-y-2">
                      {t.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <Check className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" /> {/* Purple check */}
                          <span className="text-slate-700">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mb-3 border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {t.editRequest}
                </Button>

                {/* Purple Find button */}
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={findCaregivers}
                  disabled={caregiverSearching}
                >
                  {caregiverSearching ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {t.searchingCaregivers}
                    </>
                  ) : (
                    <>
                      {t.findCaregivers}
                      <Search className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {/* Step 2: Caregiver Selection */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-5">
              <h3 className="text-xl font-semibold text-black">{t.caregiverFound}</h3>
              <p className="text-sm text-slate-500 mt-1">{t.swipeInstructions}</p>
            </div>

            {/* Caregiver Cards */}
            {/* ** Increased height significantly for card container ** */}
            <div className="relative h-[650px] w-full mb-6">
              {" "}
              {/* Increased height further */}
              {caregiverProfiles.map((caregiver, index) => {
                // Get potentially translated data for the current caregiver
                const displayData = getTranslatedProfileData(caregiver)

                return (
                  <AnimatePresence key={caregiver.id}>
                    {index === currentCaregiverIndex && (
                      <motion.div
                        className="absolute inset-0 bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-lg cursor-grab active:cursor-grabbing flex flex-col" // Added flex flex-col
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          x: swipeDirection === "left" ? -300 : swipeDirection === "right" ? 300 : 0,
                          rotate: swipeDirection === "left" ? -5 : swipeDirection === "right" ? 5 : 0,
                        }}
                        exit={{
                          scale: 0.95,
                          opacity: 0,
                          x: swipeDirection === "left" ? -300 : swipeDirection === "right" ? 300 : 0,
                          rotate: swipeDirection === "left" ? -10 : swipeDirection === "right" ? 10 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.5}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipePower = Math.abs(offset.x) * velocity.x
                          if (swipePower < -10000) {
                            handleSwipe("left")
                          } else if (swipePower > 10000) {
                            handleSwipe("right")
                          }
                        }}
                      >
                        {/* Card Content using displayData */}
                        {/* ** Image container with fixed aspect ratio ** */}
                        <div className="relative w-full aspect-[4/3] bg-slate-100 flex-shrink-0">
                          {" "}
                          {/* Aspect ratio container */}
                          <Image
                            src={
                              placeholderImages[displayData.photo as keyof typeof placeholderImages] ||
                              displayData.photo
                            }
                            alt={displayData.name}
                            fill
                            className="object-cover"
                            priority={index === currentCaregiverIndex}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Added sizes prop for optimization
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h4 className="text-white font-bold text-xl mb-0.5">{displayData.name}</h4>
                            <div className="flex items-center text-white/90 text-sm">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1.5" />
                              <span>{displayData.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* ** Text content area - removed overflow-y-auto ** */}
                        <div className="p-5 space-y-4 flex-grow">
                          {" "}
                          {/* Increased padding, removed overflow */}
                          <div className="flex justify-between items-center">
                            {/* Use translated experience */}
                            <span className="text-purple-700 font-medium text-sm">{displayData.experience}</span>
                            <span className="font-bold text-slate-900 text-lg">
                              ${displayData.hourlyRate}
                              <span className="text-sm font-normal text-slate-500">/hr</span>
                            </span>
                          </div>
                          {/* Use translated bio */}
                          <p className="text-slate-600 text-sm leading-relaxed">{displayData.bio}</p>{" "}
                          {/* Added leading-relaxed */}
                          <div className="flex items-center text-sm text-slate-500">
                            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                            <span>{displayData.distance}</span>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-slate-500 uppercase mb-2 tracking-wider">Skills</h5>{" "}
                            {/* Increased mb */}
                            <div className="flex flex-wrap gap-2">
                              {" "}
                              {/* Increased gap */}
                              {/* Use translated skills */}
                              {displayData.skills.slice(0, 4).map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200"
                                >
                                  {" "}
                                  {/* Increased px */}
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Swipe indicators (unchanged style) */}
                        <motion.div
                          className="absolute top-16 left-4 bg-red-500/90 text-white p-3 rounded-full shadow-lg"
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{
                            scale: swipeDirection === "left" ? 1 : 0,
                            rotate: swipeDirection === "left" ? 0 : -30,
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          {" "}
                          <X className="h-6 w-6" />{" "}
                        </motion.div>
                        <motion.div
                          className="absolute top-16 right-4 bg-green-500/90 text-white p-3 rounded-full shadow-lg"
                          initial={{ scale: 0, rotate: 30 }}
                          animate={{
                            scale: swipeDirection === "right" ? 1 : 0,
                            rotate: swipeDirection === "right" ? 0 : 30,
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          {" "}
                          <Check className="h-6 w-6" />{" "}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )
              })}
            </div>

            {/* Swipe Buttons (unchanged style) */}
            <div className="flex justify-center gap-6 mb-4 mt-2">
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-2 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
                onClick={() => handleSwipe("left")}
              >
                {" "}
                <X className="h-7 w-7" />{" "}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
                onClick={() => handleSwipe("right")}
              >
                {" "}
                <Check className="h-7 w-7" />{" "}
              </Button>
            </div>

            {/* Regenerate Button */}
            <div className="text-center">
              <Button
                variant="ghost"
                className="text-slate-500 hover:text-purple-700 hover:bg-purple-50 text-sm"
                onClick={regenerateCaregivers}
              >
                {" "}
                {/* Purple hover */}
                <RefreshCw className="h-4 w-4 mr-1.5" /> {t.regenerate}
              </Button>
            </div>
          </motion.div>
        )}
        {/* Step 3: Tracking */}
        {currentStep === 3 && selectedCaregiver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Get potentially translated data for the selected caregiver */}
            {(() => {
              // IIFE to use displayData easily
              const displayData = getTranslatedProfileData(selectedCaregiver)
              return (
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-slate-200/70 mb-6 overflow-hidden">
                  <CardContent className="pt-6 pb-6">
                    <h3 className="text-lg font-semibold text-black mb-4 text-center">{t.trackingTitle}</h3>

                    {/* Map Visualization */}
                    <div className="relative w-full h-64 bg-slate-200 rounded-lg mb-6 overflow-hidden border border-slate-300">
                      {/* Simulated Map */}
                      <div className="absolute inset-0">
                        <Image
                          src="/placeholder.svg?height=400&width=600&text=Map+Area&color=e2e8f0"
                          alt="Map"
                          fill
                          className="object-cover opacity-60"
                        />

                        {/* Destination Pin (Home) */}
                        <motion.div
                          className="absolute"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          style={{ top: "25%", right: "25%" }}
                        >
                          <Home className="h-8 w-8 text-purple-600 drop-shadow-md" /> {/* Purple home */}
                        </motion.div>

                        {/* Moving Caregiver Pin */}
                        <motion.div
                          className="absolute"
                          initial={{ bottom: "15%", left: "15%" }}
                          animate={
                            caregiverArrived
                              ? { top: "28%", right: "30%", scale: 1.1 }
                              : { bottom: "auto", left: "auto", top: "50%", right: "50%", scale: 1 }
                          }
                          transition={{ duration: caregiverArrived ? 1.5 : 6, ease: "easeInOut" }}
                        >
                          <div className="relative flex flex-col items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                              {" "}
                              <User className="h-4 w-4 text-white" />{" "}
                            </div>
                            {!caregiverArrived && (
                              <div className="absolute -bottom-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Status Information */}
                    <div className="bg-slate-50/70 p-4 rounded-lg mb-6 border border-slate-200">
                      <div className="flex items-center mb-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white mr-3 shadow-sm">
                          <Image
                            src={
                              placeholderImages[displayData.photo as keyof typeof placeholderImages] ||
                              displayData.photo
                            }
                            alt={displayData.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{displayData.name}</h4>
                          {/* Use first translated skill as example */}
                          <p className="text-sm text-slate-600">{displayData.skills[0]} Specialist</p>
                        </div>
                      </div>

                      <div className="border-t border-slate-200/80 pt-3">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={caregiverArrived ? "arrived" : "enroute"}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-purple-600 mr-2" /> {/* Purple clock */}
                              <span className="text-slate-800 text-sm">
                                {" "}
                                {caregiverArrived ? t.caregiverArrived : t.trackingStatus}{" "}
                              </span>
                            </div>
                            {caregiverArrived && (
                              <div className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-200">
                                {" "}
                                Arrived{" "}
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Buttons */}
                    <AnimatePresence mode="wait">
                      {caregiverArrived ? (
                        <motion.div
                          key="complete-btn"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            {t.completeBooking}
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="message-btn"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" /> Message {displayData.name.split(" ")[0]}
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              )
            })()}
          </motion.div>
        )}
        {/* Try Again Button */}
        {currentStep > 0 && (
          <div className="mt-6 text-center">
            <Button variant="link" className="text-slate-500 hover:text-purple-600" onClick={resetDemo}>
              {" "}
              {/* Purple hover */}
              {t.tryAgain}
            </Button>
          </div>
        )}
      </main>

      {/* NO BOTTOM NAVIGATION BANNER */}
    </div>
  )
}

// BottomNavItem helper component is no longer needed and can be removed.

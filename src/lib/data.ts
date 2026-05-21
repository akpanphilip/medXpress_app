// Mock data powering the MEDXPRESS frontend (no backend required).
import type {
  Doctor,
  Specialty,
  Appointment,
  Prescription,
  TestResult,
  HealthMetric,
  ChatMessage,
  PendingDoctor,
  ManagedUser,
} from "./types";

export const specialties: Specialty[] = [
  { id: "cardiology", name: "Cardiology", icon: "HeartPulse", count: 24 },
  { id: "dermatology", name: "Dermatology", icon: "Sparkles", count: 18 },
  { id: "pediatrics", name: "Pediatrics", icon: "Baby", count: 31 },
  { id: "mental-health", name: "Mental Health", icon: "Brain", count: 27 },
  { id: "general", name: "General", icon: "Stethoscope", count: 42 },
  { id: "dentistry", name: "Dentistry", icon: "Smile", count: 15 },
  { id: "neurology", name: "Neurology", icon: "Activity", count: 12 },
  { id: "orthopedics", name: "Orthopedics", icon: "Bone", count: 19 },
  { id: "gynecology", name: "Gynecology", icon: "Flower2", count: 22 },
  { id: "ophthalmology", name: "Ophthalmology", icon: "Eye", count: 14 },
];

function buildAvailability(): Doctor["availability"] {
  const days = [
    { day: "Mon", date: "May 25" },
    { day: "Tue", date: "May 26" },
    { day: "Wed", date: "May 27" },
    { day: "Thu", date: "May 28" },
    { day: "Fri", date: "May 29" },
  ];
  const pool = [
    "08:30", "09:00", "09:30", "10:00", "11:00",
    "12:30", "14:00", "14:30", "15:30", "16:00", "17:00",
  ];
  return days.map((d, i) => ({
    ...d,
    slots: pool.filter((_, idx) => (idx + i) % 3 !== 0),
  }));
}

const sampleReviews = (seed: string) => [
  {
    id: seed + "-r1",
    patient: "Amara N.",
    rating: 5,
    date: "2 days ago",
    comment:
      "Very patient and thorough. Explained everything clearly and the video call was smooth.",
  },
  {
    id: seed + "-r2",
    patient: "Tunde A.",
    rating: 5,
    date: "1 week ago",
    comment: "Got my prescription within minutes. Highly professional service.",
  },
  {
    id: seed + "-r3",
    patient: "Grace O.",
    rating: 4,
    date: "2 weeks ago",
    comment: "Helpful consultation, though it started a few minutes late.",
  },
];

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Adaeze Okonkwo",
    specialty: "Cardiology",
    avatar: "https://i.pravatar.cc/300?img=45",
    status: "online",
    rating: 4.9,
    reviewCount: 312,
    fee: 8500,
    experience: 12,
    patients: 4200,
    hospital: "Lagoon Heart Institute",
    location: "Lagos, Nigeria",
    languages: ["English", "Igbo"],
    about:
      "Consultant cardiologist focused on preventive heart care, hypertension management and remote cardiac monitoring for busy professionals.",
    credentials: [
      "MBBS, University of Lagos",
      "Fellowship in Cardiology, UK",
      "Member, Nigerian Cardiac Society",
    ],
    verified: true,
    nextAvailable: "Today, 2:00 PM",
    reviews: sampleReviews("d1"),
    availability: buildAvailability(),
  },
  {
    id: "d2",
    name: "Dr. Emeka Balogun",
    specialty: "Dermatology",
    avatar: "https://i.pravatar.cc/300?img=12",
    status: "online",
    rating: 4.8,
    reviewCount: 198,
    fee: 7000,
    experience: 9,
    patients: 2750,
    hospital: "ClearSkin Medical Centre",
    location: "Abuja, Nigeria",
    languages: ["English", "Yoruba"],
    about:
      "Dermatologist treating acne, eczema, pigmentation and skin allergies, with a focus on evidence-based skincare routines.",
    credentials: [
      "MBBS, Ahmadu Bello University",
      "Diploma in Dermatology",
      "Member, Nigerian Association of Dermatologists",
    ],
    verified: true,
    nextAvailable: "Today, 4:30 PM",
    reviews: sampleReviews("d2"),
    availability: buildAvailability(),
  },
  {
    id: "d3",
    name: "Dr. Fatima Bello",
    specialty: "Pediatrics",
    avatar: "https://i.pravatar.cc/300?img=32",
    status: "busy",
    rating: 5.0,
    reviewCount: 421,
    fee: 6500,
    experience: 15,
    patients: 6100,
    hospital: "Little Stars Children Hospital",
    location: "Kano, Nigeria",
    languages: ["English", "Hausa"],
    about:
      "Paediatrician caring for newborns to teenagers, with special interest in childhood nutrition and immunisation.",
    credentials: [
      "MBBS, Bayero University",
      "Fellowship in Paediatrics",
      "Certified Neonatal Specialist",
    ],
    verified: true,
    nextAvailable: "Tomorrow, 9:00 AM",
    reviews: sampleReviews("d3"),
    availability: buildAvailability(),
  },
  {
    id: "d4",
    name: "Dr. Daniel Mensah",
    specialty: "Mental Health",
    avatar: "https://i.pravatar.cc/300?img=51",
    status: "online",
    rating: 4.9,
    reviewCount: 276,
    fee: 9000,
    experience: 11,
    patients: 3400,
    hospital: "Calm Minds Wellness Clinic",
    location: "Accra, Ghana",
    languages: ["English", "French"],
    about:
      "Psychiatrist supporting anxiety, depression, stress and sleep difficulties through a warm, judgement-free approach.",
    credentials: [
      "MBChB, University of Ghana",
      "Residency in Psychiatry",
      "Member, Ghana Psychiatric Association",
    ],
    verified: true,
    nextAvailable: "Today, 1:30 PM",
    reviews: sampleReviews("d4"),
    availability: buildAvailability(),
  },
  {
    id: "d5",
    name: "Dr. Chidinma Eze",
    specialty: "General",
    avatar: "https://i.pravatar.cc/300?img=20",
    status: "online",
    rating: 4.7,
    reviewCount: 540,
    fee: 5000,
    experience: 8,
    patients: 7800,
    hospital: "MedExpress Family Practice",
    location: "Enugu, Nigeria",
    languages: ["English", "Igbo"],
    about:
      "General practitioner handling everyday concerns: infections, fever, check-ups and quick prescriptions for the whole family.",
    credentials: [
      "MBBS, University of Nigeria",
      "Diploma in Family Medicine",
    ],
    verified: true,
    nextAvailable: "Today, 12:00 PM",
    reviews: sampleReviews("d5"),
    availability: buildAvailability(),
  },
  {
    id: "d6",
    name: "Dr. Olusegun Adeyemi",
    specialty: "Neurology",
    avatar: "https://i.pravatar.cc/300?img=68",
    status: "offline",
    rating: 4.8,
    reviewCount: 154,
    fee: 11000,
    experience: 17,
    patients: 2100,
    hospital: "NeuroCare Specialist Hospital",
    location: "Ibadan, Nigeria",
    languages: ["English", "Yoruba"],
    about:
      "Neurologist managing migraines, epilepsy and nerve-related conditions with modern diagnostic care.",
    credentials: [
      "MBBS, University of Ibadan",
      "Fellowship in Neurology",
      "Member, Movement Disorders Society",
    ],
    verified: true,
    nextAvailable: "Wed, 10:00 AM",
    reviews: sampleReviews("d6"),
    availability: buildAvailability(),
  },
  {
    id: "d7",
    name: "Dr. Aisha Mohammed",
    specialty: "Gynecology",
    avatar: "https://i.pravatar.cc/300?img=27",
    status: "online",
    rating: 4.9,
    reviewCount: 389,
    fee: 8000,
    experience: 13,
    patients: 4900,
    hospital: "Mother & Wellness Centre",
    location: "Abuja, Nigeria",
    languages: ["English", "Hausa"],
    about:
      "Gynaecologist offering women's health consultations, family planning advice and prenatal guidance.",
    credentials: [
      "MBBS, University of Maiduguri",
      "Fellowship in Obstetrics & Gynaecology",
    ],
    verified: true,
    nextAvailable: "Today, 3:00 PM",
    reviews: sampleReviews("d7"),
    availability: buildAvailability(),
  },
  {
    id: "d8",
    name: "Dr. Kwame Asante",
    specialty: "Orthopedics",
    avatar: "https://i.pravatar.cc/300?img=59",
    status: "busy",
    rating: 4.6,
    reviewCount: 122,
    fee: 9500,
    experience: 10,
    patients: 1800,
    hospital: "BoneCare Orthopedic Clinic",
    location: "Kumasi, Ghana",
    languages: ["English"],
    about:
      "Orthopaedic doctor advising on joint pain, sports injuries and posture-related back problems.",
    credentials: [
      "MBChB, KNUST",
      "Residency in Orthopaedic Surgery",
    ],
    verified: true,
    nextAvailable: "Tomorrow, 11:30 AM",
    reviews: sampleReviews("d8"),
    availability: buildAvailability(),
  },
];

export function getDoctor(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

// ---- Patient dashboard data ----

export const appointments: Appointment[] = [
  {
    id: "a1",
    doctorId: "d1",
    doctorName: "Dr. Adaeze Okonkwo",
    doctorAvatar: "https://i.pravatar.cc/300?img=45",
    specialty: "Cardiology",
    date: "Today",
    time: "2:00 PM",
    type: "video",
    status: "upcoming",
    fee: 8500,
  },
  {
    id: "a2",
    doctorId: "d5",
    doctorName: "Dr. Chidinma Eze",
    doctorAvatar: "https://i.pravatar.cc/300?img=20",
    specialty: "General",
    date: "May 26",
    time: "10:30 AM",
    type: "chat",
    status: "upcoming",
    fee: 5000,
  },
  {
    id: "a3",
    doctorId: "d4",
    doctorName: "Dr. Daniel Mensah",
    doctorAvatar: "https://i.pravatar.cc/300?img=51",
    specialty: "Mental Health",
    date: "May 14",
    time: "1:30 PM",
    type: "video",
    status: "completed",
    fee: 9000,
  },
  {
    id: "a4",
    doctorId: "d2",
    doctorName: "Dr. Emeka Balogun",
    doctorAvatar: "https://i.pravatar.cc/300?img=12",
    specialty: "Dermatology",
    date: "May 8",
    time: "4:00 PM",
    type: "video",
    status: "completed",
    fee: 7000,
  },
  {
    id: "a5",
    doctorId: "d3",
    doctorName: "Dr. Fatima Bello",
    doctorAvatar: "https://i.pravatar.cc/300?img=32",
    specialty: "Pediatrics",
    date: "May 2",
    time: "9:00 AM",
    type: "chat",
    status: "cancelled",
    fee: 6500,
  },
];

export const prescriptions: Prescription[] = [
  {
    id: "p1",
    doctorName: "Dr. Daniel Mensah",
    date: "May 14, 2026",
    diagnosis: "Mild anxiety and sleep disturbance",
    medicines: [
      { name: "Sertraline 50mg", dosage: "1 tablet daily", duration: "30 days" },
      { name: "Melatonin 3mg", dosage: "1 tablet at night", duration: "14 days" },
    ],
    notes: "Practise the breathing routine discussed. Follow up in 4 weeks.",
  },
  {
    id: "p2",
    doctorName: "Dr. Emeka Balogun",
    date: "May 8, 2026",
    diagnosis: "Mild facial acne",
    medicines: [
      {
        name: "Benzoyl Peroxide 5%",
        dosage: "Apply thin layer at night",
        duration: "8 weeks",
      },
      { name: "Doxycycline 100mg", dosage: "1 capsule daily", duration: "21 days" },
    ],
    notes: "Use a gentle cleanser and daily sunscreen.",
  },
];

export const testResults: TestResult[] = [
  {
    id: "t1",
    name: "Full Blood Count",
    date: "May 12, 2026",
    lab: "Synlab Diagnostics",
    status: "normal",
    fileSize: "248 KB",
  },
  {
    id: "t2",
    name: "Lipid Profile",
    date: "May 12, 2026",
    lab: "Synlab Diagnostics",
    status: "review",
    fileSize: "196 KB",
  },
  {
    id: "t3",
    name: "ECG Report",
    date: "May 10, 2026",
    lab: "Lagoon Heart Institute",
    status: "normal",
    fileSize: "512 KB",
  },
  {
    id: "t4",
    name: "Vitamin D Test",
    date: "May 18, 2026",
    lab: "MedExpress Labs",
    status: "pending",
    fileSize: "Awaiting",
  },
];

export const healthMetrics: HealthMetric[] = [
  {
    id: "h1",
    label: "Blood Pressure",
    value: "118/76",
    unit: "mmHg",
    icon: "HeartPulse",
    trend: "stable",
    status: "good",
  },
  {
    id: "h2",
    label: "Heart Rate",
    value: "72",
    unit: "bpm",
    icon: "Activity",
    trend: "down",
    status: "good",
  },
  {
    id: "h3",
    label: "Weight",
    value: "68.4",
    unit: "kg",
    icon: "Scale",
    trend: "down",
    status: "good",
  },
  {
    id: "h4",
    label: "Blood Sugar",
    value: "5.6",
    unit: "mmol/L",
    icon: "Droplet",
    trend: "up",
    status: "watch",
  },
];

export const chatThread: ChatMessage[] = [
  {
    id: "c1",
    sender: "doctor",
    text: "Hello, good afternoon. I can see you now. How are you feeling today?",
    time: "2:01 PM",
  },
  {
    id: "c2",
    sender: "patient",
    text: "Hi doctor. I have had a tight chest and mild headaches for three days.",
    time: "2:02 PM",
  },
  {
    id: "c3",
    sender: "doctor",
    text: "Thank you. Any shortness of breath, or does it get worse when you move?",
    time: "2:02 PM",
  },
  {
    id: "c4",
    sender: "patient",
    text: "A little when I climb stairs, but it settles when I rest.",
    time: "2:03 PM",
  },
  {
    id: "c5",
    sender: "doctor",
    text: "Understood. Your last ECG looked fine. I will send a prescription and a few tips shortly.",
    time: "2:04 PM",
  },
];

// ---- Admin data ----

export const pendingDoctors: PendingDoctor[] = [
  {
    id: "pd1",
    name: "Dr. Ngozi Aluko",
    specialty: "Dermatology",
    avatar: "https://i.pravatar.cc/300?img=47",
    email: "ngozi.aluko@medmail.com",
    submitted: "2 hours ago",
    documents: 4,
    license: "MDCN-2019-44821",
  },
  {
    id: "pd2",
    name: "Dr. Samuel Okafor",
    specialty: "Cardiology",
    avatar: "https://i.pravatar.cc/300?img=33",
    email: "s.okafor@medmail.com",
    submitted: "5 hours ago",
    documents: 5,
    license: "MDCN-2016-33102",
  },
  {
    id: "pd3",
    name: "Dr. Halima Yusuf",
    specialty: "Pediatrics",
    avatar: "https://i.pravatar.cc/300?img=24",
    email: "halima.y@medmail.com",
    submitted: "1 day ago",
    documents: 3,
    license: "MDCN-2020-50934",
  },
];

export const managedUsers: ManagedUser[] = [
  {
    id: "u1",
    name: "Amara Nwosu",
    email: "amara.nwosu@gmail.com",
    role: "patient",
    joined: "Jan 2026",
    status: "active",
    avatar: "https://i.pravatar.cc/300?img=44",
  },
  {
    id: "u2",
    name: "Dr. Adaeze Okonkwo",
    email: "adaeze.o@medmail.com",
    role: "doctor",
    joined: "Nov 2025",
    status: "active",
    avatar: "https://i.pravatar.cc/300?img=45",
  },
  {
    id: "u3",
    name: "Tunde Adebayo",
    email: "tunde.a@gmail.com",
    role: "patient",
    joined: "Feb 2026",
    status: "active",
    avatar: "https://i.pravatar.cc/300?img=14",
  },
  {
    id: "u4",
    name: "Dr. Emeka Balogun",
    email: "emeka.b@medmail.com",
    role: "doctor",
    joined: "Dec 2025",
    status: "active",
    avatar: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: "u5",
    name: "Blessing Eze",
    email: "blessing.eze@gmail.com",
    role: "patient",
    joined: "Mar 2026",
    status: "suspended",
    avatar: "https://i.pravatar.cc/300?img=49",
  },
];

// Consultation volume across the last 7 days (for admin charts).
export const consultationVolume = [
  { label: "Mon", value: 142 },
  { label: "Tue", value: 168 },
  { label: "Wed", value: 131 },
  { label: "Thu", value: 195 },
  { label: "Fri", value: 224 },
  { label: "Sat", value: 178 },
  { label: "Sun", value: 96 },
];

// Revenue across the last 6 months in thousands of Naira (for admin charts).
export const revenueTrend = [
  { label: "Dec", value: 1820 },
  { label: "Jan", value: 2140 },
  { label: "Feb", value: 1960 },
  { label: "Mar", value: 2680 },
  { label: "Apr", value: 3120 },
  { label: "May", value: 3540 },
];

export const adminStats = {
  totalDoctors: 218,
  totalPatients: 12480,
  consultations: 1834,
  revenue: 3540000,
  pendingVerifications: pendingDoctors.length,
  emergencyToday: 17,
};

// ---- Doctor-side data ----

export interface QueueItem {
  id: string;
  patient: string;
  avatar: string;
  age: number;
  time: string;
  type: "video" | "chat";
  reason: string;
  status: "waiting" | "scheduled" | "done";
}

export const patientQueue: QueueItem[] = [
  {
    id: "q1",
    patient: "Amara Nwosu",
    avatar: "https://i.pravatar.cc/300?img=44",
    age: 29,
    time: "2:00 PM",
    type: "video",
    reason: "Chest tightness and mild headaches",
    status: "waiting",
  },
  {
    id: "q2",
    patient: "Tunde Adebayo",
    avatar: "https://i.pravatar.cc/300?img=14",
    age: 41,
    time: "2:45 PM",
    type: "video",
    reason: "Follow-up on blood pressure medication",
    status: "scheduled",
  },
  {
    id: "q3",
    patient: "Blessing Okoro",
    avatar: "https://i.pravatar.cc/300?img=23",
    age: 34,
    time: "3:30 PM",
    type: "chat",
    reason: "Palpitations after exercise",
    status: "scheduled",
  },
  {
    id: "q4",
    patient: "Ibrahim Sani",
    avatar: "https://i.pravatar.cc/300?img=53",
    age: 56,
    time: "9:30 AM",
    type: "video",
    reason: "Routine cardiac review",
    status: "done",
  },
  {
    id: "q5",
    patient: "Chioma Eze",
    avatar: "https://i.pravatar.cc/300?img=10",
    age: 38,
    time: "10:15 AM",
    type: "chat",
    reason: "Medication side effects",
    status: "done",
  },
];

export interface DoctorPatient {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
  lastVisit: string;
  condition: string;
  visits: number;
}

export const doctorPatients: DoctorPatient[] = [
  {
    id: "dp1",
    name: "Amara Nwosu",
    avatar: "https://i.pravatar.cc/300?img=44",
    age: 29,
    gender: "Female",
    lastVisit: "May 14, 2026",
    condition: "Hypertension monitoring",
    visits: 6,
  },
  {
    id: "dp2",
    name: "Tunde Adebayo",
    avatar: "https://i.pravatar.cc/300?img=14",
    age: 41,
    gender: "Male",
    lastVisit: "May 10, 2026",
    condition: "High blood pressure",
    visits: 9,
  },
  {
    id: "dp3",
    name: "Blessing Okoro",
    avatar: "https://i.pravatar.cc/300?img=23",
    age: 34,
    gender: "Female",
    lastVisit: "May 6, 2026",
    condition: "Arrhythmia review",
    visits: 3,
  },
  {
    id: "dp4",
    name: "Ibrahim Sani",
    avatar: "https://i.pravatar.cc/300?img=53",
    age: 56,
    gender: "Male",
    lastVisit: "Apr 28, 2026",
    condition: "Post-surgery cardiac care",
    visits: 12,
  },
  {
    id: "dp5",
    name: "Chioma Eze",
    avatar: "https://i.pravatar.cc/300?img=10",
    age: 38,
    gender: "Female",
    lastVisit: "Apr 20, 2026",
    condition: "Cholesterol management",
    visits: 4,
  },
  {
    id: "dp6",
    name: "Samuel Johnson",
    avatar: "https://i.pravatar.cc/300?img=60",
    age: 47,
    gender: "Male",
    lastVisit: "Apr 12, 2026",
    condition: "General cardiac check-up",
    visits: 2,
  },
];

// The signed-in doctor's earnings across the last 7 days, in Naira.
export const earningsTrend = [
  { label: "Mon", value: 34000 },
  { label: "Tue", value: 51000 },
  { label: "Wed", value: 42500 },
  { label: "Thu", value: 68000 },
  { label: "Fri", value: 76500 },
  { label: "Sat", value: 59500 },
  { label: "Sun", value: 25500 },
];

export const doctorStats = {
  todayConsults: 8,
  totalPatients: 4200,
  monthEarnings: 1284000,
  rating: 4.9,
  completionRate: 98,
};

// ---- Demo accounts for quick sign-in ----
export const demoAccounts = {
  patient: {
    id: "u1",
    name: "Amara Nwosu",
    email: "amara.nwosu@gmail.com",
    role: "patient" as const,
    avatar: "https://i.pravatar.cc/300?img=44",
    phone: "+234 803 555 0142",
  },
  doctor: {
    id: "d1",
    name: "Dr. Adaeze Okonkwo",
    email: "adaeze.o@medmail.com",
    role: "doctor" as const,
    avatar: "https://i.pravatar.cc/300?img=45",
    phone: "+234 803 555 0199",
  },
  admin: {
    id: "ad1",
    name: "Ifeoma Cole",
    email: "ifeoma.cole@medxpress.com",
    role: "admin" as const,
    avatar: "https://i.pravatar.cc/300?img=16",
    phone: "+234 803 555 0100",
  },
};

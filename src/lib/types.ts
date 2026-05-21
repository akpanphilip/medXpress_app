// Shared domain types for the MEDXPRESS frontend.

export type Role = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string; // lucide icon name
  count: number; // doctors available in this specialty
}

export interface Review {
  id: string;
  patient: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface DaySlots {
  day: string; // e.g. "Mon"
  date: string; // e.g. "May 22"
  slots: string[]; // e.g. ["09:00", "09:30"]
}

export type DoctorStatus = "online" | "busy" | "offline";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: DoctorStatus;
  rating: number;
  reviewCount: number;
  fee: number; // consultation fee
  experience: number; // years
  patients: number;
  hospital: string;
  location: string;
  languages: string[];
  about: string;
  credentials: string[];
  verified: boolean;
  nextAvailable: string;
  reviews: Review[];
  availability: DaySlots[];
}

export type AppointmentStatus =
  | "upcoming"
  | "completed"
  | "cancelled"
  | "in-progress";

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorAvatar: string;
  specialty: string;
  date: string;
  time: string;
  type: "video" | "chat" | "emergency";
  status: AppointmentStatus;
  fee: number;
}

export interface Prescription {
  id: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: { name: string; dosage: string; duration: string }[];
  notes?: string;
}

export interface TestResult {
  id: string;
  name: string;
  date: string;
  lab: string;
  status: "normal" | "review" | "pending";
  fileSize: string;
}

export interface HealthMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  icon: string;
  trend: "up" | "down" | "stable";
  status: "good" | "watch" | "alert";
}

export interface ChatMessage {
  id: string;
  sender: "patient" | "doctor";
  text: string;
  time: string;
}

export interface PendingDoctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  email: string;
  submitted: string;
  documents: number;
  license: string;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  joined: string;
  status: "active" | "suspended";
  avatar: string;
}

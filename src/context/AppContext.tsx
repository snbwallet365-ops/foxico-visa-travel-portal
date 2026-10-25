import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

/* ─────────────────────────── TYPES ─────────────────────────── */
export type Role = "user" | "admin" | "superadmin";
export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type VisaApplicationStatus = "submitted" | "docs_review" | "embassy_processing" | "action_required" | "approved" | "rejected";
export type ThemeMode = "light" | "dark";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  status: "active" | "suspended";
  joined: string;
  country: string;
  passportNumber?: string;
  passportExpiry?: string;
  phone?: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  destinationId: string;
  destinationName: string;
  image: string;
  date: string;
  guests: number;
  price: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  duration: string;
  description: string;
  status: "active" | "hidden";
  featured: boolean;
}

export interface VisaApplication {
  id: string;
  userId: string;
  applicantName: string;
  passportNumber: string;
  passportCountry: string;
  destinationCountry: string;
  destinationCountryId: string;
  visaType: string;
  stayDuration: string;
  processingSpeed: "Standard (5 Days)" | "Express (48h)" | "Super-Rush (24h)";
  fee: number;
  status: VisaApplicationStatus;
  progress: number; // 0 to 100
  submittedDate: string;
  estimatedDecisionDate: string;
  embassyReference: string;
  documents: {
    name: string;
    type: string;
    status: "verified" | "pending" | "required";
    url?: string;
  }[];
  consularOfficerNote?: string;
  evisaNumber?: string;
}

export interface VaultDocument {
  id: string;
  userId: string;
  title: string;
  type: "passport" | "bank_statement" | "photo" | "insurance" | "flight" | "hotel";
  fileName: string;
  uploadedDate: string;
  expiryDate: string;
  status: "verified" | "review" | "expiring_soon";
  fileSize: string;
}

export interface Appointment {
  id: string;
  userId: string;
  applicationId: string;
  type: "Biometrics Collection" | "Consular Interview" | "Document Verification";
  destinationCountry: string;
  location: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "rescheduled";
  qrCode: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  sender: "user" | "concierge";
  senderName: string;
  message: string;
  time: string;
  avatar?: string;
}

export interface Invoice {
  id: string;
  userId: string;
  title: string;
  category: "visa_fee" | "concierge_service" | "rush_processing" | "travel_package";
  amount: number;
  date: string;
  status: "paid" | "pending";
  method: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  level: "info" | "warning" | "critical";
  time: string;
}

export interface ToastMsg {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export interface Settings {
  maintenance: boolean;
  registrations: boolean;
  autoConfirm: boolean;
  emails: boolean;
  emergencyBorderNotice?: string;
}

/* ─────────────────────────── SEED DATA ─────────────────────────── */
const SEED_USERS: User[] = [
  { id: "u1", name: "Anney Rora", email: "anney@foxico.com", password: "demo123", role: "user", status: "active", joined: "2023-04-12", country: "United States", passportNumber: "P982341109", passportExpiry: "2031-08-14", phone: "+1 (555) 234-8921" },
  { id: "u2", name: "Liam Carter", email: "liam@foxico.com", password: "demo123", role: "user", status: "active", joined: "2024-01-05", country: "United Kingdom", passportNumber: "GB7721903", passportExpiry: "2029-11-20", phone: "+44 20 7946 0912" },
  { id: "u3", name: "Sofia Nguyen", email: "sofia@foxico.com", password: "demo123", role: "user", status: "active", joined: "2024-06-21", country: "Australia", passportNumber: "AU5510294", passportExpiry: "2032-05-19", phone: "+61 2 9876 5432" },
  { id: "u4", name: "Diego Morales", email: "diego@foxico.com", password: "demo123", role: "user", status: "suspended", joined: "2023-11-30", country: "Spain" },
  { id: "u5", name: "Yuki Tanaka", email: "yuki@foxico.com", password: "demo123", role: "user", status: "active", joined: "2024-03-18", country: "Japan" },
  { id: "u6", name: "Emma Wilson", email: "emma@foxico.com", password: "demo123", role: "user", status: "active", joined: "2024-09-02", country: "Canada" },
  { id: "a1", name: "Marco Fernandez", email: "admin@foxico.com", password: "admin123", role: "admin", status: "active", joined: "2022-08-14", country: "Germany" },
  { id: "a2", name: "Priya Sharma", email: "priya@foxico.com", password: "admin123", role: "admin", status: "active", joined: "2023-02-10", country: "India" },
  { id: "s1", name: "Victoria Chen", email: "super@foxico.com", password: "super123", role: "superadmin", status: "active", joined: "2021-05-01", country: "Singapore" },
];

const SEED_DESTINATIONS: Destination[] = [
  { id: "d1", name: "Bali Paradise Escape", country: "Indonesia", category: "Island", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&fit=crop", price: 1050, rating: 4.9, duration: "8 Days", description: "Sacred temples, emerald rice terraces and turquoise seas on the Island of the Gods.", status: "active", featured: true },
  { id: "d2", name: "Kyoto Autumn Journey", country: "Japan", category: "Culture", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&fit=crop", price: 1120, rating: 4.8, duration: "7 Days", description: "Zen gardens, crimson maples and geisha districts in Japan's ancient capital.", status: "active", featured: true },
  { id: "d3", name: "Santorini Blue Domes", country: "Greece", category: "Island", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80&fit=crop", price: 890, rating: 4.7, duration: "5 Days", description: "Whitewashed villages perched above the Aegean's deepest blue caldera.", status: "active", featured: false },
  { id: "d4", name: "Machu Picchu Expedition", country: "Peru", category: "Mountain", image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80&fit=crop", price: 1180, rating: 4.9, duration: "9 Days", description: "Trek the Inca Trail to the lost citadel hidden in the Andean clouds.", status: "active", featured: true },
  { id: "d5", name: "Maldives Overwater Retreat", country: "Maldives", category: "Beach", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80&fit=crop", price: 1450, rating: 5.0, duration: "6 Days", description: "Glass-floor villas over coral lagoons — the definition of barefoot luxury.", status: "active", featured: true },
  { id: "d6", name: "Swiss Alps Adventure", country: "Switzerland", category: "Mountain", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&fit=crop", price: 980, rating: 4.6, duration: "7 Days", description: "Alpine lakes, panoramic rail journeys and peaks that pierce the sky.", status: "active", featured: false },
  { id: "d7", name: "Kerala Backwater Cruise", country: "India", category: "Nature", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80&fit=crop", price: 850, rating: 4.7, duration: "6 Days", description: "Drift through palm-fringed canals aboard a traditional houseboat.", status: "active", featured: false },
  { id: "d8", name: "Paris City of Light", country: "France", category: "City", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&fit=crop", price: 760, rating: 4.5, duration: "4 Days", description: "Art, cuisine and romance in the world's most elegant capital.", status: "active", featured: false },
  { id: "d9", name: "Dubai Golden Sands", country: "UAE", category: "City", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&fit=crop", price: 1240, rating: 4.6, duration: "5 Days", description: "Futuristic skylines meet Arabian desert adventures and luxury.", status: "active", featured: false },
  { id: "d10", name: "Iceland Fire & Ice", country: "Iceland", category: "Nature", image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80&fit=crop", price: 1320, rating: 4.8, duration: "8 Days", description: "Waterfalls, black beaches, glaciers and the dancing northern lights.", status: "active", featured: false },
];

const SEED_BOOKINGS: Booking[] = [
  { id: "BK-1001", userId: "u1", userName: "Anney Rora", destinationId: "d1", destinationName: "Bali Paradise Escape", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&fit=crop", date: "2026-11-14", guests: 2, price: 1050, total: 2100, status: "confirmed", createdAt: "2026-09-08" },
  { id: "BK-1002", userId: "u2", userName: "Liam Carter", destinationId: "d3", destinationName: "Santorini Blue Domes", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80&fit=crop", date: "2026-12-02", guests: 2, price: 890, total: 1780, status: "confirmed", createdAt: "2026-09-22" },
  { id: "BK-1003", userId: "u1", userName: "Anney Rora", destinationId: "d5", destinationName: "Maldives Overwater Retreat", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80&fit=crop", date: "2027-01-10", guests: 2, price: 1450, total: 2900, status: "pending", createdAt: "2026-10-14" },
  { id: "BK-1004", userId: "u3", userName: "Sofia Nguyen", destinationId: "d2", destinationName: "Kyoto Autumn Journey", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&fit=crop", date: "2026-11-28", guests: 1, price: 1120, total: 1120, status: "confirmed", createdAt: "2026-10-01" },
];

const SEED_VISA_APPLICATIONS: VisaApplication[] = [
  {
    id: "VISA-JP-8821",
    userId: "u1",
    applicantName: "Anney Rora",
    passportNumber: "P982341109",
    passportCountry: "United States",
    destinationCountry: "Japan",
    destinationCountryId: "japan",
    visaType: "Tourist eVisa (90 Days)",
    stayDuration: "90 Days Single Entry",
    processingSpeed: "Express (48h)",
    fee: 59,
    status: "approved",
    progress: 100,
    submittedDate: "2026-10-18",
    estimatedDecisionDate: "2026-10-20",
    embassyReference: "MOFA-JP-2026-991204",
    evisaNumber: "JP-EV-9821-X9",
    consularOfficerNote: "Official eVisa granted by Japan MOFA. Scannable at all Japanese electronic autogates.",
    documents: [
      { name: "Passport Bio-Data Scan", type: "passport", status: "verified" },
      { name: "Biometric 35x45mm Photo", type: "photo", status: "verified" },
      { name: "Confirmed Flight Itinerary", type: "flight", status: "verified" },
      { name: "Bank Balance Statement ($3,400 USD)", type: "bank_statement", status: "verified" }
    ]
  },
  {
    id: "VISA-ID-4402",
    userId: "u1",
    applicantName: "Anney Rora",
    passportNumber: "P982341109",
    passportCountry: "United States",
    destinationCountry: "Indonesia (Bali)",
    destinationCountryId: "indonesia",
    visaType: "Visit Visa B211A (180 Days)",
    stayDuration: "60 Days (Extendable to 180 Days)",
    processingSpeed: "Standard (5 Days)",
    fee: 170,
    status: "embassy_processing",
    progress: 75,
    submittedDate: "2026-10-22",
    estimatedDecisionDate: "2026-10-27",
    embassyReference: "IMMI-DPS-77402",
    consularOfficerNote: "Sponsorship letter attached by Foxico Legal. Under final consular adjudication in Jakarta.",
    documents: [
      { name: "Passport Scan (12+ Mo Validity)", type: "passport", status: "verified" },
      { name: "Bank Statement ($2,500+)", type: "bank_statement", status: "verified" },
      { name: "Balinese Local Sponsor Letter", type: "insurance", status: "verified" }
    ]
  },
  {
    id: "VISA-TH-1190",
    userId: "u2",
    applicantName: "Liam Carter",
    passportNumber: "GB7721903",
    passportCountry: "United Kingdom",
    destinationCountry: "Thailand",
    destinationCountryId: "thailand",
    visaType: "Destination Thailand Visa (DTV 5 Years)",
    stayDuration: "180 Days per entry (5 Years Multiple)",
    processingSpeed: "Express (48h)",
    fee: 375,
    status: "approved",
    progress: 100,
    submittedDate: "2026-10-10",
    estimatedDecisionDate: "2026-10-14",
    embassyReference: "TH-DTV-LON-8812",
    evisaNumber: "DTV-2026-GB-00192",
    consularOfficerNote: "5-Year DTV approved. 500k THB financial asset proof validated by Royal Thai Embassy London.",
    documents: [
      { name: "UK Passport Bio Page", type: "passport", status: "verified" },
      { name: "Remote Employment Agreement", type: "insurance", status: "verified" },
      { name: "Bank Asset Statement (£14,500)", type: "bank_statement", status: "verified" }
    ]
  },
  {
    id: "VISA-FR-9321",
    userId: "u3",
    applicantName: "Sofia Nguyen",
    passportNumber: "AU5510294",
    passportCountry: "Australia",
    destinationCountry: "France (Schengen)",
    destinationCountryId: "france-schengen",
    visaType: "Schengen Short-Stay Type C",
    stayDuration: "90 Days in 180 Days",
    processingSpeed: "Standard (5 Days)",
    fee: 169,
    status: "docs_review",
    progress: 40,
    submittedDate: "2026-10-23",
    estimatedDecisionDate: "2026-10-31",
    embassyReference: "FRA-SYD-2026-441",
    consularOfficerNote: "Pre-screening passed. Scheduled for VFS biometric enrollment in Sydney.",
    documents: [
      { name: "Australian Passport", type: "passport", status: "verified" },
      { name: "€30k Schengen Travel Insurance", type: "insurance", status: "verified" },
      { name: "Internal France Rail Tickets", type: "flight", status: "pending" }
    ]
  }
];

const SEED_VAULT_DOCUMENTS: VaultDocument[] = [
  { id: "v1", userId: "u1", title: "Primary US Passport Bio-Page", type: "passport", fileName: "Passport_Anney_Rora_2031.pdf", uploadedDate: "2026-09-01", expiryDate: "2031-08-14", status: "verified", fileSize: "1.8 MB" },
  { id: "v2", userId: "u1", title: "Chase Bank 3-Month Certified Statement", type: "bank_statement", fileName: "Chase_Statement_Q3_2026.pdf", uploadedDate: "2026-10-15", expiryDate: "2027-01-15", status: "verified", fileSize: "2.4 MB" },
  { id: "v3", userId: "u1", title: "Biometric Passport Photo (35x45mm)", type: "photo", fileName: "Biometric_Portrait_WhiteBg.jpg", uploadedDate: "2026-10-10", expiryDate: "2027-04-10", status: "verified", fileSize: "840 KB" },
  { id: "v4", userId: "u1", title: "Allianz Global Travel & Medical Insurance", type: "insurance", fileName: "Allianz_Policy_Worldwide_500k.pdf", uploadedDate: "2026-09-18", expiryDate: "2027-09-18", status: "verified", fileSize: "1.2 MB" },
  { id: "v5", userId: "u1", title: "Singapore Airlines Round-Trip Ticket", type: "flight", fileName: "SQ_Flight_LAX_NRT_DPS.pdf", uploadedDate: "2026-10-16", expiryDate: "2026-12-30", status: "verified", fileSize: "620 KB" },
];

const SEED_APPOINTMENTS: Appointment[] = [
  { id: "APP-101", userId: "u1", applicationId: "VISA-ID-4402", type: "Document Verification", destinationCountry: "Indonesia", location: "Foxico Virtual Consular Desk (Zoom)", date: "2026-10-28", time: "10:30 AM EST", status: "scheduled", qrCode: "QR-APP-101-FOXICO" },
  { id: "APP-102", userId: "u3", applicationId: "VISA-FR-9321", type: "Biometrics Collection", destinationCountry: "France", location: "VFS Global Center, Level 6, 80 Clarence St, Sydney", date: "2026-11-03", time: "09:15 AM AEST", status: "scheduled", qrCode: "QR-APP-102-VFS-FR" }
];

const SEED_CHAT_MESSAGES: ChatMessage[] = [
  { id: "m1", userId: "u1", sender: "concierge", senderName: "Claire Dupont (Senior Consular Officer)", message: "Hello Anney! Welcome to Foxico Visa Concierge. I am your assigned case officer for your Japan and Bali visa applications.", time: "Oct 18, 10:14 AM" },
  { id: "m2", userId: "u1", sender: "user", senderName: "Anney Rora", message: "Hi Claire! Thank you. I was wondering if my Japan eVisa can be stored in my Apple Wallet directly?", time: "Oct 18, 10:16 AM" },
  { id: "m3", userId: "u1", sender: "concierge", senderName: "Claire Dupont (Senior Consular Officer)", message: "Absolutely! Once granted, you can tap 'Add to Apple Wallet' right from your dashboard. It works offline at airline check-in counters.", time: "Oct 18, 10:20 AM" },
  { id: "m4", userId: "u1", sender: "concierge", senderName: "Claire Dupont (Senior Consular Officer)", message: "Update: Your Japan eVisa has just been APPROVED by MOFA! You can download your official certificate now.", time: "Oct 20, 02:45 PM" }
];

const SEED_INVOICES: Invoice[] = [
  { id: "INV-8810", userId: "u1", title: "Japan Tourist eVisa + 48h Express Review", category: "visa_fee", amount: 59, date: "2026-10-18", status: "paid", method: "Apple Pay (•••• 4022)" },
  { id: "INV-8811", userId: "u1", title: "Bali B211A 180-Day Visit Visa + Local Sponsorship", category: "visa_fee", amount: 170, date: "2026-10-22", status: "paid", method: "Visa (•••• 1092)" },
  { id: "INV-8812", userId: "u1", title: "Allianz Comprehensive Travel Medical Insurance", category: "concierge_service", amount: 89, date: "2026-09-18", status: "paid", method: "Apple Pay (•••• 4022)" }
];

const SEED_LOGS: AuditLog[] = [
  { id: "L1", actor: "Victoria Chen", action: "Approved visa application VISA-JP-8821 for Anney Rora", level: "info", time: "2026-10-20 14:32" },
  { id: "L2", actor: "Marco Fernandez", action: "Submitted dossier VISA-ID-4402 to Indonesian Directorate General", level: "info", time: "2026-10-22 09:15" },
  { id: "L3", actor: "Victoria Chen", action: "Updated Japan Digital Nomad requirement guidelines", level: "info", time: "2026-10-21 17:48" },
  { id: "L4", actor: "Priya Sharma", action: "Verified biometric photo compliance for applicant Liam Carter", level: "info", time: "2026-10-19 11:02" },
  { id: "L5", actor: "System", action: "Encrypted backup of Document Vault synchronized to ISO 27001 cluster", level: "info", time: "2026-10-24 04:00" },
];

const DEFAULT_SETTINGS: Settings = {
  maintenance: false,
  registrations: true,
  autoConfirm: true,
  emails: true,
  emergencyBorderNotice: "All Schengen, Japan, and Southeast Asia electronic border crossings are operating at 100% capacity."
};

/* ─────────────────────────── STORAGE KEYS ─────────────────────────── */
const LS = {
  session: "foxico_session",
  users: "foxico_users_v2",
  bookings: "foxico_bookings_v2",
  dests: "foxico_dests_v2",
  visas: "foxico_visas_v2",
  vault: "foxico_vault_v2",
  appointments: "foxico_apps_v2",
  chat: "foxico_chat_v2",
  invoices: "foxico_invoices_v2",
  logs: "foxico_logs_v2",
  favs: "foxico_favs_v2",
  settings: "foxico_settings_v2",
  theme: "foxico_theme_v2"
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/* ─────────────────────────── CONTEXT INTERFACE ─────────────────────────── */
interface AppContextType {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  currentUser: User | null;
  users: User[];
  bookings: Booking[];
  destinations: Destination[];
  visaApplications: VisaApplication[];
  vaultDocuments: VaultDocument[];
  appointments: Appointment[];
  chatMessages: ChatMessage[];
  invoices: Invoice[];
  favorites: string[];
  logs: AuditLog[];
  settings: Settings;
  toasts: ToastMsg[];
  
  // Auth
  login: (email: string, password: string) => { ok: boolean; error?: string; user?: User };
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string; user?: User };
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
  
  // Visas
  createVisaApplication: (data: Omit<VisaApplication, "id" | "progress" | "status" | "submittedDate" | "embassyReference">) => VisaApplication;
  updateVisaApplicationStatus: (id: string, status: VisaApplicationStatus, note?: string) => void;
  
  // Vault & Documents
  uploadVaultDocument: (doc: Omit<VaultDocument, "id" | "uploadedDate" | "status">) => void;
  deleteVaultDocument: (id: string) => void;
  
  // Appointments
  scheduleAppointment: (app: Omit<Appointment, "id" | "status" | "qrCode">) => void;
  cancelAppointment: (id: string) => void;
  
  // Chat
  sendChatMessage: (message: string) => void;
  
  // Bookings & Catalog
  createBooking: (destinationId: string, date: string, guests: number) => Booking | null;
  cancelBooking: (id: string) => void;
  setBookingStatus: (id: string, status: BookingStatus) => void;
  addDestination: (d: Omit<Destination, "id">) => void;
  updateDestination: (id: string, patch: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;
  
  // Admin & Super Admin
  setUserRole: (id: string, role: Role) => void;
  toggleUserStatus: (id: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  clearLogs: () => void;
  resetDemoData: () => void;
  
  // Utility
  toggleFavorite: (destId: string) => void;
  isFavorite: (destId: string) => boolean;
  toast: (message: string, type?: ToastMsg["type"]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

/* ─────────────────────────── PROVIDER ─────────────────────────── */
export function AppProvider({ children }: { children: ReactNode }) {
  // Theme state: defaults to "light" for iOS Liquid Glass and White artistic theme!
  const [theme, setThemeState] = useState<ThemeMode>(() => load(LS.theme, "light"));
  const [users, setUsers] = useState<User[]>(() => load(LS.users, SEED_USERS));
  const [bookings, setBookings] = useState<Booking[]>(() => load(LS.bookings, SEED_BOOKINGS));
  const [destinations, setDestinations] = useState<Destination[]>(() => load(LS.dests, SEED_DESTINATIONS));
  const [visaApplications, setVisaApplications] = useState<VisaApplication[]>(() => load(LS.visas, SEED_VISA_APPLICATIONS));
  const [vaultDocuments, setVaultDocuments] = useState<VaultDocument[]>(() => load(LS.vault, SEED_VAULT_DOCUMENTS));
  const [appointments, setAppointments] = useState<Appointment[]>(() => load(LS.appointments, SEED_APPOINTMENTS));
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => load(LS.chat, SEED_CHAT_MESSAGES));
  const [invoices, setInvoices] = useState<Invoice[]>(() => load(LS.invoices, SEED_INVOICES));
  const [logs, setLogs] = useState<AuditLog[]>(() => load(LS.logs, SEED_LOGS));
  const [favsMap, setFavsMap] = useState<Record<string, string[]>>(() => load(LS.favs, {}));
  const [settings, setSettings] = useState<Settings>(() => load(LS.settings, DEFAULT_SETTINGS));
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const id = load<string | null>(LS.session, "u1"); // Default to demo traveler Anney Rora for instant rich preview!
    const list = load(LS.users, SEED_USERS);
    return list.find((u) => u.id === id) ?? list[0];
  });

  // Apply theme class to document body
  useEffect(() => {
    localStorage.setItem(LS.theme, JSON.stringify(theme));
    if (theme === "dark") {
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.remove("theme-dark");
    }
  }, [theme]);

  const setTheme = useCallback((t: ThemeMode) => setThemeState(t), []);
  const toggleTheme = useCallback(() => setThemeState((prev) => (prev === "light" ? "dark" : "light")), []);

  useEffect(() => { localStorage.setItem(LS.users, JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem(LS.bookings, JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem(LS.dests, JSON.stringify(destinations)); }, [destinations]);
  useEffect(() => { localStorage.setItem(LS.visas, JSON.stringify(visaApplications)); }, [visaApplications]);
  useEffect(() => { localStorage.setItem(LS.vault, JSON.stringify(vaultDocuments)); }, [vaultDocuments]);
  useEffect(() => { localStorage.setItem(LS.appointments, JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem(LS.chat, JSON.stringify(chatMessages)); }, [chatMessages]);
  useEffect(() => { localStorage.setItem(LS.invoices, JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem(LS.logs, JSON.stringify(logs)); }, [logs]);
  useEffect(() => { localStorage.setItem(LS.favs, JSON.stringify(favsMap)); }, [favsMap]);
  useEffect(() => { localStorage.setItem(LS.settings, JSON.stringify(settings)); }, [settings]);

  const toast = useCallback((message: string, type: ToastMsg["type"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const addLog = useCallback((action: string, level: AuditLog["level"], actorName?: string) => {
    const entry: AuditLog = {
      id: "L" + Date.now(),
      actor: actorName ?? (currentUser?.name || "System"),
      action,
      level,
      time: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    setLogs((l) => [entry, ...l].slice(0, 80));
  }, [currentUser]);

  const login = useCallback((email: string, password: string) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) return { ok: false, error: "No account found with this email." };
    if (user.password !== password) return { ok: false, error: "Incorrect password." };
    if (user.status === "suspended") return { ok: false, error: "This account has been suspended." };
    setCurrentUser(user);
    localStorage.setItem(LS.session, JSON.stringify(user.id));
    addLog(`${user.name} signed in`, "info", user.name);
    return { ok: true, user };
  }, [users, addLog]);

  const register = useCallback((name: string, email: string, password: string) => {
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase().trim())) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const user: User = {
      id: "u" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      password,
      role: "user",
      status: "active",
      joined: new Date().toISOString().slice(0, 10),
      country: "",
    };
    setUsers((u) => [...u, user]);
    setCurrentUser(user);
    localStorage.setItem(LS.session, JSON.stringify(user.id));
    addLog(`New traveler registered: ${user.name}`, "info", user.name);
    return { ok: true, user };
  }, [users, addLog]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(LS.session);
  }, []);

  const updateProfile = useCallback((patch: Partial<User>) => {
    setCurrentUser((cur) => {
      if (!cur) return cur;
      const updated = { ...cur, ...patch };
      setUsers((all) => all.map((u) => (u.id === cur.id ? updated : u)));
      return updated;
    });
    toast("Traveler profile updated successfully");
  }, [toast]);

  // Create Visa Application
  const createVisaApplication = useCallback((data: Omit<VisaApplication, "id" | "progress" | "status" | "submittedDate" | "embassyReference">): VisaApplication => {
    const newId = "VISA-" + data.destinationCountryId.toUpperCase().slice(0, 2) + "-" + Math.floor(1000 + Math.random() * 9000);
    const newApp: VisaApplication = {
      ...data,
      id: newId,
      status: "docs_review",
      progress: 35,
      submittedDate: new Date().toISOString().slice(0, 10),
      estimatedDecisionDate: new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10),
      embassyReference: `EMB-${data.destinationCountryId.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      consularOfficerNote: "Application received and queued for legal pre-screening. Documents verified.",
      evisaNumber: undefined,
    };

    setVisaApplications((prev) => [newApp, ...prev]);
    addLog(`New Visa Application submitted: ${newId} (${data.destinationCountry} - ${data.visaType})`, "info", data.applicantName);
    toast(`Visa application for ${data.destinationCountry} submitted! Tracking code: ${newId}`);
    return newApp;
  }, [addLog, toast]);

  // Update Visa Application Status
  const updateVisaApplicationStatus = useCallback((id: string, status: VisaApplicationStatus, note?: string) => {
    setVisaApplications((prev) =>
      prev.map((app) => {
        if (app.id !== id) return app;
        const progressMap: Record<VisaApplicationStatus, number> = {
          submitted: 20,
          docs_review: 40,
          embassy_processing: 75,
          action_required: 50,
          approved: 100,
          rejected: 100,
        };
        const evisaNumber = status === "approved" ? app.evisaNumber || `EV-${app.destinationCountryId.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}` : app.evisaNumber;
        return {
          ...app,
          status,
          progress: progressMap[status] ?? app.progress,
          consularOfficerNote: note || app.consularOfficerNote,
          evisaNumber,
        };
      })
    );
    addLog(`Visa application ${id} status changed to ${status}`, status === "rejected" ? "warning" : "info");
    toast(`Visa dossier ${id} updated to ${status}`);
  }, [addLog, toast]);

  // Vault Documents
  const uploadVaultDocument = useCallback((doc: Omit<VaultDocument, "id" | "uploadedDate" | "status">) => {
    const newDoc: VaultDocument = {
      ...doc,
      id: "v" + Date.now(),
      uploadedDate: new Date().toISOString().slice(0, 10),
      status: "verified",
    };
    setVaultDocuments((prev) => [newDoc, ...prev]);
    toast(`Document "${doc.title}" encrypted and saved to Vault`);
  }, [toast]);

  const deleteVaultDocument = useCallback((id: string) => {
    setVaultDocuments((prev) => prev.filter((d) => d.id !== id));
    toast("Document removed from Vault", "info");
  }, [toast]);

  // Appointments
  const scheduleAppointment = useCallback((app: Omit<Appointment, "id" | "status" | "qrCode">) => {
    const newApp: Appointment = {
      ...app,
      id: "APP-" + Math.floor(100 + Math.random() * 900),
      status: "scheduled",
      qrCode: `QR-APPOINTMENT-${Date.now()}`,
    };
    setAppointments((prev) => [newApp, ...prev]);
    toast(`Appointment scheduled for ${app.date} at ${app.time}`);
  }, [toast]);

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "rescheduled" } : a)));
    toast("Appointment cancelled", "info");
  }, [toast]);

  // Chat
  const sendChatMessage = useCallback((message: string) => {
    if (!message.trim() || !currentUser) return;
    const userMsg: ChatMessage = {
      id: "m" + Date.now(),
      userId: currentUser.id,
      sender: "user",
      senderName: currentUser.name,
      message: message.trim(),
      time: "Just now",
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated instant reply from Senior Visa Officer
    setTimeout(() => {
      const officerReplies = [
        "Thank you for contacting Foxico Consular Desk. Your document dossier has been verified against embassy standards. Is there any particular transit or health insurance question I can assist with?",
        "I've logged your request in our consular liaison queue. Your visa tracking status is updated in real time on your dashboard.",
        "Everything looks in order! You can download your official e-Visa certificate as soon as final clearance is granted by the immigration portal."
      ];
      const randomReply = officerReplies[Math.floor(Math.random() * officerReplies.length)];
      const officerMsg: ChatMessage = {
        id: "m" + (Date.now() + 1),
        userId: currentUser.id,
        sender: "concierge",
        senderName: "Claire Dupont (Senior Consular Officer)",
        message: randomReply,
        time: "Just now",
      };
      setChatMessages((prev) => [...prev, officerMsg]);
    }, 1200);
  }, [currentUser]);

  // Bookings
  const createBooking = useCallback((destinationId: string, date: string, guests: number): Booking | null => {
    if (!currentUser) return null;
    const dest = destinations.find((d) => d.id === destinationId);
    if (!dest) return null;
    const booking: Booking = {
      id: "BK-" + (1000 + bookings.length + 1),
      userId: currentUser.id,
      userName: currentUser.name,
      destinationId: dest.id,
      destinationName: dest.name,
      image: dest.image,
      date,
      guests,
      price: dest.price,
      total: dest.price * guests,
      status: settings.autoConfirm ? "confirmed" : "pending",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setBookings((b) => [booking, ...b]);
    addLog(`New booking ${booking.id} created for ${dest.name}`, "info", currentUser.name);
    toast(settings.autoConfirm ? "Trip booked and confirmed!" : "Trip booked! Awaiting confirmation.");
    return booking;
  }, [currentUser, destinations, bookings.length, settings.autoConfirm, addLog, toast]);

  const cancelBooking = useCallback((id: string) => {
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status: "cancelled" } : x)));
    addLog(`Booking ${id} was cancelled`, "warning", currentUser?.name);
    toast("Booking cancelled", "info");
  }, [addLog, currentUser, toast]);

  const setBookingStatus = useCallback((id: string, status: BookingStatus) => {
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));
    addLog(`Booking ${id} marked as ${status}`, status === "cancelled" ? "warning" : "info", currentUser?.name);
    toast(`Booking ${id} → ${status}`, status === "cancelled" ? "info" : "success");
  }, [addLog, currentUser, toast]);

  // Destination Catalog
  const addDestination = useCallback((d: Omit<Destination, "id">) => {
    const dest = { ...d, id: "d" + Date.now() };
    setDestinations((all) => [...all, dest]);
    addLog(`Added new destination: ${d.name}`, "info", currentUser?.name);
    toast("Destination added");
  }, [addLog, currentUser, toast]);

  const updateDestination = useCallback((id: string, patch: Partial<Destination>) => {
    setDestinations((all) => all.map((d) => (d.id === id ? { ...d, ...patch } : d)));
    addLog(`Updated destination ${patch.name ?? id}`, "info", currentUser?.name);
    toast("Destination updated");
  }, [addLog, currentUser, toast]);

  const deleteDestination = useCallback((id: string) => {
    setDestinations((all) => {
      const dest = all.find((d) => d.id === id);
      addLog(`Deleted destination: ${dest?.name ?? id}`, "warning", currentUser?.name);
      return all.filter((d) => d.id !== id);
    });
    toast("Destination deleted", "info");
  }, [addLog, currentUser, toast]);

  // Admin & Roles
  const setUserRole = useCallback((id: string, role: Role) => {
    setUsers((all) => {
      const target = all.find((u) => u.id === id);
      if (!target) return all;
      if (id === currentUser?.id && role !== "superadmin") {
        toast("You cannot demote your own super-admin account", "error");
        return all;
      }
      addLog(`Role changed: ${target.name} → ${role}`, "info", currentUser?.name);
      toast(`${target.name} is now ${role === "superadmin" ? "Super Admin" : role === "admin" ? "Admin" : "Traveler"}`);
      return all.map((u) => (u.id === id ? { ...u, role } : u));
    });
  }, [currentUser, addLog, toast]);

  const toggleUserStatus = useCallback((id: string) => {
    setUsers((all) => {
      const target = all.find((u) => u.id === id);
      if (!target) return all;
      if (id === currentUser?.id) {
        toast("You cannot suspend your own account", "error");
        return all;
      }
      const next = target.status === "active" ? "suspended" : "active";
      addLog(`User ${target.name} ${next === "suspended" ? "suspended" : "reactivated"}`, "warning", currentUser?.name);
      toast(`${target.name} ${next === "suspended" ? "suspended" : "reactivated"}`, "info");
      return all.map((u) => (u.id === id ? { ...u, status: next } : u));
    });
  }, [currentUser, addLog, toast]);

  const favorites = currentUser ? (favsMap[currentUser.id] ?? []) : [];

  const toggleFavorite = useCallback((destId: string) => {
    if (!currentUser) return;
    setFavsMap((m) => {
      const list = m[currentUser.id] ?? [];
      const has = list.includes(destId);
      const dest = destinations.find((d) => d.id === destId);
      toast(has ? "Removed from favorites" : `${dest?.name ?? "Trip"} saved to favorites`);
      return { ...m, [currentUser.id]: has ? list.filter((x) => x !== destId) : [...list, destId] };
    });
  }, [currentUser, destinations, toast]);

  const isFavorite = useCallback((destId: string) => favorites.includes(destId), [favorites]);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((s) => ({ ...s, ...patch }));
    addLog(`Platform settings updated`, "warning", currentUser?.name);
    toast("Settings saved");
  }, [addLog, currentUser, toast]);

  const clearLogs = useCallback(() => {
    setLogs([]);
    toast("Audit logs cleared", "info");
  }, [toast]);

  const resetDemoData = useCallback(() => {
    Object.values(LS).forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  }, []);

  const value: AppContextType = {
    theme, setTheme, toggleTheme,
    currentUser, users, bookings, destinations,
    visaApplications, vaultDocuments, appointments, chatMessages, invoices,
    favorites, logs, settings, toasts,
    login, register, logout, updateProfile,
    createVisaApplication, updateVisaApplicationStatus,
    uploadVaultDocument, deleteVaultDocument,
    scheduleAppointment, cancelAppointment, sendChatMessage,
    createBooking, cancelBooking, setBookingStatus,
    addDestination, updateDestination, deleteDestination,
    setUserRole, toggleUserStatus, toggleFavorite, isFavorite,
    updateSettings, clearLogs, resetDemoData, toast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/* ─────────────────────────── TOAST VIEWPORT ─────────────────────────── */
export function ToastViewport() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-[999] flex flex-col gap-2.5 pointer-events-none max-w-[calc(100vw-32px)]">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 ios-glass rounded-2xl px-4 py-3.5 shadow-2xl shadow-black/10 border border-white/80"
          >
            {t.type === "success" && <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />}
            {t.type === "error" && <AlertCircle size={18} className="text-rose-500 flex-shrink-0" />}
            {t.type === "info" && <Info size={18} className="text-blue-500 flex-shrink-0" />}
            <span className="text-slate-800 dark:text-white text-xs sm:text-sm font-semibold tracking-tight">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

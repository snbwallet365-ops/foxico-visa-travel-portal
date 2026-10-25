import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Send, ChevronDown, MessageSquare, Clock4, ShieldCheck, Building } from "lucide-react";
import { useApp } from "../context/AppContext";

const consularFaqs = [
  { q: "How quickly can Foxico secure a 24-Hour Super-Rush eVisa?", a: "For participating countries including Japan, Bali, and Thailand, applications submitted before 2:00 PM local consular time are adjudicated and transmitted to your dashboard within 24 business hours." },
  { q: "What should I do if the embassy requests additional documents?", a: "Our Senior Consular Officer assigned to your dossier receives the embassy RFI directly. You will get an instant alert on your dashboard with exact compliance instructions, and we resubmit on your behalf with zero additional filing fees." },
  { q: "Can I schedule a 1-on-1 consular prep consultation before my visa interview?", a: "Yes! Simply select 'Embassy Interview Preparation' in the inquiry subject below. We will match you with a former consular attaché specialized in your destination's specific visa category." },
  { q: "How are my passports and financial records secured?", a: "All uploads are encrypted using AES-256 and stored on ISO 27001-certified infrastructure. Documents are strictly accessible only by your accredited case officer and are permanently expunged upon visa issuance upon request." }
];

const offices = [
  { city: "London Headquarters", address: "1 Consular Way, Westminster, London SW1A 2AA", phone: "+44 20 7946 0912", email: "london@foxico.travel", color: "#f97316" },
  { city: "Tokyo Asia-Pacific Hub", address: "Kasumigaseki Diplomatic Tower, Chiyoda-ku, Tokyo 100-0013", phone: "+81 3 5555 0194", email: "tokyo@foxico.travel", color: "#3b82f6" },
  { city: "New York Liaison Office", address: "750 Third Avenue, Midtown Manhattan, NY 10017", phone: "+1 (800) 369-4261", email: "newyork@foxico.travel", color: "#10b981" }
];

export default function ContactPage() {
  const { toast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", subject: "Expedited Visa Review", destination: "Japan", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = "Please enter your full legal name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 15) e.message = "Message should be at least 15 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast("Please complete all required fields", "error");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "Expedited Visa Review", destination: "Japan", message: "" });
      toast("Inquiry dispatched! Your assigned consular attaché will reply within 2 hours.");
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-28 pb-28 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center max-w-2xl mx-auto"
        >
          <span className="text-orange-500 text-[10px] font-extrabold tracking-[0.3em] uppercase flex items-center justify-center gap-1.5 mb-2">
            <MessageSquare size={14} /> Consular Support Desk
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Speak With A <span className="text-orange-500">Consular Specialist</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Have questions about consular jurisdictions, document compliance, or super-rush expedited filing? Our accredited legal team is available 24/7.
          </p>
        </motion.div>

        {/* Global Offices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {offices.map((off, idx) => (
            <div key={idx} className="ios-glass-card rounded-3xl p-6 border border-white/80 dark:border-white/10 card-hover-ios">
              <div className="flex items-center gap-2 mb-3">
                <Building size={18} style={{ color: off.color }} />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{off.city}</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{off.address}</p>
              <div className="space-y-1.5 pt-3 border-t border-slate-200/50 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-orange-500" />
                  <span>{off.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-blue-500" />
                  <span>{off.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & FAQs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 ios-glass-card rounded-3xl p-6 sm:p-10 border border-white/80 dark:border-white/10">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Submit Consular Case Consultation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Fill in your traveler details below. A dedicated consular officer will review your case.
            </p>

            <form onSubmit={submit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Anney Rora"
                    className="w-full ios-glass-pill rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.name && <span className="text-rose-500 text-[10px] mt-1 block">{errors.name}</span>}
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="anney@example.com"
                    className="w-full ios-glass-pill rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {errors.email && <span className="text-rose-500 text-[10px] mt-1 block">{errors.email}</span>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Consultation Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full ios-glass-pill rounded-2xl px-4 py-3 text-xs font-semibold text-slate-800 dark:text-white cursor-pointer"
                  >
                    <option value="Expedited Visa Review">Expedited Visa Review (24h Rush)</option>
                    <option value="Digital Nomad Visa">Digital Nomad Relocation & Tax</option>
                    <option value="Schengen Multi-Country">Schengen Multi-Country Routing</option>
                    <option value="Interview Prep">Embassy Interview Preparation</option>
                    <option value="Custom Expedition">Bespoke Expedition Package</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Destination</label>
                  <input
                    type="text"
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    placeholder="e.g. Japan, Bali, France..."
                    className="w-full ios-glass-pill rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Case Details & Questions</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Provide your passport nationality, intended travel dates, or specific consular questions..."
                  className="w-full ios-glass-pill rounded-2xl p-4 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.message && <span className="text-rose-500 text-[10px] mt-1 block">{errors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 text-white font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
              >
                <Send size={14} />
                <span>{sending ? "Transmitting to Consular Desk..." : "Send Case Consultation"}</span>
              </button>
            </form>
          </div>

          {/* FAQs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Consular Consultation FAQs
            </h3>

            <div className="space-y-3">
              {consularFaqs.map((faq, idx) => (
                <div key={idx} className="ios-glass-card rounded-2xl border border-white/80 dark:border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-800 dark:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${openFaq === idx ? "rotate-180 text-orange-500" : ""}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200/50 dark:border-white/10 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

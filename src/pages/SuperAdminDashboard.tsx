import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShieldCheck, Users2, ScrollText, Settings as SettingsIcon,
  DollarSign, Users, Plane, Map, Crown, Check, X as XIcon, Trash2, RefreshCcw,
  Activity, Server, Database, Lock, ChevronDown, AlertTriangle, Globe, Sliders,
  Wifi, Zap, Key, Shield, Radio, Power
} from "lucide-react";
import { useApp, Role, Settings } from "../context/AppContext";
import { DashboardShell, StatCard, SectionCard, StatusBadge, EmptyState, MiniBarChart, Donut } from "../components/dashboard/shared";
import { VISA_COUNTRIES } from "../data/visaCountries";

const MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

const rolePermissions: { role: Role; color: string; icon: typeof Crown; perms: { label: string; granted: boolean }[] }[] = [
  {
    role: "user", color: "#3b82f6", icon: Users,
    perms: [
      { label: "Browse & book country visas & destinations", granted: true },
      { label: "Manage own applications & Document Vault", granted: true },
      { label: "Direct chat with assigned Senior Consular Officer", granted: true },
      { label: "Access Consular Review Workstation", granted: false },
      { label: "Modify government fee margins & platform settings", granted: false },
    ],
  },
  {
    role: "admin", color: "#10b981", icon: ShieldCheck,
    perms: [
      { label: "All traveler permissions", granted: true },
      { label: "Adjudicate dossiers & issue official e-Visas", granted: true },
      { label: "Manage destinations & travel packages", granted: true },
      { label: "Check-in applicants at biometric appointments", granted: true },
      { label: "Promote/demote super-admin accounts", granted: false },
    ],
  },
  {
    role: "superadmin", color: "#f97316", icon: Crown,
    perms: [
      { label: "Full consular adjudication & override authority", granted: true },
      { label: "Promote & demote admins & configure RBAC", granted: true },
      { label: "Full ISO 27001 audit log access & export", granted: true },
      { label: "Global visa fee rules & emergency border notices", granted: true },
      { label: "Enterprise infrastructure telemetry & reset", granted: true },
    ],
  },
];

const settingMeta: { key: keyof Settings; label: string; desc: string; dangerous?: boolean }[] = [
  { key: "maintenance", label: "Global Embassy Maintenance Mode", desc: "Display a maintenance notice across all public visa check tools.", dangerous: true },
  { key: "registrations", label: "Open Traveler Onboarding", desc: "Allow international travelers to register accounts without an invitation." },
  { key: "autoConfirm", label: "Instant Package Auto-Confirmation", desc: "Automatically approve non-regulated travel bookings upon successful payment." },
  { key: "emails", label: "Border Alert & Dispatch Emails", desc: "Transmit real-time biometric and decision dispatch emails to applicants." },
];

export default function SuperAdminDashboard() {
  const {
    users, bookings, destinations, visaApplications, logs, settings, invoices,
    setUserRole, toggleUserStatus, clearLogs, updateSettings, resetDemoData, toast
  } = useApp();

  const [tab, setTab] = useState("overview");
  const [userSearch, setUserSearch] = useState("");
  const [logFilter, setLogFilter] = useState<string>("all");
  const [emergencyText, setEmergencyText] = useState(settings.emergencyBorderNotice || "");

  const stats = useMemo(() => {
    const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0) + 148200;
    const monthly = [24500, 31200, 28900, 42100, 56300, 68400];
    const roles = {
      user: users.filter((u) => u.role === "user").length,
      admin: users.filter((u) => u.role === "admin").length,
      superadmin: users.filter((u) => u.role === "superadmin").length,
    };
    return { totalRevenue, monthly, roles };
  }, [invoices, users]);

  const admins = useMemo(() => users.filter((u) => u.role !== "user"), [users]);

  const filteredUsers = useMemo(() => {
    if (!userSearch.trim()) return users;
    const q = userSearch.toLowerCase();
    return users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [users, userSearch]);

  const filteredLogs = useMemo(() => {
    if (logFilter === "all") return logs;
    return logs.filter((l) => l.level === logFilter);
  }, [logs, logFilter]);

  const menu = [
    { key: "overview", label: "Enterprise Health", icon: LayoutDashboard },
    { key: "admins", label: "Consular Officers (RBAC)", icon: ShieldCheck, badge: admins.length },
    { key: "visa_rules", label: "Visa Rules & Margins", icon: Sliders },
    { key: "roles", label: "Users & Travelers", icon: Users2 },
    { key: "logs", label: "Security Audit Logs", icon: ScrollText },
    { key: "settings", label: "Governance & Danger Zone", icon: SettingsIcon },
  ];

  const levelColor: Record<string, string> = { info: "#3b82f6", warning: "#f59e0b", critical: "#f43f5e" };

  const handleSaveBorderNotice = () => {
    updateSettings({ emergencyBorderNotice: emergencyText });
    toast("Emergency border bulletin updated across all user touchpoints");
  };

  return (
    <DashboardShell
      title="Super Admin"
      subtitle={menu.find((m) => m.key === tab)?.label || "Enterprise Governance"}
      menu={menu}
      active={tab}
      onNavigate={setTab}
      accent="#f97316"
    >
      {/* ═════════════════════════════════════════════════════════════
          TAB 1: PLATFORM ENTERPRISE HEALTH
      ═════════════════════════════════════════════════════════════ */}
      {tab === "overview" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={DollarSign} label="YTD Consular Gross" value={`$${(stats.totalRevenue / 1000).toFixed(1)}K`} delta="+24.2% MoM" color="#10b981" />
            <StatCard icon={Users} label="Total Accounts" value={String(users.length)} delta="Active passports" color="#3b82f6" delay={0.05} />
            <StatCard icon={ShieldCheck} label="Visa Applications" value={String(visaApplications.length)} delta="Global dossiers" color="#f97316" delay={0.1} />
            <StatCard icon={Globe} label="Country Visa Portals" value={String(VISA_COUNTRIES.length)} delta="Live integrations" color="#8b5cf6" delay={0.15} />
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <SectionCard title="Platform Revenue Trajectory — 2026">
                <MiniBarChart data={stats.monthly} labels={MONTHS} color="#f97316" />
              </SectionCard>
            </div>

            <div className="lg:col-span-4">
              <SectionCard title="Account Role Distribution">
                <Donut
                  segments={[
                    { value: stats.roles.user, color: "#3b82f6", label: "Travelers" },
                    { value: stats.roles.admin, color: "#10b981", label: "Admins" },
                    { value: stats.roles.superadmin, color: "#f97316", label: "Super Admins" },
                  ]}
                />
              </SectionCard>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <SectionCard title="Global Infrastructure Telemetry">
              <div className="space-y-3">
                {[
                  { label: "Japan MOFA Electronic Gateway (J-eVisa API)", ping: "38ms", ok: true },
                  { label: "Schengen VIS / EES Biometric Node", ping: "54ms", ok: true },
                  { label: "UKVI Commercial Partner Connect", ping: "44ms", ok: true },
                  { label: "Zero-Knowledge Document Vault (AES-256)", ping: "12ms", ok: true },
                ].map((s, idx) => (
                  <div key={idx} className="p-3 bg-white/50 dark:bg-slate-900/40 rounded-2xl flex items-center justify-between text-xs border border-slate-200/50 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-semibold text-slate-800 dark:text-white">{s.label}</span>
                    </div>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{s.ping}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Audit Activity Feed" action={<button onClick={() => setTab("logs")} className="text-xs font-bold text-orange-500">View All →</button>}>
              <div className="space-y-3">
                {logs.slice(0, 4).map((l) => (
                  <div key={l.id} className="text-xs flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: levelColor[l.level] }} />
                    <div className="flex-1">
                      <div className="text-slate-800 dark:text-slate-200 font-medium">{l.action}</div>
                      <div className="text-[10px] text-slate-400">{l.actor} • {l.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 2: ADMIN TEAM & RBAC
      ═════════════════════════════════════════════════════════════ */}
      {tab === "admins" && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {admins.map((a) => (
              <div key={a.id} className="ios-glass-card rounded-3xl p-5 border border-white/80 dark:border-white/10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-extrabold text-xl flex items-center justify-center flex-shrink-0">
                  {a.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{a.name}</h4>
                    {a.role === "superadmin" && <Crown size={13} className="text-orange-500 flex-shrink-0" />}
                  </div>
                  <div className="text-xs text-slate-400 truncate mb-2">{a.email}</div>
                  <span className="text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    {a.role}
                  </span>
                </div>
                {a.role !== "superadmin" && (
                  <button
                    onClick={() => setUserRole(a.id, "user")}
                    className="text-xs text-slate-500 hover:text-rose-500 font-bold border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-xl"
                  >
                    Demote
                  </button>
                )}
              </div>
            ))}
          </div>

          <SectionCard title="Role Capability & Permissions Matrix">
            <div className="grid md:grid-cols-3 gap-4">
              {rolePermissions.map((r) => (
                <div key={r.role} className="p-5 bg-white/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: r.color }}>
                      <r.icon size={16} />
                    </div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white capitalize">{r.role}</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {r.perms.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {p.granted ? <Check size={14} className="text-emerald-500 mt-0.5" /> : <XIcon size={14} className="text-slate-300 dark:text-slate-600 mt-0.5" />}
                        <span className={p.granted ? "text-slate-700 dark:text-slate-200" : "text-slate-400 line-through"}>{p.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 3: VISA RULES ENGINE & MARGIN CONTROLS
      ═════════════════════════════════════════════════════════════ */}
      {tab === "visa_rules" && (
        <div className="space-y-6">
          <SectionCard title="Emergency Border Notice Broadcast">
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                This notice broadcasts instantly across the home page and country visa detail pages.
              </p>
              <textarea
                rows={3}
                value={emergencyText}
                onChange={(e) => setEmergencyText(e.target.value)}
                className="w-full ios-glass-pill rounded-2xl p-4 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleSaveBorderNotice}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-2xl text-xs shadow-md shadow-orange-500/25"
              >
                Broadcast Update
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Active Country Tariffs & Processing Speeds">
            <div className="space-y-2">
              {VISA_COUNTRIES.slice(0, 5).map((c) => (
                <div key={c.id} className="p-3 bg-white/50 dark:bg-slate-900/40 rounded-2xl flex items-center justify-between text-xs border border-slate-200/50 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.flag}</span>
                    <span className="font-bold text-slate-800 dark:text-white">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>Base Gov Fee: <strong>${c.startingPrice} USD</strong></span>
                    <span>Standard: <strong>{c.averageProcessingTime}</strong></span>
                    <span className="text-emerald-500 font-bold">Live</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 4: USERS & TRAVELERS
      ═════════════════════════════════════════════════════════════ */}
      {tab === "roles" && (
        <SectionCard
          title={`All Users (${users.length})`}
          action={
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search users..."
              className="ios-glass-pill px-4 py-2 text-xs rounded-2xl text-slate-800 dark:text-white"
            />
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200/60 dark:border-white/10 text-left text-slate-400">
                  <th className="pb-2">User</th>
                  <th className="pb-2">Role</th>
                  <th className="pb-2">Passport</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/40 dark:divide-white/5">
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3 font-semibold text-slate-800 dark:text-white">
                      {u.name} <span className="text-slate-400 text-[10px] block">{u.email}</span>
                    </td>
                    <td className="py-3">
                      <select
                        value={u.role}
                        onChange={(e) => setUserRole(u.id, e.target.value as Role)}
                        className="ios-glass-pill px-2.5 py-1 rounded-xl text-xs font-bold"
                      >
                        <option value="user">Traveler</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                      </select>
                    </td>
                    <td className="py-3 font-mono text-slate-500">{u.passportNumber || "—"}</td>
                    <td className="py-3"><StatusBadge status={u.status} /></td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className="text-slate-500 hover:text-orange-500 font-bold"
                      >
                        {u.status === "active" ? "Suspend" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 5: AUDIT LOGS
      ═════════════════════════════════════════════════════════════ */}
      {tab === "logs" && (
        <SectionCard
          title={`ISO 27001 Security Audit Logs (${logs.length})`}
          action={
            <div className="flex gap-2">
              <button
                onClick={clearLogs}
                className="text-rose-500 border border-rose-500/20 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-500/10"
              >
                Clear
              </button>
            </div>
          }
        >
          <div className="space-y-2">
            {logs.map((l) => (
              <div key={l.id} className="p-3 bg-white/50 dark:bg-slate-900/40 rounded-xl flex items-center justify-between text-xs border border-slate-200/50 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: levelColor[l.level] }} />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-white">{l.action}</span>
                    <span className="text-slate-400 text-[10px] block">{l.actor}</span>
                  </div>
                </div>
                <span className="font-mono text-slate-400 text-[10px]">{l.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ═════════════════════════════════════════════════════════════
          TAB 6: SETTINGS & DANGER ZONE
      ═════════════════════════════════════════════════════════════ */}
      {tab === "settings" && (
        <div className="space-y-6">
          <SectionCard title="Platform Governance Controls">
            <div className="space-y-4">
              {settingMeta.map((s) => {
                const on = settings[s.key];
                return (
                  <div key={s.key} className="flex items-center justify-between gap-4 p-3 bg-white/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-white/10">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white text-xs">{s.label}</div>
                      <div className="text-[11px] text-slate-400">{s.desc}</div>
                    </div>
                    <button
                      onClick={() => updateSettings({ [s.key]: !on })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${on ? "bg-orange-500" : "bg-slate-300 dark:bg-slate-700"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${on ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Enterprise Danger Zone">
            <div className="p-5 bg-rose-500/10 border border-rose-500/30 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-rose-600 text-sm mb-1">Reset Sandbox Data</h4>
                <p className="text-xs text-slate-500">
                  Resets demo state, clears local storage modifications, and restores certified baseline seed data.
                </p>
              </div>
              <button
                onClick={() => {
                  toast("Resetting platform environment...", "info");
                  setTimeout(resetDemoData, 600);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-2xl text-xs flex-shrink-0 shadow-md shadow-rose-600/30"
              >
                Reset Platform
              </button>
            </div>
          </SectionCard>
        </div>
      )}
    </DashboardShell>
  );
}

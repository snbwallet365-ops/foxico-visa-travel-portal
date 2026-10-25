import { Link, useLocation } from "react-router-dom";
import { Home, Globe, Compass, ShieldCheck, Sun, Moon, LayoutDashboard } from "lucide-react";
import { useApp } from "../context/AppContext";
import { dashboardPath } from "./Navbar";

export default function MobileBottomNav() {
  const location = useLocation();
  const { currentUser, visaApplications, theme, toggleTheme } = useApp();

  const activeVisasCount = visaApplications.filter(
    (a) => a.userId === currentUser?.id && a.status !== "approved" && a.status !== "rejected"
  ).length;

  const isCurrent = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: "Home", to: "/", icon: Home },
    { label: "Visa Hub", to: "/visa/japan", icon: Globe },
    { label: "Explore", to: "/destinations", icon: Compass },
    {
      label: "My Visas",
      to: "/dashboard/user",
      icon: ShieldCheck,
      badge: activeVisasCount > 0 ? activeVisasCount : undefined,
    },
    {
      label: currentUser?.role && currentUser.role !== "user" ? "Admin" : "Dashboard",
      to: dashboardPath(currentUser?.role),
      icon: LayoutDashboard,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-50 pointer-events-none">
      <div className="pointer-events-auto ios-glass rounded-3xl p-1.5 shadow-2xl shadow-slate-900/15 border border-white/90 flex items-center justify-around">
        {navItems.map((item) => {
          const active = isCurrent(item.to);
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-300 ${
                active
                  ? "bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25"
                  : "text-slate-600 dark:text-slate-300 hover:text-orange-500"
              }`}
            >
              <div className="relative">
                <item.icon size={19} className={active ? "text-white" : "text-current"} />
                {item.badge ? (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white shadow">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-semibold mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* Quick Theme Switcher Pill */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl text-slate-500 dark:text-slate-300 hover:text-orange-500 transition-colors"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
          <span className="text-[9px] font-semibold mt-0.5 tracking-tight">{theme === "light" ? "Dark" : "Light"}</span>
        </button>
      </div>
    </div>
  );
}

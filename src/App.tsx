import { useEffect, ReactNode } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider, useApp, ToastViewport, Role } from "./context/AppContext";
import Navbar, { dashboardPath } from "./components/Navbar";
import MobileBottomNav from "./components/MobileBottomNav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CountryVisaDetailPage from "./pages/CountryVisaDetailPage";
import DestinationsPage from "./pages/DestinationsPage";
import NewsPage from "./pages/NewsPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

/* ── Scroll to top on navigation ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

/* ── Route guard ── */
function ProtectedRoute({ children, roles }: { children: ReactNode; roles: Role[] }) {
  const { currentUser } = useApp();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }
  if (!roles.includes(currentUser.role)) {
    return <Navigate to={dashboardPath(currentUser.role)} replace />;
  }
  return <>{children}</>;
}

/* ── Dashboard index redirect ── */
function DashboardIndex() {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/auth" replace />;
  return <Navigate to={dashboardPath(currentUser.role)} replace />;
}

/* ── Layout shell ── */
function Shell() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 dark:bg-[#070b13] dark:text-slate-100 overflow-x-hidden transition-colors duration-400">
      <ScrollToTop />
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visa/:countryId" element={<CountryVisaDetailPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardIndex />} />
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute roles={["user", "admin", "superadmin"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute roles={["admin", "superadmin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/super"
          element={
            <ProtectedRoute roles={["superadmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isDashboard && <Footer />}
      <MobileBottomNav />
      <ToastViewport />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </AppProvider>
  );
}

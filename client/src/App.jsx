import { useState } from "react";
import GlobalStyles from "./styles/globals";
import useAuth from "./hooks/useAuth";

import Nav     from "./components/layout/Nav";
import Sidebar from "./components/layout/Sidebar";

import HomePage     from "./pages/HomePage";
import AuthPage     from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ScanPage     from "./pages/ScanPage";
import ReportPage   from "./pages/ReportPage";
import SettingsPage from "./pages/SettingsPage";

// Pages that require the user to be logged in
const PROTECTED = ["dashboard", "scan", "report", "settings"];

// Pages that show the sidebar
const SIDEBAR_PAGES = ["dashboard", "scan", "report", "settings"];

export default function App() {
  const { authed, setAuthed } = useAuth();
  const [page,     setPage]     = useState("home");
  const [reportId, setReportId] = useState(null);

  // Auth guard — redirect to login if trying to access a protected page
  const navigate = (p) => {
    if (PROTECTED.includes(p) && !authed) {
      setPage("login");
    } else {
      setPage(p);
    }
  };

  const showSidebar = authed && SIDEBAR_PAGES.includes(page);

  return (
    <>
      {/* Inject global CSS variables + keyframes */}
      <style>{GlobalStyles}</style>

      <Nav page={page} setPage={navigate} authed={authed} setAuthed={setAuthed} />

      {showSidebar && <Sidebar page={page} setPage={setPage} />}

      {/* Page routing */}
      {page === "home"      && <HomePage      setPage={navigate} />}
      {page === "login"     && <AuthPage      mode="login"    setPage={setPage} setAuthed={setAuthed} />}
      {page === "register"  && <AuthPage      mode="register" setPage={setPage} setAuthed={setAuthed} />}
      {page === "dashboard" && authed && <DashboardPage setPage={setPage} setReportId={setReportId} />}
      {page === "scan"      && authed && <ScanPage      setPage={setPage} />}
      {page === "report"    && authed && <ReportPage    reportId={reportId} />}
      {page === "settings"  && authed && <SettingsPage />}
    </>
  );
}
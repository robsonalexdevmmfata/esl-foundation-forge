import { Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isAuthenticated, logout } from "@/lib/auth";
import { getConfig } from "@/lib/site-config";

export function AdminLayout() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(getConfig());

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  useEffect(() => {
    const handleConfigChange = () => {
      setConfig(getConfig());
    };
    window.addEventListener("siteConfigChanged", handleConfigChange);
    return () => window.removeEventListener("siteConfigChanged", handleConfigChange);
  }, []);

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <img
            src={config.logo.navbar || "/logo.png"}
            alt="ESL Facility Admin"
            className="h-16 w-auto bg-white rounded-lg p-2"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/logo.png";
            }}
          />
          <h2 className="mt-3 text-lg font-bold">Painel Admin</h2>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
            activeProps={{ className: "bg-slate-700" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </Link>

          <Link
            to="/admin/logo-navbar"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
            activeProps={{ className: "bg-slate-700" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Logo e Navbar
          </Link>

          <Link
            to="/admin/cores-textos"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors"
            activeProps={{ className: "bg-slate-700" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Cores e Textos
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors w-full text-left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}

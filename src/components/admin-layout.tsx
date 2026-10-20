import { Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { isAuthenticated, logout } from "@/lib/auth";
import { getConfig } from "@/lib/site-config";

type AdminLayoutProps = {
  children?: ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [config, setConfig] = useState(getConfig());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const isAdminArea = currentPath === "/admin" || currentPath.startsWith("/admin/");
    const isPublicAdminPath =
      currentPath === "/admin" || currentPath === "/admin/" || currentPath === "/admin/login";

    if (!isAdminArea || isPublicAdminPath) {
      setAccessChecked(true);
      return;
    }

    let cancelled = false;
    void isAuthenticated()
      .then((authenticated) => {
        if (cancelled) return;
        setAccessChecked(true);
        if (!authenticated) void navigate({ to: "/admin/login" });
      })
      .catch((error: unknown) => {
        console.error("Não foi possível verificar a sessão administrativa.", error);
        if (cancelled) return;
        setAccessChecked(true);
        void navigate({ to: "/admin/login" });
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    const handleConfigChange = () => {
      setConfig(getConfig());
    };
    window.addEventListener("siteConfigChanged", handleConfigChange);
    return () => window.removeEventListener("siteConfigChanged", handleConfigChange);
  }, []);

  const handleLogout = async () => {
    await logout();
    await navigate({ to: "/admin/login" });
  };

  if (!accessChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f6] px-4 text-sm text-slate-600">
        Verificando acesso...
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3f4f6] text-slate-900">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-slate-950/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-dvh w-[min(84vw,280px)] flex-col overflow-y-auto bg-[#1d2e40] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-200 md:w-[240px] md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
            <img
              src={config.logo.navbar || "/logo.png"}
              alt="ESL Facility Admin"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
          </div>
        </div>

        <div className="px-5 pb-4">
          <h2 className="text-[16px] font-bold tracking-[-0.02em] text-white">Painel Admin</h2>
        </div>

        <nav className="space-y-2 px-3 pt-2">
          <Link
            to="/admin/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-200 transition-all hover:bg-white/5 hover:text-white"
            activeProps={{
              className: "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.08)]",
            }}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </span>
            Dashboard
          </Link>

          <Link
            to="/admin/clientes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-200 transition-all hover:bg-white/5 hover:text-white"
            activeProps={{
              className: "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.08)]",
            }}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
            Clientes
          </Link>

          <Link
            to="/admin/projetos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-200 transition-all hover:bg-white/5 hover:text-white"
            activeProps={{
              className: "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.08)]",
            }}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm3 0V5m10 2V5M8 11h8M8 15h5"
                />
              </svg>
            </span>
            Projetos
          </Link>

          <Link
            to="/admin/financeiro"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-200 transition-all hover:bg-white/5 hover:text-white"
            activeProps={{
              className: "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.08)]",
            }}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            Financeiro
          </Link>

          <Link
            to="/admin/logo-navbar"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-200 transition-all hover:bg-white/5 hover:text-white"
            activeProps={{
              className: "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.08)]",
            }}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            Logo e Navbar
          </Link>

          <Link
            to="/admin/cores-textos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-200 transition-all hover:bg-white/5 hover:text-white"
            activeProps={{
              className: "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.08)]",
            }}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </span>
            Cores e Textos
          </Link>

          <Link
            to="/admin/conteudo"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-200 transition-all hover:bg-white/5 hover:text-white"
            activeProps={{
              className: "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.08)]",
            }}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
            Conteúdo das Seções
          </Link>

          <Link
            to="/admin/contatos"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-slate-200 transition-all hover:bg-white/5 hover:text-white"
            activeProps={{
              className: "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.08)]",
            }}
          >
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11 11 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>
            Contatos e Redes
          </Link>
        </nav>

        <div className="mt-auto border-t border-white/10 p-4">
          <button
            onClick={() => void handleLogout()}
            className="flex w-full items-center gap-3 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-3 text-left text-sm font-medium text-red-100 transition hover:bg-red-500/20"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sair
          </button>
        </div>
      </aside>

      <div className="fixed inset-x-0 top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm md:hidden">
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">Painel de Gestão</p>
          <p className="truncate text-xs text-slate-500">E.S.L & Empreendimentos</p>
        </div>
      </div>

      <main className="min-h-screen min-w-0 bg-[#f3f4f6] px-4 pb-6 pt-[76px] sm:px-6 md:ml-[240px] md:px-8 md:py-8">
        <div className="mx-auto w-full min-w-0 max-w-[1500px]">{children ?? <Outlet />}</div>
      </main>
    </div>
  );
}

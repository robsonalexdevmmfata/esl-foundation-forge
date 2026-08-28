import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-700">
      <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Painel administrativo</h1>
        <p className="mt-2 text-sm text-slate-600">Acesse diretamente em /admin/login</p>
      </div>
    </div>
  );
}

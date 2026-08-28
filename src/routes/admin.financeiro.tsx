import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";

const valores = [
  { mes: "Jan", faturamento: 46000 },
  { mes: "Fev", faturamento: 52000 },
  { mes: "Mar", faturamento: 61000 },
  { mes: "Abr", faturamento: 70000 },
  { mes: "Mai", faturamento: 78000 },
  { mes: "Jun", faturamento: 92000 },
];

export const Route = createFileRoute("/admin/financeiro")({
  component: () => (
    <AdminLayout>
      <FinanceiroPage />
    </AdminLayout>
  ),
});

function FinanceiroPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const total = valores.reduce((acc, item) => acc + item.faturamento, 0);
  const media = Math.round(total / valores.length);

  const exportReport = (type: "doc" | "pdf" | "xls") => {
    const content = valores
      .map((item) => `${item.mes}: R$ ${item.faturamento.toLocaleString("pt-BR")}`)
      .join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio-financeiro.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setMenuOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Financeiro</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Receita e desempenho</h1>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
            >
              Exportar relatório
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <button type="button" onClick={() => exportReport("doc")} className="block w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50">Exportar .doc</button>
                <button type="button" onClick={() => exportReport("pdf")} className="block w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50">Exportar .pdf</button>
                <button type="button" onClick={() => exportReport("xls")} className="block w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50">Exportar .xls</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Faturamento total</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">R$ {total.toLocaleString("pt-BR")}</p>
          <p className="mt-2 text-sm text-emerald-600">+22% no período</p>
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Média mensal</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">R$ {media.toLocaleString("pt-BR")}</p>
          <p className="mt-2 text-sm text-blue-600">Estável</p>
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Projetos fechados</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">34</p>
          <p className="mt-2 text-sm text-violet-600">11 no último mês</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <h2 className="mb-5 text-lg font-semibold text-slate-800">Faturamento mensal</h2>
        <div className="space-y-4">
          {valores.map((item) => (
            <div key={item.mes}>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>{item.mes}</span>
                <span>R$ {item.faturamento.toLocaleString("pt-BR")}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  style={{ width: `${(item.faturamento / 92000) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

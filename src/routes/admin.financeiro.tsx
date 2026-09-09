import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { brl, computeMetrics, useAdminData } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/financeiro")({
  component: () => (
    <AdminLayout>
      <FinanceiroPage />
    </AdminLayout>
  ),
});

function download(name: string, content: string, mime: string) {
  const blob = new Blob(["\uFEFF" + content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

function FinanceiroPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useAdminData();
  const m = computeMetrics(data);

  const rows = () => {
    const linhas: string[][] = [];
    linhas.push(["RESUMO GERAL"]);
    linhas.push(["Indicador", "Valor"]);
    linhas.push(["Total de clientes", String(m.totalClientes)]);
    linhas.push(["Clientes fechados", String(m.clientesFechados)]);
    linhas.push(["Clientes em negociação", String(m.clientesNegociacao)]);
    linhas.push(["Ticket médio", brl(m.ticketMedio)]);
    linhas.push(["Total de projetos", String(m.totalProjetos)]);
    linhas.push(["Projetos em execução", String(m.projetosExecucao)]);
    linhas.push(["Projetos concluídos", String(m.projetosConcluidos)]);
    linhas.push(["Projetos aguardando aprovação", String(m.projetosAguardando)]);
    linhas.push(["Carteira total", brl(m.carteira)]);
    linhas.push(["Receita realizada", brl(m.receitaRealizada)]);
    linhas.push(["Progresso médio", `${m.progressoMedio}%`]);
    linhas.push([]);
    linhas.push(["CLIENTES"]);
    linhas.push(["Nome", "WhatsApp", "E-mail", "Setor", "Valor", "Status", "Data"]);
    data.clientes.forEach((c) =>
      linhas.push([c.nome, c.whatsapp, c.email, c.setor, String(c.valor), c.status, c.data]),
    );
    linhas.push([]);
    linhas.push(["PROJETOS"]);
    linhas.push(["Projeto", "Cliente", "Valor", "Status", "Progresso", "Início", "Prazo"]);
    data.projetos.forEach((p) =>
      linhas.push([p.nome, p.cliente, String(p.valor), p.status, `${p.progresso}%`, p.inicio, p.prazo]),
    );
    linhas.push([]);
    linhas.push(["EVOLUÇÃO MENSAL"]);
    linhas.push(["Mês", "Projetos iniciados", "Clientes novos", "Receita"]);
    m.porMes.forEach((r) =>
      linhas.push([r.name, String(r.projetos), String(r.clientes), String(r.receita)]),
    );
    return linhas;
  };

  const stamp = new Date().toISOString().slice(0, 10);

  const exportCsv = () => {
    const csv = rows().map((r) => r.map(esc).join(";")).join("\n");
    download(`relatorio-financeiro-${stamp}.csv`, csv, "text/csv");
    setMenuOpen(false);
  };

  const exportXls = () => {
    const body = rows()
      .map((r) => `<tr>${r.map((cell) => `<td>${String(cell ?? "")}</td>`).join("")}</tr>`)
      .join("");
    const html = `<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8" /></head><body><table border="1">${body}</table></body></html>`;
    download(`relatorio-financeiro-${stamp}.xls`, html, "application/vnd.ms-excel");
    setMenuOpen(false);
  };

  const exportJson = () => {
    download(
      `relatorio-financeiro-${stamp}.json`,
      JSON.stringify({ gerado_em: new Date().toISOString(), metricas: m, ...data }, null, 2),
      "application/json",
    );
    setMenuOpen(false);
  };

  const maxReceita = Math.max(1, ...m.porMes.map((r) => r.receita));

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Financeiro</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Receita e desempenho</h1>
            <p className="mt-1 text-sm text-slate-500">
              Dados apurados de {m.totalClientes} clientes e {m.totalProjetos} projetos cadastrados.
            </p>
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
              <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                <button type="button" onClick={exportXls} className="block w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50">Excel (.xls)</button>
                <button type="button" onClick={exportCsv} className="block w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50">Planilha (.csv)</button>
                <button type="button" onClick={exportJson} className="block w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50">Dados completos (.json)</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {[
          { label: "Carteira total", value: brl(m.carteira), hint: `${m.totalProjetos} projetos` },
          { label: "Receita realizada", value: brl(m.receitaRealizada), hint: `${m.progressoMedio}% de progresso médio` },
          { label: "Ticket médio", value: brl(m.ticketMedio), hint: `${m.totalClientes} clientes` },
          { label: "Projetos concluídos", value: String(m.projetosConcluidos), hint: `${m.projetosExecucao} em execução` },
        ].map((card) => (
          <div key={card.label} className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">{card.value}</p>
            <p className="mt-2 text-sm text-emerald-600">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <h2 className="mb-5 text-lg font-semibold text-slate-800">Receita iniciada por mês</h2>
        {m.porMes.length === 0 && <p className="text-sm text-slate-500">Sem dados cadastrados ainda.</p>}
        <div className="space-y-4">
          {m.porMes.map((item) => (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>{item.name}</span>
                <span>{brl(item.receita)}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  style={{ width: `${(item.receita / maxReceita) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin-layout";

const initialProjetos = [
  { nome: "Residencial Jardins", cliente: "Casa Vista", valor: "R$ 180.000", status: "Fechado", progresso: 92 },
  { nome: "Prime Center", cliente: "Prime Center", valor: "R$ 420.000", status: "Em execução", progresso: 68 },
  { nome: "Loja Leste", cliente: "Leste Group", valor: "R$ 95.000", status: "Aguardando aprovação", progresso: 42 },
  { nome: "Sun Houses", cliente: "Residencial Sun", valor: "R$ 260.000", status: "Fechado", progresso: 100 },
];

export const Route = createFileRoute("/admin/projetos")({
  component: () => (
    <AdminLayout>
      <ProjetosPage />
    </AdminLayout>
  ),
});

function ProjetosPage() {
  const [projetos, setProjetos] = useState(initialProjetos);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    cliente: "",
    valor: "",
    status: "Em execução",
  });

  const totalEmCarteira = useMemo(
    () => projetos.reduce((acc, projeto) => acc + Number(String(projeto.valor).replace(/\D/g, "")) / 1000, 0),
    [projetos],
  );

  const handleCreateProject = () => {
    if (!form.nome || !form.cliente || !form.valor) return;

    setProjetos((current) => [
      {
        nome: form.nome,
        cliente: form.cliente,
        valor: `R$ ${Number(form.valor).toLocaleString("pt-BR")}`,
        status: form.status,
        progresso: form.status === "Fechado" ? 100 : form.status === "Em execução" ? 60 : 35,
      },
      ...current,
    ]);

    setForm({ nome: "", cliente: "", valor: "", status: "Em execução" });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Projetos</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Projetos e cronograma</h1>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
          >
            + Novo projeto
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total em carteira</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">R$ {totalEmCarteira.toFixed(0)}K</p>
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Em execução</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{projetos.filter((p) => p.status === "Em execução").length}</p>
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Concluídos</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{projetos.filter((p) => p.status === "Fechado").length}</p>
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Aguardando</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{projetos.filter((p) => p.status === "Aguardando aprovação").length}</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Projetos em andamento</h2>
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">Status geral</span>
        </div>

        <div className="space-y-5">
          {projetos.map((projeto) => (
            <div key={`${projeto.nome}-${projeto.cliente}`} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{projeto.nome}</h3>
                  <p className="text-sm text-slate-500">Cliente: {projeto.cliente}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{projeto.valor}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    projeto.status === "Fechado"
                      ? "bg-emerald-100 text-emerald-700"
                      : projeto.status === "Em execução"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                  }`}>
                    {projeto.status}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Progresso</span>
                  <span>{projeto.progresso}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-600"
                    style={{ width: `${projeto.progresso}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Novo projeto</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nome do projeto</label>
                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-violet-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Cliente</label>
                <input value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-violet-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Valor</label>
                <input type="number" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-violet-500" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-violet-500">
                  <option>Em execução</option>
                  <option>Aguardando aprovação</option>
                  <option>Fechado</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600">Cancelar</button>
              <button type="button" onClick={handleCreateProject} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

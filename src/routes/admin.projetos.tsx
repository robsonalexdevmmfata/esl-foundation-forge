import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";
import { AdminLayout } from "@/components/admin-layout";
import {
  addProjeto,
  brl,
  computeMetrics,
  removeProjeto,
  updateProjeto,
  useAdminData,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/projetos")({
  component: () => (
    <AdminLayout>
      <ProjetosPage />
    </AdminLayout>
  ),
});

const PIE_COLORS = ["#7c3aed", "#2563eb", "#f59e0b", "#059669", "#dc2626"];

const emptyForm = {
  nome: "",
  cliente: "",
  valor: "",
  status: "Em execução",
  progresso: "40",
  inicio: new Date().toISOString().slice(0, 10),
  prazo: "",
};

function ProjetosPage() {
  const data = useAdminData();
  const metrics = computeMetrics(data);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [erro, setErro] = useState("");

  const handleCreateProject = () => {
    if (!form.nome.trim() || !form.cliente.trim()) return setErro("Preencha nome e cliente.");
    addProjeto({
      nome: form.nome.trim(),
      cliente: form.cliente.trim(),
      valor: Number(form.valor) || 0,
      status: form.status,
      progresso: Math.min(100, Math.max(0, Number(form.progresso) || 0)),
      inicio: form.inicio,
      prazo: form.prazo || form.inicio,
    });
    setForm(emptyForm);
    setErro("");
    setIsOpen(false);
  };

  const cronograma = data.projetos.map((p) => ({
    name: p.nome.length > 14 ? `${p.nome.slice(0, 14)}…` : p.nome,
    progresso: p.progresso,
    restante: Math.max(0, 100 - p.progresso),
  }));

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
        <Stat label="Total em carteira" value={brl(metrics.carteira)} />
        <Stat label="Em execução" value={String(metrics.projetosExecucao)} />
        <Stat label="Concluídos" value={String(metrics.projetosConcluidos)} />
        <Stat label="Aguardando" value={String(metrics.projetosAguardando)} />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Panel title="Progresso por projeto" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cronograma}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis unit="%" tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Legend />
              <Bar dataKey="progresso" name="Concluído" stackId="a" fill="#7c3aed" radius={[0, 0, 6, 6]} />
              <Bar dataKey="restante" name="Restante" stackId="a" fill="#e2e8f0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Projetos por status">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={metrics.porStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                {metrics.porStatus.map((entry, i) => (
                  <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel title="Valor iniciado por mês">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={metrics.porMes}>
            <defs>
              <linearGradient id="grad-projetos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${Math.round(v / 1000)}K`} />
            <Tooltip formatter={(v: number) => brl(v)} />
            <Area type="monotone" dataKey="receita" name="Valor" stroke="#7c3aed" fill="url(#grad-projetos)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Projetos em andamento</h2>
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">Progresso médio {metrics.progressoMedio}%</span>
        </div>

        <div className="space-y-5">
          {data.projetos.map((projeto) => (
            <div key={projeto.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{projeto.nome}</h3>
                  <p className="text-sm text-slate-500">
                    Cliente: {projeto.cliente} · Início {projeto.inicio.split("-").reverse().join("/")} · Prazo {projeto.prazo.split("-").reverse().join("/")}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{brl(projeto.valor)}</span>
                  <select
                    value={projeto.status}
                    onChange={(e) => updateProjeto(projeto.id, { status: e.target.value })}
                    className="rounded-lg border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                  >
                    <option>Em execução</option>
                    <option>Aguardando aprovação</option>
                    <option>Fechado</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeProjeto(projeto.id)}
                    className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Progresso</span>
                  <span>{projeto.progresso}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={projeto.progresso}
                  onChange={(e) => updateProjeto(projeto.id, { progresso: Number(e.target.value) })}
                  className="w-full accent-violet-600"
                />
              </div>
            </div>
          ))}
          {data.projetos.length === 0 && <p className="py-6 text-center text-slate-400">Nenhum projeto cadastrado.</p>}
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
              <Field label="Nome do projeto">
                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Cliente">
                <input
                  list="clientes-existentes"
                  value={form.cliente}
                  onChange={(e) => setForm({ ...form, cliente: e.target.value })}
                  className={inputClass}
                />
                <datalist id="clientes-existentes">
                  {data.clientes.map((c) => (
                    <option key={c.id} value={c.nome} />
                  ))}
                </datalist>
              </Field>
              <Field label="Valor (R$)">
                <input type="number" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} className={inputClass} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Início">
                  <input type="date" value={form.inicio} onChange={(e) => setForm({ ...form, inicio: e.target.value })} className={inputClass} />
                </Field>
                <Field label="Prazo">
                  <input type="date" value={form.prazo} onChange={(e) => setForm({ ...form, prazo: e.target.value })} className={inputClass} />
                </Field>
              </div>
              <Field label="Status">
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                  <option>Em execução</option>
                  <option>Aguardando aprovação</option>
                  <option>Fechado</option>
                </select>
              </Field>
              <Field label={`Progresso (${form.progresso}%)`}>
                <input type="range" min={0} max={100} value={form.progresso} onChange={(e) => setForm({ ...form, progresso: e.target.value })} className="w-full accent-violet-600" />
              </Field>
              {erro && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{erro}</p>}
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

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-violet-500";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ${className}`}>
      <h3 className="mb-4 text-base font-semibold text-slate-800">{title}</h3>
      {children}
    </div>
  );
}

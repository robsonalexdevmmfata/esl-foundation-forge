import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AdminLayout } from "@/components/admin-layout";
import { AdminLink } from "@/components/admin-layout";
import { brl, computeMetrics, useAdminData, whatsappLink } from "@/lib/admin-store";
import { useSiteConfig } from "@/lib/use-site-config";

export const Route = createFileRoute("/admin/_auth/dashboard")({
  component: () => (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  ),
});

const CORES = ["#1E5F4D", "#C96E48", "#E0B05C", "#0ea5e9", "#8b5cf6", "#10b981"];

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ${className}`}>
      {children}
    </div>
  );
}

function AdminDashboard() {
  const data = useAdminData();
  const m = computeMetrics(data);
  const config = useSiteConfig();

  const kpis = [
    { label: "Clientes cadastrados", value: String(m.totalClientes), delta: `${m.clientesFechados} fechados · ${m.clientesNegociacao} em negociação` },
    { label: "Projetos", value: String(m.totalProjetos), delta: `${m.projetosExecucao} em execução · ${m.projetosConcluidos} concluídos` },
    { label: "Carteira contratada", value: brl(m.carteira), delta: `Ticket médio ${brl(m.ticketMedio)}` },
    { label: "Receita realizada", value: brl(m.receitaRealizada), delta: `Progresso médio ${m.progressoMedio}%` },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.03)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Overview</p>
          <h1 className="text-[34px] font-bold tracking-[-0.04em] text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Dados reais de clientes, projetos e do conteúdo publicado no site
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {config.logo.navbar ? (
            <img src={config.logo.navbar} alt="Logo do site" className="h-9 w-auto object-contain" />
          ) : null}
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Site</p>
            <strong className="block text-slate-700">{config.navbar.buttonText}</strong>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((card, i) => (
          <Card key={card.label} className="transition-transform duration-200 hover:-translate-y-1">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{card.value}</p>
            <p className="mt-4 text-xs font-medium" style={{ color: CORES[i % CORES.length] }}>
              {card.delta}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Projetos e receita por mês</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={m.porMes}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Legend />
                <Bar dataKey="projetos" name="Projetos" radius={[8, 8, 0, 0]} fill="#1E5F4D" />
                <Bar dataKey="receita" name="Valor (R$)" radius={[8, 8, 0, 0]} fill="#E0B05C" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Clientes por setor</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={m.porSetor}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {m.porSetor.map((_, i) => (
                    <Cell key={i} fill={CORES[i % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Novos clientes por mês</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={m.porMes}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Legend />
                <Line type="monotone" dataKey="clientes" name="Clientes" stroke="#C96E48" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Projetos por status</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={m.porStatus} layout="vertical">
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={140} tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="value" name="Projetos" radius={[0, 8, 8, 0]} fill="#1E5F4D" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card>
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-800">Projetos em andamento</h3>
            <AdminLink to="/admin/projetos" className="text-sm font-semibold text-emerald-700 hover:underline">
              Gerenciar
            </AdminLink>
          </div>
          <div className="space-y-4">
            {data.projetos.length === 0 && <p className="text-sm text-slate-500">Nenhum projeto cadastrado.</p>}
            {data.projetos.map((p) => (
              <div key={p.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-slate-800">{p.nome}</h4>
                    <p className="mt-1 text-xs text-slate-500">
                      {p.cliente} · Prazo: {p.prazo}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">{p.progresso}%</span>
                </div>
                <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-amber-500" style={{ width: `${p.progresso}%` }} />
                </div>
                <p className="text-sm text-slate-500">
                  {p.status} · {brl(p.valor)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-800">Clientes recentes</h3>
            <AdminLink to="/admin/clientes" className="text-sm font-semibold text-emerald-700 hover:underline">
              Gerenciar
            </AdminLink>
          </div>
          <div className="space-y-3">
            {data.clientes.length === 0 && <p className="text-sm text-slate-500">Nenhum cliente cadastrado.</p>}
            {data.clientes.slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700">
                  {c.nome.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-700">{c.nome}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {c.setor} · {c.status} · {brl(c.valor)}
                  </p>
                </div>
                {c.whatsapp && (
                  <a
                    href={whatsappLink(c.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-emerald-600 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

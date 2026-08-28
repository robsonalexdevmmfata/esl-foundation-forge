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
  AreaChart,
  Area,
} from "recharts";
import { AdminLayout } from "@/components/admin-layout";

export const Route = createFileRoute("/admin/_auth/dashboard")({
  component: () => (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  ),
});

const projectData = [
  { name: "Jan", projetos: 4, receita: 45000 },
  { name: "Fev", projetos: 6, receita: 62000 },
  { name: "Mar", projetos: 8, receita: 78000 },
  { name: "Abr", projetos: 5, receita: 55000 },
  { name: "Mai", projetos: 10, receita: 95000 },
  { name: "Jun", projetos: 7, receita: 72000 },
];

const servicesData = [
  { name: "Construção Residencial", value: 35, color: "#166534" },
  { name: "Construção Comercial", value: 25, color: "#78350f" },
  { name: "Retrofit", value: 20, color: "#f59e0b" },
  { name: "Manutenção", value: 15, color: "#059669" },
  { name: "Consultoria", value: 5, color: "#dc2626" },
];

const clientData = [
  { name: "Sem 1", novos: 12, recorrentes: 45 },
  { name: "Sem 2", novos: 15, recorrentes: 48 },
  { name: "Sem 3", novos: 8, recorrentes: 52 },
  { name: "Sem 4", novos: 20, recorrentes: 55 },
];

const performanceData = [
  { name: "Jan", satisfacao: 85, entregas: 92 },
  { name: "Fev", satisfacao: 88, entregas: 90 },
  { name: "Mar", satisfacao: 90, entregas: 95 },
  { name: "Abr", satisfacao: 87, entregas: 88 },
  { name: "Mai", satisfacao: 92, entregas: 96 },
  { name: "Jun", satisfacao: 94, entregas: 98 },
];

const recentActivities = [
  { id: 1, type: "projeto", description: "Novo projeto: Residencial Jardins", time: "2 horas atrás", status: "em_andamento" },
  { id: 2, type: "orcamento", description: "Orçamento solicitado: Loja Centro", time: "4 horas atrás", status: "pendente" },
  { id: 3, type: "cliente", description: "Novo cliente: Tech Solutions", time: "6 horas atrás", status: "aprovado" },
  { id: 4, type: "entrega", description: "Projeto entregue: Galpão Industrial", time: "1 dia atrás", status: "concluido" },
  { id: 5, type: "pagamento", description: "Pagamento recebido: Retrofit Prime", time: "2 dias atrás", status: "concluido" },
];

const activeProjects = [
  { id: 1, name: "Residencial Jardins", progress: 75, deadline: "2024-09-15", budget: "R$ 450.000" },
  { id: 2, name: "Corporate Center Norte", progress: 45, deadline: "2024-10-20", budget: "R$ 890.000" },
  { id: 3, name: "Loja Centro", progress: 30, deadline: "2024-08-30", budget: "R$ 320.000" },
  { id: 4, name: "Retrofit Lobby Prime", progress: 90, deadline: "2024-08-10", budget: "R$ 180.000" },
];

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.03)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Overview</p>
          <h1 className="text-[38px] font-bold tracking-[-0.04em] text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Visão geral do desempenho do site</p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Hoje</p>
            <strong className="block text-slate-700">18:42</strong>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Projetos Ativos", value: "24", delta: "+12% este mês", tone: "blue", icon: "projects" },
          { label: "Receita Mensal", value: "R$ 407K", delta: "+8% este mês", tone: "amber", icon: "money" },
          { label: "Clientes Ativos", value: "156", delta: "+5% este mês", tone: "green", icon: "users" },
          { label: "Orçamentos", value: "89", delta: "+18% este mês", tone: "purple", icon: "docs" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{card.value}</p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  card.tone === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : card.tone === "amber"
                      ? "bg-amber-100 text-amber-600"
                      : card.tone === "green"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-violet-100 text-violet-600"
                }`}
              >
                {card.icon === "projects" && (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )}
                {card.icon === "money" && (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {card.icon === "users" && (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
                {card.icon === "docs" && (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
              </div>
            </div>

            <p
              className={`mt-5 text-sm font-medium ${
                card.tone === "blue"
                  ? "text-blue-600"
                  : card.tone === "amber"
                    ? "text-amber-600"
                    : card.tone === "green"
                      ? "text-emerald-600"
                      : "text-violet-600"
              }`}
            >
              {card.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-800">Taxa de Conversão</h3>
            <span className="text-2xl font-bold text-emerald-600">24%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600" style={{ width: "24%" }} />
          </div>
          <p className="mt-3 text-sm text-slate-500">+3% vs mês anterior</p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-800">Satisfação Cliente</h3>
            <span className="text-2xl font-bold text-blue-600">4.8/5</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-500">Baseado em 156 avaliações</p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-800">Tempo Médio Resposta</h3>
            <span className="text-2xl font-bold text-violet-600">2.4h</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <p className="text-sm font-medium text-emerald-600">-30% vs mês anterior</p>
          </div>
          <p className="mt-3 text-sm text-slate-500">Média de 89 orçamentos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Projetos e Receita</h3>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">Mensal</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}
                />
                <Legend />
                <Bar dataKey="projetos" name="Projetos" radius={[8, 8, 0, 0]} fill="#3b82f6" />
                <Bar dataKey="receita" name="Receita (R$)" radius={[8, 8, 0, 0]} fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Serviços</h3>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">Mix</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={servicesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {servicesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Participação"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Crescimento de Clientes</h3>
            <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-600">Semanal</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={clientData}>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}
                />
                <Legend />
                <Line type="monotone" dataKey="novos" name="Novos" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="recorrentes" name="Recorrentes" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Desempenho e Qualidade</h3>
            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">KPI</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="fillSatisfacao" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="fillEntregas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}
                />
                <Legend />
                <Area type="monotone" dataKey="satisfacao" name="Satisfação" stroke="#10b981" fill="url(#fillSatisfacao)" strokeWidth={3} />
                <Area type="monotone" dataKey="entregas" name="Entregas" stroke="#8b5cf6" fill="url(#fillEntregas)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-5 text-lg font-semibold text-slate-800">Projetos em Andamento</h3>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-slate-800">{project.name}</h4>
                    <p className="mt-1 text-xs text-slate-500">Prazo: {project.deadline}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">{project.progress}%</span>
                </div>
                <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${project.progress}%` }} />
                </div>
                <p className="text-sm text-slate-500">Orçamento: {project.budget}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <h3 className="mb-5 text-lg font-semibold text-slate-800">Atividades Recentes</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    activity.status === "concluido"
                      ? "bg-emerald-100 text-emerald-600"
                      : activity.status === "em_andamento"
                        ? "bg-blue-100 text-blue-600"
                        : activity.status === "pendente"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-violet-100 text-violet-600"
                  }`}
                >
                  {activity.type === "projeto" && (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {activity.type === "orcamento" && (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {activity.type === "cliente" && (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {activity.type === "entrega" && (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {activity.type === "pagamento" && (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-700">{activity.description}</p>
                  <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin-layout";
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

export const Route = createFileRoute("/admin/dashboard")({
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

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral do desempenho do site</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Projetos Ativos</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">24</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="text-green-600 text-sm mt-3">+12% este mês</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Receita Mensal</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">R$ 407K</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-amber-600 text-sm mt-3">+8% este mês</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Clientes Ativos</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">156</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-blue-600 text-sm mt-3">+5% este mês</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Orçamentos</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">89</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-purple-600 text-sm mt-3">+18% este mês</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Projetos e Receita</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="projetos" fill="#166534" name="Projetos" />
              <Bar dataKey="receita" fill="#f59e0b" name="Receita (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Serviços</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={servicesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {servicesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Crescimento de Clientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="novos" stroke="#166534" strokeWidth={2} name="Novos Clientes" />
              <Line type="monotone" dataKey="recorrentes" stroke="#f59e0b" strokeWidth={2} name="Clientes Recorrentes" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

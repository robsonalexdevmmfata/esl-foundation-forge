import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin-layout";

const clientes = [
  { nome: "Casa Vista", valor: "R$ 180.000", status: "Fechado", data: "18/08/2026", setor: "Residencial" },
  { nome: "Prime Center", valor: "R$ 420.000", status: "Em execução", data: "10/08/2026", setor: "Comercial" },
  { nome: "Loja Leste", valor: "R$ 95.000", status: "Em negociação", data: "05/08/2026", setor: "Comercial" },
  { nome: "Residencial Sun", valor: "R$ 260.000", status: "Fechado", data: "02/08/2026", setor: "Residencial" },
];

export const Route = createFileRoute("/admin/clientes")({
  component: () => (
    <AdminLayout>
      <ClientesPage />
    </AdminLayout>
  ),
});

function ClientesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Clientes</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Gestão de clientes</h1>
          </div>
          <button className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
            + Novo cliente
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Clientes fechados</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">128</p>
          <p className="mt-2 text-sm text-emerald-600">+14% no mês</p>
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Em negociação</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">21</p>
          <p className="mt-2 text-sm text-amber-600">5 aguardando retorno</p>
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Ticket médio</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">R$ 48K</p>
          <p className="mt-2 text-sm text-blue-600">+8% em relação ao mês passado</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Clientes recentes</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">Últimos 30 dias</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-3 pr-4 font-medium">Cliente</th>
                <th className="py-3 pr-4 font-medium">Setor</th>
                <th className="py-3 pr-4 font-medium">Valor</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.nome} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-800">{cliente.nome}</td>
                  <td className="py-3 pr-4">{cliente.setor}</td>
                  <td className="py-3 pr-4">{cliente.valor}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      cliente.status === "Fechado"
                        ? "bg-emerald-100 text-emerald-700"
                        : cliente.status === "Em execução"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                    }`}>
                      {cliente.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">{cliente.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

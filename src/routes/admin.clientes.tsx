import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import {
  addCliente,
  brl,
  computeMetrics,
  removeCliente,
  useAdminData,
  whatsappLink,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/clientes")({
  component: () => (
    <AdminLayout>
      <ClientesPage />
    </AdminLayout>
  ),
});

const emptyForm = {
  nome: "",
  whatsapp: "",
  email: "",
  setor: "Residencial",
  valor: "",
  status: "Em negociação",
};

function ClientesPage() {
  const data = useAdminData();
  const metrics = computeMetrics(data);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [erro, setErro] = useState("");

  const handleSave = () => {
    if (!form.nome.trim()) return setErro("Informe o nome do cliente.");
    if (form.whatsapp.replace(/\D/g, "").length < 10) return setErro("Informe um WhatsApp válido com DDD.");

    addCliente({
      nome: form.nome.trim(),
      whatsapp: form.whatsapp.replace(/\D/g, ""),
      email: form.email.trim(),
      setor: form.setor,
      valor: Number(form.valor) || 0,
      status: form.status,
    });

    setForm(emptyForm);
    setErro("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Clientes</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Gestão de clientes</h1>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
          >
            + Novo cliente
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <Card label="Total de clientes" value={String(metrics.totalClientes)} tone="text-slate-600" />
        <Card label="Clientes fechados" value={String(metrics.clientesFechados)} tone="text-emerald-600" />
        <Card label="Em negociação" value={String(metrics.clientesNegociacao)} tone="text-amber-600" />
        <Card label="Ticket médio" value={brl(metrics.ticketMedio)} tone="text-blue-600" />
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Clientes cadastrados</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {data.clientes.length} registros
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-3 pr-4 font-medium">Cliente</th>
                <th className="py-3 pr-4 font-medium">WhatsApp</th>
                <th className="py-3 pr-4 font-medium">Setor</th>
                <th className="py-3 pr-4 font-medium">Valor</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Data</th>
                <th className="py-3 pr-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-800">
                    {cliente.nome}
                    {cliente.email && <span className="block text-xs text-slate-400">{cliente.email}</span>}
                  </td>
                  <td className="py-3 pr-4">
                    <a
                      href={whatsappLink(cliente.whatsapp, `Olá ${cliente.nome}, aqui é da ESL FACILITY!`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                    >
                      {cliente.whatsapp || "—"}
                    </a>
                  </td>
                  <td className="py-3 pr-4">{cliente.setor}</td>
                  <td className="py-3 pr-4">{brl(cliente.valor)}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        cliente.status === "Fechado"
                          ? "bg-emerald-100 text-emerald-700"
                          : cliente.status === "Em execução"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {cliente.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">{cliente.data.split("-").reverse().join("/")}</td>
                  <td className="py-3 pr-4">
                    <button
                      type="button"
                      onClick={() => removeCliente(cliente.id)}
                      className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {data.clientes.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">Nenhum cliente cadastrado ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Novo cliente</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-4">
              <Field label="Nome do cliente">
                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputClass} />
              </Field>
              <Field label="WhatsApp (com DDD)">
                <input
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="11988887777"
                  className={inputClass}
                />
              </Field>
              <Field label="E-mail">
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Setor">
                <select value={form.setor} onChange={(e) => setForm({ ...form, setor: e.target.value })} className={inputClass}>
                  <option>Residencial</option>
                  <option>Comercial</option>
                  <option>Industrial</option>
                  <option>Manutenção</option>
                </select>
              </Field>
              <Field label="Valor estimado (R$)">
                <input type="number" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} className={inputClass} />
              </Field>
              <Field label="Status">
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                  <option>Em negociação</option>
                  <option>Em execução</option>
                  <option>Fechado</option>
                </select>
              </Field>
              {erro && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{erro}</p>}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600">Cancelar</button>
              <button type="button" onClick={handleSave} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Salvar cliente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Card({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-3 text-3xl font-bold text-slate-900`}>{value}</p>
      <p className={`mt-2 text-sm ${tone}`}>Atualizado em tempo real</p>
    </div>
  );
}

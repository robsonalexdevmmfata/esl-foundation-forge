import { useEffect, useState } from "react";

export type Cliente = {
  id: string;
  nome: string;
  whatsapp: string;
  email: string;
  setor: string;
  valor: number;
  status: "Fechado" | "Em execução" | "Em negociação" | string;
  data: string;
};

export type Projeto = {
  id: string;
  nome: string;
  cliente: string;
  valor: number;
  status: "Fechado" | "Em execução" | "Aguardando aprovação" | string;
  progresso: number;
  inicio: string;
  prazo: string;
};

export type AdminData = {
  clientes: Cliente[];
  projetos: Projeto[];
};

const KEY = "admin_data";
const EVENT = "adminDataChanged";

const hoje = () => new Date().toISOString().slice(0, 10);

export const defaultAdminData: AdminData = {
  clientes: [
    { id: "c1", nome: "Casa Vista", whatsapp: "5511988880001", email: "contato@casavista.com.br", setor: "Residencial", valor: 180000, status: "Fechado", data: "2026-08-18" },
    { id: "c2", nome: "Prime Center", whatsapp: "5511988880002", email: "obras@primecenter.com.br", setor: "Comercial", valor: 420000, status: "Em execução", data: "2026-08-10" },
    { id: "c3", nome: "Loja Leste", whatsapp: "5511988880003", email: "adm@lojaleste.com.br", setor: "Comercial", valor: 95000, status: "Em negociação", data: "2026-08-05" },
    { id: "c4", nome: "Residencial Sun", whatsapp: "5511988880004", email: "sun@residencial.com.br", setor: "Residencial", valor: 260000, status: "Fechado", data: "2026-08-02" },
  ],
  projetos: [
    { id: "p1", nome: "Residencial Jardins", cliente: "Casa Vista", valor: 180000, status: "Fechado", progresso: 92, inicio: "2026-03-02", prazo: "2026-09-15" },
    { id: "p2", nome: "Prime Center", cliente: "Prime Center", valor: 420000, status: "Em execução", progresso: 68, inicio: "2026-04-10", prazo: "2026-10-20" },
    { id: "p3", nome: "Loja Leste", cliente: "Leste Group", valor: 95000, status: "Aguardando aprovação", progresso: 42, inicio: "2026-05-06", prazo: "2026-08-30" },
    { id: "p4", nome: "Sun Houses", cliente: "Residencial Sun", valor: 260000, status: "Fechado", progresso: 100, inicio: "2026-01-15", prazo: "2026-07-28" },
  ],
};

export function getAdminData(): AdminData {
  if (typeof window === "undefined") return defaultAdminData;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultAdminData;
    const parsed = JSON.parse(raw) as Partial<AdminData>;
    return {
      clientes: Array.isArray(parsed.clientes) ? parsed.clientes : defaultAdminData.clientes,
      projetos: Array.isArray(parsed.projetos) ? parsed.projetos : defaultAdminData.projetos,
    };
  } catch {
    return defaultAdminData;
  }
}

export function saveAdminData(data: AdminData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(EVENT));
}

export function addCliente(cliente: Omit<Cliente, "id" | "data"> & { data?: string }): void {
  const data = getAdminData();
  saveAdminData({
    ...data,
    clientes: [
      { ...cliente, id: `c${Date.now()}`, data: cliente.data || hoje() },
      ...data.clientes,
    ],
  });
}

export function removeCliente(id: string): void {
  const data = getAdminData();
  saveAdminData({ ...data, clientes: data.clientes.filter((c) => c.id !== id) });
}

export function addProjeto(projeto: Omit<Projeto, "id">): void {
  const data = getAdminData();
  saveAdminData({ ...data, projetos: [{ ...projeto, id: `p${Date.now()}` }, ...data.projetos] });
}

export function updateProjeto(id: string, patch: Partial<Projeto>): void {
  const data = getAdminData();
  saveAdminData({
    ...data,
    projetos: data.projetos.map((p) => (p.id === id ? { ...p, ...patch } : p)),
  });
}

export function removeProjeto(id: string): void {
  const data = getAdminData();
  saveAdminData({ ...data, projetos: data.projetos.filter((p) => p.id !== id) });
}

export function useAdminData(): AdminData {
  const [data, setData] = useState<AdminData>(() => getAdminData());
  useEffect(() => {
    const sync = () => setData(getAdminData());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return data;
}

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function whatsappLink(numero: string, texto?: string) {
  const digits = (numero || "").replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

export type Metrics = {
  totalClientes: number;
  clientesFechados: number;
  clientesNegociacao: number;
  ticketMedio: number;
  totalProjetos: number;
  projetosExecucao: number;
  projetosConcluidos: number;
  projetosAguardando: number;
  carteira: number;
  receitaRealizada: number;
  progressoMedio: number;
  porSetor: Array<{ name: string; value: number }>;
  porStatus: Array<{ name: string; value: number }>;
  porMes: Array<{ name: string; projetos: number; receita: number; clientes: number }>;
};

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function computeMetrics(data: AdminData): Metrics {
  const { clientes, projetos } = data;
  const somaClientes = clientes.reduce((a, c) => a + (Number(c.valor) || 0), 0);
  const carteira = projetos.reduce((a, p) => a + (Number(p.valor) || 0), 0);
  const receitaRealizada = projetos.reduce(
    (a, p) => a + ((Number(p.valor) || 0) * (Number(p.progresso) || 0)) / 100,
    0,
  );

  const setorMap = new Map<string, number>();
  clientes.forEach((c) => setorMap.set(c.setor || "Outros", (setorMap.get(c.setor || "Outros") ?? 0) + 1));

  const statusMap = new Map<string, number>();
  projetos.forEach((p) => statusMap.set(p.status, (statusMap.get(p.status) ?? 0) + 1));

  const mesMap = new Map<string, { projetos: number; receita: number; clientes: number }>();
  const bump = (iso: string, key: "projetos" | "clientes", receita = 0) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return;
    const label = MESES[d.getMonth()] ?? "—";
    const entry = mesMap.get(label) ?? { projetos: 0, receita: 0, clientes: 0 };
    entry[key] += 1;
    entry.receita += receita;
    mesMap.set(label, entry);
  };
  projetos.forEach((p) => bump(p.inicio, "projetos", Number(p.valor) || 0));
  clientes.forEach((c) => bump(c.data, "clientes", 0));

  const porMes = MESES.filter((m) => mesMap.has(m)).map((m) => ({
    name: m,
    ...(mesMap.get(m) as { projetos: number; receita: number; clientes: number }),
  }));

  return {
    totalClientes: clientes.length,
    clientesFechados: clientes.filter((c) => c.status === "Fechado").length,
    clientesNegociacao: clientes.filter((c) => c.status === "Em negociação").length,
    ticketMedio: clientes.length ? Math.round(somaClientes / clientes.length) : 0,
    totalProjetos: projetos.length,
    projetosExecucao: projetos.filter((p) => p.status === "Em execução").length,
    projetosConcluidos: projetos.filter((p) => p.status === "Fechado").length,
    projetosAguardando: projetos.filter((p) => p.status === "Aguardando aprovação").length,
    carteira,
    receitaRealizada: Math.round(receitaRealizada),
    progressoMedio: projetos.length
      ? Math.round(projetos.reduce((a, p) => a + (Number(p.progresso) || 0), 0) / projetos.length)
      : 0,
    porSetor: [...setorMap.entries()].map(([name, value]) => ({ name, value })),
    porStatus: [...statusMap.entries()].map(([name, value]) => ({ name, value })),
    porMes,
  };
}

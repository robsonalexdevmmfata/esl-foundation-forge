import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { getConfig, saveConfig, type SiteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/admin/_auth/contatos")({
  component: () => (
    <AdminLayout>
      <ContatosEditor />
    </AdminLayout>
  ),
});

const card =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]";
const input =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500";
const labelCls = "text-xs font-semibold uppercase tracking-wide text-slate-500";

type ContatoKey = keyof SiteConfig["contato"];

const CAMPOS: Array<{ key: ContatoKey; label: string; ajuda?: string; area?: boolean }> = [
  { key: "razaoSocial", label: "Razão social" },
  { key: "cnpj", label: "CNPJ" },
  { key: "telefone", label: "Telefone exibido" },
  { key: "whatsapp", label: "Número do WhatsApp", ajuda: "Somente números, com DDI. Ex.: 5538998421869" },
  { key: "email", label: "E-mail" },
  { key: "sede", label: "Sede" },
  { key: "atuacao", label: "Área de atuação" },
  { key: "horario", label: "Horário de atendimento" },
  { key: "mensagemWhatsapp", label: "Mensagem automática do WhatsApp", area: true },
];

function ContatosEditor() {
  const [config, setConfig] = useState<SiteConfig>(() => getConfig());
  const [salvo, setSalvo] = useState(true);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  const update = (next: SiteConfig) => {
    setConfig(next);
    setSalvo(false);
  };

  const setContato = (key: ContatoKey, value: string) =>
    update({ ...config, contato: { ...config.contato, [key]: value } });

  const setSocial = (i: number, patch: Partial<{ label: string; url: string }>) =>
    update({
      ...config,
      sociais: config.sociais.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    });

  const salvar = () => {
    saveConfig(config);
    setSalvo(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Contatos e Redes Sociais</h1>
          <p className="text-sm text-slate-500">
            Dados exibidos na seção de contato, no rodapé e no botão do WhatsApp.
          </p>
        </div>
        <button
          onClick={salvar}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          {salvo ? "Salvo" : "Salvar alterações"}
        </button>
      </div>

      <section className={card}>
        <h2 className="text-lg font-semibold">Dados de contato</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {CAMPOS.map((campo) => (
            <div key={campo.key} className={campo.area ? "md:col-span-2" : ""}>
              <label className={labelCls}>{campo.label}</label>
              {campo.area ? (
                <textarea
                  rows={2}
                  className={input}
                  value={config.contato[campo.key]}
                  onChange={(e) => setContato(campo.key, e.target.value)}
                />
              ) : (
                <input
                  className={input}
                  value={config.contato[campo.key]}
                  onChange={(e) => setContato(campo.key, e.target.value)}
                />
              )}
              {campo.ajuda && <p className="mt-1 text-xs text-slate-400">{campo.ajuda}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">Redes sociais</h2>
            <p className="text-xs text-slate-500">Links exibidos no rodapé do site.</p>
          </div>
          <button
            onClick={() =>
              update({ ...config, sociais: [...config.sociais, { label: "Nova rede", url: "" }] })
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            + Adicionar rede
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {config.sociais.map((s, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="w-40">
                <label className={labelCls}>Nome</label>
                <input
                  className={input}
                  value={s.label}
                  onChange={(e) => setSocial(i, { label: e.target.value })}
                />
              </div>
              <div className="min-w-[240px] flex-1">
                <label className={labelCls}>Endereço (URL)</label>
                <input
                  className={input}
                  value={s.url}
                  onChange={(e) => setSocial(i, { url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <button
                onClick={() =>
                  update({ ...config, sociais: config.sociais.filter((_, idx) => idx !== i) })
                }
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
              >
                Remover
              </button>
            </div>
          ))}
          {config.sociais.length === 0 && (
            <p className="text-sm text-slate-400">Nenhuma rede cadastrada.</p>
          )}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          onClick={salvar}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          {salvo ? "Salvo" : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}

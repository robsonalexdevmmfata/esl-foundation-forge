import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { getConfig, saveConfig, type ItemTexto, type SiteConfig } from "@/lib/site-config";
import { readImageFile } from "@/lib/image-upload";

export const Route = createFileRoute("/admin/_auth/conteudo")({
  component: () => (
    <AdminLayout>
      <ConteudoEditor />
    </AdminLayout>
  ),
});

type BlocoKey = "credenciais" | "areas" | "modelos" | "etapas" | "organizacoes";

const SECOES: Array<{ key: BlocoKey; titulo: string; ajuda: string }> = [
  {
    key: "credenciais",
    titulo: "Credenciais (seção A Empresa)",
    ajuda: "Itens exibidos abaixo do texto institucional.",
  },
  {
    key: "areas",
    titulo: "Áreas de atuação (cartões numerados)",
    ajuda: "Cada item vira um cartão numerado na seção Áreas de Atuação.",
  },
  {
    key: "modelos",
    titulo: "Modelos de contratação",
    ajuda: "Blocos exibidos na seção Modelos de Contratação.",
  },
  {
    key: "etapas",
    titulo: "Etapas da metodologia",
    ajuda: "Passos numerados da seção Metodologia.",
  },
  {
    key: "organizacoes",
    titulo: "Organizações atendidas",
    ajuda: "Perfis de contratantes exibidos no site.",
  },
];

const card =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06)]";
const input =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500";
const label = "text-xs font-semibold uppercase tracking-wide text-slate-500";

function ConteudoEditor() {
  const [config, setConfig] = useState<SiteConfig>(() => getConfig());
  const [salvo, setSalvo] = useState(true);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  const update = (next: SiteConfig) => {
    setConfig(next);
    setSalvo(false);
  };

  const setLista = (key: BlocoKey, lista: ItemTexto[]) =>
    update({ ...config, blocos: { ...config.blocos, [key]: lista } });

  const salvar = () => {
    if (saveConfig(config)) {
      setSalvo(true);
    } else {
      window.alert(
        "Não foi possível salvar: o armazenamento do navegador está cheio. Use logos menores ou remova algumas.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Conteúdo das seções</h1>
          <p className="text-sm text-slate-500">
            Edite os blocos de texto que aparecem na página inicial.
          </p>
        </div>
        <button
          onClick={salvar}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          {salvo ? "Salvo" : "Salvar alterações"}
        </button>
      </div>

      {SECOES.map((secao) => {
        const lista = config.blocos[secao.key];
        return (
          <section key={secao.key} className={card}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold">{secao.titulo}</h2>
                <p className="text-xs text-slate-500">{secao.ajuda}</p>
              </div>
              <button
                onClick={() => setLista(secao.key, [...lista, { titulo: "Novo item", texto: "" }])}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                + Adicionar item
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {lista.map((item, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <label className={label}>Título</label>
                      <input
                        className={input}
                        value={item.titulo}
                        onChange={(e) =>
                          setLista(
                            secao.key,
                            lista.map((it, idx) =>
                              idx === i ? { ...it, titulo: e.target.value } : it,
                            ),
                          )
                        }
                      />
                      <label className={`${label} mt-3 block`}>Texto</label>
                      <textarea
                        rows={3}
                        className={input}
                        value={item.texto}
                        onChange={(e) =>
                          setLista(
                            secao.key,
                            lista.map((it, idx) =>
                              idx === i ? { ...it, texto: e.target.value } : it,
                            ),
                          )
                        }
                      />
                    </div>
                    <button
                      onClick={() =>
                        setLista(
                          secao.key,
                          lista.filter((_, idx) => idx !== i),
                        )
                      }
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
              {lista.length === 0 && (
                <p className="text-sm text-slate-400">Nenhum item cadastrado.</p>
              )}
            </div>
          </section>
        );
      })}

      {/* CONFORMIDADE */}
      <section className={card}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">Itens de conformidade</h2>
            <p className="text-xs text-slate-500">
              Lista da seção "Segurança jurídica ao contratante".
            </p>
          </div>
          <button
            onClick={() =>
              update({
                ...config,
                blocos: {
                  ...config.blocos,
                  conformidade: [...config.blocos.conformidade, "Novo item"],
                },
              })
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            + Adicionar item
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {config.blocos.conformidade.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                className={input}
                value={item}
                onChange={(e) =>
                  update({
                    ...config,
                    blocos: {
                      ...config.blocos,
                      conformidade: config.blocos.conformidade.map((it, idx) =>
                        idx === i ? e.target.value : it,
                      ),
                    },
                  })
                }
              />
              <button
                onClick={() =>
                  update({
                    ...config,
                    blocos: {
                      ...config.blocos,
                      conformidade: config.blocos.conformidade.filter((_, idx) => idx !== i),
                    },
                  })
                }
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTES */}
      <section className={card}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">Empresas que já nos contrataram</h2>
            <p className="text-xs text-slate-500">
              Logos exibidas no carrossel abaixo do formulário de contato.
            </p>
          </div>
          <button
            onClick={() =>
              update({
                ...config,
                blocos: {
                  ...config.blocos,
                  clientes: [...config.blocos.clientes, { nome: "Nova empresa", src: "" }],
                },
              })
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            + Adicionar empresa
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {config.blocos.clientes.map((cliente, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                  {cliente.src ? (
                    <img
                      src={cliente.src}
                      alt={cliente.nome}
                      className="max-h-12 max-w-[80px] object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400">sem imagem</span>
                  )}
                </div>
                <div className="flex-1">
                  <label className={label}>Nome</label>
                  <input
                    className={input}
                    value={cliente.nome}
                    onChange={(e) =>
                      update({
                        ...config,
                        blocos: {
                          ...config.blocos,
                          clientes: config.blocos.clientes.map((it, idx) =>
                            idx === i ? { ...it, nome: e.target.value } : it,
                          ),
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                  Enviar logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      if (!file) return;
                      readImageFile(file, 500)
                        .then((src) =>
                          update({
                            ...config,
                            blocos: {
                              ...config.blocos,
                              clientes: config.blocos.clientes.map((it, idx) =>
                                idx === i ? { ...it, src } : it,
                              ),
                            },
                          }),
                        )
                        .catch((err: unknown) =>
                          window.alert(
                            err instanceof Error ? err.message : "Não foi possível ler a imagem.",
                          ),
                        );
                    }}
                  />
                </label>
                <button
                  onClick={() =>
                    update({
                      ...config,
                      blocos: {
                        ...config.blocos,
                        clientes: config.blocos.clientes.filter((_, idx) => idx !== i),
                      },
                    })
                  }
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
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

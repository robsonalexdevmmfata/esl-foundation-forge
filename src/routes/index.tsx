import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppFloat } from "@/components/site";
import { themeVars, whatsappHref } from "@/lib/site-config";
import { useSiteConfig } from "@/lib/use-site-config";
import heroCorporativo from "@/assets/corporativo-hero.jpg";
import equipeCorporativa from "@/assets/equipe-corporativa.jpg";
import projeto1 from "@/assets/projeto-1.jpg";
import projeto2 from "@/assets/projeto-2.jpg";
import projeto3 from "@/assets/projeto-3.jpg";
import projeto4 from "@/assets/projeto-4.jpg";

const title = "E.S.L & Empreendimentos — Comunicação Institucional, Coordenação e Execução";
const description =
  "Serviços corporativos e institucionais em comunicação, coordenação e execução de projetos e operações, com equipe própria e contratos formais, para empresas, órgãos públicos e associações em todo o território nacional.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Galeria mantida oculta até haver registro fotográfico próprio de contratos executados. */
const MOSTRAR_PORTFOLIO = false;
const portfolio = [
  { img: projeto1, nome: "Contrato executado", resumo: "Registro fotográfico pendente." },
  { img: projeto2, nome: "Contrato executado", resumo: "Registro fotográfico pendente." },
  { img: projeto3, nome: "Contrato executado", resumo: "Registro fotográfico pendente." },
  { img: projeto4, nome: "Contrato executado", resumo: "Registro fotográfico pendente." },
];

function Index() {
  const config = useSiteConfig();
  const t = config.texts;
  const c = config.contato;
  const whatsapp = whatsappHref(c);
  const clientes = config.blocos.clientes;
  const clientesLoop = clientes.length ? [...clientes, ...clientes] : [];

  return (
    <div className="min-h-screen bg-background" style={themeVars(config.colors)}>
      <Header />
      <main>
        {/* HERO */}
        <section id="inicio" className="relative isolate">
          <img
            src={config.logo.hero || heroCorporativo}
            onError={(e) => ((e.currentTarget as HTMLImageElement).src = heroCorporativo)}
            alt="Equipe corporativa da E.S.L & Empreendimentos em reunião de trabalho"
            className="absolute inset-0 h-full w-full object-cover"
            width={1600}
            height={1008}
          />
          <div className="absolute inset-0 bg-floresta-dark/85" />
          <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-5 sm:py-28 md:py-40">
            <span className="inline-block rounded-full border border-mostarda px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-mostarda sm:px-4 sm:text-xs">
              {t.heroBadge}
            </span>
            <h1 className="mt-6 text-2xl font-extrabold leading-tight text-background sm:text-3xl md:text-4xl lg:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm text-background/85 sm:text-base md:text-lg">
              {t.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#areas"
                className="rounded-md bg-floresta px-6 py-3 font-display text-xs font-bold text-background ring-1 ring-mostarda/50 transition-colors hover:bg-floresta-dark sm:px-7 sm:py-3.5 sm:text-sm"
              >
                {t.heroBotao1}
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-terra px-6 py-3 font-display text-xs font-bold text-background transition-colors hover:bg-terra-dark sm:px-7 sm:py-3.5 sm:text-sm"
              >
                {t.heroBotao2}
              </a>
            </div>
          </div>
        </section>

        {/* A EMPRESA */}
        <section id="empresa" className="bg-background py-16 md:py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-12 sm:px-5 md:grid-cols-2">
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-terra sm:text-xs">
                {t.aboutTag}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-floresta sm:text-3xl md:text-4xl">
                {t.aboutTitle}
              </h2>
              <p className="mt-5 text-sm text-foreground/85 sm:text-base">{t.aboutText}</p>
              <p className="mt-4 text-sm text-foreground/85 sm:text-base">{t.aboutTextSecondary}</p>
              <p className="mt-4 text-sm text-foreground/85 sm:text-base">{t.aboutTextTerciario}</p>
              <dl className="mt-8 grid gap-4 border-t border-mostarda pt-6 sm:grid-cols-2">
                {config.blocos.credenciais.map((cred) => (
                  <div key={cred.titulo}>
                    <dt className="font-display text-sm font-bold text-terra">{cred.titulo}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{cred.texto}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-16 w-16 border-l-4 border-t-4 border-mostarda sm:h-24 sm:w-24" />
              <div className="absolute -bottom-4 -right-4 h-16 w-16 border-b-4 border-r-4 border-mostarda sm:h-24 sm:w-24" />
              <img
                src={config.logo.about || equipeCorporativa}
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = equipeCorporativa)}
                alt="Profissionais da E.S.L & Empreendimentos analisando relatórios em ambiente corporativo"
                loading="lazy"
                width={1200}
                height={1408}
                className="relative h-full w-full rounded-md object-cover"
              />
            </div>
          </div>
        </section>

        {/* ÁREAS DE ATUAÇÃO */}
        <section id="areas" className="bg-secondary py-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-5">
            <div className="max-w-2xl">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-terra sm:text-xs">
                {t.areasTag}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-floresta sm:text-3xl md:text-4xl">
                {t.servicesTitle}
              </h2>
              <p className="mt-4 text-sm text-foreground/80 sm:text-base">
                {t.servicesDescription}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {config.blocos.areas.map((s, i) => (
                <article
                  key={s.titulo}
                  className="group rounded-md border border-mostarda bg-card p-5 transition-shadow hover:shadow-lg sm:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-floresta/10 font-display text-base font-extrabold text-terra transition-colors group-hover:bg-terra group-hover:text-background sm:h-11 sm:w-11 sm:text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-floresta sm:mt-5 sm:text-lg">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 text-xs text-foreground/80 sm:text-sm">{s.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MODELOS DE CONTRATAÇÃO */}
        <section id="modelos" className="bg-background py-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-5">
            <div className="max-w-3xl">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-terra sm:text-xs">
                {t.modelosTag}
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-floresta sm:text-3xl md:text-4xl">
                {t.modelosTitle}
              </h2>
              <p className="mt-4 text-sm text-foreground/85 sm:text-base">{t.modelosDescription}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
              {config.blocos.modelos.map((m) => (
                <article
                  key={m.titulo}
                  className="rounded-md border-l-4 border-terra bg-card p-5 shadow-sm sm:p-7"
                >
                  <h3 className="font-display text-base font-bold text-floresta sm:text-lg">
                    {m.titulo}
                  </h3>
                  <p className="mt-2 text-xs text-foreground/80 sm:text-sm">{m.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* METODOLOGIA */}
        <section id="metodologia" className="bg-floresta py-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-5">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-mostarda sm:text-xs">
              {t.metodologiaTag}
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-background sm:text-3xl md:text-4xl">
              {t.metodologiaTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-background/80 sm:text-base">
              {t.metodologiaDescription}
            </p>

            <ol className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {config.blocos.etapas.map((e, i) => (
                <li
                  key={e.titulo}
                  className="rounded-md border border-mostarda/40 bg-background/5 p-5 sm:p-6"
                >
                  <span className="font-display text-xl font-extrabold text-mostarda">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-background">
                    {e.titulo}
                  </h3>
                  <p className="mt-2 text-xs text-background/80 sm:text-sm">{e.texto}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-md border border-mostarda bg-background/10 p-5 sm:p-7">
              <h3 className="font-display text-base font-bold text-mostarda sm:text-lg">
                {t.gestaoTitle}
              </h3>
              <p className="mt-2 text-xs text-background/85 sm:text-sm">{t.gestaoTexto}</p>
            </div>

            {MOSTRAR_PORTFOLIO && (
              <div className="mt-12">
                <h3 className="text-xl font-extrabold text-background">{t.projectsTitle}</h3>
                <p className="mt-2 max-w-2xl text-sm text-background/80">{t.projectsDescription}</p>
                <div className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2">
                  {portfolio.map((p, i) => (
                    <article key={i} className="group relative overflow-hidden rounded-md">
                      <img
                        src={p.img}
                        alt={p.nome}
                        loading="lazy"
                        width={1000}
                        height={800}
                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72"
                      />
                      <div className="absolute inset-0 bg-carvao/40 transition-colors duration-300 group-hover:bg-terra/75" />
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                        <h4 className="font-display text-base font-bold text-background sm:text-xl">
                          {p.nome}
                        </h4>
                        <p className="mt-1 text-xs text-background/90 sm:text-sm">{p.resumo}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PERFIL DOS CONTRATANTES */}
        <section className="bg-background py-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-5">
            <h2 className="text-2xl font-extrabold text-floresta sm:text-3xl md:text-4xl">
              {t.organizacoesTitle}
            </h2>
            <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
              {config.blocos.organizacoes.map((o) => (
                <article
                  key={o.titulo}
                  className="rounded-md border border-mostarda bg-card p-5 sm:p-7"
                >
                  <h3 className="font-display text-base font-bold text-floresta sm:text-lg">
                    {o.titulo}
                  </h3>
                  <p className="mt-2 text-xs text-foreground/80 sm:text-sm">{o.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONFORMIDADE */}
        <section className="bg-secondary py-16 md:py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-5 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-floresta sm:text-3xl md:text-4xl">
                {t.conformidadeTitle}
              </h2>
              <p className="mt-4 text-sm text-foreground/85 sm:text-base">{t.conformidadeTexto}</p>
            </div>
            <ul className="space-y-3">
              {config.blocos.conformidade.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-md border border-mostarda bg-card p-4 text-xs text-foreground/85 sm:text-sm"
                >
                  <span className="font-display font-bold text-terra">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="bg-mostarda-soft py-16 md:py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:gap-12 sm:px-5 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-floresta sm:text-3xl md:text-4xl">
                {t.contactTitle}
              </h2>
              <p className="mt-4 text-sm text-carvao/85 sm:text-base">{t.contactText}</p>
              <ul className="mt-6 space-y-2 font-display text-xs font-semibold text-floresta sm:mt-8 sm:space-y-3 sm:text-sm">
                <li>
                  {c.sede} · {c.atuacao}
                </li>
                <li>{c.telefone}</li>
                <li>{c.email}</li>
                <li>{c.horario}</li>
              </ul>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-md border-2 border-floresta px-5 py-2.5 font-display text-xs font-bold text-floresta transition-colors hover:bg-floresta hover:text-background sm:mt-8 sm:px-6 sm:py-3 sm:text-sm"
              >
                {t.contactBotaoWhatsapp}
              </a>
            </div>

            <form
              className="rounded-md bg-card p-5 shadow-sm sm:p-7"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const msg = [
                  c.mensagemWhatsapp,
                  `Nome: ${f.get("nome")}`,
                  `Organização: ${f.get("organizacao")}`,
                  `Cargo: ${f.get("cargo")}`,
                  `E-mail: ${f.get("email")}`,
                  `Telefone: ${f.get("telefone")}`,
                  `Objeto da solicitação: ${f.get("objeto")}`,
                ].join("\n");
                window.open(whatsappHref(c, msg), "_blank", "noopener");
              }}
            >
              {[
                { name: "nome", label: "Nome", type: "text" },
                { name: "organizacao", label: "Organização", type: "text" },
                { name: "cargo", label: "Cargo", type: "text" },
                { name: "email", label: "E-mail", type: "email" },
                { name: "telefone", label: "Telefone", type: "tel" },
              ].map((field) => (
                <label
                  key={field.name}
                  className="mt-4 block font-display text-[10px] font-bold uppercase tracking-widest text-floresta first:mt-0 sm:text-xs"
                >
                  {field.label}
                  <input
                    name={field.name}
                    type={field.type}
                    required
                    className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-xs font-normal text-foreground outline-none focus:border-terra sm:py-2.5 sm:text-sm"
                  />
                </label>
              ))}
              <label className="mt-4 block font-display text-[10px] font-bold uppercase tracking-widest text-floresta sm:mt-5 sm:text-xs">
                Objeto da solicitação
                <textarea
                  name="objeto"
                  rows={4}
                  required
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-xs font-normal text-foreground outline-none focus:border-terra sm:py-2.5 sm:text-sm"
                />
              </label>
              <button
                type="submit"
                className="mt-5 w-full rounded-md bg-terra px-5 py-2.5 font-display text-xs font-bold text-background transition-colors hover:bg-terra-dark sm:mt-6 sm:px-6 sm:py-3 sm:text-sm"
              >
                {t.contactBotaoFormulario}
              </button>
            </form>
          </div>

          {/* EMPRESAS CONTRATANTES — carrossel contínuo */}
          {clientes.length > 0 && (
            <div className="mt-14 md:mt-20">
              <h3 className="text-center font-display text-lg font-extrabold text-floresta sm:text-2xl">
                {t.clientesTitle}
              </h3>
              <div className="logo-marquee mt-8">
                <div className="logo-marquee-track">
                  {clientesLoop.map((cliente, i) => (
                    <div
                      key={`${cliente.nome}-${i}`}
                      className="flex h-24 w-40 shrink-0 items-center justify-center px-4 sm:w-52"
                    >
                      <img
                        src={cliente.src}
                        alt={`Logotipo ${cliente.nome}`}
                        loading="lazy"
                        className="max-h-16 w-auto max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

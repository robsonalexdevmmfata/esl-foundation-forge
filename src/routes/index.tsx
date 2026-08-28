import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, WhatsAppFloat, WHATSAPP } from "@/components/site";
import hero from "@/assets/hero-construcao.jpg";
import equipe from "@/assets/equipe.jpg";
import projeto1 from "@/assets/projeto-1.jpg";
import projeto2 from "@/assets/projeto-2.jpg";
import projeto3 from "@/assets/projeto-3.jpg";
import projeto4 from "@/assets/projeto-4.jpg";

const title = "ESL Facility — Construção Civil, Engenharia e Facilities";
const description =
  "Construtora especializada em obras residenciais, comerciais e industriais: gestão de projetos, retrofit e manutenção predial com excelência e sustentabilidade.";

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

const servicos = [
  {
    titulo: "Gestão de Projetos",
    texto:
      "Planejamento, orçamento e fiscalização de obra do primeiro traço à entrega das chaves, com cronograma que se cumpre.",
  },
  {
    titulo: "Construção Residencial",
    texto:
      "Casas de alto padrão e edifícios pensados para durar: acabamento impecável e eficiência energética de verdade.",
  },
  {
    titulo: "Construção Comercial",
    texto:
      "Lojas, escritórios e galpões executados com engenharia de valor e mínimo impacto na operação do seu negócio.",
  },
  {
    titulo: "Retrofit & Reformas",
    texto:
      "Modernizamos estruturas existentes com soluções estruturais, elétricas e hidráulicas sob medida.",
  },
  {
    titulo: "Manutenção Predial",
    texto:
      "Contratos de facilities preventivos e corretivos que reduzem custo e prolongam a vida útil do patrimônio.",
  },
  {
    titulo: "Consultoria & Laudos",
    texto:
      "Vistorias, laudos técnicos e regularizações conduzidos por engenheiros responsáveis e documentação completa.",
  },
];

const projetos = [
  { img: projeto1, nome: "Residencial Jardim Verde", resumo: "Edifício de 48 unidades com reuso de água e áreas verdes integradas." },
  { img: projeto2, nome: "Corporate Center Norte", resumo: "Sede corporativa de 6 pavimentos entregue 30 dias antes do prazo." },
  { img: projeto3, nome: "Galpão Logístico Industrial", resumo: "9.000 m² em estrutura metálica com iluminação zenital." },
  { img: projeto4, nome: "Retrofit Lobby Prime", resumo: "Requalificação completa de hall corporativo sem parar a operação." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section id="inicio" className="relative isolate">
          <img
            src={hero}
            alt="Obra moderna ao entardecer executada pela ESL Facility"
            className="absolute inset-0 h-full w-full object-cover"
            width={1600}
            height={1008}
          />
          <div className="absolute inset-0 bg-floresta-dark/80" />
          <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-5 sm:py-28 md:py-40">
            <span className="inline-block rounded-full border border-mostarda px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-mostarda sm:px-4 sm:text-xs">
              Engenharia & Construção
            </span>
            <h1 className="mt-6 text-2xl font-extrabold leading-tight text-background sm:text-3xl md:text-4xl lg:text-6xl">
              ESL FACILITY: Construindo o Futuro com Excelência e
              Sustentabilidade.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm text-background/85 sm:text-base md:text-lg">
              Soluções completas em engenharia e construção civil para projetos
              residenciais, comerciais e industriais.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#sobre"
                className="rounded-md bg-floresta px-6 py-3 font-display text-xs font-bold text-background ring-1 ring-mostarda/50 transition-colors hover:bg-floresta-dark sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Saiba Mais
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-terra px-6 py-3 font-display text-xs font-bold text-background transition-colors hover:bg-terra-dark sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Solicite uma Proposta
              </a>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="bg-background py-16 md:py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-12 sm:px-5 md:grid-cols-2">
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-terra sm:text-xs">
                Sobre Nós
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-floresta sm:text-3xl md:text-4xl">
                Nossa Missão
              </h2>
              <p className="mt-5 text-sm text-foreground/85 sm:text-base">
                Transformar terrenos, plantas e ideias em obras que sustentam
                gerações. Há mais de 15 anos a ESL FACILITY entrega projetos com
                rigor técnico, transparência de orçamento e respeito absoluto a
                prazos — porque uma obra bem conduzida é, antes de tudo, uma
                promessa cumprida.
              </p>
              <p className="mt-4 text-sm text-foreground/85 sm:text-base">
                Trabalhamos com equipes próprias, engenheiros responsáveis em
                campo e protocolos de segurança que não abrem exceção. Cada
                decisão passa por três filtros: durabilidade, eficiência e menor
                impacto ambiental possível.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-2 border-t border-mostarda pt-6 sm:gap-4">
                {[
                  ["15+", "anos de mercado"],
                  ["320", "obras entregues"],
                  ["98%", "clientes recorrentes"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <dt className="font-display text-2xl font-extrabold text-terra sm:text-3xl">
                      {n}
                    </dt>
                    <dd className="text-[10px] uppercase tracking-wide text-muted-foreground sm:text-xs">
                      {l}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-16 w-16 border-l-4 border-t-4 border-mostarda sm:h-24 sm:w-24" />
              <div className="absolute -bottom-4 -right-4 h-16 w-16 border-b-4 border-r-4 border-mostarda sm:h-24 sm:w-24" />
              <img
                src={equipe}
                alt="Equipe de engenharia da ESL Facility analisando projetos no canteiro de obras"
                loading="lazy"
                width={1200}
                height={1400}
                className="relative h-full w-full rounded-md object-cover"
              />
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="bg-secondary py-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-5">
            <div className="max-w-2xl">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-terra sm:text-xs">
                O que fazemos
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-floresta sm:text-3xl md:text-4xl">
                Nossos Serviços
              </h2>
              <p className="mt-4 text-sm text-foreground/80 sm:text-base">
                Do estudo de viabilidade à manutenção depois da entrega: um só
                time responsável por toda a jornada da sua obra.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicos.map((s, i) => (
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

        {/* PROJETOS */}
        <section id="projetos" className="bg-floresta py-16 md:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-5">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-mostarda sm:text-xs">
              Portfólio
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-background sm:text-3xl md:text-4xl">
              Destaque de Projetos
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-background/80 sm:text-base">
              Obras entregues que hoje funcionam, valorizam e duram. Passe o
              mouse para conhecer cada uma.
            </p>

            <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2">
              {projetos.map((p) => (
                <article
                  key={p.nome}
                  className="group relative overflow-hidden rounded-md"
                >
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
                    <h3 className="font-display text-base font-bold text-background sm:text-xl">
                      {p.nome}
                    </h3>
                    <p className="mt-1 max-h-0 overflow-hidden text-xs text-background/90 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100 sm:text-sm">
                      {p.resumo}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="bg-mostarda-soft py-16 md:py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:gap-12 sm:px-5 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-floresta sm:text-3xl md:text-4xl">
                Pronto para dar vida ao seu projeto?
              </h2>
              <p className="mt-4 text-sm text-carvao/85 sm:text-base">
                Conte o que você quer construir. Em até 24 horas úteis um
                engenheiro da ESL FACILITY retorna com os próximos passos e uma
                estimativa realista.
              </p>
              <ul className="mt-6 space-y-2 font-display text-xs font-semibold text-floresta sm:mt-8 sm:space-y-3 sm:text-sm">
                <li>Av. das Construções, 1200 — São Paulo/SP</li>
                <li>(11) 99999-9999</li>
                <li>contato@eslfacility.com.br</li>
                <li>Seg. a Sex., 8h às 18h</li>
              </ul>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-md border-2 border-floresta px-5 py-2.5 font-display text-xs font-bold text-floresta transition-colors hover:bg-floresta hover:text-background sm:mt-8 sm:px-6 sm:py-3 sm:text-sm"
              >
                Pedir orçamento no WhatsApp
              </a>
            </div>

            <form
              className="rounded-md bg-card p-5 shadow-sm sm:p-7"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const msg = `Olá, ESL FACILITY! Meu nome é ${f.get("nome")} (${f.get("email")}). ${f.get("mensagem")}`;
                window.open(
                  `https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`,
                  "_blank",
                  "noopener",
                );
              }}
            >
              <label className="block font-display text-[10px] font-bold uppercase tracking-widest text-floresta sm:text-xs">
                Nome
                <input
                  name="nome"
                  required
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-xs font-normal text-foreground outline-none focus:border-terra sm:py-2.5 sm:text-sm"
                />
              </label>
              <label className="mt-4 block font-display text-[10px] font-bold uppercase tracking-widest text-floresta sm:mt-5 sm:text-xs">
                E-mail
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-xs font-normal text-foreground outline-none focus:border-terra sm:py-2.5 sm:text-sm"
                />
              </label>
              <label className="mt-4 block font-display text-[10px] font-bold uppercase tracking-widest text-floresta sm:mt-5 sm:text-xs">
                Mensagem
                <textarea
                  name="mensagem"
                  rows={4}
                  required
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-xs font-normal text-foreground outline-none focus:border-terra sm:py-2.5 sm:text-sm"
                />
              </label>
              <button
                type="submit"
                className="mt-5 w-full rounded-md bg-terra px-5 py-2.5 font-display text-xs font-bold text-background transition-colors hover:bg-terra-dark sm:mt-6 sm:px-6 sm:py-3 sm:text-sm"
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

import logo from "@/assets/esl-logo.jpeg.asset.json";
import hero from "@/assets/hero-construcao.jpg";
import equipe from "@/assets/equipe.jpg";
import projeto1 from "@/assets/projeto-1.jpg";
import projeto2 from "@/assets/projeto-2.jpg";
import projeto3 from "@/assets/projeto-3.jpg";
import projeto4 from "@/assets/projeto-4.jpg";

export type NavLink = { label: string; href: string };
export type Servico = { titulo: string; texto: string };
export type Projeto = { nome: string; resumo: string; imagem: string };
export type Stat = { numero: string; rotulo: string };
export type SocialLink = { label: string; url: string };

export type SiteContent = {
  brand: {
    nome: string;
    logoUrl: string;
    logoAltura: number;
    whatsapp: string;
    mensagemWhatsapp: string;
    seoTitulo: string;
    seoDescricao: string;
  };
  cores: {
    terra: string;
    terraDark: string;
    floresta: string;
    florestaDark: string;
    mostarda: string;
    mostardaSoft: string;
    carvao: string;
    background: string;
  };
  menu: {
    links: NavLink[];
    ctaTexto: string;
    botaoFlutuanteTexto: string;
    botaoFlutuanteAtivo: boolean;
  };
  hero: {
    ativo: boolean;
    badge: string;
    titulo: string;
    subtitulo: string;
    ctaPrimario: string;
    ctaPrimarioLink: string;
    ctaSecundario: string;
    imagem: string;
    opacidadeOverlay: number;
  };
  sobre: {
    ativo: boolean;
    sobretitulo: string;
    titulo: string;
    paragrafo1: string;
    paragrafo2: string;
    imagem: string;
    stats: Stat[];
  };
  servicos: {
    ativo: boolean;
    sobretitulo: string;
    titulo: string;
    descricao: string;
    itens: Servico[];
  };
  projetos: {
    ativo: boolean;
    sobretitulo: string;
    titulo: string;
    descricao: string;
    itens: Projeto[];
  };
  contato: {
    ativo: boolean;
    titulo: string;
    descricao: string;
    endereco: string;
    telefone: string;
    email: string;
    horario: string;
    botaoWhatsapp: string;
    botaoFormulario: string;
  };
  rodape: {
    descricao: string;
    tituloNavegacao: string;
    tituloContato: string;
    copyright: string;
    creditoTexto: string;
    creditoNome: string;
    creditoUrl: string;
    sociais: SocialLink[];
  };
};

export const defaultContent: SiteContent = {
  brand: {
    nome: "ESL FACILITY",
    logoUrl: logo.url,
    logoAltura: 44,
    whatsapp: "5511999999999",
    mensagemWhatsapp:
      "Olá, ESL FACILITY! Gostaria de solicitar um orçamento para o meu projeto.",
    seoTitulo: "ESL Facility — Construção Civil, Engenharia e Facilities",
    seoDescricao:
      "Construtora especializada em obras residenciais, comerciais e industriais: gestão de projetos, retrofit e manutenção predial com excelência e sustentabilidade.",
  },
  cores: {
    terra: "#C96E48",
    terraDark: "#A9552F",
    floresta: "#1E5F4D",
    florestaDark: "#123C31",
    mostarda: "#E0B05C",
    mostardaSoft: "#F2DFBC",
    carvao: "#333333",
    background: "#FFFFFF",
  },
  menu: {
    links: [
      { label: "Início", href: "#inicio" },
      { label: "Sobre Nós", href: "#sobre" },
      { label: "Serviços", href: "#servicos" },
      { label: "Projetos", href: "#projetos" },
      { label: "Contato", href: "#contato" },
    ],
    ctaTexto: "Orçamento Rápido",
    botaoFlutuanteTexto: "Falar no WhatsApp",
    botaoFlutuanteAtivo: true,
  },
  hero: {
    ativo: true,
    badge: "Engenharia & Construção",
    titulo:
      "ESL FACILITY: Construindo o Futuro com Excelência e Sustentabilidade.",
    subtitulo:
      "Soluções completas em engenharia e construção civil para projetos residenciais, comerciais e industriais.",
    ctaPrimario: "Saiba Mais",
    ctaPrimarioLink: "#sobre",
    ctaSecundario: "Solicite uma Proposta",
    imagem: hero,
    opacidadeOverlay: 80,
  },
  sobre: {
    ativo: true,
    sobretitulo: "Sobre Nós",
    titulo: "Nossa Missão",
    paragrafo1:
      "Transformar terrenos, plantas e ideias em obras que sustentam gerações. Há mais de 15 anos a ESL FACILITY entrega projetos com rigor técnico, transparência de orçamento e respeito absoluto a prazos — porque uma obra bem conduzida é, antes de tudo, uma promessa cumprida.",
    paragrafo2:
      "Trabalhamos com equipes próprias, engenheiros responsáveis em campo e protocolos de segurança que não abrem exceção. Cada decisão passa por três filtros: durabilidade, eficiência e menor impacto ambiental possível.",
    imagem: equipe,
    stats: [
      { numero: "15+", rotulo: "anos de mercado" },
      { numero: "320", rotulo: "obras entregues" },
      { numero: "98%", rotulo: "clientes recorrentes" },
    ],
  },
  servicos: {
    ativo: true,
    sobretitulo: "O que fazemos",
    titulo: "Nossos Serviços",
    descricao:
      "Do estudo de viabilidade à manutenção depois da entrega: um só time responsável por toda a jornada da sua obra.",
    itens: [
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
    ],
  },
  projetos: {
    ativo: true,
    sobretitulo: "Portfólio",
    titulo: "Destaque de Projetos",
    descricao:
      "Obras entregues que hoje funcionam, valorizam e duram. Passe o mouse para conhecer cada uma.",
    itens: [
      {
        nome: "Residencial Jardim Verde",
        resumo:
          "Edifício de 48 unidades com reuso de água e áreas verdes integradas.",
        imagem: projeto1,
      },
      {
        nome: "Corporate Center Norte",
        resumo: "Sede corporativa de 6 pavimentos entregue 30 dias antes do prazo.",
        imagem: projeto2,
      },
      {
        nome: "Galpão Logístico Industrial",
        resumo: "9.000 m² em estrutura metálica com iluminação zenital.",
        imagem: projeto3,
      },
      {
        nome: "Retrofit Lobby Prime",
        resumo: "Requalificação completa de hall corporativo sem parar a operação.",
        imagem: projeto4,
      },
    ],
  },
  contato: {
    ativo: true,
    titulo: "Pronto para dar vida ao seu projeto?",
    descricao:
      "Conte o que você quer construir. Em até 24 horas úteis um engenheiro da ESL FACILITY retorna com os próximos passos e uma estimativa realista.",
    endereco: "Av. das Construções, 1200 — São Paulo/SP",
    telefone: "(11) 99999-9999",
    email: "contato@eslfacility.com.br",
    horario: "Seg. a Sex., 8h às 18h",
    botaoWhatsapp: "Pedir orçamento no WhatsApp",
    botaoFormulario: "Enviar mensagem",
  },
  rodape: {
    descricao:
      "Engenharia, construção e manutenção predial com técnica, segurança e responsabilidade ambiental.",
    tituloNavegacao: "Navegação",
    tituloContato: "Fale com a gente",
    copyright: "© 2024 ESL FACILITY. Todos os direitos reservados.",
    creditoTexto: "Desenvolvido pela",
    creditoNome: "Agência Info Tech",
    creditoUrl: "https://www.agenciainfotech.com.br",
    sociais: [
      { label: "Instagram", url: "https://instagram.com" },
      { label: "LinkedIn", url: "https://linkedin.com" },
      { label: "Facebook", url: "https://facebook.com" },
    ],
  },
};

/** Deep-merges saved content over the defaults so novos campos nunca quebram o site. */
export function mergeContent(saved: unknown): SiteContent {
  const base = JSON.parse(JSON.stringify(defaultContent)) as SiteContent;
  if (!saved || typeof saved !== "object") return base;
  const src = saved as Record<string, unknown>;
  for (const key of Object.keys(base) as (keyof SiteContent)[]) {
    const value = src[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(base[key] as object, value);
    }
  }
  return base;
}

export function whatsappLink(content: SiteContent, mensagem?: string) {
  const numero = content.brand.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(
    mensagem ?? content.brand.mensagemWhatsapp,
  )}`;
}

export type LogoKey = "navbar" | "footer" | "favicon" | "hero" | "about";

export interface SiteConfig {
  logo: Record<LogoKey, string>;
  /** Nome original do arquivo enviado por upload (para exibição no painel). */
  logoNames: Partial<Record<LogoKey, string>>;
  navbar: {
    links: Array<{ href: string; label: string }>;
    buttonText: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  texts: {
    heroTitle: string;
    heroSubtitle: string;
    heroBadge: string;
    aboutTitle: string;
    aboutText: string;
    aboutTextSecondary: string;
    contactTitle: string;
    contactText: string;
    footerDescription: string;
    footerCopyright: string;
    servicesTitle: string;
    servicesDescription: string;
    projectsTitle: string;
    projectsDescription: string;
  };
}

export const EMPRESA = {
  razaoSocial: "E.S.L & Empreendimentos LTDA",
  cnpj: "52.306.432/0001-29",
  telefone: "(38) 9 9842-1869",
  whatsapp: "5538998421869",
  email: "contato@gestaoesl.com",
  sede: "Serranópolis de Minas – MG",
  atuacao: "Atuação em todo o território nacional",
  horario: "Atendimento de segunda a sexta-feira, das 8h às 18h",
  mensagemWhatsapp:
    "Prezados, solicito contato para apresentação de proposta.",
};

export const defaultConfig: SiteConfig = {
  logo: {
    navbar: "/logo.png",
    footer: "/logo.png",
    favicon: "/favicon.png",
    hero: "/corporativo-hero.jpg",
    about: "/equipe-corporativa.jpg",
  },
  navbar: {
    links: [
      { href: "#inicio", label: "Início" },
      { href: "#empresa", label: "A Empresa" },
      { href: "#areas", label: "Áreas de Atuação" },
      { href: "#modelos", label: "Modelos de Contratação" },
      { href: "#metodologia", label: "Metodologia" },
      { href: "#contato", label: "Contato" },
    ],
    buttonText: "Solicitar proposta",
  },
  colors: {
    primary: "#1E5F4D",
    secondary: "#333333",
    accent: "#E0B05C",
    background: "#ffffff",
    text: "#333333",
  },
  texts: {
    heroTitle: "E.S.L & Empreendimentos",
    heroSubtitle:
      "Empresa de serviços corporativos e institucionais, com atuação em comunicação institucional, coordenação e execução de projetos e operações, mediante equipe própria e contratos formais.",
    heroBadge: "Comunicação Institucional · Coordenação · Execução",
    aboutTitle: "Apresentação institucional",
    aboutText:
      "A E.S.L & Empreendimentos LTDA presta serviços corporativos e institucionais a empresas privadas, órgãos públicos, entidades de economia mista e associações, com atuação em todo o território nacional.",
    aboutTextSecondary:
      "A empresa atua em três frentes principais: comunicação institucional, coordenação de operações e execução de projetos. Sua estrutura compreende a concepção do trabalho, a mobilização e a gestão dos profissionais, a supervisão das atividades e a entrega documentada dos resultados contratados.",
    contactTitle: "Solicitação de proposta",
    contactText:
      "Descreva o objeto pretendido e o prazo estimado. O retorno é realizado em até 24 horas úteis, com os encaminhamentos e a proposta correspondente.",
    footerDescription:
      "Serviços corporativos e institucionais em comunicação, coordenação e execução, com equipe própria e gestão inclusa.",
    footerCopyright:
      "© 2026 E.S.L & Empreendimentos LTDA. Todos os direitos reservados.",
    servicesTitle: "Serviços prestados",
    servicesDescription:
      "A empresa atua de forma integrada ou segmentada, conforme o escopo definido pelo contratante.",
    projectsTitle: "Registro de contratos executados",
    projectsDescription:
      "Galeria reservada para registro fotográfico próprio de contratos executados.",
  },
};

const STORAGE_KEY = "site_config_v2";

export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
    return defaultConfig;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<SiteConfig>;
    return {
      ...defaultConfig,
      ...parsed,
      logo: { ...defaultConfig.logo, ...parsed.logo },
      navbar: { ...defaultConfig.navbar, ...parsed.navbar },
      colors: { ...defaultConfig.colors, ...parsed.colors },
      texts: { ...defaultConfig.texts, ...parsed.texts },
    };
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
}

export function saveConfig(config: SiteConfig): void {
  if (typeof window === "undefined") return;

  const nextConfig = {
    ...defaultConfig,
    ...config,
    logo: { ...defaultConfig.logo, ...(config.logo ?? {}) },
    navbar: { ...defaultConfig.navbar, ...(config.navbar ?? {}) },
    colors: { ...defaultConfig.colors, ...(config.colors ?? {}) },
    texts: { ...defaultConfig.texts, ...(config.texts ?? {}) },
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConfig));
  window.dispatchEvent(new Event("siteConfigChanged"));
}

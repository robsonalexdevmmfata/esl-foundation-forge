export interface SiteConfig {
  logo: {
    navbar: string;
    footer: string;
    favicon: string;
    hero: string;
    about: string;
  };
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

export const defaultConfig: SiteConfig = {
  logo: {
    navbar: "/logo.png",
    footer: "/logo.png",
    favicon: "/favicon.png",
    hero: "/hero-construcao.jpg",
    about: "/equipe.jpg",
  },
  navbar: {
    links: [
      { href: "#inicio", label: "Início" },
      { href: "#sobre", label: "Sobre Nós" },
      { href: "#servicos", label: "Serviços" },
      { href: "#projetos", label: "Projetos" },
      { href: "#contato", label: "Contato" },
    ],
    buttonText: "Orçamento Rápido",
  },
  colors: {
    primary: "#166534",
    secondary: "#78350f",
    accent: "#f59e0b",
    background: "#ffffff",
    text: "#1f2937",
  },
  texts: {
    heroTitle: "ESL FACILITY: Construindo o Futuro com Excelência e Sustentabilidade.",
    heroSubtitle: "Soluções completas em engenharia e construção civil para projetos residenciais, comerciais e industriais.",
    heroBadge: "Engenharia & Construção",
    aboutTitle: "Nossa Missão",
    aboutText: "Transformar terrenos, plantas e ideias em obras que sustentam gerações. Há mais de 15 anos a ESL FACILITY entrega projetos com rigor técnico, transparência de orçamento e respeito absoluto a prazos.",
    aboutTextSecondary: "Trabalhamos com equipes próprias, engenheiros responsáveis em campo e protocolos de segurança que não abrem exceção. Cada decisão passa por três filtros: durabilidade, eficiência e menor impacto ambiental possível.",
    contactTitle: "Pronto para dar vida ao seu projeto?",
    contactText: "Conte o que você quer construir. Em até 24 horas úteis um engenheiro da ESL FACILITY retorna com os próximos passos e uma estimativa realista.",
    footerDescription: "Engenharia, construção e manutenção predial com técnica, segurança e responsabilidade ambiental.",
    footerCopyright: "© 2024 ESL FACILITY. Todos os direitos reservados.",
    servicesTitle: "Nossos Serviços",
    servicesDescription: "Do estudo de viabilidade à manutenção depois da entrega: um só time responsável por toda a jornada da sua obra.",
    projectsTitle: "Destaque de Projetos",
    projectsDescription: "Obras entregues que hoje funcionam, valorizam e duram. Passe o mouse para conhecer cada uma.",
  },
};

export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig;

  const stored = localStorage.getItem("site_config");
  if (!stored) {
    localStorage.setItem("site_config", JSON.stringify(defaultConfig));
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
    localStorage.setItem("site_config", JSON.stringify(defaultConfig));
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

  localStorage.setItem("site_config", JSON.stringify(nextConfig));
  window.dispatchEvent(new Event("siteConfigChanged"));
}

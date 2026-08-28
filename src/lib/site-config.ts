export interface SiteConfig {
  logo: {
    navbar: string;
    footer: string;
    favicon: string;
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
    aboutTitle: string;
    aboutText: string;
    contactTitle: string;
    contactText: string;
  };
}

export const defaultConfig: SiteConfig = {
  logo: {
    navbar: "/logo.png",
    footer: "/logo.png",
    favicon: "/favicon.png",
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
    aboutTitle: "Nossa Missão",
    aboutText: "Transformar terrenos, plantas e ideias em obras que sustentam gerações. Há mais de 15 anos a ESL FACILITY entrega projetos com rigor técnico, transparência de orçamento e respeito absoluto a prazos.",
    contactTitle: "Pronto para dar vida ao seu projeto?",
    contactText: "Conte o que você quer construir. Em até 24 horas úteis um engenheiro da ESL FACILITY retorna com os próximos passos e uma estimativa realista.",
  },
};

export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig;
  const stored = localStorage.getItem("site_config");
  return stored ? JSON.parse(stored) : defaultConfig;
}

export function saveConfig(config: SiteConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("site_config", JSON.stringify(config));
  // Dispatch event for real-time updates
  window.dispatchEvent(new Event("siteConfigChanged"));
}

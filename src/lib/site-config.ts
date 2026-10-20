import clienteMg from "@/assets/cliente-mg.png";
import clienteCodemge from "@/assets/cliente-codemge.png";
import clienteSebrae from "@/assets/cliente-sebrae.png";
import clienteMercadoLivre from "@/assets/cliente-mercado-livre.png";
import clienteFecitur from "@/assets/cliente-fecitur.png";
import clienteEquinox from "@/assets/cliente-equinox.png";

export type LogoKey = "navbar" | "footer" | "favicon" | "hero" | "about";

export type ItemTexto = { titulo: string; texto: string };
export type ClienteLogo = { nome: string; src: string };
export type SocialLink = { label: string; url: string };

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
    heroBotao1: string;
    heroBotao2: string;
    aboutTag: string;
    aboutTitle: string;
    aboutText: string;
    aboutTextSecondary: string;
    aboutTextTerciario: string;
    areasTag: string;
    contactTitle: string;
    contactText: string;
    contactBotaoWhatsapp: string;
    contactBotaoFormulario: string;
    footerDescription: string;
    footerCopyright: string;
    servicesTitle: string;
    servicesDescription: string;
    projectsTitle: string;
    projectsDescription: string;
    modelosTag: string;
    modelosTitle: string;
    modelosDescription: string;
    metodologiaTag: string;
    metodologiaTitle: string;
    metodologiaDescription: string;
    gestaoTitle: string;
    gestaoTexto: string;
    organizacoesTitle: string;
    conformidadeTitle: string;
    conformidadeTexto: string;
    clientesTitle: string;
  };
  blocos: {
    credenciais: ItemTexto[];
    areas: ItemTexto[];
    modelos: ItemTexto[];
    etapas: ItemTexto[];
    organizacoes: ItemTexto[];
    conformidade: string[];
    clientes: ClienteLogo[];
  };
  contato: {
    razaoSocial: string;
    cnpj: string;
    telefone: string;
    whatsapp: string;
    mensagemWhatsapp: string;
    email: string;
    sede: string;
    atuacao: string;
    horario: string;
  };
  sociais: SocialLink[];
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
  mensagemWhatsapp: "Prezados, solicito contato para apresentação de proposta.",
};

export const defaultConfig: SiteConfig = {
  logo: {
    navbar: "/logo.png",
    footer: "/logo.png",
    favicon: "/favicon.png",
    hero: "",
    about: "",
  },
  logoNames: {},
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
    heroBotao1: "Áreas de atuação",
    heroBotao2: "Solicitar proposta",
    aboutTag: "A Empresa",
    aboutTitle: "Apresentação institucional",
    aboutText:
      "A E.S.L & Empreendimentos LTDA presta serviços corporativos e institucionais a empresas privadas, órgãos públicos, entidades de economia mista e associações, com atuação em todo o território nacional.",
    aboutTextSecondary:
      "A empresa atua em três frentes principais: comunicação institucional, coordenação de operações e execução de projetos. Sua estrutura compreende a concepção do trabalho, a mobilização e a gestão dos profissionais, a supervisão das atividades e a entrega documentada dos resultados contratados.",
    aboutTextTerciario:
      "Todas as contratações são formalizadas mediante instrumento contratual, com registro regular dos profissionais, recolhimento dos encargos correspondentes e emissão de nota fiscal, assegurando ao contratante a regularidade fiscal e trabalhista da prestação.",
    areasTag: "Áreas de Atuação",
    contactTitle: "Solicitação de proposta",
    contactText:
      "Descreva o objeto pretendido e o prazo estimado. O retorno é realizado em até 24 horas úteis, com os encaminhamentos e a proposta correspondente.",
    contactBotaoWhatsapp: "Solicitar proposta pelo WhatsApp",
    contactBotaoFormulario: "Enviar solicitação",
    footerDescription:
      "Serviços corporativos e institucionais em comunicação, coordenação e execução, com equipe própria e gestão inclusa.",
    footerCopyright: "© 2026 E.S.L & Empreendimentos LTDA. Todos os direitos reservados.",
    servicesTitle: "Serviços prestados",
    servicesDescription:
      "A empresa atua de forma integrada ou segmentada, conforme o escopo definido pelo contratante.",
    projectsTitle: "Registro de contratos executados",
    projectsDescription:
      "Galeria reservada para registro fotográfico próprio de contratos executados.",
    modelosTag: "Modelos de Contratação",
    modelosTitle: "Escopo definido pelo contratante",
    modelosDescription:
      "A contratação é dimensionada conforme a necessidade da organização contratante, podendo abranger a prestação de um serviço específico, a responsabilidade integral por uma área de atuação ou a coordenação completa da operação. O escopo é definido em instrumento contratual e admite ampliação, redução ou adequação no curso da execução, mediante aditivo.",
    metodologiaTag: "Metodologia",
    metodologiaTitle: "Etapas de execução",
    metodologiaDescription:
      "Cada contrato é precedido de diagnóstico e planejamento específicos, dos quais decorrem o escopo, o dimensionamento da equipe e os indicadores de acompanhamento.",
    gestaoTitle: "Gestão inclusa",
    gestaoTexto:
      "Cada contrato conta com coordenação responsável pela equipe, pelo cumprimento do escopo e pela interlocução com o contratante, sem custo adicional. Compreende supervisão das atividades, controle de frequência e escalas, substituição e reposição de profissionais sem interrupção do serviço e emissão de relatórios periódicos.",
    organizacoesTitle: "Organizações atendidas",
    conformidadeTitle: "Segurança jurídica ao contratante",
    conformidadeTexto:
      "A contratação de serviços terceirizados implica responsabilidade subsidiária do contratante quanto às obrigações trabalhistas. Em razão disso, a E.S.L mantém integral regularidade documental, disponibilizando ao contratante, sempre que solicitado, as certidões e os comprovantes de recolhimento pertinentes.",
    clientesTitle: "Empresas que já nos contrataram",
  },
  blocos: {
    credenciais: [
      {
        titulo: "Constituição regular",
        texto: "Sociedade empresária limitada, com CNPJ ativo e atividades habilitadas.",
      },
      {
        titulo: "Abrangência nacional",
        texto: "Mobilização de equipes em todo o território nacional.",
      },
      {
        titulo: "Equipe própria",
        texto: "Contratação, gestão e supervisão de pessoal sob responsabilidade da contratada.",
      },
      {
        titulo: "Documentação regular",
        texto: "Certidões e comprovantes de recolhimento disponíveis ao contratante.",
      },
    ],
    areas: [
      {
        titulo: "Comunicação Institucional",
        texto:
          "Planejamento e estratégia de comunicação, identidade visual, produção de materiais institucionais e promocionais, gestão de canais digitais, conteúdo audiovisual e comunicação de projetos, programas e campanhas.",
      },
      {
        titulo: "Coordenação e Gestão de Operações",
        texto:
          "Coordenação técnica de equipes e atividades, definição de fluxos e procedimentos, elaboração e acompanhamento de cronogramas, supervisão de execução e controle de escopo.",
      },
      {
        titulo: "Execução de Projetos",
        texto:
          "Execução de projetos e programas previamente aprovados, compreendendo mobilização de equipe, cumprimento de cronograma, registro das atividades, elaboração de relatórios de execução e prestação de contas.",
      },
      {
        titulo: "Serviços de Escritório e Relatórios Técnicos",
        texto:
          "Rotinas administrativas, organização e gestão documental, elaboração de documentos institucionais, produção de relatórios técnicos e gerenciais, tratamento de dados e secretaria executiva.",
      },
      {
        titulo: "Fornecimento de Mão de Obra",
        texto:
          "Recrutamento, seleção, contratação, treinamento e alocação de profissionais nos perfis demandados, com administração de pessoal, encargos, escalas, substituições e supervisão sob responsabilidade da contratada.",
      },
      {
        titulo: "Apoio Operacional e Eventos",
        texto:
          "Equipes de apoio operacional e logístico, serviços de alimentação, limpeza e conservação, e execução de eventos institucionais, incluindo estrutura e equipe.",
      },
    ],
    modelos: [
      {
        titulo: "Serviço específico",
        texto:
          "Prestação delimitada, com objeto, prazo e produto definidos — a exemplo da produção de peça de comunicação, elaboração de relatório técnico, execução de documento institucional ou disponibilização de equipe para evento determinado.",
      },
      {
        titulo: "Área de atuação",
        texto:
          "Responsabilidade continuada sobre uma frente de trabalho da organização, tais como a comunicação institucional, o apoio administrativo ou a operação de campo, com equipe dimensionada e supervisão permanente.",
      },
      {
        titulo: "Operação integral",
        texto:
          "Coordenação e execução do conjunto das atividades contratadas, compreendendo equipe, execução, comunicação, documentação, monitoramento e prestação de contas, com relatórios periódicos ao contratante.",
      },
    ],
    etapas: [
      {
        titulo: "Diagnóstico",
        texto:
          "Levantamento das necessidades, das rotinas existentes e da estrutura disponível, mediante visita técnica ou reunião de alinhamento.",
      },
      {
        titulo: "Dimensionamento e proposta",
        texto:
          "Definição de escopo, quantitativo de profissionais, prazos, cronograma e condições, formalizados em proposta técnica e comercial.",
      },
      {
        titulo: "Mobilização",
        texto:
          "Recrutamento, seleção, contratação e treinamento da equipe, com provisão da estrutura e dos materiais previstos no escopo.",
      },
      {
        titulo: "Execução e supervisão",
        texto:
          "Realização das atividades sob coordenação responsável, com controle de escopo, apuração de indicadores e emissão de relatórios periódicos ao contratante.",
      },
    ],
    organizacoes: [
      {
        titulo: "Empresas privadas",
        texto:
          "Execução de projetos, equipes dedicadas, comunicação corporativa, relatórios gerenciais e apoio administrativo a operações de médio e grande porte.",
      },
      {
        titulo: "Órgãos públicos e entidades de economia mista",
        texto:
          "Execução de projetos e programas, apoio operacional e administrativo, comunicação institucional, produção de relatórios técnicos e prestação de contas, observados os requisitos formais aplicáveis à contratação pública.",
      },
      {
        titulo: "Associações, institutos e entidades representativas",
        texto:
          "Estruturação e execução de projetos, secretaria executiva, gestão documental, comunicação institucional e elaboração de relatórios a associados, conselhos e entidades parceiras.",
      },
    ],
    conformidade: [
      "Constituição regular e atividades habilitadas",
      "Contratação de pessoal na forma da legislação vigente",
      "Recolhimento dos encargos sociais e trabalhistas",
      "Emissão de nota fiscal",
      "Instrumento contratual com escopo, prazos e responsabilidades definidos",
      "Certidões negativas disponíveis ao contratante",
    ],
    clientes: [
      { nome: "Estado de Minas Gerais", src: clienteMg },
      { nome: "CODEMGE", src: clienteCodemge },
      { nome: "SEBRAE", src: clienteSebrae },
      { nome: "Mercado Livre", src: clienteMercadoLivre },
      { nome: "FECITUR", src: clienteFecitur },
      { nome: "Equinox Gold", src: clienteEquinox },
    ],
  },
  contato: { ...EMPRESA },
  sociais: [
    { label: "Instagram", url: "https://www.instagram.com/eslempreendimentos" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/esl-empreendimentos",
    },
    { label: "Facebook", url: "https://www.facebook.com/eslempreendimentos" },
  ],
};

const STORAGE_KEY = "site_config_v2";

function merge(parsed: Partial<SiteConfig>): SiteConfig {
  return {
    ...defaultConfig,
    ...parsed,
    logo: { ...defaultConfig.logo, ...parsed.logo },
    logoNames: { ...(parsed.logoNames ?? {}) },
    navbar: { ...defaultConfig.navbar, ...parsed.navbar },
    colors: { ...defaultConfig.colors, ...parsed.colors },
    texts: { ...defaultConfig.texts, ...parsed.texts },
    blocos: { ...defaultConfig.blocos, ...(parsed.blocos ?? {}) },
    contato: { ...defaultConfig.contato, ...(parsed.contato ?? {}) },
    sociais: parsed.sociais ?? defaultConfig.sociais,
  };
}

export function getConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
    return defaultConfig;
  }

  try {
    return merge(JSON.parse(stored) as Partial<SiteConfig>);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
}

export function saveConfig(config: SiteConfig): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(merge(config)));
  window.dispatchEvent(new Event("siteConfigChanged"));
}

/** Converte as cores do painel em variáveis CSS do design system da landing. */
export function themeVars(colors: SiteConfig["colors"]): Record<string, string> {
  return {
    "--floresta": colors.primary,
    "--floresta-dark": colors.primary,
    "--primary": colors.primary,
    "--ring": colors.primary,
    "--secondary-foreground": colors.primary,
    "--carvao": colors.secondary,
    "--mostarda": colors.accent,
    "--background": colors.background,
    "--card": colors.background,
    "--foreground": colors.text,
    "--card-foreground": colors.text,
  };
}

/** Link do WhatsApp montado a partir dos dados de contato salvos no painel. */
export function whatsappHref(contato: SiteConfig["contato"], mensagem?: string): string {
  const numero = (contato.whatsapp || "").replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem ?? contato.mensagemWhatsapp)}`;
}

/** true quando o valor é um arquivo enviado por upload (data URL). */
export const isUploaded = (value: string) => (value || "").startsWith("data:");

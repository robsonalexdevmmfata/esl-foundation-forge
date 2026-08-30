import { useState, useEffect } from "react";
import logoPng from "@/assets/logo.png";
import { getConfig, EMPRESA } from "@/lib/site-config";

export const WHATSAPP =
  `https://wa.me/${EMPRESA.whatsapp}?text=` +
  encodeURIComponent(EMPRESA.mensagemWhatsapp);

const SOCIAIS = [
  { label: "Instagram", url: "https://www.instagram.com/eslempreendimentos" },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/esl-empreendimentos" },
  { label: "Facebook", url: "https://www.facebook.com/eslempreendimentos" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(getConfig());

  useEffect(() => {
    const handleConfigChange = () => {
      setConfig(getConfig());
    };
    window.addEventListener("siteConfigChanged", handleConfigChange);
    return () => window.removeEventListener("siteConfigChanged", handleConfigChange);
  }, []);

  const links = config.navbar.links;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5">
        <a href="#inicio" className="flex items-center">
          <img
            src={config.logo.navbar || logoPng}
            alt="E.S.L & Empreendimentos — serviços corporativos e institucionais"
            className="h-16 w-auto md:h-20"
            width={300}
            height={80}
          />
        </a>

        <nav className="hidden items-center gap-4 md:gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-xs font-semibold tracking-wide transition-colors hover:opacity-80 sm:text-sm"
              style={{ color: config.colors.primary }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md px-3 py-2 font-display text-xs font-bold text-background shadow-sm transition-colors hover:opacity-90 sm:inline-flex sm:px-4 sm:py-2.5 sm:text-sm"
            style={{ backgroundColor: config.colors.primary }}
          >
            {config.navbar.buttonText}
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-2 lg:hidden"
            style={{ color: config.colors.primary }}
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 lg:hidden sm:px-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/50 py-3 font-display text-sm font-semibold last:border-0"
              style={{ color: config.colors.primary }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-md px-4 py-3 text-center font-display text-sm font-bold text-background"
            style={{ backgroundColor: config.colors.primary }}
          >
            {config.navbar.buttonText}
          </a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const [config, setConfig] = useState(getConfig());

  useEffect(() => {
    const handleConfigChange = () => {
      setConfig(getConfig());
    };
    window.addEventListener("siteConfigChanged", handleConfigChange);
    return () => window.removeEventListener("siteConfigChanged", handleConfigChange);
  }, []);

  const links = config.navbar.links;

  return (
    <footer className="bg-carvao text-background" style={{ backgroundColor: config.colors.secondary }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-5 sm:py-14 md:grid-cols-3">
        <div>
          <img
            src={config.logo.footer || logoPng}
            alt="E.S.L & Empreendimentos"
            className="h-16 w-auto sm:h-20"
          />
          <p className="mt-3 max-w-xs text-sm text-background/70">
            {config.texts.footerDescription}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-background/60">
            {EMPRESA.razaoSocial}
            <br />
            CNPJ {EMPRESA.cnpj}
            <br />
            {EMPRESA.sede}
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-mostarda">
            Navegação
          </p>
          <ul className="mt-4 space-y-2 text-sm text-background/80">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-mostarda">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contato" className="hover:text-mostarda">
                Política de Privacidade
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-mostarda">
            Contato
          </p>
          <ul className="mt-4 space-y-2 text-sm text-background/80">
            <li>{EMPRESA.sede} · {EMPRESA.atuacao}</li>
            <li>{EMPRESA.telefone}</li>
            <li>{EMPRESA.email}</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            {SOCIAIS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-terra px-3 py-1.5 text-xs font-semibold text-terra transition-colors hover:bg-terra hover:text-background"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-background/70 sm:px-5 sm:py-5 md:flex-row md:items-center md:justify-between">
          <p>{config.texts.footerCopyright}</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>Desenvolvido por</span>
            <a href="https://www.agenciainfotech.com.br" target="_blank" rel="noopener noreferrer" className="font-semibold text-mostarda hover:text-terra">
              Agência Info Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-floresta px-4 py-2.5 font-display text-xs font-bold text-background shadow-lg transition-colors hover:bg-terra sm:bottom-5 sm:right-5 sm:px-5 sm:py-3 sm:text-sm"
    >
      WhatsApp
    </a>
  );
}

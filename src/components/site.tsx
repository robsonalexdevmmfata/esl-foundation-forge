import { useState } from "react";
import logoPng from "@/assets/logo.png";

export const WHATSAPP =
  "https://wa.me/5511999999999?text=" +
  encodeURIComponent(
    "Olá, ESL FACILITY! Gostaria de solicitar um orçamento para o meu projeto.",
  );

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5">
        <a href="#inicio" className="flex items-center">
          <img
            src={logoPng}
            alt="ESL Facility — construção civil"
            className="h-16 w-auto md:h-20"
            width={300}
            height={80}
          />
        </a>

        <nav className="hidden items-center gap-4 md:gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-xs font-semibold tracking-wide text-floresta transition-colors hover:text-terra sm:text-sm md:text-sm"
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
            className="hidden rounded-md bg-terra px-3 py-2 font-display text-xs font-bold text-background shadow-sm transition-colors hover:bg-terra-dark sm:inline-flex sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Orçamento Rápido
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-2 text-floresta lg:hidden"
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
              className="block py-3 font-display text-sm font-semibold text-floresta border-b border-border/50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-md bg-terra px-4 py-3 text-center font-display text-sm font-bold text-background"
          >
            Orçamento Rápido
          </a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-carvao text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-5 sm:py-14 md:grid-cols-3">
        <div>
          <img
            src={logoPng}
            alt="ESL Facility — construção civil"
            className="h-16 w-auto sm:h-20"
          />
          <p className="mt-3 max-w-xs text-sm text-background/70">
            Engenharia, construção e manutenção predial com técnica, segurança e
            responsabilidade ambiental.
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
            Fale com a gente
          </p>
          <ul className="mt-4 space-y-2 text-sm text-background/80">
            <li>Av. das Construções, 1200 — São Paulo/SP</li>
            <li>(11) 99999-9999</li>
            <li>contato@eslfacility.com.br</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            {["Instagram", "LinkedIn", "Facebook"].map((s) => (
              <a
                key={s}
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-terra px-3 py-1.5 text-xs font-semibold text-terra transition-colors hover:bg-terra hover:text-background"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-background/70 sm:px-5 sm:py-5 md:flex-row md:items-center md:justify-between">
          <p>© 2024 ESL FACILITY. Todos os direitos reservados.</p>
          <p>
            Desenvolvido pela{" "}
            <a
              href="https://www.agenciainfotech.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-mostarda hover:text-terra"
            >
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
      Falar no WhatsApp
    </a>
  );
}

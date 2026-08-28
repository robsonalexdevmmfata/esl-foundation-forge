import { useState } from "react";
import logo from "@/assets/esl-logo.jpeg.asset.json";

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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#inicio" className="flex items-center">
          <img
            src={logo.url}
            alt="ESL Facility — construção civil"
            className="h-11 w-auto"
            width={160}
            height={44}
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display text-sm font-semibold tracking-wide text-floresta transition-colors hover:text-terra"
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
            className="hidden rounded-md bg-terra px-4 py-2.5 font-display text-sm font-bold text-background shadow-sm transition-colors hover:bg-terra-dark sm:inline-flex"
          >
            Orçamento Rápido
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-2 text-floresta md:hidden"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-display text-sm font-semibold text-floresta"
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-md bg-terra px-4 py-2.5 text-center font-display text-sm font-bold text-background"
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
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-tight">
            ESL <span className="text-mostarda">FACILITY</span>
          </p>
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
          <div className="mt-4 flex gap-3">
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
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5 text-xs text-background/70 md:flex-row md:items-center md:justify-between">
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
      className="fixed bottom-5 right-5 z-50 rounded-full bg-floresta px-5 py-3 font-display text-sm font-bold text-background shadow-lg transition-colors hover:bg-terra"
    >
      Falar no WhatsApp
    </a>
  );
}

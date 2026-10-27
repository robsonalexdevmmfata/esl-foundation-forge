import { useEffect, useState, type ImgHTMLAttributes } from "react";
import logoPng from "@/assets/logo.png";
import { navbarButtonText, navbarLinks, whatsappHref } from "@/lib/site-config";
import { useSiteConfig } from "@/lib/use-site-config";

/** Imagem que volta para a logo padrão se o arquivo salvo estiver vazio ou quebrado. */
export function SafeLogo({
  src,
  fallback = logoPng,
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src?: string; fallback?: string }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return <img {...props} src={!src || failed ? fallback : src} onError={() => setFailed(true)} />;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const config = useSiteConfig();
  const links = navbarLinks(config);
  const buttonText = navbarButtonText(config);
  const whatsapp = whatsappHref(config.contato);

  useEffect(() => {
    if (!open) return;
    const close = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="flex items-center justify-between gap-3 py-3">
          <a href="#inicio" className="flex min-w-0 shrink items-center">
            <SafeLogo
              src={config.logo.navbar}
              alt="E.S.L & Empreendimentos — serviços corporativos e institucionais"
              className="h-12 w-auto max-w-[170px] object-contain object-left sm:h-14 sm:max-w-[210px] lg:h-16 lg:max-w-[200px] xl:h-20 xl:max-w-[260px]"
              width={300}
              height={80}
            />
          </a>

          <nav className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-6">
            {links.map((l, i) => (
              <a
                key={`${l.href}-${i}`}
                href={l.href}
                className="whitespace-nowrap font-display text-xs font-semibold tracking-wide transition-colors hover:opacity-80 xl:text-sm"
                style={{ color: config.colors.primary }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              title={buttonText}
              className="hidden max-w-[220px] truncate whitespace-nowrap rounded-md px-4 py-2.5 font-display text-sm font-bold text-background shadow-sm transition-colors hover:opacity-90 sm:inline-block"
              style={{ backgroundColor: config.colors.primary }}
            >
              {buttonText}
            </a>
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center rounded-md border border-border p-2 md:hidden"
              style={{ color: config.colors.primary }}
            >
              <span className="block h-0.5 w-5 bg-current" />
              <span className="mt-1 block h-0.5 w-5 bg-current" />
              <span className="mt-1 block h-0.5 w-5 bg-current" />
            </button>
          </div>
        </div>

        {/* Tablet: menu completo em uma segunda linha, sem hambúrguer */}
        <nav className="hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border py-2.5 md:flex lg:hidden">
          {links.map((l, i) => (
            <a
              key={`${l.href}-${i}`}
              href={l.href}
              className="whitespace-nowrap font-display text-xs font-semibold tracking-wide transition-colors hover:opacity-80"
              style={{ color: config.colors.primary }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-border bg-background px-4 py-4 sm:px-5 md:hidden"
        >
          {links.map((l, i) => (
            <a
              key={`${l.href}-${i}`}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/50 py-3 font-display text-sm font-semibold last:border-0"
              style={{ color: config.colors.primary }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block break-words rounded-md px-4 py-3 text-center font-display text-sm font-bold text-background"
            style={{ backgroundColor: config.colors.primary }}
          >
            {buttonText}
          </a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const config = useSiteConfig();
  const links = navbarLinks(config);
  const c = config.contato;

  return (
    <footer
      className="bg-carvao text-background"
      style={{ backgroundColor: config.colors.secondary }}
    >
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
            {c.razaoSocial}
            <br />
            CNPJ {c.cnpj}
            <br />
            {c.sede}
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
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-mostarda">
            Contato
          </p>
          <ul className="mt-4 space-y-2 text-sm text-background/80">
            <li>
              {c.sede} · {c.atuacao}
            </li>
            <li>{c.telefone}</li>
            <li>{c.email}</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            {config.sociais.map((s) => (
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
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-background/70 sm:px-5 sm:py-5">
          <p>{config.texts.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const config = useSiteConfig();
  return (
    <a
      href={whatsappHref(config.contato)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-floresta px-4 py-2.5 font-display text-xs font-bold text-background shadow-lg transition-colors hover:bg-terra sm:bottom-5 sm:right-5 sm:px-5 sm:py-3 sm:text-sm"
    >
      WhatsApp
    </a>
  );
}

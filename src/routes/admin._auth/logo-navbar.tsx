import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  getConfig,
  saveConfig,
  isUploaded,
  navbarButtonText,
  navbarLinks,
  type LogoKey,
  type SiteConfig,
} from "@/lib/site-config";
import { readImageFile } from "@/lib/image-upload";
import { AdminLayout } from "@/components/admin-layout";
import { SafeLogo } from "@/components/site";

export const Route = createFileRoute("/admin/_auth/logo-navbar")({
  component: () => (
    <AdminLayout>
      <LogoNavbarEditor />
    </AdminLayout>
  ),
});

/** Tamanho máximo (px) de cada imagem salva, para não estourar o armazenamento do navegador. */
const MAX_SIZE: Record<LogoKey, number> = {
  navbar: 600,
  footer: 600,
  favicon: 256,
  hero: 1600,
  about: 1200,
};

function ImageField({
  type,
  label,
  placeholder,
  value,
  fileName,
  busy,
  onChange,
  onUpload,
}: {
  type: LogoKey;
  label: string;
  placeholder: string;
  value: string;
  fileName?: string | undefined;
  busy: boolean;
  onChange: (type: LogoKey, value: string) => void;
  onUpload: (type: LogoKey, file?: File | null) => void;
}) {
  const uploaded = isUploaded(value);
  const ext = (fileName?.split(".").pop() || "").toUpperCase();

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>

      {uploaded ? (
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-gray-300 bg-gray-50 p-3 sm:flex sm:flex-wrap">
          <img
            src={value}
            alt={fileName || label}
            className="h-14 w-14 shrink-0 rounded-md border border-gray-200 bg-white object-contain"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-800">
              {fileName || "imagem enviada"}
            </p>
            {ext && <p className="text-xs text-gray-500">Arquivo {ext}</p>}
          </div>
          <div className="col-span-2 flex gap-2 sm:col-span-1">
            <label className="flex-1 cursor-pointer rounded-lg border border-green-600 bg-green-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-green-700 sm:flex-none">
              {busy ? "Enviando..." : "Trocar"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={busy}
                onChange={(e) => {
                  onUpload(type, e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => onChange(type, "")}
              className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 sm:flex-none"
            >
              Remover
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(type, e.target.value)}
            className="w-full min-w-0 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
            placeholder={placeholder}
          />
          <label className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-green-600 bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700">
            {busy ? "Enviando..." : "Upload"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={busy}
              onChange={(e) => {
                onUpload(type, e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}

function LogoNavbarEditor() {
  const [config, setConfig] = useState<SiteConfig>(() => getConfig());
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState<LogoKey | null>(null);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  useEffect(() => {
    if (!aviso) return;
    const t = window.setTimeout(() => setAviso(""), 2000);
    return () => window.clearTimeout(t);
  }, [aviso]);

  /** Salva e só atualiza a tela se o navegador aceitar o arquivo. */
  const persist = (next: SiteConfig) => {
    if (saveConfig(next)) {
      setConfig(next);
      setErro("");
      setAviso("Alteração salva no site.");
      return true;
    }
    setErro(
      "Não foi possível salvar: o armazenamento do navegador está cheio. Use uma imagem menor ou remova outras imagens enviadas.",
    );
    return false;
  };

  const handleLogoChange = (type: LogoKey, value: string, fileName?: string) => {
    const names = { ...config.logoNames };
    if (fileName) names[type] = fileName;
    else delete names[type];
    persist({ ...config, logo: { ...config.logo, [type]: value }, logoNames: names });
  };

  const handleUpload = async (type: LogoKey, file?: File | null) => {
    if (!file) return;
    setEnviando(type);
    try {
      const result = await readImageFile(file, MAX_SIZE[type]);
      handleLogoChange(type, result, file.name);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível ler a imagem.");
    } finally {
      setEnviando(null);
    }
  };

  const updateNavbar = (navbar: Partial<SiteConfig["navbar"]>) =>
    persist({ ...config, navbar: { ...config.navbar, ...navbar } });

  const handleLinkChange = (index: number, field: "href" | "label", value: string) => {
    const newLinks = config.navbar.links.map((l, i) => (i === index ? { ...l, [field]: value } : l));
    updateNavbar({ links: newLinks });
  };

  const handleFooterTextChange = (
    field: "footerDescription" | "footerCopyright",
    value: string,
  ) => persist({ ...config, texts: { ...config.texts, [field]: value } });

  const previewLinks = navbarLinks(config);
  const previewButton = navbarButtonText(config);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Logo e Navbar</h1>
          <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
            Personalize as logos, menu e rodapé do site. Cada alteração é salva na hora.
          </p>
        </div>
        <span
          className={`inline-flex w-fit shrink-0 items-center rounded-xl px-4 py-2 text-sm font-semibold ${
            erro ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
          }`}
          role="status"
        >
          {erro ? "Não salvo" : aviso || "Tudo salvo"}
        </span>
      </div>

      {erro && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erro}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-w-0 rounded-xl bg-white p-4 shadow-lg sm:p-6">
          <h2 className="mb-6 text-lg font-bold text-gray-800 sm:text-xl">Configurações de Logo</h2>
          <div className="space-y-6">
            <ImageField
              type="navbar"
              label="Logo da Navbar"
              placeholder="/logo.png"
              value={config.logo.navbar}
              fileName={config.logoNames?.navbar}
              busy={enviando === "navbar"}
              onChange={handleLogoChange}
              onUpload={handleUpload}
            />
            <ImageField
              type="footer"
              label="Logo do Rodapé"
              placeholder="/logo.png"
              value={config.logo.footer}
              fileName={config.logoNames?.footer}
              busy={enviando === "footer"}
              onChange={handleLogoChange}
              onUpload={handleUpload}
            />
            <ImageField
              type="favicon"
              label="Favicon"
              placeholder="/favicon.png"
              value={config.logo.favicon}
              fileName={config.logoNames?.favicon}
              busy={enviando === "favicon"}
              onChange={handleLogoChange}
              onUpload={handleUpload}
            />
            <ImageField
              type="hero"
              label="Imagem do Hero"
              placeholder="/corporativo-hero.jpg"
              value={config.logo.hero}
              fileName={config.logoNames?.hero}
              busy={enviando === "hero"}
              onChange={handleLogoChange}
              onUpload={handleUpload}
            />
            <ImageField
              type="about"
              label="Imagem da Seção A Empresa"
              placeholder="/equipe-corporativa.jpg"
              value={config.logo.about}
              fileName={config.logoNames?.about}
              busy={enviando === "about"}
              onChange={handleLogoChange}
              onUpload={handleUpload}
            />
          </div>
        </div>

        <div className="min-w-0 rounded-xl bg-white p-4 shadow-lg sm:p-6">
          <h2 className="mb-6 text-lg font-bold text-gray-800 sm:text-xl">Rodapé</h2>
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Descrição do Rodapé
              </label>
              <textarea
                value={config.texts.footerDescription}
                onChange={(e) => handleFooterTextChange("footerDescription", e.target.value)}
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Texto de Direitos Reservados
              </label>
              <input
                type="text"
                value={config.texts.footerCopyright}
                onChange={(e) => handleFooterTextChange("footerCopyright", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-xl bg-white p-4 shadow-lg sm:p-6 lg:col-span-2">
          <h2 className="mb-6 text-lg font-bold text-gray-800 sm:text-xl">Menu de Navegação</h2>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Texto do botão do topo
              </label>
              <input
                type="text"
                value={config.navbar.buttonText}
                maxLength={40}
                onChange={(e) => updateNavbar({ buttonText: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                placeholder="Solicitar proposta"
              />
              <p className="mt-1 text-xs text-gray-500">
                Até 40 caracteres. Se ficar vazio, o site mostra “Solicitar proposta”.
              </p>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <label className="block text-sm font-medium text-gray-700">Links de Navegação</label>
                <button
                  type="button"
                  onClick={() =>
                    updateNavbar({
                      links: [...config.navbar.links, { href: "#inicio", label: "Novo Link" }],
                    })
                  }
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  + Adicionar Link
                </button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {config.navbar.links.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="min-w-0 flex-1 space-y-2">
                      <input
                        type="text"
                        value={link.label}
                        maxLength={40}
                        onChange={(e) => handleLinkChange(index, "label", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                        placeholder="Nome do link"
                      />
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => handleLinkChange(index, "href", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                        placeholder="Destino (ex.: #contato)"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label={`Remover link ${link.label}`}
                      onClick={() =>
                        updateNavbar({ links: config.navbar.links.filter((_, i) => i !== index) })
                      }
                      className="shrink-0 rounded-lg bg-red-500 px-3 py-2 text-white transition-colors hover:bg-red-600"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-800 sm:mb-6 sm:text-xl">
          Prévia do topo do site
        </h2>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <SafeLogo
              src={config.logo.navbar}
              alt="Prévia da logo"
              className="h-14 w-auto max-w-[220px] object-contain object-left"
            />
            <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
              {previewLinks.map((link, index) => (
                <span key={index} className="text-sm font-medium text-gray-700">
                  {link.label}
                </span>
              ))}
              <span
                className="max-w-[220px] truncate rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: config.colors.primary }}
              >
                {previewButton}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

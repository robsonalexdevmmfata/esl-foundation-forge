import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getConfig, saveConfig, isUploaded, type LogoKey, type SiteConfig } from "@/lib/site-config";
import { AdminLayout } from "@/components/admin-layout";

export const Route = createFileRoute("/admin/_auth/logo-navbar")({
  component: () => (
    <AdminLayout>
      <LogoNavbarEditor />
    </AdminLayout>
  ),
});

function LogoNavbarEditor() {
  const [config, setConfig] = useState<SiteConfig>(() => getConfig());
  const [previewLogo, setPreviewLogo] = useState(() => getConfig().logo.navbar);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const initialConfig = getConfig();
    setConfig(initialConfig);
    setPreviewLogo(initialConfig.logo.navbar);
    setIsSaved(true);
  }, []);

  const handleLogoChange = (type: LogoKey, value: string, fileName?: string) => {
    const newConfig: SiteConfig = {
      ...config,
      logo: { ...config.logo, [type]: value },
      logoNames: { ...config.logoNames, [type]: fileName ?? undefined },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsSaved(true);
    if (type === "navbar") setPreviewLogo(value);
  };

  const handleUpload = (type: LogoKey, file?: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      handleLogoChange(type, result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const ImageField = ({ type, label, placeholder }: { type: LogoKey; label: string; placeholder: string }) => {
    const value = config.logo[type];
    const uploaded = isUploaded(value);
    const fileName = config.logoNames?.[type];
    const ext = (fileName?.split(".").pop() || "").toUpperCase();

    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>

        {uploaded ? (
          <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-gray-50 p-3">
            <img src={value} alt={fileName || label} className="h-14 w-14 shrink-0 rounded-md border border-gray-200 bg-white object-contain" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-800">{fileName || "imagem enviada"}</p>
              {ext && <p className="text-xs text-gray-500">Arquivo {ext}</p>}
            </div>
            <label className="cursor-pointer rounded-lg border border-green-600 bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700">
              Trocar
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(type, e.target.files?.[0])} />
            </label>
            <button
              type="button"
              onClick={() => handleLogoChange(type, "")}
              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
            >
              Remover
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <input
              type="text"
              value={value}
              onChange={(e) => handleLogoChange(type, e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
              placeholder={placeholder}
            />
            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-green-600 bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700">
              Upload
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(type, e.target.files?.[0])} />
            </label>
          </div>
        )}
      </div>
    );
  };

  const handleLinkChange = (index: number, field: "href" | "label", value: string) => {
    const newLinks = [...config.navbar.links];
    const current = newLinks[index] ?? { href: "#", label: "" };
    newLinks[index] = { ...current, [field]: value };
    const newConfig = {
      ...config,
      navbar: { ...config.navbar, links: newLinks },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsSaved(true);
  };

  const handleAddLink = () => {
    const newConfig = {
      ...config,
      navbar: {
        ...config.navbar,
        links: [...config.navbar.links, { href: "#", label: "Novo Link" }],
      },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsSaved(true);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = config.navbar.links.filter((_, i) => i !== index);
    const newConfig = {
      ...config,
      navbar: { ...config.navbar, links: newLinks },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsSaved(true);
  };

  const handleButtonTextChange = (value: string) => {
    const newConfig = {
      ...config,
      navbar: { ...config.navbar, buttonText: value },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsSaved(true);
  };

  const handleFooterTextChange = (field: "footerDescription" | "footerCopyright", value: string) => {
    const newConfig = {
      ...config,
      texts: { ...config.texts, [field]: value },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsSaved(true);
  };

  const handleSave = () => {
    saveConfig(config);
    setIsSaved(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Logo e Navbar</h1>
          <p className="mt-2 text-gray-600">Personalize as logos, menu e rodapé do site</p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-[#1f7a4d] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#196b42]"
        >
          {isSaved ? "Salvo" : "Salvar alterações"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Configurações de Logo</h2>

          <div className="space-y-6">
            <ImageField type="navbar" label="Logo da Navbar" placeholder="/logo.png" />
            <ImageField type="footer" label="Logo do Rodapé" placeholder="/logo.png" />
            <ImageField type="favicon" label="Favicon" placeholder="/favicon.png" />
            <ImageField type="hero" label="Imagem do Hero" placeholder="/corporativo-hero.jpg" />
            <ImageField type="about" label="Imagem da Seção A Empresa" placeholder="/equipe-corporativa.jpg" />
          </div>
        </div>

        {/* Footer Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Rodapé e Créditos</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Rodapé</label>
              <textarea
                value={config.texts.footerDescription}
                onChange={(e) => handleFooterTextChange("footerDescription", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Texto de Direitos Reservados</label>
              <input
                type="text"
                value={config.texts.footerCopyright}
                onChange={(e) => handleFooterTextChange("footerCopyright", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

          </div>
        </div>

        {/* Navbar Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Menu de Navegação</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto do Botão CTA
              </label>
              <input
                type="text"
                value={config.navbar.buttonText}
                onChange={(e) => handleButtonTextChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Orçamento Rápido"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Links de Navegação
                </label>
                <button
                  onClick={handleAddLink}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  + Adicionar Link
                </button>
              </div>

              <div className="space-y-3">
                {config.navbar.links.map((link, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleLinkChange(index, "label", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                        placeholder="Label"
                      />
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => handleLinkChange(index, "href", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                        placeholder="URL (#sobre)"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveLink(index)}
                      className="mt-6 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Preview em Tempo Real</h2>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <img
              src={previewLogo}
              alt="Logo Preview"
              className="h-16 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />
            <div className="flex items-center gap-6">
              {config.navbar.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-green-600"
                >
                  {link.label}
                </a>
              ))}
              <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium">
                {config.navbar.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getConfig, saveConfig, SiteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/admin/_auth/logo-navbar")({
  component: LogoNavbarEditor,
});

function LogoNavbarEditor() {
  const [config, setConfig] = useState<SiteConfig>(getConfig());
  const [previewLogo, setPreviewLogo] = useState(config.logo.navbar);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  const handleLogoChange = (type: "navbar" | "footer" | "favicon", value: string) => {
    const newConfig = {
      ...config,
      logo: { ...config.logo, [type]: value },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
    if (type === "navbar") setPreviewLogo(value);
  };

  const handleLinkChange = (index: number, field: "href" | "label", value: string) => {
    const newLinks = [...config.navbar.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    const newConfig = {
      ...config,
      navbar: { ...config.navbar, links: newLinks },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
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
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = config.navbar.links.filter((_, i) => i !== index);
    const newConfig = {
      ...config,
      navbar: { ...config.navbar, links: newLinks },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
  };

  const handleButtonTextChange = (value: string) => {
    const newConfig = {
      ...config,
      navbar: { ...config.navbar, buttonText: value },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Logo e Navbar</h1>
        <p className="text-gray-600 mt-2">Personalize as logos e menu de navegação</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Configurações de Logo</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo da Navbar
              </label>
              <input
                type="text"
                value={config.logo.navbar}
                onChange={(e) => handleLogoChange("navbar", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="/logo.png"
              />
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={previewLogo}
                  alt="Preview Logo"
                  className="h-16 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.png";
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo do Rodapé
              </label>
              <input
                type="text"
                value={config.logo.footer}
                onChange={(e) => handleLogoChange("footer", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="/logo.png"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favicon
              </label>
              <input
                type="text"
                value={config.logo.favicon}
                onChange={(e) => handleLogoChange("favicon", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="/favicon.png"
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

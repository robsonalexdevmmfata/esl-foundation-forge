import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getConfig, saveConfig, SiteConfig } from "@/lib/site-config";
import { AdminLayout } from "@/components/admin-layout";

export const Route = createFileRoute("/admin/_auth/cores-textos")({
  component: () => (
    <AdminLayout>
      <ColorsTextsEditor />
    </AdminLayout>
  ),
});

function ColorsTextsEditor() {
  const [config, setConfig] = useState<SiteConfig>(() => getConfig());
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const initialConfig = getConfig();
    setConfig(initialConfig);
    setIsSaved(true);
  }, []);

  const handleColorChange = (colorKey: keyof SiteConfig["colors"], value: string) => {
    const newConfig = {
      ...config,
      colors: { ...config.colors, [colorKey]: value },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsSaved(true);
  };

  const handleTextChange = (textKey: keyof SiteConfig["texts"], value: string) => {
    const newConfig = {
      ...config,
      texts: { ...config.texts, [textKey]: value },
    };
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsSaved(true);
  };

  const handleSave = () => {
    saveConfig(config);
    setIsSaved(true);
  };

  const ColorPicker = ({
    label,
    value,
    onChange,
    description,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    description: string;
  }) => (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{value}</span>
      </div>
      <p className="mb-3 text-xs text-slate-500">{description}</p>
      <div className="flex gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-12 rounded border border-gray-300 cursor-pointer bg-white"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  const TextArea = ({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
      />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cores e Textos</h1>
          <p className="mt-2 text-gray-600">Personalize as cores e textos do site</p>
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
        {/* Colors */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Cores do Site</h2>

          <div className="space-y-6">
            <ColorPicker
              label="Cor Primária"
              value={config.colors.primary}
              description="Usada no logotipo, nav links, botões principais e fundo do hero."
              onChange={(value) => handleColorChange("primary", value)}
            />
            <ColorPicker
              label="Cor Secundária"
              value={config.colors.secondary}
              description="Aplica no rodapé e nas áreas de destaque institucional do site."
              onChange={(value) => handleColorChange("secondary", value)}
            />
            <ColorPicker
              label="Cor de Destaque"
              value={config.colors.accent}
              description="Usada em botões acessórios, destaques, badges e elementos visuais de atenção."
              onChange={(value) => handleColorChange("accent", value)}
            />
            <ColorPicker
              label="Cor de Fundo"
              value={config.colors.background}
              description="Define o fundo geral das páginas e blocos claros."
              onChange={(value) => handleColorChange("background", value)}
            />
            <ColorPicker
              label="Cor do Texto"
              value={config.colors.text}
              description="Ajusta a cor principal do texto do corpo da página e blocos de conteúdo."
              onChange={(value) => handleColorChange("text", value)}
            />
          </div>
        </div>

        {/* Texts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Textos do Site</h2>

          <div className="space-y-6">
            <TextArea
              label="Título do Hero"
              value={config.texts.heroTitle}
              onChange={(value) => handleTextChange("heroTitle", value)}
              rows={2}
            />
            <TextArea
              label="Subtítulo do Hero"
              value={config.texts.heroSubtitle}
              onChange={(value) => handleTextChange("heroSubtitle", value)}
              rows={3}
            />
            <TextArea
              label="Título Sobre Nós"
              value={config.texts.aboutTitle}
              onChange={(value) => handleTextChange("aboutTitle", value)}
              rows={1}
            />
            <TextArea
              label="Texto Sobre Nós"
              value={config.texts.aboutText}
              onChange={(value) => handleTextChange("aboutText", value)}
              rows={4}
            />
            <TextArea
              label="Título Contato"
              value={config.texts.contactTitle}
              onChange={(value) => handleTextChange("contactTitle", value)}
              rows={1}
            />
            <TextArea
              label="Texto Contato"
              value={config.texts.contactText}
              onChange={(value) => handleTextChange("contactText", value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Preview em Tempo Real</h2>
        
        <div className="space-y-6">
          {/* Hero Preview */}
          <div 
            className="rounded-lg p-8 text-center"
            style={{ 
              backgroundColor: config.colors.primary,
              color: config.colors.background 
            }}
          >
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: config.colors.background }}
            >
              {config.texts.heroTitle}
            </h3>
            <p 
              className="text-lg opacity-90"
              style={{ color: config.colors.background }}
            >
              {config.texts.heroSubtitle}
            </p>
          </div>

          {/* Colors Preview */}
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2"
                style={{ backgroundColor: config.colors.primary }}
              />
              <p className="text-sm text-gray-600">Primária</p>
            </div>
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2"
                style={{ backgroundColor: config.colors.secondary }}
              />
              <p className="text-sm text-gray-600">Secundária</p>
            </div>
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2"
                style={{ backgroundColor: config.colors.accent }}
              />
              <p className="text-sm text-gray-600">Destaque</p>
            </div>
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2 border"
                style={{ backgroundColor: config.colors.background }}
              />
              <p className="text-sm text-gray-600">Fundo</p>
            </div>
            <div className="text-center">
              <div 
                className="w-full h-16 rounded-lg mb-2"
                style={{ backgroundColor: config.colors.text }}
              />
              <p className="text-sm text-gray-600">Texto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

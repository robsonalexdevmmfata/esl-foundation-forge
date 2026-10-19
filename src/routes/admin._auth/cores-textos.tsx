import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getConfig, saveConfig, type SiteConfig } from "@/lib/site-config";
import { AdminLayout } from "@/components/admin-layout";

export const Route = createFileRoute("/admin/_auth/cores-textos")({
  component: () => (
    <AdminLayout>
      <ColorsTextsEditor />
    </AdminLayout>
  ),
});

type TextKey = keyof SiteConfig["texts"];

const GRUPOS: Array<{ grupo: string; campos: Array<{ key: TextKey; label: string; rows?: number }> }> = [
  {
    grupo: "Topo (Hero)",
    campos: [
      { key: "heroBadge", label: "Tarja acima do título", rows: 1 },
      { key: "heroTitle", label: "Título do topo", rows: 2 },
      { key: "heroSubtitle", label: "Subtítulo do topo", rows: 3 },
      { key: "heroBotao1", label: "Texto do botão 1", rows: 1 },
      { key: "heroBotao2", label: "Texto do botão 2", rows: 1 },
    ],
  },
  {
    grupo: "A Empresa",
    campos: [
      { key: "aboutTag", label: "Tarja da seção", rows: 1 },
      { key: "aboutTitle", label: "Título", rows: 1 },
      { key: "aboutText", label: "1º parágrafo", rows: 4 },
      { key: "aboutTextSecondary", label: "2º parágrafo", rows: 4 },
      { key: "aboutTextTerciario", label: "3º parágrafo", rows: 4 },
    ],
  },
  {
    grupo: "Áreas de Atuação",
    campos: [
      { key: "areasTag", label: "Tarja da seção", rows: 1 },
      { key: "servicesTitle", label: "Título", rows: 1 },
      { key: "servicesDescription", label: "Descrição", rows: 3 },
    ],
  },
  {
    grupo: "Modelos de Contratação",
    campos: [
      { key: "modelosTag", label: "Tarja da seção", rows: 1 },
      { key: "modelosTitle", label: "Título", rows: 1 },
      { key: "modelosDescription", label: "Descrição", rows: 4 },
    ],
  },
  {
    grupo: "Metodologia",
    campos: [
      { key: "metodologiaTag", label: "Tarja da seção", rows: 1 },
      { key: "metodologiaTitle", label: "Título", rows: 1 },
      { key: "metodologiaDescription", label: "Descrição", rows: 3 },
      { key: "gestaoTitle", label: "Título do bloco Gestão inclusa", rows: 1 },
      { key: "gestaoTexto", label: "Texto do bloco Gestão inclusa", rows: 4 },
    ],
  },
  {
    grupo: "Organizações e Conformidade",
    campos: [
      { key: "organizacoesTitle", label: "Título Organizações atendidas", rows: 1 },
      { key: "conformidadeTitle", label: "Título Segurança jurídica", rows: 1 },
      { key: "conformidadeTexto", label: "Texto Segurança jurídica", rows: 4 },
    ],
  },
  {
    grupo: "Projetos e Clientes",
    campos: [
      { key: "projectsTitle", label: "Título da galeria", rows: 1 },
      { key: "projectsDescription", label: "Descrição da galeria", rows: 2 },
      { key: "clientesTitle", label: "Título do carrossel de empresas", rows: 1 },
    ],
  },
  {
    grupo: "Contato",
    campos: [
      { key: "contactTitle", label: "Título", rows: 1 },
      { key: "contactText", label: "Texto", rows: 3 },
      { key: "contactBotaoWhatsapp", label: "Botão WhatsApp", rows: 1 },
      { key: "contactBotaoFormulario", label: "Botão do formulário", rows: 1 },
    ],
  },
  {
    grupo: "Rodapé",
    campos: [
      { key: "footerDescription", label: "Descrição do rodapé", rows: 3 },
      { key: "footerCopyright", label: "Direitos reservados", rows: 2 },
    ],
  },
];

function ColorPicker({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="block text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{value}</span>
      </div>
      <p className="mb-3 text-xs text-slate-500">{description}</p>
      <div className="flex gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-16 cursor-pointer rounded border border-gray-300 bg-white"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number | undefined;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

function ColorsTextsEditor() {
  const [config, setConfig] = useState<SiteConfig>(() => getConfig());
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    setConfig(getConfig());
    setIsSaved(true);
  }, []);

  const handleColorChange = (colorKey: keyof SiteConfig["colors"], value: string) => {
    const newConfig = { ...config, colors: { ...config.colors, [colorKey]: value } };
    setConfig(newConfig);
    saveConfig(newConfig);
    setIsSaved(true);
  };

  const handleTextChange = (textKey: TextKey, value: string) => {
    const newConfig = { ...config, texts: { ...config.texts, [textKey]: value } };
    setConfig(newConfig);
    setIsSaved(false);
  };

  const handleSave = () => {
    saveConfig(config);
    setIsSaved(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cores e Textos</h1>
          <p className="mt-2 text-gray-600">Personalize as cores e todos os textos do site</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-[#1f7a4d] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#196b42]"
        >
          {isSaved ? "Salvo" : "Salvar alterações"}
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-bold text-gray-800">Cores do Site</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ColorPicker
            label="Cor Primária"
            value={config.colors.primary}
            description="Usada no logotipo, nav links, botões principais e fundo do hero."
            onChange={(v) => handleColorChange("primary", v)}
          />
          <ColorPicker
            label="Cor Secundária"
            value={config.colors.secondary}
            description="Aplica no rodapé e nas áreas de destaque institucional do site."
            onChange={(v) => handleColorChange("secondary", v)}
          />
          <ColorPicker
            label="Cor de Destaque"
            value={config.colors.accent}
            description="Botões acessórios, destaques, badges e elementos de atenção."
            onChange={(v) => handleColorChange("accent", v)}
          />
          <ColorPicker
            label="Cor de Fundo"
            value={config.colors.background}
            description="Define o fundo geral das páginas e blocos claros."
            onChange={(v) => handleColorChange("background", v)}
          />
          <ColorPicker
            label="Cor do Texto"
            value={config.colors.text}
            description="Cor principal do texto do corpo da página."
            onChange={(v) => handleColorChange("text", v)}
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {GRUPOS.map((g) => (
          <div key={g.grupo} className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-gray-800">{g.grupo}</h2>
            <div className="space-y-5">
              {g.campos.map((campo) => (
                <TextArea
                  key={campo.key}
                  label={campo.label}
                  rows={campo.rows}
                  value={config.texts[campo.key]}
                  onChange={(v) => handleTextChange(campo.key, v)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-[#1f7a4d] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#196b42]"
        >
          {isSaved ? "Salvo" : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}

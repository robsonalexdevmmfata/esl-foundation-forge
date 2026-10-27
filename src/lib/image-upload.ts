/**
 * Lê uma imagem enviada pelo painel e reduz o tamanho antes de salvar,
 * evitando estourar o limite de armazenamento do navegador.
 */
function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(reader.error ?? new Error("Falha ao ler o arquivo."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Arquivo de imagem inválido."));
    img.src = src;
  });
}

export async function readImageFile(file: File, maxSize = 800): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem (PNG, JPG, WEBP ou SVG).");
  }

  const original = await readAsDataUrl(file);
  if (file.type === "image/svg+xml" || file.type === "image/gif") return original;

  const img = await loadImage(original);
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  if (scale === 1 && original.length < 250_000) return original;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return original;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const keepTransparency = file.type !== "image/jpeg";
  if (keepTransparency) {
    const webp = canvas.toDataURL("image/webp", 0.9);
    return webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/png");
  }
  return canvas.toDataURL("image/jpeg", 0.85);
}

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

export const PNG_ONLY_MESSAGE = "A logo precisa ser um arquivo PNG (.png). Outros formatos não são aceitos.";

export function isPngFile(file: File): boolean {
  return file.type === "image/png" && /\.png$/i.test(file.name);
}

export async function readImageFile(
  file: File,
  maxSize = 800,
  options: { pngOnly?: boolean } = {},
): Promise<string> {
  if (options.pngOnly && !isPngFile(file)) {
    throw new Error(PNG_ONLY_MESSAGE);
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem (PNG, JPG, WEBP ou SVG).");
  }

  const original = await readAsDataUrl(file);
  if (file.type === "image/svg+xml" || file.type === "image/gif") return original;
  if (options.pngOnly) return trimPng(await loadImage(original), maxSize, original);

  const img = await loadImage(original);
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  if (scale === 1 && original.length < 250_000) return original;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return original;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Logos continuam em PNG mesmo depois de reduzidas.
  if (options.pngOnly) return canvas.toDataURL("image/png");

  const keepTransparency = file.type !== "image/jpeg";
  if (keepTransparency) {
    const webp = canvas.toDataURL("image/webp", 0.9);
    return webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/png");
  }
  return canvas.toDataURL("image/jpeg", 0.85);
}

/**
 * Logos em PNG: remove a área transparente em volta do desenho, para a logo
 * aparecer grande no site, e reduz para no máximo `maxSize` px.
 */
function trimPng(img: HTMLImageElement, maxSize: number, original: string): string {
  const src = document.createElement("canvas");
  src.width = img.width;
  src.height = img.height;
  const sctx = src.getContext("2d");
  if (!sctx) return original;
  sctx.drawImage(img, 0, 0);

  let top = img.height, left = img.width, right = -1, bottom = -1;
  try {
    const { data } = sctx.getImageData(0, 0, img.width, img.height);
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        if ((data[(y * img.width + x) * 4 + 3] ?? 0) > 8) {
          if (x < left) left = x;
          if (x > right) right = x;
          if (y < top) top = y;
          if (y > bottom) bottom = y;
        }
      }
    }
  } catch {
    return original;
  }
  if (right < 0) return original;

  const pad = Math.round(Math.max(right - left, bottom - top) * 0.02);
  left = Math.max(0, left - pad);
  top = Math.max(0, top - pad);
  right = Math.min(img.width - 1, right + pad);
  bottom = Math.min(img.height - 1, bottom + pad);
  const w = right - left + 1;
  const h = bottom - top + 1;
  const trimmed = w < img.width || h < img.height;
  const scale = Math.min(1, maxSize / Math.max(w, h));
  if (!trimmed && scale === 1 && original.length < 250_000) return original;

  const out = document.createElement("canvas");
  out.width = Math.max(1, Math.round(w * scale));
  out.height = Math.max(1, Math.round(h * scale));
  const octx = out.getContext("2d");
  if (!octx) return original;
  octx.drawImage(src, left, top, w, h, 0, 0, out.width, out.height);
  return out.toDataURL("image/png");
}

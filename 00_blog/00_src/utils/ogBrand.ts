// Shared brand assets for OG cards (option B split design).
import fs from "node:fs";
import path from "node:path";

function readPublicAsset(rel: string): string {
  const abs = path.resolve(process.cwd(), "01_public", rel.replace(/^\//, ""));
  const buf = fs.readFileSync(abs);
  const isJpeg = /\.(jpg|jpeg|jfif)$/i.test(rel);
  return `data:image/${isJpeg ? "jpeg" : "png"};base64,` + buf.toString("base64");
}

export const BRAND_BADGE = () => readPublicAsset("images/og/brand-badge.png");
export const BRAND_FALLBACK_COVER = () => readPublicAsset("hero-bg.jpg");

export function coverDataUri(ogImage: string): string {
  // Non-raster or unsupported formats (svg/webp/gif) fall back to the brand cover.
  if (!/\.(jpg|jpeg|jfif|png)$/i.test(ogImage)) return BRAND_FALLBACK_COVER();
  return readPublicAsset(ogImage);
}

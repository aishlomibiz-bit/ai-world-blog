// Shared brand assets for OG cards (option B split design).
import fs from "node:fs";
import path from "node:path";

function readPublicAsset(rel: string): string {
  const abs = path.resolve(process.cwd(), "01_public", rel.replace(/^\//, ""));
  const buf = fs.readFileSync(abs);
  const isJpeg = /\.(jpg|jpeg|jfif)$/i.test(rel);
  return `data:image/${isJpeg ? "jpeg" : "png"};base64,` + buf.toString("base64");
}

export const BRAND_BADGE = () => readPublicAsset("images/brand-badge.png");

// Rasterized replacements for covers satori cannot decode (svg/webp).
// Art is the original article art converted to PNG, shown fully (contain).
const COVER_OVERRIDES: Record<string, { rel: string; fit: "contain" }> = {
  "agent-loop": { rel: "images/posts/og-covers/agent-loop.png", fit: "contain" },
  "seo-reports": { rel: "images/posts/og-covers/seo-ranking-report.png", fit: "contain" },
};

export type Cover = { uri: string; fit: "cover" | "contain" };

// Returns null when the post has no usable cover; the caller then falls back
// to the pre-existing text card, so posts without article art keep their
// current share card until the owner picks art for them.
export function coverForPost(slug: string, ogImage?: string): Cover | null {
  const override = COVER_OVERRIDES[slug];
  if (override) return { uri: readPublicAsset(override.rel), fit: override.fit };
  if (ogImage && /\.(jpg|jpeg|jfif|png)$/i.test(ogImage)) {
    return { uri: readPublicAsset(ogImage), fit: "cover" };
  }
  return null;
}

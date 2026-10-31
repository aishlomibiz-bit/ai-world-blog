// Bidi + measured wrapping helpers for Hebrew OG cards.
// satori has no bidi support, so Hebrew text must be reordered per rendered line.
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import bidiFactory from "bidi-js";

const bidi = bidiFactory();
const hasHebrew = (t: string) => /[\u0590-\u05FF]/.test(t);

export function rtl(t: string): string {
  if (!hasHebrew(t)) return t;
  const levels = bidi.getEmbeddingLevels(t, "rtl");
  return bidi.getReorderedString(t, levels);
}

type FontDef = { name: string; data: ArrayBuffer; weight: number; style: string };

// Measures logical text width via an ink-probe render (satori paragraph, scan pixels).
// Shared across all OG renders in a build: widths depend only on text/size/bold,
// and every post's font subset covers its own text.
const sharedMeasureCache = new Map<string, number>();

export function makeMeasurer(fonts: FontDef[]) {
  const cache = sharedMeasureCache;
  return async function measure(
    text: string,
    fontSize: number,
    bold: boolean
  ): Promise<number> {
    const key = text + "|" + fontSize + "|" + bold;
    const hit = cache.get(key);
    if (hit !== undefined) return hit;
    const svg = await satori(
      {
        type: "p",
        props: {
          style: {
            fontSize,
            fontWeight: bold ? "bold" : "normal",
            whiteSpace: "nowrap",
          },
          children: text,
        },
      } as Parameters<typeof satori>[0],
      { width: 4000, height: fontSize * 3, embedFont: true, fonts }
    );
    const img = new Resvg(svg, { background: "white" }).render();
    const w = img.width;
    const h = img.height;
    const px = img.pixels;
    let minX = w;
    let maxX = -1;
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        if (px[i] < 200 || px[i + 1] < 200 || px[i + 2] < 200) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    const width = maxX < 0 ? 0 : maxX - minX + 1;
    cache.set(key, width);
    return width;
  };
}

// Wraps LOGICAL text to lines by measured width; caller reorders each line with rtl().
export async function wrapLogical(
  measure: (t: string, s: number, b: boolean) => Promise<number>,
  text: string,
  maxWidth: number,
  fontSize: number,
  bold = true
): Promise<string[]> {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const cand = cur ? cur + " " + w : w;
    if ((await measure(cand, fontSize, bold)) <= maxWidth || !cur) {
      cur = cand;
    } else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

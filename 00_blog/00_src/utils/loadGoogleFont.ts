const fullFontCache = new Map<string, Promise<ArrayBuffer>>();

async function loadGoogleFont(
  font: string,
  text: string,
  weight: number
): Promise<ArrayBuffer> {
  // Full (unsubsetted) font, cached per family+weight for the whole build.
  // text is accepted for API compatibility; subsetting per call was the old
  // behavior and caused a font fetch per OG image.
  const cacheKey = `${font}:${weight}`;
  const cached = fullFontCache.get(cacheKey);
  if (cached) return cached;
  const promise = fetchFullFont(font, weight);
  fullFontCache.set(cacheKey, promise);
  return promise;
}

async function fetchFullFont(
  font: string,
  weight: number
): Promise<ArrayBuffer> {
  // Constant coverage text: guarantees Hebrew + Latin glyphs in the subset,
  // while keeping one cached fetch per family+weight per build.
  const coverage =
    "אבגדהוזחטיכלמנסעפצקרשתםןץףך" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" +
    " .,;:!?()-–—'\"״׳/+%$&@#";
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(coverage)}`;

  const css = await (
    await fetch(API, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) throw new Error("Failed to download dynamic font");

  const res = await fetch(resource[1]);

  if (!res.ok) {
    throw new Error("Failed to download dynamic font. Status: " + res.status);
  }

  return res.arrayBuffer();
}

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "IBM Plex Mono",
      font: "IBM+Plex+Mono",
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      font: "IBM+Plex+Mono",
      weight: 700,
      style: "bold",
    },
    {
      name: "Heebo",
      font: "Heebo",
      weight: 400,
      style: "normal",
    },
    {
      name: "Heebo",
      font: "Heebo",
      weight: 700,
      style: "bold",
    },
  ];

  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, font, weight, style }) => {
      const data = await loadGoogleFont(font, text, weight);
      return { name, data, weight, style };
    })
  );

  return fonts;
}

export default loadGoogleFonts;

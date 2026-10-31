import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { rtl, makeMeasurer, wrapLogical } from "../ogBidi";
import { BRAND_BADGE, BRAND_FALLBACK_COVER, coverDataUri } from "../ogBrand";

// Option B split card: cover image on the left, navy brand panel on the right.
const PANEL_BG = "#0d1330";
const ACCENT = "#a5b4fc";
const AUTHOR_COLOR = "#c7d2fe";
const TITLE_MAX_W = 560;

export default async post => {
  const { title, author, ogImage } = post.data;
  const cover = ogImage ? coverDataUri(ogImage) : BRAND_FALLBACK_COVER();
  const badge = BRAND_BADGE();

  const fonts = await loadGoogleFonts(title + author + SITE.title + "by");
  const measure = makeMeasurer(fonts);

  // Adaptive title size: shrink until it fits within 4 lines.
  let size = 54;
  let lines = await wrapLogical(measure, title, TITLE_MAX_W, size, true);
  while (lines.length > 4 && size > 36) {
    size -= 4;
    lines = await wrapLogical(measure, title, TITLE_MAX_W, size, true);
  }

  const brandRow = {
    type: "div",
    props: {
      style: { display: "flex", alignItems: "center", gap: 12 },
      children: [
        {
          type: "img",
          props: {
            src: badge,
            width: 48,
            height: 48,
            style: { borderRadius: 24, border: "2px solid rgba(165,180,252,0.6)" },
          },
        },
        {
          type: "div",
          props: {
            style: { fontSize: 26, fontWeight: "bold", color: ACCENT },
            children: rtl(SITE.title),
          },
        },
      ],
    },
  };

  return satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          fontFamily: "Heebo, IBM Plex Mono",
        },
        children: [
          {
            type: "img",
            props: {
              src: cover,
              style: { width: 540, height: 630, objectFit: "cover" },
            },
          },
          {
            type: "div",
            props: {
              style: {
                width: 660,
                height: 630,
                backgroundColor: PANEL_BG,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "44px 48px",
              },
              children: [
                brandRow,
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 16,
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 2,
                          },
                          children: lines.slice(0, 5).map(l => ({
                            type: "div",
                            props: {
                              style: {
                                fontSize: size,
                                fontWeight: "bold",
                                color: "#ffffff",
                                lineHeight: 1.25,
                              },
                              children: rtl(l),
                            },
                          })),
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: { display: "flex", alignItems: "center", gap: 10 },
                          children: [
                            {
                              type: "div",
                              props: {
                                style: { fontSize: 22, color: AUTHOR_COLOR },
                                children: "by",
                              },
                            },
                            {
                              type: "div",
                              props: {
                                style: {
                                  fontSize: 22,
                                  color: AUTHOR_COLOR,
                                  fontWeight: "bold",
                                },
                                children: rtl(author),
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630, embedFont: true, fonts }
  );
};

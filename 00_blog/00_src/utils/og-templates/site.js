import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { rtl } from "../ogBidi";
import { BRAND_BADGE, BRAND_FALLBACK_COVER } from "../ogBrand";

const PANEL_BG = "#0d1330";
const ACCENT = "#a5b4fc";

export default async () => {
  const badge = BRAND_BADGE();
  const cover = BRAND_FALLBACK_COVER();
  const hostname = new URL(SITE.website).hostname;
  const fonts = await loadGoogleFonts(SITE.title + SITE.desc + hostname);

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
                {
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
                          style: {
                            borderRadius: 24,
                            border: "2px solid rgba(165,180,252,0.6)",
                          },
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
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 18,
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: { fontSize: 60, fontWeight: "bold", color: "#ffffff" },
                          children: rtl(SITE.title),
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: { fontSize: 28, color: "#c7d2fe", lineHeight: 1.4 },
                          children: rtl(SITE.desc),
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: { fontSize: 22, color: ACCENT },
                          children: hostname,
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

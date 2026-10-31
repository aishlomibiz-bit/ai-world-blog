import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { rtl, makeMeasurer, wrapLogical } from "../ogBidi";
import { BRAND_BADGE, SITE_COVER } from "../ogBrand";

// Home/default share card: same option B split design as the article cards.
// 540px owner art on the left, navy brand panel on the right with the badge,
// the site title large, the site description as subtitle, hostname at bottom.
const PANEL_BG = "#0d1330";
const ACCENT = "#a5b4fc";
const SUBTLE = "#c7d2fe";
const TEXT_MAX_W = 560;

export default async () => {
  const badge = BRAND_BADGE();
  const cover = SITE_COVER();
  const hostname = new URL(SITE.website).hostname;

  const fonts = await loadGoogleFonts(SITE.title + SITE.desc + hostname);
  const measure = makeMeasurer(fonts);

  // Title: shrink until it fits within 2 lines.
  let hSize = 58;
  let hLines = await wrapLogical(measure, SITE.title, TEXT_MAX_W, hSize, true);
  while (hLines.length > 2 && hSize > 46) {
    hSize -= 3;
    hLines = await wrapLogical(measure, SITE.title, TEXT_MAX_W, hSize, true);
  }

  // Description: up to 3 lines at a softer size.
  let sSize = 32;
  let sLines = await wrapLogical(measure, SITE.desc, TEXT_MAX_W, sSize, false);
  while (sLines.length > 3 && sSize > 26) {
    sSize -= 2;
    sLines = await wrapLogical(measure, SITE.desc, TEXT_MAX_W, sSize, false);
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

  const copyBlock = {
    type: "div",
    props: {
      style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 18 },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 },
            children: hLines.map(l => ({
              type: "div",
              props: {
                style: { fontSize: hSize, fontWeight: "bold", color: "#ffffff", lineHeight: 1.25 },
                children: rtl(l),
              },
            })),
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 },
            children: sLines.map(l => ({
              type: "div",
              props: {
                style: { fontSize: sSize, color: SUBTLE, lineHeight: 1.35 },
                children: rtl(l),
              },
            })),
          },
        },
      ].filter(b => b.props.children.length > 0),
    },
  };

  const hostRow = {
    type: "div",
    props: {
      style: { display: "flex", alignItems: "center", gap: 10 },
      children: [
        {
          type: "div",
          props: {
            style: { fontSize: 22, color: SUBTLE, fontWeight: "bold" },
            children: hostname,
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
            type: "div",
            props: {
              style: {
                width: 540,
                height: 630,
                display: "flex",
                flexShrink: 0,
                overflow: "hidden",
                backgroundColor: "#ffffff",
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: cover.uri,
                    width: 540,
                    height: 630,
                    style: { width: 540, height: 630, objectFit: cover.fit },
                  },
                },
              ],
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
              children: [brandRow, copyBlock, hostRow],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630, embedFont: true, fonts }
  );
};

import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";
import { rtl, makeMeasurer, wrapLogical } from "../ogBidi";
import { BRAND_BADGE, coverForPost } from "../ogBrand";
import OG_HEADLINES from "../../data/ogHeadlines";

// Option B split card: cover image on the left, navy brand panel on the right.
// Panel shows a concise authored headline + subtitle (not the full article title).
const PANEL_BG = "#0d1330";
const ACCENT = "#a5b4fc";
const SUBTLE = "#c7d2fe";
const AUTHOR_COLOR = "#c7d2fe";
const TEXT_MAX_W = 560;

async function optionBCard(post, cover) {
  const { title, author } = post.data;
  const copy = OG_HEADLINES[post.id] || { headline: title, subtitle: "" };
  const badge = BRAND_BADGE();

  const fonts = await loadGoogleFonts(
    copy.headline + copy.subtitle + author + SITE.title + "by"
  );
  const measure = makeMeasurer(fonts);

  // Adaptive headline size: shrink until it fits within 2 lines.
  let hSize = 58;
  let hLines = await wrapLogical(measure, copy.headline, TEXT_MAX_W, hSize, true);
  while (hLines.length > 2 && hSize > 46) {
    hSize -= 3;
    hLines = await wrapLogical(measure, copy.headline, TEXT_MAX_W, hSize, true);
  }

  // Subtitle: up to 3 lines at a softer size.
  let sSize = 32;
  let sLines = copy.subtitle
    ? await wrapLogical(measure, copy.subtitle, TEXT_MAX_W, sSize, false)
    : [];
  while (sLines.length > 3 && sSize > 26) {
    sSize -= 2;
    sLines = await wrapLogical(measure, copy.subtitle, TEXT_MAX_W, sSize, false);
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
            children: hLines.slice(0, 3).map(l => ({
              type: "div",
              props: {
                style: {
                  fontSize: hSize,
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
            style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 },
            children: sLines.slice(0, 3).map(l => ({
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

  const authorRow = {
    type: "div",
    props: {
      style: { display: "flex", alignItems: "center", gap: 10 },
      children: [
        {
          type: "div",
          props: { style: { fontSize: 22, color: AUTHOR_COLOR }, children: "by" },
        },
        {
          type: "div",
          props: {
            style: { fontSize: 22, color: AUTHOR_COLOR, fontWeight: "bold" },
            children: rtl(author),
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
              children: [brandRow, copyBlock, authorRow],
            },
          },
        ],
      },
    },
    { width: 1200, height: 630, embedFont: true, fonts }
  );
}

async function legacyTextCard(post) {
  return satori(
    {
      type: "div",
      props: {
        style: {
          background: "#fefbfb",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-1px",
                right: "-1px",
                border: "4px solid #000",
                background: "#ecebeb",
                opacity: "0.9",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2.5rem",
                width: "88%",
                height: "80%",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                border: "4px solid #000",
                background: "#fefbfb",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "20px",
                    width: "90%",
                    height: "90%",
                  },
                  children: [
                    {
                      type: "p",
                      props: {
                        style: {
                          fontSize: 72,
                          fontWeight: "bold",
                          maxHeight: "84%",
                          overflow: "hidden",
                        },
                        children: post.data.title,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginBottom: "8px",
                          fontSize: 28,
                        },
                        children: [
                          {
                            type: "span",
                            props: {
                              children: [
                                "by ",
                                {
                                  type: "span",
                                  props: {
                                    style: { color: "transparent" },
                                    children: '"',
                                  },
                                },
                                {
                                  type: "span",
                                  props: {
                                    style: {
                                      overflow: "hidden",
                                      fontWeight: "bold",
                                    },
                                    children: post.data.author,
                                  },
                                },
                              ],
                            },
                          },
                          {
                            type: "span",
                            props: {
                              style: { overflow: "hidden", fontWeight: "bold" },
                              children: SITE.title,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        post.data.title + post.data.author + SITE.title + "by"
      ),
    }
  );
};


// Posts with article art get the option B split card. Posts without any cover
// keep the pre-existing text card until the owner picks art for them.
export default async post => {
  const cover = coverForPost(post.id, post.data.ogImage);
  if (!cover) return legacyTextCard(post);
  return optionBCard(post, cover);
}

# Contract: 01_generator (Python Content Generation Engine)

> **Role:** Autonomous content synthesis pipeline using Claude 3.7, Firecrawl, and Image Generation.  
> **Mission:** Transform raw source URLs and Notion rows into 1,200+ word, high-value Hebrew articles.

---

## 📥 Inputs

### Working Inputs (Per Run)
- Candidate items from Notion database (`Status = "ready to publish"` or `"In progress"` or `"ממתין לתמונה"`)
- Local fallback queue: `01_generator/state/queue.yaml`
- Raw scraped content cache: `01_generator/.cache/scraped/`
- Products Catalog: `01_generator/src/products_catalog.json` (Gumroad store index)

### Reference Inputs (Stable)
- System voice & brand instructions: `01_generator/prompts/system_voice.md` & `03_docs/VISION_AND_STRATEGY.md`
- Hebrew Reviewer instructions: `01_generator/prompts/hebrew_reviewer.md` (Zero translationese, natural flow)
- Prompt templates: `01_generator/prompts/tutorial.md`, `comparison.md`, `tool_explainer.md`, `self_review.md`
- Generator config: `01_generator/config.yaml` and environment variables in `.env`

---

## ⚙️ Process

1. **Pull Candidate:** Extract top record from Notion queue or `state/queue.yaml`.
2. **Scrape Source:** Run Firecrawl scraper to extract clean markdown of the source reference (if URL present).
3. **Generate Content:** Run Claude 3.7 with `system_voice.md` and appropriate post template.
4. **Hebrew Language & Voice Review:** Apply `hebrew_reviewer.md` pass to eliminate translationese and enforce natural Israeli tech tone.
5. **Zero-Click Answer Block:** Inject a high-contrast, luminous card (40–70 words) with explicit text colors for dark/light mode compatibility.
6. **Hero Image Generation (Hybrid 3D + Typography):**
   - Generate a 16:9 cinematic 3D conceptual editorial illustration via `image-generator` or Gemini/Imagen 3 (avoid flat, repetitive Canva-like gradient templates).
   - Composite crisp Hebrew title, amber badge, and topic pills onto the 3D artwork via Playwright scrim.
   - Save to `00_blog/01_public/images/posts/<slug>.jpg`.
7. **Contextual Monetization CTA:** Match post topic to `products_catalog.json` (e.g., Free Prompt Book for prompting, Copilot guide for Excel, Google AI Pro deal for Gemini/context).
8. **Format & Write:** Save output to `00_blog/00_src/data/blog/YYYY-MM-DD-<slug>.md` with `draft: true`.
9. **State Tracking:** Record processed slug in `01_generator/state/processed.json` and sync Notion.

---

## 📤 Outputs

- Generated article Markdown file in `00_blog/00_src/data/blog/`.
- Generated 3D composited post image in `00_blog/01_public/images/posts/<slug>.jpg`.
- Updated status in Notion and `state/processed.json`.

---

## 🛡️ Checks & Gates

- [ ] **Draft Flag:** Must be saved as `draft: true` until explicit human review approves it.
- [ ] **Word Count:** 1,000–1,500 words of authentic Israeli Hebrew (no machine-translation awkwardness).
- [ ] **Image Verification:** Header image must exist physically on disk before finishing.
- [ ] **Autonomous Pre-Flight Review:** Inspect in browser via subagent, verify contrast/margins in both Light and Dark modes.
- [ ] **Monetization CTA:** Must contain an appropriate contextual CTA (matched from `products_catalog.json` or Google AI Pro deal).

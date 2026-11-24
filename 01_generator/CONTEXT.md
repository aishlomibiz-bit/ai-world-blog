# Contract: 01_generator (Python Content Generation Engine)

> **Role:** Autonomous content synthesis pipeline using Claude 3.7 and Firecrawl.  
> **Mission:** Transform raw source URLs and Notion rows into 1,200+ word, high-value Hebrew articles.

---

## 📥 Inputs

### Working Inputs (Per Run)
- Candidate items from Notion database (`Status = "ready to publish"` or `"In progress"`)
- Local fallback queue: `01_generator/state/queue.yaml`
- Raw scraped content cache: `01_generator/.cache/scraped/`

### Reference Inputs (Stable)
- System voice & brand instructions: `01_generator/prompts/system_voice.md` & `03_docs/VISION_AND_STRATEGY.md`
- Prompt templates: `01_generator/prompts/tutorial.md`, `comparison.md`, `tool_explainer.md`, `self_review.md`
- Generator config: `01_generator/config.yaml` and environment variables in `.env`

---

## ⚙️ Process

1. **Pull Candidate:** Extract top URL/record from Notion queue or `state/queue.yaml`.
2. **Scrape Source:** Run Firecrawl scraper to extract clean markdown of the source reference.
3. **Generate Content:** Run Claude 3.7 with `system_voice.md` and appropriate post template.
4. **Self-Review:** Execute `self_review.md` scoring prompt (quality threshold >= 7/10).
5. **Format & Write:** Save output to `00_blog/00_src/data/blog/YYYY-MM-DD-<slug>.md` with `draft: true`.
6. **State Tracking:** Record processed slug in `01_generator/state/processed.json`.

---

## 📤 Outputs

- Generated article Markdown file in `00_blog/00_src/data/blog/`.
- Generated post image saved to `00_blog/01_public/images/posts/<slug>.jpg`.
- Updated status in Notion and `state/processed.json`.

---

## 🛡️ Checks & Gates

- [ ] **Draft Flag:** Must be saved as `draft: true`.
- [ ] **Word Count:** 1,000–1,500 words of authentic Israeli Hebrew (no machine-translation awkwardness).
- [ ] **Image Verification:** Header image must exist physically on disk before finishing.
- [ ] **Autonomous Pre-Flight Review:** Inspect in browser, fix contrast/margins/truncation before presenting localhost preview.
- [ ] **Monetization CTA:** Must contain an appropriate CTA (Google AI Pro deal, consulting, or newsletter).

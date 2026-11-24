# PROJECT_MEMORY.md — Living Architecture & Session Log
> This file is the single source of truth for AI agents and developers across sessions.
> It prevents regressions, saves context tokens, and guarantees zero cold-starts.

---

## 🏛️ Living Source of Truth (Top Section ~20%)

### 1. Project Purpose & Scope
- **Core Mission**: "עולם ה-AI" (AI World Blog) — The premier Hebrew authority and monorepo on AI tools, prompt engineering, and autonomous agents.
- **Primary Live URLs**:
  - Production: `https://ai-world-blog.vercel.app/`
  - Local Preview: `http://localhost:4321` (or `4322` if port 4321 is in use)
  - Official WhatsApp Community: `https://chat.whatsapp.com/F1Y1Q35QIZ3L6rcrXuEnNN`
  - Notion Content Database ID: `33d927f0-e154-80ed-8e8a-d00e60e47fbb`

### 2. Core Tech Stack & Architecture
- **Framework**: Astro 5 (Static Output), Tailwind CSS, TypeScript (RTL Native Hebrew).
- **Architecture Pattern**: Interpretable Context Methodology (ICM). Numbered root folders serve as contracts:
  - `00_blog/`: Astro website, components, layouts, blog data.
  - `01_generator/`: Python generation engine, Claude 3.7 writing prompts, `products_catalog.json`.
  - `02_scripts/`: GSC indexing, Facebook sync, Notion pipeline runner, QA gates.
  - `03_docs/`: Strategy, vision, ADRs, and guides.
- **Key Integrations**:
  - Vercel (Root set to `00_blog`).
  - Notion API (`notion-client`).
  - Google Search Console API (Service account indexing).
  - Playwright (Headless visual capture & cover image compositing).
  - Gumroad Products Store (41 products catalog).

### 3. Non-Negotiable Rules & Lessons Learned
> Critical invariants that must NEVER be violated or regressed by future AI sessions.
1. **Never create `vercel.json` at root**: Vercel root directory is configured as `00_blog`. A root `vercel.json` breaks production builds.
2. **Draft-First Rule**: Every generated post must have `draft: true`. Only explicit human review (`ביקורת אנושית = true`) allows `draft: false`.
3. **Hero Image Standards (Hybrid 3D + Typography)**:
   - Avoid flat, repetitive Canva-style gradient templates.
   - Use `image-generator` or Imagen 3 to generate a rich 16:9 cinematic 3D conceptual scene.
   - Composite clean Hebrew typography, an amber badge, and topic pills on top via Playwright scrim.
   - Save physically to `00_blog/01_public/images/posts/<slug>.jpg`.
   - Frontmatter must always use `ogImage: z.string().optional()`. Never use Astro's `image()` helper.
4. **Zero-Click Answer Contrast Invariant**:
   - In luminous/bright summary cards, always set explicit dark colors on all `strong` elements (e.g. `<strong style="color: #0f172a; font-weight: 800;">`).
   - Otherwise, global dark-mode styles (`strong { color: var(--foreground); }`) will render bold text as invisible white-on-white text in Dark Mode.
5. **Component Heading Safety**:
   - In standalone callout components (like `WhatsAppCTA`), use `<div>` or `<p>` instead of `<h2>`.
   - Astro Paper's remark/rehype plugins automatically inject a `#` anchor link on all `<h2>` tags, which creates visual bugs inside interactive CTA boxes.
6. **Cross-Platform Dependency Invariant**:
   - Never commit platform-specific Windows binaries (e.g. `@rolldown/binding-win32-x64-msvc`) to `00_blog/package.json`.
   - Vercel runs on Linux x86_64; Windows-specific package entries will break production `npm install`.
7. **Community & CTA Routing**:
   - The official community channel is **WhatsApp** (`https://chat.whatsapp.com/F1Y1Q35QIZ3L6rcrXuEnNN`), not Telegram.
   - Route CTAs contextually using `00_blog/02_scripts/lib/products-catalog.json` (free lead magnets + paid guides) alongside the Google AI Pro deal.
8. **Autonomous Visual Pre-Flight Review**:
   - Always inspect the localhost preview using the browser subagent in **both Dark Mode and Light Mode** before presenting URLs to the user.

---

## 📜 Session History (Reverse Chronological)

### [2026-11-24] Session: Personal AI Handbook Post, Hybrid 3D Cover, WhatsApp CTA & Gumroad Catalog
- **Goal**: Process pending Notion post "Build your Personal AI Handbook", upgrade Zero-Click styling, replace Telegram with WhatsApp, integrate Gumroad product catalog, and deploy to production.
- **What Was Done**:
  - Fetched and synthesized article into authentic Israeli Hebrew (`2026-11-24-build-personal-ai-handbook-guide.md`).
  - Redesigned the Zero-Click Answer container into a luminous, bright card with dark-mode contrast protection.
  - Replaced `TelegramCTA` with `WhatsAppCTA.astro` featuring the official WhatsApp community link (`https://chat.whatsapp.com/F1Y1Q35QIZ3L6rcrXuEnNN`).
  - Ingested 41 products from Gumroad store CSV into structured `products-catalog.json` and enhanced `cta-manager.js`.
  - Added dual contextual product recommendation cards ("ספר הפרומפטים העולמי" + Google AI Pro deal).
  - Replaced repetitive Canva-style template cover image with a cinematic 3D conceptual editorial illustration composited with crisp Hebrew typography via Playwright.
  - Performed autonomous browser pre-flight visual review in both Dark and Light modes.
  - Passed quality gate with 0 errors, updated Notion status to `published`, verified full production build (175 pages), committed and pushed to `main` for Vercel deploy, and submitted sitemap/URL to Google Search Console.
- **Key Architectural Decisions & Gotchas**:
  - *Gotcha:* Dark Mode CSS inheritance turned `strong` tags inside the white inner callout into invisible white text. Fixed by adding explicit inline color styles (`#0f172a` and `#0369a1`).
  - *Gotcha:* Using `<h2>` inside `WhatsAppCTA.astro` caused Astro Paper to render an unwanted `#` anchor link. Fixed by using a styled `<div>`.
  - *Gotcha:* Interrupted npm install locked files; Windows-specific rolldown binding was kept out of `package.json` to protect Vercel Linux builds.
- **Files Modified / Created**:
  - `00_blog/00_src/data/blog/2026-11-24-build-personal-ai-handbook-guide.md`
  - `00_blog/01_public/images/posts/2026-11-24-build-personal-ai-handbook-guide.jpg`
  - `00_blog/00_src/components/WhatsAppCTA.astro`
  - `00_blog/00_src/layouts/PostDetails.astro`
  - `00_blog/02_scripts/lib/cta-manager.js`
  - `00_blog/02_scripts/lib/products-catalog.json`
  - `01_generator/src/products_catalog.json`
  - `00_blog/CONTEXT.md`, `01_generator/CONTEXT.md`, `02_scripts/CONTEXT.md`, `03_docs/VISION_AND_STRATEGY.md`
- **Next Steps & Pending Items**:
  - [ ] Apply `WhatsAppCTA.astro` to other pages (`AboutLayout.astro`, `index.astro`).
  - [ ] Process next pending post in Notion queue (`REA = Reverse Engineer Anything (in 9 minutes)`).

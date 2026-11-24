# Contract: 00_blog (Astro RTL Production Website)

> **Role:** Host the static production website, UI components, typography, and Markdown content articles.  
> **Framework:** Astro 5 + Tailwind CSS + TypeScript (RTL Native Hebrew).  
> **Production Target:** Vercel (`https://ai-world-blog.vercel.app`).  
> **Local Preview:** `http://localhost:4321` (or `4322` if port occupied).

---

## 📥 Inputs

### Working Inputs (Per Run)
- Markdown post files: `00_blog/00_src/data/blog/YYYY-MM-DD-<slug>.md`
- Post cover and inline images: `00_blog/01_public/images/posts/<slug>.jpg`

### Reference Inputs (Stable)
- Project Vision & CTAs: `03_docs/VISION_AND_STRATEGY.md`
- Layout & Component schemas: `00_blog/00_src/content.config.ts`
- Global Components:
  - `00_blog/00_src/components/WhatsAppCTA.astro` (Official WhatsApp Community CTA)
  - `00_blog/00_src/components/FreeGuidesCTA.astro` (Free lead magnet form)
- Product Catalog: `00_blog/02_scripts/lib/products-catalog.json`
- Package dependencies: `00_blog/package.json`

---

## ⚙️ Process

1. **Local Development / Preview:**
   ```powershell
   npm --prefix 00_blog run dev -- --port 4321
   ```
2. **Production Build Validation:**
   ```powershell
   npm --prefix 00_blog run build
   ```
3. **Deployment (Git Push):**
   ```powershell
   git add 00_blog/ 01_generator/
   git commit -m "feat(content): update posts and components"
   git push origin main
   ```

---

## 📤 Outputs

- Generated static website bundle in `00_blog/dist/`.
- Deployed live URL: `https://ai-world-blog.vercel.app/posts/<slug>/`.

---

## 🛡️ Checks & Gates

- [ ] **Build Check:** `npm --prefix 00_blog run build` completes with exit code 0 and 0 errors.
- [ ] **Image Parity Check:** Every post's `ogImage` exists physically in `00_blog/01_public/images/posts/`.
- [ ] **Zero-Click Answer Contrast:** Luminous cards must use explicit dark colors on `strong` elements (e.g. `style="color: #0f172a;"`) so dark-mode CSS doesn't render white-on-white text.
- [ ] **Heading Anchor Safety:** Interactive/callout components (like `WhatsAppCTA`) must use `<div>` instead of `<h2>` to avoid Astro Paper's automatic `#` anchor link injection.
- [ ] **Dependency Invariant:** Never commit platform-specific Windows binaries (e.g. `@rolldown/binding-win32-x64-msvc`) to `package.json`, as they break Linux/Vercel production deployments.
- [ ] **Community Invariant:** Primary community callout is WhatsApp (`https://chat.whatsapp.com/F1Y1Q35QIZ3L6rcrXuEnNN`), not Telegram.

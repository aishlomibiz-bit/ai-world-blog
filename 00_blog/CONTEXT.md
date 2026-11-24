# Contract: 00_blog (Astro RTL Production Website)

> **Role:** Host the static production website, UI components, typography, and Markdown content articles.  
> **Framework:** Astro 4 + Tailwind CSS + TypeScript (RTL Native Hebrew).  
> **Production Target:** Vercel (`https://ai-world-blog.vercel.app`).  
> **Local Preview:** `http://localhost:4321`.

---

## 📥 Inputs

### Working Inputs (Per Run)
- Markdown post files: `00_blog/00_src/data/blog/YYYY-MM-DD-<slug>.md`
- Post cover and inline images: `00_blog/01_public/images/posts/<slug>.jpg`

### Reference Inputs (Stable)
- Project Vision & CTAs: `03_docs/VISION_AND_STRATEGY.md`
- Layout & Component schemas: `00_blog/00_src/content/config.ts`
- Styling rules: `00_blog/00_src/styles/typography.css` & `global.css`
- Package dependencies: `00_blog/package.json`

---

## ⚙️ Process

1. **Local Development / Preview:**
   ```powershell
   cd 'c:\Users\Ronen\Documents\Projects\repos\Blog experimrement\00_blog'
   npx astro dev --port 4321
   ```
2. **Production Build Validation:**
   ```powershell
   cd 'c:\Users\Ronen\Documents\Projects\repos\Blog experimrement\00_blog'
   npm run build
   ```
3. **Deployment (Git Push):**
   ```powershell
   git add 00_blog/
   git commit -m "feat(blog): update content and assets"
   git push origin main
   ```

---

## 📤 Outputs

- Generated static website bundle in `00_blog/dist/`.
- Deployed live URL: `https://ai-world-blog.vercel.app/posts/<slug>/`.

---

## 🛡️ Checks & Gates

- [ ] **Build Check:** `npm run build` completes with exit code 0 and 0 errors.
- [ ] **Image Parity Check:** Every post's `ogImage` exists as a file in `00_blog/01_public/images/posts/`.
- [ ] **Schema Check:** Post frontmatter conforms to `config.ts` (`z.string()` for `ogImage`, NOT `image()`).
- [ ] **Contrast Check:** Code blocks and dark-mode elements adhere to high-contrast CSS standards.

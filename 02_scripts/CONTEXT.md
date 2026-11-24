# Contract: 02_scripts (Automation & SEO Utilities)

> **Role:** Operational tooling for Google Search Console indexing, Facebook social sync, Notion database integration, repeatable pipeline execution, and pre-commit QA.

---

## 📂 Sub-Tool Catalog

1. **`01_seo_and_gsc/`**:
   - `gsc_client.py`: GSC API client for sitemap submission, real-time URL inspection, and index requesting.
   - `capture_page.py` & `capture_github_views.py`: Visual capture utilities.
2. **`02_facebook_sync/`**:
   - `sync_all_fb_to_notion.py`: Validates and syncs shared Facebook posts to Notion database.
3. **`03_notion_tools/`**:
   - `run_pipeline.py`: Repeatable ICM pipeline runner for fetching pending posts, rendering cover images, running quality gates, and updating Notion.
   - `publish_notion_2_posts.py`: Pulls approved posts from Notion directly into blog markdown.
   - `sync_notion_2_posts.py`: Syncs metadata back to Notion table.
4. **`04_debug_and_tests/`**:
   - `quality_gate.py`: Pre-commit / pre-publish automated validation of blog markdown files against required fields (`title`, `description`, `pubDatetime`, `draft`, `ogImage`), image existence, and word counts.
   - `test_schemas.py` & `verify_cta_render.py`: Structured data & UI test scripts.
5. **`lib/` (in `00_blog/02_scripts/lib/`)**:
   - `cta-manager.js`: Dynamic CTA engine matching posts to `products-catalog.json` and Google AI Pro deal.
   - `products-catalog.json`: Structured index of Gumroad store products, free lead magnets, and playbooks.

---

## ⚙️ Key Operational Commands

```powershell
# Run GSC Sitemap Submission & Post Inspection
python 02_scripts/01_seo_and_gsc/gsc_client.py submit-post --url https://ai-world-blog.vercel.app/posts/<slug>/ --site https://ai-world-blog.vercel.app/

# Run Quality Gatekeeper Audit on Specific Post
python 02_scripts/04_debug_and_tests/quality_gate.py --file 00_blog/00_src/data/blog/YYYY-MM-DD-<slug>.md

# Check Pending Notion Posts
python 02_scripts/03_notion_tools/run_pipeline.py --list
```

---

## 🛡️ Checks & Gates

- [ ] All scripts must read secrets from `.env` or `06_config_and_credentials/` (never hardcode tokens).
- [ ] No raw tokens or credentials printed to stdout/stderr.
- [ ] Scripts return exit code 0 on success.
- [ ] Quality gate must pass with 0 errors before deployment.

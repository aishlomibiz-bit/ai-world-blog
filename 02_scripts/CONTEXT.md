# Contract: 02_scripts (Automation & SEO Utilities)

> **Role:** Operational tooling for Google Search Console indexing, Facebook social sync, Notion database integration, and pre-commit QA.

---

## 📂 Sub-Tool Catalog

1. **`01_seo_and_gsc/`**:
   - `gsc_client.py`: GSC API client for sitemap submission and real-time URL inspection.
   - `capture_page.py` & `capture_github_views.py`: Visual capture utilities.
2. **`02_facebook_sync/`**:
   - `sync_all_fb_to_notion.py`: Validates and syncs shared Facebook posts to Notion database.
3. **`03_notion_tools/`**:
   - `publish_notion_2_posts.py`: Pulls approved posts from Notion directly into blog markdown.
   - `sync_notion_2_posts.py`: Syncs metadata back to Notion table.
4. **`04_debug_and_tests/`**:
   - `quality_gate.py`: Pre-commit / pre-publish automated validation of all blog markdown files.
   - `test_schemas.py` & `verify_cta_render.py`: Structured data & UI test scripts.

---

## ⚙️ Key Operational Commands

```powershell
# Run GSC Sitemap Submission
& 'C:\Python313\python.exe' 02_scripts/01_seo_and_gsc/gsc_client.py sitemap --site https://ai-world-blog.vercel.app/

# Inspect & Request Indexing for Specific URL
& 'C:\Python313\python.exe' 02_scripts/01_seo_and_gsc/gsc_client.py inspect --url https://ai-world-blog.vercel.app/posts/<slug>/ --site https://ai-world-blog.vercel.app/

# Run Quality Gatekeeper Audit
& 'C:\Python313\python.exe' 02_scripts/04_debug_and_tests/quality_gate.py
```

---

## 🛡️ Checks & Gates

- [ ] All scripts must read secrets from `.env` or `06_config_and_credentials/gsc-credentials.json`.
- [ ] No raw tokens or credentials printed to stdout/stderr.
- [ ] Scripts return exit code 0 on success.

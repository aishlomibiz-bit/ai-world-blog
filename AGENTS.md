# עולם ה-AI (AI World Blog) — ICM Workspace Entry

> **Identity:** Monorepo for the premier Hebrew authority on AI tools and autonomous agents.
> **North Star Vision & Monetization:** [`03_docs/VISION_AND_STRATEGY.md`](03_docs/VISION_AND_STRATEGY.md)
> **Methodology:** Interpretable Context Methodology (ICM). Folder structure is the agent architecture.

---

## 🧭 Routing Table

| Task / Domain | Target Folder | Contract File | Key Capability |
| :--- | :--- | :--- | :--- |
| **Website & UI** | [`00_blog/`](00_blog/) | [`00_blog/CONTEXT.md`](00_blog/CONTEXT.md) | Astro RTL site, components, styles, blog posts |
| **Content Generation** | [`01_generator/`](01_generator/) | [`01_generator/CONTEXT.md`](01_generator/CONTEXT.md) | Python pipeline, Claude 3.7 writing, scraping |
| **Automation & SEO** | [`02_scripts/`](02_scripts/) | [`02_scripts/CONTEXT.md`](02_scripts/CONTEXT.md) | GSC indexing, Facebook sync, Notion API tools |
| **Knowledge & Guides** | [`03_docs/`](03_docs/) | [`03_docs/CONTEXT.md`](03_docs/CONTEXT.md) | Vision, voice guide, deployment lessons, ADRs |
| **Logs & State** | [`04_logs_and_outputs/`](04_logs_and_outputs/) | [`04_logs_and_outputs/CONTEXT.md`](04_logs_and_outputs/CONTEXT.md) | Session traces, scrape cache, assistant logs |
| **Operator Workspace** | [`05_ronen_workspace/`](05_ronen_workspace/) | [`05_ronen_workspace/CONTEXT.md`](05_ronen_workspace/CONTEXT.md) | Personal staging area (excluded from builds) |
| **Config & Credentials**| [`06_config_and_credentials/`](06_config_and_credentials/) | [`06_config_and_credentials/CONTEXT.md`](06_config_and_credentials/CONTEXT.md) | `.env` templates, GSC service keys (NEVER commit) |
| **Maintenance & Index** | [`07_system_and_maintenance/`](07_system_and_maintenance/) | [`07_system_and_maintenance/CONTEXT.md`](07_system_and_maintenance/CONTEXT.md) | Tree index, changelog, rollback tools |
| **AI Personas & CI/CD** | [`08_ai_and_ide_configs/`](08_ai_and_ide_configs/) | [`08_ai_and_ide_configs/CONTEXT.md`](08_ai_and_ide_configs/CONTEXT.md) | Agent skills, slash commands, GitHub Actions |

---

## ⚠️ Core Invariants (Read Before Acting)

1. **Never create `vercel.json` at the repo root.** Root dir is set to `00_blog` in Vercel. A root `vercel.json` breaks deployments.
2. **Draft-First Rule:** Every generated post must have `draft: true`. Only human review (`ביקורת אנושית = true`) allows `draft: false`.
3. **Blog Images Schema:** Images live in `00_blog/01_public/images/posts/<slug>.jpg`. Always schema `ogImage: z.string().optional()`. Never use Astro's `image()` helper for post frontmatter.
4. **Contract Discipline:** Every step reads its contract, executes its process, writes its output, and runs its check.
5. **Autonomous Visual Pre-Flight Review:** Before presenting any `localhost` URL to the human reviewer, the agent must inspect the page (e.g. via browser subagent), review visual contrast, layout, and image cropping/margins, and apply necessary styling fixes first.

# Contract: 03_docs (Factory Reference Shelf)

> **Role:** Authoritative knowledge base, vision and monetization strategy, brand guidelines, deployment post-mortems, and historical work plans.

---

## 📚 Shelf Organization

- **`VISION_AND_STRATEGY.md`**: Core project North Star, monetization offers, target audience, and brand pillars.
- **`CLAUDE.md`**: Comprehensive AI agent operational protocol and Vercel guardrails.
- **`guides/`**: Operational how-tos:
  - `voice-guide.md`: Writing tone, Hebrew language rules, Do's and Don'ts.
  - `deployment-lessons.md`: Post-mortem record of real deployment failures and solutions.
  - `notion-setup.md` & `setup-notion-statuses.md`: Database setup and status conventions.
  - `deployment-checklist.md`: Step-by-step production release gate.
- **`plans/`**: Strategic milestones, historical roadmaps, and `SEO_GROWTH_TRACKER.md`.
- **`ai_prompts/`**: Agent operating system definitions (`assistant.md`).

---

## 🛡️ Checks & Invariants

- [ ] Immutable factory documents: Never overwrite core guides without user confirmation.
- [ ] Relative links: All links inside documentation must resolve to existing files.
- [ ] Single source of truth: Architectural rules live here, referenced via pointers in `AGENTS.md`.

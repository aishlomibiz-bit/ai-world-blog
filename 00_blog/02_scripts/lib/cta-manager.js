/**
 * Dynamic Monetization & Products CTA Manager.
 * Injects high-converting Hebrew CTAs based on post context, tags, Jev evaluation, and product index.
 * Matches free lead magnets, paid playbooks, and subscription deals.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.join(__dirname, "products-catalog.json");

let PRODUCTS_CATALOG = [];
try {
  if (fs.existsSync(CATALOG_PATH)) {
    PRODUCTS_CATALOG = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8"));
  }
} catch (e) {
  console.warn("Could not load products-catalog.json, using defaults.");
}

export const CTA_TEMPLATES = {
  // 1. Google AI Pro Discount Deal
  google_ai_pro: {
    id: "google_ai_pro",
    title: "⚡ מבצע בלעדי: מנוי Google AI Pro (Gemini Advanced) בהנחה משמעותית",
    body: "שדרגו את יכולות ה-AI שלכם עם מנוי Google AI Pro במחיר מוזל במיוחד — גישה ישירה למודלי Gemini המתקדמים ביותר, חלון הקשר ענק וכלי מחקר מתקדמים ללא הגבלה.",
    buttonText: "לרכישת מנוי Google AI Pro בהנחה מיוחדת ←",
    buttonUrl: "https://google-ai-pro-drab.vercel.app/",
    badge: "הטבה בלעדית לקוראי עולם ה-AI",
    type: "deal",
  },

  // 2. The Interactive Book of Prompting (Free 415-page Lead Magnet)
  "interactive-book-of-prompting": {
    id: "interactive-book-of-prompting",
    title: "📖 ספר הפרומפטים העולמי — 415 עמודים של הנדסת AI מעשית",
    body: "מדריך עב-כרס ומקיף ביותר המכסה הכל: יסודות פרומפטים מאפס ועד רמת Advanced, שרשראות חשיבה (Chain-of-Thought), הפקת פלטי JSON מובנים ובניית סוכני AI ללא תקלות.",
    buttonText: "להורדת ספר הפרומפטים המלא בחינם (₪0) ←",
    buttonUrl: "https://ronenamos.gumroad.com/l/interactive-book-of-prompting",
    badge: "משאב כניסה חינמי • 415 עמודים להורדה",
    type: "lead_magnet",
  },

  // 3. 25 Gemini Skills & Guide (Free Lead Magnet)
  "25-gemini-skills": {
    id: "25-gemini-skills",
    title: "🤖 25 Gemini Skills & Guide — ספריית מיומנויות מוכנות",
    body: "מדריך שלב-אחר-שלב לבניית סקילים (Skills) ב-Google Gemini + ספרייה של 25 מיומנויות מוכנות להעתקה והדבקה לניצול מיטבי של חלון ההקשר העצום.",
    buttonText: "להורדת ספריית ה-Skills בחינם (₪0) ←",
    buttonUrl: "https://ronenamos.gumroad.com/l/25-gemini-skills",
    badge: "משאב חינמי • 25 סקילים מוכנים",
    type: "lead_magnet",
  },

  // 4. Claude Code Guide (Paid ₪59)
  "claude-code-guide": {
    id: "claude-code-guide",
    title: "💻 המדריך המלא והמעשי ל-Claude Code בעברית",
    body: "המדריך המקיף לשימוש בסוכן הקוד הרשמי של Anthropic מהטרמינל: התקנה, ניסוח קובץ CLAUDE.md מושלם, חיבור שרתי MCP, וסקריפטים לאוטומציה מהירה.",
    buttonText: "לרכישת המדריך המלא ל-Claude Code (₪59) ←",
    buttonUrl: "https://ronenamos.gumroad.com/l/claude-code-guide",
    badge: "מדריך מעשי + תבניות קוד",
    type: "paid_guide",
  },

  // 5. 50 Copilot Prompts (Free Lead Magnet)
  "50-copilot": {
    id: "50-copilot",
    title: "📊 50 הנחיות Copilot לפיננסים ולאופיס",
    body: "בנק של 50 פרומפטים מוכנים ל-Excel, PowerPoint, Word, Outlook ו-Teams שהופכים את Copilot מעוזר בסיסי למנוע עבודה אמיתי בארגון.",
    buttonText: "להורדת 50 הנחיות Copilot בחינם (₪0) ←",
    buttonUrl: "https://ronenamos.gumroad.com/l/50-copilot",
    badge: "בנק 50 פרומפטים מוכנים להורדה חינם",
    type: "lead_magnet",
  },

  // 6. Audit AI Junior Analyst (Free Lead Magnet)
  "audit-ai-junior-analyst": {
    id: "audit-ai-junior-analyst",
    title: "🕵️‍♂️ לבדוק AI כמו שבודקים אנליסט ג'וניור — צ'קליסט בקרת איכות",
    body: "אל תסמכו עיוור על פלטי AI: פרוטוקול מעשי לבדיקת עקרון 4 העיניים, איתור הזיות מספריות וחישובים מומצאים, ובדיקות סבירות מתמטיות מהירות.",
    buttonText: "להורדת צ'קליסט הבקרה בחינם (₪0) ←",
    buttonUrl: "https://ronenamos.gumroad.com/l/audit-ai-junior-analyst",
    badge: "צ'קליסט מעשי להורדה מיידית",
    type: "lead_magnet",
  },

  // 7. Vibe Engineering (Paid ₪39)
  "vibe-engineering-he": {
    id: "vibe-engineering-he",
    title: "🧱 47 בלוקים להנדסת Vibe: אבני בניין לאפליקציות AI",
    body: "המעבר מ-Vibe Coding חובבני למערכות Production יציבות ועמידות: 47 תבניות מודולריות לניהול קונטקסט, Caching, סטרימינג ו-Tools.",
    buttonText: "לרכישת ספר בלוקי הנדסת Vibe (₪39) ←",
    buttonUrl: "https://ronenamos.gumroad.com/l/vibe-engineering-he",
    badge: "ספר ארכיטקטורה דיגיטלי",
    type: "paid_guide",
  },

  // 8. AI Agents Finance (Paid ₪69)
  "ai-agents-finance-he": {
    id: "ai-agents-finance-he",
    title: "🤖 המדריך לבניית סוכני AI מעשיים",
    body: "שלושה תהליכי עבודה מלאים, צעד אחר צעד, עם Claude, Copilot ו-ChatGPT לבניית סוכנים אוטונומיים עם Guardrails ובדיקות שלמות.",
    buttonText: "לרכישת המדריך לבניית סוכנים (₪69) ←",
    buttonUrl: "https://ronenamos.gumroad.com/l/ai-agents-finance-he",
    badge: "מדריך הנדסי מקיף",
    type: "paid_guide",
  },

  // 9. Business Consulting
  consulting: {
    id: "consulting",
    title: "💼 צריכים ליווי והטמעת AI בארגון או בעסק?",
    body: "צוות עולם ה-AI מלווה חברות ועסקים באפיון, הטמעת סוכני בינה מלאכותית ואוטומציה מתקדמת לחיסכון של עשרות שעות עבודה בחודש.",
    buttonText: "לתיאום שיחת ייעוץ אסטרטגית לעסקים ←",
    buttonUrl: "/about",
    badge: "ייעוץ ואוטומציה לחברות ועסקים",
    type: "service",
  },
};

/**
 * Matches the optimal contextual product CTA based on post tags, title, and body keywords.
 */
export function matchContextualCta(context = {}) {
  const { title = "", tags = [], body = "", recommendedCta } = context;

  if (recommendedCta && CTA_TEMPLATES[recommendedCta]) {
    return recommendedCta;
  }

  const fullText = `${title} ${tags.join(" ")} ${body.slice(0, 1500)}`.toLowerCase();

  // 1. Prompts, Handbooks, Context, Writing -> The Interactive Book of Prompting
  if (
    fullText.includes("handbook") ||
    fullText.includes("ספר הדרכה") ||
    fullText.includes("פרומפט") ||
    fullText.includes("פרומפטים") ||
    fullText.includes("prompt") ||
    fullText.includes("few-shot") ||
    fullText.includes("כתיבה")
  ) {
    return "interactive-book-of-prompting";
  }

  // 2. Claude Code, Terminal, CLI, MCP -> Claude Code Guide
  if (
    fullText.includes("claude code") ||
    fullText.includes("קלוד קוד") ||
    fullText.includes("terminal") ||
    fullText.includes("טרמינל") ||
    fullText.includes("claude.md") ||
    fullText.includes("mcp")
  ) {
    return "claude-code-guide";
  }

  // 3. Gemini, Skills, Google AI -> 25 Gemini Skills or Google AI Pro
  if (fullText.includes("skills") || fullText.includes("סקילים") || fullText.includes("gemini skills")) {
    return "25-gemini-skills";
  }

  // 4. Copilot, Excel -> 50 Copilot Prompts
  if (fullText.includes("copilot") || fullText.includes("קופיילוט") || fullText.includes("excel") || fullText.includes("אקסל")) {
    return "50-copilot";
  }

  // 5. Vibe Coding, Full Stack -> Vibe Engineering Blocks
  if (fullText.includes("vibe") || fullText.includes("vibe coding")) {
    return "vibe-engineering-he";
  }

  // 6. Autonomous Agents -> AI Agents Guide
  if (fullText.includes("agent") || fullText.includes("סוכן") || fullText.includes("סוכנים") || fullText.includes("n8n")) {
    return "ai-agents-finance-he";
  }

  // 7. Audit, Hallucinations, Sanity Check -> Audit AI Junior Analyst
  if (fullText.includes("audit") || fullText.includes("ביקורת") || fullText.includes("הזיות") || fullText.includes("אימות")) {
    return "audit-ai-junior-analyst";
  }

  // Default fallback: Google AI Pro deal (heavily discounted high-converting deal)
  return "google_ai_pro";
}

/**
 * Builds a styled HTML Card for a given CTA template.
 */
export function buildHtmlCtaCard(ctaKey = "google_ai_pro") {
  const cta = CTA_TEMPLATES[ctaKey] || CTA_TEMPLATES["google_ai_pro"];

  const isFree = cta.buttonText.includes("חינם") || cta.badge.includes("חינם");
  const badgeGradient = isFree
    ? "background: linear-gradient(135deg, #10b981, #059669); color: #ffffff;"
    : "background: linear-gradient(135deg, #f59e0b, #d97706); color: #020617;";

  const btnBg = isFree ? "#059669" : "#6366f1";

  return `
<div style="background: linear-gradient(135deg, rgba(30, 27, 75, 0.75) 0%, rgba(15, 23, 42, 0.95) 100%); border: 1px solid rgba(99, 102, 241, 0.35); border-radius: 16px; padding: 2rem; margin: 2rem 0; box-shadow: 0 12px 30px -5px rgba(0, 0, 0, 0.35);">
  <div style="display: inline-block; ${badgeGradient} font-weight: 800; font-size: 0.85rem; padding: 0.3rem 0.95rem; border-radius: 9999px; margin-bottom: 1rem;">${cta.badge}</div>
  <h3 style="margin: 0 0 0.8rem 0; font-size: 1.35rem; color: #ffffff; font-weight: 800;">${cta.title}</h3>
  <p style="color: #cbd5e1; font-size: 1rem; line-height: 1.6; margin: 0 0 1.5rem 0;">
    ${cta.body}
  </p>
  <a href="${cta.buttonUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: ${btnBg}; color: #ffffff; font-weight: 700; padding: 0.8rem 1.6rem; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3); transition: transform 0.2s;">
    <span>${cta.buttonText}</span>
    <span style="font-size: 1.1rem;">←</span>
  </a>
</div>
`;
}

/**
 * Resolves the optimal CTA key from a Jev evaluation object (backward-compatible helper).
 */
export function resolveCtaType(jevEval = {}, context = {}) {
  const { recommendedCta, targetAudience, suggestedPostType, commercialIntent } = jevEval;

  if (recommendedCta && CTA_TEMPLATES[recommendedCta]) {
    return recommendedCta;
  }

  const matched = matchContextualCta({ ...context, recommendedCta });
  if (matched && matched !== "google_ai_pro") {
    return matched;
  }

  if (
    targetAudience === "business_owners" ||
    targetAudience === "finance" ||
    commercialIntent === "high" ||
    suggestedPostType === "use_case"
  ) {
    return "consulting";
  }

  return "google_ai_pro";
}

/**
 * Builds a styled Hebrew CTA block in Markdown format (backward-compatible helper).
 */
export function buildCtaBlock(ctaType = "google_ai_pro") {
  const resolvedKey = CTA_TEMPLATES[ctaType] ? ctaType : "google_ai_pro";
  return `\n\n---\n${buildHtmlCtaCard(resolvedKey)}`;
}

/**
 * Injects the dynamic CTA block into post markdown content.
 */
export function injectDynamicCta(content, jevEval = {}, context = {}) {
  if (!content) return "";
  const ctaType = resolveCtaType(jevEval, { ...context, body: content });
  return content.trim() + buildCtaBlock(ctaType);
}

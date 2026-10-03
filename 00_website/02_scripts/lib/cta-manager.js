/**
 * Dynamic Monetization CTA Manager.
 * Injects high-converting Hebrew CTAs based on Jev evaluation, audience persona, and commercial intent.
 * Note: "google_ai_pro" is a heavily discounted subscription deal for Google AI Pro / Gemini Advanced.
 */

export const CTA_TEMPLATES = {
  google_ai_pro: {
    id: "google_ai_pro",
    title: "⚡ מבצע בלעדי: מנוי Google AI Pro (Gemini Advanced) בהנחה משמעותית",
    body: "שדרגו את יכולות ה-AI שלכם עם מנוי Google AI Pro במחיר מוזל במיוחד — גישה ישירה למודלי Gemini המתקדמים ביותר, חלון הקשר ענק וכלי מחקר מתקדמים ללא הגבלה.",
    buttonText: "לרכישת מנוי Google AI Pro בהנחה מיוחדת ←",
    buttonUrl: "https://google-ai-pro-drab.vercel.app/",
    badge: "הטבה בלעדית לקוראי עולם ה-AI",
  },
  consulting: {
    id: "consulting",
    title: "💼 צריכים ליווי והטמעת AI בארגון או בעסק?",
    body: "צוות עולם ה-AI מלווה חברות ועסקים באפיון, הטמעת סוכני בינה מלאכותית ואוטומציה מתקדמת לחיסכון של עשרות שעות עבודה בחודש.",
    buttonText: "לתיאום שיחת ייעוץ אסטרטגית לעסקים ←",
    buttonUrl: "/about",
    badge: "ייעוץ ואוטומציה לחברות ועסקים",
  },
  tools: {
    id: "tools",
    title: "🛠️ ארגז הכלים המלא למפתחים ויוצרים",
    body: "קבלו גישה למאגר הפרומפטים, הסקריפטים וסוכני ה-AI המובילים שאנחנו משתמשים בהם ביום-יום לייעול תהליכי עבודה ופיתוח.",
    buttonText: "לכל המדריכים וארגז הכלים הטכנולוגי ←",
    buttonUrl: "/tags/ai",
    badge: "סביבת עבודה וכלים למפתחים",
  },
  newsletter: {
    id: "newsletter",
    title: "📬 הישארו מעודכנים לפני כולם בעולם ה-AI",
    body: "הצטרפו למאות מקצוענים שמקבלים מדי שבוע סקירות עומק, כלים חדשים וניתוחים מעשיים ישירות למייל.",
    buttonText: "להרשמה לניוזלטר השבועי ←",
    buttonUrl: "#newsletter",
    badge: "עדכונים שבועיים בלעדיים",
  },
};

/**
 * Determines the most profitable and relevant CTA based on Jev evaluation.
 */
export function resolveCtaType(jevEval = {}) {
  const { recommendedCta, targetAudience, suggestedPostType, commercialIntent } = jevEval;

  // Direct template match
  if (recommendedCta && CTA_TEMPLATES[recommendedCta]) {
    return recommendedCta;
  }

  // Google AI Pro deal for tool guides, beginners, and productivity topics
  if (
    recommendedCta === "google_ai_pro_deal" ||
    recommendedCta === "google_ai_pro" ||
    suggestedPostType === "tutorial" ||
    targetAudience === "beginners" ||
    targetAudience === "creators"
  ) {
    return "google_ai_pro";
  }

  // Business & Corporate Automations -> Business Consulting
  if (
    targetAudience === "business_owners" ||
    targetAudience === "finance" ||
    commercialIntent === "high" ||
    suggestedPostType === "use_case"
  ) {
    return "consulting";
  }

  // Developers & Technical Tool Comparisons -> Tools ecosystem
  if (targetAudience === "developers" || suggestedPostType === "comparison" || suggestedPostType === "tool_explainer") {
    return "tools";
  }

  return "newsletter";
}

/**
 * Builds a styled Hebrew CTA block in Markdown format.
 */
export function buildCtaBlock(ctaType = "google_ai_pro") {
  const resolvedKey = CTA_TEMPLATES[ctaType] ? ctaType : "google_ai_pro";
  const cta = CTA_TEMPLATES[resolvedKey];

  return `\n\n---

> ### ${cta.title}
> **${cta.badge}**
> 
> ${cta.body}
> 
> 👉 **[${cta.buttonText}](${cta.buttonUrl})**
`;
}

/**
 * Injects the dynamic CTA block into post markdown content.
 */
export function injectDynamicCta(content, jevEval) {
  if (!content) return "";
  const ctaType = resolveCtaType(jevEval);
  const ctaBlock = buildCtaBlock(ctaType);
  return content.trim() + ctaBlock;
}

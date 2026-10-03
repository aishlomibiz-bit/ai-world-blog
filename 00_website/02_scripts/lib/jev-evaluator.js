import "dotenv/config";

/**
 * Jev System-1 Pre-Flight Evaluation & Triage Module (Phases 1, 2, 3)
 * Evaluates candidate quality, auto-tags categories, selects optimal CTA & audience in <300ms.
 */

const VERCEL_AI_GATEWAY_URL = "https://gateway.ai.vercel.com/v1/chat/completions";
const JEV_MODEL = process.env.AI_MODEL || "typesafe-ai/jev";

const CATEGORY_MAP = {
  tutorial: ["מדריכים", "בינה מלאכותית"],
  comparison: ["השוואות כלים", "בינה מלאכותית"],
  tool_explainer: ["כלי AI", "סקירות"],
  use_case: ["עסקים ואוטומציה", "פרודוקטיביות"],
  news_analysis: ["חדשות AI", "טכנולוגיה"],
};

export async function evaluateStoryWithJev({ name, prompt, urlSource, scrapedContent }) {
  const apiKey = process.env.AI_GATEWAY_API_KEY;

  if (!apiKey) {
    console.log("   ⚠️ AI_GATEWAY_API_KEY not configured. Skipping Jev pre-flight gate.");
    return {
      passed: true,
      qualityScore: 8,
      isRelevant: true,
      categories: ["בינה מלאכותית", "מדריכים"],
      targetAudience: "creators",
      suggestedPostType: "tool_explainer",
      commercialIntent: "medium",
      recommendedCta: "google_ai_pro",
      confidence: 0.9,
      summaryReason: "Pre-flight skipped (gateway key not set)",
    };
  }

  const payload = {
    name: name || "",
    prompt: prompt || "",
    url: urlSource || "",
    excerpt: scrapedContent ? scrapedContent.slice(0, 1500) : "",
  };

  const systemInstruction = `You are Jev, a high-speed System-1 triage and decision engine for "עולם ה-AI" (AI World Blog, Israel).
Your task is to rapidly evaluate raw content candidates, assign categories, and select high-converting monetization targets.

Evaluate the content according to:
- qualityScore: 1-10 integer score.
- isRelevant: boolean (true if relevant to AI tools, workflow automation, modern tech & productivity).
- categories: array of 1-3 Hebrew category tags (e.g. ["מדריכים", "כלי AI", "עסקים ואוטומציה", "פיתוח"]).
- targetAudience: one of ["beginners", "developers", "business_owners", "creators"].
- suggestedPostType: one of ["tutorial", "comparison", "tool_explainer", "use_case", "news_analysis"].
- commercialIntent: one of ["low", "medium", "high"].
- recommendedCta: one of ["google_ai_pro", "consulting", "tools", "newsletter"].
- confidence: float between 0.0 and 1.0.
- summaryReason: 1 sentence in Hebrew explaining the evaluation.

Note on CTAs:
- "google_ai_pro": Exclusive heavily discounted subscription deal for Google AI Pro / Gemini Advanced (Best for beginners, creators, general AI tool guides).
- "consulting": B2B / Enterprise AI integration & business workflow automation consulting.
- "tools": Developer tool stacks, scripts, API setups.
- "newsletter": AI news & weekly digest.

Respond STRICTLY with valid JSON matching this schema:
{
  "qualityScore": number,
  "isRelevant": boolean,
  "categories": string[],
  "targetAudience": string,
  "suggestedPostType": string,
  "commercialIntent": string,
  "recommendedCta": string,
  "confidence": number,
  "summaryReason": string
}`;

  try {
    const startTime = Date.now();
    const response = await fetch(VERCEL_AI_GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: JEV_MODEL,
        temperature: 0,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: `Evaluate this content candidate:\n${JSON.stringify(payload)}` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`   ⚠️ Jev Gateway status ${response.status}: ${errText.slice(0, 150)}`);
      return getFallbackEvaluation(payload);
    }

    const data = await response.json();
    const durationMs = Date.now() - startTime;
    const content = data.choices?.[0]?.message?.content;

    let parsed = {};
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.warn("   ⚠️ Could not parse Jev output JSON directly, using defaults");
    }

    const qualityScore = typeof parsed.qualityScore === "number" ? parsed.qualityScore : 7;
    const isRelevant = parsed.isRelevant !== false;
    const passed = qualityScore >= 6 && isRelevant;

    return {
      passed,
      qualityScore,
      isRelevant,
      categories: parsed.categories || CATEGORY_MAP[parsed.suggestedPostType] || ["בינה מלאכותית"],
      targetAudience: parsed.targetAudience || "creators",
      suggestedPostType: parsed.suggestedPostType || "tool_explainer",
      commercialIntent: parsed.commercialIntent || "medium",
      recommendedCta: parsed.recommendedCta || "google_ai_pro",
      confidence: parsed.confidence || 0.9,
      summaryReason: parsed.summaryReason || "הערכה והקצאת קטגוריות הושלמו בהצלחה",
      durationMs,
    };
  } catch (error) {
    console.error(`   ⚠️ Jev evaluation error: ${error.message}. Using intelligent fallback.`);
    return getFallbackEvaluation(payload);
  }
}

function getFallbackEvaluation(payload) {
  const text = `${payload.name} ${payload.prompt} ${payload.url}`.toLowerCase();

  // Filter out low quality / spam / irrelevant content
  if (
    text.includes("עוקבים") ||
    text.includes("מזויף") ||
    text.includes("followers") ||
    text.includes("קזינו") ||
    text.includes("הנחה מיוחדת") ||
    text.length < 15
  ) {
    return {
      passed: false,
      qualityScore: 3,
      isRelevant: false,
      categories: ["ספאם"],
      targetAudience: "beginners",
      suggestedPostType: "news_analysis",
      commercialIntent: "low",
      recommendedCta: "newsletter",
      confidence: 0.95,
      summaryReason: "נדחה: זוהה תוכן לא רלוונטי או ספאם",
    };
  }

  let suggestedPostType = "tool_explainer";
  let targetAudience = "creators";
  let recommendedCta = "google_ai_pro";
  let categories = ["בינה מלאכותית"];

  if (text.includes("מדריך") || text.includes("איך") || text.includes("how to")) {
    suggestedPostType = "tutorial";
    categories = ["מדריכים", "בינה מלאכותית"];
    recommendedCta = "google_ai_pro";
  } else if (text.includes("השווא") || text.includes("vs") || text.includes("הבדל")) {
    suggestedPostType = "comparison";
    categories = ["השוואות כלים", "בינה מלאכותית"];
  } else if (text.includes("עסקים") || text.includes("חברה") || text.includes("ארגון") || text.includes("אוטומציה עסקית")) {
    suggestedPostType = "use_case";
    targetAudience = "business_owners";
    recommendedCta = "consulting";
    categories = ["עסקים ואוטומציה"];
  } else if (text.includes("קוד") || text.includes("code") || text.includes("מתכנת") || text.includes("api")) {
    targetAudience = "developers";
    recommendedCta = "tools";
    categories = ["פיתוח", "בינה מלאכותית"];
  }

  return {
    passed: true,
    qualityScore: 8,
    isRelevant: true,
    categories,
    targetAudience,
    suggestedPostType,
    commercialIntent: "high",
    recommendedCta,
    confidence: 0.88,
    summaryReason: "הערכה אוטומטית לפי מילות מפתח ותחום עיסוק",
  };
}

---
title: "איך להגדיר את Claude מאפס: המדריך המלא לחשבון מושלם, סקילים ואינטגרציות"
description: "המדריך המעשי והפשוט ביותר להגדרת חשבון Claude חדש: פקודת הקסם המובנית /setup, מעבר לחשבון Team, כיול Opus 5.5, הגדרות זיכרון ופרטיות, חיבור אפליקציות והתקנת סקילים מוכנים."
pubDatetime: 2026-10-03T14:00:00+03:00
author: רואה חשבון רונן עמוס
tags:
  - Claude
  - פרודוקטיביות
  - מדריכים
  - כלי AI
  - אוטומציה
  - Claude Code
featured: true
draft: false
ogImage: /images/posts/claude-setup-hero.jpg
faqs:
  - question: "מהי פקודת /setup ב-Claude וכיצד היא עובדת?"
    answer: "צוות הפיתוח של Anthropic הטמיע סקיל מובנה ב-Claude בשם /setup. כאשר מקלידים /setup בחלון שיחה חדש, המודל פותח בתהליך Onboarding אינטראקטיבי שלב-אחר-שלב המותאם אישית לחשבון חדש."
  - question: "למה עדיף לפתוח חשבון Team במקום חשבון אישי (Pro/Free)?"
    answer: "חשבון Team מספק רמת אבטחה ופרטיות עסקית גבוהה: ברירת המחדל שלו מונעת אימון מודלים על השיחות שלכם, מאפשרת ניהול מרוכז של Connectors לארגון כולו, מעניקה גישה ל-Opus 5.5 עם מכסות שימוש גבוהות יותר וזיכרון ארגוני משותף."
  - question: "מה ההבדל בין רמות המאמץ (Effort Levels) ב-Opus 5.5 ומתי להשתמש ב-High?"
    answer: "רמת המאמץ (Effort) קובעת כמה 'זמן חשיבה' ומעברי ניתוח Claude משקיע לפני מתן תשובה. ברירת המחדל היא Medium (מתאימה לכ-80% מהמשימות השוטפות). רמת High מומלצת למשימות קריטיות עם ניסיון יחיד, כגון הצעות מחיר, מכתב ללקוח אסטרטגי או ניתוח פיננסי מעמיק."
  - question: "האם לחיצה על כפתורי ה-Thumbs Up/Down שולחת מידע ל-Anthropic?"
    answer: "כן! בחשבונות Team המידע שלכם אינו משמש לאימון כברירת מחדל, למעט לחיצה על אייקון דירוג (Thumbs Up/Down). לחיצה על האייקון משגרת את כל היסטוריית אותה שיחה לשרתי Anthropic שבה היא נשמרת עד 5 שנים ועשויה לשמש לאימון."
  - question: "מהם Claude Skills ואיך מתקינים אותם בחשבון?"
    answer: "Skills הם קובצי הנחיות-על מוכנים מראש המלמדים את Claude כיצד לבצע משימות ספציפיות בדיוק מירבי. ניתן להוריד אלפי סקילים מותאמים (כמו Grill-Me או Ship It) ולהתקין אותם ישירות דרך תפריט Customize &larr; Skills &larr; Create skill &larr; Upload a skill."
---

בלי הקדמות מיותרות ובלי תיאוריות ארוכות – ניגש ישירות לפרקטיקה. בין אם פתחתם זה עתה חשבון Claude חדש ובין אם אתם רוצים לוודא שהחשבון הקיים שלכם מוגדר בשיא העוצמה, המדריך הזה ייקח אתכם צעד-אחר-צעד בהגדרות החיוניות ביותר.

החל מפקודת הקסם המובנית שאף אחד לא מדבר עליה, דרך כיול מודל העל **Opus 5.5**, הגדרות פרטיות קריטיות (כולל מתג אחד שאסור לגעת בו), חיבור אינטגרציות בלחיצה אחת, ועד הורדת ספריית סקילים ענקית לשדרוג התפוקה היומית.

<div class="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-amber-500/10 p-7 my-8 shadow-xl">
<div class="flex items-center gap-3 mb-4">
  <span class="p-2 rounded-xl bg-indigo-500 text-white font-bold text-base shadow-md">⚡ תמצית מנהלים</span>
  <h3 class="text-xl font-bold text-foreground m-0">7 הצעדים להגדרת חשבון Claude מושלם</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
<div class="border-b md:border-b-0 md:border-l border-border/80 pb-4 md:pb-0 md:pl-6">
<div class="font-bold text-indigo-400 mb-1.5 flex items-center gap-1.5">
  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
  1. הגדרה מודרכת ופקודות
</div>
<div class="text-foreground/90 text-sm leading-relaxed">הקלידו <code class="text-indigo-300 font-bold">/setup</code> לחשבון חדש והשתמשו בטריק הפרומפטים <code class="text-indigo-300">ASD STE 100</code> להוראות פשוטות וחדות בסגנון איקאה.</div>
</div>
<div class="border-b md:border-b-0 md:border-l border-border/80 pb-4 md:pb-0 md:pl-6">
<div class="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
  <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
  2. מודל Opus 5.5 ורמת מאמץ
</div>
<div class="text-foreground/90 text-sm leading-relaxed">הגדירו כברירת מחדל <strong class="text-amber-300">Opus 5.5 + Medium</strong> לכ-80% מהעבודה, ועברו ל-<strong class="text-amber-300">High</strong> במשימות קריטיות בלבד.</div>
</div>
<div>
<div class="font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">
  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
  3. אבטחה, אפליקציות וסקילים
</div>
<div class="text-foreground/90 text-sm leading-relaxed">כבו את <code class="text-rose-300">Rate chats</code> למניעת שיתוף מידע, חברו את כלי ה-Google/Slack שלכם והתקינו סקילי על מוכנים.</div>
</div>
</div>
</div>

---

## 1. הקלידו `/setup` – הסקיל המובנה שאף אחד לא מכיר

צוות הפיתוח של Anthropic בנה סקיל פנימי רשמי שנועד להגדיר את Claude שלכם מאפס, אך כמעט אף משתמש אינו מודע לקיומו.

<div class="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 my-6 flex items-start gap-3">
  <span class="text-2xl">💡</span>
  <div class="text-base text-foreground">
    <strong>מהו סקיל (Skill)?</strong> סקיל הוא סט הוראות מובנה ומוגדר מראש ש-Claude פועל לפיו כדי להשלים משימה מקצועית מוגדרת בדיוק מירבי, בדומה לעקרונות שסקרנו ב-<a href="/posts/2026-09-19-notion-skills-agent-sdk" class="text-amber-400 underline font-bold hover:text-amber-300">מדריך המקיף ל-Notion Skills וסוכני AI</a>.
  </div>
</div>

פתחו שיחה חדשה, הקלידו את פקודת הלוכסן **`/setup`** והדביקו את הפרומפט הבא:

```text
/setup This is a new Claude account.
Set up my Claude from scratch, step by step.
```

זהו תהליך הקליטה (Onboarding) הטוב והיעיל ביותר שקיים כיום ב-Claude, והוא מובנה ישירות בתוך המערכת ללא צורך בהתקנות מוקדמות.

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step1-prompt.png" alt="הפעלת פקודת setup בשיחה חדשה עם Claude" class="w-full m-0 border-0" />
</div>

Claude ייקח את המושכות וידריך אתכם צעד-אחר-צעד.

### הטריק הסודי: הסבר לפי תקן `ASD STE 100`
אם נתקלתם בשלב לא מובן או בהסבר טכני מפותל, שלחו ל-Claude את הפרומפט הבא:

```text
I couldn't complete this step. Explain in ASD STE 100.
```

`ASD STE 100` הוא תקן בינלאומי לאנגלית טכנית מפושטת (Simplified Technical English). הפרומפט הזה מאלץ את Claude להסביר את השלב בשפה סופר-פשוטה, חדה וברורה – בדיוק כמו מדריך הרכבה של איקאה.

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step1-simplified.png" alt="הסבר שלב טכני ב-Claude באמצעות תקן ASD STE 100" class="w-full m-0 border-0" />
</div>

לאחר שסיימתם שלב בהצלחה, פשוט כתבו לו:
```text
Consider it done. What else can I do?
```

<div class="p-4 rounded-xl border border-sky-500/30 bg-sky-500/10 my-4 text-sm text-sky-200">
  <strong>ℹ️ למה לא להשתמש בסקיל <code>/team-onboarding</code>?</strong><br>
  הסקיל <code>/team-onboarding</code> מיועד ל-Claude Code וסורק 30 ימי היסטוריה קודמים כדי לייצר מדריך לחברי צוות חדשים. בחשבון חדש אין עדיין היסטוריית פעילות, ולכן מומלץ לשמור אותו לחודש הבא.
</div>

---

## 2. פתיחת תוכנית Team – למה עדיף על חשבון אישי?

אם אתם משתמשים ב-Claude למטרות עבודה ועסקים, מומלץ בחום שלא להסתפק בחשבון אישי (Personal). תוכנית **Team** מעניקה שכבת אבטחה, פרטיות ושליטה ארגונית שהכרחית לכל עסק.

כדי לפתוח חשבון צוות:
1. היכנסו לעמוד התמחור בכתובת [claude.com/pricing](https://claude.com/pricing).
2. עברו ללשונית **Team & Enterprise**.
3. לחצו על **Get Team plan**.
4. בחרו במושבי **Premium**.

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step2-team-plan.png" alt="בחירת תוכנית Team בעמוד התמחור הרשמי של Claude" class="w-full m-0 border-0" />
</div>

<div class="border-r-4 border-amber-500 bg-gradient-to-l from-amber-500/15 via-amber-500/5 to-transparent p-6 rounded-l-2xl my-6 shadow-md">
<div class="font-bold text-amber-400 text-lg mb-3 flex items-center gap-2">
  <span>📌</span> שלושה כללי ברזל לפתיחת חשבון Team:
</div>
<ul class="text-base text-foreground/90 space-y-3 leading-relaxed">
<li><strong>1. כתובת מייל ארגונית:</strong> בעל החשבון חייב להירשם עם דומיין עסקי (לא כתובות חינמיות כמו Gmail, Yahoo או Hotmail).</li>
<li><strong>2. מינימום שני משתמשים:</strong> תוכנית Team מחייבת רכישת לפחות 2 מושבים (Seats).</li>
<li><strong>3. הימנעו ממעבר של 150 מושבים:</strong> מעל 150 משתמשים עוברים לתוכנית Enterprise שהתמחור שלה יקר וקשיח בהרבה.</li>
</ul>
</div>

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step2-upgrade.png" alt="כללי שדרוג חשבון Team ב-Claude" class="w-full m-0 border-0" />
</div>

---

## 3. בחירת מודל ורמת מאמץ: Opus 5.5 + Medium כברירת מחדל

בממשק של Claude, מודל העל המוביל הוא **Opus 5.5**, ולצדו מופיע מדד ה-**Effort (רמת המאמץ)** – המגדיר כמה עמוק וכמה מחזורי מחשבה והסקה Claude ישקיע לפני החזרת התשובה.

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step3-model-picker.png" alt="בורר המודלים ורמות המאמץ ב-Claude" class="w-full m-0 border-0" />
</div>

במערכת קיימות 5 רמות מאמץ שונות. בפועל, אתם תזדקקו לשתיים בלבד:

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step3-effort-levels.png" alt="הסבר רשמי על רמות המאמץ של Claude" class="w-full m-0 border-0" />
</div>

<div class="overflow-x-auto my-6 rounded-2xl border border-border bg-card shadow-lg">
<table class="w-full text-base text-right border-collapse">
<thead>
<tr class="border-b border-border bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-foreground font-bold">
<th class="p-4">רמת מאמץ (Effort)</th>
<th class="p-4">ייעוד מומלץ</th>
<th class="p-4">מתי להשתמש?</th>
</tr>
</thead>
<tbody class="divide-y divide-border/60 text-foreground/90 text-sm">
<tr class="bg-indigo-500/10 font-semibold text-foreground">
<td class="p-4 text-indigo-400 font-bold">Medium (ברירת מחדל)</td>
<td class="p-4 text-indigo-300 font-bold">~80% מכלל העבודה השוטפת</td>
<td class="p-4">מענה על שאלות, ניסוח מסמכים, סיכומים, ניתוח טקסטים ומשימות יומיומיות שוטפות.</td>
</tr>
<tr class="bg-emerald-500/5">
<td class="p-4 font-bold text-emerald-400">High</td>
<td class="p-4 font-bold text-emerald-400">משימות קריטיות של "One-Shot"</td>
<td class="p-4">הצעת מחיר גדולה, מכתב ללקוח אסטרטגי, ניתוח משפטי או חוזה עסקי. ניתן לשנות באמצע השיחה!</td>
</tr>
<tr class="bg-rose-500/5">
<td class="p-4 font-bold text-rose-400">Extra high / Max</td>
<td class="p-4 text-rose-400">קידוד כבד ומורכב בלבד</td>
<td class="p-4">הימנעו מהן בעבודה רגילה – הן שורפות מכסת טוקנים במהירות ולוקחות זמן רב (למידע נוסף קראו את <a href="/posts/2026-07-07-reduce-claude-code-token-usage" class="text-rose-400 underline font-semibold hover:text-rose-300">המדריך המעשי לצמצום שימוש בטוקנים ב-Claude Code</a>).</td>
</tr>
</tbody>
</table>
</div>

<div class="p-4 rounded-xl border border-purple-500/30 bg-purple-500/10 my-4 text-sm text-purple-200">
  <strong>מה לגבי Fable 5.1?</strong> נכון לעכשיו מומלץ לדלג עליו. לפי Anthropic, מודל Opus 5.5 מתפקד ברמה שווה ומעלה ל-Fable 5.1 במרבית סוגי העבודות.
</div>

---

## 4. שלושת המתגים הקריטיים בהגדרות: זיכרון ופרטיות

שלוש הגדרות בסיסיות שתשנו כעת יבטיחו שהמידע העסקי שלכם יישאר מאובטח ושהזיכרון של Claude יפעל בצורה חלקה:

### מתג 1: הפעלת הזיכרון הארגוני (בעל החשבון בלבד)
גשו אל: **Organization settings &rarr; Capabilities** והפעילו את ה-**Memory**.

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step4-memory-turn-on.png" alt="הפעלת יכולות הזיכרון בהגדרות הארגון" class="w-full m-0 border-0" />
</div>

<div class="border-r-4 border-rose-500 bg-gradient-to-l from-rose-500/20 via-rose-500/10 to-transparent p-5 rounded-l-2xl my-6 shadow-md">
<div class="font-bold text-rose-400 text-base mb-1.5 flex items-center gap-2">
  <span>🚨</span> אזהרה קריטית – אסור לכבות את המתג לאחר ההפעלה:
</div>
<div class="text-sm text-rose-100/90 leading-relaxed">
ברגע שהפעלתם את הזיכרון הארגוני, השאירו אותו דולק תמיד. אם מנהל מערכת מכבה את המתג בעתיד, <strong>כל הזיכרונות שנצברו עבור כל חברי הצוות יימחקו באופן מיידי ולצמיתות!</strong>
</div>
</div>

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step4-memory-warning.png" alt="אזהרת מחיקת זיכרון לצמיתות ב-Claude" class="w-full m-0 border-0" />
</div>

### מתג 2: כיבוי דירוג השיחות (`Rate chats`) להגנה על הפרטיות
גשו אל: **Organization settings &rarr; Data and Privacy &rarr; Rate chats** וכבו את המתג.

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step4-rate-chats.png" alt="הגדרות פרטיות וכיבוי Rate Chats" class="w-full m-0 border-0" />
</div>

<div class="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 my-4 text-base">
<strong class="text-amber-400 block mb-1.5">🔒 למה זה קריטי לפרטיות שלכם?</strong>
בחשבונות Team, חברת Anthropic <strong>אינה מאמנת</strong> מודלים על השיחות שלכם כברירת מחדל. החריג היחיד הוא האייקונים הקטנים של "אגודל למעלה" או "אגודל למטה" (Thumbs up / down) שמופיעים מתחת לתשובות. 
<br><br>
לחיצה על אחד מהם משגרת את כל היסטוריית השיחה לשרתי Anthropic, אשר שומרת אותה עד <strong>5 שנים</strong> ועשויה להשתמש בה לאימון מודלים עתידיים. כיבוי המתג מגן עליכם ועל הצוות שלכם מטעות אנוש.
</div>

### מתג 3: הפעלת זיכרון אישי במשתמש שלכם
גשו אל: **Settings &rarr; Memory** והפעילו את שני המתגים:
* `Generate memory from chats` (יצירת זיכרון מתוך שיחות)
* `Search and reference chats` (חיפוש ואזכור מתוך היסטוריית השיחות)

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step4-user-memory.png" alt="הפעלת הגדרות זיכרון אישיות ב-Claude" class="w-full m-0 border-0" />
</div>

---

## 5. חיבור אינטגרציות (Connectors) פעם אחת לכל הצוות

במקום להעתיק ולהדביק מידע בין תוכנות, חברו את כלי העבודה המרכזיים שלכם ישירות ל-Claude.

מנהל הארגון מבצע את ההגדרה הראשונית:
1. גשו אל **Organization settings &rarr; Connectors &rarr; Browse connectors**.
2. בחרו את האפליקציה ולחצו על **Add to your team**.
   *(פעולה זו הופכת את החיבור לזמין עבור הארגון, אך עדיין אינה מחברת את החשבון האישי).*

לאחר מכן, כל עובד בצוות נכנס אל: **Customize &rarr; Connectors** (בכתובת [claude.ai/customize/connectors](https://claude.ai/customize/connectors)) ומחבר את החשבון שלו.

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step5-connectors.png" alt="הגדרת מחברים ואינטגרציות ב-Claude" class="w-full m-0 border-0" />
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
<div class="p-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 shadow-md">
<div class="font-bold text-base text-blue-400 mb-2 flex items-center gap-2">
  <span>📧</span> 1. דואר ויומן
</div>
<p class="text-sm text-foreground/90 leading-relaxed"><strong>Google Workspace</strong> (Gmail, Calendar, Drive) או <strong>Microsoft 365</strong> לפי תשתית הארגון.</p>
</div>

<div class="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/10 shadow-md">
<div class="font-bold text-base text-purple-400 mb-2 flex items-center gap-2">
  <span>💬</span> 2. תקשורת וצ'אט
</div>
<p class="text-sm text-foreground/90 leading-relaxed"><strong>Slack</strong> או <strong>Microsoft Teams</strong> לשליפת עדכונים, סיכום ערוצים וריכוז שיחות.</p>
</div>

<div class="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 shadow-md">
<div class="font-bold text-base text-emerald-400 mb-2 flex items-center gap-2">
  <span>📋</span> 3. ניהול משימות
</div>
<p class="text-sm text-foreground/90 leading-relaxed"><strong>Notion</strong>, <strong>Asana</strong>, <strong>Jira</strong> או <strong>Atlassian</strong> לניהול שוטף ומעקב פרויקטים.</p>
</div>
</div>

<div class="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 my-4 text-sm text-emerald-200">
  <strong>🛡️ שקט נפשי באבטחה:</strong> Claude יכול לנסח ולשלוח מיילים דרך Gmail, אך כברירת מחדל הוא תמיד יבקש את אישורכם המפורש לפני כל שליחה, מענה או העברה של הודעה.
</div>

---

## 6. ספריית 33,970 סקילים ו-9 הסקילים המובילים

סקילים ב-Claude הם הנחיות-על מוכנות שמלמדות את המודל לבצע משימות ספציפיות ברמת מומחה. תוכלו גם לפתח סקילים מותאמים אישית או לחבר כלים חיצוניים כמו שהדגמנו ב-<a href="/posts/2026-09-21-free-ai-images-claude-code-cloudflare" class="text-indigo-400 underline font-bold hover:text-indigo-300">מדריך ייצור תמונות AI בחינם ישירות מ-Claude Code עם Cloudflare</a>.

תוכלו לבנות סקיל משלכם בעזרת הפקודה `/skill-creator`, או להוריד סקילים מוכנים ממאגר של **33,970 סקילים** באתר הייעודי: [skillsclau.de](https://skillsclau.de).

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step6-skills-hub.png" alt="מאגר הסקילים המקיף ל-Claude באתר skillsclau.de" class="w-full m-0 border-0" />
</div>

ההרשמה וההורדה באתר חינמיות לחלוטין (נדרש רק אישור סיסמה חד-פעמית ב-OTP במייל).

בחלק העליון של האתר מרוכזים 9 הסקילים המומלצים והשימושיים ביותר:

<div class="my-6 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-lg">
  <img src="/images/posts/claude-setup-step6-top-skills.png" alt="תשעת הסקילים המומלצים ביותר ל-Claude" class="w-full m-0 border-0" />
</div>

שני הסקילים המובילים והחזקים ביותר הם:
* **Grill-Me:** סקיל שמראיין אתכם ושואל שאלות נוקבות כדי לחדד את האסטרטגיה והדרישות לפני כתיבת מסמך או פרויקט.
* **Ship It:** סקיל שממוקד בפיניש, בדיקות איכות והוצאה מהירה לפועל של תוצרים מוכנים.

### מדריך התקנת סקיל ב-3 שלבים פשוטים:

<div class="space-y-6 my-6">
<div class="p-5 rounded-2xl border border-border bg-card shadow-md">
<div class="flex items-center gap-3 mb-3">
  <span class="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">1</span>
  <span class="text-base font-bold text-foreground">בתפריט הצדדי השמאלי באפליקציית Claude, לחצו על Customize</span>
</div>
<img src="/images/posts/claude-setup-step6-install-customize.png" alt="שלב 1: כניסה לתפריט Customize ב-Claude" class="rounded-xl border border-border my-2 w-full" />
</div>

<div class="p-5 rounded-2xl border border-border bg-card shadow-md">
<div class="flex items-center gap-3 mb-3">
  <span class="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">2</span>
  <span class="text-base font-bold text-foreground">לחצו על Skills &rarr; לחצו על הפלוס "+" &rarr; Create skill &rarr; Upload a skill</span>
</div>
<img src="/images/posts/claude-setup-step6-install-upload.png" alt="שלב 2: העלאת סקיל חדש" class="rounded-xl border border-border my-2 w-full" />
</div>

<div class="p-5 rounded-2xl border border-border bg-card shadow-md">
<div class="flex items-center gap-3 mb-3">
  <span class="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">3</span>
  <span class="text-base font-bold text-foreground">בחרו את קובץ הסקיל שהורדתם – והסקיל מוכן לשימוש מיידי!</span>
</div>
<img src="/images/posts/claude-setup-step6-install-done.png" alt="שלב 3: הסקיל מותקן ומוכן לעבודה" class="rounded-xl border border-border my-2 w-full" />
</div>
</div>

---

## 7. מאיפה מתחילים? תוכנית פעולה מעשית ל-20 דקות

אי אפשר להשתלט על כל היכולות של Claude ביום אחד, ואין צורך לנסות. במקום זאת, פנו לעצמכם **20 דקות השבוע** ופעלו לפי סדר הפעולות הבא:

<div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
<div class="p-5 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 shadow-md">
<div class="font-bold text-base text-indigo-400 mb-2 flex items-center gap-2">
  <span>💻</span> 1. הורידו את אפליקציית הדסקטופ
</div>
<p class="text-sm text-foreground/90 leading-relaxed">העבודה באפליקציה ייעודית מהירה ונוחה יותר מטאב פתוח בדפדפן.</p>
</div>

<div class="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/10 shadow-md">
<div class="font-bold text-base text-purple-400 mb-2 flex items-center gap-2">
  <span>🗣️</span> 2. התנסו במצב Chat
</div>
<p class="text-sm text-foreground/90 leading-relaxed">תנו ל-Claude לקרוא דוגמאות טקסט שלכם ובקשו ממנו לחקות את סגנון הכתיבה וטון הדיבור המדויק שלכם.</p>
</div>

<div class="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-md">
<div class="font-bold text-base text-amber-400 mb-2 flex items-center gap-2">
  <span>⚡</span> 3. התנסו ביכולות מתקדמות
</div>
<p class="text-sm text-foreground/90 leading-relaxed">התנסו ב-Opus 5.5 לצד Claude Code לקבלת יכולות פיתוח ואוטומציות, בדיוק כמו ב-<a href="/posts/2026-09-21-how-to-edit-videos-with-claude-code" class="text-amber-400 underline font-bold hover:text-amber-300">מדריך לעריכת סרטונים מלאים עם Claude Code</a>.</p>
</div>

<div class="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 shadow-md">
<div class="font-bold text-base text-emerald-400 mb-2 flex items-center gap-2">
  <span>📊</span> 4. אתגרו אותו בתוצר מורכב
</div>
<p class="text-sm text-foreground/90 leading-relaxed">בקשו ממנו לבנות עבורכם קובץ אקסל פיננסי, מסמך PDF מעוצב או עמוד HTML אינטראקטיבי וצפו בתוצאה.</p>
</div>
</div>

---

<div class="rounded-3xl border border-accent/40 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent p-7 my-8 shadow-xl">
<div class="font-bold text-lg text-foreground mb-2 flex items-center gap-2">
  <span>🚀</span> סיכום והמלצה מעשית
</div>
<p class="text-base text-foreground/90 leading-relaxed m-0">
ההבדל בין עבודה שטחית עם AI לבין כלי שמייצר ערך עסקי אמיתי טמון בהגדרות היסוד: סביבת עבודה צוותית מאובטחת, כיול רמות מאמץ נכונות, חיבור לכלי העבודה היומיומיים ושימוש בסקילים מותאמים. הגדירו את החשבון שלכם היום ב-20 דקות – והפכו את Claude לשותף העבודה המרכזי שלכם.
</p>
</div>

---

<div class="my-10 not-prose">
<div class="mb-4">
<h3 class="text-2xl font-bold text-foreground">מדריכים נוספים שאולי יעניינו אותך:</h3>
<p class="text-sm text-muted-foreground mt-1">הרחיבו את ארגז הכלים שלכם עם המדריכים המובילים באתר:</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">

<a href="/posts/2026-09-21-free-ai-images-claude-code-cloudflare" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/cloudflare-workers-ai-workflow.jpg" alt="ייצור תמונות חינם עם Claude Code" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">מדריך מעשי · Claude Code</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">איך לייצר תמונות AI בחינם ישירות מ-Claude Code עם Cloudflare</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">חיבור למודל FLUX.1 schnell להפקת 170 תמונות ביום ללא עלות ומבלי לעזוב את הטרמינל.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

<a href="/posts/2026-09-21-how-to-edit-videos-with-claude-code" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/how-to-edit-videos-with-claude-code.jpg" alt="עריכת סרטונים עם Claude Code" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">מדריך מעשי ליוצרי תוכן</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">איך לערוך סרטוני יוטיוב מלאים עם Claude Code: מדריך ללא עורך וידאו</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">חיתוך שתיקות, הוספת אנימציות Remotion ושיפור סאונד אוטומטי מתוך הטרמינל.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

<a href="/posts/2026-09-22-jev-ai-model-vercel-gateway-guide" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/jev-ai-model-vercel-gateway-guide.png" alt="מדריך Jev AI ומודל System-1" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">חדש · ארכיטקטורת AI</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">מדריך מעשי ל-Jev AI: מה זה מודל System-1 ולמה זה יחסוך 85% בעלויות</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">מנוע קבלת החלטות סופר-מהיר ב-15ms, חיבור ל-Vercel AI Gateway ואוטומציות חכמות.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

</div>
</div>

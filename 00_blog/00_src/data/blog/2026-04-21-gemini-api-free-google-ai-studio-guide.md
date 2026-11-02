---
title: "ג׳ימיני API חינמי בעברית: המדריך המעשי ל-Google AI Studio"
description: "מדריך בעברית להתחלה עם Gemini API ו־Google AI Studio: הוצאת מפתח, בדיקת מכסות ותנאי מידע, וחיבור ל־AnythingLLM ולאוטומציות."
pubDatetime: 2026-04-21T13:54:10+03:00
modDatetime: 2026-11-01T13:45:00+02:00
author: עולם ה AI
tags:
  - Gemini API
  - Google AI Studio
  - כלי AI
  - פיתוח
  - אוטומציה
featured: true
draft: false
ogImage: /images/posts/gemini-api-google-ai-studio-header.png
faqs:
  - question: "האם Gemini API תמיד חינמי?"
    answer: "קיימת שכבה חינמית למודלים ולשימושים נתמכים. יש מכסות ותנאי שימוש במידע, ולא כל מודל או תכונה כלולים. בדקו את שכבת הפרויקט לפני הפעלה; מעבר למסלול בתשלום הוא בחירה נפרדת."
  - question: "האם Google AI Studio מתאים גם למי שלא יודע לתכנת?"
    answer: "בהחלט. ניתן להשתמש ב-Google AI Studio כמגרש משחקים לבדיקת פרומפטים ישירות בדפדפן, או להעתיק את ה-API Key לתוכנות שולחניות כמו AnythingLLM שעובדות ללא קוד כלל."
  - question: "איך שומרים על מפתח ה-API שלא ייחשף או ייגנב?"
    answer: "מומלץ לשמור את המפתח בקובץ .env כמשתנה סביבה מקומי ולא להעלות אותו לעולם ישירות ל-GitHub או לרשתות חברתיות."
  - question: "מה קורה כשמגיעים למגבלת הקצב (Rate Limit)?"
    answer: "ייתכן שנחרגה מכסת בקשות או טוקנים. בדקו איזו מגבלה הושגה והשתמשו בהמתנה ובהפחתת קצב לפי הנחיות Google. השהייה קצרה אינה פותרת בהכרח מכסה יומית. אל תפעילו חיוב בלי לבדוק עלויות ותנאים."
---

מדריך בעברית ל-Gemini API ול-Google AI Studio: איך מוציאים מפתח API בשכבה החינמית, בלי צורך בכרטיס אשראי, ומה עושים איתו אחר כך. לשכבה החינמית יש מגבלות קצב ולא כל המודלים זמינים בה, ולכן נסמן גם מתי משתלם לשדרג.

<!-- Apple-Style Key Takeaways Hero Card -->
<div class="my-8 rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-background p-6 sm:p-8 dark:border-indigo-900/60 dark:from-indigo-950/30 dark:via-purple-950/20 shadow-sm not-prose">
<div class="flex flex-wrap items-center gap-3">
<span class="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-sm">⚡ מדריך מעשי 2026</span>
<span class="text-xs text-muted-foreground font-medium">זמן קריאה: 5 דקות</span>
</div>
<p class="mt-4 text-base sm:text-lg leading-relaxed text-foreground font-semibold">
אפשר להתחיל עם Gemini API בשכבה חינמית, בכפוף למודלים, למכסות ולתנאים הזמינים בפרויקט שלכם. חינם לא אומר שימוש בלתי מוגבל או עיבוד מקומי: לפני שמחברים מסמכים, בדקו גם את תנאי השימוש במידע.
</p>
<div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-indigo-200/60 dark:border-indigo-900/50 text-sm font-medium">
<div class="flex items-center gap-2 text-foreground">
<span class="flex size-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs">✓</span>
<span>שכבה חינמית למודלים נתמכים</span>
</div>
<div class="flex items-center gap-2 text-foreground">
<span class="flex size-5 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold text-xs">✓</span>
<span>חיבור ל־AnythingLLM ולקוד</span>
</div>
<div class="flex items-center gap-2 text-foreground">
<span class="flex size-5 items-center justify-center rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold text-xs">✓</span>
<span>המכסות נבדקות ב־AI Studio</span>
</div>
</div>
</div>

האתגר האמיתי אינו הוצאת המפתח – זה לוקח פחות משתי דקות. השאלה היא **מה עושים איתו אחר כך**: אילו מודלים זמינים בחינם, כמה בקשות אפשר לשלוח ביום, ואיך מחברים את ה-API לכלים כמו **AnythingLLM**, עורכי קוד, בוטים ואוטומציות No-Code.

---

## מה זה בעצם Google AI Studio ולמה כדאי להכיר אותו?

לפני שנצלול לצד הטכני, חשוב להבין את ההבדל: כשאתם גולשים לאתר הרגיל של Gemini, אתם משתמשים ב**מוצר קצה** של גוגל (כמו ChatGPT). אבל מה קורה כשרוצים להשתמש בבינה המלאכותית של גוגל בתוך תוכנות שלכם, לנתח מאות קבצים, או לבנות אוטומציה לעסק?

כאן נכנס **Google AI Studio** – סביבת הפיתוח והאימון הרשמית של גוגל.

<div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-5 not-prose">
<!-- Card 1: The Why -->
<div class="rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50/60 to-background p-6 dark:border-indigo-900/60 dark:from-indigo-950/20 shadow-sm">
<h3 class="text-base font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 mb-4 border-b border-indigo-100 dark:border-indigo-900/50 pb-3">
<span>🎯</span> למה להשתמש ב-AI Studio?
</h3>
<div class="space-y-3.5 text-sm text-foreground">
<div class="border-b border-border/40 pb-3">
<div class="font-bold text-foreground">גישה ישירה למודלי הדגל</div>
<div class="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">בחירה בין המודלים הזמינים בפרויקט שלכם, בהתאם לשכבת השימוש.</div>
</div>
<div class="border-b border-border/40 pb-3">
<div class="font-bold text-foreground">שליטה מלאה בהנחיות המודל</div>
<div class="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">הגדרת System Instructions מותאמות אישית, רמת יצירתיות (טמפרטורה) ופורמט פלט מובנה (טקסט, JSON, טבלאות).</div>
</div>
<div>
<div class="font-bold text-foreground">הוצאת מפתח API עצמאי</div>
<div class="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">היכולת לקחת את הבינה של גוגל ולחבר אותה לכל תוכנה, בוט, אתר או אוטומציה בעסק.</div>
</div>
</div>
</div>

<!-- Card 2: The How -->
<div class="rounded-2xl border border-purple-200/70 bg-gradient-to-br from-purple-50/60 to-background p-6 dark:border-purple-900/60 dark:from-purple-950/20 shadow-sm">
<h3 class="text-base font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-4 border-b border-purple-100 dark:border-purple-900/50 pb-3">
<span>⚙️</span> איך זה עובד בפועל?
</h3>
<div class="space-y-3.5 text-sm text-foreground">
<div class="border-b border-border/40 pb-3">
<div class="font-bold text-foreground">ממשק דפדפן אינטואיטיבי</div>
<div class="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">כתיבה ובדיקה של פרומפטים ישירות מהדפדפן, ללא צורך בהתקנת תוכנות או ניהול שרתים.</div>
</div>
<div class="border-b border-border/40 pb-3">
<div class="font-bold text-foreground">ייצוא קוד אוטומטי בלחיצה</div>
<div class="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">המרת כל פרומפט או שיחה לקוד מוכן ומסודר ב-Python, JavaScript או פקודות cURL.</div>
</div>
<div>
<div class="font-bold text-foreground">שכבת Free Tier נדיבה</div>
<div class="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">התנסות בשכבה החינמית, בכפוף לזמינות ולמכסות הפרויקט.</div>
</div>
</div>
</div>
</div>

---

## 1. הוצאת מפתח ב-Google AI Studio תוך 60 שניות

<!-- Apple-Style Step-by-Step Vertical Cards -->
<div class="my-6 space-y-4 not-prose">
<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-border bg-muted/30 p-5 transition-all hover:bg-muted/50 hover:shadow-sm">
<div class="flex size-11 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white font-black text-lg shadow-sm">1</div>
<div class="flex-1">
<h3 class="text-base font-bold text-foreground">התחברות לפורטל Google AI Studio</h3>
<p class="mt-1 text-sm text-muted-foreground leading-relaxed">נכנסים ל-<a href="https://aistudio.google.com" target="_blank" class="text-accent underline font-semibold">Google AI Studio</a> ומתחברים ישירות עם חשבון ה-Gmail הרגיל שלכם (אין צורך בחשבון עסקי או כרטיס אשראי).</p>
</div>
</div>
<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-border bg-muted/30 p-5 transition-all hover:bg-muted/50 hover:shadow-sm">
<div class="flex size-11 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white font-black text-lg shadow-sm">2</div>
<div class="flex-1">
<h3 class="text-base font-bold text-foreground">יצירת ה-API Key בלחיצת כפתור</h3>
<p class="mt-1 text-sm text-muted-foreground leading-relaxed">לוחצים על הכפתור הכחול <strong>Get API Key</strong> בתפריט העליון, ולאחר מכן בוחרים <strong>Create API key in new project</strong>.</p>
</div>
</div>
<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-border bg-muted/30 p-5 transition-all hover:bg-muted/50 hover:shadow-sm">
<div class="flex size-11 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white font-black text-lg shadow-sm">3</div>
<div class="flex-1">
<h3 class="text-base font-bold text-foreground">העתקה ושמירה מאובטחת</h3>
<p class="mt-1 text-sm text-muted-foreground leading-relaxed">מעתיקים את מחרוזת המפתח (המתחילה באותיות <code>AIza...</code>) ושומרים אותה בקובץ משתני סביבה <code>.env</code> או במנהל הסיסמאות שלכם.</p>
</div>
</div>
</div>

> 💡 **טיפ אבטחה קריטי:** המפתח מתפקד בדיוק כמו סיסמה לחשבון שלכם. לעולם אל תעלו אותו ישירות ל-GitHub או לקוד פתוח, כדי למנוע ניצול של מכסת הבקשות שלכם ע"י זרים.

---

## 2. השוואת מודלים בשכבת החינם (Free Tier)

אילו מודלים ומכסות זמינים לכם? הזמינות והמגבלות משתנות לפי המודל, הפרויקט ושכבת השימוש. פתחו את מסך המכסות ב־Google AI Studio לפני הבחירה. מגבלה עשויה להיות לפי בקשות לדקה, טוקנים לדקה או בקשות ליום; עמידה באחת אינה מבטיחה עמידה באחרות.

[מכסות ומגבלות Gemini API בתיעוד הרשמי](https://ai.google.dev/gemini-api/docs/rate-limits)

---

<!-- Apple-Style High-Converting Google AI Pro Offer Box -->
<div class="my-10 relative overflow-hidden rounded-3xl border-2 border-indigo-500 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 sm:p-10 text-white shadow-xl not-prose">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
<div class="space-y-4 max-w-2xl">
<div class="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-bold text-indigo-300 border border-indigo-400/30">
<span>🔥 מבצע בלעדי לקוראי הבלוג</span>
<span class="size-1.5 rounded-full bg-emerald-400"></span>
<span class="text-emerald-300 font-extrabold">כ-80% הנחה!</span>
</div>
<h3 class="text-2xl sm:text-3xl font-black tracking-tight text-white">שדרגו ל-Google AI Pro (Gemini Advanced) בחיסכון ענק</h3>
<p class="text-sm sm:text-base text-slate-300 leading-relaxed">צריכים שימוש אינטנסיבי ללא הגבלת מכסות יומיות? שדרגו לחשבון <strong>Google AI Pro</strong> וקבלו גישה מלאה למודל הדגל, חלון הקשר ענק לקבצים כבדים, 2TB שטח אחסון ענן מלא ב-Google One ואינטגרציה ל-Docs ו-Gmail.</p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-slate-200 font-medium">
<div class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span><span>גישה בלתי מוגבלת ל-Gemini 2.5 Pro</span></div>
<div class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span><span>2TB נפח אחסון מלא ב-Google One</span></div>
<div class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span><span>אינטגרציה מלאה ל-Google Docs ו-Gmail</span></div>
<div class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span><span>חיסכון של כ-80% מהעלות החודשית</span></div>
</div>
</div>
<div class="flex flex-col items-center lg:items-end gap-3 flex-shrink-0">
<a href="https://google-ai-pro-drab.vercel.app/" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-black text-slate-900 shadow-xl transition-all hover:bg-slate-100 hover:scale-105 active:scale-95 text-center">
<span>למימוש ההנחה ב-Google AI Pro</span>
<span class="rtl:rotate-180">←</span>
</a>
<span class="text-xs text-slate-400 text-center">מספר המנויים במבצע מוגבל בהקצאה</span>
</div>
</div>
</div>

---

## 3. אינטגרציות מעשיות: לאן לחבר את המפתח החינמי?

### א. AnythingLLM: עבודה עם מסמכים, בהתאם לספק המודל

אם אתם לא מתכנתים, זו כנראה האפליקציה השימושית ביותר שתוכלו להתקין היום.

<div class="my-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/40 not-prose">
<div class="flex items-center gap-3">
<div class="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white text-xl shadow-xs">📁</div>
<div>
<h4 class="text-base font-bold text-foreground">מה זה AnythingLLM ולמה זה מושלם לעסקים?</h4>
<p class="text-xs text-muted-foreground">AnythingLLM מאפשר לעבוד עם מסמכים דרך ספק מודל שתבחרו. כשמחברים אותו ל־Gemini API, הבקשות וההקשר שנשלח למודל מעובדים אצל Google.</p>
</div>
</div>

<div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-foreground/90 border-t border-border/50 pt-4">
<div class="rounded-xl border border-border/60 bg-background/50 p-3.5">
<div class="font-bold text-indigo-600 dark:text-indigo-400 mb-1">🔒 מסלול המידע תלוי בספק ובהגדרות</div>
<div class="text-muted-foreground leading-relaxed">התקנה על המחשב אינה הופכת את העיבוד למקומי. גם ספק ההטמעות והגדרות הכלי משפיעים על מסלול המידע.</div>
</div>
<div class="rounded-xl border border-border/60 bg-background/50 p-3.5">
<div class="font-bold text-indigo-600 dark:text-indigo-400 mb-1">⚡ שימוש במוח של Gemini בחינם</div>
<div class="text-muted-foreground leading-relaxed">הכלי יכול להיעזר בתוכן מהמסמכים כדי לענות; צריך לבדוק תשובות מול המקור.</div>
</div>
</div>
</div>

חשוב לדעת לפני שמעלים מידע: בתנאי השירות של Google, שימוש בשירותים הלא־משולמים עשוי לכלול שימוש בקלט ובתשובות לשיפור מוצרים וטכנולוגיות, וגם בדיקה אנושית. Google מזהירה לא למסור לשירותים האלה מידע רגיש, סודי או אישי. תנאי המידע שונים בשירותים בתשלום ובאזורים מסוימים, ובהם EEA, שווייץ ובריטניה. בדקו את התנאים שחלים על החשבון והפרויקט שלכם; גם שירות בתשלום אינו הבטחה לאפס שמירה או אפס עיבוד מידע.

[תנאי השירות הרשמיים של Gemini API](https://ai.google.dev/gemini-api/terms) · [הגדרת ספק Gemini ב־AnythingLLM](https://docs.anythingllm.com/setup/llm-configuration/cloud/google-gemini)

בתרגול השתמשו בקובץ דוגמה ללא מידע אישי, סודי או של לקוחות.

#### איך מפעילים את זה ב-4 צעדים פשוטים?
1. מורידים ומתקינים את [AnythingLLM](https://anythingllm.com) למחשב.
2. בהגדרות ה-AI Provider בוחרים ב-**Google Gemini API**.
3. מדביקים את ה-API Key שהוצאתם ב-AI Studio.
4. גוררים קובצי PDF, וורד, אקסל או טקסט לסביבת העבודה (Workspace) ומתחילים לשאול שאלות בעברית!

---

### ב. תוסף חכם לעורכי קוד (VS Code & JetBrains)
חברו את Gemini כעוזר פיתוח חינמי בתוך סביבת העבודה שלכם:
- מתקינים את תוסף Gemini ממרקטפלייס התוספים.
- מגדירים את ה-API Key בהגדרות התוסף.
- מקבלים השלמות קוד חכמות, הסברי פונקציות ואיתור באגים בזמן אמת בלי לעזוב את עורך הקוד.

### ג. אוטומציות No-Code ובוטים
חברו את המפתח ישירות ל-**n8n**, ל-Make, או לבוטים בטלגרם כדי לסכם מיילים, לסווג פניות לקוחות, וליצור תוכן אוטומטי.

---

## שאלות נפוצות (FAQ)

<div class="my-8 space-y-3 not-prose">
<!-- FAQ 1 (Open by default) -->
<details open class="group rounded-2xl border border-border bg-muted/20 p-5 transition-all hover:bg-muted/35 open:border-indigo-500/40 open:bg-indigo-50/20 dark:open:bg-indigo-950/20">
<summary class="flex cursor-pointer items-center justify-between font-bold text-foreground text-base list-none">
<span>האם Gemini API תמיד חינמי?</span>
<span class="text-xs text-muted-foreground transition-transform duration-300 group-open:rotate-180">▼</span>
</summary>
<div class="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
קיימת שכבה חינמית למודלים ולשימושים נתמכים. יש מכסות ותנאי שימוש במידע, ולא כל מודל או תכונה כלולים. בדקו את שכבת הפרויקט לפני הפעלה; מעבר למסלול בתשלום הוא בחירה נפרדת.
</div>
</details>

<!-- FAQ 2 -->
<details class="group rounded-2xl border border-border bg-muted/20 p-5 transition-all hover:bg-muted/35 open:border-indigo-500/40 open:bg-indigo-50/20 dark:open:bg-indigo-950/20">
<summary class="flex cursor-pointer items-center justify-between font-bold text-foreground text-base list-none">
<span>האם Google AI Studio מתאים גם למי שלא יודע לתכנת?</span>
<span class="text-xs text-muted-foreground transition-transform duration-300 group-open:rotate-180">▼</span>
</summary>
<div class="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
בהחלט. ניתן להשתמש ב-Google AI Studio כמגרש משחקים לבדיקת פרומפטים ישירות בדפדפן, או להעתיק את ה-API Key לתוכנות שולחניות כמו AnythingLLM שעובדות ללא קוד כלל.
</div>
</details>

<!-- FAQ 3 -->
<details class="group rounded-2xl border border-border bg-muted/20 p-5 transition-all hover:bg-muted/35 open:border-indigo-500/40 open:bg-indigo-50/20 dark:open:bg-indigo-950/20">
<summary class="flex cursor-pointer items-center justify-between font-bold text-foreground text-base list-none">
<span>איך שומרים על מפתח ה-API שלא ייחשף או ייגנב?</span>
<span class="text-xs text-muted-foreground transition-transform duration-300 group-open:rotate-180">▼</span>
</summary>
<div class="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
מומלץ לשמור את המפתח בקובץ <code>.env</code> כמשתנה סביבה מקומי ולא להעלות אותו לעולם ישירות ל-GitHub או לרשתות חברתיות.
</div>
</details>

<!-- FAQ 4 -->
<details class="group rounded-2xl border border-border bg-muted/20 p-5 transition-all hover:bg-muted/35 open:border-indigo-500/40 open:bg-indigo-50/20 dark:open:bg-indigo-950/20">
<summary class="flex cursor-pointer items-center justify-between font-bold text-foreground text-base list-none">
<span>מה קורה כשמגיעים למגבלת הקצב (Rate Limit)?</span>
<span class="text-xs text-muted-foreground transition-transform duration-300 group-open:rotate-180">▼</span>
</summary>
<div class="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
ייתכן שנחרגה מכסת בקשות או טוקנים. בדקו איזו מגבלה הושגה והשתמשו בהמתנה ובהפחתת קצב לפי הנחיות Google. השהייה קצרה אינה פותרת בהכרח מכסה יומית. אל תפעילו חיוב בלי לבדוק עלויות ותנאים.
</div>
</details>
</div>

<div class="my-10 not-prose">
<div class="mb-4">
<h3 class="text-xl font-bold text-foreground">מדריכים מומלצים להמשך:</h3>
<p class="text-sm text-muted-foreground mt-1">הרחיבו את הידע עם כלים, שרתים וסוכני AI נוספים:</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">

<a href="/posts/7-free-web-apis-every-developer-and-vibe-coder-should-know" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/7freeapi.jpg" alt="7 ממשקי API חינמיים" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">כלי פיתוח</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">7 ממשקי API חינמיים שכל מפתח ו-Vibe Coder חייב להכיר</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">ממשקים מעולים לחיבור נתונים, שירותי מזג אוויר וסליקה לפרויקטים.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

<a href="/posts/2026-04-21-n8n-server-old-android-phone-guide" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/n8n-server-old-android-phone-guide.png" alt="מדריך שרת n8n" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">אוטומציה עצמאית</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">איך להקים שרת אוטומציות n8n ביתי בחינם מטלפון אנדרואיד ישן</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">הפעלת שרת אוטומציות עצמאי 24/7 ללא עלויות שרתים בענן.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

<a href="/posts/2026-04-21-ai-agents-platforms-business-2026-guide" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/ai-agents-platforms-business-2026-guide.png" alt="10 פלטפורמות AI Agents" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">אוטומציה עסקית</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">10 פלטפורמות AI Agents שמשנות את העבודה העסקית</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">סוכני AI שמבצעים משימות אמיתיות מגוגל, מיקרוסופט ועד Salesforce.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

</div>
</div>

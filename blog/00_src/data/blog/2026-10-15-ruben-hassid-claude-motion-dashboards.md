---
title: "איך להפוך דוחות ותרשימים לסרטוני אנימציה ודשבורדים ב-Claude"
description: "המדריך המעשי לפיצ'ר Claude Motion ודשבורדים אינטראקטיביים: נוסחת הפרומפט בת 7 השלבים של רובן חסיד להפיכת נתונים יבשים לסרטוני הסבר מנצחים תוך 20 שניות."
pubDatetime: 2026-10-15T16:00:00+03:00
author: צוות עולם ה-AI
tags:
  - Claude
  - וידאו ועיצוב
  - כלי AI
  - מדריכים
  - פרודוקטיביות
featured: true
draft: false
ogImage: /images/posts/claude-motion-prompt-anatomy.png
faqs:
  - question: "מה ההבדל בין Claude Motion ליצירת סרטונים בכלי וידאו גנרטיביים כמו Sora או Runway?"
    answer: "בניגוד למודלי וידאו שמייצרים פיקסלים מהזיה (Diffusion) ולעיתים מעוותים טקסטים ומספרים, Claude Motion מבוסס קוד וגרפיקה וקטורית (Motion Graphics). הוא שומר על דיוק מוחלט של נתונים, גרפים, לוגואים וטקסטים קריאים ב-100%."
  - question: "מהי נוסחת הפרומפט המדויקת של רובן חסיד לסרטון של 20 שניות?"
    answer: "הנוסחה מבוססת על 7 שורות מוגדרות: הגדרת אורך הסרטון והמקור (Report/Chart), קהל היעד, פלטפורמת ההקרנה, המשפט האחד שהצופה חייב לזכור, הנכסים הוויזואליים המצורפים (צבעים ולוגו), הכלל 'רעיון אחד לסצנה', ושורת הסיום החותמת."
  - question: "איך משלבים בין Claude Dashboards לבין סרטוני Claude Motion?"
    answer: "מזינים לקלוד קובץ נתונים (CSV או גיליון), מבקשים ממנו לייצר דשבורד אינטראקטיבי ויזואלי של מדדי ה-KPI, ולאחר מכן משתמשים בפקודת Motion כדי להנפיש את הנתונים המשמעותיים ביותר לקטע וידאו דינמי שמציג את המגמות."
  - question: "האם חייבים מנוי מיוחד כדי להשתמש ב-Claude Motion?"
    answer: "הפיצ'ר זמין כרגע בממשק claude.ai עבור מנויי Pro, Team ו-Enterprise, כאשר תבניות הפרומפט מפיקות את התוצאות הטובות ביותר עם מודלי Claude 3.7 Sonnet."
---

> **תקציר מנהלים (בשורה אחת):** מומחה ה-AI הבינלאומי רובן חסיד (Ruben Hassid) חשף את שיטת העבודה המלאה שלו להפיכת דוחות עסקיים מייגעים, טבלאות אקסל ותרשימי נתונים לסרטוני הסבר מונפשים (Motion Explainers) באורך 20 שניות ודשבורדים אינטראקטיביים ישירות בתוך Claude. בעזרת נוסחת פרומפט חסינת כשל בת 7 שלבים, כל מנהל מוצר, סמנכ"ל שיווק או יוצר תוכן יכול להציג תובנות מורכבות תוך שניות בפורמט שאי אפשר להפסיק לצפות בו.

בעולם העסקי המודרני, שבו תשומת הלב הממוצעת נמדדת בשניות ספורות, מסמכי PDF עמוסי פסקאות ומצגות PowerPoint בנות 40 שקופיות כבר כמעט ואינם נקראים. מחקרים ארגוניים עדכניים מראים כי מעל 75% מהמנהלים הבכירים ומקבלי ההחלטות מרפרפים בלבד על דוחות שבועיים, ומתעלמים מתובנות קריטיות שקבורות בתוך תרשימים סטטיים.

כאן בדיוק נכנסת לתמונה המהפכה הוויזואלית של **Claude Motion** מבית Anthropic. בעוד שרבים עדיין משתמשים במודלי שפה אך ורק לסיכום טקסטים או כתיבת מיילים, מובילי דעה גלובליים כמו **רובן חסיד (Ruben Hassid)** גילו כיצד להפוך את Claude למנוע הפקה מלא של גרפיקה בתנועה (Motion Graphics) ודשבורדים חיים.

במדריך מעמיק זה נפרק לגורמים את המתודולוגיה של חסיד: נחשוף את נוסחת הפרומפט בת 7 השלבים, נלמד כיצד לחבר דשבורדים אינטראקטיביים של Claude לציר הזמן המונפש, ונציג את חוקי הברזל לבניית סרטון עסקי באורך 20 שניות שמשאיר חותם בלתי נשכח.

<div class="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-amber-500/10 p-7 my-8 shadow-xl">
<div class="flex items-center gap-3 mb-4">
  <span class="p-2 rounded-xl bg-indigo-500 text-white font-bold text-base shadow-md">⚡ תמצית מנהלים (Zero-Click Answer)</span>
  <h3 class="text-xl font-bold text-foreground m-0">נוסחת Motion & Dashboards של רובן חסיד ב-3 עקרונות:</h3>
</div>
<p class="text-base text-foreground/90 leading-relaxed mb-4">
המעבר מטקסט יבש לסרטון Motion מנצח אינו דורש ידע באפטר אפקטס, אלא הקפדה על 3 עמודי תווך: זיקוק של נתון אחד בלבד לכל סצנה (ללא עומס קוגניטיבי), שימוש בנוסחת הפרומפט המובנית המגדירה קהל ויעד ברורים, וחיבור נתוני ה-KPI מתוך דשבורד דינמי כדי לייצר תנועה פיזיקלית חלקה (Spring Easing) עם מספרים שנחשפים בצורה חיה.
</p>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
<div class="border-b md:border-b-0 md:border-l border-border/80 pb-4 md:pb-0 md:pl-6">
<div class="font-bold text-indigo-400 mb-1.5 flex items-center gap-1.5">
  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
  1. נוסחת 7 השורות
</div>
<div class="text-foreground/90 text-sm leading-relaxed">פרומפט מובנה שמגדיר אורך (20 שניות), קהל, פלטפורמה, מסר ליבה אחד ונכסי מותג ויזואליים.</div>
</div>
<div class="border-b md:border-b-0 md:border-l border-border/80 pb-4 md:pb-0 md:pl-6">
<div class="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
  <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
  2. רעיון אחד לכל סצנה
</div>
<div class="text-foreground/90 text-sm leading-relaxed">מקסימום 4 עד 6 מילים בכל פריים. שומר על קצב צפייה מהפנט ומונע עומס תפיסתי בפיד ובפגישות.</div>
</div>
<div>
<div class="font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">
  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
  3. דשבורד מונפש חי
</div>
<div class="text-foreground/90 text-sm leading-relaxed">שילוב תרשימים וטבלאות נתונים אינטראקטיביים עם קווי גרף שרושמים את עצמם ומספרים שמתקתקים.</div>
</div>
</div>
</div>

---

## 1. המהפך התפיסתי: למה שקופיות ומסמכים סטטיים מאבדים את הקהל?

במשך עשרות שנים הדרך המקובלת להעביר עדכון חודשי או לנתח ביצועי רבעון הייתה פשוטה: פותחים גיליון נתונים, מייצאים גרף עוגה או עמודות, מדביקים לתוך שקופית, ומוסיפים חמישה בולטים טקסטואליים. 

אולם ב-2026, כפי שרובן חסיד מציג בניוזלטר המוביל שלו, הצופה הממוצע – בין אם מדובר במנכ"ל החברה בישיבת All-Hands, משקיע בשיחת זום או קולגה בלינקדאין – סובל מ"עיוורון שקופיות" (Slide Blindness). כשהעין נתקלת בקיר של טקסט או בגרף סטטי עמוס צירים, המוח מעביר את תשומת הלב למקום אחר.

<div class="my-6 rounded-2xl overflow-hidden border border-border/80 bg-card p-3 shadow-lg">
  <img src="/images/posts/claude-motion-interface-overview.jpeg" alt="ממשק העבודה של Claude Motion" class="w-full rounded-xl m-0 border-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">מעבר מדוחות עמוסים לעבודה אינטראקטיבית מבוססת ציר זמן ב-Claude</p>
</div>

בניגוד לכלים מסורתיים, Claude Motion אינו דורש ידע טכני בתוכנות עריכה מורכבות כפי שסקרנו ב-[מדריך המלא ל-Claude Motion Graphics](/posts/2026-10-11-claude-motion-graphics-guide). הוא מספק גשר מיידי בין נתונים גולמיים לחוויה קולנועית מונפשת. 

כאשר אתם מציגים גרף שצומח מול עיני הצופה תוך כדי הדגשת המספר המשמעותי ביותר, אתם מפעילים מנגנונים נוירולוגיים של קשב ויזואלי ומבטיחים שהמסר המרכזי ייחרט בזיכרון.

---

## 2. נוסחת הפרומפט בת 7 השלבים של רובן חסיד

הלב הפועם של המתודולוגיה של רובן חסיד הוא נוסחת פרומפט תמציתית אך קפדנית ביותר. חסיד הבין שקלוד מצטיין במיוחד כאשר מגבילים אותו בחוקי מסגרת חדים, במקום לבקש ממנו באופן מעורפל "ליצור סרטון יפה".

הנה נוסחת הפרומפט המקורית של רובן חסיד:

```text
/motion Turn [THIS REPORT / THESE NOTES / THIS CHART] into a [20]-second explainer. 
Who will watch it: [YOUR AUDIENCE]. 
Where it will play: [ALL-HANDS SCREEN / LINKEDIN / A SALES CALL]. 
The one thing they must remember: [ONE SENTENCE]. 
Use my [LOGO / SCREENSHOTS / BRAND COLORS], attached. 
One idea per scene. Few words on screen. 
End on: [YOUR LAST LINE].
```

<div class="my-6 rounded-2xl overflow-hidden border border-border/80 bg-card p-3 shadow-lg">
  <img src="/images/posts/claude-motion-prompt-anatomy.png" alt="אנטומיית הפרומפט של Claude Motion" class="w-full rounded-xl m-0 border-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">פירוק אנטומיית הפרומפט: חלוקה מוגדרת המייצרת סצנות מדויקות ומתוזמנות</p>
</div>

### ניתוח מעמיק: מדוע כל שורה בנוסחה היא קריטית?

1. **הגדרת הפורמט ומשך הזמן (`Turn [...] into a 20-second explainer`)**:
   עשרים שניות הן נקודת הקסם (The Sweet Spot). זהו חלון זמן קצר מספיק כדי לשמור על 100% שימור צפייה (Retention), וארוך דיו כדי לחלק את הסיפור ל-4 או 5 סצנות בנות 4 שניות כל אחת: בעיה, נתון מפתיע, פתרון/מגמה, והנעה לפעולה.
2. **הגדרת קהל היעד (`Who will watch it: [AUDIENCE]`)**:
   הסגנון הוויזואלי והשפה משתנים לחלוטין אם הסרטון מיועד לחברי הנהלה שמתעניינים ב-ROI, לצוותי פיתוח שרוצים לראות מדדי יציבות, או ללקוחות פוטנציאליים בלינקדאין שדורשים פשטות מוחלטת.
3. **הקשר הפלטפורמה (`Where it will play`)**:
   מסך All-Hands באולם דורש גופנים גדולים במיוחד וניגודיות עזה; סרטון בפיד של לינקדאין חייב לעבוד בצורה מושלמת על מצב Mute (ללא שמע); ושיחת מכירות דורשת קצב שמאפשר למציג לדבר ברקע.
4. **מסר הליבה הבודד (`The one thing they must remember`)**:
   בכל דוח עסקי יש אינסוף נתונים, אך תמיד ישנה תובנה מרכזית אחת (The North Star Insight). אם תנסו להעביר חמישה מסרים ב-20 שניות, הצופה לא יזכור דבר. אם תמקדו את הסרטון סביב מסר אחד, הוא לא יישכח.
5. **נכסי מותג מצורפים (`Use my LOGO / SCREENSHOTS / BRAND COLORS`)**:
   במקום להסתפק בפלטות צבעים אקראיות, אתם מנחים את המודל לשמור על זהות המותג שלכם. אם עדיין לא הגדרתם קובץ סגנון קבוע או פרויקט מסודר, מומלץ לעיין ב-[מדריך הגדרת חשבון ופרויקטים ב-Claude](/posts/2026-10-03-how-to-set-up-claude-guide).
6. **חוק הזהב: רעיון אחד לכל סצנה (`One idea per scene. Few words on screen`)**:
   זהו הכלל שמפריד בין אנימציה ברמת חברות כמו Apple או Linear למצגת חובבנית. אסור לשים פסקאות שלמות על המסך. כל סצנה צריכה להציג מספר אחד, מילת מפתח אחת או דיאגרמה אחת.
7. **שורת הסיום המהדהדת (`End on: [LAST LINE]`)**:
   הפריים האחרון של הסרטון חייב להכיל את הקריאה לפעולה (CTA), היעד הבא או סיכום התובנה. זהו הפריים שיישאר על המסך כשהסרטון יסתיים.

---

## 3. השילוב העוצמתי: חיבור Claude Dashboards עם Claude Motion

אחת התובנות החשובות ביותר שרובן חסיד מדגיש היא היכולת לייצר סינרגיה בין שני פיצ'רים מתקדמים של Claude: **אינטראקטיביות של דשבורדים (Artifacts/Dashboards)** ו-**Motion Graphics**.

עד היום, כאשר מנהלים רצו להציג נתוני מכירות, מדדי המרה או שימור לקוחות (Retention), הם נהגו להציג דשבורד מורכב. הבעיה בדשבורדים אינטראקטיביים היא שהם פסיביים: הצופה צריך לחקור אותם בעצמו.

<div class="my-6 rounded-2xl overflow-hidden border border-border/80 bg-card p-3 shadow-lg">
  <img src="/images/posts/claude-motion-style-selection.jpeg" alt="בחירת סגנון ויזואלי ותרשימים ב-Claude" class="w-full rounded-xl m-0 border-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">קלוד מנתח את הנתונים ומציע כרטיסי קונספט לסגנון הדשבורד והאנימציה</p>
</div>

### איך עובד תהליך החיבור בפועל?

המתודולוגיה מורכבת ממהלך דו-שלבי חכם:

1. **שלב ראשון: יצירת דשבורד ה-KPIs ב-Claude**:
   מעלים לשיחה קובץ נתונים (CSV או טבלת אקסל) ומבקשים מקלוד:
   ```text
   Analyze this spreadsheet. Build an interactive KPI dashboard highlighting:
   1. Month-over-month ARR growth
   2. Churn rate reduction
   3. The single biggest bottleneck in our sales funnel
   Make it clean, using modern cards and dark mode styling.
   ```
   קלוד מייצר Artifact ויזואלי אינטראקטיבי שבו הנתונים מסודרים בכרטיסיות, גרפים ואינדיקטורים.

2. **שלב שני: הפעלת פקודת Motion להנפשת הדשבורד**:
   לאחר שהדשבורד מוכן והנתונים מיושרים, שולחים את הפרומפט של חסיד:
   ```text
   /motion Turn the key metrics from this dashboard into a 20-second animated story.
   Start by revealing the ARR jump from $1.2M to $2.4M with a ticking counter.
   Scene 2: Show the churn drop line chart drawing itself.
   Scene 3: Highlight the bottleneck resolved.
   End on: "Q4 Targets Met 3 Weeks Ahead of Schedule."
   ```

כאשר מזינים את הדשבורד כקלט ל-Motion, קלוד אינו צריך "להמציא" נתונים או לייצר אנימציות גנריות. הוא משתמש בערכים המדויקים, בצבעי ההיררכיה ובמבנה הגרפי שכבר נבנו, ומפיק סרטון מונפש שבו עקומות הגרף נמתחות מעצמן (Self-drawing paths), המספרים רצים ונעצרים על הערך הנכון, וכרטיסי המידע נפתחים באפקט Spring Easing מלוטש.

---

## 4. מדריך עבודה מעשי: מנתונים גולמיים לקובץ MP4 מוגמר

כדי שתוכלו ליישם את השיטה של רובן חסיד כבר בדוח הבא שלכם, הנה תהליך העבודה שלב-אחר-שלב:

### שלב א': ניקוי הנתונים וזיקוק המסר
הטעות הנפוצה ביותר היא העלאת קובץ אקסל עם 40 עמודות ו-500 שורות. מודל השפה יעבוד שעות ויבזבז טוקנים מיותרים (ראו עוד ב-[מדריך חיסכון בטוקנים ועקיפת מגבלות ב-Claude](/posts/2026-10-07-claude-limits-token-optimization-guide)).
סננו מראש רק את 3 עד 5 שורות הסיכום שחשובות להחלטה הניהולית.

### שלב ב': הרכבת הפרומפט והרצת הפקודה
העתיקו את תבנית 7 השורות של רובן חסיד, מלאו את הפרמטרים בסוגריים המרובעים, וצרפו את לוגו החברה וקוד הצבע (HEX) הראשי שלכם (למשל: `#6366F1` לכחול אינדיגו או `#10B981` לירוק צמיחה).

### שלב ג': דיוק בציר הזמן באמצעות לשונית Tweaks
לאחר שקלוד מרנדר את הסרטון הראשוני, תראו לצד נגן הווידאו את לשונית ה-Tweaks. חסיד ממליץ להשתמש בה עבור שלושה דברים עיקריים:
* **התאמת מהירות (Pacing)**: אם סצנה מרגישה אטית או מהירה מדי, ניתן לכוונן את משך הזמן שלה בחלקיקי שניות.
* **עריכת תוויות טקסט**: שינוי ניסוח של כותרת מבלי להריץ מחדש את כל שלד האנימציה.
* **שליטה על צבעים**: החלפת צבע הדגש (Accent Color) במידה והניגודיות מול הרקע אינה מספקת.

<div class="my-6 rounded-2xl overflow-hidden border border-border/80 bg-card p-3 shadow-lg">
  <img src="/images/posts/claude-motion-ui-timeline-tweaks.jpeg" alt="עריכת סצנות בציר הזמן של Claude Motion" class="w-full rounded-xl m-0 border-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">כוונון זמנים, טקסטים ואפקטים בלשונית Tweaks ללא צורך ברינדור חוזר</p>
</div>

### שלב ד': ייצוא לפורמט הנכון
בסיום העריכה, לחצו על כפתור הייצוא ובחרו בפורמט המתאים:
* **MP4 (1080p, 60fps)**: מושלם להקרנה על מסכים גדולים, מצגות Keynote או העלאה כפוסט וידאו בלינקדאין ו-X.
* **GIF באיכות גבוהה**: אידיאלי להטמעה ישירה בגוף מיילים לעובדים או ללקוחות, וכן לדפי עדכוני מוצר (Changelog).

---

## 5. חוקי הברזל של רובן חסיד לקצב, טיפוגרפיה ועומס קוגניטיבי

רובן חסיד מדגיש כי ההבדל בין סרטון שגורם לאנשים לעצור את הגלילה לבין סרטון שממשיכים הלאה ממנו טמון בפרטים הקטנים של חוויית המשתמש והפסיכולוגיה הוויזואלית:

```
┌─────────────────────────────────────────────────────────────┐
│              עקרון 20 השניות של רובן חסיד                    │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  סצנה 1      │  סצנה 2      │  סצנה 3      │  סצנה 4        │
│  0-5 שניות   │  5-10 שניות  │  10-15 שניות │  15-20 שניות   │
├──────────────┼──────────────┼──────────────┼────────────────┤
│  הוק (Hook)  │  נתון ליבה   │  ההשפעה      │  קריאה לפעולה  │
│  3-4 מילים   │  גרף מונפש   │  מדד צמיחה   │  מסר סיום      │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

### 1. מקסימום 4 עד 6 מילים בסצנה אחת
אם הצופה צריך לקרוא משפט של 15 מילים ב-4 שניות, הוא לא מספיק להסתכל על הגרף. הטקסט צריך לתפקד ככותרת עיתונאית קצרה: *"ARR חצה את ה-$2M"*, ולא *"במהלך הרבעון האחרון הצלחנו להביא לגידול משמעותי בהכנסות השנתיות החוזרות"*.

### 2. היררכיה טיפוגרפית קיצונית (Extreme Typographic Hierarchy)
השתמשו בגודל גופן ענק למספר המרכזי (למשל `84px` למספר `+142%`), ובגופן קטן ורגוע לתווית שמתחתיו (`20px`). העין האנושית צריכה לקלוט את המסר תוך 200 מילי-שניות.

### 3. פיזיקה של תנועה (Spring Easing) במקום מעברים מכניים
אחת התלונות על סרטוני AI היא שהם נראים "רובוטיים". על ידי הגדרת עקומות האצה טבעיות (Spring physics), אלמנטים מגיעים למיקומם עם בלימה רכה ועדינה, מה שמשדר תחושה של מוצר יוקרתי ומעוצב היטב.

### 4. הימנעות מקליפ-ארט ואלמנטים מצוירים
דוחות עסקיים צריכים לשדר סמכותיות. הימנעו מאיורי קומיקס צבעוניים או אנימציות מצוירות. הישארו בקו נקי של ממשקי משתמש מודרניים: כרטיסיות עם צללים רכים, רקע כהה עמוק, ופסי התקדמות אלגנטיים.

---

## 6. השוואה מקיפה: פורמט מסורתי מול Claude Motion

כדי להבין את עוצמת השינוי, הנה השוואה ישירה בין השיטות המקובלות להצגת מידע עסקי לבין שיטת ה-Motion של רובן חסיד:

| פרמטר להשוואה | דוח PDF / טבלת נתונים | מצגת שקופיות (PPTX) | Claude Motion + Dashboard |
| :--- | :--- | :--- | :--- |
| **זמן הפקה ממוצע** | 2–4 שעות כתיבה ועיצוב | 3–6 שעות של בניית שקופיות | **3–5 דקות בפרומפט מובנה** |
| **אחוז צפייה ושימור** | נמוך (רפרוף של 10–20 שניות) | בינוני (דפדוף חלקי) | **גבוה במיוחד (90%+ משלימים 20 שניות)** |
| **עומס קוגניטיבי** | גבוה מאוד (עשרות נתונים בו-זמנית) | בינוני-גבוה | **מינימלי (נתון אחד בכל סצנה)** |
| **אימפקט בלינקדאין ורשתות** | אפסי (אף אחד לא קורא PDF) | תמונת קרוסלה סטטית | **אלגוריתם הווידאו מעניק חשיפה אורגנית מקסימלית** |
| **יכולת עדכון נתונים** | דורש עריכה מחדש של המסמך | עדכון ידני של תיבות טקסט | **עריכה ישירה בלשונית ה-Tweaks** |

---

<div class="rounded-3xl border border-accent/40 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent p-7 my-8 shadow-xl">
<div class="font-bold text-lg text-foreground mb-2 flex items-center gap-2">
  <span>💡</span> השורה התחתונה
</div>
<p class="text-base text-foreground/90 leading-relaxed m-0">
השיטה של רובן חסיד מוכיחה שתקשורת עסקית ב-2026 איננה נמדדת בכמות העמודים שתייצרו, אלא ברמת הבהירות שבה תעבירו את התובנה המרכזית שלכם. היכולת של Claude Motion להפוך גיליונות נתונים מייגעים לסיפורים ויזואליים מונפשים תוך 20 שניות היא יתרון תחרותי חסר תקדים. אמצו את נוסחת 7 השורות, הקפידו על רעיון אחד לכל סצנה, והפכו כל ישיבת הנהלה או פוסט לינקדאין לחוויה שלא ניתן להתעלם ממנה.
</p>
</div>

---

<div class="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-amber-500/10 border border-indigo-500/30 text-center not-prose shadow-lg">
  <span class="inline-block px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold mb-3 border border-indigo-500/30">⚡ הטבה בלעדית לקוראי עולם ה-AI</span>
  <h3 class="text-xl sm:text-2xl font-bold text-foreground mb-3">שדרגו את יכולות ה-AI שלכם עם Google AI Pro במחיר מוזל</h3>
  <p class="text-sm sm:text-base text-foreground/85 mb-6 max-w-2xl mx-auto leading-relaxed">
    הצטרפו לאלפי מנהלים, יוצרי תוכן ואנשי שיווק שעובדים עם מנוי Google AI Pro ל-18 חודשים: מודלי Gemini המתקדמים ביותר, חלון הקשר ענק, כלי אוטומציה חכמים ו-5TB אחסון Google Drive בעלות חד-פעמית חסרת תקדים.
  </p>
  <a 
    href="https://google-ai-pro-drab.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95 no-underline"
  >
    <span>לרכישת מנוי Google AI Pro בהנחה מיוחדת ←</span>
  </a>
</div>

---

<div class="my-10 not-prose">
<div class="mb-4">
<h3 class="text-2xl font-bold text-foreground">מדריכים נוספים שאולי יעניינו אותך:</h3>
<p class="text-sm text-muted-foreground mt-1">הרחיבו את ארגז הכלים שלכם עם המדריכים המובילים באתר:</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">

<a href="/posts/2026-10-11-claude-motion-graphics-guide" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/claude-motion-hero.png" alt="מדריך Claude Motion המלא" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">מדריך וידאו ועיצוב · Claude</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">מדריך Claude Motion: יצירת אנימציות וסרטוני Motion Graphics באיכות אפל</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">המדריך הטכני המלא ליצירת סרטוני מוצר מונפשים מקוד ישירות בתוך הצ'אט של claude.ai.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

<a href="/posts/2026-10-07-claude-limits-token-optimization-guide" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/claude-limits-hero.png" alt="מדריך אופטימיזציית טוקנים ב-Claude" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">פרודוקטיביות · Claude</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">איך לעקוף את מגבלות ה-Rate Limit של Claude: מדריך 22 הכללים</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">הבנת מנגנון ה-Cache, כיול Effort נכון וחיסכון של עד 80% בטוקנים בעבודה יומיומית.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

<a href="/posts/2026-10-03-how-to-set-up-claude-guide" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/claude-setup-hero.jpg" alt="מדריך הגדרת חשבון ופרויקטים ב-Claude" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">הדרכה למתחילים · Claude</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">איך להגדיר את Claude לעבודה מקצועית: פרויקטים, סגנונות והנחיות מותאמות</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">הגדרת Projects, שמירת House Style והטמעת קבצי תצורה להפקת תוצאות מדויקות.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

</div>
</div>

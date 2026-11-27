---
title: "צוואר הבקבוק הוא לא ה-AI, אלא הזמן שלוקח לקרוא אותו: איך להוציא מ-Claude החלטות ב-10 שניות"
description: "אם גם אתם מריצים הכל דרך Claude אבל מוצאים את עצמכם קוראים אלפי מילים במקום להחליט – הנה הפרומפט והסקיל שיאלצו את המודל לתת שורה תחתונה לפעולה ב-10 שניות."
pubDatetime: 2026-11-27T10:00:00+02:00
author: עולם ה AI
tags:
  - Claude
  - פרומפטים
  - פרודוקטיביות
  - כלי AI
  - סוכני AI
featured: true
draft: false
ogImage: /images/posts/2026-11-27-claude-reading-bottleneck-decision-prompt-guide.jpg
---

<div class="zero-click-box">
  <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(14, 165, 233, 0.3); padding-bottom: 0.8rem; flex-wrap: wrap;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; background: #0284c7; color: #ffffff; border-radius: 10px; font-size: 1.15rem; font-weight: 800; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.4);">⚡</span>
      <span style="font-weight: 900; font-size: 1.25rem; color: #0284c7; letter-spacing: -0.3px;">תמצית המדריך (Zero-Click Answer)</span>
    </div>
    <span style="background: rgba(2, 132, 199, 0.15); color: #0284c7; font-weight: 800; font-size: 0.85rem; padding: 0.35rem 0.9rem; border-radius: 9999px; border: 1px solid rgba(2, 132, 199, 0.35);">⏱️ קריאה מהירה • 45 שניות</span>
  </div>
  <p style="font-size: 1.15rem; line-height: 1.7; margin: 0 0 1rem 0; font-weight: 500;">
    <strong>מלכודת הקריאה ב-AI:</strong> ככל שאנחנו מעבירים יותר משימות ליבה (אסטרטגיה, גיוס, כספים, קוד) ל-Claude, צוואר הבקבוק עובר מהפקת התוכן אל הזמן שלוקח לנו <strong>לקרוא ולנתח את התשובות</strong>. לבקש מ-Claude "לתמצת" זו טעות קריטית, כי מודלי חשיבה חייבים מרחב מילים רחב כדי לגבש פתרון נכון ומדויק.
  </p>
  <div class="inner-card" style="border-radius: 12px; padding: 1.1rem 1.4rem; margin-top: 0.6rem;">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.65;">
      💡 <strong>הפתרון האמיתי:</strong> מאפשרים ל-Claude לחשוב ולכתוב עמוק ומלא מעל הקו, אך כופים עליו לסיים בבלוק תחתון של 10 שניות המציג: טבלה תמציתית חזותית, עד 3 החלטות שלקח על עצמו ושניתן לשנות, ושורת הכרעה מפורשת: <strong>"ההכרעה שלכם: / הבחירה שלי: / לחלופין:"</strong>.
    </p>
  </div>
</div>

---

בואו נדבר רגע על הפרדוקס הכי מתסכל של משתמשי AI מתקדמים בשנת 2026:  
התחלנו להשתמש בבינה מלאכותית כדי לחסוך זמן. עברנו לעבוד עם המודלים הכי חזקים שיש – Claude 3.7 Sonnet, Opus, פרויקטים מנוהלים וסוכני אוטומציה. אנחנו מריצים דרכם ניתוחי מתחרים, בדיקות כדאיות פיננסית, כתיבת קוד, חוזים וטיוטות שיווקיות.

ואז מגיעה המציאות ומכה בנו: **אנחנו מבלים חצי מהיום שלנו רק בלקרוא את מה ש-Claude פלט.**

הסוכן מייצר תשובה מעמיקה של 1,500 מילים. היא מנומקת, היא כוללת הסתייגויות, רקע תיאורטי ושיקולים לכאן ולכאן. אבל אתם לא צריכים עוד מאמר אקדמי. אתם צריכים לדעת האם לאשר את התקציב או לדחות אותו, האם לבחור בספק א' או בספק ב', ומה הצעד המיידי הבא.

צוואר הבקבוק בעבודה עם בינה מלאכותית הוא כבר לא מהירות הכתיבה של המודל. **צוואר הבקבוק הוא הזמן שלוקח לכם לקרוא אותו.**

---

## למה הפתרונות הרגילים ("תהיה תמציתי") הורסים את התוצאה?

התגובה האינסטינקטיבית של רוב האנשים שנתקלים בהצפת הטקסט הזו היא להוסיף לפרומפט משפטים כמו:
- *"תענה לי בקצרה."*
- *"תסכם את זה בפסקה אחת."*
- *"בלי הקדמות, תן לי רק את השורה התחתונה."*

זה נשמע הגיוני, אבל בעבודה עם מודלי שפה מודרניים – זו **טעות קריטית**. הנה שתי הסיבות למה זה נכשל פעם אחר פעם:

### 1. Claude צריך לכתוב כדי לחשוב (Chain of Thought)
מודלי שפה אינם מחזיקים "מוח" נפרד שחושב בשקט ורק אז פולט תוצאה מושלמת ומזוקקת. אופן הפעולה שלהם מבוסס על שרשרת חשיבה (Chain of Thought): כל מילה שהמודל פולט מרחיבה את מרחב הזיכרון וההקשר של המילים הבאות. 

ברגע שאתם כופים עליו "לענות במקסימום 50 מילים", אתם מונעים ממנו לנתח תרחישי קצה, לפסול אפשרויות שגויות ולשקול אלטרנטיבות. אתם מקבלים תשובה קצרה – אבל שטחית, נאיבית ולעיתים קרובות פשוט מוטעית.

### 2. תמציות נערמות זו על גבי זו
נניח שביקשתם סיכום של שלוש פסקאות. סיכום אחד זה נחמד. אבל מה קורה כשאתם מריצים 15 או 20 שיחות כאלה במהלך יום עבודה? 

שוב אתם מוצאים את עצמכם קוראים אלפי מילים של "תמציות" מעייפות שדורשות מכם פענוח מנטלי כדי להבין מה בכלל צריך לעשות הלאה.

---

## המתודולוגיה: לתת לו לחשוב עמוק למעלה, לחייב החלטה מהירה למטה

הפתרון הנכון אינו מגביל את מרחב החשיבה של המודל, אלא **מפריד בין שלב העבודה לבין שלב ההחלטה**.

הרעיון פשוט: תנו ל-Claude לעשות את העבודה המלאה. שינתח, שיפרק, שיעשה את כל החישובים, שיטפל במקרי הקצה ושייקח החלטות ביניים בעצמו. 

אבל בסוף התשובה, **הוא מחויב למתוח קו אופקי (`---`) ולייצר בלוק החלטה של 10 שניות**. 

הנה כיצד נראה מבנה התשובה בפועל:

![מבנה התשובה של Claude עם קו מפריד ובלוק החלטה של 10 שניות](/images/posts/claude-tldr/claude-tldr-01-result-layout.png)

הבלוק הזה נבנה כך שתוכלו לדלג על כל מה שנכתב מעליו, ולקבל תמונת מצב מלאה שמורכבת מ-4 רכיבים בלבד:

<div class="bento-grid">
  
  <div class="bento-card card-blue">
    <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">⚡</div>
    <div style="font-weight: 800; font-size: 1.15rem; color: #0284c7; margin-bottom: 0.4rem;">1. כותרת ברורה וחדה</div>
    <p style="font-size: 0.95rem; line-height: 1.6; margin: 0;">
      מגדירה במילים מלאות את הנושא ואת המטרה ללא קיצורים, כך שתוכלו לזהות מיד במה מדובר גם בלי לקרוא שורה אחת מעל הקו.
    </p>
  </div>

  <div class="bento-card card-amber">
    <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">📊</div>
    <div style="font-weight: 800; font-size: 1.15rem; color: #d97706; margin-bottom: 0.4rem;">2. תצוגה חזותית וטבלה</div>
    <p style="font-size: 0.95rem; line-height: 1.6; margin: 0;">
      טבלה תמציתית חזותית או שורות נפרדות עם מרווחים נקיים. <strong>לעולם לא פסקאות טקסט רציפות</strong> שדורשות קריאה מאומצת.
    </p>
  </div>

  <div class="bento-card card-purple">
    <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">🎯</div>
    <div style="font-weight: 800; font-size: 1.15rem; color: #7c3aed; margin-bottom: 0.4rem;">3. מטריצת פעולה ו-3 החלטות</div>
    <p style="font-size: 0.95rem; line-height: 1.6; margin: 0;">
      מה קיים כרגע, עד 3 החלטות שהמודל לקח על עצמו (ממוספרות 1, 2, 3 לשינוי מיידי), ומה נכשל או עדיין לא נבדק.
    </p>
  </div>

  <div class="bento-card card-emerald">
    <div style="font-size: 1.8rem; margin-bottom: 0.5rem;">⚖️</div>
    <div style="font-weight: 800; font-size: 1.15rem; color: #059669; margin-bottom: 0.4rem;">4. שורת הכרעה מפורשת</div>
    <p style="font-size: 0.95rem; line-height: 1.6; margin: 0;">
      מבנה קבוע של: <code>ההכרעה שלכם:</code>, <code>הבחירה שלי:</code>, ו-<code>לחלופין:</code>. אם אין צורך באישור – שורת <code>הצעד הבא:</code> בלבד.
    </p>
  </div>

</div>

---

## תבנית הפרומפט המלאה להעתקה — The Master Prompt

אתם יכולים להוסיף את ההנחיה הזו לכל שיחה חשובה, או להגדיר אותה כהוראת קבע ב-Project Instructions או ב-Claude Custom Instructions שלכם:

<div class="prompt-callout-box">
[היעד: מה אתם רוצים להשיג ולאיזה צורך]
[הקשר: למי זה מיועד, מה כבר קיים אצלכם, ואיך נראית תוצאה מושלמת בעיניכם]
אם חסר לך מידע קריטי, שאל אותי שאלות ממוקדות לפני שאתה מתחיל.

איך לענות בכל תגובה בצ'אט הזה:
בצע קודם כל את כל העבודה המלאה והמעמיקה, באורך ובפירוט הנדרשים. קבל בעצמך את כל החלטות הביניים והמשך ברצף.
לאחר מכן, שים קו מפריד (---), וסיים בבלוק תחתון יחיד שאוכל לקרוא ולהבין ב-10 שניות בלבד, לפי הכללים הבאים:
1. כותרת קצרה המציינת את הנושא ואת המטרה במילים מלאות וברורות (בלי קיצורים).
2. מבנה חזותי בלבד: טבלה אמיתית, שורות קצרות, רווח בין בלוקים. לעולם אל תכתוב פסקאות מלל רציפות.
3. רק מה שדרוש לי כדי לפעול מיד:
   - מה קיים בידינו כעת.
   - עד 3 החלטות שלקחת על עצמך ואשר ייתכן שארצה לשנות (ממוספרות 1, 2, 3).
   - מה נכשל, מה חסר או מה לא אומת.
4. סיום בשורת הכרעה ממוקדת:
   "ההכרעה שלכם:" (השאלה וההקשר שלה בשורה אחת)
   "הבחירה שלי:" (ההמלצה המנומקת שלך במילה אחת או שתיים)
   "לחלופין:" (האלטרנטיבה העיקרית)
   * אם שום דבר אינו דורש את אישורי, כתוב במקום זאת שורה אחת: "הצעד הבא:".
</div>

---

## מדריך צעד-אחר-צעד: איך להעלות את הסקיל לממשק Claude

כדי שלא תצטרכו להדביק את הפרומפט הארוך הזה בכל שיחה מחדש, הדרך האלגנטית ביותר היא להתקין אותו כ-**Skill** רשמי ב-Claude. כך, פקודה פשוטה של <bdi dir="ltr"><code>/tldr</code></bdi> בתחילת ההודעה שלכם תפעיל אוטומטית את כל המנגנון.

הנה תהליך ההתקנה בליווי צילומי מסך מתוך הממשק:

### שלב 1: גישה לדף הסקיל והורדתו
גשו לדף הסקיל הייעודי להורדת קובץ ההגדרה:

<div style="background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%); border: 2px solid #0284c7; border-radius: 14px; padding: 1.5rem; margin: 1.5rem 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
  <div>
    <div style="font-weight: 800; font-size: 1.15rem; color: #0284c7; margin-bottom: 0.3rem;">📦 קובץ Skill רשמי ל-Claude (/tldr)</div>
    <div style="color: #64748b; font-size: 0.95rem;">דף הסקיל והורדת קובץ ההגדרה המוכן להתקנה ישירה בממשק Claude</div>
  </div>
  <a href="https://ronenamos-arch.github.io/claude-skills/skills/tldr/" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.6rem; background: #0284c7; color: #ffffff !important; font-weight: 700; padding: 0.75rem 1.4rem; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);">
    <span>📥 למעבר והורדת ה-Skill בחינם ←</span>
  </a>
</div>

### שלב 2: כניסה לתפריט ההגדרות
בממשק Claude, לחצו על תפריט הצד, עברו להגדרות **Customize**, ולחצו על כפתור **+ Add**:

![כניסה לתפריט Customize ולחיצה על Add Skill](/images/posts/claude-tldr/claude-tldr-03-customize-add.png)

### שלב 3: בחירה בהעלאת Skill
בתפריט שייפתח, בחרו באפשרות **Upload skill**:

![לחיצה על אפשרות העלאת Skill בממשק](/images/posts/claude-tldr/claude-tldr-04-upload-skill-btn.png)

### שלב 4: פתיחת חלון ההעלאה
בחלון המודאלי שמופיע, לחצו על שטח ההעלאה כדי לבחור קובץ מתוך המחשב:

![חלון העלאת סקיל חדש לממשק Claude](/images/posts/claude-tldr/claude-tldr-05-upload-modal.png)

### שלב 5: בחירת הקובץ מתיקיית ההורדות
גשו לתיקיית ההורדות שלכם ובחרו את קובץ ה-Skill שהורדתם:

![בחירת קובץ ה-Skill מתיקיית ההורדות במחשב](/images/posts/claude-tldr/claude-tldr-06-select-file.png)

### שלב 6: אישור והתקנה
לחצו על **Upload**. ה-Skill יתווסף מיד לרשימת המיומנויות הפעילות שלכם:

![ה-Skill מותקן ופעיל ברשימת המיומנויות של Claude](/images/posts/claude-tldr/claude-tldr-07-skill-installed.png)

### שלב 7: פתיחת צ'אט חדש והרצה עם <bdi dir="ltr"><code>/tldr</code></bdi>
פתחו שיחה חדשה, הקלידו את הפקודה <bdi dir="ltr"><code>/tldr</code></bdi> בתחילת ההודעה, ולאחר מכן כתבו את הבקשה או הדביקו את המסמך שלכם:

![פתיחת שיחה חדשה והקלדת פקודת tldr בתחילת הפרומפט](/images/posts/claude-tldr/claude-tldr-08-new-chat-tldr.png)

---

## דוגמה חיה מהשטח: הרצת הסקיל על תוכנית צמיחה עסקית

בואו נראה איך זה עובד במציאות הישראלית. הנה דוגמה מעשית מהשטח: שאלת ניהול מורכבת של משרד רואי חשבון קטן שרוצה לצמוח.

הפרומפט שהוזן ל-Claude עם הקידומת <bdi dir="ltr"><code>/tldr</code></bdi>:

> */tldr אני רו"ח עם משרד קטן: שתי עובדות ו-60 לקוחות. אני רוצה לפתח את העסק: להוסיף שירותי ייעוץ, להגיע ל-100 לקוחות ולהפסיק לעבוד בערבים. איך עושים את זה?*

### 1. מעל הקו: ניתוח העומק המלא
Claude לא מקצר בתהליך החשיבה. הוא מבצע ניתוח יסודי של המצב הקיים (60 לקוחות שמייצרים כ-54,000 ₪ לחודש), מפרק את שלבי המעבר לשירותי ייעוץ במחיר קבוע (1,500 ₪ לחודש), מנתח גיוס של 40 לקוחות נוספים דרך שת"פים ותוכן, ומגדיר שעות פגישות קשיחות כדי לצאת מהערבים:

![הרצת הסקיל tldr בעברית: פרומפט הבקשה וניתוח העומק מעל הקו](/images/posts/claude-tldr/claude-tldr-cpa-example-prompt.jpg)

### 2. מתחת לקו: בלוק ההחלטה של 10 שניות
מיד לאחר ניתוח הסיכונים והמדדים החודשיים, מופיע הקו המפריד (`――――――――――――`) ואחריו בלוק ההחלטה התמציתי:

![תוצאת הסקיל tldr: בלוק ההחלטה התמציתי מתחת לקו עם טבלה ושורת הכרעה מפורשת](/images/posts/claude-tldr/claude-tldr-cpa-example-decision.jpg)

שימו לב לרמת הדיוק של הבלוק:
* **טבלה תמציתית:** 3 שלבים ברורים (ייעוץ קודם, עובד שלישי, 100 לקוחות) עם מספרים ויעדים ברורים (1,500 ₪ לחודש, חודשים 6-9, חודשים 9-12).
* **החלטות שלקח בשבילכם (שניתן לשנות במילה):** 1. מתחילים מייעוץ ללקוחות קיימים ללא עלות גיוס; 2. מחיר קבוע של 1,500 ₪ ולא תמחור שעתי; 3. בלי פגישות אחרי 16:00 מהחודש הראשון.
* **מה לא נבדק:** עלות העסקה של עובד שלישי והאם 1,500 ₪ מתאימים למגזר הלקוחות שלכם.
* **תיבת ההכרעה הסופית:**
  * **ההחלטה שלך:** לגייס עובד שלישי כבר עכשיו, או רק אחרי חמישה לקוחות ייעוץ?
  * **הבחירה שלי:** אחרי חמישה לקוחות, כדי שההכנסה תכסה את המשכורת.
  * **או:** עכשיו, מה שמשחרר אותך מהערבים מהר יותר, אבל עם סיכון שהמשכורת תקדים את ההכנסה.

במקום לקרוא עמודים שלמים, קיבלתם בתוך **10 שניות** תמונת מצב חדה והכרעה ברורה שמוכנה לפעולה.

---

## 🎁 משאבים משלימים מחנות המדריכים שלנו

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

  <!-- Ebook Prompting -->
  <div style="background: rgba(14, 165, 233, 0.05); border: 1px solid rgba(14, 165, 233, 0.3); border-radius: 14px; padding: 1.6rem; display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <div style="display: inline-block; background: #0284c7; color: #ffffff; font-size: 0.8rem; font-weight: 800; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 0.8rem;">ספר דיגיטלי • 415 עמודים להורדה חינם</div>
      <h3 style="margin: 0 0 0.6rem 0; font-size: 1.25rem; font-weight: 800;">ספר הפרומפטים העולמי</h3>
      <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 1.2rem 0;">
        מדריך דיגיטלי מקיף להנדסת פרומפטים: יסודות מאפס ועד Advanced, שרשראות חשיבה (CoT), פלטי JSON מובנים וסוכני AI.
      </p>
    </div>
    <a href="https://ronenamos.gumroad.com/l/interactive-book-of-prompting" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 800; text-decoration: underline; font-size: 0.95rem;">
      להורדת ספר הפרומפטים הדיגיטלי בחינם מחנות המדריכים שלנו ←
    </a>
  </div>

  <!-- 50 Copilot Prompts Guide -->
  <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 14px; padding: 1.6rem; display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <div style="display: inline-block; background: #059669; color: #ffffff; font-size: 0.8rem; font-weight: 800; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 0.8rem;">בנק 50 פרומפטים מוכנים • להורדה חינם</div>
      <h3 style="margin: 0 0 0.6rem 0; font-size: 1.25rem; font-weight: 800;">50 הנחיות Copilot לעבודה ולאופיס</h3>
      <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 1.2rem 0;">
        בנק מקיף של 50 פרומפטים מוכנים ל-Excel, PowerPoint, Word, Outlook ו-Teams שהופכים את Copilot מעוזר בסיסי למנוע עבודה אמיתי.
      </p>
    </div>
    <a href="https://ronenamos.gumroad.com/l/50-copilot" target="_blank" rel="noopener noreferrer" style="color: #059669; font-weight: 800; text-decoration: underline; font-size: 0.95rem;">
      להורדת 50 הנחיות Copilot בחינם מחנות המדריכים שלנו ←
    </a>
  </div>

</div>

---

## 📚 פוסטים נוספים ששווה לקרוא

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem; margin: 2rem 0;">

  <div style="background: rgba(255, 255, 255, 0.04); border-radius: 12px; padding: 1.3rem; border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
    <div style="font-size: 0.8rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.5rem;">מדריך פרומפטים מתקדם</div>
    <h3 style="margin: 0 0 0.6rem 0; font-size: 1.15rem; line-height: 1.4;"><a href="/posts/2026-11-24-how-to-get-original-answers-from-ai/" style="color: inherit; text-decoration: none;">למה מודלי AI נותנים לכולם את אותה תשובה? (ו-4 רמות לחילוץ מידע מקורי)</a></h3>
    <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0;">איך לפרק את מלכודת הטמפרטורה ולחלץ תובנות חדות וייחודיות מכל מודל שפה.</p>
  </div>

  <div style="background: rgba(255, 255, 255, 0.04); border-radius: 12px; padding: 1.3rem; border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px);">
    <div style="font-size: 0.8rem; color: #38bdf8; font-weight: 700; margin-bottom: 0.5rem;">ספר הדרכה אישי</div>
    <h3 style="margin: 0 0 0.6rem 0; font-size: 1.15rem; line-height: 1.4;"><a href="/posts/2026-11-24-build-personal-ai-handbook-guide/" style="color: inherit; text-decoration: none;">איך לבנות ספר הדרכה אישי ב-AI: חיסכון של שעות עבודה</a></h3>
    <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5; margin: 0;">מדריך מעשי לבניית קובץ Context מרכזי שישמור את הידע, התהליכים והסגנון שלכם.</p>
  </div>

</div>

---

## שאלות ותשובות נפוצות (FAQ)

### האם השיטה הזו עובדת גם ב-ChatGPT וב-Gemini?
בהחלט כן. אף על פי שההנחיה וה-Skill תוכננו במקור עבור הדיוק והעומק של מודלי Claude, עקרון הפיצול בין חשיבה חופשית לבין בלוק החלטה מובנה עובד בצורה זהה ב-ChatGPT (כולל מודלי o1 ו-o3) וכן ב-Google Gemini 1.5 Pro.

### למה לא להשתמש ב-Artifacts של Claude עבור התוצאה?
אפשר בהחלט לשלב! אם מדובר בטבלה מורכבת במיוחד או בתוכנית פעולה רב-שלבית, תוכלו להנחות את Claude ליצור את בלוק ההחלטה כ-Artifact ייעודי. עם זאת, עבור רוב ההחלטות היומיומיות, הצגת הבלוק בסוף הצ'אט מאפשרת מעבר מהיר לפעולה בלי צורך לפתוח חלון נוסף.

### מה קורה אם Claude מקבל החלטת ביניים שאינה מקובלת עליי?
זה בדיוק היתרון של הסעיף הממוספר בבלוק ההחלטה ("עד 3 החלטות שלקחת על עצמך"). במקום להסביר מחדש את כל הנושא, אתם פשוט כותבים לו: *"תשנה את החלטה מס' 2 ותחשב מחדש לפי תקציב של 15,000 ₪"*. המודל מעדכן מיד את הבלוק בלי לבזבז זמן.

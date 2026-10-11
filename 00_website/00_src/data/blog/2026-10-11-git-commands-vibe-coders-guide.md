---
title: "12 פקודות Git שכל Vibe Coder חייב להכיר: מדריך הישרדות מעשי עם דוגמאות חיות"
description: "המדריך המקיף בעברית ל-12 פקודות Git החיוניות לשליטה בקוד ש-Claude Code וסוכני AI כותבים: שמירה, ביטול טעויות, עבודה עם Branches, Worktrees וצ'יט-שיט להורדה."
pubDatetime: 2026-10-11T16:25:00+03:00
author: צוות עולם ה-AI
tags:
  - Git
  - Claude Code
  - Vibe Coding
  - כלי AI
  - מדריכים
  - פרודוקטיביות
featured: true
draft: false
ogImage: /images/posts/git-commands/hero-og.jpg
faqs:
  - question: "האם Git ו-GitHub הם אותו הדבר?"
    answer: "ממש לא. Git היא מערכת ניהול הגרסאות המקומית הפועלת על המחשב שלך ללא צורך באינטרנט. GitHub הוא אתר ושירות ענן ששומר גיבוי של ההיסטוריה שלך ומאפשר שיתוף פעולה וסנכרון."
  - question: "האם Claude Code מריץ פקודות Git בעצמו?"
    answer: "כן, כאשר מבקשים ממנו בשפה חופשית. לדוגמה, אם תאמר לו 'Save a checkpoint', הוא יריץ git add ו-git commit עם תיאור מתאים. מטרת המדריך היא שתבינו בדיוק מה הסוכן עושה ותדעו לבקר אותו."
  - question: "מה ההבדל בין git restore לבין git revert?"
    answer: "הפקודה git restore זורקת שינויים שטרם נשמרו ב-Commit, והם נמחקים לצמיתות. הפקודה git revert מבטלת שמירה שכבר נעשתה (אפילו אם נדחפה לענן) על ידי הוספת שמירה חדשה שהופכת את השינוי."
  - question: "האם git restore ימחק קבצים חדשים ש-Claude יצר?"
    answer: "לא. git restore מחזיר רק קבצים ש-Git כבר עוקב אחריהם. קבצים חדשים לגמרי (Untracked) נשארים בתיקייה, ויש למחוק אותם ידנית אם אינכם מעוניינים בהם."
  - question: "מה לעשות אם העליתי בטעות קובץ .env עם מפתחות API ל-GitHub?"
    answer: "קודם כל יש לבטל מיד (Revoke/Rotate) את מפתח ה-API בממשק השירות. מחיקת הקובץ בלבד אינה מספיקה כי המפתח יישאר בהיסטוריה. לאחר מכן מוסיפים את .env לקובץ .gitignore ומריצים git rm --cached .env."
  - question: "האם אני צריך Branches אם אני עובד לבד כ-Vibe Coder?"
    answer: "חד-משמעית כן. ענף (Branch) עולה פקודה אחת בלבד, ומבטיח שהגרסה היציבה שעובדת לעולם לא תיהרס בזמן שה-AI מפתח רעיון ניסיוני."
---

> **תקציר מנהלים (בשורה אחת):** כלי AI כמו Claude Code, Cursor ו-Windsurf כותבים קוד מהר יותר ממה שבן אנוש מסוגל לקרוא. כדי לשלוט בתוצאה ולא להסתכן בהרס הפרויקט או בהדלפת מפתחות, אינכם צריכים ללמוד 150 פקודות Git מסובכות – אתם צריכים בדיוק **12 פקודות מפתח**, הבנה של 4 מיקומי הקוד, והנחיות מילוליות מדויקות (Prompts) שתוכלו לתת לסוכן ה-AI כדי שהוא יבצע אותן עבורכם.

<div class="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-amber-500/10 p-7 my-8 shadow-xl">
<div class="flex items-center gap-3 mb-4">
  <span class="p-2 rounded-xl bg-indigo-500 text-white font-bold text-base shadow-md">⚡ תמצית מנהלים (Zero-Click Answer)</span>
  <h3 class="text-xl font-bold text-foreground m-0">12 פקודות Git שכל Vibe Coder חייב לשלוט בהן</h3>
</div>
<p class="text-base text-foreground/90 leading-relaxed mb-4">
כשעובדים עם סוכני תכנות אוטונומיים, Git הוא רשת הביטחון הקריטית ביותר שלכם: הוא מאפשר לראות שינויים לפני אישור (<code>git diff</code>), להשליך לפח קוד שגוי (<code>git restore .</code>), לערוך ניסויים בטוחים (<code>git switch -c</code>), לבטל בבטחה שמירות שנשברו (<code>git revert</code>), ולעבוד עם סוכנים מרובים במקביל ב-Worktrees.
</p>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
<div class="border-b md:border-b-0 md:border-l border-border/80 pb-4 md:pb-0 md:pl-6">
<div class="font-bold text-indigo-400 mb-1.5 flex items-center gap-1.5">
  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
  1. מחזור השמירה והאבטחה
</div>
<div class="text-foreground/90 text-sm leading-relaxed">הגנה על קובצי <code>.env</code> עם <code>.gitignore</code>, ביצוע שמירות תכופות עם <code>add</code> ו-<code>commit</code>, וגיבוי לענן עם <code>push</code>.</div>
</div>
<div class="border-b md:border-b-0 md:border-l border-border/80 pb-4 md:pb-0 md:pl-6">
<div class="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
  <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
  2. סקירת קוד וביטול טעויות
</div>
<div class="text-foreground/90 text-sm leading-relaxed">שימוש ב-<code>diff</code> כביקורת עמיתים מול ה-AI, וביטול שינויים לא רצויים בלחיצה אחת עם <code>restore</code> או <code>revert</code>.</div>
</div>
<div>
<div class="font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">
  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
  3. פיצ'רים ניסיוניים וסוכנים מקבילים
</div>
<div class="text-foreground/90 text-sm leading-relaxed">עבודה על Branches נפרדים להגנה על ה-Main, והרצת סוכני Claude Code מקבילים באמצעות Worktrees.</div>
</div>
</div>
</div>

---

## צפו בהדרכה המקורית המלאה בוידאו

מדריך זה מבוסס על הניסוי והסרטון המצוין של **חסן (LearnWithHasan)**, שבו נבנתה אפליקציית מעקב ההרגלים **Rings** בזמן אמת מול Claude Code:

<div class="my-8 overflow-hidden rounded-2xl border border-border shadow-lg aspect-video max-w-4xl mx-auto">
  <iframe
    class="w-full h-full"
    src="https://www.youtube-nocookie.com/embed/pcJPhoaC4Jc"
    title="12 Git Commands Every Vibe Coder Needs to Know"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

---

## טבלת 12 הפקודות המרוכזת (Cheat Sheet)

לפני שנצלול לקרביים של כל פקודה, הנה הטבלה המלאה שתוכלו לשמור במועדפים. לכל פקודה מופיעה הפעולה בשפה פשוטה, ומה הפרומפט המדויק שתוכלו לומר ל-Claude Code במקום להקליד אותה ידנית:

| # | פקודה | מה היא עושה במילים פשוטות | מה אומרים ל-Claude / AI |
| :-: | :--- | :--- | :--- |
| **1** | `git init` | מתחיל מעקב גרסאות בתיקייה (פעם אחת לפרויקט) | *"Start tracking this project with git"* |
| **2** | `git status` | מציג מה השתנה בקבצים מאז השמירה האחרונה | *"What changed?"* |
| **3** | `git add .` | מכין את כל השינויים הנוכחיים לשמירה הבאה (Staging) | *"Stage these changes"* |
| **4** | `git commit -m "msg"` | מייצר שמירה רשמית בהיסטוריה עם הודעת הסבר | *"Save a checkpoint"* |
| **5** | `git push` | מעלה ומגבה את כל השמירות ל-GitHub | *"Back it up to GitHub"* |
| **6** | `git diff` | מציג במדויק כל שורה שנוספה (ירוק) או נמחקה (אדום) | *"Show me exactly what you changed"* |
| **7** | `git restore .` | זורק לפח את כל השינויים שטרם נשמרו ומחזיר למצב הקודם | *"Throw away these changes"* |
| **8** | `git switch -c idea` | יוצר ענף צדדי חדש ועובר אליו לפיתוח ניסיוני בטוח | *"Try this on a new branch"* |
| **9** | `git merge idea` | ממזג את השינויים המוצלחים מהענף לתוך הענף הראשי | *"Bring that branch into main"* |
| **10** | `git log --oneline` | מציג היסטוריה תמציתית של כל השמירות שבוצעו | *"Show me the saves"* |
| **11** | `git revert --no-edit <id>` | מייצר שמירה חדשה שמבטלת שמירה קודמת שהשתבשה | *"Undo that save"* |
| **12** | `git pull` | מושך את הגרסה העדכנית ביותר מ-GitHub לתיקייה שלך | *"Get the latest from GitHub"* |

<div class="my-8 text-center">
  <div class="rounded-2xl border border-indigo-500/30 bg-card p-4 shadow-xl inline-block max-w-2xl">
    <img src="/images/posts/git-commands/cheat-sheet.webp" alt="Git Commands Cheat Sheet for Vibe Coders" class="rounded-xl w-full mx-auto" />
    <div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-muted/40 rounded-xl">
      <span class="text-sm font-semibold text-foreground">רוצים את הצ'יט-שיט באיכות הדפסה מלאה (2160x2700)?</span>
      <a href="/images/posts/git-commands/git-cheat-sheet.png" download class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-md">
        הורדת הצ'יט-שיט (PNG) ⬇️
      </a>
    </div>
  </div>
</div>

---

## התמונה הגדולה: 4 המקומות שבהם הקוד שלך חי

לפני שניגשים לפקודות, חשוב להבין את המודל המנטלי. כשאתם בונים אפליקציה, הקוד שלכם נע תמיד בין **4 מקומות**:

1. **התיקייה המקומית שלך (Your Folder / Working Directory):** הקבצים הפיזיים שנמצאים על המחשב, אלו שאתם וסוכן ה-AI עורכים בכל רגע.
2. **אזור ההכנה לשמירה (Next Save / Staging Area):** התיבה שאליה אתם מכניסים את השינויים הספציפיים שייכללו בשמירה הבאה.
3. **היסטוריית השמירות (History / Commits):** צילומי המצב (Snapshots) הרשמיים שנשמרו ב-Git.
4. **ענן גיטהאב (GitHub / Remote):** עותק גיבוי מקוון של ההיסטוריה שלכם בענן.

שלושת המקומות הראשונים מתקיימים **בתוך המחשב שלכם בלבד** (אין צורך בחיבור אינטרנט). GitHub הוא רק שרת בענן.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       במחשב שלך (מערכת Git המקומית)                        │       בענן
├───────────────────────┬──────────────────────┬──────────────────────────────┼───────────────────┤
│ 1. תיקיית העבודה      │ 2. אזור ההכנה        │ 3. היסטוריית השמירות         │ 4. גיטהאב         │
│    (Your Folder)      │    (Staging Area)    │    (Commits History)         │    (GitHub)       │
└───────────┬───────────┴──────────┬───────────┴──────────────┬───────────────┴─────────┬─────────┘
            │      git add .       │                          │                         │
            ├─────────────────────>│      git commit -m       │                         │
            │                      ├─────────────────────────>│        git push         │
            │                      │                          ├────────────────────────>│
            │<──────────────────────────────────────────────────────────────────────────┤ git pull
            │<─────────────────────┤ git restore .
```

* 5 פקודות מזיזות את הקוד בין המקומות: `add`, `commit`, `push`, `pull`, `restore`.
* 7 הפקודות האחרות מאפשרות לנו לראות מה קורה (`status`, `diff`, `log`) או לנהל את ההיסטוריה עצמה (`init`, `switch`, `merge`, `revert`).

---

## סביבת הניסוי: אפליקציית Rings

כדי להמחיש את הכל, נבנתה אפליקציה קטנה בשם **Rings** (מעקב הרגלים מעוצב עם חוגות). הפרויקט פתוח לצפייה ולתרגול ב-GitHub: [github.com/hassancs91/habit-rings](https://github.com/hassancs91/habit-rings).

<div class="my-6 rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-md">
  <img src="/images/posts/git-commands/app-start.webp" alt="אפליקציית Rings בתחילת העבודה" class="w-full rounded-xl m-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">אפליקציית Rings במצבה הראשוני: לחיצה על כל הרגל ממלאת את החוגה</p>
</div>

אם תרצו להתאמן בעצמכם:
```bash
# שכפלו את הפרויקט (מומלץ לבצע Fork קודם ב-GitHub)
git clone https://github.com/hassancs91/habit-rings.git
cd habit-rings

# התקנת תלויות והרצה (אופציונלי, דורש Node.js)
npm install
npm run dev
```

---

## שלב 1: שמירה וגיבוי (פקודות 1 עד 5)

ללא שמירה, אין לאן לחזור כשדברים משתבשים. לכן שמירה היא הדבר הראשון שלומדים.

### 1. `git init` – התחלת מעקב
מריצים פקודה זו **פעם אחת בלבד** בתוך תיקיית הפרויקט. היא יוצרת תיקייה נסתרת בשם `.git` שבה ינוהלו כל השמירות העתידיות:

```bash
git init
```
**פלט שמתקבל:**
```text
Initialized empty Git repository in D:/repos/habit-rings/.git/
```
💬 **מה אומרים ל-Claude:**
> *"Start tracking this project with git"*

---

### 2. `git status` – מה השתנה?
מריצים בכל רגע נתון כדי לבדוק אילו קבצים שונו, נוספו או נמחקו מאז השמירה האחרונה:

```bash
git status
```
**פלט שמתקבל בפרויקט חדש:**
```text
On branch master
No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.env
	README.md
	index.html
	node_modules/
	package.json
	src/

nothing added to commit but untracked files present (use "git add" to track)
```
💬 **מה אומרים ל-Claude:**
> *"What changed?"*

---

### ⚠️ אזהרת אבטחה קריטית: הגדרת `.gitignore` לפני השמירה הראשונה!

שימו לב לקובץ הראשון ברשימה לעיל: `.env`. בקובץ זה נשמרים מפתחות ה-API הרגישים שלכם (OpenAI, Anthropic, Supabase וכו'). **אם קובץ זה ייכנס לשמירה ויעלה ל-GitHub, המפתחות שלכם חשופים לעולם!**

בוטים סורקים מאגרי קוד ב-GitHub בכל שנייה. מחקרים מוכיחים שמפתחות שדולפים מנוצלים לרעה **בתוך פחות מדקה**.

לכן, ודאו שקיים קובץ בשם `.gitignore` בתיקיית השורש של הפרויקט, ובו השורות הבאות:
```text
.env
node_modules
dist
```

לאחר שמירת הקובץ, הריצו שוב `git status` וראו ש-`.env` ו-`node_modules` נעלמו לחלוטין מהרשימה:
```text
Untracked files:
	.gitignore
	README.md
	index.html
	package.json
	src/
```

> **העליתם כבר בטעות את ה-env.?**
> מחיקת הקובץ בלבד אינה מספיקה כיוון שהוא נשמר בהיסטוריה! קודם כל בטלו (Revoke/Rotate) את מפתח ה-API בממשק החברה. לאחר מכן הריצו:
> `git rm --cached .env` ובצעו שמירה חדשה.

---

### 3. `git add .` – הכנה לשמירה
הפקודה מעבירה את כל השינויים מהתיקייה המקומית לתוך אזור ההכנה (Staging Area). הנקודה (`.`) מסמלת "את כל הקבצים בתיקייה זו":

```bash
git add .
```
הפקודה אינה מדפיסה פלט כשהיא מצליחה. 
💬 **מה אומרים ל-Claude:**
> *"Stage these changes"*

---

### 4. `git commit` – יצירת שמירה רשמית
הופך את כל מה שהוכן בארגז ה-Staging לשמירה קבועה ובלתי מחיקה בהיסטוריה, בליווי הודעה ברורה:

```bash
git commit -m "first working version"
```
**פלט לדוגמה:**
```text
[master (root-commit) 3627a2c] first working version
 14 files changed, 2162 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 index.html
 ...
```
💬 **מה אומרים ל-Claude:**
> *"Save a checkpoint"*

`3627a2c` הוא המזהה הייחודי (Hash) של השמירה הזו. לא משנה מה ה-AI יעשה בהמשך, תמיד תוכלו לחזור לרגע הזה. **אמצו הרגל ברזל: בכל פעם שהאפליקציה עובדת – שומרים Commit.**

---

### 5. `git push` – גיבוי לענן של GitHub
מחשבים ניידים נגנבים, נשפך עליהם קפה או שהדיסק נהרס. `git push` שולח את כל ההיסטוריה השמורה שלכם לענן של GitHub.

בפעם הראשונה יוצרים מאגר ריק ב-GitHub ומקשרים אותו:
```bash
git remote add origin https://github.com/YOUR-USERNAME/habit-rings.git
git branch -M main
git push -u origin main
```
מעתה ואילך, כל מה שצריך להקליד הוא פשוט:
```bash
git push
```
💬 **מה אומרים ל-Claude:**
> *"Back it up to GitHub"*

<div class="my-6 rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-md">
  <img src="/images/posts/git-commands/github-first-push.webp" alt="מאגר הקוד ב-GitHub לאחר ה-Push הראשון" class="w-full rounded-xl m-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">המאגר ב-GitHub: קובץ ה-.gitignore עלה, אך קובץ ה-.env מוגן ולא הועלה כלל</p>
</div>

---

## שלב 2: סקירת קוד וביטול טעויות של ה-AI (פקודות 6 ו-7)

עכשיו מתחיל ה-Vibe Coding האמיתי. כלי AI כותבים עשרות קבצים בדקה. אתם חייבים שתי יכולות קריטיות: לראות בדיוק מה ה-AI שינה, ולזרוק את השינויים לפח אם הם גרועים.

בניסוי שלנו, ניתן ל-Claude Code פרומפט מכוון לייצר בלגן עיצובי:
> *"Give Rings a completely new layout. Go wild and experimental: break the grid, rotate and overlap things, use giant type. Keep it to the files we already have, no new files."*

שלוש דקות לאחר מכן, זה מה שהתקבל:

<div class="my-6 rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-md">
  <img src="/images/posts/git-commands/app-mess.webp" alt="התוצאה השבורה ש-Claude יצר" class="w-full rounded-xl m-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">בדיוק מה שביקשנו בפרומפט – אך ממש לא מה שרצינו באפליקציה</p>
</div>

בדיקת `git status` מראה ש-4 קבצים שונו:
```text
modified:   src/App.tsx
modified:   src/Dial.tsx
modified:   src/Week.tsx
modified:   src/styles.css
```

---

### 6. `git diff` – ביקורת הקוד שלך
מציג שורה אחר שורה את כל מה שהשתנה מאז השמירה האחרונה. שורות עם `-` באדום נמחקו, שורות עם `+` בירוק נוספו:

```bash
git diff
```

<div class="rounded-2xl border border-slate-700 bg-slate-950 p-4 my-4 font-mono text-xs overflow-x-auto shadow-xl text-left" dir="ltr">
  <div class="text-slate-400 border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
    <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
    <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
    <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
    <span class="ml-2 font-semibold">git diff • src/App.tsx</span>
  </div>
  <div class="text-slate-300">
    <span class="text-indigo-400">@@ -52,46 +52,40 @@ export default function App() {</span><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="app"&gt;<br/>
    <span class="text-emerald-400 font-bold">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1 className="wordmark"&gt;Rings&lt;/h1&gt;</span><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;header className="top"&gt;<br/>
    <span class="text-rose-400 font-bold">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="brand"&gt;</span><br/>
    <span class="text-rose-400 font-bold">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;MiniRings fractions={[0.78, 0.6, 0.42]} size={44} /&gt;</span><br/>
    <span class="text-emerald-400 font-bold">+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;MiniRings fractions={HABITS.map((habit) =&gt; fraction(habit, today))} size={44} /&gt;</span>
  </div>
</div>

💬 **מה אומרים ל-Claude:**
> *"Show me exactly what you changed"*

**`git diff` הוא ביקורת הקוד שלכם (Code Review).** ה-AI כותב, אתם קוראים ורואים האם הוא עשה משהו הזוי, ורק אז מחליטים. במקרה הזה – העיצוב החדש היה גרוע.

---

### 7. `git restore .` – זריקת שינויים לפח בלחיצה אחת
הפקודה מוחקת לחלוטין את כל העריכות שטרם נשמרו, ומחזירה את הקבצים בדיוק למצב השמירה האחרון:

```bash
git restore .
```
הפקודה אינה מחזירה פלט. האפליקציה חוזרת מיד לקדמותה, ובדיקת `git status` מדווחת:
```text
nothing to commit, working tree clean
```
💬 **מה אומרים ל-Claude:**
> *"Throw away these changes"*

> **3 דברים ש-git restore אינו עושה:**
> 1. **אין לו Undo:** מה שנמחק ב-restore הלך לתמיד! בדקו קודם עם `git diff`.
> 2. **אינו נוגע בקבצים חדשים לגמרי:** קבצים ש-Claude יצר מאפס (Untracked) יישארו בתיקייה. יש למחוק אותם ידנית.
> 3. **אינו משפיע על קבצים שכבר הועברו ל-Staging:** אם כבר הרצתם `git add`, יש להריץ קודם `git restore --staged .` ולאחר מכן `git restore .`.

---

<div class="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-amber-500/10 border border-indigo-500/30 text-center not-prose shadow-lg">
  <span class="inline-block px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold mb-3 border border-indigo-500/30">⚡ הטבה בלעדית לקוראי עולם ה-AI</span>
  <h3 class="text-xl sm:text-2xl font-bold text-foreground mb-3">מבצע בלעדי: מנוי Google AI Pro (Gemini Advanced) בהנחה ענקית</h3>
  <p class="text-sm sm:text-base text-foreground/85 mb-6 max-w-2xl mx-auto leading-relaxed">
    רוצים להאיץ את פיתוח ה-AI וה-Vibe Coding שלכם? שדרגו את חשבון הגוגל הקיים ל-Google AI Pro: גישה ישירה למודלי Gemini המתקדמים ביותר, חלון הקשר ענק של 2 מיליון טוקנים, 5TB אחסון ענן וסוכני Deep Research ללא הגבלה במחיר מוזל במיוחד.
  </p>
  <a 
    href="https://google-ai-pro-drab.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95 no-underline"
  >
    <span>לרכישת מנוי Google AI Pro בהנחה מיוחדת</span>
    <span class="rtl:rotate-180">←</span>
  </a>
</div>

---

## שלב 3: פיצ'רים ניסיוניים על גבי ענפים (פקודות 8 ו-9)

רוצים לפתח פיצ'ר חדש וגדול? לעולם אל תתנו ל-AI לעשות זאת על הגרסה הראשית (`main`). פתחו ענף צדדי (Branch).

### 8. `git switch -c` – יצירת ענף חדש
יוצר עותק צדדי של ההיסטוריה בשם `streak` ועובר לעבוד עליו:

```bash
git switch -c streak
```
💬 **מה אומרים ל-Claude:**
> *"Try this on a new branch"*

כעת ביקשנו מ-Claude להוסיף פיצ'ר של להבת רצף (Streak Flame) שמציגה כמה ימים רצופים השלמנו את כל החוגות. Claude בנה את הפיצ'ר ושמר אותו.

כעת, שימו לב לקסם. חזרנו לענף הראשי `main`:
```bash
git switch main
```

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
  <div class="rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-md">
    <img src="/images/posts/git-commands/flame-on-branch.webp" alt="הלהבה מופיעה בענף streak" class="w-full rounded-xl m-0" />
    <p class="text-xs text-muted-foreground text-center mt-2 mb-1"><strong>בענף streak:</strong> הלהבה קיימת ופועלת</p>
  </div>
  <div class="rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-md">
    <img src="/images/posts/git-commands/flame-gone-on-main.webp" alt="הלהבה נעלמת בענף main" class="w-full rounded-xl m-0" />
    <p class="text-xs text-muted-foreground text-center mt-2 mb-1"><strong>בענף main:</strong> הלהבה נעלמת בלייב מהאפליקציה הרצה!</p>
  </div>
</div>

הפיצ'ר נעלם מהאפליקציה הרצה ברגע שעברנו ל-`main`. הגרסה היציבה נותרה בטוחה לחלוטין.

---

### 9. `git merge` – מיזוג הענף לתוך הגרסה הראשית
הפיצ'ר נבדק ועובד נהדר? כעת, כשאנחנו נמצאים על ענף `main`, נמזג את השינויים:

```bash
git merge streak
```
**פלט:**
```text
Updating 1047713..219d4f6
Fast-forward
 src/App.tsx    |  4 ++-
 src/Streak.tsx | 85 +++++++++++++++++++
 4 files changed, 192 insertions(+)
 create mode 100644 src/Streak.tsx
```
💬 **מה אומרים ל-Claude:**
> *"Bring that branch into main"*

הלהבה חזרה, והפעם כחלק רשמי מהגרסה הראשית. כעת מריצים `git push` והכל מגובה.

---

## שלב 4: ביטול שמירה שכבר נדחפה לענן (פקודות 10 ו-11)

מה עושים כשפיצ'ר גרוע כבר קיבל `commit` ואפילו נדחף ל-GitHub עם `push`? במצב זה, `git restore` כבר אינו יכול לעזור.

בניסוי, ביקשנו מ-Claude להוסיף חגיגת זיקוקין וקונפטי כשמשלימים את כל החוגות:
> *"Add a celebration when you finish a day, when all three rings are closed. Make it feel amazing: confetti, fireworks, everything. Go all out, and make it last!"*

התוצאה הייתה סופת זיקוקים שנמשכה 14 שניות שלמות והשביתה את השימוש באפליקציה:

<div class="my-6 rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-md">
  <img src="/images/posts/git-commands/celebration-storm.webp" alt="סופת זיקוקין מוגזמת שחוסמת את המסך" class="w-full rounded-xl m-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">סופת זיקוקים של 14 שניות בכל פעם שמסיימים יום – מוגזם ובלתי שמיש</p>
</div>

והבעיה: השינוי כבר נשמר ונדחף ל-GitHub.

---

### 10. `git log` – איתור השמירה הבעייתית
הפקודה מציגה את רשימת השמירות, מהחדשה ביותר לישנה:

```bash
git log --oneline
```
**פלט שמתקבל:**
```text
0baf6d3 (HEAD -> main, origin/main) Add a celebration when you finish a day
219d4f6 Add streak flame next to the dial
1047713 Add undo button to each habit
3627a2c first working version
```
💬 **מה אומרים ל-Claude:**
> *"Show me the saves"*

זיהינו את השמירה הבעייתית: המזהה שלה הוא `0baf6d3`.

---

### 11. `git revert` – ביטול בטוח ללא שכתוב היסטוריה
במקום להשתמש בפקודות מסוכנות כמו `git reset` שמוחקות שורות מההיסטוריה ויכולות לשבור את המאגר לאחר Push, משתמשים ב-**`revert`**: היא מייצרת **שמירה חדשה** שמבצעת בדיוק את הפעולה ההפוכה.

```bash
git revert --no-edit 0baf6d3
```
**פלט שמתקבל:**
```text
[main 7a8dfd2] Revert "Add a celebration when you finish a day"
 4 files changed, 2 insertions(+), 667 deletions(-)
 delete mode 100644 src/Celebration.tsx
 delete mode 100644 src/fireworks.ts
```
💬 **מה אומרים ל-Claude:**
> *"Undo that save"*

כעת מריצים `git push`. האפליקציה נקייה שוב מסופת הזיקוקים, וההיסטוריה ב-GitHub מציגה בדיוק מה קרה:

<div class="my-6 rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-md">
  <img src="/images/posts/git-commands/github-commits-revert.webp" alt="היסטוריית ה-Commits לאחר ביצוע Revert" class="w-full rounded-xl m-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">ההיסטוריה שלמה ושקופה: השמירה הבעייתית והשמירה שמבטלת אותה מופיעות זו לצד זו</p>
</div>

---

## שלב 5: עבודה עם שני סוכנים במקביל וסנכרון (פקודה 12)

מה קורה אם אתם רוצים שסוכן AI אחד יעבוד על פיצ'ר כבד (כמו Dark Mode), בזמן שאתם או סוכן נוסף ממשיכים לעבוד בתיקייה הראשית?

אם שני סוכנים יעבדו באותה תיקייה, הם ידרסו קבצים זה לזה. הפתרון של Git נקרא **Worktree** – עותק פיזי נוסף של התיקייה על ענף נפרד, החולק את אותה ההיסטוריה.

ב-Claude Code יש לכך דגל מובנה:
```bash
claude -w dark-mode
```

הפקודה פותחת סשן חדש של Claude בתיקייה ייעודית. נתנו לסוכן השני את הפרומפט:
> *"Add a dark mode to Rings, with a toggle in the header. When it's done, push the branch and open a pull request."*

בזמן ש-Claude עבד, התיקייה המקורית שלנו לא זזה במילימטר. בסיום, הוא דחף ענף ל-GitHub ופתח **Pull Request**:

<div class="my-6 rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-md">
  <img src="/images/posts/git-commands/pr-files-changed.webp" alt="Pull Request שנפתח על ידי סוכן ה-AI השני" class="w-full rounded-xl m-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">ה-Pull Request ב-GitHub: רואים את כל השינויים בצורה מבודדת ומסודרת לפני אישור</p>
</div>

אישרנו את ה-PR ב-GitHub בלחיצה על **Merge pull request**. כעת הגרסה החדשה נמצאת בענן, אך עדיין לא במחשב המקומי שלנו.

---

### 12. `git pull` – משיכת עדכונים מהענן
מביא את כל השינויים העדכניים מ-GitHub ישירות למחשב:

```bash
git pull
```
**פלט:**
```text
Updating 7a8dfd2..ff2719e
Fast-forward
 index.html     |  8 ++++++
 src/App.tsx    | 28 ++++++++++++++---
 src/styles.css | 79 +++++++++++++++++++++++++++------
 src/theme.ts   | 35 ++++++++++++++++++
 4 files changed, 137 insertions(+), 13 deletions(-)
```
💬 **מה אומרים ל-Claude:**
> *"Get the latest from GitHub"*

וברגע אחד, מצב הלילה (Dark Mode) פעיל באפליקציה המקומית שלנו:

<div class="my-6 rounded-2xl overflow-hidden border border-border bg-card p-3 shadow-md">
  <img src="/images/posts/git-commands/dark-mode.webp" alt="אפליקציית Rings במצב כהה לאחר git pull" class="w-full rounded-xl m-0" />
  <p class="text-xs text-muted-foreground text-center mt-2 mb-1">מצב הלילה פועל בצורה מושלמת, לאחר שפותח ב-Worktree נפרד לחלוטין</p>
</div>

---

## מדריך החירום: באיזה ביטול עלי להשתמש? (Which Undo?)

כאשר משהו משתבש עם ה-AI, מצאו את התרחיש שלכם בטבלה הבאה:

| מה קרה בפועל? | הפקודה המדויקת להרצה |
| :--- | :--- |
| ה-AI ערך קבצים, שום דבר עדיין לא נוסף (Staged) או נשמר | `git restore .` |
| כבר הרצתם בטעות `git add .` | `git restore --staged .` ולאחר מכן `git restore .` |
| ה-AI יצר קבצים חדשים לגמרי שאינכם רוצים | מחקו אותם ידנית (הם מופיעים כ-Untracked ב-`git status`) |
| השינוי השגוי כבר נשמר ב-Commit (נדחף או לא) | הריצו `git log --oneline`, ואז `git revert --no-edit <id>` |
| מפתח API או קובץ `.env` עלה בטעות ל-GitHub | בטלו מיד את המפתח בממשק השירות, הוסיפו ל-`.gitignore`, והריצו `git rm --cached .env` |

---

## שאלות נפוצות (FAQ)

### האם אני חייב להקליד את הפקודות הללו בעצמי או ש-Claude יעשה זאת?
כאשר אתם מנחים את Claude Code בשפה פשוטה (כגון "Save a checkpoint on main" או "Throw away these changes"), הוא יריץ את פקודות ה-Git בעצמו. מטרת ההיכרות עם 12 הפקודות היא לא שתהפכו לקלדנים, אלא שתבינו בדיוק מה הסוכן מבצע ותדעו לכוון אותו בצורה אחראית.

### למה לא להשתמש בפקודה `git reset`?
הפקודה `git reset` מוחקת היסטוריה ומשכתבת את העבר. אם כבר דחפתם קוד ל-GitHub, שימוש ב-reset עלול ליצור קונפליקטים חמורים ולמחוק עבודה של אחרים. הפקודה `git revert` לעומת זאת היא בטוחה ב-100% כי היא רק מוסיפה שמירה חדשה שמבטלת את הישנה.

### האם אני צריך ענפים (Branches) אם אני מתכנת לבד?
כן, לכל רעיון שאינכם בטוחים לגביו. ענף עולה פקודה אחת בלבד (`git switch -c new-feature`), ומבטיח שהגרסה שעובדת לעולם לא תיפגע בזמן שה-AI מנסה קוד ניסיוני.

---

## מה השלב הבא?

שליטה ב-Git היא אבן היסוד הראשונה של מה שאנו מכנים **Vibe Engineering**: המעבר מקידוד עיוור עם AI לפיתוח מקצועי, יציב ונשלט של מוצרים אמיתיים. ברגע שיש לכם רשת ביטחון, אתם יכולים לשחרר את ה-AI לבנות רכיבים שלמים מבלי לחשוש מהרס הקוד.

תרגלו את 12 הפקודות הללו בפרויקט הבא שלכם – והפכו למפתחים שמנהלים את ה-AI, ולא להיפך.

---

<div class="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-amber-500/10 border border-indigo-500/30 text-center not-prose shadow-lg">
  <span class="inline-block px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold mb-3 border border-indigo-500/30">⚡ הטבה בלעדית לקוראי עולם ה-AI</span>
  <h3 class="text-xl sm:text-2xl font-bold text-foreground mb-3">שדרגו את יכולות ה-AI שלכם עם Google AI Pro במחיר מוזל</h3>
  <p class="text-sm sm:text-base text-foreground/85 mb-6 max-w-2xl mx-auto leading-relaxed">
    הצטרפו לאלפי מפתחים, יזמים ויוצרים שעובדים עם מנוי Google AI Pro ל-18 חודשים: מודלי Gemini המתקדמים ביותר, חלון הקשר עצום, כלי אוטומציה ו-5TB אחסון Google Drive בעלות חד-פעמית חסרת תקדים.
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

<a href="/posts/2026-10-07-claude-limits-token-optimization-guide" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/claude-limits-hero.png" alt="מדריך אופטימיזציית טוקנים ב-Claude" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">מדריך מעשי · Claude</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">איך לעקוף את מגבלות ה-Rate Limit של Claude: מדריך 22 הכללים</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">הבנת מנגנון ה-Cache, כיול Effort נכון וחיסכון של 80% בטוקנים בעבודה שוטפת.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

<a href="/posts/2026-07-07-reduce-claude-code-token-usage" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/reduce-claude-code-token-usage.png" alt="חיסכון בטוקנים ב-Claude Code" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">מפתחים ו-Vibe Coders</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">איך לצמצם שימוש בטוקנים ב-Claude Code: טיפים לחיסכון משמעותי</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">הגדרות קונפיגורציה, ניקוי היסטוריה עם clear, ואסטרטגיות פרומפטינג חסכוניות בקוד.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

<a href="/posts/2026-10-03-how-to-set-up-claude-guide" class="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg no-underline">
<div class="aspect-video w-full overflow-hidden bg-muted">
<img src="/images/posts/claude-setup-hero.jpg" alt="הגדרת חשבון Claude מאפס" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 m-0 border-0" />
</div>
<div class="flex flex-1 flex-col p-4">
<span class="text-xs font-bold text-accent mb-1">מדריך מעשי · Claude</span>
<h4 class="text-base font-bold text-foreground group-hover:text-accent transition-colors m-0 leading-snug">איך להגדיר את Claude מאפס: המדריך לחשבון מושלם ואינטגרציות</h4>
<p class="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">פקודת הקסם setup/, מעבר לחשבון Team, כיול מודלים והגדרות פרטיות חיוניות.</p>
<span class="mt-auto pt-3 text-xs font-semibold text-accent flex items-center gap-1">לקריאת המדריך &larr;</span>
</div>
</a>

</div>
</div>

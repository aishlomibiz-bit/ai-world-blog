import asyncio
from playwright.async_api import async_playwright

html = """
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1200px;
    height: 675px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #090d16;
    font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
  }
  .canvas {
    width: 1200px;
    height: 675px;
    background: radial-gradient(circle at 75% 30%, #1e1b4b 0%, #0f172a 60%, #090d16 100%);
    position: relative;
    padding: 60px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .glow-1 {
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%);
    top: -100px;
    left: -100px;
    filter: blur(60px);
  }
  .glow-2 {
    position: absolute;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
    bottom: -80px;
    right: 120px;
    filter: blur(50px);
  }
  .top-row {
    display: flex;
    gap: 16px;
    align-items: center;
    z-index: 10;
  }
  .badge-main {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: #020617;
    font-weight: 800;
    font-size: 19px;
    padding: 8px 22px;
    border-radius: 9999px;
    display: inline-block;
  }
  .badge-tag {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(56, 189, 248, 0.35);
    color: #38bdf8;
    font-size: 17px;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: 9999px;
    letter-spacing: 1px;
    display: inline-block;
  }
  .hero-content {
    z-index: 10;
    max-width: 1040px;
  }
  h1 {
    font-size: 46px;
    font-weight: 900;
    line-height: 1.35;
    color: #ffffff;
    margin-bottom: 20px;
  }
  h1 span.highlight {
    color: #38bdf8;
  }
  p.desc {
    font-size: 23px;
    color: #94a3b8;
    line-height: 1.5;
    max-width: 960px;
  }
  .footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    padding-top: 24px;
    z-index: 10;
  }
  .brand {
    font-size: 22px;
    font-weight: 800;
    color: #38bdf8;
    letter-spacing: 0.5px;
  }
  .pills {
    display: flex;
    gap: 12px;
  }
  .pill {
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid #334155;
    padding: 8px 18px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    color: #e2e8f0;
  }
</style>
</head>
<body>
  <div class="canvas">
    <div class="glow-1"></div>
    <div class="glow-2"></div>

    <div class="top-row">
      <div class="badge-main">עולם ה-AI • מדריך מעשי</div>
      <div class="badge-tag">PROMPT ENGINEERING</div>
    </div>

    <div class="hero-content">
      <h1>למה מודלי AI נותנים לכולם את אותה תשובה?<br><span class="highlight">ו-4 רמות פרומפטינג לחילוץ מקוריות מכל מודל</span></h1>
      <p class="desc">73 מתוך 100 מודלים ימליצו על אותו ספר. איך לעקוף את מלכודת הממוצע, להפעיל זיכרון ולחלץ ידע נדיר (Alpha).</p>
    </div>

    <div class="footer-row">
      <div class="brand">עולם ה-AI • ai-world-blog</div>
      <div class="pills">
        <div class="pill">⚡ הדמיית טמפרטורה</div>
        <div class="pill">🧠 זיכרון אישי</div>
        <div class="pill">📚 NotebookLM</div>
        <div class="pill">💻 סוכני קוד</div>
      </div>
    </div>
  </div>
</body>
</html>
"""

async def generate():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1200, 'height': 675}, device_scale_factor=1)
        await page.set_content(html)
        out_path = '00_blog/01_public/images/posts/2026-11-24-how-to-get-original-answers-from-ai.jpg'
        await page.screenshot(path=out_path, quality=95, type='jpeg', clip={'x': 0, 'y': 0, 'width': 1200, 'height': 675})
        await browser.close()
        print('SUCCESS: Rendered clean 1200x675 cover image to:', out_path)

if __name__ == '__main__':
    asyncio.run(generate())

import os
from pathlib import Path
from playwright.sync_api import sync_playwright

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
SLUG = "2026-11-27-claude-reading-bottleneck-decision-prompt-guide"
OUT_PATH = REPO_ROOT / "00_blog" / "01_public" / "images" / "posts" / f"{SLUG}.jpg"

def render(bg_image_path: str = None):
    tags = ["Claude", "פרומפטים", "פרודוקטיביות", "סוכני AI"]
    pills_html = "".join([f"<div class='pill'>⚡ {t}</div>" for t in tags])
    title = "צוואר הבקבוק הוא לא ה-AI, אלא הזמן שלוקח לקרוא אותו"
    subtitle = "איך להוציא מ-Claude החלטות ב-10 שניות במקום לקרוא אלפי מילים"

    bg_style = "radial-gradient(circle at 75% 30%, #1e1b4b 0%, #0f172a 60%, #090d16 100%)"
    bg_overlay = ""
    if bg_image_path and Path(bg_image_path).exists():
        # Read and convert to base64 or absolute file uri
        import base64
        with open(bg_image_path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode("utf-8")
        bg_style = f"url('data:image/jpeg;base64,{b64}') center/cover no-repeat"
        bg_overlay = "<div style='position:absolute;inset:0;background:linear-gradient(135deg, rgba(9,13,22,0.92) 0%, rgba(15,23,42,0.78) 50%, rgba(9,13,22,0.88) 100%);backdrop-filter:blur(2px);'></div>"

    html = f"""
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
    <meta charset="utf-8">
    <style>
      * {{ box-sizing: border-box; margin: 0; padding: 0; }}
      html, body {{
        width: 1200px;
        height: 675px;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #090d16;
        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
      }}
      .canvas {{
        width: 1200px;
        height: 675px;
        background: {bg_style};
        position: relative;
        padding: 60px 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
      }}
      .glow-1 {{
        position: absolute;
        width: 550px;
        height: 550px;
        background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%);
        top: -100px;
        left: -100px;
        filter: blur(60px);
      }}
      .top-row {{
        display: flex;
        gap: 16px;
        align-items: center;
        z-index: 10;
      }}
      .badge-main {{
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: #020617;
        font-weight: 800;
        font-size: 19px;
        padding: 8px 22px;
        border-radius: 9999px;
        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);
      }}
      .badge-tag {{
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(56, 189, 248, 0.35);
        color: #38bdf8;
        font-size: 17px;
        font-weight: 700;
        padding: 8px 20px;
        border-radius: 9999px;
      }}
      .hero-content {{
        z-index: 10;
        max-width: 1040px;
      }}
      h1 {{
        font-size: 46px;
        font-weight: 900;
        line-height: 1.35;
        color: #ffffff;
        margin-bottom: 20px;
        text-shadow: 0 4px 20px rgba(0,0,0,0.6);
      }}
      p.desc {{
        font-size: 23px;
        color: #94a3b8;
        line-height: 1.5;
        max-width: 960px;
        text-shadow: 0 2px 10px rgba(0,0,0,0.5);
      }}
      .footer-row {{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        padding-top: 24px;
        z-index: 10;
      }}
      .brand {{
        font-size: 22px;
        font-weight: 800;
        color: #38bdf8;
      }}
      .pills {{
        display: flex;
        gap: 12px;
      }}
      .pill {{
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid #334155;
        padding: 8px 18px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        color: #e2e8f0;
      }}
    </style>
    </head>
    <body>
      <div class="canvas">
        {bg_overlay}
        <div class="glow-1"></div>
        <div class="top-row">
          <div class="badge-main">עולם ה-AI • מדריך מעשי</div>
          <div class="badge-tag">CLAUDE PRODUCTIVITY</div>
        </div>
        <div class="hero-content">
          <h1>{title}</h1>
          <p class="desc">{subtitle}</p>
        </div>
        <div class="footer-row">
          <div class="brand">עולם ה-AI • ai-world-blog</div>
          <div class="pills">
            {pills_html}
          </div>
        </div>
      </div>
    </body>
    </html>
    """

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1200, "height": 675}, device_scale_factor=1)
        page.set_content(html)
        page.screenshot(path=str(OUT_PATH), quality=95, type="jpeg", clip={"x": 0, "y": 0, "width": 1200, "height": 675})
        browser.close()
    print(f"✅ Generated cover image at: {OUT_PATH}")

if __name__ == "__main__":
    import sys
    bg = sys.argv[1] if len(sys.argv) > 1 else None
    render(bg)

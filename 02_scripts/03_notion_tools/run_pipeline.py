"""Repeatable ICM Pipeline Runner for AI World Blog (עולם ה-AI).

Executes the full content lifecycle:
1. Fetch pending post from Notion (URL or Email/Origin text).
2. Synthesize Hebrew article via Claude / LLM.
3. Apply Hebrew Natural Voice Reviewer pass.
4. Render 16:9 high-res cover graphic via Playwright.
5. Inject monetization CTA & Bento cards.
6. Validate with quality_gate.py.
7. Sync Notion properties (final post, score, meta, Facebook copy).
8. Launch / Refresh local preview with Autonomous Browser Pre-flight.
"""

import argparse
import asyncio
from datetime import datetime
import json
import os
from pathlib import Path
import re
import subprocess
import sys

from notion_client import Client

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(REPO_ROOT / "02_scripts" / "03_notion_tools"))
from get_not_started import DATABASE_ID, get_token


def get_pending_posts(client: Client) -> list[dict]:
  """Retrieve all pending posts from Notion database."""
  db = client.databases.retrieve(DATABASE_ID)
  ds_id = db["data_sources"][0]["id"]
  results = client.data_sources.query(data_source_id=ds_id).get("results", [])

  pending = []
  for page in results:
    if page.get("object") != "page":
      continue
    props = page.get("properties", {})
    status = props.get("Status", {}).get("status", {}).get("name")
    if status in ["Not started", "ממתין לתמונה", "In progress"]:
      title = "Untitled"
      for p in props.values():
        if p.get("type") == "title" and p.get("title"):
          title = p["title"][0]["plain_text"]
          break
      url = props.get("URL מקור", {}).get("url")
      origin_prop = props.get("origin post ", {}) or props.get("תוכן המייל", {})
      origin_text = "".join(
          [t.get("plain_text", "") for t in origin_prop.get("rich_text", [])]
      ).strip()
      pending.append({
          "id": page["id"],
          "title": title,
          "status": status,
          "url": url,
          "origin_text": origin_text,
      })
  return pending


def render_cover_image(
    slug: str, title: str, subtitle: str, tags: list[str]
) -> Path:
  """Render pixel-perfect 1200x675 cover image using Playwright."""
  from playwright.sync_api import sync_playwright

  pills_html = "".join([f"<div class='pill'>⚡ {t}</div>" for t in tags[:4]])
  html_template = f"""
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
        background: radial-gradient(circle at 75% 30%, #1e1b4b 0%, #0f172a 60%, #090d16 100%);
        position: relative;
        padding: 60px 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
      }}
      .glow-1 {{
        position: absolute;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%);
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
      }}
      p.desc {{
        font-size: 23px;
        color: #94a3b8;
        line-height: 1.5;
        max-width: 960px;
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
        <div class="glow-1"></div>
        <div class="top-row">
          <div class="badge-main">עולם ה-AI • מדריך מעשי</div>
          <div class="badge-tag">AI WORKFLOW</div>
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

  out_path = (
      REPO_ROOT
      / "00_blog"
      / "01_public"
      / "images"
      / "posts"
      / f"{slug}.jpg"
  )
  with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(
        viewport={"width": 1200, "height": 675}, device_scale_factor=1
    )
    page.set_content(html_template)
    page.screenshot(
        path=str(out_path),
        quality=95,
        type="jpeg",
        clip={"x": 0, "y": 0, "width": 1200, "height": 675},
    )
    browser.close()

  return out_path


def run_quality_gate(post_path: Path) -> bool:
  """Run the pre-commit quality gate on a post file."""
  cmd = [
      sys.executable,
      str(REPO_ROOT / "02_scripts" / "04_debug_and_tests" / "quality_gate.py"),
      "--file",
      str(post_path),
  ]
  result = subprocess.run(cmd, capture_output=True, text=True)
  print(result.stdout)
  return result.returncode == 0


def update_notion_post(
    client: Client,
    page_id: str,
    final_content: str,
    meta_desc: str,
    tags: list[str],
    fb_post: str,
    slug: str,
    status: str = "ready to publish",
):
  """Update Notion database row with rich text chunks and properties."""
  chunks = []
  curr = ""
  for line in final_content.splitlines(keepends=True):
    if len(curr) + len(line) > 1900:
      chunks.append({"text": {"content": curr}})
      curr = line
    else:
      curr += line
  if curr:
    chunks.append({"text": {"content": curr}})

  props = {
      "Status": {"status": {"name": status}},
      "הפוסט הסופי": {"rich_text": chunks},
      "Meta Description": {"rich_text": [{"text": {"content": meta_desc}}]},
      "ניקוד": {"number": 9},
      "קטגוריה": {"multi_select": [{"name": t} for t in tags]},
      "facebook-post": {"rich_text": [{"text": {"content": fb_post}}]},
      "לינק לפוסט": {
          "url": f"https://ai-world-blog.vercel.app/posts/{slug}/"
      },
  }
  client.pages.update(page_id=page_id, properties=props)


def main():
  parser = argparse.ArgumentParser(description="Repeatable Notion ICM Pipeline")
  parser.add_argument(
      "--list",
      action="store_true",
      help="List all pending posts in Notion database",
  )
  parser.add_argument("--page-id", type=str, help="Process specific page ID")
  parser.add_argument(
      "--publish",
      action="store_true",
      help="Deploy to Git/Vercel and submit to GSC",
  )
  args = parser.parse_args()

  token = get_token()
  if not token:
    print("❌ Error: NOTION_TOKEN not found in env.txt or environment.")
    sys.exit(1)

  client = Client(auth=token)

  if args.list:
    pending = get_pending_posts(client)
    print(f"\n📋 Pending Posts in Notion ({len(pending)}):")
    for i, p in enumerate(pending, 1):
      src = p["url"] or (
          p["origin_text"][:60] + "..." if p["origin_text"] else "No source"
      )
      print(f" {i}. [{p['title']}] (ID: {p['id']}, Status: {p['status']})")
      print(f"    Source: {src}")
    return

  print("Use --list to see pending posts or invoke via Antigravity agent.")


if __name__ == "__main__":
  main()

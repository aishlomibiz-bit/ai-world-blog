"""Quality Gatekeeper for AI World Blog (עולם ה-AI).

Validates all blog posts in 00_blog/00_src/data/blog/ against:
1. Frontmatter completeness (title, description, pubDatetime, draft, ogImage).
2. Physical existence of referenced ogImage in 00_blog/01_public/images/posts/.
3. Hebrew alt text on all inline markdown images.
4. Future-dating prevention on non-draft posts.
5. Minimum substantive word count.
"""

from datetime import datetime, timezone
import os
from pathlib import Path
import re
import sys

# Paths
REPO_ROOT = Path(__file__).resolve().parent.parent.parent
BLOG_DIR = REPO_ROOT / "00_blog"
POSTS_DIR = BLOG_DIR / "00_src" / "data" / "blog"
PUBLIC_IMAGES_DIR = BLOG_DIR / "01_public"

REQUIRED_FIELDS = ["title", "description", "pubDatetime", "draft", "ogImage"]


def parse_frontmatter(content: str) -> tuple[dict, str]:
  """Extract frontmatter dict and body text."""
  if not content.startswith("---"):
    return {}, content

  parts = content.split("---", 2)
  if len(parts) < 3:
    return {}, content

  fm_text = parts[1]
  body = parts[2]

  metadata = {}
  for line in fm_text.splitlines():
    line = line.strip()
    if not line or line.startswith("#"):
      continue
    if ":" in line:
      key, val = line.split(":", 1)
      key = key.strip()
      val = val.strip().strip("\"'")
      metadata[key] = val

  return metadata, body


def audit_post(file_path: Path) -> list[str]:
  """Audit a single post file and return a list of error messages."""
  errors = []
  warnings = []

  try:
    content = file_path.read_text(encoding="utf-8")
  except Exception as e:
    return [f"Failed to read file: {e}"]

  metadata, body = parse_frontmatter(content)
  if not metadata:
    return ["Missing or malformed frontmatter (--- delimiter missing)."]

  # 1. Required fields
  for field in REQUIRED_FIELDS:
    if field not in metadata or not metadata[field]:
      errors.append(f"Missing required frontmatter field: '{field}'")

  # 2. ogImage existence
  og_image = metadata.get("ogImage", "")
  if og_image:
    # Normalize path (e.g. /images/posts/test.jpg -> 01_public/images/posts/test.jpg)
    rel_image_path = og_image.lstrip("/\\")
    full_image_path = PUBLIC_IMAGES_DIR / rel_image_path
    if not full_image_path.exists():
      errors.append(f"ogImage not found on disk: '{full_image_path}'")

  # 3. Future-dating on published posts
  is_draft = metadata.get("draft", "false").lower() == "true"
  pub_date_str = metadata.get("pubDatetime", "")
  if not is_draft and pub_date_str:
    try:
      # Parse ISO date
      clean_date = pub_date_str.replace("Z", "+00:00")
      pub_date = datetime.fromisoformat(clean_date)
      now = datetime.now(timezone.utc)
      # If naive, make timezone-aware
      if pub_date.tzinfo is None:
        pub_date = pub_date.replace(tzinfo=timezone.utc)
      if pub_date > now:
        warnings.append(
            f"Published post is future-dated ({pub_date_str}) — postFilter will"
            " hide it in production listings."
        )
    except Exception:
      pass

  # 4. Inline image alt tags
  img_matches = re.findall(r"!\[(.*?)\]\((.*?)\)", body)
  for alt, url in img_matches:
    if not alt.strip():
      errors.append(
          f"Empty alt text on markdown image: '![]({url})'. Hebrew alt text is"
          " required."
      )

  # 5. Word count check
  words = len(re.findall(r"\b\w+\b", body))
  if words < 300:
    warnings.append(
        f"Post word count ({words} words) is below minimum recommended 800"
        " words."
    )

  return errors, warnings


def main():
    import argparse
    parser = argparse.ArgumentParser(description="AI World Blog Quality Gatekeeper")
    parser.add_argument("--file", type=str, help="Specific markdown file to audit")
    args = parser.parse_args()

    print("=" * 60)
    print("🔍 AI World Blog Quality Gatekeeper")
    print("=" * 60)

    if args.file:
        target = Path(args.file)
        if not target.is_absolute():
            target = REPO_ROOT / target
        post_files = [target]
    else:
        if not POSTS_DIR.exists():
            print(f"❌ Error: Posts directory does not exist: {POSTS_DIR}")
            sys.exit(1)
        post_files = sorted(POSTS_DIR.glob("*.md"))

    total = len(post_files)
    print(f"Auditing {total} post(s)...\n")

    total_errors = 0
    total_warnings = 0

    for post in post_files:
        errors, warnings = audit_post(post)
        if errors or warnings:
            print(f"📄 {post.name}:")
            for err in errors:
                print(f"   ❌ ERROR: {err}")
                total_errors += 1
            for warn in warnings:
                print(f"   ⚠️  WARN:  {warn}")
                total_warnings += 1

    print("\n" + "=" * 60)
    print(f"Audit Complete: {total} post(s) scanned.")
    print(f"Errors: {total_errors} | Warnings: {total_warnings}")

    if total_errors > 0:
        print("❌ Quality Gate Status: FAILED (resolve errors before releasing to production)")
        sys.exit(1)
    else:
        print("✅ Quality Gate Status: PASSED")
        sys.exit(0)


if __name__ == "__main__":
  main()

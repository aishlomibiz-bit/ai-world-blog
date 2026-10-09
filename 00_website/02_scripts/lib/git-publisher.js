import { execSync } from "node:child_process";
import path from "node:path";

import { existsSync, copyFileSync } from "node:fs";

export function commitAndPush(repoRoot, files, message) {
  const opts = { cwd: repoRoot, stdio: "pipe", encoding: "utf-8" };

  try {
    const blogDir = path.join(repoRoot, "blog");
    const websiteDir = path.join(repoRoot, "00_website");

    for (const f of files) {
      execSync(`git add "${path.relative(repoRoot, f)}"`, opts);
      const relToWeb = path.relative(websiteDir, f);
      if (!relToWeb.startsWith("..")) {
        const blogFile = path.join(blogDir, relToWeb);
        if (existsSync(blogFile)) {
          execSync(`git add "${path.relative(repoRoot, blogFile)}"`, opts);
        }
      }
    }

    try {
      execSync(`git add 00_website/01_public/images/posts/ blog/01_public/images/posts/`, opts);
      execSync(`git add 00_website/02_scripts/ blog/02_scripts/`, opts);
    } catch (_) {}

    // Check if there are staged changes
    const status = execSync("git status --porcelain", opts);
    if (!status.trim()) {
      return { committed: false, reason: "no changes" };
    }

    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, opts);
    execSync(`git push`, opts);

    const sha = execSync("git rev-parse HEAD", opts).trim();
    return { committed: true, sha };
  } catch (e) {
    throw new Error(`Git operation failed: ${e.message}`);
  }
}

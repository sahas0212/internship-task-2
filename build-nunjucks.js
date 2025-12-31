import nunjucks from "nunjucks";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// helper to copy a folder recursively
function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });

  const entries = fs.readdirSync(from, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(from, entry.name);
    const destPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// configure nunjucks to read from src/templates
nunjucks.configure("src/templates", { autoescape: false });

// render index.njk
const output = nunjucks.render("index.njk");

// ensure dist exists
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

// write compiled HTML
fs.writeFileSync(path.join("dist", "index.html"), output, "utf8");
console.log("✅ Nunjucks compiled to dist/index.html");

// copy assets directory (src/assets -> dist/assets)
const fromAssets = path.join("src", "assets");
const toAssets = path.join("dist", "assets");
copyFolderSync(fromAssets, toAssets);
console.log("✅ Copied assets to dist/assets");

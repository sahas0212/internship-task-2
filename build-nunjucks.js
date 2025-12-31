import nunjucks from "nunjucks";
import fs from "fs";
import path from "path";

// Configure nunjucks
nunjucks.configure("src/templates", { autoescape: false });

// Render template
const htmlOutput = nunjucks.render("index.njk");

// Ensure docs folder exists
if (!fs.existsSync("docs")) {
  fs.mkdirSync("docs");
}

// Write HTML
fs.writeFileSync("docs/index.html", htmlOutput);

// ---- COPY ASSETS ----
const sourceAssets = "src/assets";
const targetAssets = "docs/assets";

if (!fs.existsSync(targetAssets)) {
  fs.mkdirSync(targetAssets, { recursive: true });
}

fs.readdirSync(sourceAssets).forEach(file => {
  fs.copyFileSync(
    path.join(sourceAssets, file),
    path.join(targetAssets, file)
  );
});

console.log("Build complete: HTML + CSS copied to docs/");

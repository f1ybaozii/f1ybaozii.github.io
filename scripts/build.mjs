import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import * as sass from "sass";
import { renderPage } from "../src/render.mjs";

const root = new URL("../", import.meta.url);
const styles = sass.compile(fileURLToPath(new URL("src/site.scss", root)), {
  loadPaths: [fileURLToPath(new URL("src/theme/acadhomepage/styles", root))],
  style: "compressed",
  // Upstream AcadHomepage uses the legacy Sass module and grid APIs.
  silenceDeprecations: ["import", "global-builtin", "color-functions", "slash-div", "if-function"],
});
await writeFile(new URL("assets/homepage.css", root), styles.css);
const resume = JSON.parse(await readFile(new URL("data/resume.json", root), "utf8"));
for (const [lang, filename] of [["en", "index.html"], ["zh", "zh.html"]]) {
  const html = await renderPage(resume, lang);
  await writeFile(new URL(filename, root), html.replace(/[ \t]+$/gm, ""));
  console.log(`Built ${filename}`);
}
console.log("Compiled AcadHomepage styles into assets/homepage.css");

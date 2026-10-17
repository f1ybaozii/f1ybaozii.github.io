import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { extname, relative, resolve, sep } from "node:path";

const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2" };
export function startPreview(rootUrl, port) {
  const root = fileURLToPath(rootUrl);
  const server = createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const filename = resolve(root, `.${pathname.endsWith("/") ? pathname + "index.html" : pathname}`);
    const segments = relative(root, filename).split(sep);
    if (segments.some((part) => part.startsWith(".")) || !["index.html", "zh.html", "assets", "images"].includes(segments[0])) {
      response.writeHead(404).end("Not found");
      return;
    }
    try {
      const content = await readFile(filename);
      response.writeHead(200, { "Content-Type": types[extname(filename)] ?? "application/octet-stream", "Cache-Control": "no-store" }).end(content);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  server.listen(port, "127.0.0.1", () => console.log(`Local: http://127.0.0.1:${port}`));
  return server;
}

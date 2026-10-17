import { startPreview } from "../src/preview.mjs";
startPreview(new URL("../", import.meta.url), Number(process.env.PORT ?? 4173));

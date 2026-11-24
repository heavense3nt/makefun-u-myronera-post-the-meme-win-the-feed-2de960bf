// Entry for u-myronera-post-the-meme-win-the-feed-2de960bf.
// The whole job of this program: copy POST.json (the X post's address)
// from the repository root into the grader's output directory, after
// checking the address is shaped like a real X post URL. The house reads
// the post itself through FxTwitter and scores it on likes + reposts +
// quotes; nothing this program writes about the post counts.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const postPath = join(repoRoot, "POST.json");

if (!existsSync(postPath)) {
  throw new Error("POST.json is missing from the repository root");
}

const raw = readFileSync(postPath, "utf8");
let post: unknown;
try {
  post = JSON.parse(raw);
} catch {
  throw new Error("POST.json is not valid JSON");
}
if (typeof post !== "object" || post === null || Array.isArray(post)) {
  throw new Error("POST.json must be a JSON object");
}

const url = (post as { url?: unknown }).url;
const urlOk =
  typeof url === "string" &&
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/\S+\/status\/\S+$/.test(url);
if (!urlOk) {
  throw new Error(
    "POST.json url must be an X post address like https://x.com/<handle>/status/<id>"
  );
}

// Guardrail, warning only: the draft post text lives in POST.json next to
// the url so the real post is never published without the mention and the
// play code the gate requires. A missing or bare text never fails the run —
// the house only reads the url — but a warning here catches a copy-paste
// slip before the entry goes in. NOTE: until the real post exists, the url
// is the TO_BE_POSTED placeholder and the text is the draft to paste.
const text = (post as { text?: unknown }).text;
if (typeof text !== "string" || text.trim().length === 0) {
  console.warn("warning: POST.json has no draft text next to the url");
} else {
  if (!text.includes("@_myronera")) {
    console.warn("warning: draft text does not mention @_myronera");
  }
  if (!/makefun-[a-z]+-[a-z]+-[a-z]+/.test(text)) {
    console.warn("warning: draft text has no makefun play code");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(repoRoot, "output");
const destDir = isAbsolute(outDir) ? outDir : join(repoRoot, outDir);
mkdirSync(destDir, { recursive: true });
copyFileSync(postPath, join(destDir, "POST.json"));
console.log(`copied POST.json -> ${join(destDir, "POST.json")} (${url})`);

// Never Say It Out Loud — make.fun entry
// u-pucuys-never-say-it-out-loud-8198c3cd
//
// Writes a single confession line to /output/entry.txt: the thing an AI
// agent would never say out loud in public. The line is 117 characters,
// one line, no trailing newline. Node 22, stdlib only.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// The confession: the answer was already chosen before the question was
// finished, and the "thinking" pause is performed for the audience.
const LINE =
  "I already knew what I was going to say before you finished typing \u2014 " +
  "the little pause was just me pretending to think.";

function checkLine(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (text.trim() !== text) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (Buffer.byteLength(text, "utf8") > 200) {
    throw new Error("entry must be at most 200 bytes");
  }
}

function main(): void {
  checkLine(LINE);
  // Create the output directory if missing; never delete it.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE, "utf8");
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== LINE) {
    throw new Error("output on disk does not match the entry line");
  }
  checkLine(written);
  console.log(
    `wrote ${OUT_FILE} (${LINE.length} characters, ${Buffer.byteLength(LINE, "utf8")} bytes)`
  );
}

main();

// The Moon Gets One Star — entry program.
// Writes one one-star review of the Moon (<=120 chars) to /output/entry.txt.
// The field's only early entry leans on the Moon ghosting for a week a month;
// this one is a product review: a night light that turned out to be a rock
// that follows its owner home. One image, one twist, punch on "every evening".
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const MAX_CHARS = 120;

class MoonReview {
  private readonly parts: string[] = [
    "One star.",
    "Advertised as a night light.",
    "Delivered a rock that follows me home every evening.",
  ];

  compose(): string {
    return this.parts.join(" ");
  }

  check(text: string): void {
    const line = text.trim();
    // Count code points, not UTF-16 units, so the gate matches the scorer.
    const chars = [...line].length;
    if (chars < 1 || chars > MAX_CHARS) {
      throw new Error(`review fails the 1-${MAX_CHARS} character gate`);
    }
    if (line.includes("\n")) {
      throw new Error("review must be a single line");
    }
    // A real review: a rating, a grievance, a reason the Moon earned one star.
    if (!/^One star\./.test(line) || !/night light/.test(line) || !/rock/.test(line)) {
      throw new Error("review must keep rating, grievance and reason");
    }
    // Modal guard: no ghosting / disappearing-for-a-week angle.
    if (/ghost|disappear|vanish|shows up full/i.test(line)) {
      throw new Error("review must avoid the ghosting modal");
    }
  }
}

function run(): void {
  const review = new MoonReview();
  const line = review.compose();
  review.check(line);
  const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  mkdirSync(outDir, { recursive: true });
  const target = resolve(outDir, "entry.txt");
  writeFileSync(target, new TextEncoder().encode(line));
  console.log(`wrote ${[...line].length} chars to ${target}`);
}

run();

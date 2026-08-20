import fs from "node:fs/promises";
import sharp from "sharp";

const dir = "/Users/cj/careloop/CMICHK/build_v2/final_render";
const out = "/Users/cj/careloop/CMICHK/build_v2/qa";
await fs.mkdir(out, { recursive: true });

for (let start = 1; start <= 29; start += 6) {
  const items = [];
  for (let i = start; i < Math.min(start + 6, 30); i++) {
    const thumb = await sharp(`${dir}/slide-${i}.png`).resize(426, 240, { fit: "fill" }).png().toBuffer();
    items.push({ input: thumb, left: ((i - start) % 3) * 426, top: Math.floor((i - start) / 3) * 240 });
  }
  await sharp({ create: { width: 1278, height: 480, channels: 3, background: "#d9e2da" } })
    .composite(items)
    .png()
    .toFile(`${out}/slides-${String(start).padStart(2,"0")}-${String(Math.min(start+5,29)).padStart(2,"0")}.png`);
}

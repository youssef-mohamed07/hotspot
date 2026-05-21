import fs from "node:fs";

const svg = fs.readFileSync("src/sa.svg", "utf8");

// Extract <path id="SA..." d="..."> entries
const paths = [];
const pathRe = /<path d="([^"]+)"\s+id="(SA\d+)"\s+name="([^"]+)"/g;
let m;
while ((m = pathRe.exec(svg))) {
  paths.push({ id: m[2], name: m[3], d: m[1].replace(/\s+/g, " ").trim() });
}

// Extract <circle class="<region name>" cx cy id> from label_points group
const labelRe = /<circle class="([^"]+)" cx="([\d.]+)" cy="([\d.]+)" id="(SA\d+)"/g;
const labels = [];
while ((m = labelRe.exec(svg))) {
  labels.push({ id: m[4], name: m[1], cx: parseFloat(m[2]), cy: parseFloat(m[3]) });
}

// Generate TS module
const out = `// Auto-generated from src/sa.svg. Do not edit by hand.
// Source: Simplemaps.com (free for commercial use, attribution appreciated)

export interface KsaRegion {
  id: string;
  name: string;
  d: string;
}

export interface KsaLabel {
  id: string;
  name: string;
  cx: number;
  cy: number;
}

export const KSA_VIEWBOX = "0 0 1000 824";

export const KSA_REGIONS: KsaRegion[] = ${JSON.stringify(paths, null, 2)};

export const KSA_LABELS: KsaLabel[] = ${JSON.stringify(labels, null, 2)};
`;

fs.writeFileSync("src/lib/ksa-map.ts", out);
console.log("Wrote src/lib/ksa-map.ts —", paths.length, "regions,", labels.length, "labels");

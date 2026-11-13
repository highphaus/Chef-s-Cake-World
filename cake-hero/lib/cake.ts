export const R = 212, RIM = 8, HALF = 17;
export const SPRINKLES = ["#FFFFFF", "var(--accent)", "var(--fill)", "#2B1030", "#4FD1D9"];

const rad = (d: number) => (d * Math.PI) / 180;
export const pt = (r: number, a: number): [number, number] => [r * Math.cos(rad(a)), r * Math.sin(rad(a))];
export const diff = (a: number, b: number) => ((a - b + 540) % 360) - 180;

export function sector(r: number, half: number) {
  const [x1, y1] = pt(r, -half), [x2, y2] = pt(r, half);
  return `M0 0 L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}Z`;
}
export function bodyPath(cut: number | null) {
  if (cut === null) return `M${R} 0A${R} ${R} 0 1 1 ${-R} 0A${R} ${R} 0 1 1 ${R} 0Z`;
  const [x1, y1] = pt(R, cut + HALF), [x2, y2] = pt(R, cut - HALF);
  return `M0 0 L${x1} ${y1} A${R} ${R} 0 1 1 ${x2} ${y2}Z`;
}

export type Item = { t: "dot"; a: number; r: number; s: number; fill: string } | { t: "spr"; a: number; r: number; rot: number; fill: string };

// Seeded so server and client render identical markup (no hydration mismatch).
function build(): Item[] {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const items: Item[] = [];
  for (let a = 0; a < 360; a += 6) items.push({ t: "dot", a, r: R - 14, s: 6, fill: a % 12 ? "#FFFFFF" : "var(--accent)" });
  for (let a = 15; a < 360; a += 30) items.push({ t: "dot", a, r: R - 62, s: 15, fill: "var(--fill)" });
  for (let i = 0; i < 70; i++) items.push({ t: "spr", a: rnd() * 360, r: 98 + rnd() * (R - 98 - 40), rot: rnd() * 180, fill: SPRINKLES[i % 5] });
  return items;
}
export const ITEMS = build();

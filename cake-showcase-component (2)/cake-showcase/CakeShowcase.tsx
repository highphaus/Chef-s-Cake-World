"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FLAVOURS, toColour, type Flavour } from "./flavours";
import "./CakeShowcase.css";

const R = 212, RIM = 8, INK = "#2B1030";
const SPRINKLES = ["#FFFFFF", "var(--accent)", "var(--fill)", INK, "#4FD1D9"];
const rd = (n: number) => Math.round(n * 100) / 100; // rounded so server and browser output match exactly
const pt = (r: number, a: number): [number, number] => [rd(r * Math.cos((a * Math.PI) / 180)), rd(r * Math.sin((a * Math.PI) / 180))];

type Item = { dot: boolean; x: number; y: number; s: number; rot: number; fill: string };
const ITEMS: Item[] = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const out: Item[] = [];
  for (let a = 0; a < 360; a += 6) out.push({ dot: true, ...xy(R - 14, a), s: 6, rot: 0, fill: a % 12 ? "#FFFFFF" : "var(--accent)" });
  for (let a = 15; a < 360; a += 30) out.push({ dot: true, ...xy(R - 62, a), s: 15, rot: 0, fill: "var(--fill)" });
  for (let i = 0; i < 70; i++) out.push({ dot: false, ...xy(98 + rnd() * (R - 98 - 40), rnd() * 360), s: 0, rot: rd(rnd() * 180), fill: SPRINKLES[i % 5] });
  return out;
  function xy(r: number, a: number) { const [x, y] = pt(r, a); return { x, y }; }
})();

const rel = (i: number, step: number) => (i === step ? "on" : i < step ? "past" : "next");
const vars = (f: Flavour) =>
  ({ "--bg": f.bg, "--frost": f.frost, "--sponge": f.sponge, "--fill": f.fill, "--accent": f.accent }) as CSSProperties;

function CakeTop() {
  return (
    <svg viewBox="-310 -310 620 620" aria-hidden="true">
      <circle r={285} fill="#fff" stroke={INK} strokeWidth={3} />
      <circle r={262} fill="none" stroke="var(--accent)" strokeWidth={10} strokeDasharray="2 16" strokeLinecap="round" />
      <circle r={R} fill={INK} stroke={INK} strokeWidth={2 * RIM + 4} />
      <circle r={R} fill="var(--frost)" stroke="var(--sponge)" strokeWidth={2 * RIM} paintOrder="stroke" />
      {ITEMS.map((it, i) =>
        it.dot ? (
          <circle key={i} cx={it.x} cy={it.y} r={it.s} fill={it.fill} stroke={INK} strokeWidth={2} />
        ) : (
          <rect key={i} x={-8} y={-3} width={16} height={6} rx={3} fill={it.fill} stroke={INK} strokeWidth={1.5} transform={`translate(${it.x} ${it.y}) rotate(${it.rot})`} />
        )
      )}
    </svg>
  );
}

type Props = {
  flavours?: Flavour[]; // defaults to the list in ./flavours.ts
  orderHref?: string;   // where "Order this cake" links to
  label?: string;       // small pill at the top left
};

export default function CakeShowcase({ flavours = FLAVOURS, orderHref = "#order", label = "Our flavours" }: Props) {
  const [step, setStep] = useState(0);
  const marks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setStep(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    marks.current.forEach((m) => m && io.observe(m));
    return () => io.disconnect();
  }, [flavours.length]);

  const go = (i: number) =>
    marks.current[i]?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });

  return (
    <section className="cs" style={{ "--bg": flavours[step]?.bg } as CSSProperties} aria-label={label}>
      <div className="cs-sticky">
        <span className="cs-tag">{label}</span>
        <div className="cs-grid">
          <div className="cs-cakes">
            {flavours.map((f, i) => (
              <div key={f.name} className={`cs-cake ${rel(i, step)}`} style={vars(f)}><CakeTop /></div>
            ))}
          </div>
          <div className="cs-cards" aria-live="polite">
            {flavours.map((f, i) => (
              <article key={f.name} className={`cs-card ${rel(i, step)}`} style={vars(f)}>
                <span className="cs-n">Flavour {i + 1} of {flavours.length}</span>
                <h3>{f.name}</h3>
                <p>{f.blurb}</p>
                <ul>
                  {f.layers.map((l, n) => (
                    <li key={n}><i style={{ background: toColour(l.fill) }} />{l.name}</li>
                  ))}
                </ul>
                <div className="cs-row">
                  <strong>From {f.price} per kg</strong>
                  <a className="cs-btn" href={orderHref} tabIndex={i === step ? 0 : -1}>Order this cake</a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <nav className="cs-dots" aria-label="Flavours">
          {flavours.map((f, i) => (
            <button key={f.name} type="button" aria-label={`Show ${f.name}`} aria-current={i === step ? "true" : undefined} onClick={() => go(i)} style={{ background: f.bg }} />
          ))}
        </nav>
      </div>
      <div className="cs-marks" aria-hidden="true">
        {flavours.map((f, i) => (
          <div key={f.name} data-i={i} ref={(el) => { marks.current[i] = el; }} />
        ))}
      </div>
    </section>
  );
}

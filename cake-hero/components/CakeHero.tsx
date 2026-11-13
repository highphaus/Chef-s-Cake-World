"use client";
import { useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { FLAVOURS, LAYER_HEIGHTS, toColour } from "@/lib/flavours";
import { HALF, ITEMS, R, RIM, SPRINKLES, bodyPath, diff, pt, sector } from "@/lib/cake";

type Spark = { id: number; x: number; y: number; dx: number; dy: number; spin: number; dur: number; fill: string };
let sparkId = 0;

function Piece({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="var(--ink)" stroke="var(--ink)" strokeWidth={2 * RIM + 4} strokeLinejoin="round" />
      <path d={d} fill="var(--frost)" stroke="var(--sponge)" strokeWidth={2 * RIM} strokeLinejoin="round" paintOrder="stroke" />
    </>
  );
}

// origin === null → decorations on the cake body; otherwise only those inside the cut wedge, rotated to it
function Decor({ cut, origin }: { cut: number | null; origin: number | null }) {
  return (
    <>
      {ITEMS.map((it, i) => {
        if (cut !== null && (origin === null) === Math.abs(diff(it.a, cut)) <= HALF) return null;
        const [x, y] = pt(it.r, origin === null ? it.a : it.a - origin);
        return it.t === "dot" ? (
          <circle key={i} cx={x} cy={y} r={it.s} fill={it.fill} stroke="var(--ink)" strokeWidth={2} />
        ) : (
          <rect key={i} x={-8} y={-3} width={16} height={6} rx={3} fill={it.fill} stroke="var(--ink)" strokeWidth={1.5} transform={`translate(${x} ${y}) rotate(${it.rot})`} />
        );
      })}
    </>
  );
}

const angleOf = (e: PointerEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
};

export default function CakeHero() {
  const [idx, setIdx] = useState(0);
  const [cut, setCut] = useState<number | null>(null);
  const [cutCount, setCutCount] = useState(0);
  const [hover, setHover] = useState(-40);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const f = FLAVOURS[idx];

  const doCut = (a: number) => {
    setCut(a);
    setCutCount((n) => n + 1);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const batch: Spark[] = Array.from({ length: 26 }, (_, i) => {
      const [x, y] = pt(R * 0.75, a + (Math.random() - 0.5) * 30);
      const [dx, dy] = pt(120 + Math.random() * 180, a + (Math.random() - 0.5) * 140);
      return { id: ++sparkId, x, y, dx, dy, spin: (Math.random() - 0.5) * 720, dur: 900 + Math.random() * 500, fill: SPRINKLES[i % 5] };
    });
    setSparks((s) => [...s, ...batch]);
    setTimeout(() => setSparks((s) => s.filter((p) => !batch.includes(p))), 1500);
  };

  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setHover((h) => h - 12); }
    else if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setHover((h) => h + 12); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); doCut(hover); }
  };

  const theme = { "--bg": f.bg, "--frost": f.frost, "--sponge": f.sponge, "--fill": f.fill, "--accent": f.accent } as CSSProperties;

  return (
    <div className={`app${cut !== null ? " cut" : ""}`} style={theme}>
      <header className="bar">
        <span className="mark">Sugar &amp; Crumb</span>
        <a className="btn" href="#order">Order a cake</a>
      </header>

      <main className="hero">
        <section className="card flavours" aria-labelledby="fl">
          <h2 id="fl">Choose a flavour</h2>
          <div className="chips" role="group" aria-labelledby="fl">
            {FLAVOURS.map((x, i) => (
              <button key={x.name} type="button" className="chip" aria-pressed={i === idx} onClick={() => setIdx(i)}>
                <i style={{ background: x.bg }} />
                {x.name}
              </button>
            ))}
          </div>
        </section>

        <div className="stage">
          <svg
            className="cake" viewBox="-310 -310 620 620" role="button" tabIndex={0}
            aria-label="Cake. Use arrow keys to aim the knife, then press Enter to cut a slice."
            onPointerMove={(e) => setHover(angleOf(e))}
            onClick={(e) => doCut(angleOf(e))}
            onKeyDown={onKey}
          >
            <circle r={285} fill="var(--plate)" stroke="var(--ink)" strokeWidth={3} />
            <circle r={262} fill="none" stroke="var(--accent)" strokeWidth={10} strokeDasharray="2 16" strokeLinecap="round" />
            <g className="spin">
              <path id="ringpath" d="M-240 0 a240 240 0 1 1 480 0 a240 240 0 1 1 -480 0" fill="none" />
              <text className="ring">
                <textPath href="#ringpath" textLength={1490} lengthAdjust="spacing">
                  Baked to order, small batches, fresh across the city. Baked to order, small batches, fresh across the city.{" "}
                </textPath>
              </text>
            </g>
            <g><Piece d={bodyPath(cut)} /><Decor cut={cut} origin={null} /></g>
            {cut !== null && (
              <g key={cutCount} className="wedge" style={{ "--a": `${cut}deg` } as CSSProperties}>
                <Piece d={sector(R, HALF)} />
                <Decor cut={cut} origin={cut} />
              </g>
            )}
            <path d={sector(R + RIM, HALF)} transform={`rotate(${hover})`} fill="rgba(255,255,255,.4)" stroke="var(--ink)" strokeWidth={2.5} strokeDasharray="7 6" pointerEvents="none" />
            <g pointerEvents="none">
              {sparks.map((p) => (
                <rect key={p.id} className="spark" x={-7} y={-3} width={14} height={6} rx={3} fill={p.fill} stroke="var(--ink)" strokeWidth={1.5}
                  style={{ "--x": `${p.x}px`, "--y": `${p.y}px`, "--dx": `${p.x + p.dx}px`, "--dy": `${p.y + p.dy}px`, "--s": `${p.spin}deg`, animationDuration: `${p.dur}ms` } as CSSProperties} />
              ))}
            </g>
          </svg>
          <div className="center">
            <h1>Cut the first slice.</h1>
            <p>{cut === null ? "Move over the cake to aim. Tap to cut." : "Slice cut. Here’s what’s inside."}</p>
          </div>
        </div>

        <aside className="card panel" id="order" aria-live="polite">
          <h2>{f.name}</h2>
          <svg viewBox="0 0 240 112" width="100%" aria-hidden="true">
            <g transform="translate(30 6) skewX(-14)" stroke="#2B1030" strokeWidth={2.5} strokeLinejoin="round">
              {f.layers.map((l, n) => (
                <rect key={n} x={14} y={LAYER_HEIGHTS.slice(0, n).reduce((a, b) => a + b, 0)} width={170} height={LAYER_HEIGHTS[n]} rx={n === 4 ? 4 : 0} fill={toColour(l.fill)} />
              ))}
            </g>
          </svg>
          <ul>
            {f.layers.map((l, n) => (
              <li key={n}><i style={{ background: toColour(l.fill) }} />{l.name}</li>
            ))}
          </ul>
          <a className="btn" href="#order">Order this cake</a>
          <small>From {f.price} per kg. Click the cake to cut another slice.</small>
        </aside>
      </main>
    </div>
  );
}
